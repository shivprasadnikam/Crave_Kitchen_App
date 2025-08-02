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

const QuickActionsScreen = () => {
  const navigation = useNavigation();
  
  const quickActions = [
    {
      id: '1',
      title: 'Add Menu Item',
      description: 'Add a new dish to your menu',
      icon: '🍽️',
      screen: 'AddMenuItem',
    },
    {
      id: '2',
      title: 'View Orders',
      description: 'Check incoming and active orders',
      icon: '📋',
      screen: 'OrderList',
    },
    {
      id: '3',
      title: 'Analytics',
      description: 'View business performance',
      icon: '📊',
      screen: 'AnalyticsDashboard',
    },
    {
      id: '4',
      title: 'Inventory',
      description: 'Manage stock levels',
      icon: '📦',
      screen: 'Inventory',
    },
    {
      id: '5',
      title: 'Finances',
      description: 'Track revenue and payouts',
      icon: '💰',
      screen: 'Revenue',
    },
    {
      id: '6',
      title: 'Settings',
      description: 'Configure your restaurant',
      icon: '⚙️',
      screen: 'VendorProfile',
    },
  ];

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionCard}
      onPress={() => navigation.navigate(action.screen)}
    >
      <Text style={styles.actionIcon}>{action.icon}</Text>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDescription}>{action.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quick Actions</Text>
          <Text style={styles.headerSubtitle}>Access frequently used features</Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.content}>
          <View style={styles.actionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>New order received - #ORD-001</Text>
            <Text style={styles.activityTime}>2 minutes ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>Menu item updated - Pizza Margherita</Text>
            <Text style={styles.activityTime}>1 hour ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>Payment received - $24.99</Text>
            <Text style={styles.activityTime}>3 hours ago</Text>
          </View>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  recentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
});

export default QuickActionsScreen;
