import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
          color: THEME.colors.WARNING.MAIN,
          icon: '⏳',
          backgroundColor: THEME.colors.WARNING.MAIN + '20',
        };
      case 'accepted':
        return {
          label: 'Accepted',
          color: THEME.colors.INFO.MAIN,
          icon: '✅',
          backgroundColor: THEME.colors.INFO.MAIN + '20',
        };
      case 'preparing':
        return {
          label: 'Preparing',
          color: THEME.colors.PRIMARY.MAIN,
          icon: '👨‍🍳',
          backgroundColor: THEME.colors.PRIMARY.MAIN + '20',
        };
      case 'ready':
        return {
          label: 'Ready',
          color: THEME.colors.SUCCESS.MAIN,
          icon: '🎉',
          backgroundColor: THEME.colors.SUCCESS.MAIN + '20',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          color: THEME.colors.SECONDARY.MAIN,
          icon: '🚚',
          backgroundColor: THEME.colors.SECONDARY.MAIN + '20',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          color: THEME.colors.SUCCESS.MAIN,
          icon: '📦',
          backgroundColor: THEME.colors.SUCCESS.MAIN + '20',
        };
      case 'completed':
        return {
          label: 'Completed',
          color: THEME.colors.SUCCESS.MAIN,
          icon: '✅',
          backgroundColor: THEME.colors.SUCCESS.MAIN + '20',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: THEME.colors.ERROR.MAIN,
          icon: '❌',
          backgroundColor: THEME.colors.ERROR.MAIN + '20',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: THEME.colors.ERROR.MAIN,
          icon: '🚫',
          backgroundColor: THEME.colors.ERROR.MAIN + '20',
        };
      case 'expired':
        return {
          label: 'Expired',
          color: THEME.colors.TEXT.SECONDARY,
          icon: '⏰',
          backgroundColor: THEME.colors.TEXT.SECONDARY + '20',
        };
      default:
        return {
          label: status || 'Unknown',
          color: THEME.colors.TEXT.SECONDARY,
          icon: '❓',
          backgroundColor: THEME.colors.TEXT.SECONDARY + '20',
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
    borderRadius: THEME.borderRadius.ROUND,
    borderWidth: 1,
    paddingHorizontal: THEME.spacing.SM,
  },
  icon: {
    marginRight: THEME.spacing.XS,
  },
  text: {
    fontWeight: '600',
  },
  // Small size
  smallContainer: {
    paddingVertical: THEME.spacing.XS,
    paddingHorizontal: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  smallText: {
    ...THEME.typography.CAPTION.SMALL,
    fontSize: 10,
  },
  smallIcon: {
    fontSize: 10,
    marginRight: THEME.spacing.XS,
  },
  // Medium size
  mediumContainer: {
    paddingVertical: THEME.spacing.XS,
    paddingHorizontal: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.ROUND,
  },
  mediumText: {
    ...THEME.typography.CAPTION.SMALL,
    fontSize: 12,
  },
  mediumIcon: {
    fontSize: 12,
    marginRight: THEME.spacing.XS,
  },
  // Large size
  largeContainer: {
    paddingVertical: THEME.spacing.SM,
    paddingHorizontal: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.ROUND,
  },
  largeText: {
    ...THEME.typography.BODY.SMALL,
    fontSize: 14,
  },
  largeIcon: {
    fontSize: 14,
    marginRight: THEME.spacing.SM,
  },
});

export default OrderStatusBadge; 