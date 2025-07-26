import { api, API_ENDPOINTS } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Notification Service
 * Handles all notification-related API calls and local storage
 */
export const notificationService = {
  /**
   * Get all notifications for the vendor
   * @param {object} params - Query parameters (page, limit, type, isRead)
   * @returns {Promise} - Notifications response
   */
  getNotifications: async (params = {}) => {
    return api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, { params });
  },

  /**
   * Get notification by ID
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Notification data
   */
  getNotificationById: async (notificationId) => {
    return api.get(`/vendor/notifications/${notificationId}`);
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Update response
   */
  markNotificationAsRead: async (notificationId) => {
    return api.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ.replace(':id', notificationId));
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} - Update response
   */
  markAllNotificationsAsRead: async () => {
    return api.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  /**
   * Delete notification
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Delete response
   */
  deleteNotification: async (notificationId) => {
    return api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE.replace(':id', notificationId));
  },

  /**
   * Delete all notifications
   * @returns {Promise} - Delete response
   */
  deleteAllNotifications: async () => {
    return api.delete('/vendor/notifications/delete-all');
  },

  /**
   * Get notification settings
   * @returns {Promise} - Notification settings
   */
  getNotificationSettings: async () => {
    return api.get(API_ENDPOINTS.NOTIFICATIONS.SETTINGS);
  },

  /**
   * Update notification settings
   * @param {object} settings - Notification settings
   * @returns {Promise} - Update response
   */
  updateNotificationSettings: async (settings) => {
    return api.put(API_ENDPOINTS.NOTIFICATIONS.UPDATE_SETTINGS, settings);
  },

  /**
   * Subscribe to push notifications
   * @param {string} deviceToken - Device push token
   * @returns {Promise} - Subscription response
   */
  subscribeToPushNotifications: async (deviceToken) => {
    return api.post('/vendor/notifications/subscribe', {
      device_token: deviceToken,
    });
  },

  /**
   * Unsubscribe from push notifications
   * @param {string} deviceToken - Device push token
   * @returns {Promise} - Unsubscription response
   */
  unsubscribeFromPushNotifications: async (deviceToken) => {
    return api.post('/vendor/notifications/unsubscribe', {
      device_token: deviceToken,
    });
  },

  /**
   * Get notification statistics
   * @returns {Promise} - Notification statistics
   */
  getNotificationStats: async () => {
    return api.get('/vendor/notifications/statistics');
  },

  /**
   * Get unread notification count
   * @returns {Promise} - Unread count
   */
  getUnreadCount: async () => {
    return api.get('/vendor/notifications/unread-count');
  },

  /**
   * Get notifications by type
   * @param {string} type - Notification type (order, payment, system, etc.)
   * @param {object} params - Additional query parameters
   * @returns {Promise} - Filtered notifications
   */
  getNotificationsByType: async (type, params = {}) => {
    return api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, {
      params: { ...params, type },
    });
  },

  /**
   * Get recent notifications
   * @param {number} limit - Number of recent notifications to fetch
   * @returns {Promise} - Recent notifications
   */
  getRecentNotifications: async (limit = 10) => {
    return api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, {
      params: {
        limit,
        sort: 'created_at',
        order: 'desc',
      },
    });
  },

  /**
   * Bulk update notifications
   * @param {Array<string>} notificationIds - Array of notification IDs
   * @param {object} updates - Updates to apply
   * @returns {Promise} - Bulk update response
   */
  bulkUpdateNotifications: async (notificationIds, updates) => {
    return api.patch('/vendor/notifications/bulk-update', {
      notification_ids: notificationIds,
      updates,
    });
  },

  /**
   * Bulk delete notifications
   * @param {Array<string>} notificationIds - Array of notification IDs
   * @returns {Promise} - Bulk delete response
   */
  bulkDeleteNotifications: async (notificationIds) => {
    return api.delete('/vendor/notifications/bulk-delete', {
      data: { notification_ids: notificationIds },
    });
  },

  /**
   * Export notifications
   * @param {object} params - Export parameters (format, dateRange, etc.)
   * @returns {Promise} - Export response
   */
  exportNotifications: async (params = {}) => {
    return api.get('/vendor/notifications/export', { params });
  },

  /**
   * Get notification preferences for different notification types
   * @returns {Promise} - Notification preferences
   */
  getNotificationPreferences: async () => {
    return api.get('/vendor/notifications/preferences');
  },

  /**
   * Update notification preferences
   * @param {object} preferences - Notification preferences
   * @returns {Promise} - Update response
   */
  updateNotificationPreferences: async (preferences) => {
    return api.put('/vendor/notifications/preferences', preferences);
  },

  /**
   * Get notification delivery status
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Delivery status
   */
  getNotificationDeliveryStatus: async (notificationId) => {
    return api.get(`/vendor/notifications/${notificationId}/delivery-status`);
  },

  /**
   * Resend failed notification
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Resend response
   */
  resendNotification: async (notificationId) => {
    return api.post(`/vendor/notifications/${notificationId}/resend`);
  },

  /**
   * Get notification analytics
   * @param {object} params - Analytics parameters (dateRange, type, etc.)
   * @returns {Promise} - Analytics data
   */
  getNotificationAnalytics: async (params = {}) => {
    return api.get('/vendor/notifications/analytics', { params });
  },

  /**
   * Store notification locally (for offline support)
   * @param {object} notification - Notification data
   * @returns {Promise<void>}
   */
  storeNotificationLocally: async (notification) => {
    try {
      const storedNotifications = await AsyncStorage.getItem('localNotifications');
      const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
      
      notifications.unshift(notification);
      
      // Keep only last 100 notifications
      if (notifications.length > 100) {
        notifications.splice(100);
      }
      
      await AsyncStorage.setItem('localNotifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing notification locally:', error);
    }
  },

  /**
   * Get locally stored notifications
   * @returns {Promise<Array>} - Local notifications
   */
  getLocalNotifications: async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('localNotifications');
      return storedNotifications ? JSON.parse(storedNotifications) : [];
    } catch (error) {
      console.error('Error getting local notifications:', error);
      return [];
    }
  },

  /**
   * Clear locally stored notifications
   * @returns {Promise<void>}
   */
  clearLocalNotifications: async () => {
    try {
      await AsyncStorage.removeItem('localNotifications');
    } catch (error) {
      console.error('Error clearing local notifications:', error);
    }
  },

  /**
   * Sync local notifications with server
   * @returns {Promise} - Sync response
   */
  syncLocalNotifications: async () => {
    const localNotifications = await notificationService.getLocalNotifications();
    
    if (localNotifications.length === 0) {
      return { success: true, synced: 0 };
    }
    
    const response = await api.post('/vendor/notifications/sync', {
      notifications: localNotifications,
    });
    
    // Clear local notifications after successful sync
    await notificationService.clearLocalNotifications();
    
    return response;
  },

  /**
   * Get order notifications
   * @param {object} params - Query parameters
   * @returns {Promise} - Order notifications response
   */
  getOrderNotifications: async (params = {}) => {
    return api.get('/vendor/notifications/orders', { params });
  },

  /**
   * Get payment notifications
   * @param {object} params - Query parameters
   * @returns {Promise} - Payment notifications response
   */
  getPaymentNotifications: async (params = {}) => {
    return api.get('/vendor/notifications/payments', { params });
  },

  /**
   * Get system notifications
   * @param {object} params - Query parameters
   * @returns {Promise} - System notifications response
   */
  getSystemNotifications: async (params = {}) => {
    return api.get('/vendor/notifications/system', { params });
  },

  /**
   * Mark notification as important
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Update response
   */
  markNotificationAsImportant: async (notificationId) => {
    return api.patch(`/vendor/notifications/${notificationId}/important`);
  },

  /**
   * Get important notifications
   * @param {object} params - Query parameters
   * @returns {Promise} - Important notifications response
   */
  getImportantNotifications: async (params = {}) => {
    return api.get('/vendor/notifications/important', { params });
  },

  /**
   * Create a test notification
   * @param {object} testData - Test notification data
   * @returns {Promise} - Test notification response
   */
  createTestNotification: async (testData) => {
    return api.post('/vendor/notifications/test', testData);
  },
};

export default notificationService; 