import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, APP_CONSTANTS } from '../config';
import { showToast } from '../utils/toast';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // Get auth token from storage
      const token = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request timestamp
      config.metadata = { startTime: new Date() };
      
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
      
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
api.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata?.startTime;
    
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      duration: `${duration}ms`,
      data: response.data,
    });
    
    return response;
  },
  async (error) => {
    const endTime = new Date();
    const duration = endTime - error.config?.metadata?.startTime;
    
    console.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      duration: `${duration}ms`,
      message: error.message,
      data: error.response?.data,
    });
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      try {
        // Try to refresh token
        const refreshToken = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          const refreshResponse = await axios.post(
            `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REFRESH_TOKEN}`,
            { refresh_token: refreshToken }
          );
          
          if (refreshResponse.data.token) {
            await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, refreshResponse.data.token);
            
            // Retry original request
            error.config.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
            return api.request(error.config);
          }
        }
        
        // If refresh fails, clear tokens and redirect to login
        await AsyncStorage.multiRemove([
          APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
          APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
          APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE,
        ]);
        
        // You can dispatch a logout action here if using Redux
        // store.dispatch(logout());
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await AsyncStorage.multiRemove([
          APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
          APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
          APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE,
        ]);
      }
    }
    
    // Handle other errors
    const errorMessage = getErrorMessage(error);
    showToast(errorMessage, 'error');
    
    return Promise.reject(error);
  }
);

/**
 * Get error message from API error
 * @param {Error} error - Axios error object
 * @returns {string} - Error message
 */
const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return APP_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;
};

/**
 * Make GET request
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const get = async (url, params = {}, config = {}) => {
  try {
    const response = await api.get(url, { params, ...config });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Make POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request data
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Make PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request data
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const put = async (url, data = {}, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Make PATCH request
 * @param {string} url - API endpoint
 * @param {object} data - Request data
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const patch = async (url, data = {}, config = {}) => {
  try {
    const response = await api.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Make DELETE request
 * @param {string} url - API endpoint
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload file
 * @param {string} url - API endpoint
 * @param {FormData} formData - Form data with file
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
export const uploadFile = async (url, formData, config = {}) => {
  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Download file
 * @param {string} url - API endpoint
 * @param {object} config - Additional axios config
 * @returns {Promise} - File blob
 */
export const downloadFile = async (url, config = {}) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Make request with retry logic
 * @param {Function} requestFn - Request function to retry
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} delay - Delay between retries in ms (default: 1000)
 * @returns {Promise} - API response
 */
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on 4xx errors (except 429)
      if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 429) {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

/**
 * Cancel ongoing requests
 * @param {string} requestId - Request ID to cancel
 */
export const cancelRequest = (requestId) => {
  // Implementation depends on your needs
  // You can use AbortController or axios cancel tokens
};

/**
 * Set auth token
 * @param {string} token - Auth token
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

/**
 * Clear auth token
 */
export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

/**
 * Set base URL
 * @param {string} baseURL - New base URL
 */
export const setBaseURL = (baseURL) => {
  api.defaults.baseURL = baseURL;
};

/**
 * Set timeout
 * @param {number} timeout - Timeout in milliseconds
 */
export const setTimeout = (timeout) => {
  api.defaults.timeout = timeout;
};

/**
 * Add request interceptor
 * @param {Function} onFulfilled - Success handler
 * @param {Function} onRejected - Error handler
 * @returns {number} - Interceptor ID
 */
export const addRequestInterceptor = (onFulfilled, onRejected) => {
  return api.interceptors.request.use(onFulfilled, onRejected);
};

/**
 * Add response interceptor
 * @param {Function} onFulfilled - Success handler
 * @param {Function} onRejected - Error handler
 * @returns {number} - Interceptor ID
 */
export const addResponseInterceptor = (onFulfilled, onRejected) => {
  return api.interceptors.response.use(onFulfilled, onRejected);
};

/**
 * Remove request interceptor
 * @param {number} id - Interceptor ID
 */
export const removeRequestInterceptor = (id) => {
  api.interceptors.request.eject(id);
};

/**
 * Remove response interceptor
 * @param {number} id - Interceptor ID
 */
export const removeResponseInterceptor = (id) => {
  api.interceptors.response.eject(id);
};

export default {
  get,
  post,
  put,
  patch,
  del,
  uploadFile,
  downloadFile,
  retryRequest,
  cancelRequest,
  setAuthToken,
  clearAuthToken,
  setBaseURL,
  setTimeout,
  addRequestInterceptor,
  addResponseInterceptor,
  removeRequestInterceptor,
  removeResponseInterceptor,
}; 