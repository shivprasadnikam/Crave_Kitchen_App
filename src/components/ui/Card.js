import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../../theme/theme';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    style,
  ];

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  
  // Variants
  default: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  flat: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  outlined: {
    borderWidth: 2,
    borderColor: '#D4D4D4',
  },
  
  // Padding variants
  paddingSmall: {
    padding: 12,
  },
  paddingMedium: {
    padding: 20,
  },
  paddingLarge: {
    padding: 24,
  },
  paddingXLarge: {
    padding: 32,
  },
});

export default Card; 