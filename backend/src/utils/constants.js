// Constants
module.exports = {
  // User roles
  USER_ROLES: {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    SUPER_ADMIN: 'super_admin'
  },

  // Order statuses
  ORDER_STATUSES: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RETURNED: 'returned'
  },

  // Payment statuses
  PAYMENT_STATUSES: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  },

  // Product statuses
  PRODUCT_STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued'
  },

  // Inventory units
  INVENTORY_UNITS: {
    KG: 'kg',
    BAG: 'bag',
    PIECE: 'piece',
    CARTON: 'carton',
    LITER: 'liter',
    METER: 'meter'
  },

  // Permission levels
  PERMISSIONS: {
    PRODUCTS: 'products',
    INVENTORY: 'inventory',
    ORDERS: 'orders',
    USERS: 'users',
    REPORTS: 'reports'
  }
};