import { Stack, Typography } from '@mui/material';

const TrendDescription = ({ trendDescription }) => {
  return (
    <Stack direction='column' spacing={2} paddingX={2}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        Insight
      </Typography>
      <Typography variant='body'>{trendDescription}</Typography>
    </Stack>
  );
};

export default TrendDescription;
