import { APP_CONSTANTS } from '../config/constants';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const validateEmail = (email) => {
  if (!email) return false;
  return APP_CONSTANTS.VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  return APP_CONSTANTS.VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < APP_CONSTANTS.VALIDATION.PASSWORD.MIN_LENGTH) {
    errors.push(`Password must be at least ${APP_CONSTANTS.VALIDATION.PASSWORD.MIN_LENGTH} characters long`);
  }
  
  if (APP_CONSTANTS.VALIDATION.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (APP_CONSTANTS.VALIDATION.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (APP_CONSTANTS.VALIDATION.PASSWORD.REQUIRE_NUMBER && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (APP_CONSTANTS.VALIDATION.PASSWORD.REQUIRE_SPECIAL && !/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate required field
 * @param {*} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateRequired = (value, fieldName) => {
  const isValid = value !== null && value !== undefined && value !== '';
  return {
    isValid,
    error: isValid ? null : `${fieldName} is required`,
  };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length required
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateMinLength = (value, minLength, fieldName) => {
  if (!value) return { isValid: true, error: null };
  
  const isValid = value.length >= minLength;
  return {
    isValid,
    error: isValid ? null : `${fieldName} must be at least ${minLength} characters long`,
  };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length allowed
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateMaxLength = (value, maxLength, fieldName) => {
  if (!value) return { isValid: true, error: null };
  
  const isValid = value.length <= maxLength;
  return {
    isValid,
    error: isValid ? null : `${fieldName} must be no more than ${maxLength} characters long`,
  };
};

/**
 * Validate numeric value
 * @param {*} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateNumeric = (value, fieldName) => {
  if (!value) return { isValid: true, error: null };
  
  const isValid = !isNaN(value) && isFinite(value);
  return {
    isValid,
    error: isValid ? null : `${fieldName} must be a valid number`,
  };
};

/**
 * Validate minimum value
 * @param {number} value - Value to validate
 * @param {number} minValue - Minimum value allowed
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateMinValue = (value, minValue, fieldName) => {
  if (!value) return { isValid: true, error: null };
  
  const isValid = value >= minValue;
  return {
    isValid,
    error: isValid ? null : `${fieldName} must be at least ${minValue}`,
  };
};

/**
 * Validate maximum value
 * @param {number} value - Value to validate
 * @param {number} maxValue - Maximum value allowed
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Validation result
 */
export const validateMaxValue = (value, maxValue, fieldName) => {
  if (!value) return { isValid: true, error: null };
  
  const isValid = value <= maxValue;
  return {
    isValid,
    error: isValid ? null : `${fieldName} must be no more than ${maxValue}`,
  };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const validateUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate date format
 * @param {string} date - Date string to validate
 * @param {string} format - Expected date format (default: 'YYYY-MM-DD')
 * @returns {boolean} - True if valid date
 */
export const validateDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

/**
 * Validate future date
 * @param {string} date - Date string to validate
 * @returns {boolean} - True if date is in the future
 */
export const validateFutureDate = (date) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

/**
 * Validate past date
 * @param {string} date - Date string to validate
 * @returns {boolean} - True if date is in the past
 */
export const validatePastDate = (date) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj < now;
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {object} - Validation result
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) return { isValid: true, error: null };
  
  const isValid = file.size <= maxSize;
  const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
  
  return {
    isValid,
    error: isValid ? null : `File size must be no more than ${maxSizeMB}MB`,
  };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {object} - Validation result
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) return { isValid: true, error: null };
  
  const isValid = allowedTypes.includes(file.type);
  return {
    isValid,
    error: isValid ? null : `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
  };
};

/**
 * Validate image dimensions
 * @param {File} file - Image file to validate
 * @param {number} minWidth - Minimum width in pixels
 * @param {number} minHeight - Minimum height in pixels
 * @returns {Promise<object>} - Validation result
 */
export const validateImageDimensions = (file, minWidth, minHeight) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ isValid: true, error: null });
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      const isValid = img.width >= minWidth && img.height >= minHeight;
      resolve({
        isValid,
        error: isValid ? null : `Image must be at least ${minWidth}x${minHeight} pixels`,
      });
    };
    img.onerror = () => {
      resolve({
        isValid: false,
        error: 'Invalid image file',
      });
    };
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - Credit card number to validate
 * @returns {boolean} - True if valid credit card number
 */
export const validateCreditCard = (cardNumber) => {
  if (!cardNumber) return false;
  
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  // Check if it's all digits
  if (!/^\d+$/.test(cleanNumber)) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate US ZIP code
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} - True if valid ZIP code
 */
export const validateZipCode = (zipCode) => {
  if (!zipCode) return false;
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

/**
 * Validate US phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid US phone number
 */
export const validateUSPhone = (phone) => {
  if (!phone) return false;
  return /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
};

/**
 * Validate form data
 * @param {object} formData - Form data to validate
 * @param {object} validationRules - Validation rules for each field
 * @returns {object} - Validation result with errors
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(fieldName => {
    const fieldValue = formData[fieldName];
    const rules = validationRules[fieldName];
    
    // Required validation
    if (rules.required) {
      const requiredValidation = validateRequired(fieldValue, fieldName);
      if (!requiredValidation.isValid) {
        errors[fieldName] = requiredValidation.error;
        isValid = false;
        return;
      }
    }
    
    // Skip other validations if field is empty and not required
    if (!fieldValue && !rules.required) {
      return;
    }
    
    // Email validation
    if (rules.email && !validateEmail(fieldValue)) {
      errors[fieldName] = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Phone validation
    if (rules.phone && !validatePhone(fieldValue)) {
      errors[fieldName] = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Min length validation
    if (rules.minLength) {
      const minLengthValidation = validateMinLength(fieldValue, rules.minLength, fieldName);
      if (!minLengthValidation.isValid) {
        errors[fieldName] = minLengthValidation.error;
        isValid = false;
      }
    }
    
    // Max length validation
    if (rules.maxLength) {
      const maxLengthValidation = validateMaxLength(fieldValue, rules.maxLength, fieldName);
      if (!maxLengthValidation.isValid) {
        errors[fieldName] = maxLengthValidation.error;
        isValid = false;
      }
    }
    
    // Numeric validation
    if (rules.numeric) {
      const numericValidation = validateNumeric(fieldValue, fieldName);
      if (!numericValidation.isValid) {
        errors[fieldName] = numericValidation.error;
        isValid = false;
      }
    }
    
    // Min value validation
    if (rules.minValue !== undefined) {
      const minValueValidation = validateMinValue(fieldValue, rules.minValue, fieldName);
      if (!minValueValidation.isValid) {
        errors[fieldName] = minValueValidation.error;
        isValid = false;
      }
    }
    
    // Max value validation
    if (rules.maxValue !== undefined) {
      const maxValueValidation = validateMaxValue(fieldValue, rules.maxValue, fieldName);
      if (!maxValueValidation.isValid) {
        errors[fieldName] = maxValueValidation.error;
        isValid = false;
      }
    }
    
    // URL validation
    if (rules.url && !validateUrl(fieldValue)) {
      errors[fieldName] = 'Please enter a valid URL';
      isValid = false;
    }
    
    // Custom validation
    if (rules.custom) {
      const customValidation = rules.custom(fieldValue, formData);
      if (!customValidation.isValid) {
        errors[fieldName] = customValidation.error;
        isValid = false;
      }
    }
  });
  
  return {
    isValid,
    errors,
  };
};

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumeric,
  validateMinValue,
  validateMaxValue,
  validateUrl,
  validateDate,
  validateFutureDate,
  validatePastDate,
  validateFileSize,
  validateFileType,
  validateImageDimensions,
  validateCreditCard,
  validateZipCode,
  validateUSPhone,
  validateForm,
}; 