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
      const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
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
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.DETAIL(orderId)}?${queryString}`;
    
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
  updateOrderStatus: async (orderId, status, vendorId, additionalData = {}) => {
    console.log(`[ORDER SERVICE] Updating order ${orderId} status to: ${status}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.UPDATE_STATUS(orderId);
    
    const updateData = {
      status,
      vendorId,
      updatedAt: new Date().toISOString(),
      ...additionalData
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(updateData),
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
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.PENDING}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} pending orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get pending orders:`, error);
      throw error;
    }
  },

  // Get preparing orders
  getPreparingOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting preparing orders for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.PREPARING}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} preparing orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get preparing orders:`, error);
      throw error;
    }
  },

  // Get ready orders
  getReadyOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting ready orders for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.READY}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} ready orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get ready orders:`, error);
      throw error;
    }
  },

  // Get completed orders
  getCompletedOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting completed orders for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.COMPLETED}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} completed orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get completed orders:`, error);
      throw error;
    }
  },

  // Get cancelled orders
  getCancelledOrders: async (vendorId) => {
    console.log(`[ORDER SERVICE] Getting cancelled orders for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.CANCELLED}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} cancelled orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get cancelled orders:`, error);
      throw error;
    }
  },

  // Accept order
  acceptOrder: async (orderId, vendorId, estimatedPreparationTime = 25) => {
    console.log(`[ORDER SERVICE] Accepting order: ${orderId}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.ACCEPT(orderId);
    const requestData = {
      vendorId,
      estimatedPreparationTime,
      acceptedAt: new Date().toISOString(),
      notes: `Order accepted at ${new Date().toLocaleTimeString()}`
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} accepted successfully`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to accept order ${orderId}:`, error);
      throw error;
    }
  },

  // Start preparing order
  startPreparingOrder: async (orderId, vendorId) => {
    console.log(`[ORDER SERVICE] Starting preparation for order: ${orderId}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.START_PREPARING(orderId);
    const requestData = {
      vendorId,
      preparationStartedAt: new Date().toISOString(),
      notes: `Preparation started at ${new Date().toLocaleTimeString()}`
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} preparation started successfully`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to start preparing order ${orderId}:`, error);
      throw error;
    }
  },

  // Mark order as ready
  markOrderReady: async (orderId, vendorId) => {
    console.log(`[ORDER SERVICE] Marking order as ready: ${orderId}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.MARK_READY(orderId);
    const requestData = {
      vendorId,
      readyAt: new Date().toISOString(),
      notes: `Order ready at ${new Date().toLocaleTimeString()}`
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} marked as ready successfully`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to mark order ${orderId} as ready:`, error);
      throw error;
    }
  },

  // Complete order
  completeOrder: async (orderId, vendorId) => {
    console.log(`[ORDER SERVICE] Completing order: ${orderId}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.COMPLETE(orderId);
    const requestData = {
      vendorId,
      completedAt: new Date().toISOString(),
      notes: `Order completed at ${new Date().toLocaleTimeString()}`
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} completed successfully`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to complete order ${orderId}:`, error);
      throw error;
    }
  },

  // Reject order
  rejectOrder: async (orderId, vendorId, reason = '') => {
    console.log(`[ORDER SERVICE] Rejecting order: ${orderId}`);
    
    const endpoint = apiConfig.ENDPOINTS.ORDERS.REJECT(orderId);
    const requestData = {
      vendorId,
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
      notes: `Order rejected at ${new Date().toLocaleTimeString()}${reason ? ` - Reason: ${reason}` : ''}`
    };
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      console.log(`[ORDER SERVICE] Order ${orderId} rejected successfully`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to reject order ${orderId}:`, error);
      throw error;
    }
  },

  // Get orders by status
  getOrdersByStatus: async (vendorId, status) => {
    console.log(`[ORDER SERVICE] Getting orders with status: ${status} for vendor: ${vendorId}`);
    
    const params = { vendorId, status };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.LIST}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Retrieved ${response.data?.content?.length || 0} orders with status: ${status}`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to get orders with status ${status}:`, error);
      throw error;
    }
  },

  // Search orders
  searchOrders: async (vendorId, searchQuery, filters = {}) => {
    console.log(`[ORDER SERVICE] Searching orders for vendor: ${vendorId}, query: ${searchQuery}`);
    
    const params = { vendorId, query: searchQuery, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.SEARCH}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Search returned ${response.data?.content?.length || 0} orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to search orders:`, error);
      throw error;
    }
  },

  // Filter orders
  filterOrders: async (vendorId, filters = {}) => {
    console.log(`[ORDER SERVICE] Filtering orders for vendor: ${vendorId}`, filters);
    
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ORDERS.FILTER}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER SERVICE] Filter returned ${response.data?.content?.length || 0} orders`);
      return response;
    } catch (error) {
      console.error(`[ORDER SERVICE] Failed to filter orders:`, error);
      throw error;
    }
  },
};

export default orderService; 