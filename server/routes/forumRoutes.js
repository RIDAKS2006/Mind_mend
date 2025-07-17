const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { createPost, getPosts, deleteForumPost } = require('../controllers/forumController');

// Forum Routes
router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.delete('/:id', protect, deleteForumPost);

module.exports = router;
