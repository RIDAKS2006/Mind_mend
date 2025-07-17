// controllers/bookingController.js
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new booking
// @route   POST /api/booking
exports.createBooking = async (req, res) => {
  try {
    const { therapist, date, time } = req.body;

    if (!therapist || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if booking already exists for the same therapist, date, and time
    const existing = await Booking.findOne({ therapist, date, time });
    if (existing) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    const newBooking = new Booking({
      user: req.user._id, // From authMiddleware
      therapist,
      date,
      time,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ message: 'Server error while booking' });
  }
};

// @desc    Get all bookings (admin or frontend calendar use)
// @route   GET /api/booking
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('therapist', 'name email');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Fetch bookings error:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// @desc    Get bookings for a specific user
// @route   GET /api/booking/user
exports.getUserBookings = async (req, res) => {
  try {
    const userBookings = await Booking.find({ user: req.user._id })
      .populate('therapist', 'name email');
    res.status(200).json(userBookings);
  } catch (err) {
    console.error('User bookings fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch your bookings' });
  }
};