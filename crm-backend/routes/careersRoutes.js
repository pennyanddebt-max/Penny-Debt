const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/resumes'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


const db = require('../models/db');


const sendMail = require("../utils/sendMail");

// POST /api/careers
router.post('/', upload.single('resume'), async (req, res) => {
  const { fullName, email } = req.body;
  const resume_path = req.file ? `/uploads/resumes/${req.file.filename}` : null;
  if (!fullName || !email || !resume_path) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO careers_applications (fullName, email, resume_path) VALUES (?, ?, ?)',
    [fullName, email, resume_path],
    async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'DB error' });
      }
      // Send notification email to care@pennyanddebt.in
      try {
        await sendMail({
          subject: "New Career Application Submitted",
          to: "care@pennyanddebt.in",
          text: `A new career application has been submitted.\n\nName: ${fullName}\nEmail: ${email}\nResume: ${resume_path}`
        });
      } catch (mailErr) {
        console.error("Failed to send notification email:", mailErr);
      }
      res.status(201).json({ message: 'Career application received' });
    }
  );
});

// GET /api/careers
router.get('/', (req, res) => {
  db.query('SELECT * FROM careers_applications ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json(rows);
  });
});

module.exports = router;
