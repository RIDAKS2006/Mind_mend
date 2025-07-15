const express = require('express');
const router = express.Router();
const { getResources, seedResources } = require('../controllers/resourceController');
const { protect } = require('../middlewares/authMiddleware');

// Get all resources
router.get('/', getResources);

// Route to seed data — optional (protect with middleware or use locally)
router.post('/seed', seedResources); // You can protect it: `protect, seedResources`

module.exports = router;
