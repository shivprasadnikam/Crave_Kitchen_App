import { api, API_ENDPOINTS } from './api';

/**
 * Analytics Service
 * Handles all analytics-related API calls
 */
export const analyticsService = {
  /**
   * Get dashboard data
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Dashboard data response
   */
  getDashboardData: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.DASHBOARD, { params: filters });
  },

  /**
   * Get revenue analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Revenue analytics response
   */
  getRevenueAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.REVENUE, { params: filters });
  },

  /**
   * Get order analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Order analytics response
   */
  getOrderAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.ORDERS, { params: filters });
  },

  /**
   * Get customer analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Customer analytics response
   */
  getCustomerAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.CUSTOMERS, { params: filters });
  },

  /**
   * Get menu analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Menu analytics response
   */
  getMenuAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.MENU, { params: filters });
  },

  /**
   * Get inventory analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Inventory analytics response
   */
  getInventoryAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.INVENTORY, { params: filters });
  },

  /**
   * Get performance analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Performance analytics response
   */
  getPerformanceAnalytics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.PERFORMANCE, { params: filters });
  },

  /**
   * Get real-time data
   * @returns {Promise} - Real-time data response
   */
  getRealTimeData: async () => {
    return api.get(API_ENDPOINTS.ANALYTICS.REAL_TIME);
  },

  /**
   * Get trend analysis
   * @param {string} metric - Metric to analyze
   * @param {string} period - Time period
   * @returns {Promise} - Trend analysis response
   */
  getTrendAnalysis: async (metric, period) => {
    return api.get(API_ENDPOINTS.ANALYTICS.TREND, {
      params: { metric, period },
    });
  },

  /**
   * Get comparative analysis
   * @param {string} metric - Metric to compare
   * @param {string} period1 - First period
   * @param {string} period2 - Second period
   * @returns {Promise} - Comparative analysis response
   */
  getComparativeAnalysis: async (metric, period1, period2) => {
    return api.get(API_ENDPOINTS.ANALYTICS.COMPARATIVE, {
      params: { metric, period1, period2 },
    });
  },

  /**
   * Generate report
   * @param {string} reportType - Type of report
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Report generation response
   */
  generateReport: async (reportType, filters = {}) => {
    return api.post(API_ENDPOINTS.ANALYTICS.GENERATE_REPORT, {
      reportType,
      filters,
    });
  },

  /**
   * Export data
   * @param {string} dataType - Type of data to export
   * @param {string} format - Export format
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Export response
   */
  exportData: async (dataType, format, filters = {}) => {
    return api.get(API_ENDPOINTS.ANALYTICS.EXPORT, {
      params: { dataType, format, ...filters },
      responseType: 'blob',
    });
  },

  /**
   * Get sales analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Sales analytics response
   */
  getSalesAnalytics: async (filters = {}) => {
    return api.get('/analytics/sales', { params: filters });
  },

  /**
   * Get profit analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Profit analytics response
   */
  getProfitAnalytics: async (filters = {}) => {
    return api.get('/analytics/profit', { params: filters });
  },

  /**
   * Get customer insights
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Customer insights response
   */
  getCustomerInsights: async (filters = {}) => {
    return api.get('/analytics/customer-insights', { params: filters });
  },

  /**
   * Get popular items analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Popular items analytics response
   */
  getPopularItemsAnalytics: async (filters = {}) => {
    return api.get('/analytics/popular-items', { params: filters });
  },

  /**
   * Get peak hours analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Peak hours analytics response
   */
  getPeakHoursAnalytics: async (filters = {}) => {
    return api.get('/analytics/peak-hours', { params: filters });
  },

  /**
   * Get delivery analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Delivery analytics response
   */
  getDeliveryAnalytics: async (filters = {}) => {
    return api.get('/analytics/delivery', { params: filters });
  },

  /**
   * Get payment analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Payment analytics response
   */
  getPaymentAnalytics: async (filters = {}) => {
    return api.get('/analytics/payments', { params: filters });
  },

  /**
   * Get staff performance analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Staff performance analytics response
   */
  getStaffPerformanceAnalytics: async (filters = {}) => {
    return api.get('/analytics/staff-performance', { params: filters });
  },

  /**
   * Get equipment utilization analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Equipment utilization analytics response
   */
  getEquipmentUtilizationAnalytics: async (filters = {}) => {
    return api.get('/analytics/equipment-utilization', { params: filters });
  },

  /**
   * Get seasonal trends
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Seasonal trends response
   */
  getSeasonalTrends: async (filters = {}) => {
    return api.get('/analytics/seasonal-trends', { params: filters });
  },

  /**
   * Get geographic analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Geographic analytics response
   */
  getGeographicAnalytics: async (filters = {}) => {
    return api.get('/analytics/geographic', { params: filters });
  },

  /**
   * Get marketing analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Marketing analytics response
   */
  getMarketingAnalytics: async (filters = {}) => {
    return api.get('/analytics/marketing', { params: filters });
  },

  /**
   * Get competitor analysis
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Competitor analysis response
   */
  getCompetitorAnalysis: async (filters = {}) => {
    return api.get('/analytics/competitor', { params: filters });
  },

  /**
   * Get forecast data
   * @param {string} metric - Metric to forecast
   * @param {string} period - Forecast period
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Forecast data response
   */
  getForecastData: async (metric, period, filters = {}) => {
    return api.get('/analytics/forecast', {
      params: { metric, period, ...filters },
    });
  },

  /**
   * Get KPI metrics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - KPI metrics response
   */
  getKPIMetrics: async (filters = {}) => {
    return api.get('/analytics/kpi', { params: filters });
  },

  /**
   * Get custom analytics
   * @param {object} query - Custom query parameters
   * @returns {Promise} - Custom analytics response
   */
  getCustomAnalytics: async (query) => {
    return api.post('/analytics/custom', query);
  },

  /**
   * Save custom report
   * @param {object} reportData - Report data
   * @returns {Promise} - Save report response
   */
  saveCustomReport: async (reportData) => {
    return api.post('/analytics/reports/save', reportData);
  },

  /**
   * Get saved reports
   * @returns {Promise} - Saved reports response
   */
  getSavedReports: async () => {
    return api.get('/analytics/reports/saved');
  },

  /**
   * Delete saved report
   * @param {string} reportId - Report ID
   * @returns {Promise} - Delete report response
   */
  deleteSavedReport: async (reportId) => {
    return api.delete(`/analytics/reports/saved/${reportId}`);
  },

  /**
   * Schedule report
   * @param {object} scheduleData - Schedule data
   * @returns {Promise} - Schedule report response
   */
  scheduleReport: async (scheduleData) => {
    return api.post('/analytics/reports/schedule', scheduleData);
  },

  /**
   * Get scheduled reports
   * @returns {Promise} - Scheduled reports response
   */
  getScheduledReports: async () => {
    return api.get('/analytics/reports/scheduled');
  },

  /**
   * Update scheduled report
   * @param {string} scheduleId - Schedule ID
   * @param {object} scheduleData - Updated schedule data
   * @returns {Promise} - Update schedule response
   */
  updateScheduledReport: async (scheduleId, scheduleData) => {
    return api.put(`/analytics/reports/scheduled/${scheduleId}`, scheduleData);
  },

  /**
   * Delete scheduled report
   * @param {string} scheduleId - Schedule ID
   * @returns {Promise} - Delete schedule response
   */
  deleteScheduledReport: async (scheduleId) => {
    return api.delete(`/analytics/reports/scheduled/${scheduleId}`);
  },
};

export default analyticsService; 