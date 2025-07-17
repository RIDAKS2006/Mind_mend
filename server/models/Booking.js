// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
