import api from "./api";

class StaffService {
  // Authentication
  async login(credentials) {
    const response = await api.post("/staff/auth/login", credentials);
    return response.data;
  }

  async getProfile() {
    const response = await api.get("/staff/auth/profile");
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await api.put("/staff/auth/profile", profileData);
    return response.data;
  }

  async changePassword(passwordData) {
    const response = await api.put("/staff/auth/change-password", passwordData);
    return response.data;
  }

  async clockIn() {
    const response = await api.post("/staff/auth/clock", { action: "in" });
    return response.data;
  }

  async clockOut() {
    const response = await api.post("/staff/auth/clock", { action: "out" });
    return response.data;
  }

  async getClockHistory(params = {}) {
    const response = await api.get("/staff/auth/clock-history", { params });
    return response.data;
  }

  // Orders
  async getOrders(params = {}) {
    const response = await api.get("/staff/orders", { params });
    return response.data;
  }

  async getOrder(id) {
    const response = await api.get(`/staff/orders/${id}`);
    return response.data;
  }

  async updateOrderStatus(id, statusData) {
    const response = await api.put(`/staff/orders/${id}/status`, statusData);
    return response.data;
  }

  async assignOrder(id, assignmentData = {}) {
    const response = await api.put(
      `/staff/orders/${id}/assign`,
      assignmentData
    );
    return response.data;
  }

  async createWalkInOrder(orderData) {
    const response = await api.post("/staff/orders", orderData);
    return response.data;
  }

  async processPayment(id, paymentData) {
    const response = await api.put(`/staff/orders/${id}/payment`, paymentData);
    return response.data;
  }

  async getOrderQueue() {
    const response = await api.get("/staff/orders/queue");
    return response.data;
  }

  async getStaffPerformance(params = {}) {
    const response = await api.get("/staff/orders/performance", { params });
    return response.data;
  }

  // Inventory
  async getInventory(params = {}) {
    const response = await api.get("/staff/inventory", { params });
    return response.data;
  }

  async getInventorySummary() {
    const response = await api.get("/staff/inventory/summary");
    return response.data;
  }

  async updateStock(id, stockData) {
    const response = await api.put(`/staff/inventory/${id}/stock`, stockData);
    return response.data;
  }

  async getLowStockAlerts() {
    const response = await api.get("/staff/inventory/low-stock");
    return response.data;
  }

  async recordStockMovement(movementData) {
    const response = await api.post("/staff/inventory/movement", movementData);
    return response.data;
  }

  async getStockMovements(params = {}) {
    const response = await api.get("/staff/inventory/movements", { params });
    return response.data;
  }

  async performStockCount(countData) {
    const response = await api.post("/staff/inventory/stock-count", countData);
    return response.data;
  }

  async getInventoryReports(params = {}) {
    const response = await api.get("/staff/inventory/reports", { params });
    return response.data;
  }
}

export default new StaffService();
