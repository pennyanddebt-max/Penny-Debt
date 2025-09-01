// routes/customerAuth.js
const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require('../controllers/customerAuthController');
const { jwtAuth } = require('../middleware/authMiddleware');

// Customer registration
router.post('/register', register);
// Customer login
router.post('/login', login);
// Customer profile (protected)
router.get('/profile', jwtAuth, getProfile);

module.exports = router;
