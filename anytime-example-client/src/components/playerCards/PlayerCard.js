'use client';

import { useState } from 'react';
// material ui
import { Typography, Stack, Card, Button, Divider } from '@mui/material';

// project imports
import BetPlaceholder from './BetPlaceholder';

// assets
import BarChartIcon from '@mui/icons-material/BarChart';
import PlayerStats from '../playerStats/PlayerStats';

const PlayerCard = ({ player, league }) => {
  const [playerStatsOpen, setPlayerStatsOpen] = useState(false);

  const handleViewStatsTap = () => {
    setPlayerStatsOpen(true);
  };

  return (
    <>
      <Card elevation={5} sx={{ padding: 2 }}>
        <Stack direction='column' spacing={5}>
          <Stack
            direction='row'
            width='100%'
            spacing={2}
            justifyContent='space-between'
          >
            <Stack direction='column' spacing={0}>
              <Typography variant='h5'>{player.full_name}</Typography>
              <Typography variant='body'>{`${player.position.name} - ${player.team.abbr}`}</Typography>
            </Stack>
            <Button
              variant='contained'
              color='primary'
              startIcon={<BarChartIcon />}
              onClick={handleViewStatsTap}
            >
              Stats
            </Button>
          </Stack>
          <Stack direction='column' spacing={1}>
            <BetPlaceholder betIndex={1} />
            <Divider />
            <BetPlaceholder betIndex={2} />
            <Divider />
            <BetPlaceholder betIndex={3} />
          </Stack>
        </Stack>
      </Card>
      {playerStatsOpen && (
        <PlayerStats
          player={player}
          playerStatsOpen={playerStatsOpen}
          setPlayerStatsOpen={setPlayerStatsOpen}
          league={league}
        />
      )}
    </>
  );
};

export default PlayerCard;
