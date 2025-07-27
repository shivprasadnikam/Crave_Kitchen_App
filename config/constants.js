// App Constants
export const APP_CONSTANTS = {
  // App Info
  APP_NAME: 'Crave Kitchen Vendor',
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  BUNDLE_ID: 'com.cravekitchen.vendor',
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PROFILE: 'user_profile',
    RESTAURANT_INFO: 'restaurant_info',
    APP_SETTINGS: 'app_settings',
    NOTIFICATION_SETTINGS: 'notification_settings',
    THEME_SETTINGS: 'theme_settings',
    LANGUAGE_SETTINGS: 'language_settings',
    CACHE_DATA: 'cache_data',
    OFFLINE_DATA: 'offline_data',
    ANALYTICS_DATA: 'analytics_data',
    USER_PREFERENCES: 'user_preferences',
    SECURITY_SETTINGS: 'security_settings',
    DISPLAY_SETTINGS: 'display_settings',
  },
  
  // Navigation Routes
  ROUTES: {
    // Auth Routes
    AUTH: {
      LOGIN: 'VendorLogin',
      SIGNUP: 'VendorSignUp',
      FORGOT_PASSWORD: 'ForgotPassword',
      RESET_PASSWORD: 'ResetPassword',
      VERIFY_EMAIL: 'VerifyEmail',
      TWO_FACTOR: 'TwoFactorAuth',
    },
    
    // Main App Routes
    MAIN: {
      DASHBOARD: 'VendorDashboard',
      ORDERS: 'OrderList',
      MENU: 'MenuManagement',
      ANALYTICS: 'AnalyticsDashboard',
      INVENTORY: 'Inventory',
      FINANCES: 'Revenue',
      SETTINGS: 'VendorProfile',
      SUPPORT: 'HelpCenter',
      NOTIFICATIONS: 'Notifications',
      QUICK_ACTIONS: 'QuickActions',
    },
    
    // Order Routes
    ORDERS: {
      LIST: 'OrderList',
      DETAIL: 'OrderDetail',
      HISTORY: 'OrderHistory',
      PENDING: 'PendingOrders',
      COMPLETED: 'CompletedOrders',
      CANCELLED: 'CancelledOrders',
      TIMELINE: 'OrderTimeline',
    },
    
    // Menu Routes
    MENU: {
      MANAGEMENT: 'MenuManagement',
      ADD_ITEM: 'AddMenuItem',
      EDIT_ITEM: 'EditMenuItem',
      CATEGORIES: 'CategoryManagement',
      PREVIEW: 'MenuPreview',
      CUSTOMIZATIONS: 'Customizations',
      ADD_ONS: 'AddOns',
      SIDES: 'Sides',
      DRINKS: 'Drinks',
    },
    
    // Analytics Routes
    ANALYTICS: {
      DASHBOARD: 'AnalyticsDashboard',
      REVENUE: 'RevenueAnalytics',
      ORDERS: 'OrderAnalytics',
      POPULAR_ITEMS: 'PopularItems',
      CUSTOMERS: 'CustomerAnalytics',
      PERFORMANCE: 'PerformanceAnalytics',
      REPORTS: 'AnalyticsReports',
      EXPORT: 'AnalyticsExport',
    },
    
    // Settings Routes
    SETTINGS: {
      PROFILE: 'VendorProfile',
      RESTAURANT: 'RestaurantSettings',
      HOURS: 'OperatingHours',
      NOTIFICATIONS: 'NotificationSettings',
      SECURITY: 'SecuritySettings',
      DISPLAY: 'DisplaySettings',
      PRIVACY: 'PrivacySettings',
      LANGUAGE: 'LanguageSettings',
      TIMEZONE: 'TimezoneSettings',
      CURRENCY: 'CurrencySettings',
      INTEGRATIONS: 'IntegrationSettings',
      BACKUP: 'BackupSettings',
    },
    
    // Support Routes
    SUPPORT: {
      HELP_CENTER: 'HelpCenter',
      CONTACT: 'ContactSupport',
      FAQ: 'FAQ',
      TICKETS: 'SupportTickets',
      TICKET_DETAIL: 'TicketDetail',
      LIVE_CHAT: 'LiveChat',
      KNOWLEDGE_BASE: 'KnowledgeBase',
    },
  },
  
  // Order Status Constants
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY: 'ready',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIALLY_REFUNDED: 'partially_refunded',
  },
  
  // Payment Status Constants
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PARTIALLY_REFUNDED: 'partially_refunded',
    CANCELLED: 'cancelled',
  },
  
  // Menu Item Status Constants
  MENU_ITEM_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    SEASONAL: 'seasonal',
    DISCONTINUED: 'discontinued',
  },
  
  // Notification Types
  NOTIFICATION_TYPES: {
    NEW_ORDER: 'new_order',
    ORDER_UPDATE: 'order_update',
    PAYMENT_RECEIVED: 'payment_received',
    LOW_STOCK: 'low_stock',
    SYSTEM_ALERT: 'system_alert',
    PROMOTION: 'promotion',
    MAINTENANCE: 'maintenance',
    SECURITY: 'security',
    ANALYTICS: 'analytics',
  },
  
  // Time Constants
  TIME: {
    ONE_MINUTE: 60 * 1000,
    FIVE_MINUTES: 5 * 60 * 1000,
    TEN_MINUTES: 10 * 60 * 1000,
    THIRTY_MINUTES: 30 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
    ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
    ONE_MONTH: 30 * 24 * 60 * 60 * 1000,
    ONE_YEAR: 365 * 24 * 60 * 60 * 1000,
  },
  
  // Date Formats
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: 'yyyy-MM-dd HH:mm:ss',
    TIME_ONLY: 'HH:mm',
    TIME_12H: 'hh:mm a',
    SHORT_DATE: 'MM/dd/yyyy',
    LONG_DATE: 'EEEE, MMMM dd, yyyy',
    ISO: 'yyyy-MM-ddTHH:mm:ss.SSSZ',
  },
  
  // Currency
  CURRENCY: {
    SYMBOL: '$',
    CODE: 'USD',
    DECIMAL_PLACES: 2,
    THOUSAND_SEPARATOR: ',',
    DECIMAL_SEPARATOR: '.',
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
    MIN_PAGE_SIZE: 5,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
    MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_DOCUMENT_FORMATS: ['pdf', 'doc', 'docx'],
    MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
    SUPPORTED_VIDEO_FORMATS: ['mp4', 'mov', 'avi'],
    COMPRESSION_QUALITY: 0.8,
    THUMBNAIL_SIZE: 200,
  },
  
  // Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    URL_REGEX: /^https?:\/\/.+/,
    ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
    CREDIT_CARD_REGEX: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
    ALPHANUMERIC_REGEX: /^[a-zA-Z0-9]+$/,
    ALPHA_REGEX: /^[a-zA-Z\s]+$/,
    NUMERIC_REGEX: /^\d+$/,
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    PASSWORD_REQUIREMENTS: 'Password must contain uppercase, lowercase, number, and special character.',
    INVALID_URL: 'Please enter a valid URL.',
    INVALID_ZIP_CODE: 'Please enter a valid ZIP code.',
    INVALID_CREDIT_CARD: 'Please enter a valid credit card number.',
    FILE_TOO_LARGE: 'File size is too large.',
    UNSUPPORTED_FILE_TYPE: 'File type is not supported.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment and try again.',
    MAINTENANCE_ERROR: 'System is under maintenance. Please try again later.',
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Successfully logged in!',
    LOGOUT_SUCCESS: 'Successfully logged out!',
    ORDER_UPDATED: 'Order updated successfully!',
    MENU_ITEM_SAVED: 'Menu item saved successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    SETTINGS_SAVED: 'Settings saved successfully!',
    IMAGE_UPLOADED: 'Image uploaded successfully!',
    DATA_EXPORTED: 'Data exported successfully!',
    PASSWORD_CHANGED: 'Password changed successfully!',
    EMAIL_VERIFIED: 'Email verified successfully!',
    TWO_FACTOR_ENABLED: 'Two-factor authentication enabled!',
    TWO_FACTOR_DISABLED: 'Two-factor authentication disabled!',
    BACKUP_CREATED: 'Backup created successfully!',
    RESTORE_COMPLETED: 'Restore completed successfully!',
    NOTIFICATION_SENT: 'Notification sent successfully!',
  },
  
  // Loading Messages
  LOADING_MESSAGES: {
    LOGGING_IN: 'Logging in...',
    LOADING_DATA: 'Loading data...',
    SAVING: 'Saving...',
    UPLOADING: 'Uploading...',
    PROCESSING: 'Processing...',
    EXPORTING: 'Exporting...',
    VERIFYING: 'Verifying...',
    CREATING_BACKUP: 'Creating backup...',
    RESTORING: 'Restoring...',
    SENDING: 'Sending...',
    SYNCING: 'Syncing...',
  },
  
  // Empty State Messages
  EMPTY_STATE_MESSAGES: {
    NO_ORDERS: 'No orders found',
    NO_MENU_ITEMS: 'No menu items found',
    NO_NOTIFICATIONS: 'No notifications',
    NO_ANALYTICS: 'No analytics data available',
    NO_INVENTORY: 'No inventory items found',
    NO_CATEGORIES: 'No categories found',
    NO_PAYMENTS: 'No payments found',
    NO_CUSTOMERS: 'No customers found',
    NO_REPORTS: 'No reports available',
    NO_TICKETS: 'No support tickets found',
    NO_ARTICLES: 'No articles found',
    NO_STAFF: 'No staff members found',
    NO_SUPPLIERS: 'No suppliers found',
    NO_EXPENSES: 'No expenses found',
    NO_INVOICES: 'No invoices found',
  },

  // Business Hours
  BUSINESS_HOURS: {
    DEFAULT_OPEN: '08:00',
    DEFAULT_CLOSE: '22:00',
    BREAK_START: '14:00',
    BREAK_END: '16:00',
    DAYS_OF_WEEK: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    DAY_LABELS: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
  },

  // Menu Categories
  MENU_CATEGORIES: {
    APPETIZERS: 'appetizers',
    MAIN_COURSE: 'main_course',
    DESSERTS: 'desserts',
    BEVERAGES: 'beverages',
    SIDES: 'sides',
    SALADS: 'salads',
    SOUPS: 'soups',
    SANDWICHES: 'sandwiches',
    PIZZA: 'pizza',
    BURGERS: 'burgers',
    PASTA: 'pasta',
    SEAFOOD: 'seafood',
    VEGETARIAN: 'vegetarian',
    VEGAN: 'vegan',
    GLUTEN_FREE: 'gluten_free',
    KIDS_MENU: 'kids_menu',
    BREAKFAST: 'breakfast',
    LUNCH: 'lunch',
    DINNER: 'dinner',
    LATE_NIGHT: 'late_night',
  },

  // Payment Methods
  PAYMENT_METHODS: {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    DIGITAL_WALLET: 'digital_wallet',
    BANK_TRANSFER: 'bank_transfer',
    CRYPTO: 'crypto',
    CHECK: 'check',
    MONEY_ORDER: 'money_order',
  },

  // Order Types
  ORDER_TYPES: {
    DINE_IN: 'dine_in',
    TAKEAWAY: 'takeaway',
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
    CATERING: 'catering',
  },

  // Delivery Zones
  DELIVERY_ZONES: {
    LOCAL: 'local',
    EXTENDED: 'extended',
    PREMIUM: 'premium',
    EXPRESS: 'express',
    STANDARD: 'standard',
  },

  // Tax Rates
  TAX_RATES: {
    DEFAULT: 0.08, // 8%
    FOOD: 0.05, // 5%
    BEVERAGE: 0.10, // 10%
    ALCOHOL: 0.15, // 15%
    DELIVERY: 0.00, // 0%
    SERVICE: 0.00, // 0%
  },

  // Tip Options
  TIP_OPTIONS: {
    NONE: 0,
    LOW: 0.10, // 10%
    MEDIUM: 0.15, // 15%
    HIGH: 0.20, // 20%
    CUSTOM: 'custom',
  },

  // Inventory Alerts
  INVENTORY_ALERTS: {
    LOW_STOCK_THRESHOLD: 10,
    CRITICAL_STOCK_THRESHOLD: 5,
    EXPIRY_WARNING_DAYS: 7,
    AUTO_REORDER_ENABLED: true,
    ALERT_LEVELS: {
      NONE: 'none',
      LOW: 'low',
      MEDIUM: 'medium',
      HIGH: 'high',
      CRITICAL: 'critical',
    },
  },

  // Analytics Periods
  ANALYTICS_PERIODS: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_365_DAYS: 'last_365_days',
  },

  // Export Formats
  EXPORT_FORMATS: {
    CSV: 'csv',
    PDF: 'pdf',
    EXCEL: 'xlsx',
    JSON: 'json',
    XML: 'xml',
  },

  // Notification Channels
  NOTIFICATION_CHANNELS: {
    PUSH: 'push',
    EMAIL: 'email',
    SMS: 'sms',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
  },

  // User Roles
  USER_ROLES: {
    OWNER: 'owner',
    MANAGER: 'manager',
    STAFF: 'staff',
    VIEWER: 'viewer',
    ADMIN: 'admin',
    CASHIER: 'cashier',
    KITCHEN: 'kitchen',
    DELIVERY: 'delivery',
  },

  // Permissions
  PERMISSIONS: {
    VIEW_ORDERS: 'view_orders',
    MANAGE_ORDERS: 'manage_orders',
    VIEW_MENU: 'view_menu',
    MANAGE_MENU: 'manage_menu',
    VIEW_INVENTORY: 'view_inventory',
    MANAGE_INVENTORY: 'manage_inventory',
    VIEW_ANALYTICS: 'view_analytics',
    VIEW_FINANCES: 'view_finances',
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_USERS: 'manage_users',
    VIEW_REPORTS: 'view_reports',
    EXPORT_DATA: 'export_data',
    MANAGE_INTEGRATIONS: 'manage_integrations',
    VIEW_LOGS: 'view_logs',
  },

  // App States
  APP_STATES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    SUSPENDED: 'suspended',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  },

  // Feature Flags
  FEATURE_FLAGS: {
    ADVANCED_ANALYTICS: 'advanced_analytics',
    MULTI_LOCATION: 'multi_location',
    INTEGRATION_APIS: 'integration_apis',
    AI_RECOMMENDATIONS: 'ai_recommendations',
    LOYALTY_PROGRAM: 'loyalty_program',
    REAL_TIME_UPDATES: 'real_time_updates',
    OFFLINE_MODE: 'offline_mode',
    PUSH_NOTIFICATIONS: 'push_notifications',
    BIOMETRIC_AUTH: 'biometric_auth',
    TWO_FACTOR_AUTH: 'two_factor_auth',
  },

  // Security Levels
  SECURITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Data Retention
  DATA_RETENTION: {
    ORDERS: 7 * 365 * 24 * 60 * 60 * 1000, // 7 years
    ANALYTICS: 2 * 365 * 24 * 60 * 60 * 1000, // 2 years
    LOGS: 90 * 24 * 60 * 60 * 1000, // 90 days
    CACHE: 7 * 24 * 60 * 60 * 1000, // 7 days
    TEMP_FILES: 24 * 60 * 60 * 1000, // 24 hours
  },

  // API Limits
  API_LIMITS: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 1000,
    UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_ITEMS_PER_REQUEST: 100,
    MAX_BATCH_SIZE: 50,
  },

  // Cache Keys
  CACHE_KEYS: {
    MENU_ITEMS: 'menu_items',
    CATEGORIES: 'categories',
    USER_PROFILE: 'user_profile',
    RESTAURANT_INFO: 'restaurant_info',
    ANALYTICS_DATA: 'analytics_data',
    NOTIFICATIONS: 'notifications',
    SETTINGS: 'settings',
    THEME: 'theme',
    LANGUAGE: 'language',
  },
};

// Helper functions for constants
export const getOrderStatusLabel = (status) => {
  const statusLabels = {
    [APP_CONSTANTS.ORDER_STATUS.PENDING]: 'Pending',
    [APP_CONSTANTS.ORDER_STATUS.CONFIRMED]: 'Confirmed',
    [APP_CONSTANTS.ORDER_STATUS.PREPARING]: 'Preparing',
    [APP_CONSTANTS.ORDER_STATUS.READY]: 'Ready',
    [APP_CONSTANTS.ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [APP_CONSTANTS.ORDER_STATUS.DELIVERED]: 'Delivered',
    [APP_CONSTANTS.ORDER_STATUS.CANCELLED]: 'Cancelled',
    [APP_CONSTANTS.ORDER_STATUS.REFUNDED]: 'Refunded',
    [APP_CONSTANTS.ORDER_STATUS.PARTIALLY_REFUNDED]: 'Partially Refunded',
  };
  return statusLabels[status] || 'Unknown';
};

export const getPaymentStatusLabel = (status) => {
  const statusLabels = {
    [APP_CONSTANTS.PAYMENT_STATUS.PENDING]: 'Pending',
    [APP_CONSTANTS.PAYMENT_STATUS.PROCESSING]: 'Processing',
    [APP_CONSTANTS.PAYMENT_STATUS.COMPLETED]: 'Completed',
    [APP_CONSTANTS.PAYMENT_STATUS.FAILED]: 'Failed',
    [APP_CONSTANTS.PAYMENT_STATUS.REFUNDED]: 'Refunded',
    [APP_CONSTANTS.PAYMENT_STATUS.PARTIALLY_REFUNDED]: 'Partially Refunded',
    [APP_CONSTANTS.PAYMENT_STATUS.CANCELLED]: 'Cancelled',
  };
  return statusLabels[status] || 'Unknown';
};

export const getMenuCategoryLabel = (category) => {
  const categoryLabels = {
    [APP_CONSTANTS.MENU_CATEGORIES.APPETIZERS]: 'Appetizers',
    [APP_CONSTANTS.MENU_CATEGORIES.MAIN_COURSE]: 'Main Course',
    [APP_CONSTANTS.MENU_CATEGORIES.DESSERTS]: 'Desserts',
    [APP_CONSTANTS.MENU_CATEGORIES.BEVERAGES]: 'Beverages',
    [APP_CONSTANTS.MENU_CATEGORIES.SIDES]: 'Sides',
    [APP_CONSTANTS.MENU_CATEGORIES.SALADS]: 'Salads',
    [APP_CONSTANTS.MENU_CATEGORIES.SOUPS]: 'Soups',
    [APP_CONSTANTS.MENU_CATEGORIES.SANDWICHES]: 'Sandwiches',
    [APP_CONSTANTS.MENU_CATEGORIES.PIZZA]: 'Pizza',
    [APP_CONSTANTS.MENU_CATEGORIES.BURGERS]: 'Burgers',
    [APP_CONSTANTS.MENU_CATEGORIES.PASTA]: 'Pasta',
    [APP_CONSTANTS.MENU_CATEGORIES.SEAFOOD]: 'Seafood',
    [APP_CONSTANTS.MENU_CATEGORIES.VEGETARIAN]: 'Vegetarian',
    [APP_CONSTANTS.MENU_CATEGORIES.VEGAN]: 'Vegan',
    [APP_CONSTANTS.MENU_CATEGORIES.GLUTEN_FREE]: 'Gluten Free',
    [APP_CONSTANTS.MENU_CATEGORIES.KIDS_MENU]: 'Kids Menu',
    [APP_CONSTANTS.MENU_CATEGORIES.BREAKFAST]: 'Breakfast',
    [APP_CONSTANTS.MENU_CATEGORIES.LUNCH]: 'Lunch',
    [APP_CONSTANTS.MENU_CATEGORIES.DINNER]: 'Dinner',
    [APP_CONSTANTS.MENU_CATEGORIES.LATE_NIGHT]: 'Late Night',
  };
  return categoryLabels[category] || 'Other';
};

export const getPaymentMethodLabel = (method) => {
  const methodLabels = {
    [APP_CONSTANTS.PAYMENT_METHODS.CASH]: 'Cash',
    [APP_CONSTANTS.PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
    [APP_CONSTANTS.PAYMENT_METHODS.DEBIT_CARD]: 'Debit Card',
    [APP_CONSTANTS.PAYMENT_METHODS.DIGITAL_WALLET]: 'Digital Wallet',
    [APP_CONSTANTS.PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [APP_CONSTANTS.PAYMENT_METHODS.CRYPTO]: 'Cryptocurrency',
    [APP_CONSTANTS.PAYMENT_METHODS.CHECK]: 'Check',
    [APP_CONSTANTS.PAYMENT_METHODS.MONEY_ORDER]: 'Money Order',
  };
  return methodLabels[method] || 'Unknown';
};

export const getOrderTypeLabel = (type) => {
  const typeLabels = {
    [APP_CONSTANTS.ORDER_TYPES.DINE_IN]: 'Dine In',
    [APP_CONSTANTS.ORDER_TYPES.TAKEAWAY]: 'Takeaway',
    [APP_CONSTANTS.ORDER_TYPES.DELIVERY]: 'Delivery',
    [APP_CONSTANTS.ORDER_TYPES.PICKUP]: 'Pickup',
    [APP_CONSTANTS.ORDER_TYPES.CATERING]: 'Catering',
  };
  return typeLabels[type] || 'Unknown';
};

export const getUserRoleLabel = (role) => {
  const roleLabels = {
    [APP_CONSTANTS.USER_ROLES.OWNER]: 'Owner',
    [APP_CONSTANTS.USER_ROLES.MANAGER]: 'Manager',
    [APP_CONSTANTS.USER_ROLES.STAFF]: 'Staff',
    [APP_CONSTANTS.USER_ROLES.VIEWER]: 'Viewer',
    [APP_CONSTANTS.USER_ROLES.ADMIN]: 'Admin',
    [APP_CONSTANTS.USER_ROLES.CASHIER]: 'Cashier',
    [APP_CONSTANTS.USER_ROLES.KITCHEN]: 'Kitchen',
    [APP_CONSTANTS.USER_ROLES.DELIVERY]: 'Delivery',
  };
  return roleLabels[role] || 'Unknown';
};

export const getNotificationTypeLabel = (type) => {
  const typeLabels = {
    [APP_CONSTANTS.NOTIFICATION_TYPES.NEW_ORDER]: 'New Order',
    [APP_CONSTANTS.NOTIFICATION_TYPES.ORDER_UPDATE]: 'Order Update',
    [APP_CONSTANTS.NOTIFICATION_TYPES.PAYMENT_RECEIVED]: 'Payment Received',
    [APP_CONSTANTS.NOTIFICATION_TYPES.LOW_STOCK]: 'Low Stock Alert',
    [APP_CONSTANTS.NOTIFICATION_TYPES.SYSTEM_ALERT]: 'System Alert',
    [APP_CONSTANTS.NOTIFICATION_TYPES.PROMOTION]: 'Promotion',
    [APP_CONSTANTS.NOTIFICATION_TYPES.MAINTENANCE]: 'Maintenance',
    [APP_CONSTANTS.NOTIFICATION_TYPES.SECURITY]: 'Security Alert',
    [APP_CONSTANTS.NOTIFICATION_TYPES.ANALYTICS]: 'Analytics Update',
  };
  return typeLabels[type] || 'Unknown';
};

export const getDayLabel = (day) => {
  return APP_CONSTANTS.BUSINESS_HOURS.DAY_LABELS[day] || day;
};

export const isOrderUrgent = (order) => {
  const urgentStatuses = [APP_CONSTANTS.ORDER_STATUS.PENDING, APP_CONSTANTS.ORDER_STATUS.CONFIRMED];
  return urgentStatuses.includes(order.status);
};

export const canOrderBeCancelled = (order) => {
  const cancellableStatuses = [
    APP_CONSTANTS.ORDER_STATUS.PENDING,
    APP_CONSTANTS.ORDER_STATUS.CONFIRMED,
    APP_CONSTANTS.ORDER_STATUS.PREPARING
  ];
  return cancellableStatuses.includes(order.status);
};

export const canOrderBeModified = (order) => {
  const modifiableStatuses = [
    APP_CONSTANTS.ORDER_STATUS.PENDING,
    APP_CONSTANTS.ORDER_STATUS.CONFIRMED
  ];
  return modifiableStatuses.includes(order.status);
};

export const getFileSizeInMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

export const isImageFile = (filename) => {
  const extension = getFileExtension(filename);
  return APP_CONSTANTS.FILE_UPLOAD.SUPPORTED_IMAGE_FORMATS.includes(extension);
};

export const isDocumentFile = (filename) => {
  const extension = getFileExtension(filename);
  return APP_CONSTANTS.FILE_UPLOAD.SUPPORTED_DOCUMENT_FORMATS.includes(extension);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getCacheKey = (key, params = {}) => {
  const paramString = Object.keys(params).length > 0 
    ? '_' + Object.entries(params).map(([k, v]) => `${k}_${v}`).join('_')
    : '';
  return `${key}${paramString}`;
};

export default APP_CONSTANTS; 