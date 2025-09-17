// Environment configuration and validation
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

const optionalEnvVars = {
  NODE_ENV: 'development',
  PORT: '5000',
  API_VERSION: 'v1',
  JWT_EXPIRE: '7d',
  JWT_REFRESH_EXPIRE: '30d',
  BCRYPT_SALT_ROUNDS: '12',
  RATE_LIMIT_WINDOW_MS: '900000',
  RATE_LIMIT_MAX_REQUESTS: '100',
  BUSINESS_NAME: 'SalesHostel',
  BUSINESS_ADDRESS: 'NDDC Hostel, Shop 12',
  BUSINESS_PHONE: '+234XXXXXXXXXX',
  BUSINESS_EMAIL: 'info@saleshostel.com'
};

// Validate required environment variables
const validateEnv = () => {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => {
      console.error(`   - ${envVar}`);
    });
    console.error('\n📝 Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Set default values for optional environment variables
  Object.entries(optionalEnvVars).forEach(([key, defaultValue]) => {
    if (!process.env[key]) {
      process.env[key] = defaultValue;
    }
  });

  console.log('✅ Environment variables validated successfully');
};

// Configuration object
const config = {
  // Server
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT),
  API_VERSION: process.env.API_VERSION,

  // Database
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,

  // Security
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM,

  // WhatsApp
  WHATSAPP_API_URL: process.env.WHATSAPP_API_URL,
  WHATSAPP_BUSINESS_NUMBER: process.env.WHATSAPP_BUSINESS_NUMBER,

  // Payment
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
  FLUTTERWAVE_SECRET_KEY: process.env.FLUTTERWAVE_SECRET_KEY,
  FLUTTERWAVE_PUBLIC_KEY: process.env.FLUTTERWAVE_PUBLIC_KEY,

  // Business
  BUSINESS_NAME: process.env.BUSINESS_NAME,
  BUSINESS_ADDRESS: process.env.BUSINESS_ADDRESS,
  BUSINESS_PHONE: process.env.BUSINESS_PHONE,
  BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,

  // Default Admin
  DEFAULT_ADMIN_EMAIL: process.env.DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,

  // Helper functions
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',
};

module.exports = {
  validateEnv,
  config
};