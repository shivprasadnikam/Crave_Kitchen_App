import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

// Initial state
const initialState = {
  dashboardData: null,
  revenueData: null,
  orderData: null,
  customerData: null,
  menuData: null,
  inventoryData: null,
  performanceData: null,
  loading: false,
  error: null,
  filters: {
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end: new Date(),
    },
    period: '30d',
    category: [],
    status: [],
  },
  realTimeData: {
    activeOrders: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    todayOrders: 0,
  },
};

// Action types
const ANALYTICS_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
  SET_REVENUE_DATA: 'SET_REVENUE_DATA',
  SET_ORDER_DATA: 'SET_ORDER_DATA',
  SET_CUSTOMER_DATA: 'SET_CUSTOMER_DATA',
  SET_MENU_DATA: 'SET_MENU_DATA',
  SET_INVENTORY_DATA: 'SET_INVENTORY_DATA',
  SET_PERFORMANCE_DATA: 'SET_PERFORMANCE_DATA',
  SET_FILTERS: 'SET_FILTERS',
  SET_REAL_TIME_DATA: 'SET_REAL_TIME_DATA',
  REFRESH_DATA: 'REFRESH_DATA',
};

// Reducer
const analyticsReducer = (state, action) => {
  switch (action.type) {
    case ANALYTICS_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ANALYTICS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ANALYTICS_ACTIONS.SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_REVENUE_DATA:
      return {
        ...state,
        revenueData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_MENU_DATA:
      return {
        ...state,
        menuData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_INVENTORY_DATA:
      return {
        ...state,
        inventoryData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_PERFORMANCE_DATA:
      return {
        ...state,
        performanceData: action.payload,
        loading: false,
      };
    case ANALYTICS_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case ANALYTICS_ACTIONS.SET_REAL_TIME_DATA:
      return {
        ...state,
        realTimeData: action.payload,
      };
    case ANALYTICS_ACTIONS.REFRESH_DATA:
      return {
        ...state,
        dashboardData: null,
        revenueData: null,
        orderData: null,
        customerData: null,
        menuData: null,
        inventoryData: null,
        performanceData: null,
      };
    default:
      return state;
  }
};

// Create context
const AnalyticsContext = createContext();

// Provider component
export const AnalyticsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(analyticsReducer, initialState);

  // Load dashboard data on mount
  useEffect(() => {
    loadDashboardData();
    loadRealTimeData();
  }, []);

  // Load data when filters change
  useEffect(() => {
    if (state.filters) {
      loadDashboardData();
    }
  }, [state.filters]);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getDashboardData(state.filters);
      const dashboardData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_DASHBOARD_DATA, payload: dashboardData });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load dashboard data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  };

  // Load revenue analytics
  const loadRevenueData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getRevenueAnalytics(filters);
      const revenueData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_REVENUE_DATA, payload: revenueData });
      return { success: true, data: revenueData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load revenue data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load order analytics
  const loadOrderData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getOrderAnalytics(filters);
      const orderData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_ORDER_DATA, payload: orderData });
      return { success: true, data: orderData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load order data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load customer analytics
  const loadCustomerData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getCustomerAnalytics(filters);
      const customerData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_CUSTOMER_DATA, payload: customerData });
      return { success: true, data: customerData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load customer data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load menu analytics
  const loadMenuData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getMenuAnalytics(filters);
      const menuData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_MENU_DATA, payload: menuData });
      return { success: true, data: menuData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load menu data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load inventory analytics
  const loadInventoryData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getInventoryAnalytics(filters);
      const inventoryData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_INVENTORY_DATA, payload: inventoryData });
      return { success: true, data: inventoryData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load inventory data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load performance analytics
  const loadPerformanceData = async (filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.getPerformanceAnalytics(filters);
      const performanceData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_PERFORMANCE_DATA, payload: performanceData });
      return { success: true, data: performanceData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load performance data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load real-time data
  const loadRealTimeData = async () => {
    try {
      const response = await analyticsService.getRealTimeData();
      const realTimeData = response.data;

      dispatch({ type: ANALYTICS_ACTIONS.SET_REAL_TIME_DATA, payload: realTimeData });
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    }
  };

  // Generate report
  const generateReport = async (reportType, filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.generateReport(reportType, filters);
      const report = response.data;

      return { success: true, report };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to generate report';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Export data
  const exportData = async (dataType, format, filters = state.filters) => {
    try {
      dispatch({ type: ANALYTICS_ACTIONS.SET_LOADING, payload: true });

      const response = await analyticsService.exportData(dataType, format, filters);
      const exportData = response.data;

      return { success: true, data: exportData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to export data';
      dispatch({ type: ANALYTICS_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: ANALYTICS_ACTIONS.SET_FILTERS, payload: filters });
  };

  // Clear filters
  const clearFilters = () => {
    dispatch({
      type: ANALYTICS_ACTIONS.SET_FILTERS,
      payload: {
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        period: '30d',
        category: [],
        status: [],
      },
    });
  };

  // Refresh all data
  const refreshData = () => {
    dispatch({ type: ANALYTICS_ACTIONS.REFRESH_DATA });
    loadDashboardData();
    loadRealTimeData();
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ANALYTICS_ACTIONS.CLEAR_ERROR });
  };

  // Get trend analysis
  const getTrendAnalysis = async (metric, period) => {
    try {
      const response = await analyticsService.getTrendAnalysis(metric, period);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get trend analysis';
      return { success: false, error: errorMessage };
    }
  };

  // Get comparative analysis
  const getComparativeAnalysis = async (metric, period1, period2) => {
    try {
      const response = await analyticsService.getComparativeAnalysis(metric, period1, period2);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get comparative analysis';
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    // State
    dashboardData: state.dashboardData,
    revenueData: state.revenueData,
    orderData: state.orderData,
    customerData: state.customerData,
    menuData: state.menuData,
    inventoryData: state.inventoryData,
    performanceData: state.performanceData,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    realTimeData: state.realTimeData,

    // Actions
    loadDashboardData,
    loadRevenueData,
    loadOrderData,
    loadCustomerData,
    loadMenuData,
    loadInventoryData,
    loadPerformanceData,
    loadRealTimeData,
    generateReport,
    exportData,
    setFilters,
    clearFilters,
    refreshData,
    clearError,
    getTrendAnalysis,
    getComparativeAnalysis,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

// Custom hook to use analytics context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}; 