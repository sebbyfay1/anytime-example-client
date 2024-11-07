import { APIKEY } from './apiKey';

export const fetchPlayerAverages = async (leagueId, playerId, conditions) => {
  try {
    const response = await fetch(
      `https://api.anytimelabs.io/v1beta/leagues/${leagueId}/players/${playerId}/averages?key=${APIKEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conditions),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to fetch player averages');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};

export const fetchPlayerGameLogs = async (leagueId, playerId, conditions) => {
  try {
    const response = await fetch(
      `https://api.anytimelabs.io/v1beta/leagues/${leagueId}/players/${playerId}/game-logs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conditions),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch player game logs');
    }

    const data = await response.json();
    console.log('game logs:', data);
    return data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};
