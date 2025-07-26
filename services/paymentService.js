import { api, API_ENDPOINTS } from './api';

/**
 * Payment Service
 * Handles all payment-related API calls
 */
export const paymentService = {
  /**
   * Get payments with filters and pagination
   * @param {object} params - Query parameters
   * @returns {Promise} - Payments response
   */
  getPayments: async (params = {}) => {
    return api.get(API_ENDPOINTS.PAYMENTS.LIST, { params });
  },

  /**
   * Get payment by ID
   * @param {string} paymentId - Payment ID
   * @returns {Promise} - Payment details response
   */
  getPaymentById: async (paymentId) => {
    return api.get(API_ENDPOINTS.PAYMENTS.DETAIL(paymentId));
  },

  /**
   * Create new payment
   * @param {object} paymentData - Payment data
   * @returns {Promise} - Payment creation response
   */
  createPayment: async (paymentData) => {
    return api.post(API_ENDPOINTS.PAYMENTS.CREATE, paymentData);
  },

  /**
   * Process payment
   * @param {object} paymentData - Payment data
   * @returns {Promise} - Payment processing response
   */
  processPayment: async (paymentData) => {
    return api.post('/payments/process', paymentData);
  },

  /**
   * Refund payment
   * @param {string} paymentId - Payment ID
   * @param {object} refundData - Refund data
   * @returns {Promise} - Refund response
   */
  refundPayment: async (paymentId, refundData) => {
    return api.post(API_ENDPOINTS.PAYMENTS.REFUND(paymentId), refundData);
  },

  /**
   * Get payment statistics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Payment statistics response
   */
  getPaymentStatistics: async (filters = {}) => {
    return api.get(API_ENDPOINTS.PAYMENTS.STATISTICS, { params: filters });
  },

  /**
   * Get payout information
   * @param {object} params - Query parameters
   * @returns {Promise} - Payout information response
   */
  getPayoutInfo: async (params = {}) => {
    return api.get(API_ENDPOINTS.PAYMENTS.PAYOUT, { params });
  },

  /**
   * Request payout
   * @param {object} payoutData - Payout data
   * @returns {Promise} - Payout request response
   */
  requestPayout: async (payoutData) => {
    return api.post(API_ENDPOINTS.PAYMENTS.PAYOUT, payoutData);
  },

  /**
   * Get payout history
   * @param {object} params - Query parameters
   * @returns {Promise} - Payout history response
   */
  getPayoutHistory: async (params = {}) => {
    return api.get(API_ENDPOINTS.PAYMENTS.PAYOUT_HISTORY, { params });
  },

  /**
   * Get payment methods
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment methods response
   */
  getPaymentMethods: async (params = {}) => {
    return api.get('/payments/methods', { params });
  },

  /**
   * Add payment method
   * @param {object} methodData - Payment method data
   * @returns {Promise} - Add payment method response
   */
  addPaymentMethod: async (methodData) => {
    return api.post('/payments/methods', methodData);
  },

  /**
   * Update payment method
   * @param {string} methodId - Payment method ID
   * @param {object} methodData - Payment method data to update
   * @returns {Promise} - Update payment method response
   */
  updatePaymentMethod: async (methodId, methodData) => {
    return api.put(`/payments/methods/${methodId}`, methodData);
  },

  /**
   * Delete payment method
   * @param {string} methodId - Payment method ID
   * @returns {Promise} - Delete payment method response
   */
  deletePaymentMethod: async (methodId) => {
    return api.delete(`/payments/methods/${methodId}`);
  },

  /**
   * Set default payment method
   * @param {string} methodId - Payment method ID
   * @returns {Promise} - Set default payment method response
   */
  setDefaultPaymentMethod: async (methodId) => {
    return api.post(`/payments/methods/${methodId}/default`);
  },

  /**
   * Get transactions
   * @param {object} params - Query parameters
   * @returns {Promise} - Transactions response
   */
  getTransactions: async (params = {}) => {
    return api.get('/payments/transactions', { params });
  },

  /**
   * Get transaction by ID
   * @param {string} transactionId - Transaction ID
   * @returns {Promise} - Transaction details response
   */
  getTransactionById: async (transactionId) => {
    return api.get(`/payments/transactions/${transactionId}`);
  },

  /**
   * Get payment analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Payment analytics response
   */
  getPaymentAnalytics: async (filters = {}) => {
    return api.get('/payments/analytics', { params: filters });
  },

  /**
   * Get revenue analytics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Revenue analytics response
   */
  getRevenueAnalytics: async (filters = {}) => {
    return api.get('/payments/revenue', { params: filters });
  },

  /**
   * Get payment trends
   * @param {string} period - Time period
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Payment trends response
   */
  getPaymentTrends: async (period = 'week', filters = {}) => {
    return api.get('/payments/trends', {
      params: { period, ...filters },
    });
  },

  /**
   * Get failed payments
   * @param {object} params - Query parameters
   * @returns {Promise} - Failed payments response
   */
  getFailedPayments: async (params = {}) => {
    return api.get('/payments/failed', { params });
  },

  /**
   * Retry failed payment
   * @param {string} paymentId - Payment ID
   * @returns {Promise} - Retry payment response
   */
  retryFailedPayment: async (paymentId) => {
    return api.post(`/payments/${paymentId}/retry`);
  },

  /**
   * Get payment disputes
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment disputes response
   */
  getPaymentDisputes: async (params = {}) => {
    return api.get('/payments/disputes', { params });
  },

  /**
   * Get dispute by ID
   * @param {string} disputeId - Dispute ID
   * @returns {Promise} - Dispute details response
   */
  getDisputeById: async (disputeId) => {
    return api.get(`/payments/disputes/${disputeId}`);
  },

  /**
   * Respond to dispute
   * @param {string} disputeId - Dispute ID
   * @param {object} responseData - Response data
   * @returns {Promise} - Dispute response
   */
  respondToDispute: async (disputeId, responseData) => {
    return api.post(`/payments/disputes/${disputeId}/respond`, responseData);
  },

  /**
   * Get payment invoices
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment invoices response
   */
  getPaymentInvoices: async (params = {}) => {
    return api.get('/payments/invoices', { params });
  },

  /**
   * Get invoice by ID
   * @param {string} invoiceId - Invoice ID
   * @returns {Promise} - Invoice details response
   */
  getInvoiceById: async (invoiceId) => {
    return api.get(`/payments/invoices/${invoiceId}`);
  },

  /**
   * Generate invoice
   * @param {object} invoiceData - Invoice data
   * @returns {Promise} - Invoice generation response
   */
  generateInvoice: async (invoiceData) => {
    return api.post('/payments/invoices', invoiceData);
  },

  /**
   * Send invoice
   * @param {string} invoiceId - Invoice ID
   * @param {object} sendData - Send data
   * @returns {Promise} - Send invoice response
   */
  sendInvoice: async (invoiceId, sendData) => {
    return api.post(`/payments/invoices/${invoiceId}/send`, sendData);
  },

  /**
   * Get payment reports
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Payment reports response
   */
  getPaymentReports: async (filters = {}) => {
    return api.get('/payments/reports', { params: filters });
  },

  /**
   * Generate payment report
   * @param {object} reportData - Report data
   * @returns {Promise} - Report generation response
   */
  generatePaymentReport: async (reportData) => {
    return api.post('/payments/reports', reportData);
  },

  /**
   * Export payments
   * @param {object} filters - Filter parameters
   * @param {string} format - Export format (csv, excel, pdf)
   * @returns {Promise} - Export response
   */
  exportPayments: async (filters = {}, format = 'csv') => {
    return api.get('/payments/export', {
      params: { ...filters, format },
      responseType: 'blob',
    });
  },

  /**
   * Get payment settings
   * @returns {Promise} - Payment settings response
   */
  getPaymentSettings: async () => {
    return api.get('/payments/settings');
  },

  /**
   * Update payment settings
   * @param {object} settingsData - Settings data
   * @returns {Promise} - Settings update response
   */
  updatePaymentSettings: async (settingsData) => {
    return api.put('/payments/settings', settingsData);
  },

  /**
   * Get webhook events
   * @param {object} params - Query parameters
   * @returns {Promise} - Webhook events response
   */
  getWebhookEvents: async (params = {}) => {
    return api.get('/payments/webhooks', { params });
  },

  /**
   * Get webhook event by ID
   * @param {string} eventId - Webhook event ID
   * @returns {Promise} - Webhook event details response
   */
  getWebhookEventById: async (eventId) => {
    return api.get(`/payments/webhooks/${eventId}`);
  },

  /**
   * Retry webhook event
   * @param {string} eventId - Webhook event ID
   * @returns {Promise} - Retry webhook event response
   */
  retryWebhookEvent: async (eventId) => {
    return api.post(`/payments/webhooks/${eventId}/retry`);
  },

  /**
   * Get payment fees
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment fees response
   */
  getPaymentFees: async (params = {}) => {
    return api.get('/payments/fees', { params });
  },

  /**
   * Calculate payment fees
   * @param {object} feeData - Fee calculation data
   * @returns {Promise} - Fee calculation response
   */
  calculatePaymentFees: async (feeData) => {
    return api.post('/payments/fees/calculate', feeData);
  },

  /**
   * Get payment performance metrics
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Performance metrics response
   */
  getPaymentPerformanceMetrics: async (filters = {}) => {
    return api.get('/payments/performance', { params: filters });
  },

  /**
   * Get payment reconciliation
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment reconciliation response
   */
  getPaymentReconciliation: async (params = {}) => {
    return api.get('/payments/reconciliation', { params });
  },

  /**
   * Reconcile payments
   * @param {object} reconciliationData - Reconciliation data
   * @returns {Promise} - Reconciliation response
   */
  reconcilePayments: async (reconciliationData) => {
    return api.post('/payments/reconciliation', reconciliationData);
  },
};

export default paymentService; 