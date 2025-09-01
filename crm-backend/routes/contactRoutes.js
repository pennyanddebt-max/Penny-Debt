const express = require('express');
const router = express.Router();
const sendMail = require('../utils/sendMail');

// POST /api/contact
router.post('/', async (req, res) => {
  const { fullName, email, subject, message } = req.body;
  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await sendMail({
      subject: `Contact Form: ${subject}`,
      to: 'care@pennyanddebt.in',
      text: `New contact form submission:\n\nName: ${fullName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    });
    res.status(200).json({ message: 'Query submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

module.exports = router;
