const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ['user', 'therapist'],
    default: 'user',
    required: true
  },

  profilePicture: {
    type: String,
    default: '' // or a default image URL
  },

  specialization: {
    type: String, // useful for therapists
    default: ''
  },

  bio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
