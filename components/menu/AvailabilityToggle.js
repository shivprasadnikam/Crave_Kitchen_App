import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
          backgroundColor: isAvailable ? THEME.colors.SUCCESS.MAIN : THEME.colors.BORDER.PRIMARY,
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
            color: isAvailable ? THEME.colors.SUCCESS.MAIN : THEME.colors.TEXT.SECONDARY,
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
    gap: THEME.spacing.SM,
  },
  toggle: {
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    backgroundColor: THEME.colors.NEUTRAL.WHITE,
    borderRadius: 50,
    shadowColor: THEME.colors.TEXT.PRIMARY,
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
    gap: THEME.spacing.XS,
  },
  smallToggle: {
    borderRadius: 9,
  },
  smallThumb: {
    borderRadius: 7,
  },
  smallLabel: {
    ...THEME.typography.CAPTION.SMALL,
    fontSize: 10,
  },
  // Medium size
  mediumContainer: {
    gap: THEME.spacing.SM,
  },
  mediumToggle: {
    borderRadius: 12,
  },
  mediumThumb: {
    borderRadius: 10,
  },
  mediumLabel: {
    ...THEME.typography.BODY.SMALL,
    fontSize: 12,
  },
  // Large size
  largeContainer: {
    gap: THEME.spacing.MD,
  },
  largeToggle: {
    borderRadius: 16,
  },
  largeThumb: {
    borderRadius: 14,
  },
  largeLabel: {
    ...THEME.typography.BODY.MEDIUM,
    fontSize: 14,
  },
});

export default AvailabilityToggle; 