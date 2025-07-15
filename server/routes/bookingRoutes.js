const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const Booking = require('../models/Booking');

// @route   GET /api/booking
// @desc    Get all bookings (admin/therapist/user dashboard view)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('therapist', 'name email');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).json({ message: 'Failed to load bookings' });
  }
});

// @route   POST /api/booking
// @desc    Book a therapy session
// @access  Private
router.post('/', protect, async (req, res) => {
  const { therapist, date, time } = req.body;

  if (!therapist || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the selected slot is already booked
    const existing = await Booking.findOne({ therapist, date, time });
    if (existing) {
      return res
        .status(409)
        .json({ message: 'This time slot is already booked' });
    }

    const newBooking = await Booking.create({
      user: req.user.id,
      therapist,
      date,
      time,
    });

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

module.exports = router;
