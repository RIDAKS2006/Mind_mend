require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const initSocket = require('./socket'); // If you're using real-time chat
const cors = require('cors');


const app = express();
const server = http.createServer(app); // HTTP server for Socket.IO

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/mood', require('./routes/moodRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend's origin
  credentials: true,              // allow cookies, if used
}));

// Root route
app.get('/', (req, res) => {
  res.send(' MindMend API is running');
});

// Initialize socket (if using Socket.IO)
initSocket(server); // This should export a function that receives the server

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
