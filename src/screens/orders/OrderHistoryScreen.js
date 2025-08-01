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

const OrderHistoryScreen = ({ navigation }) => {
  const orderHistory = [
    {
      id: '1',
      orderNumber: '#ORD-001',
      customerName: 'John Doe',
      items: '2x Pizza Margherita, 1x Coke',
      total: '$24.99',
      date: '2024-01-15',
      status: 'Completed',
    },
    {
      id: '2',
      orderNumber: '#ORD-002',
      customerName: 'Jane Smith',
      items: '1x Chicken Burger, 1x Fries',
      total: '$18.50',
      date: '2024-01-14',
      status: 'Completed',
    },
    {
      id: '3',
      orderNumber: '#ORD-003',
      customerName: 'Mike Johnson',
      items: '3x Pasta Carbonara',
      total: '$32.97',
      date: '2024-01-13',
      status: 'Completed',
    },
    {
      id: '4',
      orderNumber: '#ORD-004',
      customerName: 'Sarah Wilson',
      items: '1x Caesar Salad, 1x Water',
      total: '$12.99',
      date: '2024-01-12',
      status: 'Completed',
    },
  ];

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.orderItems}>{item.items}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>{item.total}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order History</Text>
          <Text style={styles.headerSubtitle}>Past orders and transactions</Text>
        </View>

        {/* Orders List */}
        <View style={styles.content}>
          <FlatList
            data={orderHistory}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
          />
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
  orderDate: {
    fontSize: 12,
    color: '#999999',
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
  statusBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OrderHistoryScreen;
