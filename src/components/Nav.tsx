// Nav.tsx
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-item">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          Candidate Search
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink 
          to="/SavedCandidates" 
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          Saved Candidates
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;