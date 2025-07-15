const express = require('express');
const router = express.Router();
const { getMe, getProfile, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); 

router.get('/', getAllUsers);                      // Public route
router.get('/me', protect, getMe);                 // Authenticated route
router.get('/profile', protect, getProfile);       // Authenticated dashboard view

module.exports = router;
