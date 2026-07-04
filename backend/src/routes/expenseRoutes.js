const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { createExpenseValidator } = require('../validators/expenseValidator');
const { authenticate } = require('../middleware/authMiddleware');

// Protect all expense routes
router.use(authenticate);

// POST /api/expenses
router.post('/', createExpenseValidator, expenseController.createExpense);

// GET /api/expenses
router.get('/', expenseController.getExpenses);

module.exports = router;
