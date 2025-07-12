// Import required modules
const express = require('express');
const router = express.Router();

// Import controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login an existing user
// @access  Public
router.post('/login', loginUser);

// Export the router
module.exports = router;
