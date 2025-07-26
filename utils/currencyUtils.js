import { APP_CONSTANTS } from '../config/constants';

/**
 * Format currency amount with symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @param {object} options - Formatting options
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US', options = {}) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  
  const defaultOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  return new Intl.NumberFormat(locale, formatOptions).format(amount);
};

/**
 * Format currency amount without symbol
 * @param {number} amount - Amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} - Formatted amount string
 */
export const formatAmount = (amount, decimals = 2, locale = 'en-US') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0.00';
  }
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Get currency symbol
 * @param {string} currency - Currency code
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currency = 'USD', locale = 'en-US') => {
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    BRL: 'R$',
    MXN: '$',
    KRW: '₩',
    RUB: '₽',
    ZAR: 'R',
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    PLN: 'zł',
    CZK: 'Kč',
    HUF: 'Ft',
  };
  
  return currencySymbols[currency] || currency;
};

/**
 * Get currency name
 * @param {string} currency - Currency code
 * @returns {string} - Currency name
 */
export const getCurrencyName = (currency = 'USD') => {
  const currencyNames = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    CAD: 'Canadian Dollar',
    AUD: 'Australian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    BRL: 'Brazilian Real',
    MXN: 'Mexican Peso',
    KRW: 'South Korean Won',
    RUB: 'Russian Ruble',
    ZAR: 'South African Rand',
    SEK: 'Swedish Krona',
    NOK: 'Norwegian Krone',
    DKK: 'Danish Krone',
    PLN: 'Polish Złoty',
    CZK: 'Czech Koruna',
    HUF: 'Hungarian Forint',
  };
  
  return currencyNames[currency] || currency;
};

/**
 * Convert amount between currencies (mock implementation)
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @param {object} rates - Exchange rates object
 * @returns {number} - Converted amount
 */
export const convertCurrency = (amount, fromCurrency, toCurrency, rates = {}) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 0;
  }
  
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Mock exchange rates (in real app, these would come from an API)
  const defaultRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.5,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 74.5,
    BRL: 5.25,
    MXN: 20.5,
    KRW: 1150,
    RUB: 75.5,
    ZAR: 14.5,
    SEK: 8.5,
    NOK: 8.8,
    DKK: 6.3,
    PLN: 3.8,
    CZK: 21.5,
    HUF: 300,
  };
  
  const exchangeRates = { ...defaultRates, ...rates };
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / exchangeRates[fromCurrency];
  const convertedAmount = usdAmount * exchangeRates[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculate percentage of total
 * @param {number} amount - Amount to calculate percentage for
 * @param {number} total - Total amount
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Percentage value
 */
export const calculatePercentage = (amount, total, decimals = 2) => {
  if (total === 0 || total === null || total === undefined) {
    return 0;
  }
  
  const percentage = (amount / total) * 100;
  return Math.round(percentage * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate percentage change
 * @param {number} oldValue - Old value
 * @param {number} newValue - New value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Percentage change
 */
export const calculatePercentageChange = (oldValue, newValue, decimals = 2) => {
  if (oldValue === 0 || oldValue === null || oldValue === undefined) {
    return newValue > 0 ? 100 : 0;
  }
  
  const change = ((newValue - oldValue) / oldValue) * 100;
  return Math.round(change * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate tax amount
 * @param {number} amount - Base amount
 * @param {number} taxRate - Tax rate as percentage
 * @returns {number} - Tax amount
 */
export const calculateTax = (amount, taxRate) => {
  if (amount === null || amount === undefined || isNaN(amount) || taxRate === null || taxRate === undefined || isNaN(taxRate)) {
    return 0;
  }
  
  return Math.round((amount * taxRate / 100) * 100) / 100;
};

/**
 * Calculate total with tax
 * @param {number} amount - Base amount
 * @param {number} taxRate - Tax rate as percentage
 * @returns {number} - Total amount with tax
 */
export const calculateTotalWithTax = (amount, taxRate) => {
  const taxAmount = calculateTax(amount, taxRate);
  return Math.round((amount + taxAmount) * 100) / 100;
};

/**
 * Calculate discount amount
 * @param {number} amount - Original amount
 * @param {number} discountRate - Discount rate as percentage
 * @returns {number} - Discount amount
 */
export const calculateDiscount = (amount, discountRate) => {
  if (amount === null || amount === undefined || isNaN(amount) || discountRate === null || discountRate === undefined || isNaN(discountRate)) {
    return 0;
  }
  
  return Math.round((amount * discountRate / 100) * 100) / 100;
};

/**
 * Calculate amount after discount
 * @param {number} amount - Original amount
 * @param {number} discountRate - Discount rate as percentage
 * @returns {number} - Amount after discount
 */
export const calculateAmountAfterDiscount = (amount, discountRate) => {
  const discountAmount = calculateDiscount(amount, discountRate);
  return Math.round((amount - discountAmount) * 100) / 100;
};

/**
 * Calculate tip amount
 * @param {number} amount - Bill amount
 * @param {number} tipRate - Tip rate as percentage
 * @returns {number} - Tip amount
 */
export const calculateTip = (amount, tipRate) => {
  if (amount === null || amount === undefined || isNaN(amount) || tipRate === null || tipRate === undefined || isNaN(tipRate)) {
    return 0;
  }
  
  return Math.round((amount * tipRate / 100) * 100) / 100;
};

/**
 * Calculate total with tip
 * @param {number} amount - Bill amount
 * @param {number} tipRate - Tip rate as percentage
 * @returns {number} - Total amount with tip
 */
export const calculateTotalWithTip = (amount, tipRate) => {
  const tipAmount = calculateTip(amount, tipRate);
  return Math.round((amount + tipAmount) * 100) / 100;
};

/**
 * Calculate profit margin
 * @param {number} revenue - Revenue amount
 * @param {number} cost - Cost amount
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Profit margin percentage
 */
export const calculateProfitMargin = (revenue, cost, decimals = 2) => {
  if (revenue === 0 || revenue === null || revenue === undefined) {
    return 0;
  }
  
  const profit = revenue - cost;
  const margin = (profit / revenue) * 100;
  return Math.round(margin * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate markup percentage
 * @param {number} sellingPrice - Selling price
 * @param {number} costPrice - Cost price
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Markup percentage
 */
export const calculateMarkup = (sellingPrice, costPrice, decimals = 2) => {
  if (costPrice === 0 || costPrice === null || costPrice === undefined) {
    return 0;
  }
  
  const markup = ((sellingPrice - costPrice) / costPrice) * 100;
  return Math.round(markup * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate compound interest
 * @param {number} principal - Principal amount
 * @param {number} rate - Interest rate as percentage
 * @param {number} time - Time period in years
 * @param {number} frequency - Compounding frequency per year (default: 1)
 * @returns {number} - Compound interest amount
 */
export const calculateCompoundInterest = (principal, rate, time, frequency = 1) => {
  if (principal === null || principal === undefined || isNaN(principal) || 
      rate === null || rate === undefined || isNaN(rate) || 
      time === null || time === undefined || isNaN(time)) {
    return 0;
  }
  
  const r = rate / 100;
  const amount = principal * Math.pow(1 + r / frequency, frequency * time);
  return Math.round((amount - principal) * 100) / 100;
};

/**
 * Calculate simple interest
 * @param {number} principal - Principal amount
 * @param {number} rate - Interest rate as percentage
 * @param {number} time - Time period in years
 * @returns {number} - Simple interest amount
 */
export const calculateSimpleInterest = (principal, rate, time) => {
  if (principal === null || principal === undefined || isNaN(principal) || 
      rate === null || rate === undefined || isNaN(rate) || 
      time === null || time === undefined || isNaN(time)) {
    return 0;
  }
  
  const interest = (principal * rate * time) / 100;
  return Math.round(interest * 100) / 100;
};

/**
 * Calculate monthly payment (loan)
 * @param {number} principal - Loan amount
 * @param {number} rate - Annual interest rate as percentage
 * @param {number} years - Loan term in years
 * @returns {number} - Monthly payment amount
 */
export const calculateMonthlyPayment = (principal, rate, years) => {
  if (principal === null || principal === undefined || isNaN(principal) || 
      rate === null || rate === undefined || isNaN(rate) || 
      years === null || years === undefined || isNaN(years)) {
    return 0;
  }
  
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

/**
 * Parse currency string to number
 * @param {string} currencyString - Currency string to parse
 * @returns {number} - Parsed number
 */
export const parseCurrency = (currencyString) => {
  if (!currencyString || typeof currencyString !== 'string') {
    return 0;
  }
  
  // Remove currency symbols and commas, then parse
  const cleaned = currencyString.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Validate currency code
 * @param {string} currency - Currency code to validate
 * @returns {boolean} - True if valid currency code
 */
export const isValidCurrency = (currency) => {
  const validCurrencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL',
    'MXN', 'KRW', 'RUB', 'ZAR', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF'
  ];
  
  return validCurrencies.includes(currency?.toUpperCase());
};

export default {
  formatCurrency,
  formatAmount,
  getCurrencySymbol,
  getCurrencyName,
  convertCurrency,
  calculatePercentage,
  calculatePercentageChange,
  calculateTax,
  calculateTotalWithTax,
  calculateDiscount,
  calculateAmountAfterDiscount,
  calculateTip,
  calculateTotalWithTip,
  calculateProfitMargin,
  calculateMarkup,
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateMonthlyPayment,
  parseCurrency,
  isValidCurrency,
}; 