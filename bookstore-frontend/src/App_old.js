import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { BrowserRouter, Router, Route, Redirect, Link } from 'react-router-dom';
// import { BrowserRouter, Router, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import BookList from './pages/BookList';
import Order from './pages/Order';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Bookstore</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/books">Book List</Nav.Link>
              <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
              <Nav.Link as={Link} to="/order">Order</Nav.Link>
            </Nav>
          </Navbar>

          <Route path="/books" component={BookList} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/order" component={Order} />
          <Route exact path="/">
            <Redirect to="/books" />
          </Route>
        </div>
      </Router>
    </BrowserRouter>
  );
}

export default App;