import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const OrderStatusBadge = ({ 
  status, 
  size = 'medium',
  showIcon = true 
}) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          label: 'Pending',
          color: colors.warning,
          icon: '⏳',
          backgroundColor: colors.warning + '20',
        };
      case 'accepted':
        return {
          label: 'Accepted',
          color: colors.info,
          icon: '✅',
          backgroundColor: colors.info + '20',
        };
      case 'preparing':
        return {
          label: 'Preparing',
          color: colors.primary,
          icon: '👨‍🍳',
          backgroundColor: colors.primary + '20',
        };
      case 'ready':
        return {
          label: 'Ready',
          color: colors.success,
          icon: '🎉',
          backgroundColor: colors.success + '20',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          color: colors.secondary,
          icon: '🚚',
          backgroundColor: colors.secondary + '20',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          color: colors.success,
          icon: '📦',
          backgroundColor: colors.success + '20',
        };
      case 'completed':
        return {
          label: 'Completed',
          color: colors.success,
          icon: '✅',
          backgroundColor: colors.success + '20',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: colors.error,
          icon: '❌',
          backgroundColor: colors.error + '20',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: colors.error,
          icon: '🚫',
          backgroundColor: colors.error + '20',
        };
      case 'expired':
        return {
          label: 'Expired',
          color: colors.textSecondary,
          icon: '⏰',
          backgroundColor: colors.textSecondary + '20',
        };
      default:
        return {
          label: status || 'Unknown',
          color: colors.textSecondary,
          icon: '❓',
          backgroundColor: colors.textSecondary + '20',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          text: styles.smallText,
          icon: styles.smallIcon,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          text: styles.largeText,
          icon: styles.largeIcon,
        };
      default: // medium
        return {
          container: styles.mediumContainer,
          text: styles.mediumText,
          icon: styles.mediumIcon,
        };
    }
  };

  const statusConfig = getStatusConfig();
  const sizeStyles = getSizeStyles();

  return (
    <View style={[
      styles.container,
      sizeStyles.container,
      {
        backgroundColor: statusConfig.backgroundColor,
        borderColor: statusConfig.color + '40',
      }
    ]}>
      {showIcon && (
        <Text style={[styles.icon, sizeStyles.icon]}>
          {statusConfig.icon}
        </Text>
      )}
      <Text style={[
        styles.text,
        sizeStyles.text,
        { color: statusConfig.color }
      ]}>
        {statusConfig.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
  },
  // Small size
  smallContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  smallText: {
    ...typography.caption,
    fontSize: 10,
  },
  smallIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  // Medium size
  mediumContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  mediumText: {
    ...typography.caption,
    fontSize: 12,
  },
  mediumIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  // Large size
  largeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  largeText: {
    ...typography.body2,
    fontSize: 14,
  },
  largeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
});

export default OrderStatusBadge; 