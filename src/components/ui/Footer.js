import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/theme';

const Footer = ({ 
  showSocialLinks = true, 
  showCompanyInfo = true,
  onPressLink,
  style 
}) => {
  const handleLinkPress = (url) => {
    if (onPressLink) {
      onPressLink(url);
    } else {
      Linking.openURL(url).catch(err => console.log('Error opening URL:', err));
    }
  };

  const footerLinks = [
    { title: 'About Us', url: 'https://cravekitchen.com/about' },
    { title: 'Privacy Policy', url: 'https://cravekitchen.com/privacy' },
    { title: 'Terms of Service', url: 'https://cravekitchen.com/terms' },
    { title: 'Contact Support', url: 'https://cravekitchen.com/support' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/cravekitchen' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/cravekitchen' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/cravekitchen' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/cravekitchen' },
  ];

  return (
    <LinearGradient
      colors={['#075985', '#0C4A6E']}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        {/* Main Footer Content */}
        <View style={styles.mainSection}>
          {/* Company Info */}
          {showCompanyInfo && (
            <View style={styles.companySection}>
              <Text style={styles.companyName}>Crave Kitchen</Text>
              <Text style={styles.companyTagline}>
                Restaurant Management Made Simple
              </Text>
              <Text style={styles.companyDescription}>
                Empowering restaurants with modern tools to streamline operations, 
                enhance customer experience, and grow their business.
              </Text>
            </View>
          )}

          {/* Quick Links */}
          <View style={styles.linksSection}>
            <Text style={styles.sectionTitle}>Quick Links</Text>
            {footerLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkItem}
                onPress={() => handleLinkPress(link.url)}
              >
                <Text style={styles.linkText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Social Links */}
        {showSocialLinks && (
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialButton}
                  onPress={() => handleLinkPress(social.url)}
                >
                  <Text style={styles.socialIcon}>{social.icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.copyright}>
            © 2024 Crave Kitchen. All rights reserved.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  companySection: {
    flex: 1,
    marginRight: 40,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  companyTagline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E0F2FE',
    marginBottom: 12,
  },
  companyDescription: {
    fontSize: 14,
    color: '#BAE6FD',
    lineHeight: 20,
  },
  linksSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  linkItem: {
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#BAE6FD',
    fontWeight: '400',
  },
  socialSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 24,
    marginBottom: 24,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialIcon: {
    fontSize: 20,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: '#7DD3FC',
  },
  version: {
    fontSize: 12,
    color: '#7DD3FC',
  },
});

export default Footer; 