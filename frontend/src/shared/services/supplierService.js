import api from "./api";

class SupplierService {
  // Authentication
  async register(supplierData) {
    const response = await api.post("/supplier/auth/register", supplierData);
    return response.data;
  }

  async login(credentials) {
    const response = await api.post("/supplier/auth/login", credentials);
    return response.data;
  }

  async getProfile() {
    const response = await api.get("/supplier/auth/profile");
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await api.put("/supplier/auth/profile", profileData);
    return response.data;
  }

  async changePassword(passwordData) {
    const response = await api.put(
      "/supplier/auth/change-password",
      passwordData
    );
    return response.data;
  }

  // Products
  async getProducts(params = {}) {
    const response = await api.get("/supplier/products", { params });
    return response.data;
  }

  async getProduct(id) {
    const response = await api.get(`/supplier/products/${id}`);
    return response.data;
  }

  async createProduct(productData) {
    const formData = new FormData();

    // Append product data
    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        productData[key].forEach((image) => {
          formData.append("images", image);
        });
      } else if (key === "variants") {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.post("/supplier/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updateProduct(id, productData) {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "images" && Array.isArray(productData[key])) {
        productData[key].forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      } else if (key === "variants") {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.put(`/supplier/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updateProductPrices(id, variants) {
    const response = await api.put(`/supplier/products/${id}/prices`, {
      variants,
    });
    return response.data;
  }

  async deleteProduct(id) {
    const response = await api.delete(`/supplier/products/${id}`);
    return response.data;
  }

  async getProductAnalytics(id) {
    const response = await api.get(`/supplier/products/${id}/analytics`);
    return response.data;
  }

  // Supplies
  async createSupply(supplyData) {
    const response = await api.post("/supplier/supplies", supplyData);
    return response.data;
  }

  async getSupplies(params = {}) {
    const response = await api.get("/supplier/supplies", { params });
    return response.data;
  }

  async getSupply(id) {
    const response = await api.get(`/supplier/supplies/${id}`);
    return response.data;
  }

  async updateSupply(id, supplyData) {
    const response = await api.put(`/supplier/supplies/${id}`, supplyData);
    return response.data;
  }

  async confirmSupplyDelivery(id, deliveryData) {
    const response = await api.put(
      `/supplier/supplies/${id}/confirm`,
      deliveryData
    );
    return response.data;
  }

  async getSupplyAnalytics(params = {}) {
    const response = await api.get("/supplier/supplies/analytics", { params });
    return response.data;
  }

  // Purchase Orders
  async getPurchaseOrders(params = {}) {
    const response = await api.get("/supplier/orders", { params });
    return response.data;
  }

  async getPurchaseOrder(id) {
    const response = await api.get(`/supplier/orders/${id}`);
    return response.data;
  }

  async confirmPurchaseOrder(id, confirmationData) {
    const response = await api.put(
      `/supplier/orders/${id}/confirm`,
      confirmationData
    );
    return response.data;
  }

  async updateDeliveryStatus(id, deliveryData) {
    const response = await api.put(
      `/supplier/orders/${id}/delivery`,
      deliveryData
    );
    return response.data;
  }

  async rejectPurchaseOrder(id, rejectionData) {
    const response = await api.put(
      `/supplier/orders/${id}/reject`,
      rejectionData
    );
    return response.data;
  }

  async getOrderAnalytics(params = {}) {
    const response = await api.get("/supplier/orders/analytics", { params });
    return response.data;
  }
}

export default new SupplierService();
