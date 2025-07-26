import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderContext } from '../../context/OrderContext';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const { width } = Dimensions.get('window');

const OrderAnalyticsScreen = ({ navigation }) => {
  const { orders } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('count');

  const periods = [
    { key: 'today', label: 'Today', icon: '📅' },
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
  ];

  const metrics = [
    { key: 'count', label: 'Order Count', icon: '📋' },
    { key: 'revenue', label: 'Revenue', icon: '💰' },
    { key: 'avgValue', label: 'Avg. Value', icon: '📈' },
  ];

  useEffect(() => {
    loadOrderData();
  }, [selectedPeriod, selectedMetric]);

  const loadOrderData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrderData();
    setRefreshing(false);
  };

  const getFilteredOrders = () => {
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'today':
        startDate = dateUtils.startOfDay(now);
        break;
      case 'week':
        startDate = dateUtils.startOfWeek(now);
        break;
      case 'month':
        startDate = dateUtils.startOfMonth(now);
        break;
      case 'quarter':
        startDate = dateUtils.startOfQuarter(now);
        break;
      default:
        startDate = dateUtils.startOfWeek(now);
    }

    return orders.filter(order => new Date(order.createdAt) >= startDate);
  };

  const calculateOrderMetrics = () => {
    const filteredOrders = getFilteredOrders();
    const completedOrders = filteredOrders.filter(order => order.status === 'completed');
    const cancelledOrders = filteredOrders.filter(order => order.status === 'cancelled');
    const pendingOrders = filteredOrders.filter(order => order.status === 'pending');

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    const completionRate = filteredOrders.length > 0 ? (completedOrders.length / filteredOrders.length) * 100 : 0;
    const cancellationRate = filteredOrders.length > 0 ? (cancelledOrders.length / filteredOrders.length) * 100 : 0;

    // Calculate average preparation time
    const preparationTimes = completedOrders
      .map(order => {
        const startTime = new Date(order.createdAt);
        const endTime = new Date(order.updatedAt || order.createdAt);
        return Math.floor((endTime - startTime) / (1000 * 60)); // minutes
      })
      .filter(time => time > 0);

    const averagePreparationTime = preparationTimes.length > 0 
      ? preparationTimes.reduce((sum, time) => sum + time, 0) / preparationTimes.length 
      : 0;

    return {
      totalOrders: filteredOrders.length,
      completedOrders: completedOrders.length,
      cancelledOrders: cancelledOrders.length,
      pendingOrders: pendingOrders.length,
      totalRevenue,
      averageOrderValue,
      completionRate,
      cancellationRate,
      averagePreparationTime,
    };
  };

  const getOrderTrend = () => {
    const filteredOrders = getFilteredOrders();
    const orderData = {};

    filteredOrders.forEach(order => {
      const date = dateUtils.formatDate(order.createdAt);
      if (orderData[date]) {
        orderData[date].count++;
        orderData[date].revenue += order.total;
        orderData[date].totalValue += order.total;
      } else {
        orderData[date] = {
          count: 1,
          revenue: order.total,
          totalValue: order.total,
        };
      }
    });

    return Object.entries(orderData)
      .map(([date, data]) => ({
        date,
        count: data.count,
        revenue: data.revenue,
        avgValue: data.totalValue / data.count,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getStatusBreakdown = () => {
    const filteredOrders = getFilteredOrders();
    const statusCounts = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      ready: 0,
      completed: 0,
      cancelled: 0,
    };

    filteredOrders.forEach(order => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      }
    });

    return Object.entries(statusCounts)
      .map(([status, count]) => ({ status, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const getPeakHours = () => {
    const filteredOrders = getFilteredOrders();
    const hourCounts = {};

    filteredOrders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const renderPeriodSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.periodContainer}
      contentContainerStyle={styles.periodContent}
    >
      {periods.map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[styles.periodTab, selectedPeriod === period.key && styles.activePeriodTab]}
          onPress={() => setSelectedPeriod(period.key)}
        >
          <Text style={styles.periodIcon}>{period.icon}</Text>
          <Text style={[styles.periodLabel, selectedPeriod === period.key && styles.activePeriodLabel]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMetricSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.metricSelectorContainer}
      contentContainerStyle={styles.metricSelectorContent}
    >
      {metrics.map((metric) => (
        <TouchableOpacity
          key={metric.key}
          style={[styles.metricTab, selectedMetric === metric.key && styles.activeMetricTab]}
          onPress={() => setSelectedMetric(metric.key)}
        >
          <Text style={styles.metricIcon}>{metric.icon}</Text>
          <Text style={[styles.metricLabel, selectedMetric === metric.key && styles.activeMetricLabel]}>
            {metric.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMetricCard = (title, value, subtitle, color = colors.primary, icon = '📊') => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderOrderMetrics = () => {
    const metrics = calculateOrderMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Orders',
            metrics.totalOrders,
            `${selectedPeriod} orders`,
            colors.primary,
            '📋'
          )}
          {renderMetricCard(
            'Completed',
            metrics.completedOrders,
            `${metrics.completionRate.toFixed(1)}% rate`,
            colors.success,
            '✅'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Avg. Prep Time',
            `${Math.round(metrics.averagePreparationTime)}m`,
            'preparation time',
            colors.info,
            '⏱️'
          )}
          {renderMetricCard(
            'Cancelled',
            metrics.cancelledOrders,
            `${metrics.cancellationRate.toFixed(1)}% rate`,
            colors.error,
            '❌'
          )}
        </View>
      </View>
    );
  };

  const renderOrderChart = () => {
    const orderData = getOrderTrend();
    
    if (orderData.length === 0) {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Order Trend</Text>
          <View style={styles.emptyChart}>
            <Text style={styles.emptyChartText}>No order data for this period</Text>
          </View>
        </View>
      );
    }

    const maxValue = Math.max(...orderData.map(d => d[selectedMetric]));
    const chartHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Order Trend</Text>
        <View style={styles.chartContent}>
          {orderData.map((data, index) => {
            const value = data[selectedMetric];
            const height = maxValue > 0 ? (value / maxValue) * chartHeight : 0;
            
            let displayValue;
            if (selectedMetric === 'revenue') {
              displayValue = formatters.formatCurrency(value);
            } else if (selectedMetric === 'avgValue') {
              displayValue = formatters.formatCurrency(value);
            } else {
              displayValue = value.toString();
            }

            return (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.bar, { height: Math.max(height, 4) }]} />
                <Text style={styles.barLabel}>{displayValue}</Text>
                <Text style={styles.barDate}>{dateUtils.formatShortDate(data.date)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderStatusBreakdown = () => {
    const statusData = getStatusBreakdown();
    
    if (statusData.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status Breakdown</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No orders in this period</Text>
          </View>
        </View>
      );
    }

    const totalOrders = statusData.reduce((sum, item) => sum + item.count, 0);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Status Breakdown</Text>
        {statusData.map((item, index) => (
          <View key={index} style={styles.statusCard}>
            <View style={styles.statusInfo}>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
              <Text style={styles.statusLabel}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>
            <View style={styles.statusValue}>
              <Text style={styles.statusCount}>{item.count}</Text>
              <Text style={styles.statusPercentage}>
                {totalOrders > 0 ? `${((item.count / totalOrders) * 100).toFixed(1)}%` : '0%'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'confirmed': return colors.info;
      case 'preparing': return colors.secondary;
      case 'ready': return colors.success;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderPeakHours = () => {
    const peakHours = getPeakHours();
    
    if (peakHours.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Peak Hours</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No order data for peak hours</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Peak Hours</Text>
        {peakHours.map((item, index) => (
          <View key={index} style={styles.peakHourCard}>
            <View style={styles.peakHourRank}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.peakHourInfo}>
              <Text style={styles.peakHourTime}>
                {item.hour === 0 ? '12 AM' : item.hour < 12 ? `${item.hour} AM` : item.hour === 12 ? '12 PM' : `${item.hour - 12} PM`}
              </Text>
              <Text style={styles.peakHourCount}>{item.count} orders</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Order Analytics"
        subtitle={`${selectedPeriod} order insights`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderPeriodSelector()}
        {renderMetricSelector()}
        {renderOrderMetrics()}
        {renderOrderChart()}
        {renderStatusBreakdown()}
        {renderPeakHours()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  periodContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
  },
  periodContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  periodTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activePeriodTab: {
    backgroundColor: colors.primary,
  },
  periodIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  periodLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activePeriodLabel: {
    color: colors.white,
  },
  metricSelectorContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  metricSelectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  metricTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeMetricTab: {
    backgroundColor: colors.secondary,
  },
  metricIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeMetricLabel: {
    color: colors.white,
  },
  metricsGrid: {
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    ...globalStyles.shadow,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  metricTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  metricValue: {
    ...typography.h2,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chartContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...globalStyles.shadow,
  },
  chartTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 180,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  barDate: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyChart: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  statusValue: {
    alignItems: 'flex-end',
  },
  statusCount: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  statusPercentage: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  peakHourCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  peakHourRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  peakHourInfo: {
    flex: 1,
  },
  peakHourTime: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  peakHourCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptySection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  emptySectionText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default OrderAnalyticsScreen; 