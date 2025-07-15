const express = require('express');
const {
  setAvailability,
  getAvailability,
  getAvailabilityById,
} = require('../controllers/availabilityController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Therapist sets/updates their availability
router.post('/', protect, setAvailability);

// Therapist gets their own availability
router.get('/', protect, getAvailability);

// Public: get availability for a specific therapist by ID
router.get('/:therapistId', getAvailabilityById);

module.exports = router;
