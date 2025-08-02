import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('VendorDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crave Kitchen</Text>
          <Text style={styles.headerSubtitle}>
            Restaurant Management Made Simple
          </Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to Crave Kitchen</Text>
          <Text style={styles.heroSubtitle}>
            Manage your restaurant operations with ease. From menu management to order processing, 
            we've got everything you need to run your business efficiently.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🍽️</Text>
            <Text style={styles.featureTitle}>Menu Management</Text>
            <Text style={styles.featureDescription}>
              Create, edit, and organize your menu items with ease
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📋</Text>
            <Text style={styles.featureTitle}>Order Processing</Text>
            <Text style={styles.featureDescription}>
              Handle incoming orders and track their status in real-time
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureTitle}>Analytics</Text>
            <Text style={styles.featureDescription}>
              Get insights into your business performance and trends
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📦</Text>
            <Text style={styles.featureTitle}>Inventory Management</Text>
            <Text style={styles.featureDescription}>
              Track stock levels and manage your ingredients efficiently
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF6B35',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#555',
  },
  ctaSection: {
    padding: 20,
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 