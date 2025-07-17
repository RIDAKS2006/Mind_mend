const Availability = require('../models/Availability');

// @desc    Therapist sets or updates their availability
// @route   POST /api/availability
// @access  Private (therapist)
const setAvailability = async (req, res) => {
  try {
    const { dateRanges, timeSlots, daysOff } = req.body;

    if (!dateRanges || !timeSlots) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const availability = await Availability.findOneAndUpdate(
      { therapistId: req.user.id },
      { therapistId: req.user.id, dateRanges, timeSlots, daysOff },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: 'Availability saved successfully',
      availability,
    });
  } catch (err) {
    console.error('Availability Error:', err);
    res.status(500).json({
      message: 'Server error while saving availability',
      error: err.message,
    });
  }
};

// @desc    Therapist fetches their own availability
// @route   GET /api/availability
// @access  Private
const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({ therapistId: req.user.id });
    if (!availability) return res.status(404).json({ message: 'No availability found' });

    res.status(200).json(availability);
  } catch (err) {
    console.error('Get Availability Error:', err);
    res.status(500).json({ message: 'Error fetching availability' });
  }
};

// @desc    User fetches therapist’s availability by therapistId
// @route   GET /api/availability/:therapistId
// @access  Public
const getAvailabilityById = async (req, res) => {
  try {
    const availability = await Availability.findOne({ therapistId: req.params.therapistId });
    if (!availability) return res.status(404).json({ message: 'Availability not found for therapist' });

    res.status(200).json(availability);
  } catch (err) {
    console.error('Get Availability By ID Error:', err);
    res.status(500).json({ message: 'Error fetching availability by ID' });
  }
};

module.exports = {
  setAvailability,
  getAvailability,
  getAvailabilityById,
};
