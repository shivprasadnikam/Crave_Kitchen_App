import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';
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
      case 'urgent': return THEME.colors.ERROR.MAIN;
      case 'high': return THEME.colors.WARNING.MAIN;
      case 'normal': return THEME.colors.SUCCESS.MAIN;
      default: return THEME.colors.TEXT.SECONDARY;
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
            <Text style={[styles.orderTypeText, { color: isDelivery ? THEME.colors.PRIMARY.MAIN : THEME.colors.SUCCESS.MAIN }]}>
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
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    marginBottom: THEME.spacing.MD,
    overflow: 'hidden',
    ...THEME.shadows.SM,
  },
  compactCard: {
    padding: THEME.spacing.MD,
  },
  cardContent: {
    padding: THEME.spacing.MD,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.MD,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.XS,
  },
  orderNumber: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginRight: THEME.spacing.SM,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  priorityIcon: {
    fontSize: 12,
    marginRight: THEME.spacing.XS,
  },
  priorityText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
  },
  orderTime: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.MD,
    paddingBottom: THEME.spacing.MD,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.BORDER.PRIMARY,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  customerPhone: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  orderType: {
    alignItems: 'flex-end',
  },
  orderTypeText: {
    ...THEME.typography.BODY.SMALL,
    fontWeight: '600',
  },
  itemsSection: {
    marginBottom: THEME.spacing.MD,
  },
  sectionTitle: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.SM,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.XS,
  },
  itemQuantity: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
    width: 30,
  },
  itemName: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    flex: 1,
    marginLeft: THEME.spacing.SM,
  },
  itemPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  moreItems: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
    marginTop: THEME.spacing.XS,
  },
  addressSection: {
    marginBottom: THEME.spacing.MD,
  },
  addressText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  instructionsSection: {
    marginBottom: THEME.spacing.MD,
  },
  instructionsText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: THEME.spacing.MD,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
  },
  totalSection: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  totalAmount: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  estimatedTime: {
    alignItems: 'flex-end',
  },
  estimatedTimeLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  estimatedTimeValue: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  // Compact view styles
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.SM,
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
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
});

export default OrderCard; 