import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { GitHubUser } from '../types';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNextCandidate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get list of users
      const users = await searchGithub();
      console.log('Users from searchGithub:', users);

      if (!users || users.length === 0) {
        setError('No candidates found. Please try again.');
        return;
      }

      // Get detailed user info
      const detailedUser = await searchGithubUser(users[0].login);
      console.log('Detailed user data:', detailedUser);

      if (!detailedUser || !detailedUser.login) {
        setError('Failed to load candidate details. Please try again.');
        return;
      }

      setCurrentCandidate(detailedUser);
      
    } catch (err) {
      console.error('Error in loadNextCandidate:', err);
      setError('Failed to load candidate. Please check your GitHub token and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNextCandidate();
  }, []);

  const handleAcceptCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const updatedCandidates = [...savedCandidates, currentCandidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      loadNextCandidate();
    }
  };

  const handleRejectCandidate = () => {
    loadNextCandidate();
  };

  // Add a manual refresh button for testing
  const handleManualRefresh = () => {
    loadNextCandidate();
  };

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Loading candidate...</h2>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>{error}</h2>
      <button 
        onClick={handleManualRefresh}
        style={{ marginTop: '1rem', backgroundColor: '#646cff' }}
      >
        Try Again
      </button>
    </div>
  );

  if (!currentCandidate) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>No candidate loaded</h2>
      <button 
        onClick={handleManualRefresh}
        style={{ marginTop: '1rem', backgroundColor: '#646cff' }}
      >
        Load Candidate
      </button>
    </div>
  );

  return (
    <div style={{ 
      maxWidth: '600px',
      width: '90%',
      margin: '2rem auto',
      padding: '2rem',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <img 
          src={currentCandidate.avatar_url} 
          alt={currentCandidate.name || currentCandidate.login}
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%',
            margin: '0 auto 1rem',
            border: '3px solid rgba(255, 255, 255, 0.1)'
          }}
        />
        
        <h2 style={{ 
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          {currentCandidate.name || currentCandidate.login}
        </h2>
        
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '1rem'
        }}>
          @{currentCandidate.login}
        </p>

        {currentCandidate.location && (
          <p style={{ marginBottom: '0.5rem' }}>
            📍 {currentCandidate.location}
          </p>
        )}

        {currentCandidate.company && (
          <p style={{ marginBottom: '0.5rem' }}>
            🏢 {currentCandidate.company}
          </p>
        )}

        {currentCandidate.email && (
          <p style={{ marginBottom: '0.5rem' }}>
            ✉️ {currentCandidate.email}
          </p>
        )}

        <a 
          href={currentCandidate.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            marginTop: '1rem',
            marginBottom: '2rem',
            color: '#646cff',
            textDecoration: 'none'
          }}
        >
          View GitHub Profile
        </a>

        <div style={{ 
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button 
            onClick={handleRejectCandidate}
            style={{
              backgroundColor: '#ff4444',
              fontSize: '1.5rem',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
          >
            -
          </button>
          <button 
            onClick={handleAcceptCandidate}
            style={{
              backgroundColor: '#00c851',
              fontSize: '1.5rem',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
          >
            +
          </button>
        </div>

        {/* Add refresh button for testing */}
        <button 
          onClick={handleManualRefresh}
          style={{ 
            marginTop: '2rem',
            backgroundColor: '#646cff',
            fontSize: '0.9rem'
          }}
        >
          Load Next Candidate
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;