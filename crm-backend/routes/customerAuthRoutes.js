// routes/customerAuth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { register, getProfile } = require('../controllers/customerAuthController');
const { jwtAuth } = require('../middleware/authMiddleware');

// Customer login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 1. Find user by email
    const [rows] = await db.promise().query("SELECT * FROM customer_logins WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // 2. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET || "defaultSecretKey", 
      { expiresIn: "24h" }
    );

    // 4. Return success with token
    return res.status(200).json({ 
      message: "Login successful", 
      token,
      user: { 
        id: user.id, 
        email: user.email,
        name: user.name 
      }
    });
  } catch (err) {
    console.error("Customer login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Customer registration
router.post('/register', register);
// Customer profile (protected)
router.get('/profile', jwtAuth, getProfile);

module.exports = router;
