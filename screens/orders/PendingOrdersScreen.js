import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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

const PendingOrdersScreen = ({ navigation }) => {
  const { orders, fetchOrders, updateOrderStatus } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);

  const pendingStatuses = ['pending', 'confirmed', 'preparing', 'ready'];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterPendingOrders();
  }, [orders]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      await fetchOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to load pending orders');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const filterPendingOrders = () => {
    const filtered = orders.filter(order => pendingStatuses.includes(order.status));
    // Sort by priority: pending first, then by creation time
    filtered.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    setPendingOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      Alert.alert('Success', `Order status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const handleBulkAction = async (action) => {
    const pendingOnly = pendingOrders.filter(order => order.status === 'pending');
    
    if (pendingOnly.length === 0) {
      Alert.alert('No Action Needed', 'No pending orders to process');
      return;
    }

    Alert.alert(
      'Bulk Action',
      `Are you sure you want to ${action} ${pendingOnly.length} pending orders?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              setLoading(true);
              await Promise.all(
                pendingOnly.map(order => updateOrderStatus(order.id, 'confirmed'))
              );
              Alert.alert('Success', `${pendingOnly.length} orders confirmed`);
            } catch (error) {
              Alert.alert('Error', 'Failed to process bulk action');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'confirmed': return colors.info;
      case 'preparing': return colors.secondary;
      case 'ready': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'ready': return '🚀';
      default: return '📋';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'pending': return 'Waiting for confirmation';
      case 'confirmed': return 'Ready to prepare';
      case 'preparing': return 'Currently preparing';
      case 'ready': return 'Ready for pickup/delivery';
      default: return 'Unknown status';
    }
  };

  const renderBulkActions = () => (
    <View style={styles.bulkActionsContainer}>
      <Text style={styles.bulkActionsTitle}>Quick Actions</Text>
      <View style={styles.bulkActionsButtons}>
        <TouchableOpacity
          style={[styles.bulkActionButton, { backgroundColor: colors.primary }]}
          onPress={() => handleBulkAction('confirm')}
        >
          <Text style={styles.bulkActionButtonText}>Confirm All Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bulkActionButton, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('OrderList', { filter: 'pending' })}
        >
          <Text style={styles.bulkActionButtonText}>View All Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderCard = ({ item: order }) => {
    const nextStatus = getNextStatus(order.status);
    const isUrgent = order.status === 'pending' && 
      new Date() - new Date(order.createdAt) > 10 * 60 * 1000; // 10 minutes

    return (
      <TouchableOpacity
        style={[styles.orderCard, isUrgent && styles.urgentCard]}
        onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
            <Text style={styles.orderTime}>
              {dateUtils.formatRelativeTime(order.createdAt)}
            </Text>
            {isUrgent && (
              <Text style={styles.urgentLabel}>⚠️ URGENT</Text>
            )}
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
          {order.items.slice(0, 3).map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.quantity}x {item.name}
            </Text>
          ))}
          {order.items.length > 3 && (
            <Text style={styles.moreItemsText}>+{order.items.length - 3} more items</Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{formatters.formatCurrency(order.total)}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            {nextStatus && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: getStatusColor(nextStatus) }]}
                onPress={() => handleStatusUpdate(order.id, nextStatus)}
              >
                <Text style={styles.actionButtonText}>
                  {nextStatus === 'confirmed' ? 'Confirm' : 
                   nextStatus === 'preparing' ? 'Start Preparing' :
                   nextStatus === 'ready' ? 'Mark Ready' : 'Complete'}
                </Text>
              </TouchableOpacity>
            )}
            {order.status !== 'ready' && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.error }]}
                onPress={() => {
                  Alert.alert(
                    'Cancel Order',
                    'Are you sure you want to cancel this order?',
                    [
                      { text: 'No', style: 'cancel' },
                      { text: 'Yes, Cancel', style: 'destructive', onPress: () => handleStatusUpdate(order.id, 'cancelled') }
                    ]
                  );
                }}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.statusDescription}>
          {getStatusDescription(order.status)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <EmptyState
      title="No Pending Orders"
      message="All orders are up to date! Check back later for new orders."
      icon="✅"
    />
  );

  const renderStats = () => {
    const pendingCount = pendingOrders.filter(order => order.status === 'pending').length;
    const confirmedCount = pendingOrders.filter(order => order.status === 'confirmed').length;
    const preparingCount = pendingOrders.filter(order => order.status === 'preparing').length;
    const readyCount = pendingOrders.filter(order => order.status === 'ready').length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.warning }]}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.info }]}>{confirmedCount}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.secondary }]}>{preparingCount}</Text>
          <Text style={styles.statLabel}>Preparing</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.success }]}>{readyCount}</Text>
          <Text style={styles.statLabel}>Ready</Text>
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
        title="Pending Orders"
        subtitle={`${pendingOrders.length} orders need attention`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {renderStats()}
      {renderBulkActions()}

      <FlatList
        data={pendingOrders}
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
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bulkActionsContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bulkActionsTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  bulkActionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bulkActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bulkActionButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
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
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  urgentLabel: {
    ...typography.caption,
    color: colors.warning,
    fontWeight: '600',
    marginTop: 4,
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
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  statusDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default PendingOrdersScreen; 