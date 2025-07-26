import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

const LoadingSpinner = ({ 
  size = 'large', 
  color = THEME.colors.PRIMARY.MAIN,
  text = 'Loading...',
  showText = true,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
      {showText && text && (
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.LG,
  },
  text: {
    marginTop: THEME.spacing.MD,
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
  },
});

export default LoadingSpinner; 