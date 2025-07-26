import { api, API_ENDPOINTS } from './api';

/**
 * Inventory Service
 * Handles all inventory-related API calls
 */
export const inventoryService = {
  /**
   * Get inventory items with filters and pagination
   * @param {object} params - Query parameters
   * @returns {Promise} - Inventory items response
   */
  getInventoryItems: async (params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.LIST, { params });
  },

  /**
   * Get inventory item by ID
   * @param {string} itemId - Inventory item ID
   * @returns {Promise} - Inventory item details response
   */
  getInventoryItemById: async (itemId) => {
    return api.get(API_ENDPOINTS.INVENTORY.DETAIL(itemId));
  },

  /**
   * Create new inventory item
   * @param {object} itemData - Inventory item data
   * @returns {Promise} - Inventory item creation response
   */
  createInventoryItem: async (itemData) => {
    return api.post(API_ENDPOINTS.INVENTORY.CREATE, itemData);
  },

  /**
   * Update inventory item
   * @param {string} itemId - Inventory item ID
   * @param {object} itemData - Inventory item data to update
   * @returns {Promise} - Inventory item update response
   */
  updateInventoryItem: async (itemId, itemData) => {
    return api.put(API_ENDPOINTS.INVENTORY.UPDATE(itemId), itemData);
  },

  /**
   * Delete inventory item
   * @param {string} itemId - Inventory item ID
   * @returns {Promise} - Inventory item deletion response
   */
  deleteInventoryItem: async (itemId) => {
    return api.delete(API_ENDPOINTS.INVENTORY.DELETE(itemId));
  },

  /**
   * Adjust stock level
   * @param {string} itemId - Inventory item ID
   * @param {number} quantity - Quantity to adjust
   * @param {string} reason - Reason for adjustment
   * @returns {Promise} - Stock adjustment response
   */
  adjustStock: async (itemId, quantity, reason = '') => {
    return api.post(API_ENDPOINTS.INVENTORY.ADJUST_STOCK(itemId), {
      quantity,
      reason,
    });
  },

  /**
   * Get low stock items
   * @param {object} params - Query parameters
   * @returns {Promise} - Low stock items response
   */
  getLowStockItems: async (params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.LOW_STOCK, { params });
  },

  /**
   * Get inventory statistics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Inventory statistics response
   */
  getInventoryStatistics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.STATISTICS, { params: filters });
  },

  /**
   * Get expiring items
   * @param {object} params - Query parameters
   * @returns {Promise} - Expiring items response
   */
  getExpiringItems: async (params = {}) => {
    return api.get('/inventory/expiring', { params });
  },

  /**
   * Get out of stock items
   * @param {object} params - Query parameters
   * @returns {Promise} - Out of stock items response
   */
  getOutOfStockItems: async (params = {}) => {
    return api.get('/inventory/out-of-stock', { params });
  },

  /**
   * Get overstocked items
   * @param {object} params - Query parameters
   * @returns {Promise} - Overstocked items response
   */
  getOverstockedItems: async (params = {}) => {
    return api.get('/inventory/overstocked', { params });
  },

  /**
   * Search inventory items
   * @param {string} query - Search query
   * @param {object} params - Additional parameters
   * @returns {Promise} - Search results response
   */
  searchInventoryItems: async (query, params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.LIST, {
      params: { ...params, search: query },
    });
  },

  /**
   * Get inventory by category
   * @param {string} categoryId - Category ID
   * @param {object} params - Additional parameters
   * @returns {Promise} - Inventory by category response
   */
  getInventoryByCategory: async (categoryId, params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.LIST, {
      params: { ...params, categoryId },
    });
  },

  /**
   * Get inventory by supplier
   * @param {string} supplierId - Supplier ID
   * @param {object} params - Additional parameters
   * @returns {Promise} - Inventory by supplier response
   */
  getInventoryBySupplier: async (supplierId, params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.LIST, {
      params: { ...params, supplierId },
    });
  },

  /**
   * Bulk update inventory
   * @param {Array} items - Array of items to update
   * @returns {Promise} - Bulk update response
   */
  bulkUpdateInventory: async (items) => {
    return api.post('/inventory/bulk-update', { items });
  },

  /**
   * Bulk adjust stock
   * @param {Array} adjustments - Array of stock adjustments
   * @returns {Promise} - Bulk adjustment response
   */
  bulkAdjustStock: async (adjustments) => {
    return api.post('/inventory/bulk-adjust', { adjustments });
  },

  /**
   * Import inventory
   * @param {FormData} formData - Form data with import file
   * @returns {Promise} - Import response
   */
  importInventory: async (formData) => {
    return api.upload('/inventory/import', formData);
  },

  /**
   * Export inventory
   * @param {object} filters - Filter parameters
   * @param {string} format - Export format (csv, excel, pdf)
   * @returns {Promise} - Export response
   */
  exportInventory: async (filters = {}, format = 'csv') => {
    return api.get('/inventory/export', {
      params: { ...filters, format },
      responseType: 'blob',
    });
  },

  /**
   * Get inventory alerts
   * @param {object} params - Query parameters
   * @returns {Promise} - Inventory alerts response
   */
  getInventoryAlerts: async (params = {}) => {
    return api.get('/inventory/alerts', { params });
  },

  /**
   * Create inventory alert
   * @param {object} alertData - Alert data
   * @returns {Promise} - Alert creation response
   */
  createInventoryAlert: async (alertData) => {
    return api.post('/inventory/alerts', alertData);
  },

  /**
   * Update inventory alert
   * @param {string} alertId - Alert ID
   * @param {object} alertData - Alert data to update
   * @returns {Promise} - Alert update response
   */
  updateInventoryAlert: async (alertId, alertData) => {
    return api.put(`/inventory/alerts/${alertId}`, alertData);
  },

  /**
   * Delete inventory alert
   * @param {string} alertId - Alert ID
   * @returns {Promise} - Alert deletion response
   */
  deleteInventoryAlert: async (alertId) => {
    return api.delete(`/inventory/alerts/${alertId}`);
  },

  /**
   * Get inventory movements
   * @param {string} itemId - Inventory item ID
   * @param {object} params - Query parameters
   * @returns {Promise} - Inventory movements response
   */
  getInventoryMovements: async (itemId, params = {}) => {
    return api.get(`/inventory/${itemId}/movements`, { params });
  },

  /**
   * Get inventory history
   * @param {string} itemId - Inventory item ID
   * @param {object} params - Query parameters
   * @returns {Promise} - Inventory history response
   */
  getInventoryHistory: async (itemId, params = {}) => {
    return api.get(`/inventory/${itemId}/history`, { params });
  },

  /**
   * Get suppliers
   * @param {object} params - Query parameters
   * @returns {Promise} - Suppliers response
   */
  getSuppliers: async (params = {}) => {
    return api.get('/inventory/suppliers', { params });
  },

  /**
   * Get supplier by ID
   * @param {string} supplierId - Supplier ID
   * @returns {Promise} - Supplier details response
   */
  getSupplierById: async (supplierId) => {
    return api.get(`/inventory/suppliers/${supplierId}`);
  },

  /**
   * Create supplier
   * @param {object} supplierData - Supplier data
   * @returns {Promise} - Supplier creation response
   */
  createSupplier: async (supplierData) => {
    return api.post('/inventory/suppliers', supplierData);
  },

  /**
   * Update supplier
   * @param {string} supplierId - Supplier ID
   * @param {object} supplierData - Supplier data to update
   * @returns {Promise} - Supplier update response
   */
  updateSupplier: async (supplierId, supplierData) => {
    return api.put(`/inventory/suppliers/${supplierId}`, supplierData);
  },

  /**
   * Delete supplier
   * @param {string} supplierId - Supplier ID
   * @returns {Promise} - Supplier deletion response
   */
  deleteSupplier: async (supplierId) => {
    return api.delete(`/inventory/suppliers/${supplierId}`);
  },

  /**
   * Get purchase orders
   * @param {object} params - Query parameters
   * @returns {Promise} - Purchase orders response
   */
  getPurchaseOrders: async (params = {}) => {
    return api.get('/inventory/purchase-orders', { params });
  },

  /**
   * Get purchase order by ID
   * @param {string} orderId - Purchase order ID
   * @returns {Promise} - Purchase order details response
   */
  getPurchaseOrderById: async (orderId) => {
    return api.get(`/inventory/purchase-orders/${orderId}`);
  },

  /**
   * Create purchase order
   * @param {object} orderData - Purchase order data
   * @returns {Promise} - Purchase order creation response
   */
  createPurchaseOrder: async (orderData) => {
    return api.post('/inventory/purchase-orders', orderData);
  },

  /**
   * Update purchase order
   * @param {string} orderId - Purchase order ID
   * @param {object} orderData - Purchase order data to update
   * @returns {Promise} - Purchase order update response
   */
  updatePurchaseOrder: async (orderId, orderData) => {
    return api.put(`/inventory/purchase-orders/${orderId}`, orderData);
  },

  /**
   * Delete purchase order
   * @param {string} orderId - Purchase order ID
   * @returns {Promise} - Purchase order deletion response
   */
  deletePurchaseOrder: async (orderId) => {
    return api.delete(`/inventory/purchase-orders/${orderId}`);
  },

  /**
   * Receive purchase order
   * @param {string} orderId - Purchase order ID
   * @param {object} receiptData - Receipt data
   * @returns {Promise} - Receipt response
   */
  receivePurchaseOrder: async (orderId, receiptData) => {
    return api.post(`/inventory/purchase-orders/${orderId}/receive`, receiptData);
  },

  /**
   * Get inventory analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Inventory analytics response
   */
  getInventoryAnalytics: async (filters = {}) => {
    return api.get('/inventory/analytics', { params: filters });
  },

  /**
   * Get stock turnover
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Stock turnover response
   */
  getStockTurnover: async (filters = {}) => {
    return api.get('/inventory/stock-turnover', { params: filters });
  },

  /**
   * Get inventory valuation
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Inventory valuation response
   */
  getInventoryValuation: async (filters = {}) => {
    return api.get('/inventory/valuation', { params: filters });
  },

  /**
   * Get reorder suggestions
   * @param {object} params - Query parameters
   * @returns {Promise} - Reorder suggestions response
   */
  getReorderSuggestions: async (params = {}) => {
    return api.get('/inventory/reorder-suggestions', { params });
  },

  /**
   * Generate reorder report
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Reorder report response
   */
  generateReorderReport: async (filters = {}) => {
    return api.post('/inventory/reorder-report', { filters });
  },
};

export default inventoryService; 