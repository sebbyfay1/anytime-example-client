'use client';

import { useEffect, useState } from 'react';

// material ui
import { CircularProgress, Stack } from '@mui/material';

// project imports
import GameFilter from './GameFilter';
import PlayerTrendCard from './playerTrends/PlayerTrendCard';
import { fetchTrends } from '@/api/fetchTrends';
import { fetchPlayersOnTeam } from '@/api/fetchPlayersOnTeam';
import PlayerCard from './playerCards/PlayerCard';

const PageWrapper = () => {
  const [selectedGame, setSelectedGame] = useState('trends');
  const [selectedLeague, setSelectedLeague] = useState('nfl');
  const [loading, setLoading] = useState(true);
  const [trends, setTrends] = useState([]);
  const [players, setPlayers] = useState([]);

  // fetch trends based on selected league
  useEffect(() => {
    const getTrends = async () => {
      setLoading(true);
      const trends = await fetchTrends({
        league_ids: [selectedLeague],
        max_results: 100,
        max_results_per_entity: 3,
        max_results_per_entity_stat_key: 1,
      });
      setLoading(false);
      setTrends(trends);
    };
    if (selectedGame === 'trends') getTrends();
  }, [selectedGame, selectedLeague]);

  // fetch players based on selected game
  useEffect(() => {
    const getPlayersOnTeam = async () => {
      setLoading(true);
      const awayPlayers = await fetchPlayersOnTeam(
        selectedLeague,
        selectedGame.away_team.id
      );
      const homePlayers = await fetchPlayersOnTeam(
        selectedLeague,
        selectedGame.home_team.id
      );
      setLoading(false);
      setPlayers([...awayPlayers, ...homePlayers]);
    };
    if (selectedGame != 'trends') getPlayersOnTeam();
  }, [selectedGame]);

  return (
    <Stack direction='column' spacing={2} overflow='auto' sx={{ padding: 1 }}>
      <GameFilter
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
      />
      {selectedGame === 'trends' ? (
        <Stack direction='column' spacing={2}>
          {trends?.map((trend, index) => (
            <PlayerTrendCard
              key={index}
              trend={trend}
              league={selectedLeague}
            />
          ))}
        </Stack>
      ) : (
        <Stack direction='column' spacing={2}>
          {players?.map((player, index) => {
            return (
              <PlayerCard key={index} player={player} league={selectedLeague} />
            );
          })}
        </Stack>
      )}
      {loading ? <CircularProgress /> : <></>}
    </Stack>
  );
};

export default PageWrapper;
