/**
 * Order Types for Crave Kitchen Vendor App
 * Type definitions for order management functionality
 */

// Order Status Types
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

// Payment Status Types
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
};

// Order Type Types
export const ORDER_TYPE = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
};

// Payment Method Types
export const PAYMENT_METHOD = {
  CASH: 'cash',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  DIGITAL_WALLET: 'digital_wallet',
  BANK_TRANSFER: 'bank_transfer',
  CRYPTO: 'crypto',
};

// Delivery Zone Types
export const DELIVERY_ZONE = {
  LOCAL: 'local',
  EXTENDED: 'extended',
  PREMIUM: 'premium',
};

// Order Item Type
export const OrderItem = {
  id: 'string',
  menuItemId: 'string',
  name: 'string',
  description: 'string',
  price: 'number',
  quantity: 'number',
  totalPrice: 'number',
  specialInstructions: 'string?',
  customization: 'object?',
  image: 'string?',
  category: 'string',
  isAvailable: 'boolean',
  allergens: 'string[]?',
  nutritionalInfo: 'object?',
};

// Customer Information Type
export const CustomerInfo = {
  id: 'string?',
  name: 'string',
  email: 'string?',
  phone: 'string',
  address: 'object?',
  preferences: 'object?',
  loyaltyPoints: 'number?',
  isNewCustomer: 'boolean',
};

// Delivery Information Type
export const DeliveryInfo = {
  address: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string',
  country: 'string',
  coordinates: 'object?',
  instructions: 'string?',
  estimatedTime: 'string?',
  actualTime: 'string?',
  driverInfo: 'object?',
  zone: 'string',
  deliveryFee: 'number',
};

// Payment Information Type
export const PaymentInfo = {
  method: 'string',
  status: 'string',
  amount: 'number',
  tax: 'number',
  tip: 'number',
  total: 'number',
  currency: 'string',
  transactionId: 'string?',
  paymentDate: 'string?',
  refundAmount: 'number?',
  refundReason: 'string?',
};

// Order Timeline Event Type
export const OrderTimelineEvent = {
  id: 'string',
  orderId: 'string',
  status: 'string',
  timestamp: 'string',
  description: 'string',
  userId: 'string?',
  userName: 'string?',
  notes: 'string?',
  metadata: 'object?',
};

// Order Type
export const Order = {
  id: 'string',
  orderNumber: 'string',
  customerId: 'string?',
  customerInfo: 'CustomerInfo',
  items: 'OrderItem[]',
  status: 'string',
  orderType: 'string',
  paymentInfo: 'PaymentInfo',
  deliveryInfo: 'DeliveryInfo?',
  subtotal: 'number',
  tax: 'number',
  tip: 'number',
  deliveryFee: 'number',
  discount: 'number',
  total: 'number',
  currency: 'string',
  specialInstructions: 'string?',
  estimatedPickupTime: 'string?',
  estimatedDeliveryTime: 'string?',
  actualPickupTime: 'string?',
  actualDeliveryTime: 'string?',
  createdAt: 'string',
  updatedAt: 'string',
  timeline: 'OrderTimelineEvent[]',
  metadata: 'object?',
  tags: 'string[]?',
  priority: 'string?',
  source: 'string?',
};

// Order Summary Type
export const OrderSummary = {
  id: 'string',
  orderNumber: 'string',
  customerName: 'string',
  status: 'string',
  orderType: 'string',
  total: 'number',
  itemCount: 'number',
  createdAt: 'string',
  estimatedTime: 'string?',
  isUrgent: 'boolean',
};

// Order Statistics Type
export const OrderStatistics = {
  totalOrders: 'number',
  pendingOrders: 'number',
  preparingOrders: 'number',
  readyOrders: 'number',
  deliveredOrders: 'number',
  cancelledOrders: 'number',
  totalRevenue: 'number',
  averageOrderValue: 'number',
  averagePreparationTime: 'number',
  averageDeliveryTime: 'number',
  topSellingItems: 'object[]',
  peakHours: 'object[]',
  orderTrends: 'object[]',
};

// Order Filter Type
export const OrderFilter = {
  status: 'string[]?',
  orderType: 'string[]?',
  dateRange: 'object?',
  customerId: 'string?',
  minAmount: 'number?',
  maxAmount: 'number?',
  searchTerm: 'string?',
  sortBy: 'string?',
  sortOrder: 'string?',
  limit: 'number?',
  offset: 'number?',
};

// Order Update Request Type
export const OrderUpdateRequest = {
  status: 'string?',
  estimatedPickupTime: 'string?',
  estimatedDeliveryTime: 'string?',
  notes: 'string?',
  specialInstructions: 'string?',
  items: 'object[]?',
  metadata: 'object?',
};

// Order Creation Request Type
export const OrderCreationRequest = {
  customerInfo: 'CustomerInfo',
  items: 'OrderItem[]',
  orderType: 'string',
  deliveryInfo: 'DeliveryInfo?',
  specialInstructions: 'string?',
  paymentMethod: 'string',
  tip: 'number?',
  metadata: 'object?',
};

// Order Response Type
export const OrderResponse = {
  success: 'boolean',
  data: 'Order?',
  message: 'string?',
  errors: 'string[]?',
  orderId: 'string?',
};

// Orders List Response Type
export const OrdersListResponse = {
  success: 'boolean',
  data: 'OrderSummary[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Order Statistics Response Type
export const OrderStatisticsResponse = {
  success: 'boolean',
  data: 'OrderStatistics',
  message: 'string?',
  errors: 'string[]?',
};

// Order Timeline Response Type
export const OrderTimelineResponse = {
  success: 'boolean',
  data: 'OrderTimelineEvent[]',
  message: 'string?',
  errors: 'string[]?',
};

// Order Export Request Type
export const OrderExportRequest = {
  dateRange: 'object',
  status: 'string[]?',
  orderType: 'string[]?',
  format: 'string',
  includeItems: 'boolean?',
  includeTimeline: 'boolean?',
};

// Order Notification Type
export const OrderNotification = {
  id: 'string',
  orderId: 'string',
  type: 'string',
  title: 'string',
  message: 'string',
  isRead: 'boolean',
  createdAt: 'string',
  metadata: 'object?',
};

// Order Priority Type
export const ORDER_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Order Source Type
export const ORDER_SOURCE = {
  APP: 'app',
  WEBSITE: 'website',
  PHONE: 'phone',
  WALK_IN: 'walk_in',
  THIRD_PARTY: 'third_party',
};

// Order Tags Type
export const ORDER_TAGS = {
  VIP: 'vip',
  REGULAR: 'regular',
  NEW_CUSTOMER: 'new_customer',
  LARGE_ORDER: 'large_order',
  SPECIAL_REQUEST: 'special_request',
  RUSH: 'rush',
  PRE_ORDER: 'pre_order',
};

// Export all types
export default {
  ORDER_STATUS,
  PAYMENT_STATUS,
  ORDER_TYPE,
  PAYMENT_METHOD,
  DELIVERY_ZONE,
  ORDER_PRIORITY,
  ORDER_SOURCE,
  ORDER_TAGS,
  OrderItem,
  CustomerInfo,
  DeliveryInfo,
  PaymentInfo,
  OrderTimelineEvent,
  Order,
  OrderSummary,
  OrderStatistics,
  OrderFilter,
  OrderUpdateRequest,
  OrderCreationRequest,
  OrderResponse,
  OrdersListResponse,
  OrderStatisticsResponse,
  OrderTimelineResponse,
  OrderExportRequest,
  OrderNotification,
}; 