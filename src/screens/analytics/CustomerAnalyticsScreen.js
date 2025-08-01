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

const CustomerAnalyticsScreen = ({ navigation }) => {
  const customerStats = [
    {
      id: '1',
      metric: 'Total Customers',
      value: '1,245',
      growth: '+12%',
      trend: 'up',
    },
    {
      id: '2',
      metric: 'New Customers',
      value: '89',
      growth: '+8%',
      trend: 'up',
    },
    {
      id: '3',
      metric: 'Repeat Customers',
      value: '756',
      growth: '+15%',
      trend: 'up',
    },
    {
      id: '4',
      metric: 'Avg Order Value',
      value: '$28.50',
      growth: '+5%',
      trend: 'up',
    },
  ];

  const topCustomers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      orders: 15,
      totalSpent: '$425.50',
      lastOrder: '2 days ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      orders: 12,
      totalSpent: '$380.25',
      lastOrder: '1 week ago',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      orders: 10,
      totalSpent: '$320.75',
      lastOrder: '3 days ago',
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      orders: 8,
      totalSpent: '$245.00',
      lastOrder: '5 days ago',
    },
  ];

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#FF4444';
  };

  const renderCustomerStat = ({ item }) => (
    <View style={styles.statCard}>
      <Text style={styles.statMetric}>{item.metric}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={[styles.statGrowth, { color: getTrendColor(item.trend) }]}>
        {item.growth}
      </Text>
    </View>
  );

  const renderTopCustomer = ({ item, index }) => (
    <View style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerEmail}>{item.email}</Text>
        </View>
      </View>
      
      <View style={styles.customerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{item.orders}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Spent</Text>
          <Text style={styles.statValue}>{item.totalSpent}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Last Order</Text>
          <Text style={styles.statValue}>{item.lastOrder}</Text>
        </View>
      </View>
      
      <View style={styles.customerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Customer Analytics</Text>
          <Text style={styles.headerSubtitle}>Understand your customer base</Text>
        </View>

        {/* Customer Statistics */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Customer Overview</Text>
          <View style={styles.statsGrid}>
            {customerStats.map(renderCustomerStat)}
          </View>
        </View>

        {/* Top Customers */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Top Customers</Text>
          <FlatList
            data={topCustomers}
            renderItem={renderTopCustomer}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.customersList}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
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
  statMetric: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statGrowth: {
    fontSize: 12,
    fontWeight: '600',
  },
  customersList: {
    gap: 12,
  },
  customerCard: {
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
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 12,
    color: '#666666',
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  customerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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

export default CustomerAnalyticsScreen;
