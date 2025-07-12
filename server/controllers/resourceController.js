const Resource = require('../models/Resource');

const getResources = async (req, res) => {
  const resources = await Resource.find({ type: 'video' }).sort({ createdAt: -1 });
  res.json(resources);
};

module.exports = { getResources };
