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
  
  console.log(`[MENU API] ${method} ${endpoint}:`, JSON.stringify(logData, null, 2));
  
  // Log to a more detailed format for debugging
  if (error) {
    console.error(`[MENU API ERROR] ${method} ${endpoint}:`, error);
  } else if (response) {
    console.log(`[MENU API SUCCESS] ${method} ${endpoint}:`, response.message);
  }
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const method = options.method || 'GET';
  const startTime = Date.now();
  
  try {
    console.log(`[MENU API] Starting ${method} request to: ${endpoint}`);
    
    const token = await authService.getAuthToken();
    const url = apiConfig.getFullUrl(endpoint);
    
    console.log(`[MENU API] Full URL: ${url}`);
    console.log(`[MENU API] Token available: ${token ? 'Yes' : 'No'}`);
    console.log(`[MENU API] Headers:`, apiConfig.getAuthHeaders(token));
    
    const config = {
      method: 'GET',
      headers: apiConfig.getAuthHeaders(token),
      ...options,
    };

    console.log(`[MENU API] Request config:`, {
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

    console.log(`[MENU API] Response received in ${duration}ms:`, {
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
    
    // Enhanced error logging
    if (error.name === 'AbortError') {
      console.error(`[MENU API] Request timed out after ${duration}ms`);
      console.error(`[MENU API] Timeout error for: ${endpoint}`);
    } else if (error.message.includes('Network request failed')) {
      console.error(`[MENU API] Network error after ${duration}ms`);
      console.error(`[MENU API] Network error details:`, {
        endpoint,
        url: apiConfig.getFullUrl(endpoint),
        error: error.message,
        stack: error.stack
      });
      console.error(`[MENU API] Possible causes:`);
      console.error(`[MENU API] 1. Backend server not running on port 9090`);
      console.error(`[MENU API] 2. Wrong IP address in apiConfig.js`);
      console.error(`[MENU API] 3. Firewall blocking the connection`);
      console.error(`[MENU API] 4. Network connectivity issues`);
    } else {
      console.error(`[MENU API] Request failed after ${duration}ms:`, error);
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
  console.log(`[MENU API] Query params: ${queryString}`);
  return queryString;
};

// =====================================================
// MENU CATEGORIES
// =====================================================

export const menuCategoriesService = {
  // Get all categories
  getAllCategories: async (vendorId, filters = {}) => {
    console.log(`[MENU CATEGORIES] Getting all categories for vendor: ${vendorId}`);
    console.log(`[MENU CATEGORIES] Filters:`, filters);
    
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.CATEGORIES}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU CATEGORIES] Retrieved ${response.data?.content?.length || 0} categories`);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to get categories:`, error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (categoryId) => {
    console.log(`[MENU CATEGORIES] Getting category by ID: ${categoryId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU CATEGORIES] Retrieved category:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to get category ${categoryId}:`, error);
      throw error;
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    console.log(`[MENU CATEGORIES] Creating new category:`, categoryData);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORIES;
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
      console.log(`[MENU CATEGORIES] Category created successfully:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to create category:`, error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (categoryId, categoryData) => {
    console.log(`[MENU CATEGORIES] Updating category ${categoryId}:`, categoryData);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
      });
      console.log(`[MENU CATEGORIES] Category updated successfully:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to update category ${categoryId}:`, error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    console.log(`[MENU CATEGORIES] Deleting category: ${categoryId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'DELETE',
      });
      console.log(`[MENU CATEGORIES] Category deleted successfully: ${categoryId}`);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to delete category ${categoryId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// MENU ITEMS
// =====================================================

export const menuItemsService = {
  // Get all menu items
  getAllItems: async (vendorId, filters = {}) => {
    console.log(`[MENU ITEMS] Getting all items for vendor: ${vendorId}`);
    console.log(`[MENU ITEMS] Filters:`, filters);
    
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.ITEMS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ITEMS] Retrieved ${response.data?.content?.length || 0} items`);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to get items:`, error);
      throw error;
    }
  },

  // Get menu item by ID
  getItemById: async (itemId) => {
    console.log(`[MENU ITEMS] Getting item by ID: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_BY_ID(itemId);
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ITEMS] Retrieved item:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to get item ${itemId}:`, error);
      throw error;
    }
  },

  // Create menu item
  createItem: async (itemData) => {
    console.log(`[MENU ITEMS] Creating new item:`, {
      name: itemData.name,
      categoryId: itemData.categoryId,
      price: itemData.price,
      vendorId: itemData.vendorId
    });
    
    console.log(`[MENU ITEMS] Full request payload:`, JSON.stringify(itemData, null, 2));
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEMS;
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(itemData),
      });
      console.log(`[MENU ITEMS] Item created successfully:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to create item:`, error);
      throw error;
    }
  },

  // Update menu item
  updateItem: async (itemId, itemData) => {
    console.log(`[MENU ITEMS] Updating item ${itemId}:`, {
      name: itemData.name,
      categoryId: itemData.categoryId,
      price: itemData.price
    });
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_BY_ID(itemId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(itemData),
      });
      console.log(`[MENU ITEMS] Item updated successfully:`, response.data?.name);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to update item ${itemId}:`, error);
      throw error;
    }
  },

  // Delete menu item
  deleteItem: async (itemId) => {
    console.log(`[MENU ITEMS] Deleting item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_BY_ID(itemId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'DELETE',
      });
      console.log(`[MENU ITEMS] Item deleted successfully: ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to delete item ${itemId}:`, error);
      throw error;
    }
  },

  // Search menu items
  searchItems: async (vendorId, searchTerm, page = 0, size = 20) => {
    console.log(`[MENU ITEMS] Searching items for vendor: ${vendorId}, term: "${searchTerm}"`);
    
    const params = { vendorId, searchTerm, page, size };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.ITEM_SEARCH}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ITEMS] Search found ${response.data?.content?.length || 0} items`);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Search failed:`, error);
      throw error;
    }
  },
};

// =====================================================
// MENU ITEM IMAGES
// =====================================================

export const menuItemImagesService = {
  // Get images for menu item
  getImages: async (itemId) => {
    console.log(`[MENU IMAGES] Getting images for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_IMAGES(itemId);
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU IMAGES] Retrieved ${response.data?.length || 0} images for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU IMAGES] Failed to get images for item ${itemId}:`, error);
      throw error;
    }
  },

  // Upload image for menu item
  uploadImage: async (itemId, imageData) => {
    console.log(`[MENU IMAGES] Uploading image for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_IMAGES(itemId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: imageData, // Should be FormData for file upload
      });
      console.log(`[MENU IMAGES] Image uploaded successfully for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU IMAGES] Failed to upload image for item ${itemId}:`, error);
      throw error;
    }
  },

  // Set primary image
  setPrimaryImage: async (itemId, imageId) => {
    console.log(`[MENU IMAGES] Setting primary image ${imageId} for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.SET_PRIMARY_IMAGE(itemId, imageId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
      });
      console.log(`[MENU IMAGES] Primary image set successfully for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU IMAGES] Failed to set primary image for item ${itemId}:`, error);
      throw error;
    }
  },

  // Delete image
  deleteImage: async (itemId, imageId) => {
    console.log(`[MENU IMAGES] Deleting image ${imageId} for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_IMAGE_BY_ID(itemId, imageId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'DELETE',
      });
      console.log(`[MENU IMAGES] Image deleted successfully: ${imageId}`);
      return response;
    } catch (error) {
      console.error(`[MENU IMAGES] Failed to delete image ${imageId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// MENU ITEM AVAILABILITY
// =====================================================

export const menuItemAvailabilityService = {
  // Get availability for menu item
  getAvailability: async (itemId) => {
    console.log(`[MENU AVAILABILITY] Getting availability for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_AVAILABILITY(itemId);
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU AVAILABILITY] Retrieved availability for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU AVAILABILITY] Failed to get availability for item ${itemId}:`, error);
      throw error;
    }
  },

  // Update availability for menu item
  updateAvailability: async (itemId, availabilityData) => {
    console.log(`[MENU AVAILABILITY] Updating availability for item: ${itemId}`);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_AVAILABILITY(itemId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(availabilityData),
      });
      console.log(`[MENU AVAILABILITY] Availability updated successfully for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU AVAILABILITY] Failed to update availability for item ${itemId}:`, error);
      throw error;
    }
  },

  // Create special offer
  createSpecialOffer: async (itemId, offerData) => {
    console.log(`[MENU AVAILABILITY] Creating special offer for item: ${itemId}`, offerData);
    
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_SPECIAL_OFFERS(itemId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(offerData),
      });
      console.log(`[MENU AVAILABILITY] Special offer created successfully for item ${itemId}`);
      return response;
    } catch (error) {
      console.error(`[MENU AVAILABILITY] Failed to create special offer for item ${itemId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// MENU OVERVIEW & ANALYTICS
// =====================================================

export const menuOverviewService = {
  // Get menu overview
  getMenuOverview: async (vendorId) => {
    console.log(`[MENU OVERVIEW] Getting menu overview for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.OVERVIEW}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU OVERVIEW] Retrieved menu overview for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU OVERVIEW] Failed to get menu overview for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get featured items
  getFeaturedItems: async (vendorId, limit = 10) => {
    console.log(`[MENU OVERVIEW] Getting featured items for vendor: ${vendorId}, limit: ${limit}`);
    
    const params = { vendorId, limit };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.FEATURED}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU OVERVIEW] Retrieved ${response.data?.length || 0} featured items for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU OVERVIEW] Failed to get featured items for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get dietary preferences
  getDietaryPreferences: async (vendorId, preference, page = 0, size = 20) => {
    console.log(`[MENU OVERVIEW] Getting dietary preference items for vendor: ${vendorId}, preference: ${preference}`);
    
    const params = { vendorId, preference, page, size };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.DIETARY_PREFERENCES}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU OVERVIEW] Retrieved ${response.data?.content?.length || 0} ${preference} items for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU OVERVIEW] Failed to get dietary preference items for vendor ${vendorId}:`, error);
      throw error;
    }
  },
};

// =====================================================
// CONVENIENCE FUNCTIONS
// =====================================================

export const menuService = {
  // Get menu management data (categories + items)
  getMenuManagementData: async (vendorId) => {
    console.log(`[MENU SERVICE] Getting menu management data for vendor: ${vendorId}`);
    
    try {
      const [categoriesResponse, itemsResponse] = await Promise.all([
        menuCategoriesService.getAllCategories(vendorId),
        menuItemsService.getAllItems(vendorId)
      ]);

      const result = {
        categories: categoriesResponse.data?.content || [],
        menuItems: itemsResponse.data?.content || []
      };

      console.log(`[MENU SERVICE] Menu management data retrieved:`, {
        categoriesCount: result.categories.length,
        itemsCount: result.menuItems.length
      });

      return result;
    } catch (error) {
      console.error(`[MENU SERVICE] Failed to get menu management data for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get menu preview data (overview + featured items)
  getMenuPreviewData: async (vendorId) => {
    console.log(`[MENU SERVICE] Getting menu preview data for vendor: ${vendorId}`);
    
    try {
      const [overviewResponse, featuredResponse] = await Promise.all([
        menuOverviewService.getMenuOverview(vendorId),
        menuOverviewService.getFeaturedItems(vendorId)
      ]);

      const result = {
        overview: overviewResponse.data,
        featuredItems: featuredResponse.data || []
      };

      console.log(`[MENU SERVICE] Menu preview data retrieved:`, {
        overviewStats: result.overview ? Object.keys(result.overview).length : 0,
        featuredItemsCount: result.featuredItems.length
      });

      return result;
    } catch (error) {
      console.error(`[MENU SERVICE] Failed to get menu preview data for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Toggle item availability
  toggleItemAvailability: async (itemId, isAvailable) => {
    console.log(`[MENU SERVICE] Toggling availability for item ${itemId} to: ${isAvailable}`);
    
    try {
      const response = await menuItemAvailabilityService.updateAvailability(itemId, [
        {
          dayOfWeek: 1, // Monday
          isAvailable: isAvailable,
          availableFrom: "09:00:00",
          availableUntil: "22:00:00",
          maxQuantityPerDay: 50,
          currentQuantityAvailable: 45,
        }
      ]);

      console.log(`[MENU SERVICE] Item ${itemId} availability toggled successfully to: ${isAvailable}`);
      return response;
    } catch (error) {
      console.error(`[MENU SERVICE] Failed to toggle availability for item ${itemId}:`, error);
      throw error;
    }
  },
};

export default menuService; 