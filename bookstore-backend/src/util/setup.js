const sqlite3 = require('sqlite3');

function setup() {
    const db = new sqlite3.Database(process.env.DB_PATH || '');

    // Create USERS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        fullname TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    )`);

    // Create BOOKS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )`);

    // Create ORDERS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        book_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        total REAL NOT NULL,
        FOREIGN KEY (book_id) REFERENCES books(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
}

module.exports = setup;