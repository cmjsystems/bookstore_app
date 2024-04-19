import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isUserAdmin = user && user.type === 'admin';
  const isUserUser = user && user.type === 'user';
  const { clearCart } = useContext(CartContext);

//   const inventory = useContext(InventoryContext);
//   const [showBooks, setShowBooks] = useState(inventory.books.length > 0);

//   useEffect(() => {
//     setShowBooks(inventory.books.length > 0);
//   }, [inventory.books.length]);

  // Validate the password with a maximum of attempts
  function handleLogin() {
    const max_attempts = 3;
    let attempts = 0;

    while (attempts < max_attempts) {
      if (prompt('Enter security code: ') === 'team5') {
        return true;
      }
      attempts++;
    }

    alert('Too many attempts. Try again later.');

    return false;
  }

  function handleAddOrderClick() {
    if (handleLogin()) {
      navigate('/addorder');        // Navigate to the Add Order page
    }
  }

  function handleUpdOrderClick() {
    if (handleLogin()) {
      navigate('/updateorder');     // Navigate to the Update Order page
    }
  }

  function handleDelOrderClick() {
    if (handleLogin()) {
      navigate('/deleteOrder')      // Navigate to the Delete Order page
    }
  }

  function handleOrderByIdClick() {
    navigate('/orderbyid');         // Navigate to the Order by ID page
  }

  function handleBooklistPageClick() {
    navigate('/booklist');          // Navigate to the Booklist page
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

      <h1>Bookstore - Orders</h1>

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
          {/* Show the buttons grupo bellow just if the logged user is user type */}
          {isUserUser && (
            <>
              <Button onClick={handleAddOrderClick} label="Add Order" />
              <Button onClick={handleUpdOrderClick} label="Update Order" />
              <Button onClick={handleDelOrderClick} label="Delete Order" />
            </>
          )}
        </div>

        <div className="div_row_buttons3">
          <>
            <Button onClick={handleOrderByIdClick} label="Display order by ID" />
          </>
        </div>

        <div className="div_row_buttons3">
          <>
            <Button onClick={handleBooklistPageClick} label="Book list" />
            <Button onClick={handleMainPageClick} label="Main" />
            <Button onClick={handleHomePageClick} label="Logout" />
          </>
        </div>
      </div>

      {/* <hr /> */}
      <br />
      {/* Show the booklist */}
      {/* {parseInt(inventory.books.length) > 1 ? (
          <p>List of available books: ({inventory.books.length})</p>
      ) : (
          <p>Book: ({inventory.books.length})</p>
      )}

      {showBooks > 0 && ( */}
          <p>List of orders: </p>
          <>
          <table className="table_1">
              <thead>
              <tr>
                  <th className="table_th_1"> Id            </th>
                  <th className="table_th_1"> Order Date    </th>
                  {/* <th className="table_th_1"> Book Id       </th> */}
                  {/* <th className="table_th_1"> Book          </th> */}
                  {/* <th className="table_th_1"> User Id       </th> */}
                  <th className="table_th_1"> User/Customer </th>
                  {/* <th className="table_th_1"> Quantity      </th>
                  <th className="table_th_1"> Price         </th> */}
                  <th className="table_th_1"> Total         </th>
              </tr>
              </thead>
              <tbody>
              {/* {inventory.orders.map((order) => (
                  <tr key={order.id}>
                  <td className="table_td_1"> {order.id}          </td>
                  <td className="table_td_1"> {order.order_date}  </td>
                  <td className="table_td_1"> {order.book_id}     </td>
                  <td className="table_td_1"> {book.title}        </td>
                  <td className="table_td_1"> {order.user_id}     </td>
                  <td className="table_td_1"> {user.username}     </td>
                  <td className="table_td_1"> {order.quantity}    </td>
                  <td className="table_td_1"> {order.price}       </td>
                  <td className="table_td_1"> {order.total}       </td>
                  </tr>
              ))} */}
              </tbody>
          </table>
          </>
      {/* )} */}

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default OrdersPage;