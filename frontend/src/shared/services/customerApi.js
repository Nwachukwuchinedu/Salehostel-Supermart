import api from './api';

// Customer API service
const customerApi = {
  // Authentication
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  
  // Profile
  getProfile: () => api.get('/customer/profile'),
  updateProfile: (profileData) => api.put('/customer/profile', profileData),
  changePassword: (passwordData) => api.put('/customer/profile/password', passwordData),
  
  // Products
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  
  // Cart
  getCart: () => api.get('/customer/cart'),
  addToCart: (itemData) => api.post('/customer/cart', itemData),
  updateCartItem: (id, quantity) => api.put(`/customer/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/customer/cart/${id}`),
  clearCart: () => api.delete('/customer/cart'),
  
  // Orders
  getOrders: () => api.get('/customer/orders'),
  getOrder: (id) => api.get(`/customer/orders/${id}`),
  createOrder: (orderData) => api.post('/customer/orders', orderData),
  trackOrder: (id) => api.get(`/customer/orders/${id}/track`),
  
  // Addresses
  getAddresses: () => api.get('/customer/addresses'),
  getAddress: (id) => api.get(`/customer/addresses/${id}`),
  createAddress: (addressData) => api.post('/customer/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/customer/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/customer/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/customer/addresses/${id}/default`),
};

export default customerApi;