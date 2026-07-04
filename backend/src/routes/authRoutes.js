const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidator } = require('../validators/authValidator');

// POST /api/auth/register
router.post('/register', registerValidator, authController.register);

module.exports = router;
