import { useState, useEffect } from 'react';
import { GitHubUser } from '../types';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Potential Candidates</h1>
        <p>No candidates have been accepted yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Potential Candidates
      </h1>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Company</th>
              <th>Email</th>
              <th style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td style={{ textAlign: 'center' }}>
                  <img 
                    src={candidate.avatar_url} 
                    alt={candidate.name || candidate.login}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%',
                      margin: '0 auto'
                    }}
                  />
                </td>
                <td>{candidate.name || '-'}</td>
                <td>
                  <a 
                    href={candidate.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    @{candidate.login}
                  </a>
                </td>
                <td>{candidate.location || '-'}</td>
                <td>{candidate.company || '-'}</td>
                <td>{candidate.email || '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => handleRemoveCandidate(candidate.id)}
                    style={{ backgroundColor: '#ff4444' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
