import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

function UsersPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);  // List of users
  const { clearCart } = useContext(CartContext);

  // const userList = [      // List of users
  //         { id: 1, username: 'admin', fullname: 'Admin User', type: 'admin' },
  //         { id: 2, username: 'user', fullname: 'Normal User', type: 'user' },
  //         { id: 3, username: 'guest', fullname: 'Guest User', type: 'guest' },
  //         { id: 4, username: 'test', fullname: 'Test User', type: 'test' },
  //     ];
  // setUserList(users)

  const fetchUserList = async () => {
    try {
      const response = await api.get('/users');
      const { users } = response.data;
      setUserList(users);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  function handleMainPageClick() {
    navigate('/main');                    // Navigate to the Orders page
  }

  async function handleUserByUserNameClick() {
    const username = prompt('Enter the user name:');

    if (username === null) return;

    if (!username) {
      fetchUserList();
      return;
    }

    try {
      const response = await api.get(`/users/username/${username}`);
      const { user } = response.data;
      setUserList([user]);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }

  function handleClearFilterClick() {
    fetchUserList();                      // Clear the filter
  }
  
  function handleHomePageClick() {
    clearCart();
    navigate('/');                        // Navigate to the Home page
  }

  return (
    <div className="div_insert_update">

      <h1>Bookstore - User List</h1>

      <br />
      <br />

      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, what would you like to do?
        </h2>
      )}
      <br />

      <div className="div_row_buttons3">
        <>
          <Button onClick={handleUserByUserNameClick} label="Display the user by user name" />
        </>
      </div>

      <div className="div_row_buttons3">
        <>
          <Button onClick={handleMainPageClick} label="Main" />
          <Button onClick={handleHomePageClick} label="Logout" />
        </>
      </div>

      <p>
        <Button onClick={handleClearFilterClick} label="Clear Filter" />
        &ensp;
        &ensp;
        &ensp;
        
        List of available users: ({userList.length})
      </p>

      <table className="table_1">
        <thead>
          <tr>
            <th className="table_th_1">ID           </th>
            <th className="table_th_1">Full Name    </th>
            <th className="table_th_1">User Name    </th>
            <th className="table_th_1">Type         </th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.map(user => (
            <tr key={user.id}>
              <td className="table_td_1">{user.id}       </td>
              <td className="table_td_1">{user.fullname} </td>
              <td className="table_td_1">{user.username} </td>
              <td className="table_td_1">{user.type}     </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default UsersPage;
