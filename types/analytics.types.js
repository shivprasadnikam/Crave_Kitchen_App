/**
 * Analytics Types for Crave Kitchen Vendor App
 * Type definitions for analytics and reporting functionality
 */

// Analytics Period Types
export const ANALYTICS_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  CUSTOM: 'custom',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  LAST_365_DAYS: 'last_365_days',
};

// Analytics Metric Types
export const ANALYTICS_METRIC = {
  REVENUE: 'revenue',
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  ITEMS_SOLD: 'items_sold',
  AVERAGE_ORDER_VALUE: 'average_order_value',
  CONVERSION_RATE: 'conversion_rate',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  PREPARATION_TIME: 'preparation_time',
  DELIVERY_TIME: 'delivery_time',
  REFUND_RATE: 'refund_rate',
  REPEAT_CUSTOMERS: 'repeat_customers',
  NEW_CUSTOMERS: 'new_customers',
};

// Chart Type Types
export const CHART_TYPE = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  AREA: 'area',
  SCATTER: 'scatter',
  RADAR: 'radar',
  TABLE: 'table',
  GAUGE: 'gauge',
  FUNNEL: 'funnel',
};

// Revenue Analytics Type
export const RevenueAnalytics = {
  totalRevenue: 'number',
  grossRevenue: 'number',
  netRevenue: 'number',
  averageOrderValue: 'number',
  revenueGrowth: 'number',
  revenueByPeriod: 'object[]',
  revenueByCategory: 'object[]',
  revenueByPaymentMethod: 'object[]',
  revenueByOrderType: 'object[]',
  topRevenueItems: 'object[]',
  revenueTrends: 'object[]',
  refunds: 'number',
  refundRate: 'number',
  taxes: 'number',
  tips: 'number',
  deliveryFees: 'number',
  discounts: 'number',
  currency: 'string',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Order Analytics Type
export const OrderAnalytics = {
  totalOrders: 'number',
  pendingOrders: 'number',
  completedOrders: 'number',
  cancelledOrders: 'number',
  averagePreparationTime: 'number',
  averageDeliveryTime: 'number',
  ordersByStatus: 'object[]',
  ordersByPeriod: 'object[]',
  ordersByTimeOfDay: 'object[]',
  ordersByDayOfWeek: 'object[]',
  ordersByOrderType: 'object[]',
  peakHours: 'object[]',
  orderTrends: 'object[]',
  topSellingItems: 'object[]',
  orderCompletionRate: 'number',
  orderCancellationRate: 'number',
  averageItemsPerOrder: 'number',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Customer Analytics Type
export const CustomerAnalytics = {
  totalCustomers: 'number',
  newCustomers: 'number',
  returningCustomers: 'number',
  activeCustomers: 'number',
  customerGrowth: 'number',
  customerRetentionRate: 'number',
  averageCustomerValue: 'number',
  customerLifetimeValue: 'number',
  customersByPeriod: 'object[]',
  customersByLocation: 'object[]',
  customersByOrderFrequency: 'object[]',
  customersBySpending: 'object[]',
  topCustomers: 'object[]',
  customerSegments: 'object[]',
  customerSatisfaction: 'number',
  customerFeedback: 'object[]',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Menu Analytics Type
export const MenuAnalytics = {
  totalItems: 'number',
  activeItems: 'number',
  topSellingItems: 'object[]',
  lowSellingItems: 'object[]',
  itemsByCategory: 'object[]',
  itemsByPriceRange: 'object[]',
  averageItemPrice: 'number',
  itemPerformance: 'object[]',
  categoryPerformance: 'object[]',
  customizationUsage: 'object[]',
  addOnUsage: 'object[]',
  seasonalItems: 'object[]',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Inventory Analytics Type
export const InventoryAnalytics = {
  totalItems: 'number',
  lowStockItems: 'number',
  outOfStockItems: 'number',
  expiringItems: 'number',
  inventoryValue: 'number',
  inventoryTurnover: 'number',
  wastePercentage: 'number',
  stockAlerts: 'object[]',
  inventoryByCategory: 'object[]',
  inventoryTrends: 'object[]',
  reorderSuggestions: 'object[]',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Performance Analytics Type
export const PerformanceAnalytics = {
  averagePreparationTime: 'number',
  averageDeliveryTime: 'number',
  orderAccuracy: 'number',
  customerSatisfaction: 'number',
  staffPerformance: 'object[]',
  peakPerformanceHours: 'object[]',
  performanceTrends: 'object[]',
  qualityMetrics: 'object[]',
  efficiencyMetrics: 'object[]',
  period: 'string',
  startDate: 'string',
  endDate: 'string',
};

// Dashboard Summary Type
export const DashboardSummary = {
  todayRevenue: 'number',
  todayOrders: 'number',
  todayCustomers: 'number',
  pendingOrders: 'number',
  averageOrderValue: 'number',
  revenueGrowth: 'number',
  orderGrowth: 'number',
  customerGrowth: 'number',
  topItems: 'object[]',
  recentOrders: 'object[]',
  alerts: 'object[]',
  period: 'string',
};

// Analytics Filter Type
export const AnalyticsFilter = {
  period: 'string',
  startDate: 'string?',
  endDate: 'string?',
  categories: 'string[]?',
  orderTypes: 'string[]?',
  paymentMethods: 'string[]?',
  locations: 'string[]?',
  staff: 'string[]?',
  customers: 'string[]?',
  items: 'string[]?',
  status: 'string[]?',
  minAmount: 'number?',
  maxAmount: 'number?',
  groupBy: 'string?',
  sortBy: 'string?',
  sortOrder: 'string?',
  limit: 'number?',
  offset: 'number?',
};

// Chart Data Point Type
export const ChartDataPoint = {
  label: 'string',
  value: 'number',
  color: 'string?',
  percentage: 'number?',
  metadata: 'object?',
};

// Chart Configuration Type
export const ChartConfig = {
  type: 'string',
  title: 'string?',
  subtitle: 'string?',
  data: 'ChartDataPoint[]',
  options: 'object?',
  colors: 'string[]?',
  showLegend: 'boolean?',
  showGrid: 'boolean?',
  showLabels: 'boolean?',
  animate: 'boolean?',
  responsive: 'boolean?',
};

// Analytics Report Type
export const AnalyticsReport = {
  id: 'string',
  name: 'string',
  description: 'string?',
  type: 'string',
  filters: 'AnalyticsFilter',
  charts: 'ChartConfig[]',
  data: 'object',
  generatedAt: 'string',
  generatedBy: 'string?',
  isScheduled: 'boolean',
  schedule: 'object?',
  recipients: 'string[]?',
  format: 'string?',
  metadata: 'object?',
};

// Analytics Export Request Type
export const AnalyticsExportRequest = {
  reportType: 'string',
  filters: 'AnalyticsFilter',
  format: 'string', // csv, pdf, excel, json
  includeCharts: 'boolean?',
  includeRawData: 'boolean?',
  customFields: 'string[]?',
  fileName: 'string?',
  emailTo: 'string[]?',
};

// Analytics Export Response Type
export const AnalyticsExportResponse = {
  success: 'boolean',
  downloadUrl: 'string?',
  fileName: 'string?',
  fileSize: 'number?',
  expiresAt: 'string?',
  message: 'string?',
  errors: 'string[]?',
};

// Real-time Analytics Type
export const RealTimeAnalytics = {
  currentOrders: 'number',
  pendingOrders: 'number',
  preparingOrders: 'number',
  readyOrders: 'number',
  todayRevenue: 'number',
  todayOrders: 'number',
  averageWaitTime: 'number',
  staffOnline: 'number',
  recentActivity: 'object[]',
  alerts: 'object[]',
  lastUpdated: 'string',
};

// Customer Insight Type
export const CustomerInsight = {
  customerId: 'string',
  customerName: 'string',
  totalOrders: 'number',
  totalSpent: 'number',
  averageOrderValue: 'number',
  firstOrderDate: 'string',
  lastOrderDate: 'string',
  favoriteItems: 'object[]',
  preferredOrderType: 'string',
  preferredPaymentMethod: 'string',
  averageTip: 'number',
  satisfactionScore: 'number?',
  feedback: 'object[]',
  lifetimeValue: 'number',
  retentionScore: 'number',
  segment: 'string',
  tags: 'string[]',
  metadata: 'object?',
};

// Trend Analysis Type
export const TrendAnalysis = {
  metric: 'string',
  period: 'string',
  currentValue: 'number',
  previousValue: 'number',
  change: 'number',
  changePercentage: 'number',
  trend: 'string', // increasing, decreasing, stable
  confidence: 'number?',
  dataPoints: 'object[]',
  forecast: 'object[]?',
  seasonality: 'object?',
  metadata: 'object?',
};

// Comparative Analysis Type
export const ComparativeAnalysis = {
  metric: 'string',
  currentPeriod: 'object',
  previousPeriod: 'object',
  comparison: 'object',
  insights: 'string[]',
  recommendations: 'string[]',
  metadata: 'object?',
};

// Analytics Response Type
export const AnalyticsResponse = {
  success: 'boolean',
  data: 'object?',
  message: 'string?',
  errors: 'string[]?',
  metadata: 'object?',
};

// Analytics Summary Response Type
export const AnalyticsSummaryResponse = {
  success: 'boolean',
  data: 'DashboardSummary',
  message: 'string?',
  errors: 'string[]?',
};

// Revenue Analytics Response Type
export const RevenueAnalyticsResponse = {
  success: 'boolean',
  data: 'RevenueAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Order Analytics Response Type
export const OrderAnalyticsResponse = {
  success: 'boolean',
  data: 'OrderAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Customer Analytics Response Type
export const CustomerAnalyticsResponse = {
  success: 'boolean',
  data: 'CustomerAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Menu Analytics Response Type
export const MenuAnalyticsResponse = {
  success: 'boolean',
  data: 'MenuAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Inventory Analytics Response Type
export const InventoryAnalyticsResponse = {
  success: 'boolean',
  data: 'InventoryAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Performance Analytics Response Type
export const PerformanceAnalyticsResponse = {
  success: 'boolean',
  data: 'PerformanceAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Real-time Analytics Response Type
export const RealTimeAnalyticsResponse = {
  success: 'boolean',
  data: 'RealTimeAnalytics',
  message: 'string?',
  errors: 'string[]?',
};

// Customer Insights Response Type
export const CustomerInsightsResponse = {
  success: 'boolean',
  data: 'CustomerInsight[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Trend Analysis Response Type
export const TrendAnalysisResponse = {
  success: 'boolean',
  data: 'TrendAnalysis',
  message: 'string?',
  errors: 'string[]?',
};

// Comparative Analysis Response Type
export const ComparativeAnalysisResponse = {
  success: 'boolean',
  data: 'ComparativeAnalysis',
  message: 'string?',
  errors: 'string[]?',
};

// Analytics Report Response Type
export const AnalyticsReportResponse = {
  success: 'boolean',
  data: 'AnalyticsReport',
  message: 'string?',
  errors: 'string[]?',
};

// Analytics Reports List Response Type
export const AnalyticsReportsListResponse = {
  success: 'boolean',
  data: 'AnalyticsReport[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Export all types
export default {
  ANALYTICS_PERIOD,
  ANALYTICS_METRIC,
  CHART_TYPE,
  RevenueAnalytics,
  OrderAnalytics,
  CustomerAnalytics,
  MenuAnalytics,
  InventoryAnalytics,
  PerformanceAnalytics,
  DashboardSummary,
  AnalyticsFilter,
  ChartDataPoint,
  ChartConfig,
  AnalyticsReport,
  AnalyticsExportRequest,
  AnalyticsExportResponse,
  RealTimeAnalytics,
  CustomerInsight,
  TrendAnalysis,
  ComparativeAnalysis,
  AnalyticsResponse,
  AnalyticsSummaryResponse,
  RevenueAnalyticsResponse,
  OrderAnalyticsResponse,
  CustomerAnalyticsResponse,
  MenuAnalyticsResponse,
  InventoryAnalyticsResponse,
  PerformanceAnalyticsResponse,
  RealTimeAnalyticsResponse,
  CustomerInsightsResponse,
  TrendAnalysisResponse,
  ComparativeAnalysisResponse,
  AnalyticsReportResponse,
  AnalyticsReportsListResponse,
}; 