const express = require('express');
const router = express.Router();
const staffDashboardController = require('../controllers/staffDashboardController');

// KPIs
router.get('/:staffId/kpis', staffDashboardController.getKPIs);
// Assigned Tasks
router.get('/:staffId/tasks', staffDashboardController.getTasks);
// Quick Actions
router.post('/case', staffDashboardController.createCase);
router.post('/lead', staffDashboardController.addLead);
router.post('/checklist', staffDashboardController.updateChecklist);

module.exports = router;
