import React from 'react';

function Logout() {
    sessionStorage.removeItem('username');
    window.location.href = '/'; // Redirect to home page after logout

  return (
    <div>
    </div>
  );  
}

export default Logout;
