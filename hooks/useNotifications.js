import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNotifications as useNotificationsContext } from '../context/NotificationContext';

export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    settings,
    isLoading,
    error,
    lastSync,
    orderNotifications,
    paymentNotifications,
    systemNotifications,
    recentNotifications,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updateSettings,
    clearError,
    addOrderNotification,
    addPaymentNotification,
    addSystemNotification,
    getNotificationsByType,
    getRecentNotifications,
  } = useNotificationsContext();

  // Local state for additional functionality
  const [filters, setFilters] = useState({
    type: 'all', // all, order, payment, system
    readStatus: 'all', // all, read, unread
    dateRange: null,
  });
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [groupBy, setGroupBy] = useState('none'); // none, type, date
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);

  // Constants
  const AUTO_REFRESH_INTERVAL = 60000; // 1 minute
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30;
  const URGENT_KEYWORDS = ['error', 'critical', 'urgent', 'failed', 'out of stock'];

  // Computed values
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(notification => notification.type === filters.type);
    }

    // Apply read status filter
    if (filters.readStatus !== 'all') {
      const isRead = filters.readStatus === 'read';
      filtered = filtered.filter(notification => notification.isRead === isRead);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(notification => {
        const notificationDate = new Date(notification.timestamp);
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;

        if (startDate && endDate) {
          return notificationDate >= startDate && notificationDate <= endDate;
        } else if (startDate) {
          return notificationDate >= startDate;
        } else if (endDate) {
          return notificationDate <= endDate;
        }
        return true;
      });
    }

    return filtered;
  }, [notifications, filters]);

  const sortedNotifications = useMemo(() => {
    let sorted = [...filteredNotifications];

    switch (sortBy) {
      case 'timestamp':
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'type':
        sorted.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'readStatus':
        sorted.sort((a, b) => {
          if (a.isRead === b.isRead) return 0;
          return a.isRead ? 1 : -1;
        });
        break;
      default:
        break;
    }

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredNotifications, sortBy, sortOrder]);

  const groupedNotifications = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Notifications': sortedNotifications };
    }

    if (groupBy === 'type') {
      const grouped = {
        'Order Notifications': [],
        'Payment Notifications': [],
        'System Notifications': [],
      };

      sortedNotifications.forEach(notification => {
        switch (notification.type) {
          case 'order':
            grouped['Order Notifications'].push(notification);
            break;
          case 'payment':
            grouped['Payment Notifications'].push(notification);
            break;
          case 'system':
            grouped['System Notifications'].push(notification);
            break;
          default:
            break;
        }
      });

      return grouped;
    }

    if (groupBy === 'date') {
      const grouped = {};
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisWeek = new Date(today.getTime() - DAYS_IN_WEEK * 24 * 60 * 60 * 1000);
      const thisMonth = new Date(today.getTime() - DAYS_IN_MONTH * 24 * 60 * 60 * 1000);

      sortedNotifications.forEach(notification => {
        const notificationDate = new Date(notification.timestamp);
        let groupName = 'Older';

        if (notificationDate.toDateString() === today.toDateString()) {
          groupName = 'Today';
        } else if (notificationDate.toDateString() === yesterday.toDateString()) {
          groupName = 'Yesterday';
        } else if (notificationDate >= thisWeek) {
          groupName = 'This Week';
        } else if (notificationDate >= thisMonth) {
          groupName = 'This Month';
        }

        if (!grouped[groupName]) {
          grouped[groupName] = [];
        }
        grouped[groupName].push(notification);
      });

      return grouped;
    }

    return { 'All Notifications': sortedNotifications };
  }, [sortedNotifications, groupBy]);

  const notificationStats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const read = total - unread;

    const byType = {
      order: notifications.filter(n => n.type === 'order').length,
      payment: notifications.filter(n => n.type === 'payment').length,
      system: notifications.filter(n => n.type === 'system').length,
    };

    const today = new Date();
    const todayNotifications = notifications.filter(n => {
      const notificationDate = new Date(n.timestamp);
      return notificationDate.toDateString() === today.toDateString();
    }).length;

    return {
      total,
      unread,
      read,
      byType,
      today: todayNotifications,
    };
  }, [notifications]);

  const urgentNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Consider order notifications urgent if they're unread
      if (notification.type === 'order' && !notification.isRead) {
        return true;
      }
      
      // Consider payment notifications urgent
      if (notification.type === 'payment') {
        return true;
      }
      
      // Consider system notifications urgent if they contain keywords
      if (notification.type === 'system') {
        return URGENT_KEYWORDS.some(keyword => 
          notification.title.toLowerCase().includes(keyword) ||
          notification.message.toLowerCase().includes(keyword)
        );
      }
      
      return false;
    });
  }, [notifications]);

  // Enhanced actions
  const handleMarkAsRead = useCallback(async (notificationId) => {
    try {
      await markAsRead(notificationId);
      
      // Remove from selected notifications if it was selected
      setSelectedNotifications(prev => 
        prev.filter(id => id !== notificationId)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }, [markAsRead]);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllAsRead();
      setSelectedNotifications([]);
      setIsBulkEditing(false);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }, [markAllAsRead]);

  const handleDeleteNotification = useCallback(async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      
      // Remove from selected notifications if it was selected
      setSelectedNotifications(prev => 
        prev.filter(id => id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }, [deleteNotification]);

  const handleClearAllNotifications = useCallback(async () => {
    try {
      await clearAllNotifications();
      setSelectedNotifications([]);
      setIsBulkEditing(false);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      throw error;
    }
  }, [clearAllNotifications]);

  // Bulk operations
  const handleBulkMarkAsRead = useCallback(async (notificationIds) => {
    try {
      const promises = notificationIds.map(id => markAsRead(id));
      await Promise.all(promises);
      
      setSelectedNotifications([]);
      setIsBulkEditing(false);
    } catch (error) {
      console.error('Error bulk marking notifications as read:', error);
      throw error;
    }
  }, [markAsRead]);

  const handleBulkDelete = useCallback(async (notificationIds) => {
    try {
      const promises = notificationIds.map(id => deleteNotification(id));
      await Promise.all(promises);
      
      setSelectedNotifications([]);
      setIsBulkEditing(false);
    } catch (error) {
      console.error('Error bulk deleting notifications:', error);
      throw error;
    }
  }, [deleteNotification]);

  // Selection management
  const toggleNotificationSelection = useCallback((notificationId) => {
    setSelectedNotifications(prev => {
      if (prev.includes(notificationId)) {
        return prev.filter(id => id !== notificationId);
      } else {
        return [...prev, notificationId];
      }
    });
  }, []);

  const selectAllNotifications = useCallback(() => {
    setSelectedNotifications(sortedNotifications.map(n => n.id));
  }, [sortedNotifications]);

  const clearSelection = useCallback(() => {
    setSelectedNotifications([]);
  }, []);

  // Filter and search functions
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      type: 'all',
      readStatus: 'all',
      dateRange: null,
    });
  }, []);

  const updateDateRange = useCallback((start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end },
    }));
  }, []);

  // Sorting functions
  const updateSorting = useCallback((field, order = 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  // Settings management
  const updateNotificationSettings = useCallback(async (newSettings) => {
    try {
      await updateSettings(newSettings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }, [updateSettings]);

  const toggleNotificationType = useCallback(async (type) => {
    try {
      const settingKey = `${type}Notifications`;
      const newSettings = { [settingKey]: !settings[settingKey] };
      await updateSettings(newSettings);
    } catch (error) {
      console.error('Error toggling notification type:', error);
      throw error;
    }
  }, [settings, updateSettings]);

  // Utility functions
  const getNotificationIcon = useCallback((type) => {
    switch (type) {
      case 'order':
        return 'shopping-cart';
      case 'payment':
        return 'credit-card';
      case 'system':
        return 'settings';
      default:
        return 'notifications';
    }
  }, []);

  const getNotificationColor = useCallback((type) => {
    switch (type) {
      case 'order':
        return '#2196F3';
      case 'payment':
        return '#4CAF50';
      case 'system':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  }, []);

  const formatNotificationTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }, []);

  const isNotificationSelected = useCallback((notificationId) => {
    return selectedNotifications.includes(notificationId);
  }, [selectedNotifications]);

  const getSelectedCount = useCallback(() => {
    return selectedNotifications.length;
  }, [selectedNotifications]);

  const hasUnreadNotifications = useCallback(() => {
    return unreadCount > 0;
  }, [unreadCount]);

  const getUnreadCountByType = useCallback((type) => {
    return notifications.filter(n => n.type === type && !n.isRead).length;
  }, [notifications]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchNotifications();
      }
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchNotifications, isLoading]);

  return {
    // State
    notifications,
    unreadCount,
    settings,
    isLoading,
    error,
    lastSync,
    
    // Local state
    filters,
    sortBy,
    sortOrder,
    groupBy,
    selectedNotifications,
    isBulkEditing,
    
    // Computed values
    filteredNotifications,
    sortedNotifications,
    groupedNotifications,
    notificationStats,
    urgentNotifications,
    orderNotifications,
    paymentNotifications,
    systemNotifications,
    recentNotifications,
    
    // Actions
    fetchNotifications,
    addNotification,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
    clearAllNotifications: handleClearAllNotifications,
    updateSettings: updateNotificationSettings,
    clearError,
    
    // Enhanced actions
    addOrderNotification,
    addPaymentNotification,
    addSystemNotification,
    
    // Bulk operations
    handleBulkMarkAsRead,
    handleBulkDelete,
    
    // Selection management
    toggleNotificationSelection,
    selectAllNotifications,
    clearSelection,
    isNotificationSelected,
    getSelectedCount,
    
    // Filter and search
    updateFilters,
    clearFilters,
    updateDateRange,
    
    // Sorting and grouping
    updateSorting,
    setGroupBy,
    
    // Settings management
    toggleNotificationType,
    
    // Utility functions
    getNotificationsByType,
    getRecentNotifications,
    getNotificationIcon,
    getNotificationColor,
    formatNotificationTime,
    hasUnreadNotifications,
    getUnreadCountByType,
    
    // State setters
    setIsBulkEditing,
  };
}; 