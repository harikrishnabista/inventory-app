const db = require('./PaymentOptionTable');
const express = require('express');
const router = express.Router();

// Create PaymentOption
router.post('/', (req, res) => {
  const { name, accountNumber } = req.body;
  db.run(
    'INSERT INTO PaymentOption (name, accountNumber) VALUES (?, ?)',
    [name, accountNumber],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, accountNumber });
    }
  );
});

// Read all PaymentOptions
router.get('/', (req, res) => {
  db.all('SELECT * FROM PaymentOption', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Read one PaymentOption
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM PaymentOption WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'PaymentOption not found' });
    }
    res.json(row);
  });
});

// Update PaymentOption
router.put('/:id', (req, res) => {
  const { name, accountNumber } = req.body;
  db.run(
    'UPDATE PaymentOption SET name = ?, accountNumber = ? WHERE id = ?',
    [name, accountNumber, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'PaymentOption not found' });
      }
      res.json({ id: req.params.id, name, accountNumber });
    }
  );
});

// Delete PaymentOption
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM PaymentOption WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'PaymentOption not found' });
    }
    res.json({ message: 'PaymentOption deleted' });
  });
});

module.exports = router;
