import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './ComponentsStyles.css'; // Import CSS file for styling
const { apiurl } = require('./frontendsettings');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear feedback messages
    setError('');
    setSuccess('');

    // validate empty
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(`${apiurl}/login`, { 
        username, 
        password 
      });
      
      // Add username to session storage
      sessionStorage.setItem('username', username);
      
      setSuccess(response.data);
      console.log(response.data);

      window.location.href = '/'; // Redirect to home page after login
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data);
    }
  };

  const handleCancel = () => {
    window.location.href = '/'; // Redirect to home page after cancel
  };

  return (
    <div className="container">
      <h2>User Login</h2>
      <Header />
      <p>This page will allow you to log in to the system.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <form id="myForm" onSubmit={handleLogin}>
          <div>
            <label>User name (Login) </label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password  </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' style={{ marginRight: '10px' }}>Login</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
