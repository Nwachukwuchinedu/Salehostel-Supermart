// Base API service
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = {
  // Generic request method
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    // Get token from localStorage
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle unauthorized responses
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        window.location.href = "/login";
        return;
      }

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
  },

  // GET request
  get: async (endpoint, options = {}) => {
    return api.request(endpoint, {
      method: "GET",
      ...options,
    });
  },

  // POST request
  post: async (endpoint, data, options = {}) => {
    return api.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PUT request
  put: async (endpoint, data, options = {}) => {
    return api.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  },

  // DELETE request
  delete: async (endpoint, options = {}) => {
    return api.request(endpoint, {
      method: "DELETE",
      ...options,
    });
  },
};

export default api;
