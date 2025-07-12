// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBookings,
  getRoomId
} = require('../controllers/bookingController');

const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/booking
// @desc    Create a new booking
// @access  Private
router.post('/', protect, createBooking);

// @route   GET /api/booking
// @desc    Get all bookings for user or therapist
// @access  Private
router.get('/', protect, getBookings);

// @route   GET /api/booking/:id/room
// @desc    Get video room ID for booking
// @access  Private
router.get('/:id/room', protect, getRoomId);

module.exports = router;
