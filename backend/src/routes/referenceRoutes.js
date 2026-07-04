const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');
const { authenticate } = require('../middleware/authMiddleware');

// Protect routes
router.use(authenticate);

// GET /api/reference/categories
router.get('/categories', referenceController.getCategories);

// GET /api/reference/payment-methods
router.get('/payment-methods', referenceController.getPaymentMethods);

module.exports = router;
