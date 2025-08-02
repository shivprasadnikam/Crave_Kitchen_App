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

const VendorDashboardScreen = () => {
  const navigation = useNavigation();

  const dashboardStats = [
    {
      id: '1',
      title: 'Today\'s Orders',
      value: '12',
      change: '+3',
      icon: '📋',
      color: '#4CAF50',
    },
    {
      id: '2',
      title: 'Revenue',
      value: '$1,234',
      change: '+15%',
      icon: '💰',
      color: '#FF6B35',
    },
    {
      id: '3',
      title: 'Active Items',
      value: '45',
      change: '+2',
      icon: '🍽️',
      color: '#2196F3',
    },
    {
      id: '4',
      title: 'Low Stock',
      value: '3',
      change: '-1',
      icon: '⚠️',
      color: '#FF9800',
    },
  ];

  const quickActions = [
    {
      id: '1',
      title: 'Add Menu Item',
      icon: '➕',
      screen: 'AddMenuItem',
    },
    {
      id: '2',
      title: 'View Orders',
      icon: '📋',
      screen: 'OrderList',
    },
    {
      id: '3',
      title: 'Analytics',
      icon: '📊',
      screen: 'AnalyticsDashboard',
    },
    {
      id: '4',
      title: 'Inventory',
      icon: '📦',
      screen: 'Inventory',
    },
  ];

  const renderStatCard = (stat) => (
    <View key={stat.id} style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{stat.icon}</Text>
        <Text style={[styles.statChange, { color: stat.color }]}>
          {stat.change}
        </Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
    </View>
  );

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.quickActionCard}
      onPress={() => navigation.navigate(action.screen)}
    >
      <Text style={styles.quickActionIcon}>{action.icon}</Text>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back! Here's your overview</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            {dashboardStats.map(renderStatCard)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrderList')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>#ORD-001</Text>
              <Text style={styles.orderStatus}>Preparing</Text>
            </View>
            <Text style={styles.orderItems}>Pizza Margherita, Coke</Text>
            <Text style={styles.orderTime}>2 minutes ago</Text>
          </View>
          
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>#ORD-002</Text>
              <Text style={styles.orderStatus}>Ready</Text>
            </View>
            <Text style={styles.orderItems}>Chicken Burger, Fries</Text>
            <Text style={styles.orderTime}>15 minutes ago</Text>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575',
  },
  statsSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    width: '47%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  statChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  quickActionsSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    textAlign: 'center',
  },
  recentOrdersSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  orderCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  orderStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  orderItems: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  orderTime: {
    fontSize: 12,
    color: '#757575',
  },
});

export default VendorDashboardScreen; 