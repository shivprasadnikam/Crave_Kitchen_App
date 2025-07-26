import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
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

const OrderDetailScreen = ({ navigation, route }) => {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const { orderId } = route.params;

  useEffect(() => {
    loadOrderDetails();
  }, [orderId, orders]);

  const loadOrderDetails = () => {
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      Alert.alert('Error', 'Order not found');
      navigation.goBack();
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, newStatus);
      Alert.alert('Success', `Order status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handleCallCustomer = () => {
    if (order?.customerPhone) {
      Linking.openURL(`tel:${order.customerPhone}`);
    }
  };

  const handleMessageCustomer = () => {
    if (order?.customerPhone) {
      Linking.openURL(`sms:${order.customerPhone}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'confirmed': return colors.info;
      case 'preparing': return colors.secondary;
      case 'ready': return colors.success;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'ready': return '🚀';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
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
      case 'pending': return 'Order received, waiting for confirmation';
      case 'confirmed': return 'Order confirmed, ready to prepare';
      case 'preparing': return 'Order is being prepared';
      case 'ready': return 'Order is ready for pickup/delivery';
      case 'completed': return 'Order has been completed';
      case 'cancelled': return 'Order has been cancelled';
      default: return 'Unknown status';
    }
  };

  const renderStatusSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Status</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
        <Text style={styles.statusDescription}>
          {getStatusDescription(order.status)}
        </Text>
      </View>
      
      {['pending', 'confirmed', 'preparing', 'ready'].includes(order.status) && (
        <View style={styles.statusActions}>
          <Text style={styles.statusActionsTitle}>Update Status</Text>
          <View style={styles.statusButtons}>
            {getNextStatus(order.status) && (
              <TouchableOpacity
                style={[styles.statusButton, { backgroundColor: getStatusColor(getNextStatus(order.status)) }]}
                onPress={() => handleStatusUpdate(getNextStatus(order.status))}
                disabled={loading}
              >
                <Text style={styles.statusButtonText}>
                  Mark as {getNextStatus(order.status)}
                </Text>
              </TouchableOpacity>
            )}
            {order.status !== 'cancelled' && (
              <TouchableOpacity
                style={[styles.statusButton, { backgroundColor: colors.error }]}
                onPress={() => {
                  Alert.alert(
                    'Cancel Order',
                    'Are you sure you want to cancel this order?',
                    [
                      { text: 'No', style: 'cancel' },
                      { text: 'Yes, Cancel', style: 'destructive', onPress: () => handleStatusUpdate('cancelled') }
                    ]
                  );
                }}
                disabled={loading}
              >
                <Text style={styles.statusButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );

  const renderCustomerSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Information</Text>
      <View style={styles.customerCard}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.customerPhone}>{order.customerPhone}</Text>
          {order.customerEmail && (
            <Text style={styles.customerEmail}>{order.customerEmail}</Text>
          )}
        </View>
        <View style={styles.customerActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleCallCustomer}
          >
            <Text style={styles.actionButtonText}>📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={handleMessageCustomer}
          >
            <Text style={styles.actionButtonText}>💬 Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderOrderItems = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Items</Text>
      <View style={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.notes && (
                <Text style={styles.itemNotes}>Notes: {item.notes}</Text>
              )}
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>{formatters.formatCurrency(item.price)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatters.formatCurrency(order.subtotal)}</Text>
        </View>
        {order.deliveryFee > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>{formatters.formatCurrency(order.deliveryFee)}</Text>
          </View>
        )}
        {order.tax > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatters.formatCurrency(order.tax)}</Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatters.formatCurrency(order.total)}</Text>
        </View>
      </View>
    </View>
  );

  const renderOrderDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Details</Text>
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Number</Text>
          <Text style={styles.detailValue}>#{order.orderNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Date</Text>
          <Text style={styles.detailValue}>{dateUtils.formatDateTime(order.createdAt)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{order.paymentMethod}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Status</Text>
          <Text style={[styles.detailValue, { color: order.paymentStatus === 'paid' ? colors.success : colors.warning }]}>
            {order.paymentStatus}
          </Text>
        </View>
        {order.deliveryAddress && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address</Text>
            <Text style={styles.detailValue}>{order.deliveryAddress}</Text>
          </View>
        )}
        {order.estimatedDeliveryTime && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>{dateUtils.formatDateTime(order.estimatedDeliveryTime)}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (!order) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`Order #${order.orderNumber}`}
        subtitle={dateUtils.formatDateTime(order.createdAt)}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStatusSection()}
        {renderCustomerSection()}
        {renderOrderItems()}
        {renderOrderSummary()}
        {renderOrderDetails()}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
    fontWeight: '600',
  },
  statusContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  statusText: {
    ...typography.body1,
    color: colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statusActions: {
    marginTop: 16,
  },
  statusActionsTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statusButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  customerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  customerInfo: {
    marginBottom: 16,
  },
  customerName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerPhone: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  customerEmail: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  customerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  itemsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  itemNotes: {
    ...typography.caption,
    color: colors.warning,
    fontStyle: 'italic',
  },
  itemDetails: {
    alignItems: 'flex-end',
  },
  itemQuantity: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
});

export default OrderDetailScreen; 