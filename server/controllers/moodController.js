const Mood = require('../models/Mood');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const logMood = async (req, res) => {
  try {
    const { emotion, note, intensity } = req.body;
    if (!emotion || !intensity) {
      return res.status(400).json({ message: 'Emotion and intensity are required' });
    }

    const mood = new Mood({
      user: req.user.id,
      emotion,
      note,
      intensity
    });

    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: 'Error logging mood', error: err.message });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving moods', error: err.message });
  }
};

const getMoodInsights = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id });
    const counts = {}, stats = { totalSentiment: 0, totalIntensity: 0 };

    moods.forEach(m => {
      counts[m.emotion] = (counts[m.emotion] || 0) + 1;
      stats.totalSentiment += sentiment.analyze(m.note || '').score;
      stats.totalIntensity += m.intensity;
    });

    const most = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a), ['', 0])[0];
    const avgSentiment = moods.length ? (stats.totalSentiment / moods.length).toFixed(2) : 0;
    const avgIntensity = moods.length ? (stats.totalIntensity / moods.length).toFixed(1) : 0;

    const suggestions = {
      depressed: 'Try reaching out to a friend or therapist.',
      anxious: 'Try deep breathing exercises.',
      happy: 'Great! Keep doing what makes you smile.',
    };

    res.json({
      mostFrequent: most,
      averageSentiment: avgSentiment,
      averageIntensity: avgIntensity,
      tip: suggestions[most] || 'Keep logging moods for better insight.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { logMood, getMoods, getMoodInsights };
