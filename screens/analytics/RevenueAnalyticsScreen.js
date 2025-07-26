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

const RevenueAnalyticsScreen = ({ navigation }) => {
  const { orders } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('daily');

  const periods = [
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
    { key: 'year', label: 'This Year', icon: '📈' },
  ];

  const chartTypes = [
    { key: 'daily', label: 'Daily', icon: '📅' },
    { key: 'weekly', label: 'Weekly', icon: '📆' },
    { key: 'monthly', label: 'Monthly', icon: '🗓️' },
  ];

  useEffect(() => {
    loadRevenueData();
  }, [selectedPeriod, selectedChart]);

  const loadRevenueData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRevenueData();
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

    return orders.filter(order => 
      order.status === 'completed' && new Date(order.createdAt) >= startDate
    );
  };

  const calculateRevenueMetrics = () => {
    const filteredOrders = getFilteredOrders();
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;
    
    // Calculate growth (simplified - compare with previous period)
    const previousPeriodOrders = getPreviousPeriodOrders();
    const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    const growthRate = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    return {
      totalRevenue,
      averageOrderValue,
      orderCount: filteredOrders.length,
      growthRate,
    };
  };

  const getPreviousPeriodOrders = () => {
    const now = new Date();
    let startDate, endDate;

    switch (selectedPeriod) {
      case 'week':
        endDate = dateUtils.startOfWeek(now);
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        endDate = dateUtils.startOfMonth(now);
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        break;
      case 'quarter':
        endDate = dateUtils.startOfQuarter(now);
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 3, 1);
        break;
      case 'year':
        endDate = dateUtils.startOfYear(now);
        startDate = new Date(endDate.getFullYear() - 1, 0, 1);
        break;
      default:
        return [];
    }

    return orders.filter(order => 
      order.status === 'completed' && 
      new Date(order.createdAt) >= startDate && 
      new Date(order.createdAt) < endDate
    );
  };

  const getRevenueData = () => {
    const filteredOrders = getFilteredOrders();
    const revenueData = {};

    filteredOrders.forEach(order => {
      let key;
      switch (selectedChart) {
        case 'daily':
          key = dateUtils.formatDate(order.createdAt);
          break;
        case 'weekly':
          key = dateUtils.formatWeek(order.createdAt);
          break;
        case 'monthly':
          key = dateUtils.formatMonth(order.createdAt);
          break;
        default:
          key = dateUtils.formatDate(order.createdAt);
      }

      if (revenueData[key]) {
        revenueData[key] += order.total;
      } else {
        revenueData[key] = order.total;
      }
    });

    return Object.entries(revenueData)
      .map(([key, revenue]) => ({ key, revenue }))
      .sort((a, b) => {
        if (selectedChart === 'daily') {
          return new Date(a.key) - new Date(b.key);
        }
        return a.key.localeCompare(b.key);
      });
  };

  const getRevenueBreakdown = () => {
    const filteredOrders = getFilteredOrders();
    const breakdown = {
      subtotal: 0,
      deliveryFees: 0,
      taxes: 0,
      tips: 0,
    };

    filteredOrders.forEach(order => {
      breakdown.subtotal += order.subtotal || 0;
      breakdown.deliveryFees += order.deliveryFee || 0;
      breakdown.taxes += order.tax || 0;
      breakdown.tips += order.tip || 0;
    });

    return breakdown;
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

  const renderChartSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.chartSelectorContainer}
      contentContainerStyle={styles.chartSelectorContent}
    >
      {chartTypes.map((chart) => (
        <TouchableOpacity
          key={chart.key}
          style={[styles.chartTab, selectedChart === chart.key && styles.activeChartTab]}
          onPress={() => setSelectedChart(chart.key)}
        >
          <Text style={styles.chartIcon}>{chart.icon}</Text>
          <Text style={[styles.chartLabel, selectedChart === chart.key && styles.activeChartLabel]}>
            {chart.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMetricCard = (title, value, subtitle, color = colors.primary, icon = '💰') => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderRevenueMetrics = () => {
    const metrics = calculateRevenueMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Revenue',
            formatters.formatCurrency(metrics.totalRevenue),
            `${selectedPeriod} earnings`,
            colors.primary,
            '💰'
          )}
          {renderMetricCard(
            'Avg. Order',
            formatters.formatCurrency(metrics.averageOrderValue),
            'per order',
            colors.secondary,
            '📈'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Orders',
            metrics.orderCount,
            'completed orders',
            colors.info,
            '📋'
          )}
          {renderMetricCard(
            'Growth',
            `${metrics.growthRate >= 0 ? '+' : ''}${metrics.growthRate.toFixed(1)}%`,
            'vs previous period',
            metrics.growthRate >= 0 ? colors.success : colors.error,
            metrics.growthRate >= 0 ? '📈' : '📉'
          )}
        </View>
      </View>
    );
  };

  const renderRevenueChart = () => {
    const revenueData = getRevenueData();
    
    if (revenueData.length === 0) {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <View style={styles.emptyChart}>
            <Text style={styles.emptyChartText}>No revenue data for this period</Text>
          </View>
        </View>
      );
    }

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
    const chartHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Revenue Trend</Text>
        <View style={styles.chartContent}>
          {revenueData.map((data, index) => {
            const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * chartHeight : 0;
            return (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.bar, { height: Math.max(height, 4) }]} />
                <Text style={styles.barLabel}>{formatters.formatCurrency(data.revenue)}</Text>
                <Text style={styles.barDate}>{data.key}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderRevenueBreakdown = () => {
    const breakdown = getRevenueBreakdown();
    const total = breakdown.subtotal + breakdown.deliveryFees + breakdown.taxes + breakdown.tips;

    const breakdownItems = [
      { label: 'Subtotal', value: breakdown.subtotal, color: colors.primary },
      { label: 'Delivery Fees', value: breakdown.deliveryFees, color: colors.secondary },
      { label: 'Taxes', value: breakdown.taxes, color: colors.info },
      { label: 'Tips', value: breakdown.tips, color: colors.success },
    ];

    return (
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownTitle}>Revenue Breakdown</Text>
        {breakdownItems.map((item, index) => (
          <View key={index} style={styles.breakdownItem}>
            <View style={styles.breakdownInfo}>
              <View style={[styles.breakdownColor, { backgroundColor: item.color }]} />
              <Text style={styles.breakdownLabel}>{item.label}</Text>
            </View>
            <View style={styles.breakdownValue}>
              <Text style={styles.breakdownAmount}>{formatters.formatCurrency(item.value)}</Text>
              <Text style={styles.breakdownPercentage}>
                {total > 0 ? `${((item.value / total) * 100).toFixed(1)}%` : '0%'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderTopRevenueItems = () => {
    const filteredOrders = getFilteredOrders();
    const itemRevenue = {};

    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const revenue = item.price * item.quantity;
        if (itemRevenue[item.name]) {
          itemRevenue[item.name] += revenue;
        } else {
          itemRevenue[item.name] = revenue;
        }
      });
    });

    const topItems = Object.entries(itemRevenue)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    if (topItems.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Revenue Items</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No items sold in this period</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Revenue Items</Text>
        {topItems.map((item, index) => (
          <View key={index} style={styles.topItemCard}>
            <View style={styles.topItemRank}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.topItemInfo}>
              <Text style={styles.topItemName}>{item.name}</Text>
              <Text style={styles.topItemRevenue}>{formatters.formatCurrency(item.revenue)}</Text>
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
        title="Revenue Analytics"
        subtitle={`${selectedPeriod} revenue insights`}
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
        {renderChartSelector()}
        {renderRevenueMetrics()}
        {renderRevenueChart()}
        {renderRevenueBreakdown()}
        {renderTopRevenueItems()}
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
  chartSelectorContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  chartSelectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chartTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeChartTab: {
    backgroundColor: colors.secondary,
  },
  chartIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  chartLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeChartLabel: {
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
  breakdownContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...globalStyles.shadow,
  },
  breakdownTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  breakdownColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  breakdownLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  breakdownValue: {
    alignItems: 'flex-end',
  },
  breakdownAmount: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  breakdownPercentage: {
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
  topItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  topItemRank: {
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
  topItemInfo: {
    flex: 1,
  },
  topItemName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  topItemRevenue: {
    ...typography.caption,
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

export default RevenueAnalyticsScreen; 