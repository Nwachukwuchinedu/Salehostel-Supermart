const mongoose = require('mongoose');

// Custom error class for application-specific errors
class AppError extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(error => ({
    field: error.path,
    message: error.message,
    value: error.value
  }));

  return new AppError('Validation failed', 400, 'VALIDATION_ERROR');
};

// Handle Mongoose duplicate key errors
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  
  const message = `${field} '${value}' already exists. Please use a different ${field}.`;
  return new AppError(message, 400, 'DUPLICATE_KEY_ERROR');
};

// Handle Mongoose cast errors (invalid ObjectId, etc.)
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400, 'INVALID_ID_ERROR');
};

// Handle JWT errors
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again.', 401, 'INVALID_TOKEN_ERROR');
};

// Handle JWT expired errors
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again.', 401, 'TOKEN_EXPIRED_ERROR');
};

// Send error response for development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack,
    errorCode: err.errorCode
  });
};

// Send error response for production
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errorCode: err.errorCode
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
      errorCode: 'INTERNAL_SERVER_ERROR'
    });
  }
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    user: req.user ? req.user._id : 'Anonymous'
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File too large. Maximum size is 5MB.', 400, 'FILE_TOO_LARGE');
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new AppError('Too many files uploaded.', 400, 'TOO_MANY_FILES');
  }

  // MongoDB connection errors
  if (err.name === 'MongoNetworkError') {
    error = new AppError('Database connection failed. Please try again later.', 500, 'DATABASE_CONNECTION_ERROR');
  }

  // Rate limiting errors
  if (err.status === 429) {
    error = new AppError('Too many requests. Please try again later.', 429, 'RATE_LIMIT_EXCEEDED');
  }

  // Send appropriate error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND');
  next(error);
};

// Async error wrapper to catch async errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Validation error formatter
const formatValidationErrors = (errors) => {
  return errors.map(error => ({
    field: error.param || error.path,
    message: error.msg || error.message,
    value: error.value
  }));
};

// Success response helper
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

// Paginated response helper
const sendPaginatedResponse = (res, data, pagination, message = 'Success') => {
  res.status(200).json({
    status: 'success',
    message,
    data,
    pagination: {
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.limit,
      hasNextPage: pagination.page < pagination.totalPages,
      hasPrevPage: pagination.page > 1
    }
  });
};

// Business logic error helper
const createBusinessError = (message, statusCode = 400, errorCode = null) => {
  return new AppError(message, statusCode, errorCode);
};

module.exports = {
  AppError,
  errorHandler,
  notFound,
  asyncHandler,
  formatValidationErrors,
  sendSuccess,
  sendPaginatedResponse,
  createBusinessError
};