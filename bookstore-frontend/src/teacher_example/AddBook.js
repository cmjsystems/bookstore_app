import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { isUserLoggedIn } from './Utils';
import './ComponentsStyles.css'; // Import CSS file for styling
const { apiurl } = require('./frontendsettings');

function AddBook() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishingdate, setPublishingdate] = useState('');
  const [edition, setEdition] = useState('');
  const [unitsininventory, setUnitsininventory] = useState('');
  const [priceperunit, setPriceperunit] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!isUserLoggedIn()) {
      setError('To add books the user needs to be registered and logged in');
      return;
    }

    try {
      const response = await axios.post(`${apiurl}/books`, {
        title,
        authors,
        isbn,
        publishingdate,
        edition,
        unitsininventory,
        priceperunit
      });

      setSuccess(response.data);
      console.log(response.data);
      window.location.href = '/'; // Redirect to homepage after update
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
      <h2>Add New Book</h2>
      <Header />
      <p>This page will allow you to Add new books to the inventory. Only logged in users are authorized to add new books.</p>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <form onSubmit={handleAddBook}>
          <div>
            <label>Title  </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Authors  </label>
            <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
          </div>
          <div>
            <label>ISBN  </label>
            <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
          </div>
          <div>
            <label>Publishing Date  </label>
            <input type="date" value={publishingdate} onChange={(e) => setPublishingdate(e.target.value)} required />
          </div>
          <div>
            <label>Edition  </label>
            <input type="text" value={edition} onChange={(e) => setEdition(e.target.value)} required />
          </div>
          <div>
            <label>Units in Inventory  </label>
            <input type="number" value={unitsininventory} onChange={(e) => setUnitsininventory(e.target.value)} required />
          </div>
          <div>
            <label>Price per unit (CAD)  </label>
            <input type="number" step="any" value={priceperunit} onChange={(e) => setPriceperunit(e.target.value)} required />
          </div>
          <button type="submit" style={{ marginRight: '10px' }}>Add Book</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
