import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">VoIP App</Link>
      </div>
      <div className="nav-items">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 