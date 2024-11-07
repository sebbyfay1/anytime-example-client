const { Stack, Typography } = require('@mui/material');

const HitRates = ({ gameLogs, statKey, handicap }) => {
  // we dont have handicaps, so I will use the average as a dummy value
  const average =
    gameLogs.reduce((acc, game) => acc + game.stats[statKey], 0) /
    gameLogs.length;

  let overTotal, underTotal;
  if (average) {
    overTotal = gameLogs.filter((game) => game.stats[statKey] > average).length;
    underTotal = gameLogs.filter(
      (game) => game.stats[statKey] < average
    ).length;
  }

  return (
    <Stack direction='column' spacing={2} paddingX={2}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        Hit Rates (Dummy values)
      </Typography>
      <Stack direction='row' spacing={2} justifyContent='space-around'>
        <Stack direction='column' spacing={0} alignItems='center'>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {`${Number((overTotal / gameLogs.length) * 100).toFixed(2)}%`}
          </Typography>
          <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
            Over
          </Typography>
        </Stack>
        <Stack direction='column' spacing={0}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {`${Number((underTotal / gameLogs.length) * 100).toFixed(2)}%`}
          </Typography>
          <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
            Under
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HitRates;
