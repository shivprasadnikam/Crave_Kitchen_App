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
    return getCurrencySymbol(currency) + '0.00';
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
    SGD: 'S$',
    HKD: 'HK$',
    NZD: 'NZ$',
    THB: '฿',
    MYR: 'RM',
    IDR: 'Rp',
    PHP: '₱',
    VND: '₫',
    TRY: '₺',
    SAR: '﷼',
    AED: 'د.إ',
    QAR: '﷼',
    KWD: 'د.ك',
    BHD: '.د.ب',
    OMR: 'ر.ع.',
    JOD: 'د.ا',
    LBP: 'ل.ل',
    EGP: 'ج.م',
    MAD: 'د.م.',
    TND: 'د.ت',
    DZD: 'د.ج',
    XAF: 'FCFA',
    XOF: 'CFA',
    NGN: '₦',
    KES: 'KSh',
    GHS: 'GH₵',
    ZMW: 'ZK',
    BWP: 'P',
    NAM: 'N$',
    SZL: 'E',
    LSL: 'L',
    MUR: '₨',
    SCR: '₨',
    CDF: 'FC',
    UGX: 'USh',
    TZS: 'TSh',
    BIF: 'FBu',
    RWF: 'FRw',
    MWK: 'MK',
    ZMK: 'ZK',
    AOA: 'Kz',
    MZN: 'MT',
    STN: 'Db',
    CVE: '$',
    GMD: 'D',
    GNF: 'FG',
    SLL: 'Le',
    LRD: 'L$',
    SHP: '£',
    FKP: '£',
    GIP: '£',
    IMP: '£',
    JEP: '£',
    GGY: '£',
    IOM: '£',
    BMD: '$',
    KYD: '$',
    BBD: '$',
    TTD: 'TT$',
    XCD: '$',
    ANG: 'ƒ',
    AWG: 'ƒ',
    SRD: '$',
    GYD: '$',
    BZD: 'BZ$',
    HNL: 'L',
    GTQ: 'Q',
    NIO: 'C$',
    CRC: '₡',
    PAB: 'B/.',
    PYG: '₲',
    UYU: '$U',
    ARS: '$',
    CLP: '$',
    PEN: 'S/',
    BOB: 'Bs',
    COP: '$',
    VEF: 'Bs',
    UYI: 'UI',
    UYW: 'UYI',
    UZS: 'so\'m',
    KGS: 'с',
    TJS: 'ЅМ',
    TMT: 'T',
    AZN: '₼',
    GEL: '₾',
    AMD: '֏',
    BYN: 'Br',
    MDL: 'L',
    RON: 'lei',
    BGN: 'лв',
    HRK: 'kn',
    ALL: 'L',
    MKD: 'ден',
    RSD: 'дин',
    BAM: 'KM',
    MNT: '₮',
    NPR: '₨',
    BDT: '৳',
    LKR: 'Rs',
    MVR: 'Rf',
    PKR: '₨',
    AFN: '؋',
    IRR: '﷼',
    IQD: 'ع.د',
    SYP: 'ل.س',
    YER: '﷼',
    OMR: 'ر.ع.',
    QAR: '﷼',
    AED: 'د.إ',
    SAR: '﷼',
    KWD: 'د.ك',
    BHD: '.د.ب',
    JOD: 'د.ا',
    LBP: 'ل.ل',
    EGP: 'ج.م',
    MAD: 'د.م.',
    TND: 'د.ت',
    DZD: 'د.ج',
    XAF: 'FCFA',
    XOF: 'CFA',
    NGN: '₦',
    KES: 'KSh',
    GHS: 'GH₵',
    ZMW: 'ZK',
    BWP: 'P',
    NAM: 'N$',
    SZL: 'E',
    LSL: 'L',
    MUR: '₨',
    SCR: '₨',
    CDF: 'FC',
    UGX: 'USh',
    TZS: 'TSh',
    BIF: 'FBu',
    RWF: 'FRw',
    MWK: 'MK',
    ZMK: 'ZK',
    AOA: 'Kz',
    MZN: 'MT',
    STN: 'Db',
    CVE: '$',
    GMD: 'D',
    GNF: 'FG',
    SLL: 'Le',
    LRD: 'L$',
    SHP: '£',
    FKP: '£',
    GIP: '£',
    IMP: '£',
    JEP: '£',
    GGY: '£',
    IOM: '£',
    BMD: '$',
    KYD: '$',
    BBD: '$',
    TTD: 'TT$',
    XCD: '$',
    ANG: 'ƒ',
    AWG: 'ƒ',
    SRD: '$',
    GYD: '$',
    BZD: 'BZ$',
    HNL: 'L',
    GTQ: 'Q',
    NIO: 'C$',
    CRC: '₡',
    PAB: 'B/.',
    PYG: '₲',
    UYU: '$U',
    ARS: '$',
    CLP: '$',
    PEN: 'S/',
    BOB: 'Bs',
    UYI: 'UI',
    UYW: 'UYI',
    UZS: 'so\'m',
    KGS: 'с',
    TJS: 'ЅМ',
    TMT: 'T',
    AZN: '₼',
    GEL: '₾',
    AMD: '֏',
    BYN: 'Br',
    MDL: 'L',
    RON: 'lei',
    BGN: 'лв',
    HRK: 'kn',
    ALL: 'L',
    MKD: 'ден',
    RSD: 'дин',
    BAM: 'KM',
    MNT: '₮',
    NPR: '₨',
    BDT: '৳',
    LKR: 'Rs',
    MVR: 'Rf',
    PKR: '₨',
    AFN: '؋',
    IRR: '﷼',
    IQD: 'ع.د',
    SYP: 'ل.س',
    YER: '﷼',
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
    SGD: 'Singapore Dollar',
    HKD: 'Hong Kong Dollar',
    NZD: 'New Zealand Dollar',
    THB: 'Thai Baht',
    MYR: 'Malaysian Ringgit',
    IDR: 'Indonesian Rupiah',
    PHP: 'Philippine Peso',
    VND: 'Vietnamese Dong',
    TRY: 'Turkish Lira',
    SAR: 'Saudi Riyal',
    AED: 'UAE Dirham',
    QAR: 'Qatari Riyal',
    KWD: 'Kuwaiti Dinar',
    BHD: 'Bahraini Dinar',
    OMR: 'Omani Rial',
    JOD: 'Jordanian Dinar',
    LBP: 'Lebanese Pound',
    EGP: 'Egyptian Pound',
    MAD: 'Moroccan Dirham',
    TND: 'Tunisian Dinar',
    DZD: 'Algerian Dinar',
    XAF: 'Central African CFA Franc',
    XOF: 'West African CFA Franc',
    NGN: 'Nigerian Naira',
    KES: 'Kenyan Shilling',
    GHS: 'Ghanaian Cedi',
    ZMW: 'Zambian Kwacha',
    BWP: 'Botswana Pula',
    NAM: 'Namibian Dollar',
    SZL: 'Swazi Lilangeni',
    LSL: 'Lesotho Loti',
    MUR: 'Mauritian Rupee',
    SCR: 'Seychellois Rupee',
    CDF: 'Congolese Franc',
    UGX: 'Ugandan Shilling',
    TZS: 'Tanzanian Shilling',
    BIF: 'Burundian Franc',
    RWF: 'Rwandan Franc',
    MWK: 'Malawian Kwacha',
    ZMK: 'Zambian Kwacha',
    AOA: 'Angolan Kwanza',
    MZN: 'Mozambican Metical',
    STN: 'São Tomé and Príncipe Dobra',
    CVE: 'Cape Verdean Escudo',
    GMD: 'Gambian Dalasi',
    GNF: 'Guinean Franc',
    SLL: 'Sierra Leonean Leone',
    LRD: 'Liberian Dollar',
    SHP: 'Saint Helena Pound',
    FKP: 'Falkland Islands Pound',
    GIP: 'Gibraltar Pound',
    IMP: 'Manx Pound',
    JEP: 'Jersey Pound',
    GGY: 'Guernsey Pound',
    IOM: 'Isle of Man Pound',
    BMD: 'Bermudian Dollar',
    KYD: 'Cayman Islands Dollar',
    BBD: 'Barbadian Dollar',
    TTD: 'Trinidad and Tobago Dollar',
    XCD: 'East Caribbean Dollar',
    ANG: 'Netherlands Antillean Guilder',
    AWG: 'Aruban Florin',
    SRD: 'Surinamese Dollar',
    GYD: 'Guyanese Dollar',
    BZD: 'Belize Dollar',
    HNL: 'Honduran Lempira',
    GTQ: 'Guatemalan Quetzal',
    NIO: 'Nicaraguan Córdoba',
    CRC: 'Costa Rican Colón',
    PAB: 'Panamanian Balboa',
    PYG: 'Paraguayan Guaraní',
    UYU: 'Uruguayan Peso',
    ARS: 'Argentine Peso',
    CLP: 'Chilean Peso',
    PEN: 'Peruvian Sol',
    BOB: 'Bolivian Boliviano',
    COP: 'Colombian Peso',
    VEF: 'Venezuelan Bolívar',
    UYI: 'Uruguay Peso en Unidades Indexadas',
    UYW: 'Uruguayan Nominal Wage Index Unit',
    UZS: 'Uzbekistani Som',
    KGS: 'Kyrgyzstani Som',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistan Manat',
    AZN: 'Azerbaijani Manat',
    GEL: 'Georgian Lari',
    AMD: 'Armenian Dram',
    BYN: 'Belarusian Ruble',
    MDL: 'Moldovan Leu',
    RON: 'Romanian Leu',
    BGN: 'Bulgarian Lev',
    HRK: 'Croatian Kuna',
    ALL: 'Albanian Lek',
    MKD: 'Macedonian Denar',
    RSD: 'Serbian Dinar',
    BAM: 'Bosnia-Herzegovina Convertible Mark',
    MNT: 'Mongolian Tögrög',
    NPR: 'Nepalese Rupee',
    BDT: 'Bangladeshi Taka',
    LKR: 'Sri Lankan Rupee',
    MVR: 'Maldivian Rufiyaa',
    PKR: 'Pakistani Rupee',
    AFN: 'Afghan Afghani',
    IRR: 'Iranian Rial',
    IQD: 'Iraqi Dinar',
    SYP: 'Syrian Pound',
    YER: 'Yemeni Rial',
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
    SGD: 1.35,
    HKD: 7.8,
    NZD: 1.45,
    THB: 33.5,
    MYR: 4.15,
    IDR: 14250,
    PHP: 50.5,
    VND: 23000,
    TRY: 8.5,
    SAR: 3.75,
    AED: 3.67,
    QAR: 3.64,
    KWD: 0.30,
    BHD: 0.38,
    OMR: 0.38,
    JOD: 0.71,
    LBP: 1500,
    EGP: 15.7,
    MAD: 9.0,
    TND: 2.8,
    DZD: 135,
    XAF: 550,
    XOF: 550,
    NGN: 410,
    KES: 110,
    GHS: 6.0,
    ZMW: 18.5,
    BWP: 11.0,
    NAM: 15.0,
    SZL: 15.0,
    LSL: 15.0,
    MUR: 40.0,
    SCR: 13.5,
    CDF: 2000,
    UGX: 3700,
    TZS: 2300,
    BIF: 2000,
    RWF: 1000,
    MWK: 800,
    ZMK: 18.5,
    AOA: 650,
    MZN: 60.0,
    STN: 20.0,
    CVE: 100,
    GMD: 50.0,
    GNF: 10000,
    SLL: 10000,
    LRD: 150,
    SHP: 0.73,
    FKP: 0.73,
    GIP: 0.73,
    IMP: 0.73,
    JEP: 0.73,
    GGY: 0.73,
    IOM: 0.73,
    BMD: 1,
    KYD: 0.83,
    BBD: 2.0,
    TTD: 6.8,
    XCD: 2.7,
    ANG: 1.8,
    AWG: 1.8,
    SRD: 21.0,
    GYD: 210,
    BZD: 2.0,
    HNL: 24.5,
    GTQ: 7.8,
    NIO: 35.0,
    CRC: 620,
    PAB: 1,
    PYG: 7000,
    UYU: 42.0,
    ARS: 100,
    CLP: 850,
    PEN: 3.8,
    BOB: 6.9,
    COP: 3800,
    VEF: 2500000,
    UYI: 42.0,
    UYW: 42.0,
    UZS: 11000,
    KGS: 85,
    TJS: 11.0,
    TMT: 3.5,
    AZN: 1.7,
    GEL: 3.0,
    AMD: 500,
    BYN: 2.5,
    MDL: 18.0,
    RON: 4.2,
    BGN: 1.7,
    HRK: 6.3,
    ALL: 100,
    MKD: 55.0,
    RSD: 100,
    BAM: 1.7,
    MNT: 2850,
    NPR: 120,
    BDT: 85.0,
    LKR: 200,
    MVR: 15.5,
    PKR: 160,
    AFN: 85.0,
    IRR: 42000,
    IQD: 1460,
    SYP: 2500,
    YER: 250,
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
    'MXN', 'KRW', 'RUB', 'ZAR', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF',
    'SGD', 'HKD', 'NZD', 'THB', 'MYR', 'IDR', 'PHP', 'VND', 'TRY', 'SAR',
    'AED', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'LBP', 'EGP', 'MAD', 'TND',
    'DZD', 'XAF', 'XOF', 'NGN', 'KES', 'GHS', 'ZMW', 'BWP', 'NAM', 'SZL',
    'LSL', 'MUR', 'SCR', 'CDF', 'UGX', 'TZS', 'BIF', 'RWF', 'MWK', 'ZMK',
    'AOA', 'MZN', 'STN', 'CVE', 'GMD', 'GNF', 'SLL', 'LRD', 'SHP', 'FKP',
    'GIP', 'IMP', 'JEP', 'GGY', 'IOM', 'BMD', 'KYD', 'BBD', 'TTD', 'XCD',
    'ANG', 'AWG', 'SRD', 'GYD', 'BZD', 'HNL', 'GTQ', 'NIO', 'CRC', 'PAB',
    'PYG', 'UYU', 'ARS', 'CLP', 'PEN', 'BOB', 'COP', 'VEF', 'UYI', 'UYW',
    'UZS', 'KGS', 'TJS', 'TMT', 'AZN', 'GEL', 'AMD', 'BYN', 'MDL', 'RON',
    'BGN', 'HRK', 'ALL', 'MKD', 'RSD', 'BAM', 'MNT', 'NPR', 'BDT', 'LKR',
    'MVR', 'PKR', 'AFN', 'IRR', 'IQD', 'SYP', 'YER',
  ];
  
  return validCurrencies.includes(currency?.toUpperCase());
};

/**
 * Calculate order total with all fees
 * @param {number} subtotal - Order subtotal
 * @param {number} taxRate - Tax rate percentage
 * @param {number} tipRate - Tip rate percentage
 * @param {number} deliveryFee - Delivery fee amount
 * @param {number} serviceFee - Service fee amount
 * @returns {Object} - Breakdown of all amounts
 */
export const calculateOrderTotal = (subtotal, taxRate = 0, tipRate = 0, deliveryFee = 0, serviceFee = 0) => {
  const taxAmount = calculateTax(subtotal, taxRate);
  const tipAmount = calculateTip(subtotal, tipRate);
  const total = subtotal + taxAmount + tipAmount + deliveryFee + serviceFee;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    tipAmount: Math.round(tipAmount * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    serviceFee: Math.round(serviceFee * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

/**
 * Calculate average order value
 * @param {Array} orders - Array of order objects with total amounts
 * @returns {number} - Average order value
 */
export const calculateAverageOrderValue = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return 0;
  }
  
  const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  return Math.round((total / orders.length) * 100) / 100;
};

/**
 * Calculate revenue growth rate
 * @param {number} currentRevenue - Current period revenue
 * @param {number} previousRevenue - Previous period revenue
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Growth rate percentage
 */
export const calculateRevenueGrowth = (currentRevenue, previousRevenue, decimals = 2) => {
  if (previousRevenue === 0 || previousRevenue === null || previousRevenue === undefined) {
    return currentRevenue > 0 ? 100 : 0;
  }
  
  const growth = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  return Math.round(growth * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Format currency for display with appropriate precision
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @param {boolean} showSymbol - Whether to show currency symbol
 * @returns {string} - Formatted currency string
 */
export const formatCurrencyForDisplay = (amount, currency = 'USD', showSymbol = true) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showSymbol ? getCurrencySymbol(currency) + '0.00' : '0.00';
  }
  
  // Determine appropriate decimal places based on currency
  const decimalPlaces = currency === 'JPY' ? 0 : 2;
  
  const formatted = formatAmount(amount, decimalPlaces);
  
  if (showSymbol) {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${formatted}`;
  }
  
  return formatted;
};

/**
 * Calculate sales tax based on location and item type
 * @param {number} amount - Taxable amount
 * @param {string} location - Location/state for tax calculation
 * @param {string} itemType - Type of item (food, beverage, etc.)
 * @returns {number} - Tax amount
 */
export const calculateSalesTax = (amount, location, itemType = 'general') => {
  // Mock tax rates - in real app, these would come from a tax service
  const taxRates = {
    'CA': { general: 0.075, food: 0.05, beverage: 0.10 },
    'NY': { general: 0.085, food: 0.05, beverage: 0.10 },
    'TX': { general: 0.0625, food: 0.00, beverage: 0.0625 },
    'FL': { general: 0.06, food: 0.00, beverage: 0.06 },
    'WA': { general: 0.065, food: 0.00, beverage: 0.065 },
    'default': { general: 0.08, food: 0.05, beverage: 0.10 },
  };
  
  const locationRates = taxRates[location] || taxRates.default;
  const rate = locationRates[itemType] || locationRates.general;
  
  return calculateTax(amount, rate * 100);
};

/**
 * Calculate shipping cost based on weight and distance
 * @param {number} weight - Weight in pounds
 * @param {number} distance - Distance in miles
 * @param {string} service - Shipping service type
 * @returns {number} - Shipping cost
 */
export const calculateShippingCost = (weight, distance, service = 'standard') => {
  const baseRates = {
    standard: { base: 5.99, perMile: 0.15, perPound: 0.50 },
    express: { base: 12.99, perMile: 0.25, perPound: 0.75 },
    overnight: { base: 24.99, perMile: 0.50, perPound: 1.00 },
  };
  
  const rates = baseRates[service] || baseRates.standard;
  const cost = rates.base + (distance * rates.perMile) + (weight * rates.perPound);
  
  return Math.round(cost * 100) / 100;
};

/**
 * Calculate bulk discount
 * @param {number} quantity - Quantity ordered
 * @param {number} unitPrice - Price per unit
 * @param {Array} discountTiers - Array of discount tiers [{quantity, discount}]
 * @returns {Object} - Discount information
 */
export const calculateBulkDiscount = (quantity, unitPrice, discountTiers = []) => {
  const defaultTiers = [
    { quantity: 10, discount: 5 },
    { quantity: 25, discount: 10 },
    { quantity: 50, discount: 15 },
    { quantity: 100, discount: 20 },
  ];
  
  const tiers = discountTiers.length > 0 ? discountTiers : defaultTiers;
  const applicableTier = tiers
    .filter(tier => quantity >= tier.quantity)
    .sort((a, b) => b.quantity - a.quantity)[0];
  
  if (!applicableTier) {
    return {
      discountRate: 0,
      discountAmount: 0,
      finalPrice: quantity * unitPrice,
      savings: 0,
    };
  }
  
  const originalPrice = quantity * unitPrice;
  const discountAmount = calculateDiscount(originalPrice, applicableTier.discount);
  const finalPrice = originalPrice - discountAmount;
  
  return {
    discountRate: applicableTier.discount,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100,
  };
};

/**
 * Calculate installment payment
 * @param {number} totalAmount - Total amount to finance
 * @param {number} numberOfPayments - Number of payments
 * @param {number} interestRate - Annual interest rate as percentage
 * @returns {Object} - Payment breakdown
 */
export const calculateInstallmentPayment = (totalAmount, numberOfPayments, interestRate = 0) => {
  if (interestRate === 0) {
    const paymentAmount = totalAmount / numberOfPayments;
    return {
      paymentAmount: Math.round(paymentAmount * 100) / 100,
      totalInterest: 0,
      totalAmount: totalAmount,
      numberOfPayments,
    };
  }
  
  const monthlyRate = interestRate / 100 / 12;
  const paymentAmount = totalAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalInterest = (paymentAmount * numberOfPayments) - totalAmount;
  
  return {
    paymentAmount: Math.round(paymentAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round((paymentAmount * numberOfPayments) * 100) / 100,
    numberOfPayments,
  };
};

/**
 * Round to nearest currency unit
 * @param {number} amount - Amount to round
 * @param {string} currency - Currency code
 * @returns {number} - Rounded amount
 */
export const roundToCurrency = (amount, currency = 'USD') => {
  const roundingRules = {
    'JPY': 0, // No decimals
    'KRW': 0, // No decimals
    'default': 2, // 2 decimal places
  };
  
  const decimals = roundingRules[currency] || roundingRules.default;
  const multiplier = Math.pow(10, decimals);
  
  return Math.round(amount * multiplier) / multiplier;
};

/**
 * Format currency range
 * @param {number} minAmount - Minimum amount
 * @param {number} maxAmount - Maximum amount
 * @param {string} currency - Currency code
 * @returns {string} - Formatted range string
 */
export const formatCurrencyRange = (minAmount, maxAmount, currency = 'USD') => {
  if (minAmount === maxAmount) {
    return formatCurrencyForDisplay(minAmount, currency);
  }
  
  const minFormatted = formatCurrencyForDisplay(minAmount, currency);
  const maxFormatted = formatCurrencyForDisplay(maxAmount, currency);
  
  return `${minFormatted} - ${maxFormatted}`;
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
  calculateOrderTotal,
  calculateAverageOrderValue,
  calculateRevenueGrowth,
  formatCurrencyForDisplay,
  calculateSalesTax,
  calculateShippingCost,
  calculateBulkDiscount,
  calculateInstallmentPayment,
  roundToCurrency,
  formatCurrencyRange,
}; 