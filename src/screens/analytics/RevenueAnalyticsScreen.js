import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../services/analyticsService';

const RevenueAnalyticsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorId || user?.id || 1;
      console.log(`[REVENUE ANALYTICS] Loading analytics for vendor: ${vendorId}`);
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      const data = await analyticsService.getAnalyticsData(vendorId, 'month');
      setAnalyticsData(data);
      
      console.log(`[REVENUE ANALYTICS] Loaded analytics data:`, {
        revenueOverview: !!data.revenueOverview,
        topItemsCount: data.topPerformingItems?.length || 0
      });
    } catch (error) {
      console.error('[REVENUE ANALYTICS] Error loading analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    console.log('[REVENUE ANALYTICS] Pull-to-refresh triggered');
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  // Fallback data if API fails
  const revenueData = analyticsData?.revenueOverview || [
    { period: 'Today', revenue: 0, orders: 0 },
    { period: 'This Week', revenue: 0, orders: 0 },
    { period: 'This Month', revenue: 0, orders: 0 },
    { period: 'This Year', revenue: 0, orders: 0 },
  ];

  const topItems = analyticsData?.topPerformingItems || [];

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#FF4444';
  };

  const renderRevenueCard = (data, index) => (
    <View key={index} style={styles.revenueCard}>
      <Text style={styles.periodText}>{data.period}</Text>
              <Text style={styles.revenueValue}>₹{data.revenue.toLocaleString()}</Text>
      <Text style={styles.ordersText}>{data.orders} orders</Text>
    </View>
  );

  const renderTopItem = ({ item }) => (
    <View style={styles.topItemCard}>
      <View style={styles.topItemHeader}>
        <Text style={styles.topItemName}>{item.name}</Text>
        <Text style={styles.topItemPercentage}>{item.percentage}</Text>
      </View>
      
      <View style={styles.topItemInfo}>
        <Text style={styles.topItemRevenue}>{item.revenue}</Text>
        <Text style={styles.topItemOrders}>{item.orders} orders</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadAnalytics}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Revenue Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your sales performance</Text>
        </View>

        {/* Revenue Overview */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <View style={styles.revenueGrid}>
            {revenueData.map(renderRevenueCard)}
          </View>
        </View>

        {/* Top Performing Items */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Top Performing Items</Text>
          <FlatList
            data={topItems}
            renderItem={renderTopItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.topItemsList}
          />
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>₹54.44</Text>
              <Text style={styles.metricLabel}>Average Order Value</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>15.2%</Text>
              <Text style={styles.metricLabel}>Growth Rate</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>$2,450</Text>
              <Text style={styles.metricLabel}>Daily Average</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>89%</Text>
              <Text style={styles.metricLabel}>Customer Retention</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AnalyticsDashboard')}
          >
            <Text style={styles.quickActionText}>Back to Analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('FinancialReports')}
          >
            <Text style={styles.quickActionText}>View Reports</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  revenueList: {
    gap: 12,
  },
  revenueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revenuePeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  revenueGrowth: {
    fontSize: 12,
    fontWeight: '600',
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  revenueOrders: {
    fontSize: 12,
    color: '#666666',
  },
  topItemsList: {
    gap: 12,
  },
  topItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  topItemPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  topItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topItemRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  topItemOrders: {
    fontSize: 14,
    color: '#666666',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  metricsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 15,
  },
  metricCard: {
    alignItems: 'center',
    width: '45%',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  revenueGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  ordersText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default RevenueAnalyticsScreen;
