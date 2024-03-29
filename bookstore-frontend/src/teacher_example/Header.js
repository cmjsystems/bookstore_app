import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const username = sessionStorage.getItem('username');
  const isLoggedIn = username && typeof username === 'string' && username.trim() !== '' 

  return (
    <div>
      <h3>User: {isLoggedIn ? username : 'No user logged in'}</h3>
      {!isLoggedIn && <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>}
      {isLoggedIn && <Link to="/logout" style={{ marginRight: '10px' }}>Logout</Link>}
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Header;
