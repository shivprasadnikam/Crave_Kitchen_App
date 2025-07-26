// Utility Constants
export const UTIL_CONSTANTS = {
  // Validation Constants
  VALIDATION: {
    // Email validation
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_MAX_LENGTH: 254,
    
    // Password validation
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    
    // Phone validation
    PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,15}$/,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
    
    // Name validation
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    NAME_REGEX: /^[a-zA-Z\s\-']+$/,
    
    // Address validation
    ADDRESS_MIN_LENGTH: 10,
    ADDRESS_MAX_LENGTH: 200,
    
    // Business validation
    BUSINESS_NAME_MIN_LENGTH: 2,
    BUSINESS_NAME_MAX_LENGTH: 100,
    
    // Menu item validation
    ITEM_NAME_MIN_LENGTH: 2,
    ITEM_NAME_MAX_LENGTH: 100,
    ITEM_DESCRIPTION_MAX_LENGTH: 500,
    ITEM_PRICE_MIN: 0.01,
    ITEM_PRICE_MAX: 9999.99,
    
    // Order validation
    ORDER_NUMBER_REGEX: /^ORD-[A-Z0-9]{8}$/,
    
    // File validation
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  
  // Formatting Constants
  FORMATTING: {
    // Date formats
    DATE_FORMAT: 'YYYY-MM-DD',
    TIME_FORMAT: 'HH:mm:ss',
    DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    DISPLAY_DATE_FORMAT: 'MMM DD, YYYY',
    DISPLAY_TIME_FORMAT: 'HH:mm',
    DISPLAY_DATETIME_FORMAT: 'MMM DD, YYYY HH:mm',
    
    // Currency formats
    DEFAULT_CURRENCY: 'USD',
    DEFAULT_LOCALE: 'en-US',
    CURRENCY_DECIMALS: 2,
    
    // Number formats
    NUMBER_DECIMALS: 2,
    PERCENTAGE_DECIMALS: 2,
    
    // Text formatting
    MAX_TITLE_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 200,
    TRUNCATE_SUFFIX: '...',
    
    // File size formatting
    FILE_SIZE_UNITS: ['B', 'KB', 'MB', 'GB', 'TB'],
    FILE_SIZE_THRESHOLD: 1024,
  },
  
  // Time Constants
  TIME: {
    // Time intervals (in milliseconds)
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000,
    YEAR: 365 * 24 * 60 * 60 * 1000,
    
    // Debounce and throttle delays
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    SEARCH_DELAY: 500,
    API_RETRY_DELAY: 1000,
    
    // Cache expiration times
    CACHE_SHORT: 5 * 60 * 1000, // 5 minutes
    CACHE_MEDIUM: 30 * 60 * 1000, // 30 minutes
    CACHE_LONG: 24 * 60 * 60 * 1000, // 24 hours
    CACHE_VERY_LONG: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // API Constants
  API: {
    // Request timeouts
    TIMEOUT_SHORT: 5000,
    TIMEOUT_MEDIUM: 10000,
    TIMEOUT_LONG: 30000,
    
    // Retry settings
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    RETRY_BACKOFF_MULTIPLIER: 2,
    
    // Pagination
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
    
    // Rate limiting
    RATE_LIMIT_WINDOW: 60000, // 1 minute
    RATE_LIMIT_MAX_REQUESTS: 100,
  },
  
  // UI Constants
  UI: {
    // Animation durations
    ANIMATION_FAST: 200,
    ANIMATION_NORMAL: 300,
    ANIMATION_SLOW: 500,
    
    // Touch targets
    MIN_TOUCH_TARGET: 44,
    MIN_BUTTON_HEIGHT: 48,
    
    // Spacing
    SPACING_XS: 4,
    SPACING_SM: 8,
    SPACING_MD: 16,
    SPACING_LG: 24,
    SPACING_XL: 32,
    SPACING_XXL: 48,
    
    // Border radius
    BORDER_RADIUS_SM: 4,
    BORDER_RADIUS_MD: 8,
    BORDER_RADIUS_LG: 12,
    BORDER_RADIUS_XL: 16,
    BORDER_RADIUS_ROUND: 50,
    
    // Shadows
    SHADOW_SM: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    SHADOW_MD: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    SHADOW_LG: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  
  // Business Logic Constants
  BUSINESS: {
    // Order processing
    ORDER_AUTO_CANCEL_TIME: 15 * 60 * 1000, // 15 minutes
    ORDER_PREPARATION_TIME: 20 * 60 * 1000, // 20 minutes
    ORDER_DELIVERY_TIME: 45 * 60 * 1000, // 45 minutes
    
    // Inventory
    LOW_STOCK_THRESHOLD: 10,
    CRITICAL_STOCK_THRESHOLD: 5,
    EXPIRY_WARNING_DAYS: 7,
    
    // Pricing
    MIN_ORDER_AMOUNT: 5.00,
    MAX_ORDER_AMOUNT: 500.00,
    DEFAULT_TAX_RATE: 0.08, // 8%
    DEFAULT_TIP_RATE: 0.15, // 15%
    
    // Operating hours
    DEFAULT_OPEN_TIME: '08:00',
    DEFAULT_CLOSE_TIME: '22:00',
    BREAK_START_TIME: '14:00',
    BREAK_END_TIME: '16:00',
    
    // Notifications
    NOTIFICATION_RETENTION_DAYS: 30,
    PUSH_NOTIFICATION_BATCH_SIZE: 10,
    
    // Analytics
    ANALYTICS_RETENTION_DAYS: 365,
    DASHBOARD_REFRESH_INTERVAL: 30 * 1000, // 30 seconds
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    // Network errors
    NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    
    // Validation errors
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    INVALID_AMOUNT: 'Please enter a valid amount.',
    INVALID_DATE: 'Please enter a valid date.',
    
    // Business errors
    INSUFFICIENT_STOCK: 'Insufficient stock available.',
    ORDER_NOT_FOUND: 'Order not found.',
    ITEM_NOT_FOUND: 'Menu item not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    
    // File errors
    FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
    INVALID_FILE_TYPE: 'Invalid file type.',
    UPLOAD_FAILED: 'File upload failed. Please try again.',
    
    // General errors
    UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
    OPERATION_FAILED: 'Operation failed. Please try again.',
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    // Auth
    LOGIN_SUCCESS: 'Successfully logged in.',
    LOGOUT_SUCCESS: 'Successfully logged out.',
    REGISTRATION_SUCCESS: 'Account created successfully.',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    
    // Orders
    ORDER_CREATED: 'Order created successfully.',
    ORDER_UPDATED: 'Order updated successfully.',
    ORDER_CANCELLED: 'Order cancelled successfully.',
    ORDER_STATUS_UPDATED: 'Order status updated successfully.',
    
    // Menu
    ITEM_ADDED: 'Menu item added successfully.',
    ITEM_UPDATED: 'Menu item updated successfully.',
    ITEM_DELETED: 'Menu item deleted successfully.',
    CATEGORY_ADDED: 'Category added successfully.',
    CATEGORY_UPDATED: 'Category updated successfully.',
    CATEGORY_DELETED: 'Category deleted successfully.',
    
    // Inventory
    STOCK_UPDATED: 'Stock updated successfully.',
    ITEM_RESTOCKED: 'Item restocked successfully.',
    
    // Settings
    SETTINGS_SAVED: 'Settings saved successfully.',
    NOTIFICATION_SETTINGS_UPDATED: 'Notification settings updated successfully.',
    
    // File operations
    FILE_UPLOADED: 'File uploaded successfully.',
    FILE_DELETED: 'File deleted successfully.',
  },
  
  // Regex Patterns
  REGEX: {
    // Email patterns
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_STRICT: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // Phone patterns
    PHONE_US: /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    PHONE_INTERNATIONAL: /^\+?[\d\s\-\(\)]{10,15}$/,
    
    // Password patterns
    PASSWORD_WEAK: /^.{8,}$/,
    PASSWORD_MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    
    // Name patterns
    NAME: /^[a-zA-Z\s\-']+$/,
    NAME_STRICT: /^[a-zA-Z\s\-']{2,50}$/,
    
    // URL patterns
    URL: /^https?:\/\/.+/,
    URL_STRICT: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    
    // Credit card patterns
    CREDIT_CARD: /^(\d{4}[- ]?){4}$/,
    CVV: /^\d{3,4}$/,
    EXPIRY_DATE: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    
    // Currency patterns
    CURRENCY: /^\d+(\.\d{1,2})?$/,
    CURRENCY_STRICT: /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/,
    
    // Date patterns
    DATE_ISO: /^\d{4}-\d{2}-\d{2}$/,
    DATE_US: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    TIME_24H: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    
    // Order number patterns
    ORDER_NUMBER: /^ORD-[A-Z0-9]{8}$/,
    INVOICE_NUMBER: /^INV-[A-Z0-9]{8}$/,
    
    // File extension patterns
    IMAGE_EXTENSIONS: /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i,
    DOCUMENT_EXTENSIONS: /\.(pdf|doc|docx|txt|rtf)$/i,
    VIDEO_EXTENSIONS: /\.(mp4|avi|mov|wmv|flv|webm)$/i,
  },
  
  // File Types
  FILE_TYPES: {
    IMAGES: {
      JPEG: 'image/jpeg',
      PNG: 'image/png',
      GIF: 'image/gif',
      WEBP: 'image/webp',
      BMP: 'image/bmp',
      SVG: 'image/svg+xml',
    },
    DOCUMENTS: {
      PDF: 'application/pdf',
      DOC: 'application/msword',
      DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      TXT: 'text/plain',
      RTF: 'application/rtf',
    },
    VIDEOS: {
      MP4: 'video/mp4',
      AVI: 'video/x-msvideo',
      MOV: 'video/quicktime',
      WMV: 'video/x-ms-wmv',
      FLV: 'video/x-flv',
      WEBM: 'video/webm',
    },
  },
  
  // MIME Types
  MIME_TYPES: {
    // Images
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/bmp': '.bmp',
    'image/svg+xml': '.svg',
    
    // Documents
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    
    // Videos
    'video/mp4': '.mp4',
    'video/x-msvideo': '.avi',
    'video/quicktime': '.mov',
    'video/x-ms-wmv': '.wmv',
    'video/x-flv': '.flv',
    'video/webm': '.webm',
  },
  
  // Status Codes
  STATUS_CODES: {
    // HTTP Status Codes
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    
    // Custom Status Codes
    VALIDATION_ERROR: 422,
    RATE_LIMIT_EXCEEDED: 429,
    MAINTENANCE_MODE: 503,
  },
  
  // Environment Constants
  ENVIRONMENT: {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
    TESTING: 'testing',
  },
  
  // Platform Constants
  PLATFORM: {
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
  },
  
  // Theme Constants
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
  
  // Language Constants
  LANGUAGE: {
    ENGLISH: 'en',
    SPANISH: 'es',
    FRENCH: 'fr',
    GERMAN: 'de',
    CHINESE: 'zh',
    JAPANESE: 'ja',
    KOREAN: 'ko',
    ARABIC: 'ar',
    HINDI: 'hi',
    PORTUGUESE: 'pt',
  },
  
  // Currency Constants
  CURRENCY: {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    JPY: 'JPY',
    CAD: 'CAD',
    AUD: 'AUD',
    CHF: 'CHF',
    CNY: 'CNY',
    INR: 'INR',
    BRL: 'BRL',
    MXN: 'MXN',
    KRW: 'KRW',
    RUB: 'RUB',
    ZAR: 'ZAR',
    SEK: 'SEK',
    NOK: 'NOK',
    DKK: 'DKK',
    PLN: 'PLN',
    CZK: 'CZK',
    HUF: 'HUF',
  },
  
  // Notification Types
  NOTIFICATION_TYPES: {
    ORDER: 'order',
    PAYMENT: 'payment',
    INVENTORY: 'inventory',
    SYSTEM: 'system',
    PROMOTION: 'promotion',
    SECURITY: 'security',
  },
  
  // Order Types
  ORDER_TYPES: {
    DINE_IN: 'dine_in',
    TAKEAWAY: 'takeaway',
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
  },
  
  // Payment Methods
  PAYMENT_METHODS: {
    CASH: 'cash',
    CARD: 'card',
    DIGITAL_WALLET: 'digital_wallet',
    BANK_TRANSFER: 'bank_transfer',
    CRYPTO: 'crypto',
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
};

// Export individual constants for easier access
export const {
  VALIDATION,
  FORMATTING,
  TIME,
  API,
  UI,
  BUSINESS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX,
  FILE_TYPES,
  MIME_TYPES,
  STATUS_CODES,
  ENVIRONMENT,
  PLATFORM,
  THEME,
  LANGUAGE,
  CURRENCY,
  NOTIFICATION_TYPES,
  ORDER_TYPES,
  PAYMENT_METHODS,
  MENU_CATEGORIES,
} = UTIL_CONSTANTS; 