import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { THEME } from '../../styles/theme';

const RevenueSummary = ({ 
  revenueData = null, 
  onPeriodChange,
  onViewDetailsPress,
  loading = false,
  selectedPeriod = 'today'
}) => {
  const defaultRevenueData = {
    current: {
      total: 1250.75,
      orders: 45,
      average: 27.79,
      change: 12.5,
    },
    previous: {
      total: 1110.50,
      orders: 40,
      average: 27.76,
    },
    breakdown: {
      food: 850.25,
      beverages: 320.50,
      delivery: 80.00,
    },
    topItems: [
      { name: 'Chicken Burger', revenue: 180.50, orders: 12 },
      { name: 'Margherita Pizza', revenue: 165.75, orders: 8 },
      { name: 'Caesar Salad', revenue: 142.00, orders: 15 },
    ],
  };

  const displayData = revenueData || defaultRevenueData;

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ];

  const getChangeColor = (change) => {
    if (change > 0) return THEME.colors.SUCCESS.MAIN;
    if (change < 0) return THEME.colors.ERROR.MAIN;
    return THEME.colors.TEXT.SECONDARY;
  };

  const getChangeIcon = (change) => {
    if (change > 0) return '↗️';
    if (change < 0) return '↘️';
    return '→';
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const renderMetricCard = (title, value, subtitle, change = null) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricSubtitle}>{subtitle}</Text>
      {change !== null && (
        <View style={styles.changeContainer}>
          <Text style={[styles.changeText, { color: getChangeColor(change) }]}>
            {getChangeIcon(change)} {Math.abs(change)}%
          </Text>
        </View>
      )}
    </View>
  );

  const renderBreakdownItem = (label, amount, percentage, color) => (
    <View style={styles.breakdownItem}>
      <View style={styles.breakdownHeader}>
        <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        <Text style={styles.breakdownLabel}>{label}</Text>
        <Text style={styles.breakdownAmount}>{formatCurrency(amount)}</Text>
      </View>
      <View style={styles.breakdownBar}>
        <View 
          style={[
            styles.breakdownFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: color 
            }
          ]} 
        />
      </View>
    </View>
  );

  const renderTopItem = (item, index) => (
    <View key={item.name} style={styles.topItem}>
      <View style={styles.topItemRank}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>
      <View style={styles.topItemInfo}>
        <Text style={styles.topItemName}>{item.name}</Text>
        <Text style={styles.topItemOrders}>{item.orders} orders</Text>
      </View>
      <Text style={styles.topItemRevenue}>{formatCurrency(item.revenue)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Revenue Summary</Text>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingShimmer} />
          <View style={styles.loadingShimmer} />
          <View style={styles.loadingShimmer} />
        </View>
      </View>
    );
  }

  const totalRevenue = displayData.current.total;
  const totalOrders = displayData.current.orders;
  const averageOrder = displayData.current.average;
  const revenueChange = displayData.current.change;

  const breakdownTotal = displayData.breakdown.food + displayData.breakdown.beverages + displayData.breakdown.delivery;
  const foodPercentage = (displayData.breakdown.food / breakdownTotal) * 100;
  const beveragesPercentage = (displayData.breakdown.beverages / breakdownTotal) * 100;
  const deliveryPercentage = (displayData.breakdown.delivery / breakdownTotal) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Revenue Summary</Text>
        {onViewDetailsPress && (
          <TouchableOpacity onPress={onViewDetailsPress} activeOpacity={0.7}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.periodButtonActive
            ]}
            onPress={() => onPeriodChange && onPeriodChange(period.key)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === period.key && styles.periodButtonTextActive
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.metricsGrid}>
        {renderMetricCard(
          'Total Revenue',
          formatCurrency(totalRevenue),
          `${totalOrders} orders`,
          revenueChange
        )}
        {renderMetricCard(
          'Average Order',
          formatCurrency(averageOrder),
          'per order'
        )}
      </View>

      <View style={styles.breakdownSection}>
        <Text style={styles.subsectionTitle}>Revenue Breakdown</Text>
        <View style={styles.breakdownContainer}>
          {renderBreakdownItem('Food', displayData.breakdown.food, foodPercentage, THEME.colors.CHART.PRIMARY)}
          {renderBreakdownItem('Beverages', displayData.breakdown.beverages, beveragesPercentage, THEME.colors.CHART.SECONDARY)}
          {renderBreakdownItem('Delivery', displayData.breakdown.delivery, deliveryPercentage, THEME.colors.CHART.SUCCESS)}
        </View>
      </View>

      <View style={styles.topItemsSection}>
        <Text style={styles.subsectionTitle}>Top Performing Items</Text>
        <View style={styles.topItemsContainer}>
          {displayData.topItems.map((item, index) => renderTopItem(item, index))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: THEME.spacing.MD,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
  },
  sectionTitle: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
  },
  viewDetailsText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.LG,
  },
  periodButton: {
    flex: 1,
    paddingVertical: THEME.spacing.SM,
    paddingHorizontal: THEME.spacing.MD,
    marginHorizontal: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.MD,
    backgroundColor: THEME.colors.GRAY[100],
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
  },
  periodButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: THEME.colors.NEUTRAL.WHITE,
  },
  metricsGrid: {
    flexDirection: 'row',
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.LG,
  },
  metricCard: {
    flex: 1,
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginHorizontal: THEME.spacing.XS,
    ...THEME.shadows.SM,
  },
  metricTitle: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  metricValue: {
    ...THEME.typography.HEADING.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '700',
    marginBottom: THEME.spacing.XS,
  },
  metricSubtitle: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  changeContainer: {
    marginTop: THEME.spacing.SM,
  },
  changeText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
  },
  breakdownSection: {
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.LG,
  },
  subsectionTitle: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    marginBottom: THEME.spacing.MD,
  },
  breakdownContainer: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  breakdownItem: {
    marginBottom: THEME.spacing.MD,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.SM,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: THEME.borderRadius.ROUND,
    marginRight: THEME.spacing.SM,
  },
  breakdownLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    flex: 1,
  },
  breakdownAmount: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  breakdownBar: {
    height: 6,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.ROUND,
  },
  breakdownFill: {
    height: '100%',
    borderRadius: THEME.borderRadius.ROUND,
  },
  topItemsSection: {
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.LG,
  },
  topItemsContainer: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.SM,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.BORDER.SECONDARY,
  },
  topItemRank: {
    width: 30,
    height: 30,
    borderRadius: THEME.borderRadius.ROUND,
    backgroundColor: THEME.colors.PRIMARY.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.MD,
  },
  rankText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  topItemInfo: {
    flex: 1,
  },
  topItemName: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '500',
  },
  topItemOrders: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  topItemRevenue: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  loadingContainer: {
    paddingHorizontal: THEME.spacing.MD,
  },
  loadingShimmer: {
    height: 80,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.SM,
    marginBottom: THEME.spacing.MD,
  },
});

export default RevenueSummary; 