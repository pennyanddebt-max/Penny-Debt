const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/subscribe', paymentController.subscribe);
router.post('/renew', paymentController.renew);

module.exports = router;
