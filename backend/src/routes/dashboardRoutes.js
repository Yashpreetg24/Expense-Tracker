const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/authMiddleware');

// Protect all dashboard routes
router.use(authenticate);

// GET /api/dashboard
router.get('/', dashboardController.getDashboardSummary);

module.exports = router;
