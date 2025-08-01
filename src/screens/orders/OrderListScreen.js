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

const OrderListScreen = ({ navigation }) => {
  // Sample order data
  const orders = [
    {
      id: '1',
      orderNumber: '#ORD-001',
      customerName: 'John Doe',
      items: '2x Pizza Margherita, 1x Coke',
      total: '$24.99',
      status: 'Pending',
      time: '2 minutes ago',
    },
    {
      id: '2',
      orderNumber: '#ORD-002',
      customerName: 'Jane Smith',
      items: '1x Chicken Burger, 1x Fries',
      total: '$18.50',
      status: 'Preparing',
      time: '15 minutes ago',
    },
    {
      id: '3',
      orderNumber: '#ORD-003',
      customerName: 'Mike Johnson',
      items: '3x Pasta Carbonara',
      total: '$32.97',
      status: 'Ready',
      time: '1 hour ago',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFA500';
      case 'Preparing':
        return '#4A90E2';
      case 'Ready':
        return '#4CAF50';
      case 'Completed':
        return '#666666';
      default:
        return '#FF6B35';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.orderItems}>{item.items}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>{item.total}</Text>
        <Text style={styles.orderTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Orders</Text>
          <Text style={styles.headerSubtitle}>Manage your restaurant orders</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
            <Text style={[styles.filterTabText, styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Preparing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Ready</Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('PendingOrders')}
          >
            <Text style={styles.actionButtonText}>View Pending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('CompletedOrders')}
          >
            <Text style={styles.actionButtonText}>View Completed</Text>
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
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  ordersContainer: {
    flex: 1,
    padding: 20,
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderTime: {
    fontSize: 12,
    color: '#999999',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderListScreen;
