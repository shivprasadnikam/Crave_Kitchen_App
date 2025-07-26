import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderContext } from '../../context/OrderContext';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../styles/globalStyles';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const CompletedOrdersScreen = ({ navigation }) => {
  const { orders, fetchOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [completedOrders, setCompletedOrders] = useState([]);

  const filters = [
    { key: 'all', label: 'All Completed', icon: '✅' },
    { key: 'today', label: 'Today', icon: '📅' },
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'high_value', label: 'High Value', icon: '💰' },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterCompletedOrders();
  }, [orders, activeFilter, searchQuery]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      await fetchOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to load completed orders');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const filterCompletedOrders = () => {
    let filtered = orders.filter(order => order.status === 'completed');

    // Apply time filter
    switch (activeFilter) {
      case 'today':
        const today = new Date();
        const todayStart = dateUtils.startOfDay(today);
        filtered = filtered.filter(order => new Date(order.updatedAt || order.createdAt) >= todayStart);
        break;
      case 'week':
        const weekStart = dateUtils.startOfWeek(new Date());
        filtered = filtered.filter(order => new Date(order.updatedAt || order.createdAt) >= weekStart);
        break;
      case 'month':
        const monthStart = dateUtils.startOfMonth(new Date());
        filtered = filtered.filter(order => new Date(order.updatedAt || order.createdAt) >= monthStart);
        break;
      case 'high_value':
        const averageOrderValue = filtered.reduce((sum, order) => sum + order.total, 0) / filtered.length;
        filtered = filtered.filter(order => order.total > averageOrderValue);
        break;
      default:
        // Show all completed orders
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName?.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    // Sort by completion date (newest first)
    filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

    setCompletedOrders(filtered);
  };

  const getOrderDuration = (order) => {
    const startTime = new Date(order.createdAt);
    const endTime = new Date(order.updatedAt || order.createdAt);
    const duration = endTime - startTime;
    const minutes = Math.floor(duration / (1000 * 60));
    return minutes;
  };

  const getDurationColor = (minutes) => {
    if (minutes <= 15) return colors.success;
    if (minutes <= 30) return colors.warning;
    return colors.error;
  };

  const renderFilterTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[styles.filterTab, activeFilter === filter.key && styles.activeFilterTab]}
          onPress={() => setActiveFilter(filter.key)}
        >
          <Text style={styles.filterIcon}>{filter.icon}</Text>
          <Text style={[styles.filterLabel, activeFilter === filter.key && styles.activeFilterLabel]}>
            {filter.label}
          </Text>
          {activeFilter === filter.key && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search completed orders..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSearchQuery('')}
        >
          <Text style={styles.clearButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderOrderCard = ({ item: order }) => {
    const duration = getOrderDuration(order);
    const durationColor = getDurationColor(duration);

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
            <Text style={styles.orderTime}>
              Completed {dateUtils.formatRelativeTime(order.updatedAt || order.createdAt)}
            </Text>
          </View>
          <View style={[styles.durationBadge, { backgroundColor: durationColor }]}>
            <Text style={styles.durationText}>{duration}m</Text>
          </View>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.customerPhone}>{order.customerPhone}</Text>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.itemsTitle}>Items ({order.items.length})</Text>
          {order.items.slice(0, 2).map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.quantity}x {item.name}
            </Text>
          ))}
          {order.items.length > 2 && (
            <Text style={styles.moreItemsText}>+{order.items.length - 2} more items</Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{formatters.formatCurrency(order.total)}</Text>
          </View>
          
          <View style={styles.completionInfo}>
            <Text style={styles.completionLabel}>Completed</Text>
            <Text style={styles.completionTime}>
              {dateUtils.formatDateTime(order.updatedAt || order.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.orderMetrics}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Preparation Time</Text>
            <Text style={[styles.metricValue, { color: durationColor }]}>{duration} minutes</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Items</Text>
            <Text style={styles.metricValue}>{order.items.length}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Avg. Item Price</Text>
            <Text style={styles.metricValue}>
              {formatters.formatCurrency(order.total / order.items.length)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    let title = 'No Completed Orders';
    let message = 'Completed orders will appear here once you finish processing orders';
    let icon = '✅';

    if (searchQuery.trim()) {
      title = 'No Matching Orders';
      message = 'Try adjusting your search terms';
      icon = '🔍';
    } else if (activeFilter !== 'all') {
      title = `No ${activeFilter} Orders`;
      message = `There are no ${activeFilter} completed orders`;
      icon = '📭';
    }

    return (
      <EmptyState
        title={title}
        message={message}
        icon={icon}
      />
    );
  };

  const renderAnalytics = () => {
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    const totalItems = completedOrders.reduce((sum, order) => sum + order.items.length, 0);
    const averagePreparationTime = completedOrders.length > 0 
      ? completedOrders.reduce((sum, order) => sum + getOrderDuration(order), 0) / completedOrders.length 
      : 0;

    return (
      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>Analytics</Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>{completedOrders.length}</Text>
            <Text style={styles.analyticsLabel}>Orders</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>{formatters.formatCurrency(totalRevenue)}</Text>
            <Text style={styles.analyticsLabel}>Revenue</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>{formatters.formatCurrency(averageOrderValue)}</Text>
            <Text style={styles.analyticsLabel}>Avg. Order</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsValue}>{Math.round(averagePreparationTime)}m</Text>
            <Text style={styles.analyticsLabel}>Avg. Time</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Completed Orders"
        subtitle={`${completedOrders.length} orders completed`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {renderSearchBar()}
      {renderFilterTabs()}
      {renderAnalytics()}

      <FlatList
        data={completedOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.textPrimary,
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 24,
    top: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  filterLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterLabel: {
    color: colors.white,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 1,
  },
  analyticsContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  analyticsTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  analyticsValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  analyticsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  orderTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  durationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  customerPhone: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemsTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  moreItemsText: {
    ...typography.caption,
    color: colors.primary,
    fontStyle: 'italic',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalInfo: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  totalAmount: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  completionInfo: {
    alignItems: 'flex-end',
  },
  completionLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  completionTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  metricValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default CompletedOrdersScreen; 