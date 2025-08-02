import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InventoryScreen = () => {
  const navigation = useNavigation();
  
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now - replace with actual API call
      const mockInventory = [
        {
          id: '1',
          name: 'Chicken Breast',
          category: 'Meat',
          quantity: 25,
          unit: 'kg',
          minQuantity: 10,
          status: 'good',
        },
        {
          id: '2',
          name: 'Cheese',
          category: 'Dairy',
          quantity: 8,
          unit: 'kg',
          minQuantity: 15,
          status: 'low',
        },
        {
          id: '3',
          name: 'Tomatoes',
          category: 'Vegetables',
          quantity: 12,
          unit: 'kg',
          minQuantity: 5,
          status: 'good',
        },
        {
          id: '4',
          name: 'Flour',
          category: 'Baking',
          quantity: 3,
          unit: 'kg',
          minQuantity: 10,
          status: 'critical',
        },
      ];
      
      setInventory(mockInventory);
    } catch (error) {
      console.error('Error loading inventory:', error);
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInventory();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#4CAF50';
      case 'low':
        return '#FF9800';
      case 'critical':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'good':
        return 'Good';
      case 'low':
        return 'Low';
      case 'critical':
        return 'Critical';
      default:
        return status;
    }
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.inventoryCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={[styles.itemStatus, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
      
      <Text style={styles.itemCategory}>{item.category}</Text>
      
      <View style={styles.quantityInfo}>
        <Text style={styles.quantityText}>
          {item.quantity} {item.unit}
        </Text>
        <Text style={styles.minQuantityText}>
          Min: {item.minQuantity} {item.unit}
        </Text>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('StockManagement', { itemId: item.id })}
        >
          <Text style={styles.actionButtonText}>Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading inventory...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Text style={styles.headerSubtitle}>
          {inventory.length} items • {inventory.filter(item => item.status === 'critical').length} critical
        </Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadInventory}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={inventory}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.inventoryList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No inventory items found</Text>
              <Text style={styles.emptyStateSubtext}>
                Add items to your inventory to get started
              </Text>
            </View>
          )}
        />
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('LowStock')}
        >
          <Text style={styles.quickActionText}>Low Stock Alert</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('IngredientTracking')}
        >
          <Text style={styles.quickActionText}>Track Ingredients</Text>
        </TouchableOpacity>
      </View>
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
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
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
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  inventoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  quantityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  minQuantityText: {
    fontSize: 14,
    color: '#666666',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  errorText: {
    color: '#FF6B35',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inventoryList: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  quickActionButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventoryScreen;
