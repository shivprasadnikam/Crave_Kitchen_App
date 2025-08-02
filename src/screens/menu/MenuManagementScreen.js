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
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';

const MenuManagementScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorProfileId || user?.id || 1; // Fallback to 1 for testing
      console.log(`[MENU MANAGEMENT] Loading menu data for vendor: ${vendorId}`);
      
      const data = await menuService.getMenuManagementData(vendorId);
      
      setMenuItems(data.menuItems || []);
      setCategories(data.categories || []);
      console.log(`[MENU MANAGEMENT] Loaded ${data.menuItems?.length || 0} items and ${data.categories?.length || 0} categories`);
    } catch (error) {
      console.error('[MENU MANAGEMENT] Error loading menu data:', error);
      setError('Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    console.log('[MENU MANAGEMENT] Pull-to-refresh triggered');
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggleAvailability = async (itemId, isAvailable) => {
    console.log(`[MENU MANAGEMENT] Toggling availability for item ${itemId} to: ${isAvailable}`);
    try {
      await menuService.toggleItemAvailability(itemId, isAvailable);
      console.log(`[MENU MANAGEMENT] Availability toggled successfully for item ${itemId}`);
      // Refresh the data to show updated status
      await loadData();
    } catch (error) {
      console.error('[MENU MANAGEMENT] Error toggling availability:', error);
      Alert.alert('Error', 'Failed to update item availability');
    }
  };

  const handleEditItem = (item) => {
    console.log(`[MENU MANAGEMENT] Edit item pressed for: ${item.name} (ID: ${item.id})`);
    navigation.navigate('EditMenuItem', { itemId: item.id });
  };

  const handleDeleteItem = (item) => {
    console.log(`[MENU MANAGEMENT] Delete item pressed for: ${item.name} (ID: ${item.id})`);
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => performDeleteItem(item.id),
        },
      ]
    );
  };

  const performDeleteItem = async (itemId) => {
    console.log(`[MENU MANAGEMENT] Performing delete for item: ${itemId}`);
    try {
      await menuService.deleteItem(itemId);
      console.log(`[MENU MANAGEMENT] Item ${itemId} deleted successfully`);
      // Refresh the data
      await loadData();
    } catch (error) {
      console.error('[MENU MANAGEMENT] Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuCard}
      onPress={() => navigation.navigate('EditMenuItem', { itemId: item.id })}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuName}>{item.name}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: item.isAvailable ? '#4CAF50' : '#FF4444' }]}>
            <Text style={styles.statusText}>{item.isAvailable ? 'Available' : 'Unavailable'}</Text>
          </View>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleToggleAvailability(item.id, item.isAvailable)}
          >
            <Text style={styles.toggleButtonText}>
              {item.isAvailable ? 'Disable' : 'Enable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.menuPrice}>${item.price}</Text>
      <Text style={styles.menuCategory}>{item.categoryName || 'Uncategorized'}</Text>
      {item.description && (
        <Text style={styles.menuDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      {item.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading menu items...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Menu Management</Text>
              <Text style={styles.headerSubtitle}>
                {menuItems.length} items • {categories.length} categories
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMenuItem')}
              >
                <Text style={styles.addButtonText}>Add New Item</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.categoryButton}
                onPress={() => navigation.navigate('CategoryManagement')}
              >
                <Text style={styles.categoryButtonText}>Manage Categories</Text>
              </TouchableOpacity>
            </View>

            {/* Section Title */}
            <View style={styles.menuContainer}>
              <Text style={styles.sectionTitle}>Menu Items</Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No menu items found</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first menu item to get started
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('MenuPreview')}
            >
              <Text style={styles.actionButtonText}>Preview Menu</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  menuList: {
    gap: 12,
  },
  menuCard: {
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
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  toggleButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
  },
  toggleButtonText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  menuCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 10,
    color: '#333333',
    fontWeight: '600',
  },
  quickActions: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
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

export default MenuManagementScreen;
