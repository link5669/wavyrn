import React, { useState } from 'react';

const PasswordProtection = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://wavyrn-backend-6f7b3a192f6c.herokuapp.com/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('authToken', token);
        onAuthenticated();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Access Editor
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PasswordProtection
