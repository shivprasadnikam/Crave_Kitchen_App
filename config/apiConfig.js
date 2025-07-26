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
};

export default API_CONFIG; 