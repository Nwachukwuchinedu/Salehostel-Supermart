import api from "./api";
import customerApi from "./customerApi";
import adminApi from "./adminApi";
import staffService from "./staffService";
import supplierService from "./supplierService";

class AuthService {
  // Customer Authentication
  async login(credentials) {
    const response = await customerApi.login(credentials);
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", "customer");
    }
    return response;
  }

  async register(userData) {
    const response = await customerApi.register(userData);
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", "customer");
    }
    return response;
  }

  // Admin Authentication
  async adminLogin(credentials) {
    const response = await adminApi.login(credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "admin");
    }
    return response;
  }

  // Staff Authentication
  async staffLogin(credentials) {
    const response = await staffService.login(credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "staff");
    }
    return response;
  }

  // Supplier Authentication
  async supplierLogin(credentials) {
    const response = await supplierService.login(credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "supplier");
    }
    return response;
  }

  async supplierRegister(userData) {
    const response = await supplierService.register(userData);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "supplier");
    }
    return response;
  }

  // Common Authentication Methods
  async logout() {
    const userType = localStorage.getItem("userType");

    try {
      switch (userType) {
        case "admin":
          await adminApi.logout();
          break;
        case "customer":
          await customerApi.logout();
          break;
        default:
          // For staff and supplier, just clear local storage
          break;
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    }
  }

  async getProfile() {
    const userType = localStorage.getItem("userType");

    switch (userType) {
      case "admin":
        return await adminApi.getProfile();
      case "staff":
        return await staffService.getProfile();
      case "supplier":
        return await supplierService.getProfile();
      case "customer":
      default:
        return await customerApi.getProfile();
    }
  }

  async updateProfile(profileData) {
    const userType = localStorage.getItem("userType");

    switch (userType) {
      case "staff":
        return await staffService.updateProfile(profileData);
      case "supplier":
        return await supplierService.updateProfile(profileData);
      case "customer":
      default:
        return await customerApi.updateProfile(profileData);
    }
  }

  async changePassword(passwordData) {
    const userType = localStorage.getItem("userType");

    switch (userType) {
      case "staff":
        return await staffService.changePassword(passwordData);
      case "supplier":
        return await supplierService.changePassword(passwordData);
      case "customer":
      default:
        return await customerApi.changePassword(passwordData);
    }
  }

  // Password Reset (mainly for customers)
  async forgotPassword(email) {
    return await customerApi.forgotPassword(email);
  }

  async resetPassword(token, password) {
    return await customerApi.resetPassword(token, password);
  }

  // Utility Methods
  getToken() {
    return localStorage.getItem("token");
  }

  getUserType() {
    return localStorage.getItem("userType") || "customer";
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  }
}

export default new AuthService();
