require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const initSocket = require('./socket');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB(); // Make sure your db.js file exports a working async connect function

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174", // ✅ Update this if your frontend runs on another port or domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// API Routes with proper prefixes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/mood', require('./routes/moodRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/therapist', require('./routes/therapistRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('MindMend API is running');
});

// Socket.IO setup (only if using real-time features)
initSocket(server);

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
