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

const RevenueAnalyticsScreen = ({ navigation }) => {
  const revenueData = [
    {
      id: '1',
      period: 'Today',
      revenue: '$245.75',
      orders: 8,
      growth: '+12%',
      trend: 'up',
    },
    {
      id: '2',
      period: 'This Week',
      revenue: '$1,180.50',
      orders: 42,
      growth: '+8%',
      trend: 'up',
    },
    {
      id: '3',
      period: 'This Month',
      revenue: '$4,250.00',
      orders: 156,
      growth: '+15%',
      trend: 'up',
    },
    {
      id: '4',
      period: 'Last Month',
      revenue: '$3,680.25',
      orders: 142,
      growth: '-3%',
      trend: 'down',
    },
  ];

  const topItems = [
    {
      id: '1',
      name: 'Pizza Margherita',
      revenue: '$450.00',
      orders: 18,
      percentage: '18%',
    },
    {
      id: '2',
      name: 'Chicken Burger',
      revenue: '$380.50',
      orders: 15,
      percentage: '15%',
    },
    {
      id: '3',
      name: 'Pasta Carbonara',
      revenue: '$320.75',
      orders: 12,
      percentage: '13%',
    },
    {
      id: '4',
      name: 'Caesar Salad',
      revenue: '$280.25',
      orders: 10,
      percentage: '11%',
    },
  ];

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#FF4444';
  };

  const renderRevenueCard = ({ item }) => (
    <View style={styles.revenueCard}>
      <View style={styles.revenueHeader}>
        <Text style={styles.revenuePeriod}>{item.period}</Text>
        <Text style={[styles.revenueGrowth, { color: getTrendColor(item.trend) }]}>
          {item.growth}
        </Text>
      </View>
      
      <Text style={styles.revenueAmount}>{item.revenue}</Text>
      <Text style={styles.revenueOrders}>{item.orders} orders</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Revenue Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your revenue performance</Text>
        </View>

        {/* Revenue Overview */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <FlatList
            data={revenueData}
            renderItem={renderRevenueCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.revenueList}
          />
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
});

export default RevenueAnalyticsScreen;
