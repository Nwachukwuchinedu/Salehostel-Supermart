import api from "./api";

// Admin API service
const adminApi = {
  // Authentication
  login: (credentials) => api.post("/admin/auth/login", credentials),
  logout: () => api.post("/admin/auth/logout"),
  getProfile: () => api.get("/admin/auth/profile"),

  // Dashboard
  getDashboardStats: () => api.get("/admin/dashboard"),
  getRecentActivity: () => api.get("/admin/dashboard/activity"),

  // Products
  getProducts: (params) => api.get("/admin/products", { params }),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (productData) => api.post("/admin/products", productData),
  updateProduct: (id, productData) =>
    api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Inventory
  getInventoryOverview: () => api.get("/admin/inventory"),
  getStockMovements: (params) =>
    api.get("/admin/inventory/movements", { params }),
  adjustStock: (adjustmentData) =>
    api.post("/admin/inventory/adjust", adjustmentData),
  getLowStockAlerts: () => api.get("/admin/inventory/alerts"),

  // Purchases
  getPurchases: (params) => api.get("/admin/purchases", { params }),
  getPurchase: (id) => api.get(`/admin/purchases/${id}`),
  createPurchase: (purchaseData) => api.post("/admin/purchases", purchaseData),
  updatePurchase: (id, purchaseData) =>
    api.put(`/admin/purchases/${id}`, purchaseData),
  deletePurchase: (id) => api.delete(`/admin/purchases/${id}`),

  // Suppliers
  getSuppliers: (params) => api.get("/admin/suppliers", { params }),
  getSupplier: (id) => api.get(`/admin/suppliers/${id}`),
  createSupplier: (supplierData) => api.post("/admin/suppliers", supplierData),
  updateSupplier: (id, supplierData) =>
    api.put(`/admin/suppliers/${id}`, supplierData),
  deleteSupplier: (id) => api.delete(`/admin/suppliers/${id}`),
  verifySupplier: (id, verificationData) =>
    api.put(`/admin/suppliers/${id}/verify`, verificationData),
  suspendSupplier: (id, suspensionData) =>
    api.put(`/admin/suppliers/${id}/suspend`, suspensionData),
  getSupplierPerformance: (id) => api.get(`/admin/suppliers/${id}/performance`),
  getSupplierAnalytics: (params) =>
    api.get("/admin/suppliers/analytics", { params }),

  // Purchase Orders (to suppliers)
  getPurchaseOrders: (params) => api.get("/admin/purchase-orders", { params }),
  getPurchaseOrder: (id) => api.get(`/admin/purchase-orders/${id}`),
  createPurchaseOrder: (orderData) =>
    api.post("/admin/purchase-orders", orderData),
  updatePurchaseOrder: (id, orderData) =>
    api.put(`/admin/purchase-orders/${id}`, orderData),
  cancelPurchaseOrder: (id, cancellationData) =>
    api.put(`/admin/purchase-orders/${id}/cancel`, cancellationData),
  approvePurchaseOrder: (id, approvalData) =>
    api.put(`/admin/purchase-orders/${id}/approve`, approvalData),

  // Orders
  getOrders: (params) => api.get("/admin/orders", { params }),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, statusData) =>
    api.put(`/admin/orders/${id}/status`, statusData),
  processRefund: (id, refundData) =>
    api.post(`/admin/orders/${id}/refund`, refundData),

  // Reports
  getSalesReport: (params) => api.get("/admin/reports/sales", { params }),
  getInventoryReport: (params) =>
    api.get("/admin/reports/inventory", { params }),
  getProfitLossReport: (params) =>
    api.get("/admin/reports/profit-loss", { params }),
  getCustomerReport: (params) =>
    api.get("/admin/reports/customers", { params }),
  getProductPerformance: (params) =>
    api.get("/admin/reports/products", { params }),

  // Users
  getUsers: (params) => api.get("/admin/users", { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (userData) => api.post("/admin/users", userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getCustomers: (params) => api.get("/admin/users", { params }),
  getAdmins: (params) => api.get("/admin/users", { params }),
};

export default adminApi;
