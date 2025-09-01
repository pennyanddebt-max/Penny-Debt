
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST /api/loan-applications
router.post('/', (req, res) => {
  const { name, email, phone, amount, product, purpose, ...details } = req.body;
  if (!name || !email || !phone || !amount || !product) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO loan_applications (name, email, phone, amount, product, purpose, details) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, phone, amount, product, purpose, JSON.stringify(details)],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'DB error' });
      }
      res.status(201).json({ message: 'Loan application received' });
    }
  );
});

// GET /api/loan-applications
router.get('/', (req, res) => {
  db.query('SELECT * FROM loan_applications ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json(rows);
  });
});

module.exports = router;
