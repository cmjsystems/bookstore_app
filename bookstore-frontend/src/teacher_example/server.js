const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { host, user, password, database } = require('./backendsettings');
const SALTROUNDS = 10; // Number of salt rounds to use for hashing

const app = express();
const port = 3001;

// Middlewares
app.use(cors()); // To enable CORS
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// API endpoints
app.post('/api/register', (req, res) => {
    const { username, password, fullname } = req.body;
    const SELECT_USER_QUERY = `SELECT * FROM users WHERE username = ?`;
  
    // Check if username already exists
    db.query(SELECT_USER_QUERY, [username], (err, result) => {
      if (err) {
        console.error('Error checking username:', err);
        res.status(500).send(`Error registering user: ${err.message}`);
      } else if (result.length > 0) {
        // Username already exists
        res.status(400).send('Username already taken');
      } else {
        // Username doesn't exist, proceed with registration
        bcrypt.hash(password, SALTROUNDS, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send(`Error registering user: ${err.message}`);
          } else {
            const INSERT_USER_QUERY = `INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)`;
            db.query(INSERT_USER_QUERY, [username, hashedPassword, fullname], (err, result) => {
              if (err) {
                console.error('Error registering user:', err);
                res.status(500).send(`Error registering user: ${err.message}`);
              } else {
                res.status(200).send('User registered successfully');
              }
            });
          }
        });
      }
    });
  });

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const SELECT_USER_QUERY = `SELECT * FROM users WHERE username = ?`;
    db.query(SELECT_USER_QUERY, [username], (err, result) => {
      if (err) {
        console.error('Error retrieving user:', err);
        res.status(500).send(`Error logging in: ${err.message}`);
      } else if (result.length === 0) {
        res.status(401).send('Invalid username or password');
      } else {
        const user = result[0];
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).send(`Error logging in: ${err.message}`);
          } else if (passwordMatch) {
            res.status(200).send('Login successful');
          } else {
            res.status(401).send('Invalid username or password');
          }
        });
      }
    });
  });  

app.get('/api/books', (req, res) => {
    const SELECT_BOOKS_QUERY = 'SELECT * FROM books';
    db.query(SELECT_BOOKS_QUERY, (err, results) => {
      if (err) {
        console.error('Error fetching books:', err);
        res.status(500).send(`Error fetching books: ${err.message}`);
      } else {
        res.json(results);
      }
    });
  });

app.post('/api/books', (req, res) => {
    const { title, authors, isbn, publishingdate, edition, unitsininventory, priceperunit } = req.body;
    const INSERT_BOOK_QUERY = 'INSERT INTO books (title, authors, isbn, publishingdate, edition, unitsininventory, priceperunit) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(INSERT_BOOK_QUERY, [title, authors, isbn, publishingdate, edition, unitsininventory, priceperunit], (err, result) => {
      if (err) {
        console.error('Error inserting book:', err);
        res.status(500).send(`Error inserting book: ${err.message}`);
      } else {
        res.status(201).send('Book inserted successfully');
      }
    });
  });

app.listen(port, () => console.log(`Server running on port ${port}`));