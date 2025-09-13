// Base API service
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = {
  // Generic request method
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // GET request
  get: async (endpoint, options = {}) => {
    return api.request(endpoint, {
      method: 'GET',
      ...options,
    });
  },

  // POST request
  post: async (endpoint, data, options = {}) => {
    return api.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PUT request
  put: async (endpoint, data, options = {}) => {
    return api.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // DELETE request
  delete: async (endpoint, options = {}) => {
    return api.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },
};

export default api;