'use client';

// react
import { useState } from 'react';

// material ui
import { Typography, Stack, Card, Button, Divider, Box } from '@mui/material';

// project imports
import PlayerStats from '../playerStats/PlayerStats';

// assets
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const PlayerTrendCard = ({ trend, league }) => {
  const [playerStatsOpen, setPlayerStatsOpen] = useState(false);

  const handleViewStatsTap = () => {
    setPlayerStatsOpen(true);
  };

  return (
    <>
      <Card elevation={5} sx={{ padding: 2 }}>
        <Stack direction='column' spacing={0}>
          <Stack
            direction='row'
            width='100%'
            spacing={2}
            justifyContent='space-between'
          >
            <Stack direction='column' spacing={0}>
              <Typography variant='h5'>{trend.entity.full_name}</Typography>
              <Typography variant='body'>{`${trend.entity.position.name} - ${trend.entity.team.city} ${trend.entity.team.mascot}`}</Typography>
              <Typography variant='body'>{`${trend.game.away_team.city} @ ${trend.game.home_team.city}`}</Typography>
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
          <Box sx={{ height: 32 }} />
          {/* Trend insights */}
          <Stack
            direction='row'
            width='100%'
            spacing={2}
            justifyContent='space-between'
          >
            <Stack direction='column' spacing={0}>
              <Stack direction='row' spacing={0} alignItems='center'>
                <Typography variant='h5'>{`${trend.stat_result} ${trend.handicap}`}</Typography>
                {trend.stat_result == 'over' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </Stack>
              <Typography variant='caption'>{trend.stat.title}</Typography>
            </Stack>
          </Stack>
          <Box sx={{ height: 8 }} />
          <Divider />
          <Stack direction='column' spacing={1} paddingTop={1}>
            <Typography variant='h5'>
              {trend.entity_trend_readable_string}
            </Typography>
            <Stack direction='row' width='100%' justifyContent='space-between'>
              <Typography variant='body'>{`Hit rate: ${trend.entity_trend_stats.hits}/L${trend.entity_trend_stats.total}`}</Typography>
              <Typography variant='body'>{`Avg: ${trend.entity_trend_stats.average}`}</Typography>
            </Stack>
            <Typography
              variant='caption'
              color='gray'
            >{`Updated: ${trend.updated}`}</Typography>
          </Stack>
        </Stack>
      </Card>
      {/* Player Stats dialog, with trend information to display */}
      {playerStatsOpen && (
        <PlayerStats
          player={trend.entity}
          league={league}
          playerStatsOpen={playerStatsOpen}
          setPlayerStatsOpen={setPlayerStatsOpen}
          trendStatKey={trend.stat.key}
          trendConditions={trend.entity_trend_condition}
          trendDescription={trend.entity_trend_readable_string}
        />
      )}
    </>
  );
};

export default PlayerTrendCard;
