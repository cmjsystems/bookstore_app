import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './ComponentsStyles.css'; // Import CSS file for styling
const { apiurl } = require('./frontendsettings');

function Register() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const handleRegister = async (e) => {
    e.preventDefault()

    // Clear feedback messages
    setError('');
    setSuccess('');

    // validate empty
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    try {
      // Send HTTP request to nodejs api
      const response = await axios.post(`${apiurl}/register`, { 
        username, 
        password, 
        fullname 
      });

      setSuccess(response.data);
      console.log(response.data);
      window.location.href = '/'; // Redirect to homepage after update
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setError('Username already exists. Please choose a different username.');
        } else {
            // If error clear set error  message
            setError(`An error occurred while registering. Please try again later: ${error.message}`);
        }
    };
  };

  const handleCancel = () => {
    window.location.href = '/'; // Redirect to home page after cancel
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <Header />
      <p>This page will allow you to Register new users in the system.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label>Full name  </label>
            <input
              type="text"
              value={fullname}
              required
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <label>User name (Login)  </label>
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
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{ marginRight: '10px' }}>Register</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
