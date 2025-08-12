const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Get employee details by staff_id
router.get('/:staffId', async (req, res) => {
  const { staffId } = req.params;
  try {
    const [rows] = await db.promise().query(
      'SELECT id, staff_id, name, email, role, department, created_at FROM employees WHERE staff_id = ?',
      [staffId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Get employee error:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Employee login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Employee ID/Email and password are required" });
  }

  try {
    // Find employee by staff_id or email
    const [rows] = await db.promise().query(
      "SELECT * FROM employees WHERE staff_id = ? OR email = ?",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    
    // Check if password is hashed or plain text
    let isMatch = false;
    if (user.password.startsWith('$2')) {
      // Password is hashed with bcrypt
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Plain text password (for demo purposes)
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        staff_id: user.staff_id, 
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET || "defaultSecretKey", 
      { expiresIn: "24h" }
    );

    // Success response with token and user info (excluding password)
    return res.status(200).json({ 
      message: "Login successful", 
      token,
      user: {
        id: user.id,
        staff_id: user.staff_id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (err) {
    console.error("Employee login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
