const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});
const PORT = process.env.PORT || 3000;

// Export io for controllers
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folders
// Serving only specific directories and files from root to avoid exposing backend code
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/student', express.static(path.join(__dirname, 'student')));
app.use('/teacher', express.static(path.join(__dirname, 'teacher')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/python/dataset', express.static(path.join(__dirname, 'python/dataset')));

// Serve the main index.html from root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/teacher', require('./routes/teacherRoutes'));

// Database verification route to check if db is connected
const { pool } = require('./database/db');
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const cameraSource = process.env.CAMERA_SOURCE || '0';
    res.json({ 
      success: true, 
      message: 'System Healthy', 
      db_connected: true,
      camera_source: cameraSource,
      is_cloud: !!process.env.RENDER
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
  }
});

// Default fallback for SPA if using router or directly showing index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

io.on('connection', (socket) => {
  console.log('Client connected for real-time attendance');
  
  socket.on('disconnect', () => console.log('Client disconnected'));
});

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
