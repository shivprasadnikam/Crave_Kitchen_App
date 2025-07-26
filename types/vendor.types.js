/**
 * Vendor Types for Crave Kitchen Vendor App
 * Type definitions for vendor and restaurant management functionality
 */

// Vendor Status Types
export const VENDOR_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  MAINTENANCE: 'maintenance',
};

// Vendor Role Types
export const VENDOR_ROLE = {
  OWNER: 'owner',
  MANAGER: 'manager',
  STAFF: 'staff',
  VIEWER: 'viewer',
  ADMIN: 'admin',
};

// Restaurant Type Types
export const RESTAURANT_TYPE = {
  FAST_FOOD: 'fast_food',
  CASUAL_DINING: 'casual_dining',
  FINE_DINING: 'fine_dining',
  CAFE: 'cafe',
  BAKERY: 'bakery',
  PIZZERIA: 'pizzeria',
  BURGER_JOINT: 'burger_joint',
  SEAFOOD: 'seafood',
  STEAKHOUSE: 'steakhouse',
  ASIAN: 'asian',
  MEXICAN: 'mexican',
  ITALIAN: 'italian',
  INDIAN: 'indian',
  THAI: 'thai',
  JAPANESE: 'japanese',
  CHINESE: 'chinese',
  KOREAN: 'korean',
  MEDITERRANEAN: 'mediterranean',
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  FOOD_TRUCK: 'food_truck',
  CATERING: 'catering',
  OTHER: 'other',
};

// Cuisine Type Types
export const CUISINE_TYPE = {
  AMERICAN: 'american',
  ITALIAN: 'italian',
  CHINESE: 'chinese',
  JAPANESE: 'japanese',
  THAI: 'thai',
  INDIAN: 'indian',
  MEXICAN: 'mexican',
  FRENCH: 'french',
  GREEK: 'greek',
  SPANISH: 'spanish',
  GERMAN: 'german',
  KOREAN: 'korean',
  VIETNAMESE: 'vietnamese',
  MEDITERRANEAN: 'mediterranean',
  MIDDLE_EASTERN: 'middle_eastern',
  AFRICAN: 'african',
  CARIBBEAN: 'caribbean',
  LATIN_AMERICAN: 'latin_american',
  FUSION: 'fusion',
  OTHER: 'other',
};

// Price Range Types
export const PRICE_RANGE = {
  BUDGET: 'budget',
  MODERATE: 'moderate',
  EXPENSIVE: 'expensive',
  LUXURY: 'luxury',
};

// Vendor Profile Type
export const VendorProfile = {
  id: 'string',
  email: 'string',
  phone: 'string',
  firstName: 'string',
  lastName: 'string',
  fullName: 'string',
  avatar: 'string?',
  role: 'string',
  status: 'string',
  isVerified: 'boolean',
  isActive: 'boolean',
  lastLoginAt: 'string?',
  createdAt: 'string',
  updatedAt: 'string',
  preferences: 'object?',
  settings: 'object?',
  metadata: 'object?',
};

// Restaurant Information Type
export const RestaurantInfo = {
  id: 'string',
  vendorId: 'string',
  name: 'string',
  description: 'string?',
  shortDescription: 'string?',
  logo: 'string?',
  banner: 'string?',
  images: 'string[]?',
  type: 'string',
  cuisine: 'string[]',
  priceRange: 'string',
  address: 'object',
  location: 'object?',
  phone: 'string',
  email: 'string?',
  website: 'string?',
  socialMedia: 'object?',
  operatingHours: 'object[]',
  deliveryZones: 'object[]',
  paymentMethods: 'string[]',
  features: 'string[]',
  amenities: 'string[]',
  certifications: 'string[]',
  awards: 'string[]',
  rating: 'number?',
  reviewCount: 'number?',
  isOpen: 'boolean',
  isDeliveryAvailable: 'boolean',
  isPickupAvailable: 'boolean',
  isDineInAvailable: 'boolean',
  minimumOrder: 'number?',
  deliveryFee: 'number?',
  taxRate: 'number?',
  tipOptions: 'object[]?',
  createdAt: 'string',
  updatedAt: 'string',
  metadata: 'object?',
};

// Address Type
export const Address = {
  street: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string',
  country: 'string',
  coordinates: 'object?',
  formattedAddress: 'string?',
};

// Location Type
export const Location = {
  latitude: 'number',
  longitude: 'number',
  accuracy: 'number?',
  altitude: 'number?',
  heading: 'number?',
  speed: 'number?',
};

// Operating Hours Type
export const OperatingHours = {
  dayOfWeek: 'string',
  isOpen: 'boolean',
  openTime: 'string?',
  closeTime: 'string?',
  breakStart: 'string?',
  breakEnd: 'string?',
  specialHours: 'object[]?',
};

// Delivery Zone Type
export const DeliveryZone = {
  id: 'string',
  name: 'string',
  description: 'string?',
  radius: 'number',
  center: 'object',
  deliveryFee: 'number',
  minimumOrder: 'number?',
  estimatedTime: 'string?',
  isActive: 'boolean',
  color: 'string?',
  coordinates: 'object[]?',
};

// Staff Member Type
export const StaffMember = {
  id: 'string',
  vendorId: 'string',
  restaurantId: 'string',
  firstName: 'string',
  lastName: 'string',
  fullName: 'string',
  email: 'string',
  phone: 'string?',
  avatar: 'string?',
  role: 'string',
  permissions: 'string[]',
  isActive: 'boolean',
  isVerified: 'boolean',
  hireDate: 'string?',
  terminationDate: 'string?',
  hourlyRate: 'number?',
  schedule: 'object[]?',
  skills: 'string[]?',
  certifications: 'string[]?',
  emergencyContact: 'object?',
  address: 'object?',
  createdAt: 'string',
  updatedAt: 'string',
  lastLoginAt: 'string?',
  metadata: 'object?',
};

// Staff Schedule Type
export const StaffSchedule = {
  id: 'string',
  staffId: 'string',
  dayOfWeek: 'string',
  startTime: 'string',
  endTime: 'string',
  breakStart: 'string?',
  breakEnd: 'string?',
  isActive: 'boolean',
  notes: 'string?',
};

// Emergency Contact Type
export const EmergencyContact = {
  name: 'string',
  relationship: 'string',
  phone: 'string',
  email: 'string?',
  address: 'object?',
};

// Vendor Settings Type
export const VendorSettings = {
  id: 'string',
  vendorId: 'string',
  notifications: 'object',
  privacy: 'object',
  security: 'object',
  display: 'object',
  language: 'string',
  timezone: 'string',
  currency: 'string',
  dateFormat: 'string',
  timeFormat: 'string',
  theme: 'string',
  autoLogout: 'number?',
  twoFactorAuth: 'boolean',
  emailNotifications: 'boolean',
  pushNotifications: 'boolean',
  smsNotifications: 'boolean',
  marketingEmails: 'boolean',
  dataSharing: 'boolean',
  analyticsTracking: 'boolean',
  createdAt: 'string',
  updatedAt: 'string',
};

// Notification Settings Type
export const NotificationSettings = {
  newOrders: 'boolean',
  orderUpdates: 'boolean',
  orderCancellations: 'boolean',
  payments: 'boolean',
  lowStock: 'boolean',
  systemAlerts: 'boolean',
  marketing: 'boolean',
  email: 'boolean',
  push: 'boolean',
  sms: 'boolean',
  inApp: 'boolean',
  quietHours: 'object?',
  frequency: 'string?',
};

// Privacy Settings Type
export const PrivacySettings = {
  profileVisibility: 'string',
  dataSharing: 'boolean',
  analyticsTracking: 'boolean',
  marketingEmails: 'boolean',
  thirdPartySharing: 'boolean',
  dataRetention: 'string?',
};

// Security Settings Type
export const SecuritySettings = {
  twoFactorAuth: 'boolean',
  biometricAuth: 'boolean',
  sessionTimeout: 'number',
  passwordExpiry: 'number?',
  loginAttempts: 'number',
  lockoutDuration: 'number',
  ipWhitelist: 'string[]?',
  deviceManagement: 'boolean',
};

// Display Settings Type
export const DisplaySettings = {
  theme: 'string',
  language: 'string',
  timezone: 'string',
  currency: 'string',
  dateFormat: 'string',
  timeFormat: 'string',
  compactMode: 'boolean',
  highContrast: 'boolean',
  fontSize: 'string?',
};

// Vendor Statistics Type
export const VendorStatistics = {
  totalOrders: 'number',
  totalRevenue: 'number',
  averageOrderValue: 'number',
  customerCount: 'number',
  staffCount: 'number',
  menuItemCount: 'number',
  rating: 'number',
  reviewCount: 'number',
  completionRate: 'number',
  cancellationRate: 'number',
  averagePreparationTime: 'number',
  averageDeliveryTime: 'number',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Vendor Filter Type
export const VendorFilter = {
  status: 'string[]?',
  role: 'string[]?',
  restaurantType: 'string[]?',
  cuisine: 'string[]?',
  location: 'object?',
  rating: 'number?',
  isVerified: 'boolean?',
  isActive: 'boolean?',
  searchTerm: 'string?',
  sortBy: 'string?',
  sortOrder: 'string?',
  limit: 'number?',
  offset: 'number?',
};

// Vendor Creation Request Type
export const VendorCreationRequest = {
  email: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
  phone: 'string',
  role: 'string?',
  restaurantInfo: 'object?',
  settings: 'object?',
  metadata: 'object?',
};

// Vendor Update Request Type
export const VendorUpdateRequest = {
  firstName: 'string?',
  lastName: 'string?',
  phone: 'string?',
  avatar: 'string?',
  role: 'string?',
  status: 'string?',
  preferences: 'object?',
  settings: 'object?',
  metadata: 'object?',
};

// Restaurant Creation Request Type
export const RestaurantCreationRequest = {
  name: 'string',
  description: 'string?',
  shortDescription: 'string?',
  type: 'string',
  cuisine: 'string[]',
  priceRange: 'string',
  address: 'object',
  phone: 'string',
  email: 'string?',
  website: 'string?',
  operatingHours: 'object[]',
  deliveryZones: 'object[]?',
  paymentMethods: 'string[]',
  features: 'string[]?',
  amenities: 'string[]?',
  minimumOrder: 'number?',
  deliveryFee: 'number?',
  taxRate: 'number?',
  metadata: 'object?',
};

// Restaurant Update Request Type
export const RestaurantUpdateRequest = {
  name: 'string?',
  description: 'string?',
  shortDescription: 'string?',
  type: 'string?',
  cuisine: 'string[]?',
  priceRange: 'string?',
  address: 'object?',
  phone: 'string?',
  email: 'string?',
  website: 'string?',
  operatingHours: 'object[]?',
  deliveryZones: 'object[]?',
  paymentMethods: 'string[]?',
  features: 'string[]?',
  amenities: 'string[]?',
  minimumOrder: 'number?',
  deliveryFee: 'number?',
  taxRate: 'number?',
  metadata: 'object?',
};

// Staff Creation Request Type
export const StaffCreationRequest = {
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  phone: 'string?',
  role: 'string',
  permissions: 'string[]',
  hourlyRate: 'number?',
  schedule: 'object[]?',
  skills: 'string[]?',
  emergencyContact: 'object?',
  address: 'object?',
  metadata: 'object?',
};

// Staff Update Request Type
export const StaffUpdateRequest = {
  firstName: 'string?',
  lastName: 'string?',
  email: 'string?',
  phone: 'string?',
  role: 'string?',
  permissions: 'string[]?',
  isActive: 'boolean?',
  hourlyRate: 'number?',
  schedule: 'object[]?',
  skills: 'string[]?',
  emergencyContact: 'object?',
  address: 'object?',
  metadata: 'object?',
};

// Vendor Response Type
export const VendorResponse = {
  success: 'boolean',
  data: 'VendorProfile?',
  message: 'string?',
  errors: 'string[]?',
  vendorId: 'string?',
};

// Restaurant Response Type
export const RestaurantResponse = {
  success: 'boolean',
  data: 'RestaurantInfo?',
  message: 'string?',
  errors: 'string[]?',
  restaurantId: 'string?',
};

// Staff Response Type
export const StaffResponse = {
  success: 'boolean',
  data: 'StaffMember?',
  message: 'string?',
  errors: 'string[]?',
  staffId: 'string?',
};

// Vendor List Response Type
export const VendorListResponse = {
  success: 'boolean',
  data: 'VendorProfile[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Staff List Response Type
export const StaffListResponse = {
  success: 'boolean',
  data: 'StaffMember[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Vendor Statistics Response Type
export const VendorStatisticsResponse = {
  success: 'boolean',
  data: 'VendorStatistics',
  message: 'string?',
  errors: 'string[]?',
};

// Settings Response Type
export const SettingsResponse = {
  success: 'boolean',
  data: 'VendorSettings',
  message: 'string?',
  errors: 'string[]?',
};

// Export all types
export default {
  VENDOR_STATUS,
  VENDOR_ROLE,
  RESTAURANT_TYPE,
  CUISINE_TYPE,
  PRICE_RANGE,
  VendorProfile,
  RestaurantInfo,
  Address,
  Location,
  OperatingHours,
  DeliveryZone,
  StaffMember,
  StaffSchedule,
  EmergencyContact,
  VendorSettings,
  NotificationSettings,
  PrivacySettings,
  SecuritySettings,
  DisplaySettings,
  VendorStatistics,
  VendorFilter,
  VendorCreationRequest,
  VendorUpdateRequest,
  RestaurantCreationRequest,
  RestaurantUpdateRequest,
  StaffCreationRequest,
  StaffUpdateRequest,
  VendorResponse,
  RestaurantResponse,
  StaffResponse,
  VendorListResponse,
  StaffListResponse,
  VendorStatisticsResponse,
  SettingsResponse,
}; 