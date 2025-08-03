// API Configuration for Crave Kitchen App
// Update these values based on your environment

const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

// Current environment - change this based on your deployment
const CURRENT_ENV = ENV.DEVELOPMENT;

const API_CONFIGS = {
  [ENV.DEVELOPMENT]: {
    BASE_URL: 'http://192.168.1.3:9090', 
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  [ENV.STAGING]: {
    BASE_URL: 'https://staging-api.cravekitchen.com',
    TIMEOUT: 15000,
    RETRY_ATTEMPTS: 3,
  },
  [ENV.PRODUCTION]: {
    BASE_URL: 'https://api.cravekitchen.com',
    TIMEOUT: 20000,
    RETRY_ATTEMPTS: 2,
  },
};

// API Endpoints
const ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    VERIFY_EMAIL: '/api/auth/verify-email',
  },
  
  // Vendor Management
  VENDOR: {
    PROFILE: '/api/vendor/profile',
    UPDATE_PROFILE: '/api/vendor/profile',
    BUSINESS_HOURS: '/api/vendor/business-hours',
    UPDATE_BUSINESS_HOURS: '/api/vendor/business-hours',
  },
  
  // Menu Management - Updated with comprehensive endpoints
  MENU: {
    // Categories
    CATEGORIES: '/api/menu/categories',
    CATEGORY_BY_ID: (id) => `/api/menu/categories/${id}`,
    
    // Menu Items
    ITEMS: '/api/menu/items',
    ITEM_BY_ID: (id) => `/api/menu/items/${id}`,
    ITEM_SEARCH: '/api/menu/items/search',
    
    // Menu Item Images
    ITEM_IMAGES: (itemId) => `/api/menu/items/${itemId}/images`,
    ITEM_IMAGE_BY_ID: (itemId, imageId) => `/api/menu/items/${itemId}/images/${imageId}`,
    SET_PRIMARY_IMAGE: (itemId, imageId) => `/api/menu/items/${itemId}/images/${imageId}/primary`,
    
    // Menu Item Availability
    ITEM_AVAILABILITY: (itemId) => `/api/menu/items/${itemId}/availability`,
    ITEM_SPECIAL_OFFERS: (itemId) => `/api/menu/items/${itemId}/special-offers`,
    
    // Menu Overview & Analytics
    OVERVIEW: '/api/menu/overview',
    FEATURED: '/api/menu/featured',
    DIETARY_PREFERENCES: '/api/menu/dietary-preferences',
    
    // Menu Analytics
    ANALYTICS: '/api/menu/analytics',
    TOP_PERFORMING_ITEMS: '/api/menu/analytics/top-performing',
    LOW_PERFORMING_ITEMS: '/api/menu/analytics/low-performing',
    CATEGORY_PERFORMANCE: '/api/menu/analytics/category-performance',
  },
  
  // Orders
  ORDERS: {
    LIST: '/api/orders',
    DETAIL: '/api/orders',
    UPDATE_STATUS: '/api/orders',
    HISTORY: '/api/orders/history',
  },
  
  // Analytics
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    REVENUE: '/api/analytics/revenue',
    ORDERS: '/api/analytics/orders',
    POPULAR_ITEMS: '/api/analytics/popular-items',
    REVENUE_OVERVIEW: '/api/analytics/revenue/overview',
    REVENUE_TRENDS: '/api/analytics/revenue/trends',
    TOP_PERFORMING_ITEMS: '/api/analytics/revenue/top-items',
    ORDER_ANALYTICS: '/api/analytics/orders/analytics',
    ORDER_TRENDS: '/api/analytics/orders/trends',
  },
  
  // Inventory
  INVENTORY: {
    ITEMS: '/api/inventory/items',
    ADD_ITEM: '/api/inventory/items',
    UPDATE_ITEM: '/api/inventory/items',
    DELETE_ITEM: '/api/inventory/items',
    LOW_STOCK: '/api/inventory/low-stock',
  },
  
  // Finances
  FINANCES: {
    PAYOUTS: '/api/finances/payouts',
    PAYMENT_HISTORY: '/api/finances/payment-history',
    REPORTS: '/api/finances/reports',
  },
};

// Default headers
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'CraveKitchen-Vendor-App/1.0',
};

// Get current API configuration
const getCurrentConfig = () => {
  return API_CONFIGS[CURRENT_ENV];
};

// Get full URL for an endpoint
const getFullUrl = (endpoint) => {
  const config = getCurrentConfig();
  return `${config.BASE_URL}${endpoint}`;
};

// Get headers with authentication token
const getAuthHeaders = (token = null) => {
  const headers = { ...DEFAULT_HEADERS };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const apiConfig = {
  // Configuration
  getCurrentConfig,
  getFullUrl,
  getAuthHeaders,
  
  // Environment
  ENV,
  CURRENT_ENV,
  
  // Endpoints
  ENDPOINTS,
  
  // Headers
  DEFAULT_HEADERS,
  
  // Helper methods
  isDevelopment: () => CURRENT_ENV === ENV.DEVELOPMENT,
  isStaging: () => CURRENT_ENV === ENV.STAGING,
  isProduction: () => CURRENT_ENV === ENV.PRODUCTION,
};

export default apiConfig; 