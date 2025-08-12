const express = require('express');
const router = express.Router();

// Example route (replace with actual logic)
router.get('/', (req, res) => {
  res.json({ message: 'Customer route working!' });
});

module.exports = router;
