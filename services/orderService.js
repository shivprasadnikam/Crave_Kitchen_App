import { api, API_ENDPOINTS } from './api';

/**
 * Order Service
 * Handles all order-related API calls
 */
export const orderService = {
  /**
   * Get orders with filters and pagination
   * @param {object} params - Query parameters
   * @returns {Promise} - Orders response
   */
  getOrders: async (params = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.LIST, { params });
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order details response
   */
  getOrderById: async (orderId) => {
    return api.get(API_ENDPOINTS.ORDERS.DETAIL(orderId));
  },

  /**
   * Create new order
   * @param {object} orderData - Order data
   * @returns {Promise} - Order creation response
   */
  createOrder: async (orderData) => {
    return api.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
  },

  /**
   * Update order
   * @param {string} orderId - Order ID
   * @param {object} orderData - Order data to update
   * @returns {Promise} - Order update response
   */
  updateOrder: async (orderId, orderData) => {
    return api.put(API_ENDPOINTS.ORDERS.UPDATE(orderId), orderData);
  },

  /**
   * Delete order
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order deletion response
   */
  deleteOrder: async (orderId) => {
    return api.delete(API_ENDPOINTS.ORDERS.DELETE(orderId));
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @param {string} notes - Optional notes
   * @returns {Promise} - Status update response
   */
  updateOrderStatus: async (orderId, status, notes = '') => {
    return api.patch(API_ENDPOINTS.ORDERS.UPDATE_STATUS(orderId), {
      status,
      notes,
    });
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise} - Order cancellation response
   */
  cancelOrder: async (orderId, reason = '') => {
    return api.post(API_ENDPOINTS.ORDERS.CANCEL(orderId), {
      reason,
    });
  },

  /**
   * Accept order
   * @param {string} orderId - Order ID
   * @param {string} estimatedTime - Estimated preparation time
   * @returns {Promise} - Order acceptance response
   */
  acceptOrder: async (orderId, estimatedTime) => {
    return api.post(API_ENDPOINTS.ORDERS.ACCEPT(orderId), {
      estimatedTime,
    });
  },

  /**
   * Reject order
   * @param {string} orderId - Order ID
   * @param {string} reason - Rejection reason
   * @returns {Promise} - Order rejection response
   */
  rejectOrder: async (orderId, reason) => {
    return api.post(API_ENDPOINTS.ORDERS.REJECT(orderId), {
      reason,
    });
  },

  /**
   * Mark order as ready
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order ready response
   */
  markOrderReady: async (orderId) => {
    return api.post(API_ENDPOINTS.ORDERS.MARK_READY(orderId));
  },

  /**
   * Mark order as delivered
   * @param {string} orderId - Order ID
   * @param {object} deliveryInfo - Delivery information
   * @returns {Promise} - Order delivered response
   */
  markOrderDelivered: async (orderId, deliveryInfo = {}) => {
    return api.post(API_ENDPOINTS.ORDERS.MARK_DELIVERED(orderId), deliveryInfo);
  },

  /**
   * Get order statistics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Order statistics response
   */
  getOrderStatistics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.STATISTICS, { params: filters });
  },

  /**
   * Get order history
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Order history response
   */
  getOrderHistory: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.HISTORY, { params: filters });
  },

  /**
   * Get orders by status
   * @param {string} status - Order status
   * @param {object} params - Additional parameters
   * @returns {Promise} - Orders by status response
   */
  getOrdersByStatus: async (status, params = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.LIST, {
      params: { ...params, status },
    });
  },

  /**
   * Get pending orders
   * @param {object} params - Additional parameters
   * @returns {Promise} - Pending orders response
   */
  getPendingOrders: async (params = {}) => {
    return orderService.getOrdersByStatus('pending', params);
  },

  /**
   * Get completed orders
   * @param {object} params - Additional parameters
   * @returns {Promise} - Completed orders response
   */
  getCompletedOrders: async (params = {}) => {
    return orderService.getOrdersByStatus('completed', params);
  },

  /**
   * Get orders by date range
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @param {object} params - Additional parameters
   * @returns {Promise} - Orders by date range response
   */
  getOrdersByDateRange: async (startDate, endDate, params = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.LIST, {
      params: { ...params, startDate, endDate },
    });
  },

  /**
   * Search orders
   * @param {string} query - Search query
   * @param {object} params - Additional parameters
   * @returns {Promise} - Search results response
   */
  searchOrders: async (query, params = {}) => {
    return api.get(API_ENDPOINTS.ORDERS.LIST, {
      params: { ...params, search: query },
    });
  },

  /**
   * Export orders
   * @param {object} filters - Filter parameters
   * @param {string} format - Export format (csv, excel, pdf)
   * @returns {Promise} - Export response
   */
  exportOrders: async (filters = {}, format = 'csv') => {
    return api.get('/orders/export', {
      params: { ...filters, format },
      responseType: 'blob',
    });
  },

  /**
   * Get order timeline
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order timeline response
   */
  getOrderTimeline: async (orderId) => {
    return api.get(`/orders/${orderId}/timeline`);
  },

  /**
   * Add order note
   * @param {string} orderId - Order ID
   * @param {string} note - Note content
   * @returns {Promise} - Add note response
   */
  addOrderNote: async (orderId, note) => {
    return api.post(`/orders/${orderId}/notes`, { note });
  },

  /**
   * Get order notes
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order notes response
   */
  getOrderNotes: async (orderId) => {
    return api.get(`/orders/${orderId}/notes`);
  },

  /**
   * Update order item
   * @param {string} orderId - Order ID
   * @param {string} itemId - Item ID
   * @param {object} itemData - Item data to update
   * @returns {Promise} - Item update response
   */
  updateOrderItem: async (orderId, itemId, itemData) => {
    return api.put(`/orders/${orderId}/items/${itemId}`, itemData);
  },

  /**
   * Remove order item
   * @param {string} orderId - Order ID
   * @param {string} itemId - Item ID
   * @returns {Promise} - Item removal response
   */
  removeOrderItem: async (orderId, itemId) => {
    return api.delete(`/orders/${orderId}/items/${itemId}`);
  },

  /**
   * Add order item
   * @param {string} orderId - Order ID
   * @param {object} itemData - Item data
   * @returns {Promise} - Item addition response
   */
  addOrderItem: async (orderId, itemData) => {
    return api.post(`/orders/${orderId}/items`, itemData);
  },

  /**
   * Get order analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Order analytics response
   */
  getOrderAnalytics: async (filters = {}) => {
    return api.get('/orders/analytics', { params: filters });
  },

  /**
   * Get order trends
   * @param {string} period - Time period
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Order trends response
   */
  getOrderTrends: async (period = 'week', filters = {}) => {
    return api.get('/orders/trends', {
      params: { ...filters, period },
    });
  },

  /**
   * Get order performance metrics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Performance metrics response
   */
  getOrderPerformanceMetrics: async (filters = {}) => {
    return api.get('/orders/performance', { params: filters });
  },

  /**
   * Bulk update order status
   * @param {Array} orderIds - Array of order IDs
   * @param {string} status - New status
   * @param {string} notes - Optional notes
   * @returns {Promise} - Bulk update response
   */
  bulkUpdateOrderStatus: async (orderIds, status, notes = '') => {
    return api.post('/orders/bulk-update', {
      orderIds,
      status,
      notes,
    });
  },

  /**
   * Get order notifications
   * @param {object} params - Query parameters
   * @returns {Promise} - Order notifications response
   */
  getOrderNotifications: async (params = {}) => {
    return api.get('/orders/notifications', { params });
  },

  /**
   * Mark order notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Mark as read response
   */
  markOrderNotificationAsRead: async (notificationId) => {
    return api.post(`/orders/notifications/${notificationId}/read`);
  },
};

export default orderService; 