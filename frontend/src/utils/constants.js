// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  SUPPLIER: "supplier",
  STAFF: "staff",
  CUSTOMER: "customer",
};

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
};

// Payment Methods
export const PAYMENT_METHODS = {
  PAYSTACK: "paystack",
  TRANSFER: "transfer",
  DELIVERY: "delivery",
};

// Product Categories (matching PRD)
export const PRODUCT_CATEGORIES = {
  STAPLE_FOODS: "staple-foods",
  FROZEN_FOODS: "frozen-foods",
  CONVENIENCE_FOODS: "convenience-foods",
  SAUCES_SPICES: "sauces-spices",
  COOKING_OILS: "cooking-oils",
  GROCERIES: "groceries",
  CLEANING_AGENTS: "cleaning-agents",
  PERSONAL_CARE: "personal-care",
  STATIONERY: "stationery",
};

// Unit Types (Nigerian grocery measurements)
export const UNIT_TYPES = {
  CUP: "Cup",
  HALF_RUBBER: "Half Rubber",
  BLACK_RUBBER: "Black Rubber",
  PAINT_RUBBER: "Paint Rubber",
  BIG_BLACK_RUBBER: "Big Black Rubber",
  BAG: "Bag",
  PIECE: "Piece",
  PACK: "Pack",
  BOTTLE: "Bottle",
  SACHET: "Sachet",
};

// Stock Movement Types
export const STOCK_MOVEMENT_TYPES = {
  SUPPLY: "supply",
  SALE: "sale",
  ADJUSTMENT: "adjustment",
  RETURN: "return",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

// Currency
export const CURRENCY = {
  SYMBOL: "₦",
  CODE: "NGN",
};

// Store Information
export const STORE_INFO = {
  NAME: "SalesHostel",
  LOCATION: "NDDC Hostel, Shop 12",
  PHONE: "+234 xxx xxx xxxx",
  WHATSAPP: "+234 xxx xxx xxxx",
  EMAIL: "info@saleshostel.com",
  OPENING_HOURS: "Monday - Sunday, 8:00 AM - 8:00 PM",
};

// Delivery
export const DELIVERY = {
  FEE: 500, // ₦500
  FREE_DELIVERY_THRESHOLD: 10000, // ₦10,000
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH: "auth-storage",
  CART: "cart-storage",
  THEME: "theme-preference",
  LANGUAGE: "language-preference",
};
