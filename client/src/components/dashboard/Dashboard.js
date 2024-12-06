import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopUpModal from './TopUpModal';
import Dialer from './Dialer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user?.fullName}</h2>
        <div className="balance-container">
          <h3>Balance: {user?.currency} {user?.balance.toFixed(2)}</h3>
          <button onClick={() => setShowTopUp(true)}>Top Up</button>
        </div>
      </div>

      <Dialer />

      {showTopUp && (
        <TopUpModal 
          onClose={() => setShowTopUp(false)} 
          onSuccess={fetchUserData}
        />
      )}
    </div>
  );
};

export default Dashboard; 