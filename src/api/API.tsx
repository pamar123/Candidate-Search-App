const searchGithub = async () => {
  try {
    // Debug token
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log('Token starts with:', token?.substring(0, 4));
    console.log('Token length:', token?.length);
    
    const start = Math.floor(Math.random() * 100000000) + 1;
    
    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };
    
    console.log('Headers:', headers);
    
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      { headers }
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
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      }
    );

    const data = await response.json();
    
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