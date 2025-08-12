const express = require('express');
const router = express.Router();
const legalController = require('../controllers/legalController');

router.post('/handle', legalController.handleLegal);

module.exports = router;
