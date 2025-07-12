const ForumPost = require('../models/ForumPost');

const createPost = async (req, res) => {
  const { content, anonymous } = req.body;
  const post = new ForumPost({ user: req.user.id, content, anonymous });
  await post.save();
  res.status(201).json({ message: 'Posted' });
};

const getPosts = async (req, res) => {
  const posts = await ForumPost.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name');
  res.json(posts);
};

module.exports = { createPost, getPosts };
