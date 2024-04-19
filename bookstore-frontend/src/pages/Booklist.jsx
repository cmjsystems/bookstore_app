import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

import "./../App.css";

function BooklistPage() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);  // List of books

  // const user = { id: 1, username: 'admin', type: 'admin' };
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const isUserAdmin = user && user.type === 'admin';
  const isUserUser = user && user.type === 'user';
  const { clearCart } = useContext(CartContext);

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

  function handleAddBookClick() {
    navigate('/addbook');         // Navigate to the Add Book page
  }

  function handleClearFilterClick() {
    fetchBookList();              // Clear the filter
  }

  async function handleUpdBookClick(bookId) {
    navigate(`/updbook/${bookId}`);       // Navigate to the Update Book page with the book ID
  }

  async function handleDelBookClick(id) {
    try {
      const response = await api.delete(`/book/${id}`);
      if (response.status !== 200) {
        console.error('Error deleting book:', response.data);
      }
      fetchBookList();
    } catch (error) {
      console.error('Error deleting book:', error);
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

  function handleCartPageClick() {
    navigate('/cart');                  // Navigate to the Cart page
  }
  
  async function handleAddToCartClick(id) {
    const amount = prompt('Enter the amount:');

    if (amount === null) return;

    const item = { id, amount: parseInt(amount) };

    // Check if the amount is valid
    if (item.amount > 0 && item.amount <= bookList.find(book => book.id === id).quantity) {
      await addToCart(item);
    } else {
      alert('Invalid amount. Enter a quantity less than or equal to that available in stock.');
    }
  }

  function handleOrdersPageClick() {
    navigate('/orders');            // Navigate to the Orders page
  }

  function handleMainPageClick() {
    navigate('/main');              // Navigate to the Orders page
  }

  function handleHomePageClick() {
    clearCart();
    navigate('/');        // Navigate to the Home page
  }

  return (
    <div className="div_insert_update">

      <h1>Bookstore - Book list</h1>

      <br />
      <br />

      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, what would you like to do?
        </h2>
      )}
      <br />

      <div>
        <div className="div_row_buttons3">
          <>
            <Button onClick={handleBooksByAuthorClick} label="Display all books by a specific author" />
            <Button onClick={handleBooksByCategoryClick} label="Display all books by a specific category" />
            <Button onClick={handleBooksUnderPriceClick} label="Display all books under a certain price" />
          </>
        </div>

        <div className="div_row_buttons3">
          <>
            <Button onClick={handleOrdersPageClick} label="Orders" />
            <Button onClick={handleMainPageClick} label="Main" />
            <Button onClick={handleHomePageClick} label="Logout" />
          </>
        </div>
      </div>

      <div className="div_row_buttons3">
        <>  
          <p>
            {/* Show the buttons grupo bellow just if the logged user is user type */}
            {isUserUser && (
              <Button onClick={handleCartPageClick} label="Cart" />
            )}
            
            &ensp;
            &ensp;
            <Button onClick={handleClearFilterClick} label="Clear Filter" />
      
            &ensp;
            &ensp;
            {/* Show the buttons grupo bellow just if the logged user is administrator type */}
            {isUserAdmin && (
              <Button onClick={handleAddBookClick} label="Add Book" />
            )}
            &ensp;
            &ensp;
        
            List of available books: ({bookList.length})
          </p>
        </>
      </div>                   
      
      <>
        <table className="table_1">
          <thead>
            <tr>
              {/* Show the buttons grupo bellow just if the logged user is administrator type */}
              {isUserAdmin && (
                <th className="table_th_1">             </th>
              )}
              {isUserAdmin && (
                <th className="table_th_1">             </th>
              )}
              
              {/* Show the buttons grupo bellow just if the logged user is user type */}
              {isUserUser && (
                <th className="table_th_1">             </th>
              )}

              <th className="table_th_1"> Id          </th>
              <th className="table_th_1"> Title       </th>
              <th className="table_th_1"> Author      </th>
              <th className="table_th_1"> ISBN        </th>
              <th className="table_th_1"> Category    </th>
              <th className="table_th_1"> Price       </th>

              {/* Show the Users field just if the logged user is administrator type */}
              {isUserAdmin && (
                <th className="table_th_1"> Quantity </th>
              )}

              {/* Show the Users field just if the logged user is administrator type
              {isUserAdmin && ( */}
                <th className="table_th_1"> In-Stock     </th>
              {/* )} */}

              {/* Show the Users field just if the logged user is administrator type */}
                {isUserAdmin && (
                  <th className="table_th_1"> Total Value </th>
              )}
            </tr>
          </thead>
          <tbody>
            {bookList && bookList.map(book => (
              <tr key={book.id}>
                {/* Show the buttons grupo bellow just if the logged user is administrator type */}
                {isUserAdmin && (
                  // <td className="table_td_1"> <Button onClick={handleUpdBookClick} label="Upd" /> </td>
                  <td> <button onClick={() => handleUpdBookClick(book.id)}>Upd</button> </td>
                )}
                {isUserAdmin && (
                  // <td className="table_td_1"> <Button onClick={handleDelBookClick} label="Del" /> </td>
                  <td> <button onClick={() => handleDelBookClick(book.id)}>Del</button> </td>
                )}

                {/* Show the buttons grupo bellow just if the logged user is user type */}
                {isUserUser && (
                  // <td className="table_td_1"> <Button onClick={handleCartPageClick} label="Cart" /> </td>
                  <td> <button onClick={() => handleAddToCartClick(book.id)}>Add to Cart</button> </td>
                )}
                <td className="table_td_1"> {book.id}               </td>
                <td className="table_td_1"> {book.title}            </td>
                <td className="table_td_1"> {book.author}           </td>
                <td className="table_td_1"> {book.isbn}             </td>
                <td className="table_td_1"> {book.category}         </td>
                <td className="table_td_1"> {book.price.toFixed(2)} </td>
                {/* Show the Users field just if the logged user is administrator type */}
                {isUserAdmin && (
                  <td className="table_td_1"> {book.quantity}       </td>
                )}
                
                {/* Show the Users field just if the logged user is administrator type
                {isUserAdmin && ( */}
                  <td className="table_td_1"> {book.quantity}       </td>
                {/* )} */}

                {/* Show the Users field just if the logged user is administrator type */}
                {isUserAdmin && (
                  <td className="table_td_1"> {(book.quantity * book.price).toFixed(2)} </td>
                )}
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

export default BooklistPage;