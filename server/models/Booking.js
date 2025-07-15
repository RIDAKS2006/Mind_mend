const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // "YYYY-MM-DD"
    required: true
  },
  time: {
    type: String, // e.g., "10:00 AM"
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
