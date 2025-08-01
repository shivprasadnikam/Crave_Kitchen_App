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

const CompletedOrdersScreen = ({ navigation }) => {
  const completedOrders = [
    {
      id: '1',
      orderNumber: '#ORD-004',
      customerName: 'Sarah Wilson',
      items: '1x Caesar Salad, 1x Water',
      total: '$12.99',
      completedTime: '2 hours ago',
    },
    {
      id: '2',
      orderNumber: '#ORD-005',
      customerName: 'David Brown',
      items: '2x Pizza Margherita, 2x Coke',
      total: '$29.98',
      completedTime: '3 hours ago',
    },
    {
      id: '3',
      orderNumber: '#ORD-006',
      customerName: 'Lisa Garcia',
      items: '1x Pasta Carbonara, 1x Wine',
      total: '$19.99',
      completedTime: '5 hours ago',
    },
  ];

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.completedTime}>{item.completedTime}</Text>
      </View>
      
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.orderItems}>{item.items}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>{item.total}</Text>
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>Completed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Completed Orders</Text>
          <Text style={styles.headerSubtitle}>Successfully delivered orders</Text>
        </View>

        {/* Orders List */}
        <View style={styles.content}>
          <FlatList
            data={completedOrders}
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
  completedTime: {
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
  completedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CompletedOrdersScreen;
