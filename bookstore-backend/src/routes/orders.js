const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH || '');

// Get the Orders list
router.get('/orders', (req, res) => {
    db.all('SELECT * FROM orders', (err, rows) => {
      if (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  // Get a specific Order by ID
  router.get('/order/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!row) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json(row);
      }
    });
  });
  
// Get the Orders list by User ID
router.get('/orders/user_id/:user_id', (req, res) => {
  const { user_id } = req.params;
  db.get('SELECT * FROM books WHERE user_id = ?', [user_id], (err, row) => {
      if (err) {
          console.error('Error fetching user id:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (!row) {
          res.status(404).json({ error: 'User ID not found' });
      } else {
          res.json(row);
      }
  });
});  

  // Add a new Order
  router.post('/order', (req, res) => {
    const {
      book_id,
      user_id,
      quantity,
      order_date,
    } = req.body;
  
    db.run(
      `INSERT INTO books (book_id, user_id, quantity, order_date) 
        VALUES (?, ?, ?, ?)`,
      [book_id, user_id, quantity, order_date],
      (err) => {
        if (err) {
          console.error('Error adding order:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'Order added successfully' });
        }
      }
    );
  });

  // Update a Order by ID
  router.put('/order/:id', (req, res) => {
    const { id } = req.params;
    const {
        book_id,
        user_id,
        quantity,
        order_date,
    } = req.body;
  
    db.run(
      `UPDATE orders SET 
      book_id = ?, 
      user_id = ?,
      quantity = ?,
      order_date = ?,
      WHERE id = ?`,
      [book_id, user_id, quantity, order_date, id],
      (err) => {
        if (err) {
          console.error('Error updating order:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'Order updated successfully' });
        }
      }
    );
  });
  
  // Delete a Order by ID
  router.delete('/order/:id', (req, res) => {
    const { id } = req.params;
  
    db.run('DELETE FROM orders WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting order:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Order deleted successfully' });
        }
    });
  });

module.exports = router;