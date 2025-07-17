const express = require('express');
const router = express.Router();

// Import controllers
const {
  createBooking,
  getAllBookings,
  getUserBookings
} = require('../controllers/bookingController');

// Import middleware
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/booking
// @desc    Create a new booking
// @access  Private
router.post('/', protect, createBooking);

// @route   GET /api/booking
// @desc    Get all bookings (for admin or analytics)
// @access  Private
router.get('/', protect, getAllBookings);

// @route   GET /api/booking/user
// @desc    Get bookings for a logged-in user
// @access  Private
router.get('/user', protect, getUserBookings);

module.exports = router;