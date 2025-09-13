// Validators
const Joi = require('joi');

// User validation schema
const userSchema = Joi.object({
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
});

// Product validation schema
const productSchema = Joi.object({
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
});

// Order validation schema
const orderSchema = Joi.object({
  customer: Joi.string().required(),
  items: Joi.array().items(Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(0).required()
  })).required(),
  shippingAddress: Joi.object().required(),
  billingAddress: Joi.object().required(),
  paymentMethod: Joi.string().required(),
  totalAmount: Joi.number().min(0).required()
});

module.exports = {
  userSchema,
  productSchema,
  orderSchema
};