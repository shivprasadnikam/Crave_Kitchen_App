import { APP_CONSTANTS } from '../config/constants';

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @param {string} format - Format type ('US', 'international', 'simple')
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone, format = 'US') => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  if (format === 'US') {
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  } else if (format === 'international') {
    if (cleaned.length === 10) {
      return `+1 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
  }
  
  return phone; // Return original if can't format
};

/**
 * Format credit card number (masked)
 * @param {string} cardNumber - Credit card number to format
 * @param {boolean} masked - Whether to mask the number (default: true)
 * @returns {string} - Formatted credit card number
 */
export const formatCreditCard = (cardNumber, masked = true) => {
  if (!cardNumber) return '';
  
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (masked) {
    if (cleaned.length >= 4) {
      return `**** **** **** ${cleaned.slice(-4)}`;
    }
  } else {
    // Format without masking
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  }
  
  return cardNumber;
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format duration in seconds to human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted relative time
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

/**
 * Format order status for display
 * @param {string} status - Order status
 * @returns {string} - Formatted status
 */
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  
  return statusMap[status] || status;
};

/**
 * Format payment status for display
 * @param {string} status - Payment status
 * @returns {string} - Formatted status
 */
export const formatPaymentStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    refunded: 'Refunded',
  };
  
  return statusMap[status] || status;
};

/**
 * Format menu item status for display
 * @param {string} status - Menu item status
 * @returns {string} - Formatted status
 */
export const formatMenuItemStatus = (status) => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    out_of_stock: 'Out of Stock',
  };
  
  return statusMap[status] || status;
};

/**
 * Format address for display
 * @param {object} address - Address object
 * @returns {string} - Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [];
  
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.zipCode) parts.push(address.zipCode);
  if (address.country) parts.push(address.country);
  
  return parts.join(', ');
};

/**
 * Format name (first and last name)
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @param {string} format - Format type ('full', 'initials', 'first_last')
 * @returns {string} - Formatted name
 */
export const formatName = (firstName, lastName, format = 'full') => {
  if (!firstName && !lastName) return '';
  
  switch (format) {
    case 'initials':
      const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
      const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
      return `${firstInitial}${lastInitial}`;
    
    case 'first_last':
      return `${firstName || ''} ${lastName || ''}`.trim();
    
    case 'full':
    default:
      const parts = [];
      if (firstName) parts.push(firstName);
      if (lastName) parts.push(lastName);
      return parts.join(' ');
  }
};

/**
 * Format order items for display
 * @param {Array} items - Order items array
 * @param {number} maxItems - Maximum items to show (default: 3)
 * @returns {string} - Formatted items string
 */
export const formatOrderItems = (items, maxItems = 3) => {
  if (!items || items.length === 0) return 'No items';
  
  const itemNames = items.slice(0, maxItems).map(item => item.name);
  const formatted = itemNames.join(', ');
  
  if (items.length > maxItems) {
    const remaining = items.length - maxItems;
    return `${formatted} and ${remaining} more`;
  }
  
  return formatted;
};

/**
 * Format order total with items count
 * @param {number} total - Order total
 * @param {number} itemCount - Number of items
 * @returns {string} - Formatted total with count
 */
export const formatOrderTotal = (total, itemCount) => {
  const formattedTotal = formatCurrency(total);
  const itemText = itemCount === 1 ? 'item' : 'items';
  return `${formattedTotal} (${itemCount} ${itemText})`;
};

/**
 * Format rating with stars
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxRating - Maximum rating (default: 5)
 * @returns {string} - Formatted rating
 */
export const formatRating = (rating, maxRating = 5) => {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return 'No rating';
  }
  
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(maxRating - Math.floor(rating));
  return `${stars} ${rating.toFixed(1)}`;
};

/**
 * Format distance in meters to human readable format
 * @param {number} meters - Distance in meters
 * @returns {string} - Formatted distance
 */
export const formatDistance = (meters) => {
  if (!meters || meters < 0) return '0 m';
  
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else {
    const km = (meters / 1000).toFixed(1);
    return `${km} km`;
  }
};

/**
 * Format time in 12-hour format
 * @param {string} time - Time string (HH:mm)
 * @returns {string} - Formatted time
 */
export const formatTime12Hour = (time) => {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return time;
  }
};

/**
 * Format time in 24-hour format
 * @param {string} time - Time string (HH:mm)
 * @returns {string} - Formatted time
 */
export const formatTime24Hour = (time) => {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } catch {
    return time;
  }
};

/**
 * Format operating hours
 * @param {string} openTime - Opening time
 * @param {string} closeTime - Closing time
 * @returns {string} - Formatted operating hours
 */
export const formatOperatingHours = (openTime, closeTime) => {
  if (!openTime || !closeTime) return 'Closed';
  
  const formattedOpen = formatTime12Hour(openTime);
  const formattedClose = formatTime12Hour(closeTime);
  
  return `${formattedOpen} - ${formattedClose}`;
};

/**
 * Format notification message
 * @param {string} type - Notification type
 * @param {object} data - Notification data
 * @returns {string} - Formatted notification message
 */
export const formatNotificationMessage = (type, data) => {
  switch (type) {
    case 'new_order':
      return `New order #${data.orderId} received for $${formatCurrency(data.total)}`;
    
    case 'order_update':
      return `Order #${data.orderId} status updated to ${formatOrderStatus(data.status)}`;
    
    case 'payment_received':
      return `Payment of ${formatCurrency(data.amount)} received for order #${data.orderId}`;
    
    case 'low_stock':
      return `Low stock alert: ${data.itemName} (${data.quantity} remaining)`;
    
    case 'system_alert':
      return data.message || 'System notification';
    
    default:
      return 'Notification';
  }
};

export default {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatPhoneNumber,
  formatCreditCard,
  formatFileSize,
  formatDuration,
  formatRelativeTime,
  formatOrderStatus,
  formatPaymentStatus,
  formatMenuItemStatus,
  formatAddress,
  formatName,
  formatOrderItems,
  formatOrderTotal,
  formatRating,
  formatDistance,
  formatTime12Hour,
  formatTime24Hour,
  formatOperatingHours,
  formatNotificationMessage,
}; 