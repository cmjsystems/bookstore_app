import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Books from './Books';
import AddBook from './AddBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addbook" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
