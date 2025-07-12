const Mood = require('../models/Mood');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// @desc Log a mood
// @route POST /api/mood/log
// @access Private
const logMood = async (req, res) => {
  try {
    const { emotion, note } = req.body;

    if (!emotion) {
      return res.status(400).json({ message: 'Emotion is required' });
    }

    const mood = new Mood({
      user: req.user.id,
      emotion,
      note,
    });

    await mood.save();
    res.status(201).json({ message: 'Mood logged', mood });
  } catch (err) {
    console.error('Log Mood Error:', err);
    res.status(500).json({ message: 'Error logging mood', error: err.message });
  }
};

// @desc Get all moods
// @route GET /api/mood
// @access Private
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (err) {
    console.error('Get Moods Error:', err);
    res.status(500).json({ message: 'Error retrieving moods', error: err.message });
  }
};

// @desc AI Insights from moods
// @route GET /api/mood/insights
// @access Private
const getMoodInsights = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id });

    const counts = {};
    let totalSentiment = 0;

    for (let m of moods) {
      counts[m.emotion] = (counts[m.emotion] || 0) + 1;
      const sentimentScore = sentiment.analyze(m.note || '').score;
      totalSentiment += sentimentScore;
    }

    const mostFrequent = Object.entries(counts).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ['', 0]
    )[0];

    const averageSentiment = (moods.length ? totalSentiment / moods.length : 0).toFixed(2);

    const suggestions = {
      depressed: 'Try reaching out to a friend or therapist.',
      anxious: 'Try deep breathing exercises or grounding techniques.',
      happy: 'That’s great! Continue with positive habits.',
    };

    res.status(200).json({
      mostFrequent,
      averageSentiment,
      tip: suggestions[mostFrequent] || 'Keep logging your moods for deeper insights.',
    });
  } catch (err) {
    console.error('Get Mood Insights Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  logMood,
  getMoods,
  getMoodInsights,
};
