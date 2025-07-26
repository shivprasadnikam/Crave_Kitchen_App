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
    NO_CATEGORIES: 'No categories found',
    NO_PAYMENTS: 'No payments found',
    NO_CUSTOMERS: 'No customers found',
    NO_REPORTS: 'No reports available',
  },

  // Business Hours
  BUSINESS_HOURS: {
    DEFAULT_OPEN: '08:00',
    DEFAULT_CLOSE: '22:00',
    BREAK_START: '14:00',
    BREAK_END: '16:00',
    DAYS_OF_WEEK: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
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
  },

  // Payment Methods
  PAYMENT_METHODS: {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    DIGITAL_WALLET: 'digital_wallet',
    BANK_TRANSFER: 'bank_transfer',
    CRYPTO: 'crypto',
  },

  // Order Types
  ORDER_TYPES: {
    DINE_IN: 'dine_in',
    TAKEAWAY: 'takeaway',
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
  },

  // Delivery Zones
  DELIVERY_ZONES: {
    LOCAL: 'local',
    EXTENDED: 'extended',
    PREMIUM: 'premium',
  },

  // Tax Rates
  TAX_RATES: {
    DEFAULT: 0.08, // 8%
    FOOD: 0.05, // 5%
    BEVERAGE: 0.10, // 10%
    ALCOHOL: 0.15, // 15%
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
  },

  // Export Formats
  EXPORT_FORMATS: {
    CSV: 'csv',
    PDF: 'pdf',
    EXCEL: 'xlsx',
    JSON: 'json',
  },

  // Notification Channels
  NOTIFICATION_CHANNELS: {
    PUSH: 'push',
    EMAIL: 'email',
    SMS: 'sms',
    IN_APP: 'in_app',
  },

  // User Roles
  USER_ROLES: {
    OWNER: 'owner',
    MANAGER: 'manager',
    STAFF: 'staff',
    VIEWER: 'viewer',
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
  },

  // App States
  APP_STATES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    SUSPENDED: 'suspended',
  },

  // Feature Flags
  FEATURE_FLAGS: {
    ADVANCED_ANALYTICS: 'advanced_analytics',
    MULTI_LOCATION: 'multi_location',
    INTEGRATION_APIS: 'integration_apis',
    AI_RECOMMENDATIONS: 'ai_recommendations',
    LOYALTY_PROGRAM: 'loyalty_program',
  },
};

export default APP_CONSTANTS; 