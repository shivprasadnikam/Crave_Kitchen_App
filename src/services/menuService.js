import { apiConfig } from '../config/apiConfig';
import { authService } from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Logging utility
const logApiCall = (method, endpoint, params = null, response = null, error = null) => {
  if (error) {
    console.error(`[MENU API ERROR] ${method} ${endpoint}:`, error);
  }
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const method = options.method || 'GET';
  const startTime = Date.now();
  
  try {
    const token = await authService.getAuthToken();
    const url = apiConfig.getFullUrl(endpoint);
    
    const config = {
      method: options.method || 'GET',
      headers: apiConfig.getAuthHeaders(token),
      ...options,
    };

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401) {
        try {
          const refreshToken = await AsyncStorage.getItem('refresh_token');
          if (refreshToken) {
            const refreshResponse = await authService.refreshToken(refreshToken);
            if (refreshResponse.token) {
              // Store new tokens
              await AsyncStorage.setItem('auth_token', refreshResponse.token);
              await AsyncStorage.setItem('refresh_token', refreshResponse.refreshToken);
              
              // Retry the original request with new token
              const newToken = refreshResponse.token;
              const retryConfig = {
                ...config,
                headers: apiConfig.getAuthHeaders(newToken),
              };
              
              const retryResponse = await fetch(url, retryConfig);
              const retryData = await retryResponse.json();
              
              if (retryResponse.ok) {
                return retryData;
              }
            }
          }
        } catch (refreshError) {
          console.error(`[MENU API] Token refresh failed:`, refreshError);
          // Continue to throw the original error
        }
      }
      
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
      console.error(`[MENU API] Request timed out for: ${endpoint}`);
    } else if (error.message.includes('Network request failed')) {
      console.error(`[MENU API] Network error for: ${endpoint}`);
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
  return queryParams.toString();
};

// =====================================================
// MENU CATEGORIES
// =====================================================

export const menuCategoriesService = {
  // Get all categories
  getAllCategories: async (vendorId, filters = {}) => {
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.CATEGORIES}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to get categories:`, error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (categoryId) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint);
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to get category ${categoryId}:`, error);
      throw error;
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORIES;
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to create category:`, error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (categoryId, categoryData) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
      });
      return response;
    } catch (error) {
      console.error(`[MENU CATEGORIES] Failed to update category ${categoryId}:`, error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.CATEGORY_BY_ID(categoryId);
    
    try {
      const response = await apiCall(endpoint, {
        method: 'DELETE',
      });
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
    const params = { vendorId, ...filters };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.ITEMS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to get items:`, error);
      throw error;
    }
  },

  // Get menu item by ID
  getItemById: async (itemId) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEM_BY_ID(itemId);
    
    try {
      const response = await apiCall(endpoint);
      return response;
    } catch (error) {
      console.error(`[MENU ITEMS] Failed to get item ${itemId}:`, error);
      throw error;
    }
  },

  // Create menu item
  createItem: async (itemData) => {
    const endpoint = apiConfig.ENDPOINTS.MENU.ITEMS;
    
    try {
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(itemData),
      });
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

export const menuAnalyticsService = {
  // Get menu analytics
  getMenuAnalytics: async (vendorId) => {
    console.log(`[MENU ANALYTICS] Getting menu analytics for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.ANALYTICS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ANALYTICS] Retrieved menu analytics for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU ANALYTICS] Failed to get menu analytics for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get top performing items
  getTopPerformingItems: async (vendorId, limit = 10) => {
    console.log(`[MENU ANALYTICS] Getting top performing items for vendor: ${vendorId}, limit: ${limit}`);
    
    const params = { vendorId, limit };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.TOP_PERFORMING_ITEMS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ANALYTICS] Retrieved ${response.data?.length || 0} top performing items for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU ANALYTICS] Failed to get top performing items for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get low performing items
  getLowPerformingItems: async (vendorId, limit = 10) => {
    console.log(`[MENU ANALYTICS] Getting low performing items for vendor: ${vendorId}, limit: ${limit}`);
    
    const params = { vendorId, limit };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.LOW_PERFORMING_ITEMS}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ANALYTICS] Retrieved ${response.data?.length || 0} low performing items for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU ANALYTICS] Failed to get low performing items for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // Get category performance
  getCategoryPerformance: async (vendorId) => {
    console.log(`[MENU ANALYTICS] Getting category performance for vendor: ${vendorId}`);
    
    const params = { vendorId };
    const queryString = buildQueryParams(params);
    const endpoint = `${apiConfig.ENDPOINTS.MENU.CATEGORY_PERFORMANCE}?${queryString}`;
    
    try {
      const response = await apiCall(endpoint);
      console.log(`[MENU ANALYTICS] Retrieved category performance for vendor ${vendorId}`);
      return response;
    } catch (error) {
      console.error(`[MENU ANALYTICS] Failed to get category performance for vendor ${vendorId}:`, error);
      throw error;
    }
  },
};

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
      // Try to get both overview and featured items, but handle failures gracefully
      let overviewData = null;
      let featuredItems = [];

      try {
        const overviewResponse = await menuOverviewService.getMenuOverview(vendorId);
        overviewData = overviewResponse.data;
        console.log(`[MENU SERVICE] Overview data retrieved successfully`);
      } catch (overviewError) {
        console.warn(`[MENU SERVICE] Failed to get overview data:`, overviewError.message);
        // Provide fallback overview data
        overviewData = {
          totalItems: 0,
          availableItems: 0,
          totalCategories: 0,
          averagePrice: 0
        };
      }

      try {
        const featuredResponse = await menuOverviewService.getFeaturedItems(vendorId);
        featuredItems = featuredResponse.data || [];
        console.log(`[MENU SERVICE] Featured items retrieved successfully: ${featuredItems.length} items`);
      } catch (featuredError) {
        console.warn(`[MENU SERVICE] Failed to get featured items:`, featuredError.message);
        // Provide empty featured items array as fallback
        featuredItems = [];
      }

      const result = {
        overview: overviewData,
        featuredItems: featuredItems
      };

      console.log(`[MENU SERVICE] Menu preview data retrieved:`, {
        overviewStats: result.overview ? Object.keys(result.overview).length : 0,
        featuredItemsCount: result.featuredItems.length
      });

      return result;
    } catch (error) {
      console.error(`[MENU SERVICE] Failed to get menu preview data for vendor ${vendorId}:`, error);
      // Return fallback data instead of throwing
      return {
        overview: {
          totalItems: 0,
          availableItems: 0,
          totalCategories: 0,
          averagePrice: 0
        },
        featuredItems: []
      };
    }
  },

  // Get menu analytics data
  getMenuAnalyticsData: async (vendorId) => {
    console.log(`[MENU SERVICE] Getting menu analytics data for vendor: ${vendorId}`);
    
    try {
      const [analyticsResponse, topItemsResponse, lowItemsResponse, categoryResponse] = await Promise.all([
        menuAnalyticsService.getMenuAnalytics(vendorId),
        menuAnalyticsService.getTopPerformingItems(vendorId, 5),
        menuAnalyticsService.getLowPerformingItems(vendorId, 5),
        menuAnalyticsService.getCategoryPerformance(vendorId)
      ]);

      const result = {
        ...analyticsResponse.data,
        topPerformingItems: topItemsResponse.data || [],
        lowPerformingItems: lowItemsResponse.data || [],
        categoryPerformance: categoryResponse.data || []
      };

      console.log(`[MENU SERVICE] Menu analytics data retrieved:`, {
        topItemsCount: result.topPerformingItems.length,
        lowItemsCount: result.lowPerformingItems.length,
        categoryCount: result.categoryPerformance.length
      });

      return result;
    } catch (error) {
      console.error(`[MENU SERVICE] Failed to get menu analytics data for vendor ${vendorId}:`, error);
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