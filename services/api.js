import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/apiConfig';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Add authentication token
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request timestamp
      config.metadata = { startTime: new Date() };

      // Add retry count if not present
      if (!config.retryCount) {
        config.retryCount = 0;
      }

      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date();
    const startTime = response.config.metadata?.startTime;
    const duration = startTime ? endTime - startTime : 0;

    // Log successful requests in development
    if (__DEV__) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Calculate request duration
    const endTime = new Date();
    const startTime = originalRequest?.metadata?.startTime;
    const duration = startTime ? endTime - startTime : 0;

    // Log errors
    if (__DEV__) {
      console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} - ${error.response?.status} (${duration}ms)`, error.response?.data);
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token } = response.data;
          await AsyncStorage.setItem('auth_token', token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        await AsyncStorage.multiRemove(['auth_token', 'refresh_token', 'user_data']);
        
        // You might want to dispatch a logout action here
        // store.dispatch({ type: 'LOGOUT' });
      }
    }

    // Handle retry logic for network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      if (originalRequest.retryCount < API_CONFIG.MAX_RETRIES) {
        originalRequest.retryCount += 1;
        
        // Exponential backoff
        const delay = Math.pow(2, originalRequest.retryCount) * 1000;
        
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(apiClient(originalRequest));
          }, delay);
        });
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Orders
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id) => `/orders/${id}`,
    DELETE: (id) => `/orders/${id}`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    CANCEL: (id) => `/orders/${id}/cancel`,
    ACCEPT: (id) => `/orders/${id}/accept`,
    REJECT: (id) => `/orders/${id}/reject`,
    MARK_READY: (id) => `/orders/${id}/ready`,
    MARK_DELIVERED: (id) => `/orders/${id}/delivered`,
    STATISTICS: '/orders/statistics',
    HISTORY: '/orders/history',
  },

  // Menu
  MENU: {
    ITEMS: '/menu/items',
    ITEM_DETAIL: (id) => `/menu/items/${id}`,
    CREATE_ITEM: '/menu/items',
    UPDATE_ITEM: (id) => `/menu/items/${id}`,
    DELETE_ITEM: (id) => `/menu/items/${id}`,
    TOGGLE_AVAILABILITY: (id) => `/menu/items/${id}/availability`,
    UPDATE_PRICE: (id) => `/menu/items/${id}/price`,
    REORDER: '/menu/items/reorder',
    CATEGORIES: '/menu/categories',
    CATEGORY_DETAIL: (id) => `/menu/categories/${id}`,
    CREATE_CATEGORY: '/menu/categories',
    UPDATE_CATEGORY: (id) => `/menu/categories/${id}`,
    DELETE_CATEGORY: (id) => `/menu/categories/${id}`,
    STATISTICS: '/menu/statistics',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REVENUE: '/analytics/revenue',
    ORDERS: '/analytics/orders',
    CUSTOMERS: '/analytics/customers',
    MENU: '/analytics/menu',
    INVENTORY: '/analytics/inventory',
    PERFORMANCE: '/analytics/performance',
    REAL_TIME: '/analytics/real-time',
    TREND: '/analytics/trend',
    COMPARATIVE: '/analytics/comparative',
    GENERATE_REPORT: '/analytics/reports',
    EXPORT: '/analytics/export',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id) => `/notifications/${id}`,
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id) => `/notifications/${id}`,
    SETTINGS: '/notifications/settings',
    UPDATE_SETTINGS: '/notifications/settings',
    SEND_TEST: '/notifications/test',
  },

  // Inventory
  INVENTORY: {
    LIST: '/inventory',
    DETAIL: (id) => `/inventory/${id}`,
    CREATE: '/inventory',
    UPDATE: (id) => `/inventory/${id}`,
    DELETE: (id) => `/inventory/${id}`,
    ADJUST_STOCK: (id) => `/inventory/${id}/adjust`,
    LOW_STOCK: '/inventory/low-stock',
    STATISTICS: '/inventory/statistics',
  },

  // Payments
  PAYMENTS: {
    LIST: '/payments',
    DETAIL: (id) => `/payments/${id}`,
    CREATE: '/payments',
    REFUND: (id) => `/payments/${id}/refund`,
    STATISTICS: '/payments/statistics',
    PAYOUT: '/payments/payout',
    PAYOUT_HISTORY: '/payments/payout-history',
  },

  // Settings
  SETTINGS: {
    PROFILE: '/settings/profile',
    RESTAURANT: '/settings/restaurant',
    OPERATING_HOURS: '/settings/operating-hours',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security',
    DISPLAY: '/settings/display',
  },

  // Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    BULK: '/upload/bulk',
  },
};

// API helper functions
export const api = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Upload file
  upload: async (url, formData, config = {}) => {
    try {
      const response = await apiClient.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Download file
  download: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, {
        ...config,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handler
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return new Error(data.message || 'Bad request');
      case 401:
        return new Error(data.message || 'Unauthorized');
      case 403:
        return new Error(data.message || 'Forbidden');
      case 404:
        return new Error(data.message || 'Not found');
      case 422:
        return new Error(data.message || 'Validation error');
      case 429:
        return new Error(data.message || 'Too many requests');
      case 500:
        return new Error(data.message || 'Internal server error');
      default:
        return new Error(data.message || `HTTP ${status} error`);
    }
  } else if (error.request) {
    // Network error
    return new Error('Network error. Please check your connection.');
  } else {
    // Other error
    return new Error(error.message || 'An unexpected error occurred');
  }
};

// Export the axios instance for direct use if needed
export { apiClient };

export default api; 