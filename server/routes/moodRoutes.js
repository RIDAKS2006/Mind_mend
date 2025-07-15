const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { logMood, getMoods, getMoodInsights } = require('../controllers/moodController');
const router = express.Router();

router.post('/log', protect, logMood);
router.get('/', protect, getMoods);
router.get('/insights', protect, getMoodInsights);

module.exports = router;
