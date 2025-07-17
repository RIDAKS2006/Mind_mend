const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  anonymous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', postSchema);
