import api from './api';

// Customer API service
const customerApi = {
  // Authentication
  register: (userData) => api.post('/customer/auth/register', userData),
  login: (credentials) => api.post('/customer/auth/login', credentials),
  logout: () => api.post('/customer/auth/logout'),
  forgotPassword: (email) => api.post('/customer/auth/forgot', { email }),
  resetPassword: (token, password) => api.post('/customer/auth/reset', { token, password }),

  // Profile
  getProfile: () => api.get('/customer/profile'),
  updateProfile: (profileData) => api.put('/customer/profile', profileData),
  changePassword: (passwordData) => api.put('/customer/profile', passwordData),

  // Products
  getProducts: (params) => api.get('/customer/products', { params }),
  getProduct: (id) => api.get(`/customer/products/${id}`),
  getCategories: () => api.get('/customer/products/categories'),
  getFeaturedProducts: () => api.get('/customer/products/featured'),
  searchProducts: (query) => api.get('/customer/products/search', { params: { q: query } }),

  // Cart
  getCart: () => api.get('/customer/cart'),
  addToCart: (itemData) => api.post('/customer/cart/add', itemData),
  updateCartItem: (itemData) => api.put('/customer/cart/update', itemData),
  removeFromCart: (itemData) => api.delete('/customer/cart/remove', { body: JSON.stringify(itemData) }),
  clearCart: () => api.delete('/customer/cart/clear'),

  // Orders
  getOrders: () => api.get('/customer/orders'),
  getOrder: (id) => api.get(`/customer/orders/${id}`),
  createOrder: (orderData) => api.post('/customer/orders', orderData),
  trackOrder: (id) => api.get(`/customer/orders/${id}/track`),

  // Addresses
  getAddresses: () => api.get('/customer/profile/addresses'),
  getAddress: (id) => api.get(`/customer/profile/addresses/${id}`),
  createAddress: (addressData) => api.post('/customer/profile/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/customer/profile/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/customer/profile/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/customer/profile/addresses/${id}/default`),
};

export default customerApi;