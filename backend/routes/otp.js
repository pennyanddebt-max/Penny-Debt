const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const db = require('../models/database');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');

const router = express.Router();

// Rate limiting for OTP requests
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 OTP requests per windowMs
  message: { message: 'Too many OTP requests, please try again later.' }
});

// Send OTP
router.post('/send-otp', otpLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    const { email, name } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP in database
    await db.execute(
      'INSERT INTO email_otps (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?',
      [email, otp, expiresAt, otp, expiresAt]
    );

    // Send OTP email
    const emailResult = await sendOTPEmail(email, name, otp);
    
    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify OTP
router.post('/verify-otp', [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    const { email, otp } = req.body;

    // Check OTP in database
    const [rows] = await db.execute(
      'SELECT * FROM email_otps WHERE email = ? AND otp = ? AND expires_at > NOW()',
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark as verified and delete OTP
    await db.execute('DELETE FROM email_otps WHERE email = ?', [email]);
    await db.execute(
      'INSERT INTO verified_emails (email, verified_at) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE verified_at = NOW()',
      [email]
    );

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;