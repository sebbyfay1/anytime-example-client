import { APIKEY } from './apiKey';

export const fetchTrends = async (filters) => {
  try {
    const response = await fetch(
      `https://api.anytimelabs.io/v1beta/trends?key=${APIKEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
        next: {
          revalidate: 10,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch player averages');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};

export const fetchPlayerTrends = async (filters) => {
  try {
    const response = await fetch(`https://api.anytimelabs.io/v1beta/trends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
      next: {
        revalidate: 10,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch player averages');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};
