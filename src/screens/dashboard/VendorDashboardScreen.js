import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';
import { orderService } from '../../services/orderService';
import { analyticsService } from '../../services/analyticsService';

const VendorDashboardScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const [dashboardStats, setDashboardStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorId || user?.id || 1;
      console.log(`[DASHBOARD] Loading dashboard data for vendor: ${vendorId}`);
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      // Load data from multiple services
      const [menuData, orderData, analyticsData] = await Promise.allSettled([
        menuService.getMenuManagementData(vendorId),
        orderService.getPendingOrders(vendorId),
        analyticsService.getAnalyticsData(vendorId, 'today')
      ]);

      // Process menu data
      let activeItems = 0;
      let totalItems = 0;
      if (menuData.status === 'fulfilled') {
        const items = menuData.value.menuItems || [];
        activeItems = items.filter(item => item.isAvailable).length;
        totalItems = items.length;
      }

      // Process order data
      let todayOrders = 0;
      if (orderData.status === 'fulfilled') {
        todayOrders = orderData.value.data?.content?.length || 0;
      }

      // Process analytics data
      let todayRevenue = 0;
      let revenueChange = '+0%';
      if (analyticsData.status === 'fulfilled') {
        todayRevenue = analyticsData.value.revenueOverview?.totalRevenue || 0;
        revenueChange = analyticsData.value.revenueOverview?.revenueGrowth || '+0%';
      }

      // Create dashboard stats with real data
      const stats = [
        {
          id: '1',
          title: 'Today\'s Orders',
          value: todayOrders.toString(),
          change: '+0',
          icon: '📋',
          color: '#4CAF50',
        },
        {
          id: '2',
          title: 'Revenue',
          value: `₹${todayRevenue.toFixed(2)}`,
          change: revenueChange,
          icon: '💰',
          color: '#FF6B35',
        },
        {
          id: '3',
          title: 'Active Items',
          value: activeItems.toString(),
          change: `+${totalItems - activeItems}`,
          icon: '🍽️',
          color: '#2196F3',
        },
        {
          id: '4',
          title: 'Total Items',
          value: totalItems.toString(),
          change: '+0',
          icon: '📦',
          color: '#FF9800',
        },
      ];

      setDashboardStats(stats);
      
      console.log(`[DASHBOARD] Dashboard data loaded:`, {
        todayOrders,
        todayRevenue,
        activeItems,
        totalItems
      });
    } catch (error) {
      console.error('[DASHBOARD] Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
      
      // Set fallback data
      setDashboardStats([
        {
          id: '1',
          title: 'Today\'s Orders',
          value: '0',
          change: '+0',
          icon: '📋',
          color: '#4CAF50',
        },
        {
          id: '2',
          title: 'Revenue',
          value: '₹0.00',
          change: '+0%',
          icon: '💰',
          color: '#FF6B35',
        },
        {
          id: '3',
          title: 'Active Items',
          value: '0',
          change: '+0',
          icon: '🍽️',
          color: '#2196F3',
        },
        {
          id: '4',
          title: 'Total Items',
          value: '0',
          change: '+0',
          icon: '📦',
          color: '#FF9800',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    console.log('[DASHBOARD] Pull-to-refresh triggered');
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

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

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadDashboardData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: 40 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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