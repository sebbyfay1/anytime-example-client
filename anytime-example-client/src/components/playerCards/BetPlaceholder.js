import { Button, Stack, Typography } from '@mui/material';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BetPlaceholder = ({ betIndex }) => {
  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent='space-between'
      alignItems='center'
    >
      <Button
        variant='outlined'
        color='primary'
        startIcon={<ExpandLessIcon />}
        sx={{ textTransform: 'none' }}
      >
        Over
      </Button>
      <Typography variant='caption'>{`Placeholder Bet #${betIndex}`}</Typography>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<ExpandMoreIcon />}
        sx={{ textTransform: 'none' }}
      >
        Under
      </Button>
    </Stack>
  );
};

export default BetPlaceholder;
