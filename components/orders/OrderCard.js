import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import OrderStatusBadge from './OrderStatusBadge';
import OrderActions from './OrderActions';

const OrderCard = ({ 
  order, 
  onPress, 
  onAccept, 
  onReject, 
  onUpdateStatus,
  showActions = true,
  compact = false 
}) => {
  const {
    id,
    orderNumber,
    customerName,
    customerPhone,
    items,
    totalAmount,
    status,
    orderTime,
    estimatedTime,
    deliveryAddress,
    isDelivery,
    specialInstructions,
    priority,
  } = order;

  const getPriorityColor = () => {
    switch (priority) {
      case 'urgent': return colors.error;
      case 'high': return colors.warning;
      case 'normal': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⚡';
      case 'normal': return '📋';
      default: return '📋';
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString();
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCompactView = () => (
    <TouchableOpacity
      style={[styles.card, styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.compactHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>#{orderNumber}</Text>
          <Text style={styles.customerName}>{customerName}</Text>
        </View>
        <View style={styles.compactRight}>
          <OrderStatusBadge status={status} />
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.compactDetails}>
        <Text style={styles.itemCount}>{getItemCount()} items</Text>
        <Text style={styles.orderTime}>{formatTime(orderTime)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFullView = () => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <View style={styles.orderNumberRow}>
              <Text style={styles.orderNumber}>#{orderNumber}</Text>
              {priority !== 'normal' && (
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() + '20' }]}>
                  <Text style={styles.priorityIcon}>{getPriorityIcon()}</Text>
                  <Text style={[styles.priorityText, { color: getPriorityColor() }]}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.orderTime}>
              {formatDate(orderTime)} at {formatTime(orderTime)}
            </Text>
          </View>
          <OrderStatusBadge status={status} />
        </View>

        {/* Customer Info */}
        <View style={styles.customerSection}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{customerName}</Text>
            <Text style={styles.customerPhone}>{customerPhone}</Text>
          </View>
          <View style={styles.orderType}>
            <Text style={[styles.orderTypeText, { color: isDelivery ? colors.primary : colors.success }]}>
              {isDelivery ? '🚚 Delivery' : '🏪 Pickup'}
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items ({getItemCount()})</Text>
          {items.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          {items.length > 3 && (
            <Text style={styles.moreItems}>+{items.length - 3} more items</Text>
          )}
        </View>

        {/* Delivery Address */}
        {isDelivery && deliveryAddress && (
          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Text style={styles.addressText} numberOfLines={2}>
              {deliveryAddress}
            </Text>
          </View>
        )}

        {/* Special Instructions */}
        {specialInstructions && (
          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <Text style={styles.instructionsText} numberOfLines={2}>
              {specialInstructions}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          {estimatedTime && (
            <View style={styles.estimatedTime}>
              <Text style={styles.estimatedTimeLabel}>Est. Ready</Text>
              <Text style={styles.estimatedTimeValue}>{formatTime(estimatedTime)}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      {showActions && (
        <OrderActions
          order={order}
          onAccept={onAccept}
          onReject={onReject}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </View>
  );

  return compact ? renderCompactView() : renderFullView();
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  compactCard: {
    padding: 16,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderNumber: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginRight: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  priorityText: {
    ...typography.caption,
    fontWeight: '600',
  },
  orderTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  customerPhone: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  orderType: {
    alignItems: 'flex-end',
  },
  orderTypeText: {
    ...typography.body2,
    fontWeight: '600',
  },
  itemsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemQuantity: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
    width: 30,
  },
  itemName: {
    ...typography.body2,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  itemPrice: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  moreItems: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  addressSection: {
    marginBottom: 16,
  },
  addressText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  instructionsSection: {
    marginBottom: 16,
  },
  instructionsText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalSection: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  totalAmount: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  estimatedTime: {
    alignItems: 'flex-end',
  },
  estimatedTimeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  estimatedTimeValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  // Compact view styles
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  compactRight: {
    alignItems: 'flex-end',
  },
  compactDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    ...typography.body2,
    color: colors.textSecondary,
  },
});

export default OrderCard; 