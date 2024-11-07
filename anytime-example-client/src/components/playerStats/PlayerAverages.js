import { Stack, Typography } from '@mui/material';

const PlayerAverages = ({ playerAverages, positionStatKeys }) => {
  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        padding: 2,
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        Split Player Averages
      </Typography>
      {Object.entries(playerAverages).map(([key, value]) => {
        if (!positionStatKeys[key]) return null;
        return (
          <Stack
            direction='row'
            spacing={2}
            key={key}
            width='100%'
            justifyContent={'space-between'}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              {positionStatKeys[key]}
            </Typography>
            <Typography>{Number(value).toFixed(1)}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PlayerAverages;
