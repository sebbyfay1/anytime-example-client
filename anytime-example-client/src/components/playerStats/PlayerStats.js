import { useState, useEffect } from 'react';

// material ui
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

// project imports
import { fetchPlayerGameLogs } from '@/api/fetchPlayerStats';
import PlayerAverages from './PlayerAverages';
import PlayerStatsBarChart from './BarChart';
import HitRates from './HitRates';

import QbStatKeys from './config/QbStatKeys';
import RbStatKeys from './config/RbStatKeys';
import WrStatKeys from './config/WrStatKeys';
import SkaterStatKeys from './config/SkaterStatKeys';
import NbaStatKeys from './config/NbaStatKeys';

// assets
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendDescription from './TrendDescription';

// standard split options to fetch
var conditions = [
  {
    time_span: {
      key: 'all',
      value: null,
    },
  },
  {
    time_span: {
      key: 'last_n',
      value: 5,
    },
  },
  {
    time_span: {
      key: 'last_n',
      value: 10,
    },
  },
  {
    time_span: {
      key: 'seasons',
      value: [2024],
    },
    game_filters: [
      {
        key: 'is_home',
        value: true,
      },
    ],
  },
  {
    time_span: {
      key: 'seasons',
      value: [2024],
    },
    game_filters: [
      {
        key: 'is_home',
        value: false,
      },
    ],
  },
  {
    time_span: {
      key: 'seasons',
      value: [2024],
    },
  },
  {
    time_span: {
      key: 'seasons',
      value: [2023],
    },
  },
];

const splitOptions = [
  { label: 'L5', value: 1 },
  { label: 'L10', value: 2 },
  { label: 'Home', value: 3 },
  { label: 'Away', value: 4 },
  { label: '2024', value: 5 },
  { label: '2023', value: 6 },
];

function getStatKeys(league, position) {
  if (league === 'nfl') {
    return position === 'QB'
      ? QbStatKeys
      : position === 'RB'
      ? RbStatKeys
      : WrStatKeys;
  } else if (league === 'nba') {
    return NbaStatKeys;
  } else if (league === 'nhl') {
    return SkaterStatKeys;
  }
}

const PlayerStats = ({
  player,
  league,
  playerStatsOpen,
  setPlayerStatsOpen,
  trendConditions,
  trendStatKey,
  trendDescription,
}) => {
  // stat keys for position
  const positionStatKeys = getStatKeys(league, player.position.name);

  // set selected stat to trend stat key if it exists
  const [selectedStat, setSelectedStat] = useState(
    trendStatKey ?? Object.keys(positionStatKeys)[0]
  );
  const [selectedSplitIndex, setSelectedSplit] = useState(1);
  const [playerGameLogs, setPlayerGameLogs] = useState(null);

  // handle stats close
  const handleClose = () => {
    setPlayerStatsOpen(false);
  };

  // fetch split player stats and averages
  useEffect(() => {
    if (playerStatsOpen) {
      console.log('trendStatKey', trendStatKey);
      const getPlayerGameLogs = async () => {
        // if there is a trend stat key, replace the first condition with the trend conditions
        if (trendConditions) {
          conditions[0] = trendConditions;
        } else {
          // otherwise, use the default conditions, the first is a dummy condition
          conditions = [...conditions];
        }
        const playerGameLogs = await fetchPlayerGameLogs(league, player.id, {
          conditions: conditions,
        });
        setPlayerGameLogs(playerGameLogs);
      };
      getPlayerGameLogs();
    }
  }, [playerStatsOpen, player.id]);

  // update selected split when stat key changes
  useEffect(() => {
    if (selectedStat == trendStatKey) {
      setSelectedSplit(0);
    } else {
      setSelectedSplit(1);
    }
  }, [selectedStat]);

  return (
    <Dialog open={playerStatsOpen} onClose={handleClose}>
      <Stack
        direction='column'
        spacing={0}
        alignItems='center'
        sx={{
          height: '100%',
          maxHeight: '500px',
          paddingY: 2,
        }}
      >
        <Typography variant='h5'>{player.full_name}</Typography>
        <Tabs
          variant='scrollable'
          scrollButtons='auto'
          value={selectedStat}
          onChange={(e, newValue) => {
            console.log('newValue', newValue);
            setSelectedStat(newValue);
          }}
          sx={{
            width: '100%',
          }}
        >
          {Object.entries(positionStatKeys).map(([key, value]) => (
            <Tab
              icon={trendStatKey === key ? <LightbulbIcon /> : null} // highlight trend stat
              iconPosition='start'
              label={value}
              value={key}
              key={key}
            />
          ))}
        </Tabs>
        {!playerGameLogs ? (
          <CircularProgress />
        ) : (
          <Stack direction='column' spacing={2} width='100%'>
            <Divider />
            <Stack
              direction='row'
              padding={2}
              alignItems='center'
              justifyContent='center'
            >
              <ButtonGroup>
                {trendConditions && selectedStat == trendStatKey && (
                  <Button
                    key={'trend'}
                    onClick={() => setSelectedSplit(0)}
                    variant={
                      selectedSplitIndex === 0 ? 'contained' : 'outlined'
                    }
                    startIcon={<LightbulbIcon />}
                  >
                    Trend
                  </Button>
                )}
                {splitOptions.map((split) => (
                  <Button
                    key={split.value}
                    onClick={() => setSelectedSplit(split.value)}
                    variant={
                      selectedSplitIndex === split.value
                        ? 'contained'
                        : 'outlined'
                    }
                  >
                    {split.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Stack>
            {trendDescription && selectedSplitIndex == 0 ? (
              <TrendDescription trendDescription={trendDescription} />
            ) : (
              <HitRates
                gameLogs={
                  playerGameLogs.condition_game_logs[selectedSplitIndex]
                    .game_logs
                }
                statKey={selectedStat}
              />
            )}
            <PlayerStatsBarChart
              playerGameLogs={
                playerGameLogs.condition_game_logs[selectedSplitIndex].game_logs
              }
              statKey={selectedStat}
              playerTeamId={player.team.id}
            />
            <PlayerAverages
              playerAverages={
                playerGameLogs.condition_game_logs[selectedSplitIndex].averages
              }
              positionStatKeys={positionStatKeys}
            />
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
};

export default PlayerStats;
