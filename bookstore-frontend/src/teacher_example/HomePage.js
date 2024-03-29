import React from 'react';
import Header from './Header';
import Books  from './Books';
import './ComponentsStyles.css'; // Import CSS file for styling

function HomePage() {
  return (
    <div className="container">
      <h2>Home Page</h2>
      <Header />
      <p>Welcome to the book management system!</p>
      <Books />
    </div>
  );
}

export default HomePage;
