// Simple API service for SalesHostel
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${normalizedEndpoint}`;

    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log('Making API request to:', url);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("Error parsing auth storage:", error);
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // SEARCH request
  async searchProducts(query, filters = {}) {
    const params = { q: query, ...filters };
    return this.get("/public/products/search", params);
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: "GET",
    });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

const api = new ApiService();
export default api;