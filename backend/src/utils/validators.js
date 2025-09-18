// Validators and Helper Functions
const Joi = require("joi");

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Nigerian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
const validatePhone = (phone) => {
  if (!phone) return false;

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Check for Nigerian phone number patterns
  const patterns = [
    /^234[789]\d{9}$/, // International format: 234xxxxxxxxx
    /^0[789]\d{9}$/, // Local format: 0xxxxxxxxx
    /^[789]\d{9}$/, // Without country code: xxxxxxxxx
  ];

  return patterns.some((pattern) => pattern.test(cleaned));
};

// User validation schema
const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  whatsappNumber: Joi.string().required(),
  callNumber: Joi.string().required(),
  role: Joi.string()
    .valid("admin", "supplier", "staff", "customer")
    .default("customer"),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});

// Product validation schema
const productSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  units: Joi.array()
    .items(
      Joi.object({
        unitType: Joi.string()
          .valid(
            "Cup",
            "Half Rubber",
            "Black Rubber",
            "Paint Rubber",
            "Big Black Rubber",
            "Bag",
            "Piece",
            "Pack",
            "Bottle",
            "Sachet",
            "Carton",
            "Kg",
            "Gram",
            "Liter"
          )
          .required(),
        price: Joi.number().min(0).required(),
        stockQuantity: Joi.number().min(0).default(0),
        minStockLevel: Joi.number().min(0).default(5),
        costPrice: Joi.number().min(0).optional(),
      })
    )
    .min(1)
    .required(),
  tags: Joi.array().items(Joi.string()).optional(),
  featured: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true),
});

// Category validation schema
const categorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(200).optional(),
  image: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
});

// Order validation schema
const orderSchema = Joi.object({
  customer: Joi.string().optional(), // Optional for guest orders
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        unitType: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        pricePerUnit: Joi.number().min(0).required(),
        totalPrice: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  subtotal: Joi.number().min(0).required(),
  deliveryFee: Joi.number().min(0).default(0),
  total: Joi.number().min(0).required(),
  deliveryAddress: Joi.object({
    street: Joi.string().required(),
    landmark: Joi.string().optional(),
    phone: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string()
    .valid("paystack", "transfer", "delivery")
    .required(),
  notes: Joi.string().optional(),
});

// Cart validation schema
const cartSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        unitType: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
        productName: Joi.string().required(),
        productImage: Joi.string().optional(),
      })
    )
    .required(),
});

module.exports = {
  validateEmail,
  validatePhone,
  userSchema,
  productSchema,
  categorySchema,
  orderSchema,
  cartSchema,
};
