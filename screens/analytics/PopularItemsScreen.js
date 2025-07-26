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
import { MenuContext } from '../../context/MenuContext';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PopularItemsScreen = ({ navigation }) => {
  const { orders } = useContext(OrderContext);
  const { menuItems, categories } = useContext(MenuContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('orders');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
    { key: 'year', label: 'This Year', icon: '📈' },
  ];

  const metrics = [
    { key: 'orders', label: 'Order Count', icon: '📋' },
    { key: 'revenue', label: 'Revenue', icon: '💰' },
    { key: 'quantity', label: 'Quantity Sold', icon: '📦' },
  ];

  useEffect(() => {
    loadPopularItemsData();
  }, [selectedPeriod, selectedMetric, selectedCategory]);

  const loadPopularItemsData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPopularItemsData();
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

  const getPopularItems = () => {
    const filteredOrders = getFilteredOrders();
    const itemStats = {};

    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (!itemStats[item.name]) {
          itemStats[item.name] = {
            name: item.name,
            orders: 0,
            quantity: 0,
            revenue: 0,
            categoryId: item.categoryId,
            price: item.price,
          };
        }
        
        itemStats[item.name].orders++;
        itemStats[item.name].quantity += item.quantity;
        itemStats[item.name].revenue += item.price * item.quantity;
      });
    });

    let items = Object.values(itemStats);

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.categoryId === selectedCategory);
    }

    // Sort by selected metric
    items.sort((a, b) => b[selectedMetric] - a[selectedMetric]);

    return items.slice(0, 20); // Top 20 items
  };

  const getCategoryItems = () => {
    const popularItems = getPopularItems();
    const categoryStats = {};

    popularItems.forEach(item => {
      const category = categories.find(c => c.id === item.categoryId);
      const categoryName = category ? category.name : 'Uncategorized';
      
      if (!categoryStats[categoryName]) {
        categoryStats[categoryName] = {
          name: categoryName,
          items: 0,
          totalOrders: 0,
          totalRevenue: 0,
          totalQuantity: 0,
        };
      }
      
      categoryStats[categoryName].items++;
      categoryStats[categoryName].totalOrders += item.orders;
      categoryStats[categoryName].totalRevenue += item.revenue;
      categoryStats[categoryName].totalQuantity += item.quantity;
    });

    return Object.values(categoryStats)
      .sort((a, b) => b[selectedMetric === 'orders' ? 'totalOrders' : selectedMetric === 'revenue' ? 'totalRevenue' : 'totalQuantity'] - a[selectedMetric === 'orders' ? 'totalOrders' : selectedMetric === 'revenue' ? 'totalRevenue' : 'totalQuantity']);
  };

  const getItemTrend = (itemName) => {
    const filteredOrders = getFilteredOrders();
    const trendData = {};

    filteredOrders.forEach(order => {
      const date = dateUtils.formatDate(order.createdAt);
      order.items.forEach(item => {
        if (item.name === itemName) {
          if (!trendData[date]) {
            trendData[date] = { orders: 0, quantity: 0, revenue: 0 };
          }
          trendData[date].orders++;
          trendData[date].quantity += item.quantity;
          trendData[date].revenue += item.price * item.quantity;
        }
      });
    });

    return Object.entries(trendData)
      .map(([date, data]) => ({ date, ...data }))
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

  const renderCategoryFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilterContainer}
      contentContainerStyle={styles.categoryFilterContent}
    >
      <TouchableOpacity
        style={[styles.categoryTab, selectedCategory === 'all' && styles.activeCategoryTab]}
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={[styles.categoryTabText, selectedCategory === 'all' && styles.activeCategoryTabText]}>
          All Categories
        </Text>
      </TouchableOpacity>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.categoryTab, selectedCategory === category.id && styles.activeCategoryTab]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <Text style={[styles.categoryTabText, selectedCategory === category.id && styles.activeCategoryTabText]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPopularItem = ({ item, index }) => {
    const category = categories.find(c => c.id === item.categoryId);
    const trendData = getItemTrend(item.name);
    const recentTrend = trendData.length > 0 ? trendData[trendData.length - 1] : null;

    let displayValue;
    let displayLabel;
    switch (selectedMetric) {
      case 'orders':
        displayValue = item.orders;
        displayLabel = 'orders';
        break;
      case 'revenue':
        displayValue = formatters.formatCurrency(item.revenue);
        displayLabel = 'revenue';
        break;
      case 'quantity':
        displayValue = item.quantity;
        displayLabel = 'sold';
        break;
    }

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemRank}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{category ? category.name : 'Uncategorized'}</Text>
          </View>
          <View style={styles.itemMetrics}>
            <Text style={styles.itemValue}>{displayValue}</Text>
            <Text style={styles.itemLabel}>{displayLabel}</Text>
          </View>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.itemDetail}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>{formatters.formatCurrency(item.price)}</Text>
          </View>
          <View style={styles.itemDetail}>
            <Text style={styles.detailLabel}>Orders:</Text>
            <Text style={styles.detailValue}>{item.orders}</Text>
          </View>
          <View style={styles.itemDetail}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>{item.quantity}</Text>
          </View>
          <View style={styles.itemDetail}>
            <Text style={styles.detailLabel}>Revenue:</Text>
            <Text style={styles.detailValue}>{formatters.formatCurrency(item.revenue)}</Text>
          </View>
        </View>

        {recentTrend && (
          <View style={styles.trendInfo}>
            <Text style={styles.trendLabel}>Recent Activity:</Text>
            <Text style={styles.trendValue}>
              {recentTrend.orders} orders, {recentTrend.quantity} items, {formatters.formatCurrency(recentTrend.revenue)}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderCategoryBreakdown = () => {
    const categoryItems = getCategoryItems();
    
    if (categoryItems.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No category data available</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {categoryItems.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryItems}>{category.items} items</Text>
            </View>
            <View style={styles.categoryMetrics}>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.totalOrders}</Text>
                <Text style={styles.categoryMetricLabel}>Orders</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.totalQuantity}</Text>
                <Text style={styles.categoryMetricLabel}>Quantity</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{formatters.formatCurrency(category.totalRevenue)}</Text>
                <Text style={styles.categoryMetricLabel}>Revenue</Text>
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

  const popularItems = getPopularItems();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Popular Items"
        subtitle={`${selectedPeriod} top performers`}
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
        {renderCategoryFilter()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Items</Text>
          {popularItems.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionText}>No items found for this period</Text>
            </View>
          ) : (
            popularItems.map((item, index) => renderPopularItem({ item, index }))
          )}
        </View>

        {renderCategoryBreakdown()}
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
    marginBottom: 12,
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
  categoryFilterContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  activeCategoryTab: {
    backgroundColor: colors.primary,
  },
  categoryTabText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: colors.white,
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
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemRank: {
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
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  itemMetrics: {
    alignItems: 'flex-end',
  },
  itemValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  itemLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  itemDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  itemDetail: {
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
  trendInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  trendLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  trendValue: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  categoryInfo: {
    marginBottom: 12,
  },
  categoryName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryItems: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryMetric: {
    alignItems: 'center',
  },
  categoryMetricValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  categoryMetricLabel: {
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

export default PopularItemsScreen; 