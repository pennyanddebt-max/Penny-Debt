const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Get employee details by staff_id
router.get('/:staffId', async (req, res) => {
  const { staffId } = req.params;
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM employees WHERE staff_id = ?',
      [staffId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Employee login

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Marketing employee login (by email only, bcrypt, JWT, restrict to marketing role)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM employees WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.role !== 'marketing') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
