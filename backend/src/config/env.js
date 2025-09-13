// Environment configuration
module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/salehostel-supermart',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkeyforsalehostelsupermart',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
};