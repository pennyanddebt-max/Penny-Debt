const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.post('/', caseController.createCase);
router.put('/:id', caseController.updateCase);

module.exports = router;
