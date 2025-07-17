const Resource = require('../models/Resource');

// Get all resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resources', error: err.message });
  }
};

// Seed dummy data for frontend demo/testing
const seedResources = async (req, res) => {
  try {
    await Resource.deleteMany();

    const seedData = [
      // Breathing
      {
        title: "5-Minute Breathing Exercise",
        url: "https://www.youtube.com/embed/SEfs5TJZ6Nk",
        type: "video",
        category: "Breathing",
      },
      {
        title: "Box Breathing for Calm",
        url: "https://www.youtube.com/embed/FJJazKtH_9I",
        type: "video",
        category: "Breathing",
      },

      // Meditate
      {
        title: "Beginner Meditation",
        url: "https://www.youtube.com/embed/inpok4MKVLM",
        type: "video",
        category: "Meditate",
      },
      {
        title: "10-Minute Guided Meditation",
        url: "https://www.youtube.com/embed/ZToicYcHIOU",
        type: "video",
        category: "Meditate",
      },

      // Channel Your Thoughts
      {
        title: "Journaling for Anxiety Relief",
        url: "https://www.youtube.com/embed/x5XnAvFT7F4",
        type: "video",
        category: "Channel Your Thoughts",
      },
      {
        title: "Reframing Negative Thoughts",
        url: "https://www.youtube.com/embed/0Q_1KxsU8yY",
        type: "video",
        category: "Channel Your Thoughts",
      },
    ];

    await Resource.insertMany(seedData);

    res.status(200).json({ message: 'Resources seeded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error seeding resources', error: err.message });
  }
};

module.exports = { getResources, seedResources };
