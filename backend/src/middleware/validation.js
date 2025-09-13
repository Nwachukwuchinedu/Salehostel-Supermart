const Joi = require('joi');

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

// User validation schemas
const userSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'customer').default('customer'),
    phone: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      zipCode: Joi.string().optional(),
      country: Joi.string().optional()
    }).optional()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      zipCode: Joi.string().optional(),
      country: Joi.string().optional()
    }).optional()
  })
};

// Product validation schemas
const productSchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().required(),
    shortDescription: Joi.string().max(200).optional(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    sku: Joi.string().required(),
    barcode: Joi.string().optional(),
    sellingPrice: Joi.number().min(0).required(),
    costPrice: Joi.number().min(0).optional(),
    salePrice: Joi.number().min(0).optional(),
    onSale: Joi.boolean().default(false),
    currentStock: Joi.number().min(0).required(),
    minStockLevel: Joi.number().min(0).default(0),
    maxStockLevel: Joi.number().min(0).optional(),
    unit: Joi.string().valid('kg', 'bag', 'piece', 'carton', 'liter', 'meter').default('piece'),
    featured: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string()).optional(),
    metaTitle: Joi.string().max(60).optional(),
    metaDescription: Joi.string().max(160).optional(),
    isActive: Joi.boolean().default(true),
    isPublished: Joi.boolean().default(false)
  }),
  
  update: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().optional(),
    shortDescription: Joi.string().max(200).optional(),
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    sku: Joi.string().optional(),
    barcode: Joi.string().optional(),
    sellingPrice: Joi.number().min(0).optional(),
    costPrice: Joi.number().min(0).optional(),
    salePrice: Joi.number().min(0).optional(),
    onSale: Joi.boolean().optional(),
    currentStock: Joi.number().min(0).optional(),
    minStockLevel: Joi.number().min(0).optional(),
    maxStockLevel: Joi.number().min(0).optional(),
    unit: Joi.string().valid('kg', 'bag', 'piece', 'carton', 'liter', 'meter').optional(),
    featured: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    metaTitle: Joi.string().max(60).optional(),
    metaDescription: Joi.string().max(160).optional(),
    isActive: Joi.boolean().optional(),
    isPublished: Joi.boolean().optional()
  })
};

// Order validation schemas
const orderSchemas = {
  create: Joi.object({
    items: Joi.array().items(Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      price: Joi.number().min(0).required()
    })).required(),
    shippingAddress: Joi.object({
      name: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().optional()
    }).required(),
    billingAddress: Joi.object({
      name: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().optional()
    }).required(),
    paymentMethod: Joi.string().valid('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery').required()
  })
};

module.exports = {
  validate,
  userSchemas,
  productSchemas,
  orderSchemas
};