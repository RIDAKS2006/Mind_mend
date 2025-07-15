const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotion: { type: String, required: true },
  note: { type: String },
  intensity: { type: Number, required: true, min: 1, max: 5, default: 3 } // NEW
}, { timestamps: true });

module.exports = mongoose.model('Mood', moodSchema);
