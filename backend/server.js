const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salehostel-supermart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Salehostel Supermart API is running' });
});

// Admin routes
app.use('/api/admin/auth', require('./src/routes/admin/adminAuth'));
app.use('/api/admin/products', require('./src/routes/admin/adminProducts'));
app.use('/api/admin/inventory', require('./src/routes/admin/adminInventory'));
app.use('/api/admin/purchases', require('./src/routes/admin/adminPurchases'));
app.use('/api/admin/orders', require('./src/routes/admin/adminOrders'));
app.use('/api/admin/reports', require('./src/routes/admin/adminReports'));
app.use('/api/admin/users', require('./src/routes/admin/adminUsers'));

// Customer routes
app.use('/api/customer/auth', require('./src/routes/customer/customerAuth'));
app.use('/api/customer/products', require('./src/routes/customer/customerProducts'));
app.use('/api/customer/orders', require('./src/routes/customer/customerOrders'));
app.use('/api/customer/cart', require('./src/routes/customer/customerCart'));
app.use('/api/customer/profile', require('./src/routes/customer/customerProfile'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };