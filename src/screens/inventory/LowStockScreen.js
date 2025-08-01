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

const LowStockScreen = ({ navigation }) => {
  const lowStockItems = [
    {
      id: '1',
      name: 'Cheese',
      quantity: 5,
      unit: 'kg',
      minStock: 15,
      supplier: 'Dairy Co.',
      phone: '+1 (555) 123-4567',
    },
    {
      id: '2',
      name: 'Olive Oil',
      quantity: 2,
      unit: 'L',
      minStock: 10,
      supplier: 'Oil Suppliers',
      phone: '+1 (555) 234-5678',
    },
    {
      id: '3',
      name: 'Fresh Basil',
      quantity: 0.5,
      unit: 'kg',
      minStock: 2,
      supplier: 'Fresh Herbs Inc.',
      phone: '+1 (555) 345-6789',
    },
    {
      id: '4',
      name: 'Mozzarella',
      quantity: 3,
      unit: 'kg',
      minStock: 12,
      supplier: 'Cheese World',
      phone: '+1 (555) 456-7890',
    },
  ];

  const renderLowStockItem = ({ item }) => (
    <View style={styles.stockCard}>
      <View style={styles.stockHeader}>
        <Text style={styles.stockName}>{item.name}</Text>
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentText}>URGENT</Text>
        </View>
      </View>
      
      <View style={styles.stockInfo}>
        <Text style={styles.stockQuantity}>
          Current: {item.quantity} {item.unit}
        </Text>
        <Text style={styles.stockMin}>Min Required: {item.minStock} {item.unit}</Text>
      </View>
      
      <View style={styles.supplierInfo}>
        <Text style={styles.supplierLabel}>Supplier:</Text>
        <Text style={styles.supplierName}>{item.supplier}</Text>
        <Text style={styles.supplierPhone}>{item.phone}</Text>
      </View>
      
      <View style={styles.stockActions}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Call Supplier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Low Stock Alert</Text>
          <Text style={styles.headerSubtitle}>Items that need immediate attention</Text>
        </View>

        {/* Low Stock Items */}
        <View style={styles.content}>
          <FlatList
            data={lowStockItems}
            renderItem={renderLowStockItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.stockList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('StockManagement')}
          >
            <Text style={styles.quickActionText}>View All Stock</Text>
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
  stockList: {
    gap: 16,
  },
  stockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  urgentBadge: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgentText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stockInfo: {
    marginBottom: 12,
  },
  stockQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 4,
  },
  stockMin: {
    fontSize: 14,
    color: '#666666',
  },
  supplierInfo: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  supplierLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  supplierPhone: {
    fontSize: 14,
    color: '#666666',
  },
  stockActions: {
    flexDirection: 'row',
    gap: 8,
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    padding: 20,
  },
  quickActionButton: {
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

export default LowStockScreen;
