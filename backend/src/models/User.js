const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  
  // Contact Information
  whatsappNumber: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid WhatsApp number']
  },
  callNumber: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
  },
  
  // Role Management
  role: {
    type: String,
    enum: ['admin', 'supplier', 'staff', 'customer'],
    required: [true, 'User role is required'],
    default: 'customer'
  },
  
  // Role-specific Information
  supplierInfo: {
    companyName: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    suppliedCategories: [{
      type: String,
      enum: [
        'Staple Foods', 'Frozen Foods', 'Convenience Foods', 
        'Sauces/Spices', 'Cooking Oils', 'Groceries', 
        'Biscuits', 'Cleaning Agents', 'Personal Care', 'Stationery'
      ]
    }],
    paymentTerms: {
      type: String,
      enum: ['Cash on Delivery', 'Net 7', 'Net 15', 'Net 30'],
      default: 'Cash on Delivery'
    },
    businessAddress: {
      type: String,
      trim: true,
      maxlength: [200, 'Business address cannot exceed 200 characters']
    },
    taxId: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  staffInfo: {
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    shiftTimes: {
      type: String,
      enum: ['Morning (6AM-2PM)', 'Afternoon (2PM-10PM)', 'Night (10PM-6AM)', 'Full Day'],
      default: 'Full Day'
    },
    permissions: [{
      type: String,
      enum: [
        'manage_orders', 'update_inventory', 'process_payments',
        'customer_service', 'generate_reports', 'manage_customers'
      ]
    }],
    salary: {
      type: Number,
      min: 0
    },
    hireDate: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  // Customer-specific Information
  customerInfo: {
    deliveryAddresses: [{
      label: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      },
      hostelRoom: {
        type: String,
        trim: true
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    favoriteProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    loyaltyPoints: {
      type: Number,
      default: 0,
      min: 0
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: 0
    },
    totalSpent: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say']
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Password Reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Login Tracking
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  
  // Refresh Token
  refreshTokens: [{
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 2592000 // 30 days
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'staffInfo.employeeId': 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();
  
  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to generate employee ID for staff
userSchema.pre('save', function(next) {
  if (this.role === 'staff' && !this.staffInfo.employeeId) {
    const timestamp = Date.now().toString().slice(-6);
    this.staffInfo.employeeId = `SH${timestamp}`;
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      role: this.role,
      email: this.email 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Static method to find by credentials
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ 
    email: email.toLowerCase(),
    isActive: true 
  }).select('+password');
  
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  
  // Check if account is locked
  if (user.isLocked) {
    throw new Error('Account is temporarily locked due to too many failed login attempts');
  }
  
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    await user.incLoginAttempts();
    throw new Error('Invalid login credentials');
  }
  
  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }
  
  // Update last login
  user.lastLogin = new Date();
  await user.save();
  
  return user;
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  
  delete user.password;
  delete user.refreshTokens;
  delete user.emailVerificationToken;
  delete user.passwordResetToken;
  delete user.loginAttempts;
  delete user.lockUntil;
  
  return user;
};

module.exports = mongoose.model('User', userSchema);