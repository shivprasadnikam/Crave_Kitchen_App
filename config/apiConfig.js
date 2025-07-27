import { APP_CONFIG } from './appConfig';

export const API_CONFIG = {
  // Base Configuration
  BASE_URL: APP_CONFIG.API_BASE_URL,
  TIMEOUT: APP_CONFIG.API_TIMEOUT,
  MAX_RETRIES: APP_CONFIG.API_RETRY_ATTEMPTS,
  RETRY_DELAY: APP_CONFIG.API_RETRY_DELAY,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-App-Version': APP_CONFIG.APP_VERSION,
    'X-Platform': 'mobile',
    'X-Client': 'vendor-app',
  },
  
  // Authentication Endpoints
  AUTH: {
    LOGIN: '/auth/vendor/login',
    REGISTER: '/auth/vendor/register',
    LOGOUT: '/auth/vendor/logout',
    REFRESH_TOKEN: '/auth/vendor/refresh',
    FORGOT_PASSWORD: '/auth/vendor/forgot-password',
    RESET_PASSWORD: '/auth/vendor/reset-password',
    VERIFY_EMAIL: '/auth/vendor/verify-email',
    CHANGE_PASSWORD: '/auth/vendor/change-password',
    VERIFY_2FA: '/auth/vendor/verify-2fa',
    SETUP_2FA: '/auth/vendor/setup-2fa',
    DISABLE_2FA: '/auth/vendor/disable-2fa',
    LOGIN_HISTORY: '/auth/vendor/login-history',
  },
  
  // Vendor Profile Endpoints
  VENDOR: {
    PROFILE: '/vendor/profile',
    UPDATE_PROFILE: '/vendor/profile/update',
    UPLOAD_AVATAR: '/vendor/profile/avatar',
    RESTAURANT_INFO: '/vendor/restaurant',
    UPDATE_RESTAURANT: '/vendor/restaurant/update',
    OPERATING_HOURS: '/vendor/operating-hours',
    UPDATE_HOURS: '/vendor/operating-hours/update',
    DELIVERY_ZONES: '/vendor/delivery-zones',
    UPDATE_DELIVERY_ZONES: '/vendor/delivery-zones/update',
    STAFF_MEMBERS: '/vendor/staff',
    STAFF_MEMBER: (id) => `/vendor/staff/${id}`,
    CREATE_STAFF: '/vendor/staff',
    UPDATE_STAFF: (id) => `/vendor/staff/${id}`,
    DELETE_STAFF: (id) => `/vendor/staff/${id}`,
    STAFF_SCHEDULE: (id) => `/vendor/staff/${id}/schedule`,
    UPDATE_STAFF_SCHEDULE: (id) => `/vendor/staff/${id}/schedule`,
  },
  
  // Orders Endpoints
  ORDERS: {
    LIST: '/vendor/orders',
    DETAIL: (id) => `/vendor/orders/${id}`,
    UPDATE_STATUS: (id) => `/vendor/orders/${id}/status`,
    ACCEPT_ORDER: (id) => `/vendor/orders/${id}/accept`,
    REJECT_ORDER: (id) => `/vendor/orders/${id}/reject`,
    MARK_READY: (id) => `/vendor/orders/${id}/ready`,
    MARK_PREPARING: (id) => `/vendor/orders/${id}/preparing`,
    MARK_DELIVERED: (id) => `/vendor/orders/${id}/delivered`,
    CANCEL_ORDER: (id) => `/vendor/orders/${id}/cancel`,
    REFUND_ORDER: (id) => `/vendor/orders/${id}/refund`,
    ADD_NOTES: (id) => `/vendor/orders/${id}/notes`,
    UPDATE_NOTES: (id) => `/vendor/orders/${id}/notes`,
    HISTORY: '/vendor/orders/history',
    PENDING: '/vendor/orders/pending',
    COMPLETED: '/vendor/orders/completed',
    CANCELLED: '/vendor/orders/cancelled',
    STATISTICS: '/vendor/orders/statistics',
    EXPORT: '/vendor/orders/export',
    BULK_UPDATE: '/vendor/orders/bulk-update',
    TIMELINE: (id) => `/vendor/orders/${id}/timeline`,
  },
  
  // Menu Management Endpoints
  MENU: {
    CATEGORIES: '/vendor/menu/categories',
    CREATE_CATEGORY: '/vendor/menu/categories',
    UPDATE_CATEGORY: (id) => `/vendor/menu/categories/${id}`,
    DELETE_CATEGORY: (id) => `/vendor/menu/categories/${id}`,
    REORDER_CATEGORIES: '/vendor/menu/categories/reorder',
    ITEMS: '/vendor/menu/items',
    CREATE_ITEM: '/vendor/menu/items',
    UPDATE_ITEM: (id) => `/vendor/menu/items/${id}`,
    DELETE_ITEM: (id) => `/vendor/menu/items/${id}`,
    UPLOAD_IMAGE: (id) => `/vendor/menu/items/${id}/image`,
    TOGGLE_AVAILABILITY: (id) => `/vendor/menu/items/${id}/availability`,
    UPDATE_PRICE: (id) => `/vendor/menu/items/${id}/price`,
    BULK_UPDATE: '/vendor/menu/items/bulk-update',
    REORDER_ITEMS: '/vendor/menu/items/reorder',
    DUPLICATE_ITEM: (id) => `/vendor/menu/items/${id}/duplicate`,
    CUSTOMIZATIONS: (id) => `/vendor/menu/items/${id}/customizations`,
    ADD_ONS: (id) => `/vendor/menu/items/${id}/add-ons`,
    SIDES: (id) => `/vendor/menu/items/${id}/sides`,
    DRINK_OPTIONS: (id) => `/vendor/menu/items/${id}/drinks`,
    EXPORT: '/vendor/menu/export',
    IMPORT: '/vendor/menu/import',
    STATISTICS: '/vendor/menu/statistics',
  },
  
  // Analytics Endpoints
  ANALYTICS: {
    DASHBOARD: '/vendor/analytics/dashboard',
    REVENUE: '/vendor/analytics/revenue',
    ORDERS: '/vendor/analytics/orders',
    POPULAR_ITEMS: '/vendor/analytics/popular-items',
    CUSTOMER_INSIGHTS: '/vendor/analytics/customers',
    SALES_REPORT: '/vendor/analytics/sales-report',
    EXPORT_DATA: '/vendor/analytics/export',
    REAL_TIME: '/vendor/analytics/real-time',
    TRENDS: '/vendor/analytics/trends',
    COMPARATIVE: '/vendor/analytics/comparative',
    PERFORMANCE: '/vendor/analytics/performance',
    REPORTS: '/vendor/analytics/reports',
    CREATE_REPORT: '/vendor/analytics/reports',
    UPDATE_REPORT: (id) => `/vendor/analytics/reports/${id}`,
    DELETE_REPORT: (id) => `/vendor/analytics/reports/${id}`,
    SCHEDULE_REPORT: (id) => `/vendor/analytics/reports/${id}/schedule`,
  },
  
  // Inventory Endpoints
  INVENTORY: {
    ITEMS: '/vendor/inventory/items',
    CREATE_ITEM: '/vendor/inventory/items',
    UPDATE_ITEM: (id) => `/vendor/inventory/items/${id}`,
    DELETE_ITEM: (id) => `/vendor/inventory/items/${id}`,
    LOW_STOCK: '/vendor/inventory/low-stock',
    STOCK_ALERTS: '/vendor/inventory/alerts',
    UPDATE_STOCK: (id) => `/vendor/inventory/items/${id}/stock`,
    BULK_UPDATE_STOCK: '/vendor/inventory/bulk-update',
    ADJUST_STOCK: (id) => `/vendor/inventory/items/${id}/adjust`,
    STOCK_HISTORY: (id) => `/vendor/inventory/items/${id}/history`,
    EXPIRY_ALERTS: '/vendor/inventory/expiry-alerts',
    WASTE_TRACKING: '/vendor/inventory/waste',
    SUPPLIERS: '/vendor/inventory/suppliers',
    CREATE_SUPPLIER: '/vendor/inventory/suppliers',
    UPDATE_SUPPLIER: (id) => `/vendor/inventory/suppliers/${id}`,
    DELETE_SUPPLIER: (id) => `/vendor/inventory/suppliers/${id}`,
    PURCHASE_ORDERS: '/vendor/inventory/purchase-orders',
    CREATE_PURCHASE_ORDER: '/vendor/inventory/purchase-orders',
    UPDATE_PURCHASE_ORDER: (id) => `/vendor/inventory/purchase-orders/${id}`,
    DELETE_PURCHASE_ORDER: (id) => `/vendor/inventory/purchase-orders/${id}`,
    STATISTICS: '/vendor/inventory/statistics',
    EXPORT: '/vendor/inventory/export',
  },
  
  // Financial Endpoints
  FINANCES: {
    REVENUE: '/vendor/finances/revenue',
    PAYMENTS: '/vendor/finances/payments',
    PAYOUTS: '/vendor/finances/payouts',
    TRANSACTIONS: '/vendor/finances/transactions',
    REPORTS: '/vendor/finances/reports',
    WITHDRAW: '/vendor/finances/withdraw',
    BANK_ACCOUNTS: '/vendor/finances/bank-accounts',
    ADD_BANK_ACCOUNT: '/vendor/finances/bank-accounts',
    UPDATE_BANK_ACCOUNT: (id) => `/vendor/finances/bank-accounts/${id}`,
    DELETE_BANK_ACCOUNT: (id) => `/vendor/finances/bank-accounts/${id}`,
    TAX_REPORTS: '/vendor/finances/tax-reports',
    EXPENSE_TRACKING: '/vendor/finances/expenses',
    CREATE_EXPENSE: '/vendor/finances/expenses',
    UPDATE_EXPENSE: (id) => `/vendor/finances/expenses/${id}`,
    DELETE_EXPENSE: (id) => `/vendor/finances/expenses/${id}`,
    INVOICES: '/vendor/finances/invoices',
    CREATE_INVOICE: '/vendor/finances/invoices',
    UPDATE_INVOICE: (id) => `/vendor/finances/invoices/${id}`,
    DELETE_INVOICE: (id) => `/vendor/finances/invoices/${id}`,
    STATISTICS: '/vendor/finances/statistics',
    EXPORT: '/vendor/finances/export',
  },
  
  // Notifications Endpoints
  NOTIFICATIONS: {
    LIST: '/vendor/notifications',
    DETAIL: (id) => `/vendor/notifications/${id}`,
    MARK_READ: (id) => `/vendor/notifications/${id}/read`,
    MARK_ALL_READ: '/vendor/notifications/mark-all-read',
    DELETE: (id) => `/vendor/notifications/${id}`,
    DELETE_ALL: '/vendor/notifications/delete-all',
    SETTINGS: '/vendor/notifications/settings',
    UPDATE_SETTINGS: '/vendor/notifications/settings/update',
    TEST_PUSH: '/vendor/notifications/test-push',
    TEST_EMAIL: '/vendor/notifications/test-email',
    TEST_SMS: '/vendor/notifications/test-sms',
    SUBSCRIPTIONS: '/vendor/notifications/subscriptions',
    UPDATE_SUBSCRIPTIONS: '/vendor/notifications/subscriptions/update',
  },
  
  // Support Endpoints
  SUPPORT: {
    TICKETS: '/vendor/support/tickets',
    CREATE_TICKET: '/vendor/support/tickets',
    TICKET_DETAIL: (id) => `/vendor/support/tickets/${id}`,
    UPDATE_TICKET: (id) => `/vendor/support/tickets/${id}`,
    CLOSE_TICKET: (id) => `/vendor/support/tickets/${id}/close`,
    ADD_COMMENT: (id) => `/vendor/support/tickets/${id}/comments`,
    UPDATE_COMMENT: (ticketId, commentId) => `/vendor/support/tickets/${ticketId}/comments/${commentId}`,
    DELETE_COMMENT: (ticketId, commentId) => `/vendor/support/tickets/${ticketId}/comments/${commentId}`,
    FAQ: '/vendor/support/faq',
    CONTACT: '/vendor/support/contact',
    LIVE_CHAT: '/vendor/support/live-chat',
    KNOWLEDGE_BASE: '/vendor/support/knowledge-base',
    ARTICLES: '/vendor/support/articles',
    ARTICLE_DETAIL: (id) => `/vendor/support/articles/${id}`,
  },
  
  // Settings Endpoints
  SETTINGS: {
    PROFILE: '/vendor/settings/profile',
    RESTAURANT: '/vendor/settings/restaurant',
    OPERATING_HOURS: '/vendor/settings/operating-hours',
    NOTIFICATIONS: '/vendor/settings/notifications',
    SECURITY: '/vendor/settings/security',
    DISPLAY: '/vendor/settings/display',
    PRIVACY: '/vendor/settings/privacy',
    LANGUAGE: '/vendor/settings/language',
    TIMEZONE: '/vendor/settings/timezone',
    CURRENCY: '/vendor/settings/currency',
    INTEGRATIONS: '/vendor/settings/integrations',
    BACKUP: '/vendor/settings/backup',
    RESTORE: '/vendor/settings/restore',
    EXPORT_DATA: '/vendor/settings/export-data',
    DELETE_ACCOUNT: '/vendor/settings/delete-account',
  },
  
  // File Upload Endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    BULK_IMAGES: '/upload/bulk-images',
    AVATAR: '/upload/avatar',
    MENU_IMAGE: '/upload/menu-image',
    RESTAURANT_IMAGE: '/upload/restaurant-image',
    BANNER: '/upload/banner',
    LOGO: '/upload/logo',
    INVENTORY_IMAGE: '/upload/inventory-image',
  },
  
  // WebSocket Endpoints
  WEBSOCKET: {
    ORDERS: '/ws/vendor/orders',
    NOTIFICATIONS: '/ws/vendor/notifications',
    ANALYTICS: '/ws/vendor/analytics',
    INVENTORY: '/ws/vendor/inventory',
    REAL_TIME: '/ws/vendor/real-time',
  },
  
  // Error Codes
  ERROR_CODES: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
    SERVER_ERROR: 500,
    NETWORK_ERROR: 0,
    TIMEOUT_ERROR: 408,
    RATE_LIMIT_ERROR: 429,
    MAINTENANCE_ERROR: 503,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  },
  
  // Response Status
  STATUS: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },

  // Rate Limiting
  RATE_LIMITING: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 1000,
    BURST_LIMIT: 10,
    RETRY_AFTER_HEADER: 'Retry-After',
    RATE_LIMIT_HEADER: 'X-RateLimit-Remaining',
    RATE_LIMIT_RESET_HEADER: 'X-RateLimit-Reset',
  },

  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 1000,
    MAX_DELAY: 10000,
    BACKOFF_MULTIPLIER: 2,
    RETRYABLE_STATUS_CODES: [408, 429, 500, 502, 503, 504],
    RETRYABLE_ERRORS: ['ECONNABORTED', 'ENOTFOUND', 'ECONNRESET'],
  },

  // Timeout Configuration
  TIMEOUTS: {
    REQUEST: 30000,
    UPLOAD: 60000,
    DOWNLOAD: 120000,
    WEBSOCKET: 30000,
    CONNECTION: 10000,
    READ: 30000,
    WRITE: 30000,
  },

  // Authentication
  AUTH_CONFIG: {
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
    TOKEN_STORAGE_KEY: 'auth_token',
    REFRESH_TOKEN_STORAGE_KEY: 'refresh_token',
    TOKEN_TYPE: 'Bearer',
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    AUTO_REFRESH: true,
    LOGOUT_ON_REFRESH_FAIL: true,
  },

  // Caching
  CACHE: {
    ENABLED: true,
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    MENU_TTL: 30 * 60 * 1000, // 30 minutes
    ANALYTICS_TTL: 60 * 60 * 1000, // 1 hour
    USER_PROFILE_TTL: 24 * 60 * 60 * 1000, // 24 hours
    STATIC_DATA_TTL: 7 * 24 * 60 * 60 * 1000, // 7 days
    CACHE_HEADERS: ['ETag', 'Last-Modified', 'Cache-Control'],
  },

  // Upload Configuration
  UPLOAD_CONFIG: {
    CHUNK_SIZE: 1024 * 1024, // 1MB chunks
    MAX_CONCURRENT_UPLOADS: 3,
    RETRY_UPLOAD_ATTEMPTS: 3,
    COMPRESS_IMAGES: true,
    IMAGE_QUALITY: 0.8,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    UPLOAD_PROGRESS_CALLBACK: true,
  },

  // WebSocket Configuration
  WEBSOCKET_CONFIG: {
    RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 1000,
    HEARTBEAT_INTERVAL: 30000,
    CONNECTION_TIMEOUT: 10000,
    MAX_MESSAGE_SIZE: 1024 * 1024, // 1MB
    AUTO_RECONNECT: true,
    PING_INTERVAL: 25000,
    PONG_TIMEOUT: 10000,
  },

  // API Versioning
  VERSIONING: {
    CURRENT_VERSION: 'v1',
    SUPPORTED_VERSIONS: ['v1'],
    VERSION_HEADER: 'X-API-Version',
    DEPRECATION_HEADER: 'X-API-Deprecated',
    MIN_SUPPORTED_VERSION: 'v1',
    VERSION_FALLBACK: true,
  },

  // Monitoring
  MONITORING: {
    ENABLED: true,
    LOG_REQUESTS: true,
    LOG_RESPONSES: false,
    LOG_ERRORS: true,
    PERFORMANCE_TRACKING: true,
    ERROR_REPORTING: true,
    METRICS_COLLECTION: true,
    HEALTH_CHECK_ENDPOINT: '/health',
    READINESS_ENDPOINT: '/ready',
    LIVENESS_ENDPOINT: '/live',
  },

  // Security
  SECURITY: {
    CSRF_PROTECTION: true,
    XSS_PROTECTION: true,
    CONTENT_SECURITY_POLICY: true,
    STRICT_TRANSPORT_SECURITY: true,
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
  },
};

// Helper functions for API configuration
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return `${API_CONFIG.BASE_URL}${url}`;
};

export const getAuthHeaders = (token) => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    'Authorization': `${API_CONFIG.AUTH_CONFIG.TOKEN_TYPE} ${token}`,
  };
};

export const isRetryableError = (statusCode, errorCode) => {
  return API_CONFIG.RETRY.RETRYABLE_STATUS_CODES.includes(statusCode) ||
         API_CONFIG.RETRY.RETRYABLE_ERRORS.includes(errorCode);
};

export const getRetryDelay = (attempt) => {
  const delay = API_CONFIG.RETRY.BASE_DELAY * Math.pow(API_CONFIG.RETRY.BACKOFF_MULTIPLIER, attempt - 1);
  return Math.min(delay, API_CONFIG.RETRY.MAX_DELAY);
};

export const getCacheTTL = (endpoint) => {
  if (endpoint.includes('/menu/')) {
    return API_CONFIG.CACHE.MENU_TTL;
  }
  if (endpoint.includes('/analytics/')) {
    return API_CONFIG.CACHE.ANALYTICS_TTL;
  }
  if (endpoint.includes('/profile/')) {
    return API_CONFIG.CACHE.USER_PROFILE_TTL;
  }
  if (endpoint.includes('/static/') || endpoint.includes('/config/')) {
    return API_CONFIG.CACHE.STATIC_DATA_TTL;
  }
  return API_CONFIG.CACHE.DEFAULT_TTL;
};

export const getTimeout = (requestType = 'REQUEST') => {
  return API_CONFIG.TIMEOUTS[requestType.toUpperCase()] || API_CONFIG.TIMEOUTS.REQUEST;
};

export const isRateLimited = (response) => {
  return response?.status === 429 || 
         response?.headers?.['X-RateLimit-Remaining'] === '0';
};

export const getRateLimitInfo = (response) => {
  return {
    remaining: parseInt(response?.headers?.['X-RateLimit-Remaining'] || '0'),
    limit: parseInt(response?.headers?.['X-RateLimit-Limit'] || '0'),
    reset: parseInt(response?.headers?.['X-RateLimit-Reset'] || '0'),
    retryAfter: parseInt(response?.headers?.['Retry-After'] || '0'),
  };
};

export const shouldRefreshToken = (tokenExpiry) => {
  if (!tokenExpiry) return false;
  const expiryTime = new Date(tokenExpiry).getTime();
  const currentTime = Date.now();
  const threshold = API_CONFIG.AUTH_CONFIG.TOKEN_REFRESH_THRESHOLD;
  
  return (expiryTime - currentTime) <= threshold;
};

export const getWebSocketUrl = (endpoint) => {
  const baseUrl = API_CONFIG.BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');
  return `${baseUrl}${endpoint}`;
};

export const isEndpointDeprecated = (response) => {
  return response?.headers?.[API_CONFIG.VERSIONING.DEPRECATION_HEADER] === 'true';
};

export const getApiVersion = () => {
  return API_CONFIG.VERSIONING.CURRENT_VERSION;
};

export default API_CONFIG; 