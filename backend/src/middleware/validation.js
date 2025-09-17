const { body, param, query, validationResult } = require('express-validator');
const { formatValidationErrors, createBusinessError } = require('./errorHandler');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = formatValidationErrors(errors.array());
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: formattedErrors,
      errorCode: 'VALIDATION_ERROR'
    });
  }
  
  next();
};

// Common validation rules
const commonValidations = {
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
    
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
  phone: (field) => body(field)
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
    
  mongoId: (field) => param(field)
    .isMongoId()
    .withMessage(`Invalid ${field} ID format`),
    
  name: (field, minLength = 2, maxLength = 50) => body(field)
    .trim()
    .isLength({ min: minLength, max: maxLength })
    .withMessage(`${field} must be between ${minLength} and ${maxLength} characters`)
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(`${field} can only contain letters and spaces`),
    
  positiveNumber: (field) => body(field)
    .isFloat({ min: 0 })
    .withMessage(`${field} must be a positive number`),
    
  positiveInteger: (field) => body(field)
    .isInt({ min: 0 })
    .withMessage(`${field} must be a positive integer`),
    
  requiredString: (field, maxLength = 255) => body(field)
    .trim()
    .notEmpty()
    .withMessage(`${field} is required`)
    .isLength({ max: maxLength })
    .withMessage(`${field} cannot exceed ${maxLength} characters`),
    
  optionalString: (field, maxLength = 255) => body(field)
    .optional()
    .trim()
    .isLength({ max: maxLength })
    .withMessage(`${field} cannot exceed ${maxLength} characters`),
    
  enumValue: (field, values) => body(field)
    .isIn(values)
    .withMessage(`${field} must be one of: ${values.join(', ')}`),
    
  dateField: (field) => body(field)
    .optional()
    .isISO8601()
    .withMessage(`${field} must be a valid date`),
    
  arrayField: (field, minLength = 0, maxLength = 100) => body(field)
    .optional()
    .isArray({ min: minLength, max: maxLength })
    .withMessage(`${field} must be an array with ${minLength}-${maxLength} items`)
};

// User validation rules
const userValidations = {
  register: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    commonValidations.password,
    commonValidations.phone('whatsappNumber'),
    commonValidations.phone('callNumber'),
    body('role')
      .optional()
      .isIn(['admin', 'supplier', 'staff', 'customer'])
      .withMessage('Invalid role specified'),
    handleValidationErrors
  ],
  
  login: [
    commonValidations.email,
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    handleValidationErrors
  ],
  
  updateProfile: [
    commonValidations.name('firstName').optional(),
    commonValidations.name('lastName').optional(),
    commonValidations.phone('whatsappNumber'),
    commonValidations.phone('callNumber'),
    commonValidations.dateField('dateOfBirth'),
    body('gender')
      .optional()
      .isIn(['male', 'female', 'other', 'prefer_not_to_say'])
      .withMessage('Invalid gender value'),
    handleValidationErrors
  ],
  
  changePassword: [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    commonValidations.password.withMessage('New password must be at least 8 characters with uppercase, lowercase, and number'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match');
        }
        return true;
      }),
    handleValidationErrors
  ]
};

// Product validation rules
const productValidations = {
  create: [
    commonValidations.requiredString('name', 100),
    commonValidations.requiredString('productGroup'),
    body('productGroup')
      .isIn([
        'Staple Foods', 'Frozen Foods', 'Convenience Foods', 
        'Sauces/Spices', 'Cooking Oils', 'Groceries', 
        'Biscuits', 'Cleaning Agents', 'Personal Care', 'Stationery'
      ])
      .withMessage('Invalid product group'),
    body('category')
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('supplier')
      .isMongoId()
      .withMessage('Invalid supplier ID'),
    commonValidations.optionalString('description', 1000),
    commonValidations.optionalString('shortDescription', 200),
    body('variants')
      .isArray({ min: 1 })
      .withMessage('At least one product variant is required'),
    body('variants.*.packageType')
      .trim()
      .notEmpty()
      .withMessage('Package type is required for each variant'),
    body('variants.*.price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('variants.*.costPrice')
      .isFloat({ min: 0 })
      .withMessage('Cost price must be a positive number'),
    body('variants.*.currentStock')
      .isInt({ min: 0 })
      .withMessage('Current stock must be a non-negative integer'),
    body('variants.*.minStockLevel')
      .isInt({ min: 0 })
      .withMessage('Minimum stock level must be a non-negative integer'),
    handleValidationErrors
  ],
  
  update: [
    commonValidations.mongoId('id'),
    commonValidations.optionalString('name', 100),
    body('productGroup')
      .optional()
      .isIn([
        'Staple Foods', 'Frozen Foods', 'Convenience Foods', 
        'Sauces/Spices', 'Cooking Oils', 'Groceries', 
        'Biscuits', 'Cleaning Agents', 'Personal Care', 'Stationery'
      ])
      .withMessage('Invalid product group'),
    body('category')
      .optional()
      .isMongoId()
      .withMessage('Invalid category ID'),
    commonValidations.optionalString('description', 1000),
    commonValidations.optionalString('shortDescription', 200),
    handleValidationErrors
  ],
  
  updateStock: [
    commonValidations.mongoId('id'),
    body('variantId')
      .isMongoId()
      .withMessage('Invalid variant ID'),
    body('quantity')
      .isInt({ min: 0 })
      .withMessage('Quantity must be a non-negative integer'),
    body('operation')
      .optional()
      .isIn(['set', 'add', 'subtract'])
      .withMessage('Operation must be set, add, or subtract'),
    handleValidationErrors
  ]
};

// Order validation rules
const orderValidations = {
  create: [
    body('customerInfo.name')
      .trim()
      .notEmpty()
      .withMessage('Customer name is required'),
    body('customerInfo.whatsappNumber')
      .optional()
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Invalid WhatsApp number'),
    body('customerInfo.callNumber')
      .optional()
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Invalid phone number'),
    body('orderItems')
      .isArray({ min: 1 })
      .withMessage('At least one order item is required'),
    body('orderItems.*.product')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('orderItems.*.variantId')
      .isMongoId()
      .withMessage('Invalid variant ID'),
    body('orderItems.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('orderType')
      .isIn(['pickup', 'delivery', 'walk-in'])
      .withMessage('Invalid order type'),
    body('paymentMethod')
      .isIn(['cash', 'transfer', 'pos', 'card', 'mobile-money'])
      .withMessage('Invalid payment method'),
    handleValidationErrors
  ],
  
  updateStatus: [
    commonValidations.mongoId('id'),
    body('status')
      .isIn(['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'])
      .withMessage('Invalid order status'),
    commonValidations.optionalString('notes', 500),
    handleValidationErrors
  ]
};

// Cart validation rules
const cartValidations = {
  addItem: [
    body('product')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('variantId')
      .isMongoId()
      .withMessage('Invalid variant ID'),
    body('quantity')
      .isInt({ min: 1, max: 100 })
      .withMessage('Quantity must be between 1 and 100'),
    handleValidationErrors
  ],
  
  updateQuantity: [
    commonValidations.mongoId('itemId'),
    body('quantity')
      .isInt({ min: 0, max: 100 })
      .withMessage('Quantity must be between 0 and 100'),
    handleValidationErrors
  ]
};

// Purchase order validation rules
const purchaseOrderValidations = {
  create: [
    body('supplier')
      .isMongoId()
      .withMessage('Invalid supplier ID'),
    body('orderItems')
      .isArray({ min: 1 })
      .withMessage('At least one order item is required'),
    body('orderItems.*.product')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('orderItems.*.variantId')
      .isMongoId()
      .withMessage('Invalid variant ID'),
    body('orderItems.*.quantityOrdered')
      .isInt({ min: 1 })
      .withMessage('Quantity ordered must be at least 1'),
    body('orderItems.*.unitCostPrice')
      .isFloat({ min: 0 })
      .withMessage('Unit cost price must be a positive number'),
    body('expectedDeliveryDate')
      .isISO8601()
      .withMessage('Expected delivery date must be a valid date'),
    body('paymentTerms')
      .isIn(['cash-on-delivery', 'net-7', 'net-15', 'net-30', 'advance-payment'])
      .withMessage('Invalid payment terms'),
    commonValidations.requiredString('deliveryAddress', 200),
    handleValidationErrors
  ]
};

// Query parameter validations
const queryValidations = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    handleValidationErrors
  ],
  
  search: [
    query('q')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Search query must be between 1 and 100 characters'),
    handleValidationErrors
  ],
  
  dateRange: [
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage('Start date must be a valid date'),
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage('End date must be a valid date'),
    handleValidationErrors
  ]
};

// File upload validations
const fileValidations = {
  image: [
    body('file')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image file is required');
        }
        
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
          throw new Error('Only JPEG, PNG, and WebP images are allowed');
        }
        
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
          throw new Error('Image size must be less than 5MB');
        }
        
        return true;
      }),
    handleValidationErrors
  ]
};

// Supplier validation rules
const supplierValidations = {
  register: [
    commonValidations.name('firstName'),
    commonValidations.name('lastName'),
    commonValidations.email,
    commonValidations.password,
    commonValidations.phone('whatsappNumber'),
    commonValidations.phone('callNumber'),
    commonValidations.requiredString('companyName', 100),
    body('suppliedCategories')
      .isArray({ min: 1 })
      .withMessage('At least one supplied category is required'),
    body('address.street')
      .trim()
      .notEmpty()
      .withMessage('Street address is required'),
    body('address.city')
      .trim()
      .notEmpty()
      .withMessage('City is required'),
    body('address.state')
      .trim()
      .notEmpty()
      .withMessage('State is required'),
    body('address.country')
      .trim()
      .notEmpty()
      .withMessage('Country is required'),
    handleValidationErrors
  ]
};

// Convenient exports for common validations
const validateLogin = userValidations.login;
const validateSupplierRegistration = supplierValidations.register;
const validateUserRegistration = userValidations.register;
const validateProfileUpdate = userValidations.updateProfile;
const validatePasswordChange = userValidations.changePassword;

module.exports = {
  handleValidationErrors,
  commonValidations,
  userValidations,
  supplierValidations,
  productValidations,
  orderValidations,
  cartValidations,
  purchaseOrderValidations,
  queryValidations,
  fileValidations,
  // Convenient exports
  validateLogin,
  validateSupplierRegistration,
  validateUserRegistration,
  validateProfileUpdate,
  validatePasswordChange
};