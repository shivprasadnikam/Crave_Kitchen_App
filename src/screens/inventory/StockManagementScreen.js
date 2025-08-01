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

const StockManagementScreen = ({ navigation }) => {
  const stockItems = [
    {
      id: '1',
      name: 'Tomatoes',
      quantity: 50,
      unit: 'kg',
      minStock: 10,
      status: 'In Stock',
    },
    {
      id: '2',
      name: 'Cheese',
      quantity: 25,
      unit: 'kg',
      minStock: 15,
      status: 'Low Stock',
    },
    {
      id: '3',
      name: 'Flour',
      quantity: 100,
      unit: 'kg',
      minStock: 20,
      status: 'In Stock',
    },
    {
      id: '4',
      name: 'Olive Oil',
      quantity: 8,
      unit: 'L',
      minStock: 10,
      status: 'Low Stock',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return '#4CAF50';
      case 'Low Stock':
        return '#FFA500';
      case 'Out of Stock':
        return '#FF4444';
      default:
        return '#666666';
    }
  };

  const renderStockItem = ({ item }) => (
    <View style={styles.stockCard}>
      <View style={styles.stockHeader}>
        <Text style={styles.stockName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.stockInfo}>
        <Text style={styles.stockQuantity}>
          {item.quantity} {item.unit}
        </Text>
        <Text style={styles.stockMin}>Min: {item.minStock} {item.unit}</Text>
      </View>
      
      <View style={styles.stockActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stock Management</Text>
          <Text style={styles.headerSubtitle}>Manage your inventory levels</Text>
        </View>

        {/* Stock Items */}
        <View style={styles.content}>
          <FlatList
            data={stockItems}
            renderItem={renderStockItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.stockList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('LowStock')}
          >
            <Text style={styles.quickActionText}>View Low Stock</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('IngredientTracking')}
          >
            <Text style={styles.quickActionText}>Track Ingredients</Text>
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
    gap: 12,
  },
  stockCard: {
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
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stockInfo: {
    marginBottom: 12,
  },
  stockQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  stockMin: {
    fontSize: 14,
    color: '#666666',
  },
  stockActions: {
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
    fontSize: 14,
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

export default StockManagementScreen;
