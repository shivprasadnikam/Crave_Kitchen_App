import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const AvailabilityToggle = ({ 
  isAvailable, 
  onToggle, 
  size = 'medium',
  showLabel = true,
  disabled = false 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          toggle: styles.smallToggle,
          thumb: styles.smallThumb,
          label: styles.smallLabel,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          toggle: styles.largeToggle,
          thumb: styles.largeThumb,
          label: styles.largeLabel,
        };
      default: // medium
        return {
          container: styles.mediumContainer,
          toggle: styles.mediumToggle,
          thumb: styles.mediumThumb,
          label: styles.mediumLabel,
        };
    }
  };

  const getToggleWidth = () => {
    switch (size) {
      case 'small': return 32;
      case 'large': return 56;
      default: return 44;
    }
  };

  const getToggleHeight = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 32;
      default: return 24;
    }
  };

  const getThumbSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 28;
      default: return 20;
    }
  };

  const handleToggle = () => {
    if (!disabled && onToggle) {
      onToggle();
    }
  };

  const sizeStyles = getSizeStyles();
  const toggleWidth = getToggleWidth();
  const toggleHeight = getToggleHeight();
  const thumbSize = getThumbSize();

  const renderToggle = () => (
    <TouchableOpacity
      style={[
        styles.toggle,
        sizeStyles.toggle,
        {
          width: toggleWidth,
          height: toggleHeight,
          backgroundColor: isAvailable ? colors.success : colors.border,
          opacity: disabled ? 0.5 : 1,
        }
      ]}
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.thumb,
          sizeStyles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            transform: [
              {
                translateX: isAvailable 
                  ? toggleWidth - thumbSize - 2 
                  : 2
              }
            ],
          }
        ]}
      />
    </TouchableOpacity>
  );

  const renderWithLabel = () => (
    <View style={[styles.container, sizeStyles.container]}>
      {renderToggle()}
      {showLabel && (
        <Text style={[
          styles.label,
          sizeStyles.label,
          {
            color: isAvailable ? colors.success : colors.textSecondary,
            opacity: disabled ? 0.5 : 1,
          }
        ]}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </Text>
      )}
    </View>
  );

  const renderToggleOnly = () => renderToggle();

  return showLabel ? renderWithLabel() : renderToggleOnly();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggle: {
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    backgroundColor: colors.white,
    borderRadius: 50,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontWeight: '500',
  },
  // Small size
  smallContainer: {
    gap: 6,
  },
  smallToggle: {
    borderRadius: 9,
  },
  smallThumb: {
    borderRadius: 7,
  },
  smallLabel: {
    ...typography.caption,
    fontSize: 10,
  },
  // Medium size
  mediumContainer: {
    gap: 8,
  },
  mediumToggle: {
    borderRadius: 12,
  },
  mediumThumb: {
    borderRadius: 10,
  },
  mediumLabel: {
    ...typography.body2,
    fontSize: 12,
  },
  // Large size
  largeContainer: {
    gap: 12,
  },
  largeToggle: {
    borderRadius: 16,
  },
  largeThumb: {
    borderRadius: 14,
  },
  largeLabel: {
    ...typography.body1,
    fontSize: 14,
  },
});

export default AvailabilityToggle; 