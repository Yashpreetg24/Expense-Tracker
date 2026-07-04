const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', registerValidator, authController.register);

// POST /api/auth/login
router.post('/login', loginValidator, authController.login);

// GET /api/auth/profile (Protected)
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
