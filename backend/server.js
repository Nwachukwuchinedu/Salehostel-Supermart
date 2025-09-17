const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Import configurations
const connectDB = require('./src/config/database');
const { errorHandler } = require('./src/middleware/errorHandler');

// Import routes
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');
const supplierRoutes = require('./src/routes/supplier');
const staffRoutes = require('./src/routes/staff');
const customerRoutes = require('./src/routes/customer');

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://saleshostel.com', 'https://www.saleshostel.com']
      : ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://saleshostel.com', 'https://www.saleshostel.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SalesHostel API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.API_VERSION || 'v1'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customer', customerRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join role-based rooms
  socket.on('join-role-room', (role) => {
    socket.join(`${role}-room`);
    console.log(`User ${socket.id} joined ${role} room`);
  });

  // Join user-specific room
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${socket.id} joined user room: user-${userId}`);
  });

  // Handle order updates
  socket.on('order-update', (data) => {
    // Broadcast to staff and admin
    socket.to('staff-room').to('admin-room').emit('order-updated', data);
    
    // Notify specific customer
    if (data.customerId) {
      socket.to(`user-${data.customerId}`).emit('order-status-changed', data);
    }
  });

  // Handle inventory updates
  socket.on('inventory-update', (data) => {
    // Broadcast to all connected users
    io.emit('inventory-updated', data);
  });

  // Handle low stock alerts
  socket.on('low-stock-alert', (data) => {
    // Notify admin and staff
    socket.to('admin-room').to('staff-room').emit('low-stock-alert', data);
  });

  // Handle new supply notifications
  socket.on('new-supply', (data) => {
    // Notify admin
    socket.to('admin-room').emit('new-supply-received', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
🚀 SalesHostel Server is running!
📍 Environment: ${process.env.NODE_ENV}
🌐 Port: ${PORT}
📊 API Version: ${process.env.API_VERSION || 'v1'}
🏪 Business: ${process.env.BUSINESS_NAME}
📍 Location: ${process.env.BUSINESS_ADDRESS}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { app, server, io };