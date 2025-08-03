import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ 
  children, 
  style, 
  edges = ['top'], 
  bottomPadding = 0,
  ...props 
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView 
      style={[styles.container, style]} 
      edges={edges}
      {...props}
    >
      <View style={[
        styles.content, 
        { paddingBottom: bottomPadding + insets.bottom }
      ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
});

export default SafeAreaWrapper; 