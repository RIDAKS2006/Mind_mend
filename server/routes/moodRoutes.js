const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createPost, getPosts } = require('../controllers/forumController');
const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getPosts);

module.exports = router;
