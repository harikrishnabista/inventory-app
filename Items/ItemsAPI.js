const db = require('./ItemsTable');
const express = require('express');
const router = express.Router();

// Create Item
router.post('/', (req, res) => {
  const { name, quantity } = req.body;
  db.run(
    'INSERT INTO items (name, quantity) VALUES (?, ?)',
    [name, quantity],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, quantity });
    }
  );
});

// Read all Items
router.get('/', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Read one Item
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(row);
  });
});

// Update Item
router.put('/:id', (req, res) => {
  const { name, quantity } = req.body;
  db.run(
    'UPDATE items SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ id: req.params.id, name, quantity });
    }
  );
});

// Delete Item
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  });
});

module.exports = router;
