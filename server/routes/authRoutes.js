const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // ✅ Destructure the function

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get current user
//router.get('/me', protect, getMe); // ✅ Use actual function, not an object

module.exports = router;
