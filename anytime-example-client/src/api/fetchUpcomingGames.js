import { APIKEY } from './apiKey';

export const fetchUpcomingGames = async (league_id) => {
  try {
    const response = await fetch(
      `https://api.anytimelabs.io/v1beta/leagues/${league_id}/games/upcoming?key=${APIKEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 10,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming games');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};
