const express = require('express');
const router = express.Router();

const { getProfile, getMe } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/profile', protect, getProfile);
router.get('/me', protect, getMe);

module.exports = router;
