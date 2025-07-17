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
const deleteForumPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await ForumPost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { createPost, getPosts,  deleteForumPost };
