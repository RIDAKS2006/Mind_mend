const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },  // e.g. "video", "reading"
  url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
