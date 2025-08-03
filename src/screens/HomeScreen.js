import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Footer } from '../components/ui';
import { colors, typography, spacing, commonStyles } from '../theme/theme';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('VendorDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary[600], colors.primary[500]]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Crave Kitchen</Text>
          <Text style={styles.headerSubtitle}>
            Restaurant Management Made Simple
          </Text>
        </LinearGradient>

        {/* Hero Section */}
        <Card variant="elevated" style={styles.heroCard}>
          <Text style={styles.heroTitle}>Welcome to Crave Kitchen</Text>
          <Text style={styles.heroSubtitle}>
            Manage your restaurant operations with ease. From menu management to order processing, 
            we've got everything you need to run your business efficiently.
          </Text>
        </Card>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          
          <Card variant="default" style={styles.featureCard}>
            <View style={styles.featureContent}>
              <Text style={styles.featureIcon}>🍽️</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Menu Management</Text>
                <Text style={styles.featureDescription}>
                  Create, edit, and organize your menu items with ease
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="default" style={styles.featureCard}>
            <View style={styles.featureContent}>
              <Text style={styles.featureIcon}>📋</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Order Processing</Text>
                <Text style={styles.featureDescription}>
                  Handle incoming orders and track their status in real-time
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="default" style={styles.featureCard}>
            <View style={styles.featureContent}>
              <Text style={styles.featureIcon}>📊</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Analytics</Text>
                <Text style={styles.featureDescription}>
                  Get insights into your business performance and trends
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="default" style={styles.featureCard}>
            <View style={styles.featureContent}>
              <Text style={styles.featureIcon}>📦</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Inventory Management</Text>
                <Text style={styles.featureDescription}>
                  Track stock levels and manage your ingredients efficiently
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            style={styles.ctaButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  scrollView: {
    flex: 1,
  },
  header: {
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  heroCard: {
    margin: 20,
    marginTop: -16,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#525252',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 16,
  },
  featureCard: {
    marginBottom: 12,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
    marginTop: 4,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#525252',
    lineHeight: 21,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    marginBottom: 20,
  },
  ctaButton: {
    width: '100%',
  },
});

export default HomeScreen; 