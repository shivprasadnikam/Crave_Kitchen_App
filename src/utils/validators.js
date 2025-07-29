// Validation utilities

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  return {
    isValid: true,
    message: '',
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long',
    };
  }
  return {
    isValid: true,
    message: '',
  };
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return {
      isValid: false,
      message: 'Please enter a valid number',
    };
  }
  
  if (min !== null && num < min) {
    return {
      isValid: false,
      message: `Value must be at least ${min}`,
    };
  }
  
  if (max !== null && num > max) {
    return {
      isValid: false,
      message: `Value must be no more than ${max}`,
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
}; 