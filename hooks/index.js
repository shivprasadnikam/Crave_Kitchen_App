// Main hooks exports
export { useOrders } from './useOrders';
export { useMenu } from './useMenu';
export { useAnalytics } from './useAnalytics';
export { useInventory } from './useInventory';
export { useNotifications } from './useNotifications';
export { useVendorAuth } from './useVendorAuth';

// Hook utilities and helpers
export const createHookError = (message, code = 'UNKNOWN_ERROR') => ({
  message,
  code,
  timestamp: new Date().toISOString(),
});

export const createHookSuccess = (data, message = 'Operation successful') => ({
  data,
  message,
  timestamp: new Date().toISOString(),
});

// Hook constants
export const HOOK_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Hook validation utilities
export const validateRequiredFields = (data, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password),
  };
};

export const calculatePasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  
  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  if (strength <= 4) return 'strong';
  return 'very_strong';
};

// Hook formatting utilities
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMinutes = Math.floor((now - targetDate) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// Hook data processing utilities
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

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  const sorted = [...array].sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];
    
    // Handle nested properties
    if (key.includes('.')) {
      const keys = key.split('.');
      aValue = keys.reduce((obj, k) => obj?.[k], a);
      bValue = keys.reduce((obj, k) => obj?.[k], b);
    }
    
    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return aValue - bValue;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }
    
    return 0;
  });
  
  return order === 'desc' ? sorted.reverse() : sorted;
};

export const filterBy = (array, filters) => {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return true;
      }
      
      let itemValue = item[key];
      
      // Handle nested properties
      if (key.includes('.')) {
        const keys = key.split('.');
        itemValue = keys.reduce((obj, k) => obj?.[k], item);
      }
      
      // Handle different filter types
      if (typeof value === 'string') {
        return itemValue?.toLowerCase().includes(value.toLowerCase());
      }
      
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }
      
      if (typeof value === 'function') {
        return value(itemValue);
      }
      
      return itemValue === value;
    });
  });
};

// Hook storage utilities
export const storageKeys = {
  USER_PREFERENCES: 'user_preferences',
  CACHE_DATA: 'cache_data',
  SESSION_DATA: 'session_data',
  NOTIFICATION_SETTINGS: 'notification_settings',
  THEME_SETTINGS: 'theme_settings',
};

export const getStorageItem = async (key) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting storage item:', error);
    return null;
  }
};

export const setStorageItem = async (key, value) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting storage item:', error);
    return false;
  }
};

export const removeStorageItem = async (key) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing storage item:', error);
    return false;
  }
};

// Hook error handling utilities
export const handleHookError = (error, context = '') => {
  const errorMessage = error?.message || error?.toString() || 'An unknown error occurred';
  const errorCode = error?.code || 'UNKNOWN_ERROR';
  
  console.error(`Hook Error [${context}]:`, {
    message: errorMessage,
    code: errorCode,
    timestamp: new Date().toISOString(),
    stack: error?.stack,
  });
  
  return {
    message: errorMessage,
    code: errorCode,
    context,
    timestamp: new Date().toISOString(),
  };
};

// Hook performance utilities
export const measureHookPerformance = (hookName, callback) => {
  const startTime = performance.now();
  
  try {
    const result = callback();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`Hook Performance [${hookName}]: ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.error(`Hook Performance Error [${hookName}]: ${duration.toFixed(2)}ms`, error);
    throw error;
  }
};

// Hook composition utilities
export const composeHooks = (...hooks) => {
  return (props) => {
    const results = hooks.map(hook => hook(props));
    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
  };
};

export const withHookErrorBoundary = (hook, errorHandler) => {
  return (...args) => {
    try {
      return hook(...args);
    } catch (error) {
      const handledError = errorHandler ? errorHandler(error) : error;
      console.error('Hook Error Boundary:', handledError);
      return {
        error: handledError,
        isLoading: false,
        data: null,
      };
    }
  };
}; 