import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { orderService } from '../services/orderService';

// Initial state
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  filters: {
    status: [],
    dateRange: null,
    searchTerm: '',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
  statistics: {
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
  },
};

// Action types
const ORDER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_ORDERS: 'SET_ORDERS',
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  REMOVE_ORDER: 'REMOVE_ORDER',
  SET_CURRENT_ORDER: 'SET_CURRENT_ORDER',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_STATISTICS: 'SET_STATISTICS',
  REFRESH_ORDERS: 'REFRESH_ORDERS',
};

// Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ORDER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ORDER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ORDER_ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ORDER_ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        loading: false,
      };
    case ORDER_ACTIONS.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
        currentOrder: state.currentOrder?.id === action.payload.id
          ? action.payload
          : state.currentOrder,
        loading: false,
      };
    case ORDER_ACTIONS.REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
        currentOrder: state.currentOrder?.id === action.payload
          ? null
          : state.currentOrder,
        loading: false,
      };
    case ORDER_ACTIONS.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case ORDER_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      };
    case ORDER_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case ORDER_ACTIONS.SET_STATISTICS:
      return {
        ...state,
        statistics: action.payload,
      };
    case ORDER_ACTIONS.REFRESH_ORDERS:
      return {
        ...state,
        orders: [],
        pagination: { ...state.pagination, page: 1 },
      };
    default:
      return state;
  }
};

// Create context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load initial orders
  useEffect(() => {
    loadOrders();
  }, [state.filters, state.pagination.page]);

  // Load orders
  const loadOrders = async (refresh = false) => {
    try {
      if (refresh) {
        dispatch({ type: ORDER_ACTIONS.REFRESH_ORDERS });
      }

      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });

      const response = await orderService.getOrders({
        page: state.pagination.page,
        limit: state.pagination.limit,
        ...state.filters,
      });

      const { orders, pagination, statistics } = response.data;

      if (refresh || state.pagination.page === 1) {
        dispatch({ type: ORDER_ACTIONS.SET_ORDERS, payload: orders });
      } else {
        // Append new orders for pagination
        dispatch({
          type: ORDER_ACTIONS.SET_ORDERS,
          payload: [...state.orders, ...orders],
        });
      }

      dispatch({ type: ORDER_ACTIONS.SET_PAGINATION, payload: pagination });
      dispatch({ type: ORDER_ACTIONS.SET_STATISTICS, payload: statistics });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load orders';
      dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  };

  // Get order by ID
  const getOrderById = async (orderId) => {
    try {
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });

      const response = await orderService.getOrderById(orderId);
      const order = response.data;

      dispatch({ type: ORDER_ACTIONS.SET_CURRENT_ORDER, payload: order });
      return { success: true, order };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load order';
      dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status, notes = '') => {
    try {
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });

      const response = await orderService.updateOrderStatus(orderId, status, notes);
      const updatedOrder = response.data;

      dispatch({ type: ORDER_ACTIONS.UPDATE_ORDER, payload: updatedOrder });

      // Refresh statistics
      loadStatistics();

      return { success: true, order: updatedOrder };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update order';
      dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    try {
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });

      const response = await orderService.createOrder(orderData);
      const newOrder = response.data;

      dispatch({ type: ORDER_ACTIONS.ADD_ORDER, payload: newOrder });

      // Refresh statistics
      loadStatistics();

      return { success: true, order: newOrder };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create order';
      dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Cancel order
  const cancelOrder = async (orderId, reason = '') => {
    try {
      dispatch({ type: ORDER_ACTIONS.SET_LOADING, payload: true });

      const response = await orderService.cancelOrder(orderId, reason);
      const cancelledOrder = response.data;

      dispatch({ type: ORDER_ACTIONS.UPDATE_ORDER, payload: cancelledOrder });

      // Refresh statistics
      loadStatistics();

      return { success: true, order: cancelledOrder };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel order';
      dispatch({ type: ORDER_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    try {
      const response = await orderService.getOrderStatistics();
      const statistics = response.data;

      dispatch({ type: ORDER_ACTIONS.SET_STATISTICS, payload: statistics });
    } catch (error) {
      console.error('Failed to load order statistics:', error);
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: ORDER_ACTIONS.SET_FILTERS, payload: filters });
  };

  // Clear filters
  const clearFilters = () => {
    dispatch({
      type: ORDER_ACTIONS.SET_FILTERS,
      payload: {
        status: [],
        dateRange: null,
        searchTerm: '',
      },
    });
  };

  // Load more orders (pagination)
  const loadMoreOrders = () => {
    if (state.pagination.hasMore && !state.loading) {
      dispatch({
        type: ORDER_ACTIONS.SET_PAGINATION,
        payload: { page: state.pagination.page + 1 },
      });
    }
  };

  // Refresh orders
  const refreshOrders = () => {
    loadOrders(true);
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ORDER_ACTIONS.CLEAR_ERROR });
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return state.orders.filter(order => order.status === status);
  };

  // Get pending orders
  const getPendingOrders = () => {
    return getOrdersByStatus('pending');
  };

  // Get completed orders
  const getCompletedOrders = () => {
    return getOrdersByStatus('completed');
  };

  const value = {
    // State
    orders: state.orders,
    currentOrder: state.currentOrder,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    statistics: state.statistics,

    // Actions
    loadOrders,
    getOrderById,
    updateOrderStatus,
    createOrder,
    cancelOrder,
    setFilters,
    clearFilters,
    loadMoreOrders,
    refreshOrders,
    clearError,
    getOrdersByStatus,
    getPendingOrders,
    getCompletedOrders,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

// Custom hook to use order context
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 