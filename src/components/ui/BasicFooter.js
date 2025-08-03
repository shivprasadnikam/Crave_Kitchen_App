import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BasicFooter = ({ 
  onPressLink,
  style 
}) => {
  const handleLinkPress = (url) => {
    if (onPressLink) {
      onPressLink(url);
    }
    console.log('Footer link pressed:', url);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>Crave Kitchen</Text>
        <Text style={styles.subtitle}>Restaurant Management Made Simple</Text>
        
        <View style={styles.links}>
          <TouchableOpacity onPress={() => handleLinkPress('about')}>
            <Text style={styles.link}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('privacy')}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('terms')}>
            <Text style={styles.link}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.copyright}>
          © 2024 Crave Kitchen. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C4A6E',
    width: '100%',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0F2FE',
    marginBottom: 20,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  link: {
    fontSize: 14,
    color: '#BAE6FD',
    fontWeight: '500',
  },
  copyright: {
    fontSize: 12,
    color: '#7DD3FC',
    textAlign: 'center',
  },
});

export default BasicFooter; 