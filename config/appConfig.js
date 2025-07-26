export const APP_CONFIG = {
  // App Information
  APP_NAME: 'Crave Kitchen Vendor',
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  
  // API Configuration
  API_BASE_URL: 'https://api.cravekitchen.com/v1',
  API_TIMEOUT: 30000,
  
  // Feature Flags
  FEATURES: {
    PUSH_NOTIFICATIONS: true,
    LOCATION_SERVICES: true,
    CAMERA_FEATURES: true,
    ANALYTICS: true,
    PAYMENT_PROCESSING: true,
    INVENTORY_TRACKING: true,
    ORDER_MANAGEMENT: true,
    MENU_MANAGEMENT: true,
  },
  
  // App Settings
  SETTINGS: {
    AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
    MAX_MENU_ITEMS: 100,
    MAX_CATEGORIES: 20,
    ORDER_HISTORY_LIMIT: 1000,
    NOTIFICATION_RETENTION_DAYS: 30,
  },
  
  // UI Configuration
  UI: {
    THEME: {
      PRIMARY_COLOR: '#FF6B35',
      SECONDARY_COLOR: '#F7931E',
      SUCCESS_COLOR: '#4CAF50',
      WARNING_COLOR: '#FF9800',
      ERROR_COLOR: '#F44336',
      INFO_COLOR: '#2196F3',
      BACKGROUND_COLOR: '#F5F5F5',
      SURFACE_COLOR: '#FFFFFF',
      TEXT_PRIMARY: '#212121',
      TEXT_SECONDARY: '#757575',
      BORDER_COLOR: '#E0E0E0',
    },
    ANIMATION: {
      DURATION: 300,
      EASING: 'ease-in-out',
    },
    LAYOUT: {
      PADDING: 16,
      MARGIN: 8,
      BORDER_RADIUS: 8,
      SHADOW_RADIUS: 4,
    },
  },
  
  // Business Logic
  BUSINESS: {
    ORDER_STATUSES: {
      PENDING: 'pending',
      CONFIRMED: 'confirmed',
      PREPARING: 'preparing',
      READY: 'ready',
      OUT_FOR_DELIVERY: 'out_for_delivery',
      DELIVERED: 'delivered',
      CANCELLED: 'cancelled',
      REFUNDED: 'refunded',
    },
    PAYMENT_STATUSES: {
      PENDING: 'pending',
      PROCESSING: 'processing',
      COMPLETED: 'completed',
      FAILED: 'failed',
      REFUNDED: 'refunded',
    },
    MENU_ITEM_STATUSES: {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
      OUT_OF_STOCK: 'out_of_stock',
    },
    NOTIFICATION_TYPES: {
      NEW_ORDER: 'new_order',
      ORDER_UPDATE: 'order_update',
      PAYMENT_RECEIVED: 'payment_received',
      LOW_STOCK: 'low_stock',
      SYSTEM_ALERT: 'system_alert',
    },
  },
  
  // Validation Rules
  VALIDATION: {
    RESTAURANT_NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 100,
    },
    PHONE_NUMBER: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 15,
    },
    EMAIL: {
      PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    PASSWORD: {
      MIN_LENGTH: 8,
      REQUIRE_UPPERCASE: true,
      REQUIRE_LOWERCASE: true,
      REQUIRE_NUMBER: true,
      REQUIRE_SPECIAL: true,
    },
    MENU_ITEM: {
      NAME_MIN_LENGTH: 2,
      NAME_MAX_LENGTH: 100,
      DESCRIPTION_MAX_LENGTH: 500,
      PRICE_MIN: 0.01,
      PRICE_MAX: 999.99,
    },
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
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Successfully logged in!',
    LOGOUT_SUCCESS: 'Successfully logged out!',
    ORDER_UPDATED: 'Order updated successfully!',
    MENU_ITEM_SAVED: 'Menu item saved successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    SETTINGS_SAVED: 'Settings saved successfully!',
    CATEGORY_CREATED: 'Category created successfully!',
    CATEGORY_UPDATED: 'Category updated successfully!',
    CATEGORY_DELETED: 'Category deleted successfully!',
    INVENTORY_UPDATED: 'Inventory updated successfully!',
    PAYMENT_PROCESSED: 'Payment processed successfully!',
    NOTIFICATION_SETTINGS_UPDATED: 'Notification settings updated!',
  },

  // Cache Configuration
  CACHE: {
    ENABLED: true,
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    LONG_TTL: 30 * 60 * 1000, // 30 minutes
    VERY_LONG_TTL: 24 * 60 * 60 * 1000, // 24 hours
    MAX_SIZE: 50, // Maximum number of cached items
  },

  // Performance Configuration
  PERFORMANCE: {
    IMAGE_COMPRESSION_QUALITY: 0.8,
    LAZY_LOADING_ENABLED: true,
    VIRTUAL_SCROLLING_ENABLED: true,
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
  },

  // Security Configuration
  SECURITY: {
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    PASSWORD_EXPIRY_DAYS: 90,
    REQUIRE_2FA: false,
    ENCRYPT_SENSITIVE_DATA: true,
  },

  // Analytics Configuration
  ANALYTICS: {
    ENABLED: true,
    TRACK_EVENTS: true,
    TRACK_SCREENS: true,
    TRACK_USER_ACTIONS: true,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    BATCH_SIZE: 10,
    FLUSH_INTERVAL: 60 * 1000, // 1 minute
  },

  // Localization Configuration
  LOCALIZATION: {
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko'],
    FALLBACK_LANGUAGE: 'en',
    DATE_FORMAT: 'MM/DD/YYYY',
    TIME_FORMAT: 'HH:mm',
    CURRENCY_FORMAT: 'USD',
  },

  // Offline Configuration
  OFFLINE: {
    ENABLED: true,
    SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutes
    MAX_OFFLINE_ORDERS: 50,
    MAX_OFFLINE_DATA_SIZE: 10 * 1024 * 1024, // 10MB
    AUTO_SYNC_ON_CONNECT: true,
  },

  // Push Notification Configuration
  PUSH_NOTIFICATIONS: {
    ENABLED: true,
    SOUND_ENABLED: true,
    VIBRATION_ENABLED: true,
    BADGE_ENABLED: true,
    ALERT_ENABLED: true,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // Deep Linking Configuration
  DEEP_LINKING: {
    ENABLED: true,
    SCHEME: 'cravekitchen',
    HOST: 'vendor',
    PREFIXES: ['cravekitchen://', 'https://cravekitchen.com'],
  },

  // Environment Configuration
  ENVIRONMENT: {
    DEVELOPMENT: {
      API_BASE_URL: 'https://dev-api.cravekitchen.com/v1',
      LOG_LEVEL: 'debug',
      MOCK_DATA_ENABLED: true,
    },
    STAGING: {
      API_BASE_URL: 'https://staging-api.cravekitchen.com/v1',
      LOG_LEVEL: 'info',
      MOCK_DATA_ENABLED: false,
    },
    PRODUCTION: {
      API_BASE_URL: 'https://api.cravekitchen.com/v1',
      LOG_LEVEL: 'error',
      MOCK_DATA_ENABLED: false,
    },
  },
};

export default APP_CONFIG; 