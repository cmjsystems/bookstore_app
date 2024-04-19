import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import "./../App.css";

// import { AuthContext } from "../contexts/AuthProvider";

// import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";

function BookshopPage() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);  // List of books

  // Validate the password with a maximum of attempts
  function handleLogin() {
    const max_attempts = 3;
    let attempts = 0;

    while (attempts < max_attempts) {
      const password = prompt('Enter password:');

      if (password === 'team5') {
        return true;
      }
      attempts++;
    }

    alert('Too many attempts. Try again later.');

    return false;
  }

  // function handleHomePageClick() {
  //   navigate('/'); // Navigate to the Home page
  // }

  const fetchBookList = async () => {
    try {
      const response = await api.get('/books');
      const { books } = response.data;
      setBookList(books);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  function handleLoginPageClick() {
    navigate('/login'); // Navigate to the Login/Register page
  }

  function handleRegisterAdmPageClick() {
    if (handleLogin()) {
      navigate('/registeradm');  // Navigate to the Register Adm page
    }
  }

  async function handleBooksByAuthorClick() {
    // Find the books by author
    const author = prompt('Enter the author:');

    if (author === null) return;

    if (!author) {
      fetchBookList();
      return;
    }

    try {
      const response = await api.get(`/books/author/${author}`);
      const { books } = response.data;
      setBookList(books);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  }

  async function handleBooksByCategoryClick() {
    // Find the books by category
    const category = prompt('Enter the category:');

    if (category === null) return;

    if (!category) {
      fetchBookList();
      return;
    }

    try {
      const response = await api.get(`/books/category/${category}`);
      const { books } = response.data;
      setBookList(books);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  }

  async function handleBooksUnderPriceClick() {
    // Find the books under price
    const price = prompt('Enter the price:');

    if (price === null) return;

    if (!price) {
      fetchBookList();
      return;
    }

    try {
      const response = await api.get(`/books/price/${price}`);
      const { books } = response.data;
      setBookList(books);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  }

  function handleClearFilterClick() {
    fetchBookList();              // Clear the filter
  }

  return (
    <div className="div_insert_update">

      <h1>
        Welcome to the Team 5 Bookstore!
        <br />
        {/* <Header />  Header of the page */}
      </h1>

      <p>In our bookstore you will find several varieties of books from the most diverse categories...</p>

      <br />

      {/* {user && (
        <p>Welcome, {user.fullname}, (type: {user.type})!</p>
      )} */}

      <br />

      <div className="div_row_buttons3">
        {/* <Button onClick={handleHomePageClick} label="Home Page" /> */}
        <Button onClick={handleLoginPageClick} label="Login" />
        <Button onClick={handleRegisterAdmPageClick} label="Intranet" />
      </div>

      <div className="div_row_buttons3">
          <>
            <Button onClick={handleBooksByAuthorClick} label="Display all books by a specific author" />
            <Button onClick={handleBooksByCategoryClick} label="Display all books by a specific category" />
            <Button onClick={handleBooksUnderPriceClick} label="Display all books under a certain price" />
          </>
      </div>

      <br />

      {/* Show the booklist */}
      
      <p>
        <Button onClick={handleClearFilterClick} label="Clear Filter" />
        &ensp;
        &ensp;
        &ensp;
        
        List of available books: ({bookList.length})
      </p>
      <>
        <table className="table_1">
          <thead>
            <tr>
              <th className="table_th_1"> Id        </th>
              <th className="table_th_1"> Title     </th>
              <th className="table_th_1"> Author    </th>
              <th className="table_th_1"> ISBN      </th>
              <th className="table_th_1"> Category  </th>
              <th className="table_th_1"> Price     </th>
            </tr>
          </thead>
          <tbody>
            {bookList && bookList.map(book => (
              <tr key={book.id}>
                <td className="table_td_1"> {book.id}       </td>
                <td className="table_td_1"> {book.title}    </td>
                <td className="table_td_1"> {book.author}   </td>
                <td className="table_td_1"> {book.isbn}     </td>
                <td className="table_td_1"> {book.category} </td>
                <td className="table_td_1"> {book.price}    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <hr />

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default BookshopPage;