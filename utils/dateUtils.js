import { APP_CONSTANTS } from '../config/constants';

/**
 * Format date to display format
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type (default: 'display')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'display') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  const formats = {
    display: 'MMM dd, yyyy',
    displayWithTime: 'MMM dd, yyyy HH:mm',
    api: 'yyyy-MM-dd',
    apiWithTime: 'yyyy-MM-dd HH:mm:ss',
    timeOnly: 'HH:mm',
    time12H: 'hh:mm a',
    short: 'MM/dd/yyyy',
    long: 'EEEE, MMMM dd, yyyy',
    iso: 'yyyy-MM-ddTHH:mm:ss.SSSZ',
  };
  
  const selectedFormat = formats[format] || formats.display;
  
  // Simple date formatting (you can use a library like date-fns for more robust formatting)
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  
  switch (selectedFormat) {
    case 'MMM dd, yyyy':
      return `${monthNames[month]} ${day.toString().padStart(2, '0')}, ${year}`;
    
    case 'MMM dd, yyyy HH:mm':
      return `${monthNames[month]} ${day.toString().padStart(2, '0')}, ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    case 'yyyy-MM-dd':
      return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    case 'yyyy-MM-dd HH:mm:ss':
      return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    
    case 'HH:mm':
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    case 'hh:mm a':
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    case 'MM/dd/yyyy':
      return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    
    case 'EEEE, MMMM dd, yyyy':
      return `${dayNames[dateObj.getDay()]}, ${fullMonthNames[month]} ${day}, ${year}`;
    
    default:
      return dateObj.toISOString();
  }
};

/**
 * Get current date in specified format
 * @param {string} format - Format type
 * @returns {string} - Formatted current date
 */
export const getCurrentDate = (format = 'api') => {
  return formatDate(new Date(), format);
};

/**
 * Get date from timestamp
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - Format type
 * @returns {string} - Formatted date
 */
export const getDateFromTimestamp = (timestamp, format = 'display') => {
  return formatDate(new Date(timestamp * 1000), format);
};

/**
 * Get timestamp from date
 * @param {Date|string} date - Date to convert
 * @returns {number} - Unix timestamp
 */
export const getTimestampFromDate = (date) => {
  if (!date) return 0;
  return Math.floor(new Date(date).getTime() / 1000);
};

/**
 * Add days to date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Subtract days from date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} - New date
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Add months to date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} - New date
 */
export const addMonths = (date, months) => {
  const dateObj = new Date(date);
  dateObj.setMonth(dateObj.getMonth() + months);
  return dateObj;
};

/**
 * Subtract months from date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to subtract
 * @returns {Date} - New date
 */
export const subtractMonths = (date, months) => {
  return addMonths(date, -months);
};

/**
 * Add years to date
 * @param {Date|string} date - Base date
 * @param {number} years - Number of years to add
 * @returns {Date} - New date
 */
export const addYears = (date, years) => {
  const dateObj = new Date(date);
  dateObj.setFullYear(dateObj.getFullYear() + years);
  return dateObj;
};

/**
 * Subtract years from date
 * @param {Date|string} date - Base date
 * @param {number} years - Number of years to subtract
 * @returns {Date} - New date
 */
export const subtractYears = (date, years) => {
  return addYears(date, -years);
};

/**
 * Get start of day
 * @param {Date|string} date - Date to get start of day for
 * @returns {Date} - Start of day date
 */
export const getStartOfDay = (date) => {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

/**
 * Get end of day
 * @param {Date|string} date - Date to get end of day for
 * @returns {Date} - End of day date
 */
export const getEndOfDay = (date) => {
  const dateObj = new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
};

/**
 * Get start of week
 * @param {Date|string} date - Date to get start of week for
 * @param {number} startDay - Start day of week (0 = Sunday, 1 = Monday, etc.)
 * @returns {Date} - Start of week date
 */
export const getStartOfWeek = (date, startDay = 0) => {
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  const diff = dateObj.getDate() - day + (day === 0 ? -6 : startDay);
  dateObj.setDate(diff);
  return getStartOfDay(dateObj);
};

/**
 * Get end of week
 * @param {Date|string} date - Date to get end of week for
 * @param {number} startDay - Start day of week
 * @returns {Date} - End of week date
 */
export const getEndOfWeek = (date, startDay = 0) => {
  const startOfWeek = getStartOfWeek(date, startDay);
  return getEndOfDay(addDays(startOfWeek, 6));
};

/**
 * Get start of month
 * @param {Date|string} date - Date to get start of month for
 * @returns {Date} - Start of month date
 */
export const getStartOfMonth = (date) => {
  const dateObj = new Date(date);
  dateObj.setDate(1);
  return getStartOfDay(dateObj);
};

/**
 * Get end of month
 * @param {Date|string} date - Date to get end of month for
 * @returns {Date} - End of month date
 */
export const getEndOfMonth = (date) => {
  const dateObj = new Date(date);
  dateObj.setMonth(dateObj.getMonth() + 1, 0);
  return getEndOfDay(dateObj);
};

/**
 * Get start of year
 * @param {Date|string} date - Date to get start of year for
 * @returns {Date} - Start of year date
 */
export const getStartOfYear = (date) => {
  const dateObj = new Date(date);
  dateObj.setMonth(0, 1);
  return getStartOfDay(dateObj);
};

/**
 * Get end of year
 * @param {Date|string} date - Date to get end of year for
 * @returns {Date} - End of year date
 */
export const getEndOfYear = (date) => {
  const dateObj = new Date(date);
  dateObj.setMonth(11, 31);
  return getEndOfDay(dateObj);
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is today
 */
export const isToday = (date) => {
  const today = new Date();
  const dateObj = new Date(date);
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is yesterday
 */
export const isYesterday = (date) => {
  const yesterday = subtractDays(new Date(), 1);
  const dateObj = new Date(date);
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if date is tomorrow
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is tomorrow
 */
export const isTomorrow = (date) => {
  const tomorrow = addDays(new Date(), 1);
  const dateObj = new Date(date);
  return (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is in the past
 */
export const isPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is in the future
 */
export const isFuture = (date) => {
  return new Date(date) > new Date();
};

/**
 * Get difference between two dates in days
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} - Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const timeDiff = new Date(date2).getTime() - new Date(date1).getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Get difference between two dates in hours
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} - Difference in hours
 */
export const getHoursDifference = (date1, date2) => {
  const timeDiff = new Date(date2).getTime() - new Date(date1).getTime();
  return Math.ceil(timeDiff / (1000 * 3600));
};

/**
 * Get difference between two dates in minutes
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} - Difference in minutes
 */
export const getMinutesDifference = (date1, date2) => {
  const timeDiff = new Date(date2).getTime() - new Date(date1).getTime();
  return Math.ceil(timeDiff / (1000 * 60));
};

/**
 * Get age from birth date
 * @param {Date|string} birthDate - Birth date
 * @returns {number} - Age in years
 */
export const getAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Check if date is within date range
 * @param {Date|string} date - Date to check
 * @param {Date|string} startDate - Start date of range
 * @param {Date|string} endDate - End date of range
 * @returns {boolean} - True if date is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const dateObj = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return dateObj >= start && dateObj <= end;
};

/**
 * Get week number of year
 * @param {Date|string} date - Date to get week number for
 * @returns {number} - Week number (1-53)
 */
export const getWeekNumber = (date) => {
  const dateObj = new Date(date);
  const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
  const pastDaysOfYear = (dateObj - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * Get month name
 * @param {Date|string} date - Date to get month name for
 * @param {boolean} full - Whether to return full name (default: false)
 * @returns {string} - Month name
 */
export const getMonthName = (date, full = false) => {
  const dateObj = new Date(date);
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return full ? fullMonthNames[dateObj.getMonth()] : monthNames[dateObj.getMonth()];
};

/**
 * Get day name
 * @param {Date|string} date - Date to get day name for
 * @param {boolean} full - Whether to return full name (default: false)
 * @returns {string} - Day name
 */
export const getDayName = (date, full = false) => {
  const dateObj = new Date(date);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  
  return full ? fullDayNames[dateObj.getDay()] : dayNames[dateObj.getDay()];
};

export default {
  formatDate,
  getCurrentDate,
  getDateFromTimestamp,
  getTimestampFromDate,
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
  addYears,
  subtractYears,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  isToday,
  isYesterday,
  isTomorrow,
  isPast,
  isFuture,
  getDaysDifference,
  getHoursDifference,
  getMinutesDifference,
  getAge,
  isDateInRange,
  getWeekNumber,
  getMonthName,
  getDayName,
}; 