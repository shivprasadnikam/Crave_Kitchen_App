export const APP_CONFIG = {
  // App Information
  APP_NAME: 'Crave Kitchen Vendor',
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  BUNDLE_ID: 'com.cravekitchen.vendor',
  
  // API Configuration
  API_BASE_URL: 'https://api.cravekitchen.com/v1',
  API_TIMEOUT: 30000,
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY: 1000,
  
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
    MULTI_LOCATION: false,
    LOYALTY_PROGRAM: true,
    AI_RECOMMENDATIONS: false,
    INTEGRATION_APIS: true,
    ADVANCED_ANALYTICS: true,
    REAL_TIME_UPDATES: true,
    OFFLINE_MODE: true,
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
    CACHE_EXPIRY_HOURS: 24,
    MAX_UPLOAD_RETRIES: 3,
    SESSION_TIMEOUT_MINUTES: 30,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
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
      SHADOW_COLOR: '#000000',
      OVERLAY_COLOR: 'rgba(0, 0, 0, 0.5)',
    },
    ANIMATION: {
      DURATION: 300,
      EASING: 'ease-in-out',
      SPRING_CONFIG: { tension: 100, friction: 8 },
    },
    LAYOUT: {
      PADDING: 16,
      MARGIN: 8,
      BORDER_RADIUS: 8,
      SHADOW_RADIUS: 4,
      HEADER_HEIGHT: 56,
      TAB_BAR_HEIGHT: 60,
      BOTTOM_SHEET_HEIGHT: 300,
    },
    TYPOGRAPHY: {
      FONT_FAMILY: {
        REGULAR: 'System',
        MEDIUM: 'System',
        BOLD: 'System',
        LIGHT: 'System',
      },
      FONT_SIZE: {
        XS: 10,
        SM: 12,
        MD: 14,
        LG: 16,
        XL: 18,
        XXL: 20,
        XXXL: 24,
        TITLE: 28,
        HEADER: 32,
      },
      LINE_HEIGHT: {
        TIGHT: 1.2,
        NORMAL: 1.4,
        RELAXED: 1.6,
      },
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
      PARTIALLY_REFUNDED: 'partially_refunded',
    },
    MENU_ITEM_STATUSES: {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
      OUT_OF_STOCK: 'out_of_stock',
      SEASONAL: 'seasonal',
      DISCONTINUED: 'discontinued',
    },
    NOTIFICATION_TYPES: {
      NEW_ORDER: 'new_order',
      ORDER_UPDATE: 'order_update',
      PAYMENT_RECEIVED: 'payment_received',
      LOW_STOCK: 'low_stock',
      SYSTEM_ALERT: 'system_alert',
      PROMOTION: 'promotion',
      MAINTENANCE: 'maintenance',
    },
    ORDER_PRIORITIES: {
      LOW: 'low',
      NORMAL: 'normal',
      HIGH: 'high',
      URGENT: 'urgent',
    },
    DELIVERY_ZONES: {
      LOCAL: 'local',
      EXTENDED: 'extended',
      PREMIUM: 'premium',
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
      PATTERN: /^\+?[\d\s\-\(\)]+$/,
    },
    EMAIL: {
      PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    PASSWORD: {
      MIN_LENGTH: 8,
      MAX_LENGTH: 128,
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
    ADDRESS: {
      STREET_MIN_LENGTH: 5,
      STREET_MAX_LENGTH: 200,
      CITY_MIN_LENGTH: 2,
      CITY_MAX_LENGTH: 100,
      ZIP_CODE_PATTERN: /^\d{5}(-\d{4})?$/,
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
    CATEGORY_CREATED: 'Category created successfully!',
    CATEGORY_UPDATED: 'Category updated successfully!',
    CATEGORY_DELETED: 'Category deleted successfully!',
    INVENTORY_UPDATED: 'Inventory updated successfully!',
    PAYMENT_PROCESSED: 'Payment processed successfully!',
    NOTIFICATION_SETTINGS_UPDATED: 'Notification settings updated!',
    IMAGE_UPLOADED: 'Image uploaded successfully!',
    DATA_EXPORTED: 'Data exported successfully!',
    PASSWORD_CHANGED: 'Password changed successfully!',
  },

  // Cache Configuration
  CACHE: {
    ENABLED: true,
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    LONG_TTL: 30 * 60 * 1000, // 30 minutes
    VERY_LONG_TTL: 24 * 60 * 60 * 1000, // 24 hours
    MAX_SIZE: 50, // Maximum number of cached items
    CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hour
  },

  // Performance Configuration
  PERFORMANCE: {
    IMAGE_COMPRESSION_QUALITY: 0.8,
    LAZY_LOADING_ENABLED: true,
    VIRTUAL_SCROLLING_ENABLED: true,
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    MAX_CONCURRENT_REQUESTS: 5,
    REQUEST_TIMEOUT: 30000,
    IMAGE_CACHE_SIZE: 100,
  },

  // Security Configuration
  SECURITY: {
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    PASSWORD_EXPIRY_DAYS: 90,
    REQUIRE_2FA: false,
    ENCRYPT_SENSITIVE_DATA: true,
    BIOMETRIC_AUTH: true,
    AUTO_LOGOUT: true,
    SECURE_STORAGE: true,
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
    PRIVACY_MODE: false,
    DEBUG_MODE: false,
  },

  // Localization Configuration
  LOCALIZATION: {
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko'],
    FALLBACK_LANGUAGE: 'en',
    DATE_FORMAT: 'MM/DD/YYYY',
    TIME_FORMAT: 'HH:mm',
    CURRENCY_FORMAT: 'USD',
    TIMEZONE: 'UTC',
    RTL_SUPPORT: false,
  },

  // Offline Configuration
  OFFLINE: {
    ENABLED: true,
    SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutes
    MAX_OFFLINE_ORDERS: 50,
    MAX_OFFLINE_DATA_SIZE: 10 * 1024 * 1024, // 10MB
    AUTO_SYNC_ON_CONNECT: true,
    CONFLICT_RESOLUTION: 'server_wins', // server_wins, client_wins, manual
    DATA_PRIORITY: ['orders', 'menu', 'analytics', 'settings'],
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
    QUIET_HOURS: { start: '22:00', end: '08:00' },
    CHANNELS: {
      ORDERS: { name: 'Orders', importance: 'high' },
      PAYMENTS: { name: 'Payments', importance: 'high' },
      SYSTEM: { name: 'System', importance: 'default' },
      PROMOTIONS: { name: 'Promotions', importance: 'low' },
    },
  },

  // Deep Linking Configuration
  DEEP_LINKING: {
    ENABLED: true,
    SCHEME: 'cravekitchen',
    HOST: 'vendor',
    PREFIXES: ['cravekitchen://', 'https://cravekitchen.com'],
    ROUTES: {
      ORDER: '/order/:id',
      MENU: '/menu/:id',
      ANALYTICS: '/analytics',
      SETTINGS: '/settings',
    },
  },

  // Environment Configuration
  ENVIRONMENT: {
    DEVELOPMENT: {
      API_BASE_URL: 'https://dev-api.cravekitchen.com/v1',
      LOG_LEVEL: 'debug',
      MOCK_DATA_ENABLED: true,
      ANALYTICS_DEBUG: true,
      ERROR_REPORTING: false,
    },
    STAGING: {
      API_BASE_URL: 'https://staging-api.cravekitchen.com/v1',
      LOG_LEVEL: 'info',
      MOCK_DATA_ENABLED: false,
      ANALYTICS_DEBUG: false,
      ERROR_REPORTING: true,
    },
    PRODUCTION: {
      API_BASE_URL: 'https://api.cravekitchen.com/v1',
      LOG_LEVEL: 'error',
      MOCK_DATA_ENABLED: false,
      ANALYTICS_DEBUG: false,
      ERROR_REPORTING: true,
    },
  },

  // Integration Configuration
  INTEGRATIONS: {
    PAYMENT_GATEWAYS: {
      STRIPE: {
        ENABLED: true,
        PUBLISHABLE_KEY: 'pk_test_...',
        SECRET_KEY: 'sk_test_...',
      },
      PAYPAL: {
        ENABLED: false,
        CLIENT_ID: '...',
        SECRET: '...',
      },
    },
    MAPPING_SERVICES: {
      GOOGLE_MAPS: {
        ENABLED: true,
        API_KEY: '...',
      },
      MAPBOX: {
        ENABLED: false,
        ACCESS_TOKEN: '...',
      },
    },
    STORAGE_SERVICES: {
      AWS_S3: {
        ENABLED: true,
        BUCKET: 'cravekitchen-vendor',
        REGION: 'us-east-1',
      },
      CLOUDINARY: {
        ENABLED: false,
        CLOUD_NAME: '...',
        API_KEY: '...',
      },
    },
  },
};

// Helper functions for configuration
export const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return APP_CONFIG.ENVIRONMENT[env.toUpperCase()] || APP_CONFIG.ENVIRONMENT.DEVELOPMENT;
};

export const isFeatureEnabled = (featureName) => {
  return APP_CONFIG.FEATURES[featureName] || false;
};

export const getApiBaseUrl = () => {
  const envConfig = getEnvironmentConfig();
  return envConfig.API_BASE_URL;
};

export const getLogLevel = () => {
  const envConfig = getEnvironmentConfig();
  return envConfig.LOG_LEVEL;
};

export const isMockDataEnabled = () => {
  const envConfig = getEnvironmentConfig();
  return envConfig.MOCK_DATA_ENABLED;
};

export const getValidationRule = (rulePath) => {
  const keys = rulePath.split('.');
  let result = APP_CONFIG.VALIDATION;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return null;
    }
  }
  
  return result;
};

export const getErrorMessage = (errorType) => {
  return APP_CONFIG.ERROR_MESSAGES[errorType] || APP_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const getSuccessMessage = (successType) => {
  return APP_CONFIG.SUCCESS_MESSAGES[successType] || 'Operation completed successfully!';
};

export const getCacheTTL = (cacheType = 'DEFAULT') => {
  const ttlMap = {
    DEFAULT: APP_CONFIG.CACHE.DEFAULT_TTL,
    LONG: APP_CONFIG.CACHE.LONG_TTL,
    VERY_LONG: APP_CONFIG.CACHE.VERY_LONG_TTL,
  };
  return ttlMap[cacheType] || APP_CONFIG.CACHE.DEFAULT_TTL;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isStaging = () => {
  return process.env.NODE_ENV === 'staging';
};

export default APP_CONFIG; 