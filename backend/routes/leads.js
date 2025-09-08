const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../models/database');

const router = express.Router();

// Submit debt relief application
router.post('/submit', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone(),
  body('totalDebt').isNumeric().isFloat({ min: 10000 }),
  body('monthlyIncome').isNumeric().isFloat({ min: 5000 }),
  body('loanType').isIn(['personal', 'credit-card', 'medical', 'business', 'multiple', 'other']),
  body('employmentStatus').isIn(['employed', 'self-employed', 'unemployed', 'retired', 'student']),
  body('city').trim().isLength({ min: 2 }),
  body('pincode').isLength({ min: 6, max: 6 }).isNumeric(),
  body('agreeToTerms').isBoolean().equals('true')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    const {
      name, email, phone, totalDebt, monthlyIncome,
      loanType, employmentStatus, city, pincode,
      message, source, leadType, emailVerified
    } = req.body;

    // Check if email is verified
    if (emailVerified) {
      const [verifiedRows] = await db.execute(
        'SELECT * FROM verified_emails WHERE email = ?',
        [email]
      );
      
      if (verifiedRows.length === 0) {
        return res.status(400).json({ message: 'Email not verified' });
      }
    }

    // Insert debt application
    const [result] = await db.execute(`
      INSERT INTO debt_applications (
        name, email, phone, total_debt, monthly_income,
        loan_type, employment_status, city, pincode,
        message, source, lead_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `, [
      name, email, phone, totalDebt, monthlyIncome,
      loanType, employmentStatus, city, pincode,
      message || null, source || 'website', leadType || 'debt_relief'
    ]);

    // Log activity
    await db.execute(`
      INSERT INTO lead_activities (
        lead_id, lead_type, activity_type, subject, description
      ) VALUES (?, 'debt_application', 'note', 'Application Submitted', 'New debt relief application submitted from website')
    `, [result.insertId]);

    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all applications (for CRM)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM debt_applications';
    let params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.execute(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM debt_applications';
    let countParams = [];
    
    if (status) {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }
    
    const [countRows] = await db.execute(countQuery, countParams);
    const total = countRows[0].total;

    res.json({
      applications: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;