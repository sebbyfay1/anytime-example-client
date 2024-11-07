'use client';

import { useState, useEffect } from 'react';

// material ui
import {
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { fetchUpcomingGames } from '@/api/fetchUpcomingGames';

const GameFilter = ({
  selectedLeague,
  setSelectedLeague,
  selectedGame,
  setSelectedGame,
}) => {
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch upcoming games based on selected league
  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      const games = await fetchUpcomingGames(selectedLeague);
      setLoading(false);
      setUpcomingGames(games);
    };
    getGames();
  }, [selectedLeague]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <Stack direction='column' spacing={1}>
        <Stack
          direction='row'
          width='100%'
          spacing={1}
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            Upcoming Games
          </Typography>
          <Select
            value={selectedLeague}
            label='League'
            onChange={(e) => {
              setSelectedLeague(e.target.value); // Use e.target.value
            }}
          >
            <MenuItem value={'nfl'}>🏈 NFL</MenuItem>
            <MenuItem value={'nba'}>🏀 NBA</MenuItem>
            <MenuItem value={'nhl'}>🏒 NHL</MenuItem>
          </Select>
        </Stack>

        <Divider />
        <Stack direction='row' width='100%' spacing={1} overflow='auto'>
          <Button
            variant={selectedGame === 'trends' ? 'contained' : 'outlined'} // Corrected variant prop
            color='primary'
            sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
            onClick={() => setSelectedGame('trends')}
          >
            Trends
          </Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {upcomingGames?.map((game, index) => {
                return (
                  <Button
                    key={index}
                    variant={
                      selectedGame.id === game.id ? 'contained' : 'outlined'
                    }
                    color='primary'
                    sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
                    onClick={() => setSelectedGame(game)}
                  >
                    {`${game.away_team.abbr} @ ${game.home_team.abbr}`}{' '}
                    {/* Display team abbreviations */}
                  </Button>
                );
              })}
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default GameFilter;
