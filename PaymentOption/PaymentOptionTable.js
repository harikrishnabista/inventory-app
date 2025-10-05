const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS PaymentOption (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    accountNumber TEXT NOT NULL
  )`);
});

module.exports = db;
