export const fetchPlayersOnTeam = async (leagueId, teamId) => {
  try {
    const response = await fetch(
      `https://api.anytimelabs.io/v1beta/leagues/${leagueId}/teams/${teamId}/players`,
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
