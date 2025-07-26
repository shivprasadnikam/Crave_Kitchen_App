import { APP_CONFIG } from './appConfig';

export const API_CONFIG = {
  // Base Configuration
  BASE_URL: APP_CONFIG.API_BASE_URL,
  TIMEOUT: APP_CONFIG.API_TIMEOUT,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
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
  },
  
  // Orders Endpoints
  ORDERS: {
    LIST: '/vendor/orders',
    DETAIL: '/vendor/orders/:id',
    UPDATE_STATUS: '/vendor/orders/:id/status',
    ACCEPT_ORDER: '/vendor/orders/:id/accept',
    REJECT_ORDER: '/vendor/orders/:id/reject',
    MARK_READY: '/vendor/orders/:id/ready',
    HISTORY: '/vendor/orders/history',
    PENDING: '/vendor/orders/pending',
    COMPLETED: '/vendor/orders/completed',
    CANCELLED: '/vendor/orders/cancelled',
    STATISTICS: '/vendor/orders/statistics',
  },
  
  // Menu Management Endpoints
  MENU: {
    CATEGORIES: '/vendor/menu/categories',
    CREATE_CATEGORY: '/vendor/menu/categories',
    UPDATE_CATEGORY: '/vendor/menu/categories/:id',
    DELETE_CATEGORY: '/vendor/menu/categories/:id',
    ITEMS: '/vendor/menu/items',
    CREATE_ITEM: '/vendor/menu/items',
    UPDATE_ITEM: '/vendor/menu/items/:id',
    DELETE_ITEM: '/vendor/menu/items/:id',
    UPLOAD_IMAGE: '/vendor/menu/items/:id/image',
    TOGGLE_AVAILABILITY: '/vendor/menu/items/:id/availability',
    BULK_UPDATE: '/vendor/menu/items/bulk-update',
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
  },
  
  // Inventory Endpoints
  INVENTORY: {
    ITEMS: '/vendor/inventory/items',
    CREATE_ITEM: '/vendor/inventory/items',
    UPDATE_ITEM: '/vendor/inventory/items/:id',
    DELETE_ITEM: '/vendor/inventory/items/:id',
    LOW_STOCK: '/vendor/inventory/low-stock',
    STOCK_ALERTS: '/vendor/inventory/alerts',
    UPDATE_STOCK: '/vendor/inventory/items/:id/stock',
    BULK_UPDATE_STOCK: '/vendor/inventory/bulk-update',
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
  },
  
  // Notifications Endpoints
  NOTIFICATIONS: {
    LIST: '/vendor/notifications',
    MARK_READ: '/vendor/notifications/:id/read',
    MARK_ALL_READ: '/vendor/notifications/mark-all-read',
    DELETE: '/vendor/notifications/:id',
    SETTINGS: '/vendor/notifications/settings',
    UPDATE_SETTINGS: '/vendor/notifications/settings/update',
  },
  
  // Support Endpoints
  SUPPORT: {
    TICKETS: '/vendor/support/tickets',
    CREATE_TICKET: '/vendor/support/tickets',
    TICKET_DETAIL: '/vendor/support/tickets/:id',
    ADD_COMMENT: '/vendor/support/tickets/:id/comments',
    FAQ: '/vendor/support/faq',
    CONTACT: '/vendor/support/contact',
  },
  
  // File Upload Endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    BULK_IMAGES: '/upload/bulk-images',
  },
  
  // WebSocket Endpoints
  WEBSOCKET: {
    ORDERS: '/ws/vendor/orders',
    NOTIFICATIONS: '/ws/vendor/notifications',
  },
  
  // Error Codes
  ERROR_CODES: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
    SERVER_ERROR: 500,
    NETWORK_ERROR: 0,
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
  },

  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 1000,
    MAX_DELAY: 10000,
    BACKOFF_MULTIPLIER: 2,
    RETRYABLE_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },

  // Timeout Configuration
  TIMEOUTS: {
    REQUEST: 30000,
    UPLOAD: 60000,
    DOWNLOAD: 120000,
    WEBSOCKET: 30000,
  },

  // Authentication
  AUTH: {
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
    TOKEN_STORAGE_KEY: 'auth_token',
    REFRESH_TOKEN_STORAGE_KEY: 'refresh_token',
    TOKEN_TYPE: 'Bearer',
  },

  // Caching
  CACHE: {
    ENABLED: true,
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    MENU_TTL: 30 * 60 * 1000, // 30 minutes
    ANALYTICS_TTL: 60 * 60 * 1000, // 1 hour
    USER_PROFILE_TTL: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Upload Configuration
  UPLOAD_CONFIG: {
    CHUNK_SIZE: 1024 * 1024, // 1MB chunks
    MAX_CONCURRENT_UPLOADS: 3,
    RETRY_UPLOAD_ATTEMPTS: 3,
    COMPRESS_IMAGES: true,
    IMAGE_QUALITY: 0.8,
  },

  // WebSocket Configuration
  WEBSOCKET_CONFIG: {
    RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 1000,
    HEARTBEAT_INTERVAL: 30000,
    CONNECTION_TIMEOUT: 10000,
  },

  // API Versioning
  VERSIONING: {
    CURRENT_VERSION: 'v1',
    SUPPORTED_VERSIONS: ['v1'],
    VERSION_HEADER: 'X-API-Version',
    DEPRECATION_HEADER: 'X-API-Deprecated',
  },

  // Monitoring
  MONITORING: {
    ENABLED: true,
    LOG_REQUESTS: true,
    LOG_RESPONSES: false,
    LOG_ERRORS: true,
    PERFORMANCE_TRACKING: true,
    ERROR_REPORTING: true,
  },
};

export default API_CONFIG; 