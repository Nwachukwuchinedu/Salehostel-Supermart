 // Use the environment variable if set, otherwise default based on environment
const getApiBaseUrl = () => {
  // Check if explicitly set in environment variables
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use proxy
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, default to your backend URL
  // This ensures that even if VITE_API_URL is not set, we still have a fallback
  return 'https://salehostel-supermart.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();
// Debug logging
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('Using API Base URL:', API_BASE_URL);

// Get token from localStorage
const getToken = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const authData = JSON.parse(authStorage);
      return authData.state?.token;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const api = {
  // Generic request method
  request: async (endpoint, options = {}) => {
    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${normalizedEndpoint}`;
    
    // Debug logging
    console.log('Making API request to:', url);
    
    // Get token and add to headers if available
    const token = getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Debug logging
      console.log('API response status:', response.status);
      console.log('API response URL:', response.url);
      
      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        // Debug logging
        console.error('API error data:', data);
        
        // Create an error object that matches the expected structure
        const error = new Error(data.message || `HTTP error! status: ${response.status}`);
        error.response = {
          status: response.status,
          data: data
        };
        throw error;
      }
      
      // Debug logging
      console.log('API response data:', data);
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // SEARCH request
  searchProducts: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/public/products/search${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint);
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