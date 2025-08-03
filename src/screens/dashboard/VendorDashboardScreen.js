import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const VendorDashboardScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: 40 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>Here's your overview for today</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    paddingVertical: 32,
    paddingHorizontal: 0,
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#757575',
  },
  statsSection: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
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
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
});

export default VendorDashboardScreen; 