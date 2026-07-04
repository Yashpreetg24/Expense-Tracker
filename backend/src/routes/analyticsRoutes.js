const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/authMiddleware');

// Protect all analytics routes
router.use(authenticate);

// GET /api/analytics/monthly
router.get('/monthly', analyticsController.getMonthlySummary);

// GET /api/analytics/category
router.get('/category', analyticsController.getCategorySpend);

module.exports = router;
