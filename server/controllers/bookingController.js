const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new booking
// @route   POST /api/booking
// @access  Private (user only)
const createBooking = async (req, res) => {
  try {
    const { therapist, date, time } = req.body;

    // Validate input
    if (!therapist || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate unique video room ID
    const roomId = `mindmend-${req.user._id}-${therapist}-${Date.now()}`;

    const newBooking = new Booking({
      user: req.user._id,
      therapist,
      date,
      time,
      roomId,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: savedBooking,
    });
  } catch (err) {
    console.error('Create Booking Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get bookings for current user or therapist
// @route   GET /api/booking
// @access  Private
const getBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'therapist') {
      bookings = await Booking.find({ therapist: req.user._id })
        .populate('user', 'name email')
        .sort({ date: 1 });
    } else {
      bookings = await Booking.find({ user: req.user._id })
        .populate('therapist', 'name email')
        .sort({ date: 1 });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Get Bookings Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')         // ✅ Include user info
      .populate('therapist', 'name email');   // ✅ Include therapist info

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get the video room ID for a booking
// @route   GET /api/booking/:id/room
// @access  Private
const getRoomId = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only user or therapist involved can access the room
    if (
      booking.user.toString() !== req.user._id.toString() &&
      booking.therapist.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this room' });
    }

    res.status(200).json({ roomId: booking.roomId });
  } catch (err) {
    console.error('Get Room ID Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getRoomId,
  getAllBookings
};
