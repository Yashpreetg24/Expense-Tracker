const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { createExpenseValidator, updateExpenseValidator } = require('../validators/expenseValidator');
const { authenticate } = require('../middleware/authMiddleware');

// Protect all expense routes
router.use(authenticate);

// POST /api/expenses
router.post('/', createExpenseValidator, expenseController.createExpense);

// GET /api/expenses
router.get('/', expenseController.getExpenses);

// GET /api/expenses/:id
router.get('/:id', expenseController.getExpenseById);

// PUT /api/expenses/:id
router.put('/:id', updateExpenseValidator, expenseController.updateExpense);

// DELETE /api/expenses/:id
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
