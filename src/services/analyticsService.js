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
  
  console.log(`[ANALYTICS API] ${method} ${endpoint}:`, JSON.stringify(logData, null, 2));
  
  if (error) {
    console.error(`[ANALYTICS API ERROR] ${method} ${endpoint}:`, error);
  } else if (response) {
    console.log(`[ANALYTICS API SUCCESS] ${method} ${endpoint}:`, response.message);
  }
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const method = options.method || 'GET';
  const startTime = Date.now();
  
  try {
    console.log(`[ANALYTICS API] Starting ${method} request to: ${endpoint}`);
    
    const token = await authService.getAuthToken();
    const url = apiConfig.getFullUrl(endpoint);
    
    console.log(`[ANALYTICS API] Full URL: ${url}`);
    console.log(`[ANALYTICS API] Token available: ${token ? 'Yes' : 'No'}`);
    
    const config = {
      method: 'GET',
      headers: apiConfig.getAuthHeaders(token),
      ...options,
    };

    console.log(`[ANALYTICS API] Request config:`, {
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

    console.log(`[ANALYTICS API] Response received in ${duration}ms:`, {
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
      console.error(`[ANALYTICS API] Request timed out after ${duration}ms`);
    } else if (error.message.includes('Network request failed')) {
      console.error(`[ANALYTICS API] Network error after ${duration}ms`);
    } else {
      console.error(`[ANALYTICS API] Request failed after ${duration}ms:`, error);
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
  console.log(`[ANALYTICS API] Query params: ${queryString}`);
  return queryString;
};

// =====================================================
// REVENUE ANALYTICS
// =====================================================

export const revenueAnalyticsService = {
  // Get revenue overview
  getRevenueOverview: async (vendorId, period = 'month') => {
    console.log(`[REVENUE ANALYTICS] Getting revenue overview for vendor: ${vendorId}, period: ${period}`);
    
    const params = { vendorId, period };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ANALYTICS.REVENUE_OVERVIEW}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[REVENUE ANALYTICS] Retrieved revenue overview for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[REVENUE ANALYTICS] Failed to get revenue overview for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get top performing items
  getTopPerformingItems: async (vendorId, limit = 10) => {
    console.log(`[REVENUE ANALYTICS] Getting top performing items for vendor: ${vendorId}, limit: ${limit}`);
    
    const params = { vendorId, limit };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ANALYTICS.TOP_PERFORMING_ITEMS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[REVENUE ANALYTICS] Retrieved ${response.data?.length || 0} top performing items for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[REVENUE ANALYTICS] Failed to get top performing items for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get revenue trends
  getRevenueTrends: async (vendorId, period = 'month') => {
    console.log(`[REVENUE ANALYTICS] Getting revenue trends for vendor: ${vendorId}, period: ${period}`);
    
    const params = { vendorId, period };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ANALYTICS.REVENUE_TRENDS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[REVENUE ANALYTICS] Retrieved revenue trends for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[REVENUE ANALYTICS] Failed to get revenue trends for vendor ${vendorId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// ORDER ANALYTICS
// =====================================================

export const orderAnalyticsService = {
  // Get order analytics
  getOrderAnalytics: async (vendorId, period = 'month') => {
    console.log(`[ORDER ANALYTICS] Getting order analytics for vendor: ${vendorId}, period: ${period}`);
    
    const params = { vendorId, period };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ANALYTICS.ORDER_ANALYTICS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER ANALYTICS] Retrieved order analytics for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[ORDER ANALYTICS] Failed to get order analytics for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get order trends
  getOrderTrends: async (vendorId, period = 'month') => {
    console.log(`[ORDER ANALYTICS] Getting order trends for vendor: ${vendorId}, period: ${period}`);
    
    const params = { vendorId, period };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.ANALYTICS.ORDER_TRENDS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[ORDER ANALYTICS] Retrieved order trends for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[ORDER ANALYTICS] Failed to get order trends for vendor ${vendorId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// CONVENIENCE FUNCTIONS
// =====================================================

export const analyticsService = {
  // Get comprehensive analytics data
  getAnalyticsData: async (vendorId, period = 'month') => {
    console.log(`[ANALYTICS SERVICE] Getting comprehensive analytics data for vendor: ${vendorId}, period: ${period}`);
    
    try {
      let revenueOverview = {};
      let topPerformingItems = [];
      let revenueTrends = {};
      let orderAnalytics = {};
      let orderTrends = {};

      // Try to get revenue overview
      try {
        const revenueOverviewResponse = await revenueAnalyticsService.getRevenueOverview(vendorId, period);
        revenueOverview = revenueOverviewResponse.data || {};
        console.log(`[ANALYTICS SERVICE] Revenue overview retrieved successfully`);
      } catch (error) {
        console.warn(`[ANALYTICS SERVICE] Failed to get revenue overview:`, error.message);
        revenueOverview = {
          totalRevenue: 0,
          averageOrderValue: 0,
          revenueGrowth: 0
        };
      }

      // Try to get top performing items
      try {
        const topItemsResponse = await revenueAnalyticsService.getTopPerformingItems(vendorId, 10);
        topPerformingItems = topItemsResponse.data || [];
        console.log(`[ANALYTICS SERVICE] Top performing items retrieved successfully: ${topPerformingItems.length} items`);
      } catch (error) {
        console.warn(`[ANALYTICS SERVICE] Failed to get top performing items:`, error.message);
        topPerformingItems = [];
      }

      // Try to get revenue trends
      try {
        const revenueTrendsResponse = await revenueAnalyticsService.getRevenueTrends(vendorId, period);
        revenueTrends = revenueTrendsResponse.data || {};
        console.log(`[ANALYTICS SERVICE] Revenue trends retrieved successfully`);
      } catch (error) {
        console.warn(`[ANALYTICS SERVICE] Failed to get revenue trends:`, error.message);
        revenueTrends = {
          trends: [],
          growth: 0
        };
      }

      // Try to get order analytics
      try {
        const orderAnalyticsResponse = await orderAnalyticsService.getOrderAnalytics(vendorId, period);
        orderAnalytics = orderAnalyticsResponse.data || {};
        console.log(`[ANALYTICS SERVICE] Order analytics retrieved successfully`);
      } catch (error) {
        console.warn(`[ANALYTICS SERVICE] Failed to get order analytics:`, error.message);
        orderAnalytics = {
          totalOrders: 0,
          averageOrders: 0,
          orderGrowth: 0
        };
      }

      // Try to get order trends
      try {
        const orderTrendsResponse = await orderAnalyticsService.getOrderTrends(vendorId, period);
        orderTrends = orderTrendsResponse.data || {};
        console.log(`[ANALYTICS SERVICE] Order trends retrieved successfully`);
      } catch (error) {
        console.warn(`[ANALYTICS SERVICE] Failed to get order trends:`, error.message);
        orderTrends = {
          trends: [],
          growth: 0
        };
      }

      const result = {
        revenueOverview,
        topPerformingItems,
        revenueTrends,
        orderAnalytics,
        orderTrends
      };

      console.log(`[ANALYTICS SERVICE] Analytics data retrieved:`, {
        revenueOverview: !!result.revenueOverview,
        topItemsCount: result.topPerformingItems.length,
        revenueTrends: !!result.revenueTrends,
        orderAnalytics: !!result.orderAnalytics,
        orderTrends: !!result.orderTrends
      });

      return result;
    } catch (error) {
      console.error(`[ANALYTICS SERVICE] Failed to get analytics data for vendor ${vendorId}:`, error);
      // Return fallback data instead of throwing
      return {
        revenueOverview: {
          totalRevenue: 0,
          averageOrderValue: 0,
          revenueGrowth: 0
        },
        topPerformingItems: [],
        revenueTrends: {
          trends: [],
          growth: 0
        },
        orderAnalytics: {
          totalOrders: 0,
          averageOrders: 0,
          orderGrowth: 0
        },
        orderTrends: {
          trends: [],
          growth: 0
        }
      };
    }
  },
};

export default analyticsService; 