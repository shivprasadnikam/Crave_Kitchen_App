import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

const OrderAnalyticsScreen = ({ navigation }) => {
  const orderStats = [
    {
      id: '1',
      period: 'Today',
      orders: 8,
      revenue: '₹245.75',
      avgOrder: '₹30.72',
      growth: '+12%',
      trend: 'up',
    },
    {
      id: '2',
      period: 'This Week',
      orders: 42,
      revenue: '₹1,180.50',
      avgOrder: '₹28.11',
      growth: '+8%',
      trend: 'up',
    },
    {
      id: '3',
      period: 'This Month',
      orders: 156,
      revenue: '₹4,250.00',
      avgOrder: '₹27.24',
      growth: '+15%',
      trend: 'up',
    },
    {
      id: '4',
      period: 'Last Month',
      orders: 142,
      revenue: '₹3,680.25',
      avgOrder: '₹25.92',
      growth: '-3%',
      trend: 'down',
    },
  ];

  const orderStatus = [
    {
      id: '1',
      status: 'Completed',
      count: 120,
      percentage: '77%',
      color: '#4CAF50',
    },
    {
      id: '2',
      status: 'Pending',
      count: 25,
      percentage: '16%',
      color: '#FFA500',
    },
    {
      id: '3',
      status: 'Cancelled',
      count: 11,
      percentage: '7%',
      color: '#FF4444',
    },
  ];

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#FF4444';
  };

  const renderOrderStat = ({ item }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statPeriod}>{item.period}</Text>
        <Text style={[styles.statGrowth, { color: getTrendColor(item.trend) }]}>
          {item.growth}
        </Text>
      </View>
      
      <Text style={styles.statOrders}>{item.orders} orders</Text>
      <Text style={styles.statRevenue}>{item.revenue}</Text>
      <Text style={styles.statAvgOrder}>Avg: {item.avgOrder}</Text>
    </View>
  );

  const renderStatusItem = ({ item }) => (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <View style={[styles.statusDot, { backgroundColor: item.color }]} />
        <Text style={styles.statusName}>{item.status}</Text>
        <Text style={styles.statusPercentage}>{item.percentage}</Text>
      </View>
      
      <Text style={styles.statusCount}>{item.count} orders</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your order performance</Text>
        </View>

        {/* Order Statistics */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Order Statistics</Text>
          <FlatList
            data={orderStats}
            renderItem={renderOrderStat}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsList}
          />
        </View>

        {/* Order Status Breakdown */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Order Status Breakdown</Text>
          <FlatList
            data={orderStatus}
            renderItem={renderStatusItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.statusList}
          />
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
            onPress={() => navigation.navigate('OrderList')}
          >
            <Text style={styles.quickActionText}>View Orders</Text>
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
  statsList: {
    gap: 12,
  },
  statCard: {
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
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statPeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  statGrowth: {
    fontSize: 12,
    fontWeight: '600',
  },
  statOrders: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statAvgOrder: {
    fontSize: 12,
    color: '#666666',
  },
  statusList: {
    gap: 12,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  statusPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  statusCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
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
});

export default OrderAnalyticsScreen;
