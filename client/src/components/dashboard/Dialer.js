import React, { useState } from 'react';
import axios from 'axios';

const Dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState('');

  const handleCall = async () => {
    try {
      setCalling(true);
      setError('');
      
      await axios.post('/api/calls/make-call', 
        { phoneNumber },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      
      // Handle successful call initiation
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate call');
    } finally {
      setCalling(false);
    }
  };

  const handleKeyPress = (key) => {
    setPhoneNumber(prev => prev + key);
  };

  return (
    <div className="dialer">
      <div className="phone-display">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      
      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="keypad-button"
          >
            {key}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
      
      <button
        className="call-button"
        onClick={handleCall}
        disabled={calling || !phoneNumber}
      >
        {calling ? 'Calling...' : 'Call'}
      </button>
    </div>
  );
};

export default Dialer; 