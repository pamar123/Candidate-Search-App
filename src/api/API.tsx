const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Attempting API call with start ID:', start);
    console.log('Token exists:', !!import.meta.env.VITE_GITHUB_TOKEN);

    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      }
    );

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${data.message || 'unknown error'}`);
    }

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No users found in response');
    }

    return data;
  } catch (err) {
    console.error('searchGithub error:', err);
    throw err;
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log('Fetching details for user:', username);
    
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      }
    );

    console.log('User details response status:', response.status);
    const data = await response.json();
    console.log('User details data:', data);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${data.message || 'unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('searchGithubUser error:', err);
    throw err;
  }
};

export { searchGithub, searchGithubUser };