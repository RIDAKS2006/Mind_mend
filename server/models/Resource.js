const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'article'],
    default: 'video',
  },
  category: {
    type: String,
    enum: ['Breathing', 'Meditate', 'Channel Your Thoughts'],
    required: true,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
