import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';

const OrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const { orderId } = route.params;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorId || user?.id || 1;
      console.log(`[ORDER DETAIL] Loading order details for order: ${orderId}, vendor: ${vendorId}`);
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      const orderData = await orderService.getOrderById(orderId, vendorId);
      console.log(`[ORDER DETAIL] Loaded order details:`, orderData);
      
      setOrder(orderData);
    } catch (error) {
      console.error('[ORDER DETAIL] Error loading order details:', error);
      setError(error.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrderDetails();
    setRefreshing(false);
  };

  const handleOrderAction = async (action) => {
    try {
      const vendorId = user?.vendorId || user?.id || 1;
      
      switch (action) {
        case 'accept':
          await orderService.acceptOrder(orderId, vendorId);
          Alert.alert('Success', 'Order accepted successfully!');
          break;
        case 'start_preparing':
          await orderService.startPreparingOrder(orderId, vendorId);
          Alert.alert('Success', 'Order preparation started!');
          break;
        case 'mark_ready':
          await orderService.markOrderReady(orderId, vendorId);
          Alert.alert('Success', 'Order marked as ready!');
          break;
        case 'complete':
          await orderService.completeOrder(orderId, vendorId);
          Alert.alert('Success', 'Order completed!');
          break;
        case 'reject':
          Alert.prompt(
            'Reject Order',
            'Please provide a reason for rejection:',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Reject',
                style: 'destructive',
                onPress: async (reason) => {
                  await orderService.rejectOrder(orderId, vendorId, reason);
                  Alert.alert('Success', 'Order rejected!');
                }
              }
            ]
          );
          return;
        default:
          break;
      }
      
      // Refresh order details after action
      await loadOrderDetails();
    } catch (error) {
      console.error('[ORDER DETAIL] Error performing order action:', error);
      Alert.alert('Error', error.message || 'Failed to perform action');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'accepted':
        return '#2196F3';
      case 'preparing':
        return '#2196F3';
      case 'ready':
        return '#FF9800';
      case 'completed':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const renderOrderActions = () => {
    if (!order) return null;
    
    const actions = [];
    
    switch (order.status) {
      case 'pending':
        actions.push(
          { label: 'Accept Order', action: 'accept', color: '#4CAF50' },
          { label: 'Reject Order', action: 'reject', color: '#F44336' }
        );
        break;
      case 'accepted':
        actions.push(
          { label: 'Start Preparing', action: 'start_preparing', color: '#2196F3' }
        );
        break;
      case 'preparing':
        actions.push(
          { label: 'Mark Ready', action: 'mark_ready', color: '#FF9800' }
        );
        break;
      case 'ready':
        actions.push(
          { label: 'Complete Order', action: 'complete', color: '#4CAF50' }
        );
        break;
    }
    
    if (actions.length === 0) return null;
    
    return (
      <View style={styles.actionButtons}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={() => handleOrderAction(action.action)}
          >
            <Text style={styles.actionButtonText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderOrderItem = (item, index) => (
    <View key={index} style={styles.orderItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
      {item.specialInstructions && (
        <Text style={styles.specialInstructions}>
          Note: {item.specialInstructions}
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOrderDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>

        {/* Order Status */}
        <View style={styles.statusSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
          </View>
          <Text style={styles.orderNumber}>
            {order.orderNumber || `Order #${order.id}`}
          </Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{order.customerName || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{order.customerPhone || 'N/A'}</Text>
          </View>
          {order.deliveryAddress && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{order.deliveryAddress}</Text>
            </View>
          )}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items && order.items.length > 0 ? (
            order.items.map(renderOrderItem)
          ) : (
            <Text style={styles.noItemsText}>No items found</Text>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>₹{order.subtotal || order.totalAmount || 0}</Text>
          </View>
          {order.deliveryFee && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee:</Text>
              <Text style={styles.summaryValue}>₹{order.deliveryFee}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={styles.totalAmount}>₹{order.totalAmount || order.total || 0}</Text>
          </View>
        </View>

        {/* Order Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Timeline</Text>
          <View style={styles.timelineItem}>
            <Text style={styles.timelineTime}>
              {order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'}
            </Text>
            <Text style={styles.timelineText}>Order placed</Text>
          </View>
          {order.acceptedAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineTime}>
                {new Date(order.acceptedAt).toLocaleString()}
              </Text>
              <Text style={styles.timelineText}>Order accepted</Text>
            </View>
          )}
          {order.preparationStartedAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineTime}>
                {new Date(order.preparationStartedAt).toLocaleString()}
              </Text>
              <Text style={styles.timelineText}>Preparation started</Text>
            </View>
          )}
          {order.readyAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineTime}>
                {new Date(order.readyAt).toLocaleString()}
              </Text>
              <Text style={styles.timelineText}>Order ready</Text>
            </View>
          )}
          {order.completedAt && (
            <View style={styles.timelineItem}>
              <Text style={styles.timelineTime}>
                {new Date(order.completedAt).toLocaleString()}
              </Text>
              <Text style={styles.timelineText}>Order completed</Text>
            </View>
          )}
        </View>

        {/* Notes */}
        {order.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{order.notes}</Text>
          </View>
        )}

        {/* Action Buttons */}
        {renderOrderActions()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0EA5E9',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  orderItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  specialInstructions: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  noItemsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  timelineItem: {
    marginBottom: 12,
  },
  timelineTime: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  timelineText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  notesText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    color: '#FF6B35',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderDetailScreen;
