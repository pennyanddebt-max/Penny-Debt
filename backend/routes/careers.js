const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const db = require('../models/database');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// Submit career application
router.post('/', upload.single('resume'), [
  body('fullName').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    const { fullName, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Insert career application
    const [result] = await db.execute(`
      INSERT INTO career_applications (full_name, email, resume_filename, resume_path)
      VALUES (?, ?, ?, ?)
    `, [fullName, email, req.file.filename, req.file.path]);

    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;