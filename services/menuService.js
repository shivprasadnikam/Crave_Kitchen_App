import { api, API_ENDPOINTS } from './api';

/**
 * Menu Service
 * Handles all menu-related API calls
 */
export const menuService = {
  /**
   * Get menu items with filters and pagination
   * @param {object} params - Query parameters
   * @returns {Promise} - Menu items response
   */
  getMenuItems: async (params = {}) => {
    return api.get(API_ENDPOINTS.MENU.ITEMS, { params });
  },

  /**
   * Get menu item by ID
   * @param {string} itemId - Menu item ID
   * @returns {Promise} - Menu item details response
   */
  getMenuItemById: async (itemId) => {
    return api.get(API_ENDPOINTS.MENU.ITEM_DETAIL(itemId));
  },

  /**
   * Create new menu item
   * @param {object} itemData - Menu item data
   * @returns {Promise} - Menu item creation response
   */
  createMenuItem: async (itemData) => {
    return api.post(API_ENDPOINTS.MENU.CREATE_ITEM, itemData);
  },

  /**
   * Update menu item
   * @param {string} itemId - Menu item ID
   * @param {object} itemData - Menu item data to update
   * @returns {Promise} - Menu item update response
   */
  updateMenuItem: async (itemId, itemData) => {
    return api.put(API_ENDPOINTS.MENU.UPDATE_ITEM(itemId), itemData);
  },

  /**
   * Delete menu item
   * @param {string} itemId - Menu item ID
   * @returns {Promise} - Menu item deletion response
   */
  deleteMenuItem: async (itemId) => {
    return api.delete(API_ENDPOINTS.MENU.DELETE_ITEM(itemId));
  },

  /**
   * Toggle menu item availability
   * @param {string} itemId - Menu item ID
   * @param {boolean} isAvailable - Availability status
   * @returns {Promise} - Availability toggle response
   */
  toggleItemAvailability: async (itemId, isAvailable) => {
    return api.patch(API_ENDPOINTS.MENU.TOGGLE_AVAILABILITY(itemId), {
      isAvailable,
    });
  },

  /**
   * Update menu item price
   * @param {string} itemId - Menu item ID
   * @param {number} price - New price
   * @returns {Promise} - Price update response
   */
  updateItemPrice: async (itemId, price) => {
    return api.patch(API_ENDPOINTS.MENU.UPDATE_PRICE(itemId), {
      price,
    });
  },

  /**
   * Reorder menu items
   * @param {Array} itemOrder - Array of item IDs in new order
   * @returns {Promise} - Reorder response
   */
  reorderItems: async (itemOrder) => {
    return api.post(API_ENDPOINTS.MENU.REORDER, { itemOrder });
  },

  /**
   * Get menu categories
   * @param {object} params - Query parameters
   * @returns {Promise} - Categories response
   */
  getCategories: async (params = {}) => {
    return api.get(API_ENDPOINTS.MENU.CATEGORIES, { params });
  },

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise} - Category details response
   */
  getCategoryById: async (categoryId) => {
    return api.get(API_ENDPOINTS.MENU.CATEGORY_DETAIL(categoryId));
  },

  /**
   * Create new category
   * @param {object} categoryData - Category data
   * @returns {Promise} - Category creation response
   */
  createCategory: async (categoryData) => {
    return api.post(API_ENDPOINTS.MENU.CREATE_CATEGORY, categoryData);
  },

  /**
   * Update category
   * @param {string} categoryId - Category ID
   * @param {object} categoryData - Category data to update
   * @returns {Promise} - Category update response
   */
  updateCategory: async (categoryId, categoryData) => {
    return api.put(API_ENDPOINTS.MENU.UPDATE_CATEGORY(categoryId), categoryData);
  },

  /**
   * Delete category
   * @param {string} categoryId - Category ID
   * @returns {Promise} - Category deletion response
   */
  deleteCategory: async (categoryId) => {
    return api.delete(API_ENDPOINTS.MENU.DELETE_CATEGORY(categoryId));
  },

  /**
   * Get menu statistics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Menu statistics response
   */
  getMenuStatistics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.MENU.STATISTICS, { params: filters });
  },

  /**
   * Get menu items by category
   * @param {string} categoryId - Category ID
   * @param {object} params - Additional parameters
   * @returns {Promise} - Menu items by category response
   */
  getItemsByCategory: async (categoryId, params = {}) => {
    return api.get(API_ENDPOINTS.MENU.ITEMS, {
      params: { ...params, categoryId },
    });
  },

  /**
   * Search menu items
   * @param {string} query - Search query
   * @param {object} params - Additional parameters
   * @returns {Promise} - Search results response
   */
  searchMenuItems: async (query, params = {}) => {
    return api.get(API_ENDPOINTS.MENU.ITEMS, {
      params: { ...params, search: query },
    });
  },

  /**
   * Get popular menu items
   * @param {object} params - Query parameters
   * @returns {Promise} - Popular items response
   */
  getPopularItems: async (params = {}) => {
    return api.get('/menu/items/popular', { params });
  },

  /**
   * Get featured menu items
   * @param {object} params - Query parameters
   * @returns {Promise} - Featured items response
   */
  getFeaturedItems: async (params = {}) => {
    return api.get('/menu/items/featured', { params });
  },

  /**
   * Upload menu item image
   * @param {string} itemId - Menu item ID
   * @param {FormData} formData - Form data with image
   * @returns {Promise} - Image upload response
   */
  uploadItemImage: async (itemId, formData) => {
    return api.upload(`/menu/items/${itemId}/image`, formData);
  },

  /**
   * Delete menu item image
   * @param {string} itemId - Menu item ID
   * @returns {Promise} - Image deletion response
   */
  deleteItemImage: async (itemId) => {
    return api.delete(`/menu/items/${itemId}/image`);
  },

  /**
   * Bulk update menu items
   * @param {Array} items - Array of items to update
   * @returns {Promise} - Bulk update response
   */
  bulkUpdateItems: async (items) => {
    return api.post('/menu/items/bulk-update', { items });
  },

  /**
   * Bulk delete menu items
   * @param {Array} itemIds - Array of item IDs to delete
   * @returns {Promise} - Bulk deletion response
   */
  bulkDeleteItems: async (itemIds) => {
    return api.post('/menu/items/bulk-delete', { itemIds });
  },

  /**
   * Import menu items
   * @param {FormData} formData - Form data with import file
   * @returns {Promise} - Import response
   */
  importMenuItems: async (formData) => {
    return api.upload('/menu/items/import', formData);
  },

  /**
   * Export menu items
   * @param {object} filters - Filter parameters
   * @param {string} format - Export format (csv, excel, pdf)
   * @returns {Promise} - Export response
   */
  exportMenuItems: async (filters = {}, format = 'csv') => {
    return api.get('/menu/items/export', {
      params: { ...filters, format },
      responseType: 'blob',
    });
  },

  /**
   * Get menu item analytics
   * @param {string} itemId - Menu item ID
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Item analytics response
   */
  getItemAnalytics: async (itemId, filters = {}) => {
    return api.get(`/menu/items/${itemId}/analytics`, { params: filters });
  },

  /**
   * Get menu performance metrics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Performance metrics response
   */
  getMenuPerformanceMetrics: async (filters = {}) => {
    return api.get('/menu/performance', { params: filters });
  },

  /**
   * Get menu trends
   * @param {string} period - Time period
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Menu trends response
   */
  getMenuTrends: async (period = 'week', filters = {}) => {
    return api.get('/menu/trends', {
      params: { ...filters, period },
    });
  },

  /**
   * Get low performing items
   * @param {object} params - Query parameters
   * @returns {Promise} - Low performing items response
   */
  getLowPerformingItems: async (params = {}) => {
    return api.get('/menu/items/low-performing', { params });
  },

  /**
   * Get out of stock items
   * @param {object} params - Query parameters
   * @returns {Promise} - Out of stock items response
   */
  getOutOfStockItems: async (params = {}) => {
    return api.get('/menu/items/out-of-stock', { params });
  },

  /**
   * Get menu item variants
   * @param {string} itemId - Menu item ID
   * @returns {Promise} - Item variants response
   */
  getItemVariants: async (itemId) => {
    return api.get(`/menu/items/${itemId}/variants`);
  },

  /**
   * Add menu item variant
   * @param {string} itemId - Menu item ID
   * @param {object} variantData - Variant data
   * @returns {Promise} - Variant addition response
   */
  addItemVariant: async (itemId, variantData) => {
    return api.post(`/menu/items/${itemId}/variants`, variantData);
  },

  /**
   * Update menu item variant
   * @param {string} itemId - Menu item ID
   * @param {string} variantId - Variant ID
   * @param {object} variantData - Variant data to update
   * @returns {Promise} - Variant update response
   */
  updateItemVariant: async (itemId, variantId, variantData) => {
    return api.put(`/menu/items/${itemId}/variants/${variantId}`, variantData);
  },

  /**
   * Delete menu item variant
   * @param {string} itemId - Menu item ID
   * @param {string} variantId - Variant ID
   * @returns {Promise} - Variant deletion response
   */
  deleteItemVariant: async (itemId, variantId) => {
    return api.delete(`/menu/items/${itemId}/variants/${variantId}`);
  },

  /**
   * Get menu item add-ons
   * @param {string} itemId - Menu item ID
   * @returns {Promise} - Item add-ons response
   */
  getItemAddOns: async (itemId) => {
    return api.get(`/menu/items/${itemId}/add-ons`);
  },

  /**
   * Add menu item add-on
   * @param {string} itemId - Menu item ID
   * @param {object} addOnData - Add-on data
   * @returns {Promise} - Add-on addition response
   */
  addItemAddOn: async (itemId, addOnData) => {
    return api.post(`/menu/items/${itemId}/add-ons`, addOnData);
  },

  /**
   * Update menu item add-on
   * @param {string} itemId - Menu item ID
   * @param {string} addOnId - Add-on ID
   * @param {object} addOnData - Add-on data to update
   * @returns {Promise} - Add-on update response
   */
  updateItemAddOn: async (itemId, addOnId, addOnData) => {
    return api.put(`/menu/items/${itemId}/add-ons/${addOnId}`, addOnData);
  },

  /**
   * Delete menu item add-on
   * @param {string} itemId - Menu item ID
   * @param {string} addOnId - Add-on ID
   * @returns {Promise} - Add-on deletion response
   */
  deleteItemAddOn: async (itemId, addOnId) => {
    return api.delete(`/menu/items/${itemId}/add-ons/${addOnId}`);
  },
};

export default menuService; 