// server/routes/therapistRoutes.js

const express = require('express');
const { getMeetingRoom } = require('../controllers/therapistController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// GET meeting room by booking ID
router.get('/booking/:id/room', protect, getMeetingRoom);

module.exports = router;
