import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

// Initial state
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  filters: {
    type: [],
    status: [],
    dateRange: null,
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
  settings: {
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    orderNotifications: true,
    menuNotifications: true,
    systemNotifications: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  },
  realTimeNotifications: [],
};

// Action types
const NOTIFICATION_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  SET_UNREAD_COUNT: 'SET_UNREAD_COUNT',
  SET_SETTINGS: 'SET_SETTINGS',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  ADD_REAL_TIME_NOTIFICATION: 'ADD_REAL_TIME_NOTIFICATION',
  CLEAR_REAL_TIME_NOTIFICATIONS: 'CLEAR_REAL_TIME_NOTIFICATIONS',
  REFRESH_NOTIFICATIONS: 'REFRESH_NOTIFICATIONS',
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case NOTIFICATION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case NOTIFICATION_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case NOTIFICATION_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        loading: false,
      };
    case NOTIFICATION_ACTIONS.UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id ? action.payload : notification
        ),
        loading: false,
      };
    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
        loading: false,
      };
    case NOTIFICATION_ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true, readAt: new Date().toISOString() }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case NOTIFICATION_ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          isRead: true,
          readAt: new Date().toISOString(),
        })),
        unreadCount: 0,
      };
    case NOTIFICATION_ACTIONS.SET_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: action.payload,
      };
    case NOTIFICATION_ACTIONS.SET_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case NOTIFICATION_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      };
    case NOTIFICATION_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case NOTIFICATION_ACTIONS.ADD_REAL_TIME_NOTIFICATION:
      return {
        ...state,
        realTimeNotifications: [action.payload, ...state.realTimeNotifications.slice(0, 4)], // Keep last 5
      };
    case NOTIFICATION_ACTIONS.CLEAR_REAL_TIME_NOTIFICATIONS:
      return {
        ...state,
        realTimeNotifications: [],
      };
    case NOTIFICATION_ACTIONS.REFRESH_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        pagination: { ...state.pagination, page: 1 },
      };
    default:
      return state;
  }
};

// Create context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadNotifications();
    loadSettings();
  }, []);

  // Load notifications when filters change
  useEffect(() => {
    if (state.filters) {
      loadNotifications();
    }
  }, [state.filters, state.pagination.page]);

  // Load notifications
  const loadNotifications = async (refresh = false) => {
    try {
      if (refresh) {
        dispatch({ type: NOTIFICATION_ACTIONS.REFRESH_NOTIFICATIONS });
      }

      dispatch({ type: NOTIFICATION_ACTIONS.SET_LOADING, payload: true });

      const response = await notificationService.getNotifications({
        page: state.pagination.page,
        limit: state.pagination.limit,
        ...state.filters,
      });

      const { notifications, pagination, unreadCount } = response.data;

      if (refresh || state.pagination.page === 1) {
        dispatch({ type: NOTIFICATION_ACTIONS.SET_NOTIFICATIONS, payload: notifications });
      } else {
        // Append new notifications for pagination
        dispatch({
          type: NOTIFICATION_ACTIONS.SET_NOTIFICATIONS,
          payload: [...state.notifications, ...notifications],
        });
      }

      dispatch({ type: NOTIFICATION_ACTIONS.SET_PAGINATION, payload: pagination });
      dispatch({ type: NOTIFICATION_ACTIONS.SET_UNREAD_COUNT, payload: unreadCount });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load notifications';
      dispatch({ type: NOTIFICATION_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  };

  // Load settings
  const loadSettings = async () => {
    try {
      const response = await notificationService.getSettings();
      const settings = response.data;

      dispatch({ type: NOTIFICATION_ACTIONS.SET_SETTINGS, payload: settings });
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);

      dispatch({ type: NOTIFICATION_ACTIONS.MARK_AS_READ, payload: notificationId });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to mark notification as read';
      return { success: false, error: errorMessage };
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      dispatch({ type: NOTIFICATION_ACTIONS.MARK_ALL_AS_READ });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to mark all notifications as read';
      return { success: false, error: errorMessage };
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      dispatch({ type: NOTIFICATION_ACTIONS.SET_LOADING, payload: true });

      await notificationService.deleteNotification(notificationId);

      dispatch({ type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION, payload: notificationId });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete notification';
      dispatch({ type: NOTIFICATION_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update settings
  const updateSettings = async (settings) => {
    try {
      const response = await notificationService.updateSettings(settings);
      const updatedSettings = response.data;

      dispatch({ type: NOTIFICATION_ACTIONS.SET_SETTINGS, payload: updatedSettings });
      return { success: true, settings: updatedSettings };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update settings';
      return { success: false, error: errorMessage };
    }
  };

  // Send test notification
  const sendTestNotification = async (type) => {
    try {
      await notificationService.sendTestNotification(type);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send test notification';
      return { success: false, error: errorMessage };
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: NOTIFICATION_ACTIONS.SET_FILTERS, payload: filters });
  };

  // Clear filters
  const clearFilters = () => {
    dispatch({
      type: NOTIFICATION_ACTIONS.SET_FILTERS,
      payload: {
        type: [],
        status: [],
        dateRange: null,
      },
    });
  };

  // Load more notifications (pagination)
  const loadMoreNotifications = () => {
    if (state.pagination.hasMore && !state.loading) {
      dispatch({
        type: NOTIFICATION_ACTIONS.SET_PAGINATION,
        payload: { page: state.pagination.page + 1 },
      });
    }
  };

  // Refresh notifications
  const refreshNotifications = () => {
    loadNotifications(true);
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: NOTIFICATION_ACTIONS.CLEAR_ERROR });
  };

  // Add real-time notification
  const addRealTimeNotification = (notification) => {
    dispatch({ type: NOTIFICATION_ACTIONS.ADD_REAL_TIME_NOTIFICATION, payload: notification });
  };

  // Clear real-time notifications
  const clearRealTimeNotifications = () => {
    dispatch({ type: NOTIFICATION_ACTIONS.CLEAR_REAL_TIME_NOTIFICATIONS });
  };

  // Get notifications by type
  const getNotificationsByType = (type) => {
    return state.notifications.filter(notification => notification.type === type);
  };

  // Get unread notifications
  const getUnreadNotifications = () => {
    return state.notifications.filter(notification => !notification.isRead);
  };

  // Get read notifications
  const getReadNotifications = () => {
    return state.notifications.filter(notification => notification.isRead);
  };

  const value = {
    // State
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    settings: state.settings,
    realTimeNotifications: state.realTimeNotifications,

    // Actions
    loadNotifications,
    loadSettings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
    sendTestNotification,
    setFilters,
    clearFilters,
    loadMoreNotifications,
    refreshNotifications,
    clearError,
    addRealTimeNotification,
    clearRealTimeNotifications,
    getNotificationsByType,
    getUnreadNotifications,
    getReadNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

// Custom hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 