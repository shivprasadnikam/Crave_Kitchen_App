import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../../styles/theme';

const EmptyState = ({
  icon = 'inbox',
  title = 'No Data Found',
  message = 'There are no items to display at the moment.',
  actionText,
  onAction,
  containerStyle,
  iconSize = 64,
  iconColor = THEME.colors.TEXT.TERTIARY,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon 
        name={icon} 
        size={iconSize} 
        color={iconColor} 
        style={styles.icon}
      />
      
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.message}>{message}</Text>
      
      {actionText && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.XL,
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
  },
  icon: {
    marginBottom: THEME.spacing.LG,
  },
  title: {
    ...THEME.typography.HEADING.H4,
    color: THEME.colors.TEXT.PRIMARY,
    textAlign: 'center',
    marginBottom: THEME.spacing.MD,
  },
  message: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: THEME.spacing.XL,
    lineHeight: 24,
    maxWidth: 280,
  },
  actionButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
    paddingVertical: THEME.spacing.MD,
    paddingHorizontal: THEME.spacing.LG,
    borderRadius: THEME.borderRadius.MD,
    ...THEME.shadows.SM,
  },
  actionButtonText: {
    ...THEME.typography.BUTTON.MEDIUM,
    color: THEME.colors.PRIMARY.CONTRAST,
    textAlign: 'center',
  },
});

export default EmptyState; 