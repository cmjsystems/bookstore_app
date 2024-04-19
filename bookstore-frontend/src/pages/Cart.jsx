import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';
import "./../App.css";

function CartPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { clearCart } = useContext(CartContext);

  const [itemsWithDetails, setItemsWithDetails] = useState([]);
  // const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const items = await Promise.all(cartItems.map(async (item) => {
        const response = await api.get(`/books/book/${item.id}`);
        const { data } = response;
        return { ...data, quantity: item.amount };
      }));
      setItemsWithDetails(items);
    } catch (error) {
      console.error('Error fetching cart data.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [id, cartItems]); // Reload items when cart items change

  function handleBooklistPageClick() {
    navigate('/booklist'); // Navigate to the Booklist page
  }

  function handleCheckoutClick() {
    // Implement checkout functionality
    const confirmed = window.confirm("Can you confirm the order?");
    if (confirmed) {
      const order = {
        items: itemsWithDetails.map(item => ({
          bookId: item.book.id,
          quantity: item.quantity
        })),
        total: itemsWithDetails.reduce((total, item) => total + (item.quantity * item.book.price), 0)
      };
      // Send the order data to the server for processing
      api.post('/order', order)
        .then(response => {
          // Order successfully placed, navigate to the order confirmation page
          navigate('/order-confirmation', { state: { orderId: response.data.orderId } });
        })
        .catch(error => {
          console.error('Error placing the order:', error);
          // Handle the error, show an error message to the user, etc.
        });
    } else {
      // User canceled the order
    }
  }

  function handleHomePageClick() {
    clearCart();
    navigate('/'); // Navigate to the Home page
  }

  return (
    <div className="div_insert_update" key={refreshKey}>

      <h1>Bookstore - Cart</h1>
      <br />
      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, you have {cartItems.length} item(s) in your cart!
        </h2>
      )}
      <br />
      <p>
        <Button onClick={clearCart} label="Clear Cart" />
      </p>
      <br />

      {!isLoading ? (
        itemsWithDetails && itemsWithDetails.length > 0 ? (
          <table className="table_2">
            <thead>
              <tr>
                <th className="table_th_2">Title        </th>
                <th className="table_th_2">Quantity     </th>
                <th className="table_th_2">Price        </th>
                <th className="table_th_2">Total Value  </th>
                <th className="table_th_2">Actions      </th>
              </tr>
            </thead>
            <tbody>
              {itemsWithDetails.map((item, index) => (
                <tr key={index}>
                  <td className="table_td_2">{item.book.title}                                </td>
                  <td className="table_td_2">{item.quantity}                                  </td>
                  <td className="table_td_2">${item.book.price.toFixed(2)}                    </td>
                  <td className="table_td_2">${(item.quantity * item.book.price).toFixed(2)}  </td>
                  <td>
                    <button onClick={() => removeFromCart(item.book.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty</p>
        )
      ) : (
        <p>Loading...</p>
      )}

      <div className="div_row_buttons2">
        <>
          <Button onClick={handleBooklistPageClick} label="Book list" />
          <Button onClick={handleCheckoutClick} label="Checkout" />
          <Button onClick={handleHomePageClick} label="Logout" />
        </>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CartPage;