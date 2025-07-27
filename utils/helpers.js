import { Platform } from 'react-native';
import { APP_CONSTANTS } from '../config/constants';

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Generate a random string
 * @param {number} length - The length of the string
 * @returns {string} - Random string
 */
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Generate a UUID v4
 * @returns {string} - UUID v4 string
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Check if device is iOS
 * @returns {boolean} - True if iOS
 */
export const isIOS = () => {
  return Platform.OS === 'ios';
};

/**
 * Check if device is Android
 * @returns {boolean} - True if Android
 */
export const isAndroid = () => {
  return Platform.OS === 'android';
};

/**
 * Check if device is web
 * @returns {boolean} - True if web
 */
export const isWeb = () => {
  return Platform.OS === 'web';
};

/**
 * Get device type
 * @returns {string} - Device type (ios, android, web)
 */
export const getDeviceType = () => {
  return Platform.OS;
};

/**
 * Check if value is null or undefined
 * @param {*} value - Value to check
 * @returns {boolean} - True if null or undefined
 */
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} - True if empty
 */
export const isEmpty = (value) => {
  if (isNullOrUndefined(value)) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if value is not empty
 * @param {*} value - Value to check
 * @returns {boolean} - True if not empty
 */
export const isNotEmpty = (value) => {
  return !isEmpty(value);
};

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

/**
 * Merge objects deeply
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 */
export const deepMerge = (...objects) => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
};

/**
 * Check if value is an object
 * @param {*} value - Value to check
 * @returns {boolean} - True if object
 */
export const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Get nested object property safely
 * @param {Object} obj - Object to get property from
 * @param {string} path - Property path (e.g., 'user.profile.name')
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} - Property value or default value
 */
export const getNestedProperty = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result;
};

/**
 * Set nested object property safely
 * @param {Object} obj - Object to set property on
 * @param {string} path - Property path (e.g., 'user.profile.name')
 * @param {*} value - Value to set
 * @returns {Object} - Modified object
 */
export const setNestedProperty = (obj, path, value) => {
  const keys = path.split('.');
  const result = deepClone(obj);
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
};

/**
 * Remove nested object property safely
 * @param {Object} obj - Object to remove property from
 * @param {string} path - Property path (e.g., 'user.profile.name')
 * @returns {Object} - Modified object
 */
export const removeNestedProperty = (obj, path) => {
  const keys = path.split('.');
  const result = deepClone(obj);
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || !isObject(current[key])) {
      return result;
    }
    current = current[key];
  }
  
  delete current[keys[keys.length - 1]];
  return result;
};

/**
 * Pick specific properties from an object
 * @param {Object} obj - Object to pick from
 * @param {Array} keys - Array of keys to pick
 * @returns {Object} - Object with picked properties
 */
export const pick = (obj, keys) => {
  const result = {};
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omit specific properties from an object
 * @param {Object} obj - Object to omit from
 * @param {Array} keys - Array of keys to omit
 * @returns {Object} - Object without omitted properties
 */
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Capitalize first letter of each word in a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeWords = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Convert string to camelCase
 * @param {string} str - String to convert
 * @returns {string} - camelCase string
 */
export const toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

/**
 * Convert string to kebab-case
 * @param {string} str - String to convert
 * @returns {string} - kebab-case string
 */
export const toKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Convert string to snake_case
 * @param {string} str - String to convert
 * @returns {string} - snake_case string
 */
export const toSnakeCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

/**
 * Convert string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} - PascalCase string
 */
export const toPascalCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
    return word.toUpperCase();
  }).replace(/\s+/g, '');
};

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated string
 */
export const truncate = (str, length, suffix = '...') => {
  if (typeof str !== 'string') return str;
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} - Formatted currency
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (value, decimals = 2) => {
  if (typeof value !== 'number') return value;
  return `${value.toFixed(decimals)}%`;
};

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after sleep
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} baseDelay - Base delay in milliseconds (default: 1000)
 * @returns {Promise} - Promise that resolves with function result
 */
export const retry = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
};

/**
 * Check if two arrays are equal
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {boolean} - True if arrays are equal
 */
export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

/**
 * Remove duplicates from array
 * @param {Array} arr - Array to remove duplicates from
 * @returns {Array} - Array without duplicates
 */
export const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

/**
 * Shuffle array
 * @param {Array} arr - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Group array by key
 * @param {Array} arr - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} - Grouped object
 */
export const groupBy = (arr, key) => {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

/**
 * Sort array by key
 * @param {Array} arr - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Sort order ('asc' or 'desc', default: 'asc')
 * @returns {Array} - Sorted array
 */
export const sortBy = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const validateEmail = (email) => {
  return APP_CONSTANTS.VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone number
 */
export const validatePhone = (phone) => {
  return APP_CONSTANTS.VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const validateUrl = (url) => {
  return APP_CONSTANTS.VALIDATION.URL_REGEX.test(url);
};

/**
 * Validate ZIP code format
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} - True if valid ZIP code
 */
export const validateZipCode = (zipCode) => {
  return APP_CONSTANTS.VALIDATION.ZIP_CODE_REGEX.test(zipCode);
};

/**
 * Validate credit card format
 * @param {string} cardNumber - Credit card number to validate
 * @returns {boolean} - True if valid credit card number
 */
export const validateCreditCard = (cardNumber) => {
  return APP_CONSTANTS.VALIDATION.CREDIT_CARD_REGEX.test(cardNumber);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  const minLength = APP_CONSTANTS.SETTINGS.PASSWORD_MIN_LENGTH;
  const maxLength = APP_CONSTANTS.SETTINGS.PASSWORD_MAX_LENGTH;
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (password.length > maxLength) {
    errors.push(`Password must be no more than ${maxLength} characters long`);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Calculate password strength score
 * @param {string} password - Password to evaluate
 * @returns {string} - Strength level (weak, medium, strong, very_strong)
 */
export const calculatePasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  
  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  if (score <= 4) return 'strong';
  return 'very_strong';
};

/**
 * Format file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if string contains only numbers
 * @param {string} str - String to check
 * @returns {boolean} - True if only numbers
 */
export const isNumeric = (str) => {
  return APP_CONSTANTS.VALIDATION.NUMERIC_REGEX.test(str);
};

/**
 * Check if string is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string contains only letters and spaces
 * @param {string} str - String to check
 * @returns {boolean} - True if only letters and spaces
 */
export const isAlpha = (str) => {
  return APP_CONSTANTS.VALIDATION.ALPHA_REGEX.test(str);
};

/**
 * Check if string contains only letters and numbers
 * @param {string} str - String to check
 * @returns {boolean} - True if only letters and numbers
 */
export const isAlphanumeric = (str) => {
  return APP_CONSTANTS.VALIDATION.ALPHANUMERIC_REGEX.test(str);
};

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a random color in hex format
 * @returns {string} - Random hex color
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Check if a date is today
 * @param {Date} date - Date to check
 * @returns {boolean} - True if date is today
 */
export const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is yesterday
 * @param {Date} date - Date to check
 * @returns {boolean} - True if date is yesterday
 */
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

/**
 * Check if a date is this week
 * @param {Date} date - Date to check
 * @returns {boolean} - True if date is this week
 */
export const isThisWeek = (date) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return date >= startOfWeek && date <= endOfWeek;
};

/**
 * Check if a date is this month
 * @param {Date} date - Date to check
 * @returns {boolean} - True if date is this month
 */
export const isThisMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

/**
 * Get the start of day for a date
 * @param {Date} date - Date to get start of day for
 * @returns {Date} - Start of day date
 */
export const startOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Get the end of day for a date
 * @param {Date} date - Date to get end of day for
 * @returns {Date} - End of day date
 */
export const endOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * Add days to a date
 * @param {Date} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 * Subtract days from a date
 * @param {Date} date - Base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} - New date
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Get the difference in days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} - Difference in days
 */
export const daysDifference = (date1, date2) => {
  const timeDiff = date2.getTime() - date1.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Format a date relative to now
 * @param {Date} date - Date to format
 * @returns {string} - Relative date string
 */
export const formatRelativeDate = (date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  
  const diff = daysDifference(date, new Date());
  if (diff < 7) return `${Math.abs(diff)} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
  return `${Math.floor(diff / 365)} years ago`;
};

/**
 * Check if a value is a valid date
 * @param {*} value - Value to check
 * @returns {boolean} - True if valid date
 */
export const isValidDate = (value) => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date);
};

/**
 * Get the current timestamp
 * @returns {number} - Current timestamp
 */
export const getCurrentTimestamp = () => {
  return Date.now();
};

/**
 * Get the current timestamp in seconds
 * @returns {number} - Current timestamp in seconds
 */
export const getCurrentTimestampSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

/**
 * Convert timestamp to date
 * @param {number} timestamp - Timestamp to convert
 * @returns {Date} - Date object
 */
export const timestampToDate = (timestamp) => {
  return new Date(timestamp);
};

/**
 * Convert date to timestamp
 * @param {Date} date - Date to convert
 * @returns {number} - Timestamp
 */
export const dateToTimestamp = (date) => {
  return date.getTime();
};

/**
 * Check if a value is a function
 * @param {*} value - Value to check
 * @returns {boolean} - True if function
 */
export const isFunction = (value) => {
  return typeof value === 'function';
};

/**
 * Check if a value is a string
 * @param {*} value - Value to check
 * @returns {boolean} - True if string
 */
export const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Check if a value is a number
 * @param {*} value - Value to check
 * @returns {boolean} - True if number
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Check if a value is a boolean
 * @param {*} value - Value to check
 * @returns {boolean} - True if boolean
 */
export const isBoolean = (value) => {
  return typeof value === 'boolean';
};

/**
 * Check if a value is an array
 * @param {*} value - Value to check
 * @returns {boolean} - True if array
 */
export const isArray = (value) => {
  return Array.isArray(value);
};

/**
 * Get the type of a value
 * @param {*} value - Value to get type of
 * @returns {string} - Type string
 */
export const getType = (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

/**
 * Safely parse JSON
 * @param {string} jsonString - JSON string to parse
 * @param {*} defaultValue - Default value if parsing fails
 * @returns {*} - Parsed value or default value
 */
export const safeJsonParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Safely stringify JSON
 * @param {*} value - Value to stringify
 * @param {string} defaultValue - Default value if stringifying fails
 * @returns {string} - JSON string or default value
 */
export const safeJsonStringify = (value, defaultValue = '{}') => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Create a memoized function
 * @param {Function} fn - Function to memoize
 * @returns {Function} - Memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Create a function that can only be called once
 * @param {Function} fn - Function to make callable once
 * @returns {Function} - Function that can only be called once
 */
export const once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};

export default {
  debounce,
  throttle,
  generateRandomString,
  generateUniqueId,
  generateUUID,
  isIOS,
  isAndroid,
  isWeb,
  getDeviceType,
  isNullOrUndefined,
  isEmpty,
  isNotEmpty,
  deepClone,
  deepMerge,
  isObject,
  getNestedProperty,
  setNestedProperty,
  removeNestedProperty,
  pick,
  omit,
  capitalize,
  capitalizeWords,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  truncate,
  formatNumber,
  formatCurrency,
  formatPercentage,
  sleep,
  retry,
  arraysEqual,
  removeDuplicates,
  shuffleArray,
  groupBy,
  sortBy,
  validateEmail,
  validatePhone,
  validateUrl,
  validateZipCode,
  validateCreditCard,
  validatePassword,
  calculatePasswordStrength,
  formatFileSize,
  getInitials,
  isNumeric,
  isValidUrl,
  isAlpha,
  isAlphanumeric,
  randomNumber,
  randomColor,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  startOfDay,
  endOfDay,
  addDays,
  subtractDays,
  daysDifference,
  formatRelativeDate,
  isValidDate,
  getCurrentTimestamp,
  getCurrentTimestampSeconds,
  timestampToDate,
  dateToTimestamp,
  isFunction,
  isString,
  isNumber,
  isBoolean,
  isArray,
  getType,
  safeJsonParse,
  safeJsonStringify,
  memoize,
  once,
}; 