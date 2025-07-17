const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  dateRanges: [
    {
      start: String, // ISO date string
      end: String,
    },
  ],
  timeSlots: [
    {
      start: String, // e.g., "09:00"
      end: String,
    },
  ],
  daysOff: [String], // e.g., ['Sunday', 'Saturday']
});

module.exports = mongoose.models.Availability || mongoose.model('Availability', availabilitySchema);
