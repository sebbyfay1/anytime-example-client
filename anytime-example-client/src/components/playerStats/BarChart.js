import { Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const PlayerStatsBarChart = ({ playerGameLogs, statKey, playerTeamId }) => {
  const xAxisTiles = playerGameLogs.map((game, index) => {
    const gameLabel =
      playerTeamId === game.game.home_team.id
        ? `vs ${game.game.away_team.abbr}`
        : `@ ${game.game.home_team.abbr}`;

    // Adding a unique identifier to avoid collisions
    return `${gameLabel} (${index + 1})`;
  });
  const data = playerGameLogs.map((game) => game.stats[statKey]);

  console.log('statKey', statKey);

  return (
    <Stack direction='column' spacing={2} paddingX={2}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        Stats
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisTiles }]}
        colors={['orange']}
        series={[
          {
            data: data,
          },
        ]}
        height={300}
        borderRadius={4}
      />
    </Stack>
  );
};

export default PlayerStatsBarChart;
