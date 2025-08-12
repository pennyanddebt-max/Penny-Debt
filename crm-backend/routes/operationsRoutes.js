const express = require('express');
const router = express.Router();
const operationsController = require('../controllers/operationsController');

router.post('/renewal', operationsController.handleRenewal);

module.exports = router;
