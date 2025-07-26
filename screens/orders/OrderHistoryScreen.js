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

const OrderHistoryScreen = ({ navigation }) => {
  const { orders, fetchOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const filters = [
    { key: 'all', label: 'All History', icon: '📋' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    { key: 'cancelled', label: 'Cancelled', icon: '❌' },
    { key: 'today', label: 'Today', icon: '📅' },
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, activeFilter, searchQuery]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      await fetchOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Apply status filter
    switch (activeFilter) {
      case 'completed':
        filtered = filtered.filter(order => order.status === 'completed');
        break;
      case 'cancelled':
        filtered = filtered.filter(order => order.status === 'cancelled');
        break;
      case 'today':
        const today = new Date();
        const todayStart = dateUtils.startOfDay(today);
        filtered = filtered.filter(order => new Date(order.createdAt) >= todayStart);
        break;
      case 'week':
        const weekStart = dateUtils.startOfWeek(new Date());
        filtered = filtered.filter(order => new Date(order.createdAt) >= weekStart);
        break;
      case 'month':
        const monthStart = dateUtils.startOfMonth(new Date());
        filtered = filtered.filter(order => new Date(order.createdAt) >= monthStart);
        break;
      default:
        // Show all orders
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

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      default: return '📋';
    }
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
        placeholder="Search order history..."
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

  const renderOrderCard = ({ item: order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
          <Text style={styles.orderTime}>
            {dateUtils.formatDateTime(order.createdAt)}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
          <Text style={styles.statusText}>{order.status}</Text>
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
          <Text style={styles.completionLabel}>
            {order.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
          <Text style={styles.completionTime}>
            {dateUtils.formatRelativeTime(order.updatedAt || order.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    let title = 'No Order History';
    let message = 'Completed and cancelled orders will appear here';
    let icon = '📋';

    if (searchQuery.trim()) {
      title = 'No Matching Orders';
      message = 'Try adjusting your search terms';
      icon = '🔍';
    } else if (activeFilter !== 'all') {
      title = `No ${activeFilter} Orders`;
      message = `There are no ${activeFilter} orders in your history`;
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

  const renderStats = () => {
    const completedOrders = orders.filter(order => order.status === 'completed');
    const cancelledOrders = orders.filter(order => order.status === 'cancelled');
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedOrders.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{cancelledOrders.length}</Text>
          <Text style={styles.statLabel}>Cancelled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatters.formatCurrency(totalRevenue)}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
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
        title="Order History"
        subtitle={`${filteredOrders.length} orders found`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {renderSearchBar()}
      {renderFilterTabs()}
      {renderStats()}

      <FlatList
        data={filteredOrders}
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
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
});

export default OrderHistoryScreen; 