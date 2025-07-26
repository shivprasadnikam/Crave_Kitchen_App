import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const { width } = Dimensions.get('window');

const RevenueScreen = ({ navigation }) => {
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

  // Mock revenue data
  const mockRevenueData = [
    {
      date: '2024-01-15',
      revenue: 1250.50,
      orders: 45,
      averageOrder: 27.79,
      deliveryFees: 180.00,
      tips: 95.50,
      taxes: 125.05,
    },
    {
      date: '2024-01-14',
      revenue: 1180.75,
      orders: 42,
      averageOrder: 28.11,
      deliveryFees: 168.00,
      tips: 88.25,
      taxes: 118.08,
    },
    {
      date: '2024-01-13',
      revenue: 1350.25,
      orders: 48,
      averageOrder: 28.13,
      deliveryFees: 192.00,
      tips: 102.75,
      taxes: 135.03,
    },
    {
      date: '2024-01-12',
      revenue: 980.50,
      orders: 35,
      averageOrder: 28.01,
      deliveryFees: 140.00,
      tips: 73.50,
      taxes: 98.05,
    },
    {
      date: '2024-01-11',
      revenue: 1100.00,
      orders: 40,
      averageOrder: 27.50,
      deliveryFees: 160.00,
      tips: 82.50,
      taxes: 110.00,
    },
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

  const calculateRevenueMetrics = () => {
    const totalRevenue = mockRevenueData.reduce((sum, day) => sum + day.revenue, 0);
    const totalOrders = mockRevenueData.reduce((sum, day) => sum + day.orders, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalDeliveryFees = mockRevenueData.reduce((sum, day) => sum + day.deliveryFees, 0);
    const totalTips = mockRevenueData.reduce((sum, day) => sum + day.tips, 0);

    // Calculate growth (simplified)
    const previousPeriodRevenue = totalRevenue * 0.85; // Mock previous period
    const growthRate = previousPeriodRevenue > 0 ? ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalDeliveryFees,
      totalTips,
      growthRate,
    };
  };

  const getRevenueBreakdown = () => {
    const totalRevenue = mockRevenueData.reduce((sum, day) => sum + day.revenue, 0);
    const totalDeliveryFees = mockRevenueData.reduce((sum, day) => sum + day.deliveryFees, 0);
    const totalTips = mockRevenueData.reduce((sum, day) => sum + day.tips, 0);
    const totalTaxes = mockRevenueData.reduce((sum, day) => sum + day.taxes, 0);
    const subtotal = totalRevenue - totalDeliveryFees - totalTips - totalTaxes;

    return {
      subtotal,
      deliveryFees: totalDeliveryFees,
      tips: totalTips,
      taxes: totalTaxes,
      total: totalRevenue,
    };
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
            'Total Orders',
            metrics.totalOrders,
            'orders completed',
            colors.info,
            '📋'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Avg. Order',
            formatters.formatCurrency(metrics.averageOrderValue),
            'per order',
            colors.secondary,
            '📈'
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
    const maxRevenue = Math.max(...mockRevenueData.map(d => d.revenue));
    const chartHeight = 150;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Revenue Trend</Text>
        <View style={styles.chartContent}>
          {mockRevenueData.map((data, index) => {
            const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * chartHeight : 0;
            return (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.bar, { height: Math.max(height, 4) }]} />
                <Text style={styles.barLabel}>{formatters.formatCurrency(data.revenue)}</Text>
                <Text style={styles.barDate}>{dateUtils.formatShortDate(data.date)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderRevenueBreakdown = () => {
    const breakdown = getRevenueBreakdown();

    const breakdownItems = [
      { label: 'Subtotal', value: breakdown.subtotal, color: colors.primary },
      { label: 'Delivery Fees', value: breakdown.deliveryFees, color: colors.secondary },
      { label: 'Tips', value: breakdown.tips, color: colors.success },
      { label: 'Taxes', value: breakdown.taxes, color: colors.info },
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
                {breakdown.total > 0 ? `${((item.value / breakdown.total) * 100).toFixed(1)}%` : '0%'}
              </Text>
            </View>
          </View>
        ))}
        <View style={styles.totalBreakdown}>
          <Text style={styles.totalLabel}>Total Revenue</Text>
          <Text style={styles.totalAmount}>{formatters.formatCurrency(breakdown.total)}</Text>
        </View>
      </View>
    );
  };

  const renderDailyRevenue = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Daily Revenue</Text>
      {mockRevenueData.map((day, index) => (
        <View key={index} style={styles.dailyCard}>
          <View style={styles.dailyHeader}>
            <View style={styles.dailyInfo}>
              <Text style={styles.dailyDate}>{dateUtils.formatDate(day.date)}</Text>
              <Text style={styles.dailyOrders}>{day.orders} orders</Text>
            </View>
            <View style={styles.dailyRevenue}>
              <Text style={styles.revenueAmount}>{formatters.formatCurrency(day.revenue)}</Text>
              <Text style={styles.revenueAverage}>Avg: {formatters.formatCurrency(day.averageOrder)}</Text>
            </View>
          </View>
          <View style={styles.dailyDetails}>
            <View style={styles.dailyDetail}>
              <Text style={styles.detailLabel}>Delivery Fees:</Text>
              <Text style={styles.detailValue}>{formatters.formatCurrency(day.deliveryFees)}</Text>
            </View>
            <View style={styles.dailyDetail}>
              <Text style={styles.detailLabel}>Tips:</Text>
              <Text style={styles.detailValue}>{formatters.formatCurrency(day.tips)}</Text>
            </View>
            <View style={styles.dailyDetail}>
              <Text style={styles.detailLabel}>Taxes:</Text>
              <Text style={styles.detailValue}>{formatters.formatCurrency(day.taxes)}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('PaymentHistory')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionTitle}>Payment History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Payout')}
        >
          <Text style={styles.actionIcon}>💳</Text>
          <Text style={styles.actionTitle}>Request Payout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('FinancialReports')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Financial Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Tax reports will be available soon!')}
        >
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionTitle}>Tax Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Revenue"
        subtitle={`${selectedPeriod} revenue overview`}
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
        {renderDailyRevenue()}
        {renderQuickActions()}
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
  totalBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  totalAmount: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
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
  dailyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dailyInfo: {
    flex: 1,
  },
  dailyDate: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  dailyOrders: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dailyRevenue: {
    alignItems: 'flex-end',
  },
  revenueAmount: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  revenueAverage: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dailyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dailyDetail: {
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default RevenueScreen; 