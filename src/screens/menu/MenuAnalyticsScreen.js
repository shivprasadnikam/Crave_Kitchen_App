import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';

const MenuAnalyticsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [analytics, setAnalytics] = useState(null);
  const [popularItems, setPopularItems] = useState([]);
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
      
      const vendorId = user?.vendorProfileId || user?.id || 1;
      console.log(`[MENU ANALYTICS] Loading analytics for vendor: ${vendorId}`);
      
      // Load menu overview and featured items for analytics
      const data = await menuService.getMenuPreviewData(vendorId);
      
      // Mock analytics data (replace with real API calls)
      const mockAnalytics = {
        totalItems: data.overview?.totalItems || 0,
        availableItems: data.overview?.availableItems || 0,
        featuredItems: data.featuredItems?.length || 0,
        totalCategories: data.overview?.totalCategories || 0,
        averagePrice: data.overview?.averagePrice || 0,
        topPerformingItems: [
          { id: 1, name: 'Margherita Pizza', orders: 45, revenue: 675.00, rating: 4.8 },
          { id: 2, name: 'Chicken Wings', orders: 38, revenue: 456.00, rating: 4.6 },
          { id: 3, name: 'Caesar Salad', orders: 32, revenue: 256.00, rating: 4.7 },
        ],
        lowPerformingItems: [
          { id: 4, name: 'Mushroom Soup', orders: 3, revenue: 24.00, rating: 4.2 },
          { id: 5, name: 'Fish Tacos', orders: 5, revenue: 45.00, rating: 4.1 },
        ],
        categoryPerformance: [
          { name: 'Pizzas', items: 8, orders: 120, revenue: 1800.00 },
          { name: 'Appetizers', items: 12, orders: 85, revenue: 680.00 },
          { name: 'Salads', items: 6, orders: 45, revenue: 360.00 },
          { name: 'Desserts', items: 4, orders: 25, revenue: 200.00 },
        ]
      };
      
      setAnalytics(mockAnalytics);
      setPopularItems(data.featuredItems || []);
      
      console.log(`[MENU ANALYTICS] Loaded analytics data`);
    } catch (error) {
      console.error('[MENU ANALYTICS] Error loading analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    console.log('[MENU ANALYTICS] Pull-to-refresh triggered');
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const renderMetricCard = (title, value, subtitle, color = '#FF6B35') => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderTopItem = ({ item, index }) => (
    <View style={styles.topItemCard}>
      <View style={styles.topItemRank}>
        <Text style={styles.topItemRankText}>#{index + 1}</Text>
      </View>
      <View style={styles.topItemInfo}>
        <Text style={styles.topItemName}>{item.name}</Text>
        <Text style={styles.topItemStats}>
          {item.orders} orders • ${item.revenue.toFixed(2)} • ⭐ {item.rating}
        </Text>
      </View>
    </View>
  );

  const renderCategoryPerformance = ({ item }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryItems}>{item.items} items</Text>
      </View>
      <View style={styles.categoryStats}>
        <Text style={styles.categoryOrders}>{item.orders} orders</Text>
        <Text style={styles.categoryRevenue}>${item.revenue.toFixed(2)}</Text>
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
          <Text style={styles.headerTitle}>Menu Analytics</Text>
          <Text style={styles.headerSubtitle}>
            Performance insights and trends
          </Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Items', analytics?.totalItems || 0, 'Menu items')}
            {renderMetricCard('Available', analytics?.availableItems || 0, 'Currently active')}
            {renderMetricCard('Featured', analytics?.featuredItems || 0, 'Highlighted items')}
            {renderMetricCard('Categories', analytics?.totalCategories || 0, 'Menu categories')}
          </View>
        </View>

        {/* Top Performing Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Items</Text>
          <FlatList
            data={analytics?.topPerformingItems || []}
            renderItem={renderTopItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Category Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Performance</Text>
          <FlatList
            data={analytics?.categoryPerformance || []}
            renderItem={renderCategoryPerformance}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Low Performing Items */}
        {analytics?.lowPerformingItems?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items Needing Attention</Text>
            <FlatList
              data={analytics.lowPerformingItems}
              renderItem={renderTopItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MenuManagement')}
          >
            <Text style={styles.actionButtonText}>Manage Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MenuPreview')}
          >
            <Text style={styles.actionButtonText}>Preview Menu</Text>
          </TouchableOpacity>
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
    paddingVertical: 32,
    paddingHorizontal: 16,
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
  metricsSection: {
    padding: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
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
  metricTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#999999',
  },
  topItemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topItemRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topItemRankText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topItemInfo: {
    flex: 1,
  },
  topItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  topItemStats: {
    fontSize: 14,
    color: '#666666',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  categoryItems: {
    fontSize: 14,
    color: '#666666',
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryOrders: {
    fontSize: 14,
    color: '#666666',
  },
  categoryRevenue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  quickActions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MenuAnalyticsScreen; 