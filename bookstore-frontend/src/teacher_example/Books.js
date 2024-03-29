import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ComponentsStyles.css'; // Import CSS file for styling
const { apiurl } = require('./frontendsettings');

function Books() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${apiurl}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Link to="/addbook">Add New Book</Link><br/><br/>
      {books && books.length> 0 ? (
        <div className="books-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              Title: {book.title}<br />
              Author: {book.authors}<br />
              ISBN: {book.isbn}<br />
              Publishing Date: {new Date(book.publishingdate).toLocaleDateString()}<br />
              Edition: {book.edition}<br />
              Units in inventory: {book.unitsininventory}<br />
              Unit Price: {book.priceperunit}<br />
            </div>
          </div>
        ))}
      </div>
    ) : (
        <p>The books inventory is empty. Please, select enlace "Add New Book" to populate the inventory.</p>
      )}
    </div>
  );
}

export default Books;
