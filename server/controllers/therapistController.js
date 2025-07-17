// server/controllers/therapistController.js

const Booking = require('../models/Booking'); // Make sure this exists

// Controller to get room ID for video session
const getMeetingRoom = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Generate a unique room ID (or use a static format)
    const roomId = `mindmend-${bookingId}`;

    res.status(200).json({ roomId });
  } catch (error) {
    console.error('Error getting room:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMeetingRoom,
};
