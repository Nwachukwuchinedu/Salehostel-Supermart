import api from './api';

// Admin API service
const adminApi = {
  // Authentication
  login: (credentials) => api.post('/admin/auth/login', credentials),
  logout: () => api.post('/admin/auth/logout'),
  getProfile: () => api.get('/admin/auth/profile'),

  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard'),
  getRecentActivity: () => api.get('/admin/dashboard/activity'),

  // Products
  getProducts: (params) => api.get('/admin/products', { params }),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Inventory
  getInventoryOverview: () => api.get('/admin/inventory'),
  getStockMovements: (params) => api.get('/admin/inventory/movements', { params }),
  adjustStock: (adjustmentData) => api.post('/admin/inventory/adjust', adjustmentData),
  getLowStockAlerts: () => api.get('/admin/inventory/alerts'),

  // Supplies
  getSupplies: (params) => api.get('/admin/supplies', { params }),
  getSupply: (id) => api.get(`/admin/supplies/${id}`),
  receiveSupply: (id) => api.put(`/admin/supplies/${id}/receive`),
  cancelSupply: (id) => api.put(`/admin/supplies/${id}/cancel`),
  getSupplyStats: () => api.get('/admin/supplies/stats'),

  // Purchases
  getPurchases: (params) => api.get('/admin/purchases', { params }),
  getPurchase: (id) => api.get(`/admin/purchases/${id}`),
  createPurchase: (purchaseData) => api.post('/admin/purchases', purchaseData),
  updatePurchase: (id, purchaseData) => api.put(`/admin/purchases/${id}`, purchaseData),
  deletePurchase: (id) => api.delete(`/admin/purchases/${id}`),
  getSuppliers: () => api.get('/admin/purchases'),
  createSupplier: (supplierData) => api.post('/admin/purchases', supplierData),

  // Orders
  getOrders: (params) => api.get('/admin/orders', { params }),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/admin/orders/${id}/status`, statusData),
  processRefund: (id, refundData) => api.post(`/admin/orders/${id}/refund`, refundData),

  // Reports
  getSalesReport: (params) => api.get('/admin/reports/sales', { params }),
  getInventoryReport: (params) => api.get('/admin/reports/inventory', { params }),
  getProfitLossReport: (params) => api.get('/admin/reports/profit-loss', { params }),
  getCustomerReport: (params) => api.get('/admin/reports/customers', { params }),
  getProductPerformance: (params) => api.get('/admin/reports/products', { params }),

  // Users
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getCustomers: (params) => api.get('/admin/users', { params }),
  getAdmins: (params) => api.get('/admin/users', { params }),
};

export default adminApi;