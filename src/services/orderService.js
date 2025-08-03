import { apiConfig } from '../config/apiConfig';
import { authService } from './authService';

// Logging utility
const logApiCall = (method, endpoint, params = null, response = null, error = null) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    method,
    endpoint,
    params,
    response: response ? { success: response.success, message: response.message } : null,
    error: error ? { message: error.message, stack: error.stack } : null,
  };
  
  console.log(`[ORDER API] ${method} ${endpoint}:`, JSON.stringify(logData, null, 2));
  
  if (error) {
    console.error(`[ORDER API ERROR] ${method} ${endpoint}:`, error);
  } else if (response) {
    console.log(`[ORDER API SUCCESS] ${method} ${endpoint}:`, response.message);
  }
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const method = options.method || 'GET';
  const startTime = Date.now();
  
  try {
    console.log(`[ORDER API] Starting ${method} request to: ${endpoint}`);
    
    const token = await authService.getAuthToken();
    const url = apiConfig.getFullUrl(endpoint);
    
    console.log(`[ORDER API] Full URL: ${url}`);
    console.log(`[ORDER API] Token available: ${token ? 'Yes' : 'No'}`);
    
    const config = {
      method: 'GET',
      headers: apiConfig.getAuthHeaders(token),
      ...options,
    };

    console.log(`[ORDER API] Request config:`, {
      method: config.method,
      headers: config.headers,
      body: config.body ? 'Present' : 'None'
    });

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    const duration = Date.now() - startTime;

    console.log(`[ORDER API] Response received in ${duration}ms:`, {
      status: response.status,
      statusText: response.statusText,
      success: data.success,
      message: data.message
    });

    if (!response.ok) {
      const error = new Error(data.message || 'API request failed');
      logApiCall(method, endpoint, null, null, error);
      throw error;
    }

    logApiCall(method, endpoint, null, data, null);
    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    if (error.name === 'AbortError') {
      console.error(`[ORDER API] Request timed out after ${duration}ms`);
    } else if (error.message.includes('Network request failed')) {
      console.error(`[ORDER API] Network error after ${duration}ms`);
    } else {
      console.error(`[ORDER API] Request failed after ${duration}ms:`, error);
    }
    
    logApiCall(method, endpoint, null, null, error);
    throw error;
  }
};

// Helper function to build query parameters
const buildQueryParams = (params = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString();
  console.log(`[ORDER API] Query params: ${queryString}`);
  return queryString;
};

// =====================================================
// ORDER MANAGEMENT
// =====================================================

export const orderService = {
  // Get order by ID
  getOrderById: async (orderId, vendorId) => {
    console.log(`[ORDER SERVICE] Getting order by ID: ${orderId}, vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.DETAIL}/${orderId}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved order: ${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get order ${orderId}:`, error);
      throw error;
    }
  },

  // Get all orders
  getAllOrders: async (vendorId, filters = {}) => {
    console.log(`[ORDER SERVICE] Getting all orders for vendor: ${vendorId}`);
    console.log(`[ORDER SERVICE] Filters:`, filters);
    
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.LIST}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get orders:`, error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, vendorId) => {
    console.log(`[ORDER SERVICE] Updating order ${orderId} status to: ${status}`);
    
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.UPDATE_STATUS}/${orderId}`;
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify({ status, vendorId }),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} status updated successfully to: ${status}`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to update order ${orderId} status:`, error);
      throw error;
    }
  },

  // Get order history
  getOrderHistory: async (vendorId, filters = {}) => {
    console.log(`[ORDER SERVICE] Getting order history for vendor: ${vendorId}`);
    
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.HISTORY}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved order history for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get order history for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get pending orders
  getPendingOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting pending orders for vendor: ${vendorId}`);
    
    const params = { vendorId, status: 'pending' };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.LIST}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} pending orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get pending orders:`, error);
      throw error;
    }
  },

  // Get completed orders
  getCompletedOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting completed orders for vendor: ${vendorId}`);
    
    const params = { vendorId, status: 'completed' };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.LIST}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} completed orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get completed orders:`, error);
      throw error;
    }
  },
};

export default orderService; 