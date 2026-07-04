const { body, validationResult } = require('express-validator');

const createExpenseValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('expenseDate').isISO8601().toDate().withMessage('Valid date is required'),
  body('categoryId').isInt().withMessage('Category ID must be an integer'),
  body('paymentMethodId').isInt().withMessage('Payment Method ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  createExpenseValidator,
};
