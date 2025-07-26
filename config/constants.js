// App Constants
export const APP_CONSTANTS = {
  // App Info
  APP_NAME: 'Crave Kitchen Vendor',
  APP_VERSION: '1.0.0',
  
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
  },
  
  // Navigation Routes
  ROUTES: {
    // Auth Routes
    AUTH: {
      LOGIN: 'VendorLogin',
      SIGNUP: 'VendorSignUp',
      FORGOT_PASSWORD: 'ForgotPassword',
      RESET_PASSWORD: 'ResetPassword',
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
    },
    
    // Order Routes
    ORDERS: {
      LIST: 'OrderList',
      DETAIL: 'OrderDetail',
      HISTORY: 'OrderHistory',
      PENDING: 'PendingOrders',
      COMPLETED: 'CompletedOrders',
    },
    
    // Menu Routes
    MENU: {
      MANAGEMENT: 'MenuManagement',
      ADD_ITEM: 'AddMenuItem',
      EDIT_ITEM: 'EditMenuItem',
      CATEGORIES: 'CategoryManagement',
      PREVIEW: 'MenuPreview',
    },
    
    // Analytics Routes
    ANALYTICS: {
      DASHBOARD: 'AnalyticsDashboard',
      REVENUE: 'RevenueAnalytics',
      ORDERS: 'OrderAnalytics',
      POPULAR_ITEMS: 'PopularItems',
      CUSTOMERS: 'CustomerAnalytics',
    },
    
    // Settings Routes
    SETTINGS: {
      PROFILE: 'VendorProfile',
      RESTAURANT: 'RestaurantSettings',
      HOURS: 'OperatingHours',
      NOTIFICATIONS: 'NotificationSettings',
      SECURITY: 'SecuritySettings',
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
  },
  
  // Payment Status Constants
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
  
  // Menu Item Status Constants
  MENU_ITEM_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
  },
  
  // Notification Types
  NOTIFICATION_TYPES: {
    NEW_ORDER: 'new_order',
    ORDER_UPDATE: 'order_update',
    PAYMENT_RECEIVED: 'payment_received',
    LOW_STOCK: 'low_stock',
    SYSTEM_ALERT: 'system_alert',
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
  },
  
  // Date Formats
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: 'yyyy-MM-dd HH:mm:ss',
    TIME_ONLY: 'HH:mm',
    TIME_12H: 'hh:mm a',
  },
  
  // Currency
  CURRENCY: {
    SYMBOL: '$',
    CODE: 'USD',
    DECIMAL_PLACES: 2,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
    MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_DOCUMENT_FORMATS: ['pdf', 'doc', 'docx'],
  },
  
  // Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
  },
  
  // Loading Messages
  LOADING_MESSAGES: {
    LOGGING_IN: 'Logging in...',
    LOADING_DATA: 'Loading data...',
    SAVING: 'Saving...',
    UPLOADING: 'Uploading...',
    PROCESSING: 'Processing...',
    EXPORTING: 'Exporting...',
  },
  
  // Empty State Messages
  EMPTY_STATE_MESSAGES: {
    NO_ORDERS: 'No orders found',
    NO_MENU_ITEMS: 'No menu items found',
    NO_NOTIFICATIONS: 'No notifications',
    NO_ANALYTICS: 'No analytics data available',
    NO_INVENTORY: 'No inventory items found',
  },
};

export default APP_CONSTANTS; 