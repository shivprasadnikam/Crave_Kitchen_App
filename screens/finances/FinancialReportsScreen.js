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

const FinancialReportsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periods = [
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
    { key: 'year', label: 'This Year', icon: '📈' },
  ];

  const reports = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'revenue', label: 'Revenue', icon: '💰' },
    { key: 'expenses', label: 'Expenses', icon: '💸' },
    { key: 'profit', label: 'Profit', icon: '📈' },
  ];

  // Mock financial data
  const mockFinancialData = {
    revenue: {
      total: 15450.75,
      growth: 12.5,
      breakdown: {
        food: 12360.60,
        delivery: 1545.08,
        tips: 1545.07,
      },
    },
    expenses: {
      total: 8750.25,
      breakdown: {
        ingredients: 5200.50,
        labor: 2100.00,
        utilities: 450.75,
        rent: 1000.00,
      },
    },
    profit: {
      total: 6700.50,
      margin: 43.4,
      growth: 8.2,
    },
    orders: {
      total: 542,
      average: 28.51,
      growth: 15.3,
    },
  };

  const mockMonthlyData = [
    { month: 'Jan', revenue: 12500, expenses: 8500, profit: 4000 },
    { month: 'Feb', revenue: 11800, expenses: 8200, profit: 3600 },
    { month: 'Mar', revenue: 13200, expenses: 8800, profit: 4400 },
    { month: 'Apr', revenue: 14100, expenses: 9200, profit: 4900 },
    { month: 'May', revenue: 13800, expenses: 9000, profit: 4800 },
    { month: 'Jun', revenue: 15450, expenses: 8750, profit: 6700 },
  ];

  useEffect(() => {
    loadFinancialData();
  }, [selectedPeriod, selectedReport]);

  const loadFinancialData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFinancialData();
    setRefreshing(false);
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

  const renderReportSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.reportSelectorContainer}
      contentContainerStyle={styles.reportSelectorContent}
    >
      {reports.map((report) => (
        <TouchableOpacity
          key={report.key}
          style={[styles.reportTab, selectedReport === report.key && styles.activeReportTab]}
          onPress={() => setSelectedReport(report.key)}
        >
          <Text style={styles.reportIcon}>{report.icon}</Text>
          <Text style={[styles.reportLabel, selectedReport === report.key && styles.activeReportLabel]}>
            {report.label}
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

  const renderOverviewMetrics = () => (
    <View style={styles.metricsGrid}>
      <View style={styles.metricRow}>
        {renderMetricCard(
          'Total Revenue',
          formatters.formatCurrency(mockFinancialData.revenue.total),
          `${mockFinancialData.revenue.growth}% growth`,
          colors.primary,
          '💰'
        )}
        {renderMetricCard(
          'Total Expenses',
          formatters.formatCurrency(mockFinancialData.expenses.total),
          'operational costs',
          colors.warning,
          '💸'
        )}
      </View>
      <View style={styles.metricRow}>
        {renderMetricCard(
          'Net Profit',
          formatters.formatCurrency(mockFinancialData.profit.total),
          `${mockFinancialData.profit.margin}% margin`,
          colors.success,
          '📈'
        )}
        {renderMetricCard(
          'Total Orders',
          mockFinancialData.orders.total,
          `${mockFinancialData.orders.growth}% growth`,
          colors.info,
          '📋'
        )}
      </View>
    </View>
  );

  const renderRevenueBreakdown = () => (
    <View style={styles.breakdownContainer}>
      <Text style={styles.breakdownTitle}>Revenue Breakdown</Text>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.primary }]} />
          <Text style={styles.breakdownLabel}>Food Sales</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.revenue.breakdown.food)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.revenue.breakdown.food / mockFinancialData.revenue.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.secondary }]} />
          <Text style={styles.breakdownLabel}>Delivery Fees</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.revenue.breakdown.delivery)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.revenue.breakdown.delivery / mockFinancialData.revenue.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.success }]} />
          <Text style={styles.breakdownLabel}>Tips</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.revenue.breakdown.tips)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.revenue.breakdown.tips / mockFinancialData.revenue.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );

  const renderExpenseBreakdown = () => (
    <View style={styles.breakdownContainer}>
      <Text style={styles.breakdownTitle}>Expense Breakdown</Text>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.warning }]} />
          <Text style={styles.breakdownLabel}>Ingredients</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.expenses.breakdown.ingredients)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.expenses.breakdown.ingredients / mockFinancialData.expenses.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.error }]} />
          <Text style={styles.breakdownLabel}>Labor</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.expenses.breakdown.labor)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.expenses.breakdown.labor / mockFinancialData.expenses.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.info }]} />
          <Text style={styles.breakdownLabel}>Utilities</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.expenses.breakdown.utilities)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.expenses.breakdown.utilities / mockFinancialData.expenses.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <View style={[styles.breakdownColor, { backgroundColor: colors.secondary }]} />
          <Text style={styles.breakdownLabel}>Rent</Text>
        </View>
        <View style={styles.breakdownValue}>
          <Text style={styles.breakdownAmount}>
            {formatters.formatCurrency(mockFinancialData.expenses.breakdown.rent)}
          </Text>
          <Text style={styles.breakdownPercentage}>
            {((mockFinancialData.expenses.breakdown.rent / mockFinancialData.expenses.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );

  const renderProfitMetrics = () => (
    <View style={styles.metricsGrid}>
      <View style={styles.metricRow}>
        {renderMetricCard(
          'Net Profit',
          formatters.formatCurrency(mockFinancialData.profit.total),
          `${mockFinancialData.profit.growth}% growth`,
          colors.success,
          '📈'
        )}
        {renderMetricCard(
          'Profit Margin',
          `${mockFinancialData.profit.margin}%`,
          'of total revenue',
          colors.info,
          '📊'
        )}
      </View>
      <View style={styles.metricRow}>
        {renderMetricCard(
          'Revenue',
          formatters.formatCurrency(mockFinancialData.revenue.total),
          'total earnings',
          colors.primary,
          '💰'
        )}
        {renderMetricCard(
          'Expenses',
          formatters.formatCurrency(mockFinancialData.expenses.total),
          'total costs',
          colors.warning,
          '💸'
        )}
      </View>
    </View>
  );

  const renderMonthlyChart = () => {
    const maxValue = Math.max(...mockMonthlyData.map(d => Math.max(d.revenue, d.expenses, d.profit)));
    const chartHeight = 120;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Performance</Text>
        <View style={styles.chartContent}>
          {mockMonthlyData.map((data, index) => {
            const revenueHeight = (data.revenue / maxValue) * chartHeight;
            const expensesHeight = (data.expenses / maxValue) * chartHeight;
            const profitHeight = (data.profit / maxValue) * chartHeight;

            return (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barGroup}>
                  <View style={[styles.bar, { height: Math.max(revenueHeight, 4), backgroundColor: colors.primary }]} />
                  <View style={[styles.bar, { height: Math.max(expensesHeight, 4), backgroundColor: colors.warning }]} />
                  <View style={[styles.bar, { height: Math.max(profitHeight, 4), backgroundColor: colors.success }]} />
                </View>
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendLabel}>Revenue</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.warning }]} />
            <Text style={styles.legendLabel}>Expenses</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
            <Text style={styles.legendLabel}>Profit</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Export reports will be available soon!')}
        >
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionTitle}>Export Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Tax reports will be available soon!')}
        >
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionTitle}>Tax Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Revenue')}
        >
          <Text style={styles.actionIcon}>💰</Text>
          <Text style={styles.actionTitle}>Revenue Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Financial insights will be available soon!')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Insights</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSelectedReport = () => {
    switch (selectedReport) {
      case 'overview':
        return (
          <>
            {renderOverviewMetrics()}
            {renderRevenueBreakdown()}
            {renderMonthlyChart()}
          </>
        );
      case 'revenue':
        return (
          <>
            {renderRevenueBreakdown()}
            {renderMonthlyChart()}
          </>
        );
      case 'expenses':
        return (
          <>
            {renderExpenseBreakdown()}
            {renderMonthlyChart()}
          </>
        );
      case 'profit':
        return (
          <>
            {renderProfitMetrics()}
            {renderMonthlyChart()}
          </>
        );
      default:
        return renderOverviewMetrics();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Financial Reports"
        subtitle={`${selectedReport} - ${selectedPeriod}`}
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
        {renderReportSelector()}
        {renderSelectedReport()}
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
  reportSelectorContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  reportSelectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reportTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeReportTab: {
    backgroundColor: colors.secondary,
  },
  reportIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  reportLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeReportLabel: {
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
    height: 140,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLabel: {
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

export default FinancialReportsScreen; 