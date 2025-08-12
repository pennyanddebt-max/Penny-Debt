const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisorController');

router.post('/upload-plan', advisorController.uploadPlan);

module.exports = router;
