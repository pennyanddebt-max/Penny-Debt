const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get customer dashboard data
router.get('/dashboard/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    // Example: Fetch debt status, offers, payment history
    const [debt] = await db.promise().query('SELECT * FROM debts WHERE customer_id = ?', [customerId]);
    const [offers] = await db.promise().query('SELECT * FROM settlement_offers WHERE customer_id = ?', [customerId]);
    const [payments] = await db.promise().query('SELECT * FROM payments WHERE customer_id = ?', [customerId]);
    res.json({ debt, offers, payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress tracker endpoint
router.get('/progress/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const [progress] = await db.promise().query('SELECT * FROM progress WHERE customer_id = ?', [customerId]);
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Debt relief actions endpoint
router.post('/actions/:customerId/pay', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { amount } = req.body;
    // Example: Insert payment
    await db.promise().query('INSERT INTO payments (customer_id, amount) VALUES (?, ?)', [customerId, amount]);
    res.json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
