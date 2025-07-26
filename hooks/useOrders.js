import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOrders as useOrdersContext } from '../context/OrderContext';
import { useNotifications } from '../context/NotificationContext';

export const useOrders = () => {
  const {
    orders,
    selectedOrder,
    filters,
    isLoading,
    error,
    lastSync,
    filteredOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    completedOrders,
    cancelledOrders,
    fetchOrders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    acceptOrder,
    rejectOrder,
    markOrderReady,
    markOrderDelivered,
    setSelectedOrder,
    setFilters,
    clearError,
    getOrdersByStatus,
    getOrderById,
  } = useOrdersContext();

  const { addOrderNotification } = useNotifications();

  // Local state for additional functionality
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  // Computed values
  const sortedOrders = useMemo(() => {
    let sorted = [...filteredOrders];
    
    switch (sortBy) {
      case 'createdAt':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'updatedAt':
        sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;
      case 'total':
        sorted.sort((a, b) => a.total - b.total);
        break;
      case 'customerName':
        sorted.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
      case 'orderNumber':
        sorted.sort((a, b) => a.orderNumber.localeCompare(b.orderNumber));
        break;
      default:
        break;
    }
    
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    
    return sorted;
  }, [filteredOrders, sortBy, sortOrder]);

  const orderStats = useMemo(() => {
    const total = orders.length;
    const pending = pendingOrders.length;
    const preparing = preparingOrders.length;
    const ready = readyOrders.length;
    const completed = completedOrders.length;
    const cancelled = cancelledOrders.length;
    
    const totalRevenue = completed.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = completed.length > 0 ? totalRevenue / completed.length : 0;
    
    return {
      total,
      pending,
      preparing,
      ready,
      completed,
      cancelled,
      totalRevenue,
      averageOrderValue,
    };
  }, [orders, pendingOrders, preparingOrders, readyOrders, completedOrders, cancelledOrders]);

  const recentOrders = useMemo(() => {
    return sortedOrders.slice(0, 10);
  }, [sortedOrders]);

  const urgentOrders = useMemo(() => {
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
    
    return pendingOrders.filter(order => {
      const orderTime = new Date(order.createdAt);
      return orderTime < thirtyMinutesAgo;
    });
  }, [pendingOrders]);

  // Enhanced actions with notifications
  const handleAcceptOrder = useCallback(async (orderId) => {
    try {
      await acceptOrder(orderId);
      const order = getOrderById(orderId);
      if (order) {
        addOrderNotification(
          orderId,
          order.customerName,
          order.total.toFixed(2)
        );
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      throw error;
    }
  }, [acceptOrder, getOrderById, addOrderNotification]);

  const handleRejectOrder = useCallback(async (orderId, reason) => {
    try {
      await rejectOrder(orderId, reason);
    } catch (error) {
      console.error('Error rejecting order:', error);
      throw error;
    }
  }, [rejectOrder]);

  const handleMarkOrderReady = useCallback(async (orderId) => {
    try {
      await markOrderReady(orderId);
      const order = getOrderById(orderId);
      if (order) {
        addOrderNotification(
          orderId,
          order.customerName,
          'Order is ready for pickup'
        );
      }
    } catch (error) {
      console.error('Error marking order ready:', error);
      throw error;
    }
  }, [markOrderReady, getOrderById, addOrderNotification]);

  const handleMarkOrderDelivered = useCallback(async (orderId) => {
    try {
      await markOrderDelivered(orderId);
    } catch (error) {
      console.error('Error marking order delivered:', error);
      throw error;
    }
  }, [markOrderDelivered]);

  // Filter and search functions
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
    setFilters({ searchQuery: query });
  }, [setFilters]);

  const updateStatusFilter = useCallback((status) => {
    setSelectedStatus(status);
    setFilters({ status });
  }, [setFilters]);

  const updateDateRange = useCallback((start, end) => {
    setDateRange({ start, end });
    setFilters({ dateRange: { start, end } });
  }, [setFilters]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setDateRange(null);
    setFilters({
      status: 'all',
      searchQuery: '',
      dateRange: null,
    });
  }, [setFilters]);

  // Sorting functions
  const updateSorting = useCallback((field, order = 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  // Utility functions
  const getOrderStatusColor = useCallback((status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'preparing':
        return '#9C27B0';
      case 'ready':
        return '#4CAF50';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }, []);

  const getOrderStatusText = useCallback((status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }, []);

  const formatOrderTime = useCallback((timestamp) => {
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

  const calculateOrderTotal = useCallback((order) => {
    return order.items.reduce((total, item) => total + item.total, 0);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchOrders();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchOrders, isLoading]);

  return {
    // State
    orders,
    selectedOrder,
    filters,
    isLoading,
    error,
    lastSync,
    
    // Local state
    sortBy,
    sortOrder,
    searchQuery,
    selectedStatus,
    dateRange,
    
    // Computed values
    sortedOrders,
    filteredOrders,
    recentOrders,
    urgentOrders,
    orderStats,
    pendingOrders,
    preparingOrders,
    readyOrders,
    completedOrders,
    cancelledOrders,
    
    // Actions
    fetchOrders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    acceptOrder: handleAcceptOrder,
    rejectOrder: handleRejectOrder,
    markOrderReady: handleMarkOrderReady,
    markOrderDelivered: handleMarkOrderDelivered,
    setSelectedOrder,
    setFilters,
    clearError,
    
    // Filter and search
    updateSearchQuery,
    updateStatusFilter,
    updateDateRange,
    clearFilters,
    
    // Sorting
    updateSorting,
    
    // Utility functions
    getOrderById,
    getOrdersByStatus,
    getOrderStatusColor,
    getOrderStatusText,
    formatOrderTime,
    calculateOrderTotal,
  };
}; 