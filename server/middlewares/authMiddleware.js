const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Middleware to verify token and attach full user object to req.user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// ✅ Lightweight middleware for routes needing only id and role
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ Role-based access control (optional usage)
const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: `Access denied: ${role} only` });
  }
  next();
};

module.exports = {
  protect,
  authMiddleware,
  requireRole,
};
