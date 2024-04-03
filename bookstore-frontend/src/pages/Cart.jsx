import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthProvider";
// import { CartContext } from './CartContext';

function CartPage() {
//   const { cartItems, removeFromCart } = useContext(CartContext);

//   return (
//     <div>
//       <h2>Cart Page</h2>
//       {cartItems.length > 0 ? (
//         <ul>
//           {cartItems.map((item, index) => (
//             <li key={index}>
//               {item.name} - ${item.price}
//               <button onClick={() => removeFromCart(item.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Your cart is empty</p>
//       )}
//     </div>
//   );
}

export default CartPage;