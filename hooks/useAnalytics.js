import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAnalytics as useAnalyticsContext } from '../context/AnalyticsContext';
import { useOrders } from './useOrders';
import { useMenu } from './useMenu';

export const useAnalytics = () => {
  const {
    revenue,
    orders: analyticsOrders,
    customers,
    menu: analyticsMenu,
    timeRange,
    dateRange,
    isLoading,
    error,
    lastUpdated,
    revenueGrowth,
    orderGrowth,
    customerGrowth,
    fetchRevenueAnalytics,
    fetchOrderAnalytics,
    fetchCustomerAnalytics,
    fetchMenuAnalytics,
    fetchAllAnalytics,
    setTimeRange,
    setDateRange,
    clearError,
  } = useAnalyticsContext();

  const { orders, orderStats } = useOrders();
  const { menuItems, menuStats } = useMenu();

  // Local state for additional functionality
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  // Constants
  const AUTO_REFRESH_INTERVAL = 300000; // 5 minutes
  const WEEK_DAYS = 7;
  const WEEKS_PER_MONTH = 4.33;
  const PEAK_HOURS_THRESHOLD = 0.5;
  const UNAVAILABILITY_WARNING_THRESHOLD = 0.2;
  const REVENUE_GROWTH_THRESHOLDS = {
    POSITIVE: 10,
    NEGATIVE: -5,
  };
  const PENDING_ORDERS_WARNING = 5;
  const NEW_CUSTOMER_RATIO = 0.5;
  const POPULAR_ITEMS_LIMIT = 5;
  const CHART_DATA_POINTS = 7;

  // Computed values for enhanced analytics
  const enhancedRevenueData = useMemo(() => {
    if (!revenue.current) return null;

    const current = revenue.current;
    const previous = revenue.previous;
    
    return {
      ...revenue,
      current,
      previous,
      growth: revenueGrowth,
      trend: revenue.trend || [],
      breakdown: revenue.breakdown || {},
      // Additional computed values
      dailyAverage: current.total / WEEK_DAYS, // Assuming week period
      projectedMonthly: current.total * WEEKS_PER_MONTH, // Average weeks per month
      topRevenueSource: getTopRevenueSource(revenue.breakdown),
    };
  }, [revenue, revenueGrowth]);

  const enhancedOrderData = useMemo(() => {
    if (!analyticsOrders) return null;

    return {
      ...analyticsOrders,
      growth: orderGrowth,
      trend: analyticsOrders.orderTrend || [],
      // Additional computed values
      averagePreparationTime: calculateAveragePreparationTime(orders),
      peakHours: calculatePeakHours(orders),
      popularItems: getPopularItems(orders),
      customerRetention: calculateCustomerRetention(orders),
    };
  }, [analyticsOrders, orderGrowth, orders]);

  const enhancedCustomerData = useMemo(() => {
    if (!customers) return null;

    return {
      ...customers,
      growth: customerGrowth,
      trend: customers.customerTrend || [],
      // Additional computed values
      averageOrderValue: customers.total > 0 ? revenue.current?.total / customers.total : 0,
      customerLifetimeValue: calculateCustomerLifetimeValue(customers.topCustomers),
      newCustomerRate: customers.new / customers.total * 100,
      returningCustomerRate: customers.returning / customers.total * 100,
    };
  }, [customers, customerGrowth, revenue.current]);

  const enhancedMenuData = useMemo(() => {
    if (!analyticsMenu) return null;

    return {
      ...analyticsMenu,
      // Additional computed values
      categoryPerformance: analyticsMenu.categoryPerformance || [],
      itemTrends: analyticsMenu.itemTrends || [],
      lowPerformingItems: analyticsMenu.lowPerformingItems || [],
      // Menu-specific analytics
      averageItemPrice: menuStats.averagePrice,
      availabilityRate: (menuStats.available / menuStats.total) * 100,
      categoryDistribution: calculateCategoryDistribution(menuItems),
    };
  }, [analyticsMenu, menuStats, menuItems]);

  // Dashboard summary data
  const dashboardSummary = useMemo(() => {
    return {
      revenue: {
        current: revenue.current?.total || 0,
        growth: revenueGrowth,
        trend: revenue.trend?.slice(-CHART_DATA_POINTS) || [], // Last 7 data points
      },
      orders: {
        total: orderStats.total,
        pending: orderStats.pending,
        completed: orderStats.completed,
        growth: orderGrowth,
      },
      customers: {
        total: customers.total || 0,
        new: customers.new || 0,
        returning: customers.returning || 0,
        growth: customerGrowth,
      },
      menu: {
        total: menuStats.total,
        available: menuStats.available,
        categories: menuStats.categoriesCount,
      },
    };
  }, [revenue, revenueGrowth, orderStats, orderGrowth, customers, customerGrowth, menuStats]);

  // Chart data preparation
  const chartData = useMemo(() => {
    return {
      revenue: prepareChartData(revenue.trend, 'Revenue Trend', 'revenue'),
      orders: prepareChartData(analyticsOrders?.orderTrend, 'Orders Trend', 'orders'),
      customers: prepareChartData(customers?.customerTrend, 'Customers Trend', 'customers'),
      menu: prepareChartData(analyticsMenu?.itemTrends, 'Menu Items Trend', 'items'),
    };
  }, [revenue.trend, analyticsOrders?.orderTrend, customers?.customerTrend, analyticsMenu?.itemTrends]);

  // Enhanced actions
  const handleFetchAnalytics = useCallback(async (period = selectedPeriod) => {
    try {
      setSelectedPeriod(period);
      setTimeRange(period);
      await fetchAllAnalytics(period);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }, [selectedPeriod, setTimeRange, fetchAllAnalytics]);

  const handleExportReport = useCallback(async (format = exportFormat) => {
    try {
      setIsExporting(true);
      // TODO: Implement report export functionality
      // await exportService.exportReport(format, {
      //   revenue: enhancedRevenueData,
      //   orders: enhancedOrderData,
      //   customers: enhancedCustomerData,
      //   menu: enhancedMenuData,
      // });
      
      // Mock export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { success: true, format };
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  }, [exportFormat, enhancedRevenueData, enhancedOrderData, enhancedCustomerData, enhancedMenuData]);

  const handleGenerateInsights = useCallback(() => {
    const insights = [];
    
    // Revenue insights
    if (revenueGrowth > REVENUE_GROWTH_THRESHOLDS.POSITIVE) {
      insights.push({
        type: 'positive',
        category: 'revenue',
        title: 'Strong Revenue Growth',
        message: `Revenue increased by ${revenueGrowth.toFixed(1)}% compared to the previous period.`,
      });
    } else if (revenueGrowth < REVENUE_GROWTH_THRESHOLDS.NEGATIVE) {
      insights.push({
        type: 'negative',
        category: 'revenue',
        title: 'Revenue Decline',
        message: `Revenue decreased by ${Math.abs(revenueGrowth).toFixed(1)}%. Consider promotional strategies.`,
      });
    }
    
    // Order insights
    if (orderStats.pending > PENDING_ORDERS_WARNING) {
      insights.push({
        type: 'warning',
        category: 'orders',
        title: 'High Pending Orders',
        message: `${orderStats.pending} orders are pending. Consider increasing kitchen capacity.`,
      });
    }
    
    // Customer insights
    if (customers.new > customers.returning * NEW_CUSTOMER_RATIO) {
      insights.push({
        type: 'positive',
        category: 'customers',
        title: 'New Customer Acquisition',
        message: `Strong new customer acquisition with ${customers.new} new customers.`,
      });
    }
    
    // Menu insights
    if (menuStats.unavailable > menuStats.total * UNAVAILABILITY_WARNING_THRESHOLD) {
      insights.push({
        type: 'warning',
        category: 'menu',
        title: 'High Unavailability Rate',
        message: `${((menuStats.unavailable / menuStats.total) * 100).toFixed(1)}% of menu items are unavailable.`,
      });
    }
    
    return insights;
  }, [revenueGrowth, orderStats, customers, menuStats]);

  // Utility functions
  const getTopRevenueSource = useCallback((breakdown) => {
    if (!breakdown) return null;
    
    const sources = Object.entries(breakdown);
    return sources.reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, 
      { key: '', value: 0 }
    );
  }, []);

  const calculateAveragePreparationTime = useCallback((orders) => {
    const completedOrders = orders.filter(order => order.status === 'delivered');
    if (completedOrders.length === 0) return 0;
    
    const totalTime = completedOrders.reduce((sum, order) => {
      const created = new Date(order.createdAt);
      const updated = new Date(order.updatedAt);
      return sum + (updated - created);
    }, 0);
    
    return Math.round(totalTime / completedOrders.length / (1000 * 60)); // Minutes
  }, []);

  const calculatePeakHours = useCallback((orders) => {
    const hourCounts = new Array(24).fill(0);
    
    orders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      hourCounts[hour]++;
    });
    
    const maxCount = Math.max(...hourCounts);
    const peakHours = hourCounts
      .map((count, hour) => ({ hour, count }))
      .filter(({ count }) => count === maxCount)
      .map(({ hour }) => hour);
    
    return peakHours;
  }, []);

  const getPopularItems = useCallback((orders) => {
    const itemCounts = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });
    
    return Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, POPULAR_ITEMS_LIMIT);
  }, []);

  const calculateCustomerRetention = useCallback((orders) => {
    const customerOrders = {};
    
    orders.forEach(order => {
      if (!customerOrders[order.customerName]) {
        customerOrders[order.customerName] = [];
      }
      customerOrders[order.customerName].push(order);
    });
    
    const returningCustomers = Object.values(customerOrders)
      .filter(orders => orders.length > 1).length;
    
    const totalCustomers = Object.keys(customerOrders).length;
    
    return totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;
  }, []);

  const calculateCustomerLifetimeValue = useCallback((topCustomers) => {
    if (!topCustomers || topCustomers.length === 0) return 0;
    
    const totalValue = topCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    return totalValue / topCustomers.length;
  }, []);

  const calculateCategoryDistribution = useCallback((items) => {
    const distribution = {};
    
    items.forEach(item => {
      const category = item.categoryId || 'Uncategorized';
      distribution[category] = (distribution[category] || 0) + 1;
    });
    
    return Object.entries(distribution)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const prepareChartData = useCallback((data, label, type) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((item, index) => ({
      x: index,
      y: item[type] || item.value || 0,
      label: item.date || `Day ${index + 1}`,
    }));
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        handleFetchAnalytics();
      }
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [handleFetchAnalytics, isLoading]);

  return {
    // State
    revenue: enhancedRevenueData,
    orders: enhancedOrderData,
    customers: enhancedCustomerData,
    menu: enhancedMenuData,
    timeRange,
    dateRange,
    isLoading,
    error,
    lastUpdated,
    
    // Local state
    selectedPeriod,
    chartType,
    exportFormat,
    isExporting,
    
    // Computed values
    dashboardSummary,
    chartData,
    insights: handleGenerateInsights(),
    
    // Actions
    fetchRevenueAnalytics,
    fetchOrderAnalytics,
    fetchCustomerAnalytics,
    fetchMenuAnalytics,
    fetchAllAnalytics: handleFetchAnalytics,
    setTimeRange,
    setDateRange,
    clearError,
    
    // Enhanced actions
    handleExportReport,
    handleGenerateInsights,
    
    // Utility functions
    getTopRevenueSource,
    calculateAveragePreparationTime,
    calculatePeakHours,
    getPopularItems,
    calculateCustomerRetention,
    calculateCustomerLifetimeValue,
    calculateCategoryDistribution,
    prepareChartData,
    
    // State setters
    setSelectedPeriod,
    setChartType,
    setExportFormat,
  };
}; 