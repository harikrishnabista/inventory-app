const express = require('express');
const db = require('./db');

const router = express.Router();

// Get all items
router.get('/', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Create a new item
router.post('/', (req, res) => {
  const { name, quantity } = req.body;
  db.run(
    "INSERT INTO items (name, quantity) VALUES (?, ?)",
    [name, quantity],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, name, quantity });
      }
    }
  );
});

// Update an existing item
router.put('/:id', (req, res) => {
  const { name, quantity } = req.body;
  db.run(
    "UPDATE items SET name = ?, quantity = ? WHERE id = ?",
    [name, quantity, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ updated: this.changes });
      }
    }
  );
});

// Delete an item
router.delete('/:id', (req, res) => {
  db.run(
    "DELETE FROM items WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ deleted: this.changes });
      }
    }
  );
});

module.exports = router;
