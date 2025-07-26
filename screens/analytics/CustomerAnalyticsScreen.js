import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  FlatList,
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

const CustomerAnalyticsScreen = ({ navigation }) => {
  const { orders } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('customers');

  const periods = [
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
    { key: 'year', label: 'This Year', icon: '📈' },
  ];

  const metrics = [
    { key: 'customers', label: 'New Customers', icon: '👥' },
    { key: 'orders', label: 'Total Orders', icon: '📋' },
    { key: 'revenue', label: 'Revenue', icon: '💰' },
    { key: 'loyalty', label: 'Loyalty', icon: '⭐' },
  ];

  useEffect(() => {
    loadCustomerData();
  }, [selectedPeriod, selectedMetric]);

  const loadCustomerData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomerData();
    setRefreshing(false);
  };

  const getFilteredOrders = () => {
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'week':
        startDate = dateUtils.startOfWeek(now);
        break;
      case 'month':
        startDate = dateUtils.startOfMonth(now);
        break;
      case 'quarter':
        startDate = dateUtils.startOfQuarter(now);
        break;
      case 'year':
        startDate = dateUtils.startOfYear(now);
        break;
      default:
        startDate = dateUtils.startOfMonth(now);
    }

    return orders.filter(order => new Date(order.createdAt) >= startDate);
  };

  const calculateCustomerMetrics = () => {
    const filteredOrders = getFilteredOrders();
    const allOrders = orders; // For comparison with previous period

    // Get unique customers
    const currentCustomers = new Set(filteredOrders.map(order => order.customerId));
    const allTimeCustomers = new Set(allOrders.map(order => order.customerId));

    // Calculate new customers (first order in this period)
    const customerFirstOrders = {};
    allOrders.forEach(order => {
      if (!customerFirstOrders[order.customerId] || new Date(order.createdAt) < new Date(customerFirstOrders[order.customerId])) {
        customerFirstOrders[order.customerId] = order.createdAt;
      }
    });

    const newCustomers = filteredOrders.filter(order => 
      dateUtils.formatDate(order.createdAt) === dateUtils.formatDate(customerFirstOrders[order.customerId])
    ).length;

    // Calculate customer loyalty metrics
    const customerOrderCounts = {};
    filteredOrders.forEach(order => {
      customerOrderCounts[order.customerId] = (customerOrderCounts[order.customerId] || 0) + 1;
    });

    const repeatCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
    const averageOrdersPerCustomer = currentCustomers.size > 0 ? filteredOrders.length / currentCustomers.size : 0;

    // Calculate average order value per customer
    const customerRevenue = {};
    filteredOrders.forEach(order => {
      customerRevenue[order.customerId] = (customerRevenue[order.customerId] || 0) + order.total;
    });

    const averageRevenuePerCustomer = currentCustomers.size > 0 
      ? Object.values(customerRevenue).reduce((sum, revenue) => sum + revenue, 0) / currentCustomers.size 
      : 0;

    return {
      totalCustomers: currentCustomers.size,
      newCustomers,
      repeatCustomers,
      averageOrdersPerCustomer,
      averageRevenuePerCustomer,
      totalRevenue: filteredOrders.reduce((sum, order) => sum + order.total, 0),
      totalOrders: filteredOrders.length,
    };
  };

  const getTopCustomers = () => {
    const filteredOrders = getFilteredOrders();
    const customerStats = {};

    filteredOrders.forEach(order => {
      if (!customerStats[order.customerId]) {
        customerStats[order.customerId] = {
          customerId: order.customerId,
          customerName: order.customerName || `Customer ${order.customerId}`,
          orders: 0,
          revenue: 0,
          lastOrder: order.createdAt,
          firstOrder: order.createdAt,
        };
      }

      customerStats[order.customerId].orders++;
      customerStats[order.customerId].revenue += order.total;
      
      if (new Date(order.createdAt) > new Date(customerStats[order.customerId].lastOrder)) {
        customerStats[order.customerId].lastOrder = order.createdAt;
      }
      if (new Date(order.createdAt) < new Date(customerStats[order.customerId].firstOrder)) {
        customerStats[order.customerId].firstOrder = order.createdAt;
      }
    });

    return Object.values(customerStats)
      .sort((a, b) => b[selectedMetric === 'orders' ? 'orders' : 'revenue'] - a[selectedMetric === 'orders' ? 'orders' : 'revenue'])
      .slice(0, 10);
  };

  const getCustomerSegments = () => {
    const filteredOrders = getFilteredOrders();
    const customerRevenue = {};

    filteredOrders.forEach(order => {
      customerRevenue[order.customerId] = (customerRevenue[order.customerId] || 0) + order.total;
    });

    const revenues = Object.values(customerRevenue).sort((a, b) => a - b);
    const totalCustomers = revenues.length;

    if (totalCustomers === 0) return [];

    const segments = {
      highValue: { count: 0, revenue: 0, label: 'High Value', color: colors.success },
      mediumValue: { count: 0, revenue: 0, label: 'Medium Value', color: colors.warning },
      lowValue: { count: 0, revenue: 0, label: 'Low Value', color: colors.error },
    };

    revenues.forEach((revenue, index) => {
      if (index >= totalCustomers * 0.8) {
        segments.highValue.count++;
        segments.highValue.revenue += revenue;
      } else if (index >= totalCustomers * 0.5) {
        segments.mediumValue.count++;
        segments.mediumValue.revenue += revenue;
      } else {
        segments.lowValue.count++;
        segments.lowValue.revenue += revenue;
      }
    });

    return Object.values(segments).filter(segment => segment.count > 0);
  };

  const getCustomerTrend = () => {
    const filteredOrders = getFilteredOrders();
    const dailyCustomers = {};

    filteredOrders.forEach(order => {
      const date = dateUtils.formatDate(order.createdAt);
      if (!dailyCustomers[date]) {
        dailyCustomers[date] = new Set();
      }
      dailyCustomers[date].add(order.customerId);
    });

    return Object.entries(dailyCustomers)
      .map(([date, customers]) => ({ date, customers: customers.size }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
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

  const renderCustomerMetrics = () => {
    const metrics = calculateCustomerMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Customers',
            metrics.totalCustomers,
            `${selectedPeriod} customers`,
            colors.primary,
            '👥'
          )}
          {renderMetricCard(
            'New Customers',
            metrics.newCustomers,
            'first-time buyers',
            colors.success,
            '🆕'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Repeat Customers',
            metrics.repeatCustomers,
            'loyal customers',
            colors.info,
            '⭐'
          )}
          {renderMetricCard(
            'Avg. Orders',
            metrics.averageOrdersPerCustomer.toFixed(1),
            'per customer',
            colors.secondary,
            '📋'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Avg. Revenue',
            formatters.formatCurrency(metrics.averageRevenuePerCustomer),
            'per customer',
            colors.primary,
            '💰'
          )}
          {renderMetricCard(
            'Total Revenue',
            formatters.formatCurrency(metrics.totalRevenue),
            `${selectedPeriod} earnings`,
            colors.success,
            '📈'
          )}
        </View>
      </View>
    );
  };

  const renderTopCustomer = ({ item, index }) => {
    const daysSinceLastOrder = Math.floor((new Date() - new Date(item.lastOrder)) / (1000 * 60 * 60 * 24));
    const isActive = daysSinceLastOrder <= 30;

    return (
      <View style={styles.customerCard}>
        <View style={styles.customerHeader}>
          <View style={styles.customerRank}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <View style={styles.customerStatus}>
              <View style={[styles.statusIndicator, { backgroundColor: isActive ? colors.success : colors.error }]} />
              <Text style={styles.statusText}>{isActive ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <View style={styles.customerMetrics}>
            <Text style={styles.customerValue}>
              {selectedMetric === 'orders' ? item.orders : formatters.formatCurrency(item.revenue)}
            </Text>
            <Text style={styles.customerLabel}>
              {selectedMetric === 'orders' ? 'orders' : 'revenue'}
            </Text>
          </View>
        </View>

        <View style={styles.customerDetails}>
          <View style={styles.customerDetail}>
            <Text style={styles.detailLabel}>Orders:</Text>
            <Text style={styles.detailValue}>{item.orders}</Text>
          </View>
          <View style={styles.customerDetail}>
            <Text style={styles.detailLabel}>Revenue:</Text>
            <Text style={styles.detailValue}>{formatters.formatCurrency(item.revenue)}</Text>
          </View>
          <View style={styles.customerDetail}>
            <Text style={styles.detailLabel}>Last Order:</Text>
            <Text style={styles.detailValue}>{dateUtils.formatShortDate(item.lastOrder)}</Text>
          </View>
          <View style={styles.customerDetail}>
            <Text style={styles.detailLabel}>First Order:</Text>
            <Text style={styles.detailValue}>{dateUtils.formatShortDate(item.firstOrder)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCustomerSegments = () => {
    const segments = getCustomerSegments();
    
    if (segments.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Segments</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No customer data available</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Segments</Text>
        {segments.map((segment, index) => (
          <View key={index} style={styles.segmentCard}>
            <View style={styles.segmentHeader}>
              <View style={[styles.segmentColor, { backgroundColor: segment.color }]} />
              <Text style={styles.segmentLabel}>{segment.label}</Text>
            </View>
            <View style={styles.segmentMetrics}>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentValue}>{segment.count}</Text>
                <Text style={styles.segmentLabel}>Customers</Text>
              </View>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentValue}>{formatters.formatCurrency(segment.revenue)}</Text>
                <Text style={styles.segmentLabel}>Revenue</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const topCustomers = getTopCustomers();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Customer Analytics"
        subtitle={`${selectedPeriod} customer insights`}
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
        {renderCustomerMetrics()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Customers</Text>
          {topCustomers.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionText}>No customer data for this period</Text>
            </View>
          ) : (
            topCustomers.map((customer, index) => renderTopCustomer({ item: customer, index }))
          )}
        </View>

        {renderCustomerSegments()}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  customerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    ...typography.h3,
    color: colors.white,
    fontWeight: '600',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  customerMetrics: {
    alignItems: 'flex-end',
  },
  customerValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  customerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  customerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: 4,
  },
  detailValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  segmentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  segmentColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  segmentLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  segmentMetric: {
    alignItems: 'center',
  },
  segmentValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
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

export default CustomerAnalyticsScreen; 