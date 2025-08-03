import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';

const MenuManagementScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'unavailable'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [showFilters, setShowFilters] = useState(false);
  
  // Bulk operations state
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [menuItems, searchQuery, selectedCategory, availabilityFilter, sortBy, sortOrder]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorProfileId || user?.id;
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

  const applyFiltersAndSort = () => {
    let filtered = [...menuItems];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(item => item.categoryId === selectedCategory);
    }

    // Apply availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(item => item.isAvailable);
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(item => !item.isAvailable);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = parseFloat(a.price) - parseFloat(b.price);
          break;
        case 'date':
          comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setAvailabilityFilter('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const getFilterCount = () => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory) count++;
    if (availabilityFilter !== 'all') count++;
    return count;
  };

  // Bulk operations functions
  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedItems(new Set());
  };

  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const selectAllItems = () => {
    const allItemIds = filteredItems.map(item => item.id);
    setSelectedItems(new Set(allItemIds));
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  const handleBulkToggleAvailability = async (isAvailable) => {
    if (selectedItems.size === 0) return;

    const itemIds = Array.from(selectedItems);
    console.log(`[MENU MANAGEMENT] Bulk toggling availability for ${itemIds.length} items to: ${isAvailable}`);

    try {
      const promises = itemIds.map(itemId => 
        menuService.toggleItemAvailability(itemId, isAvailable)
      );
      await Promise.all(promises);
      
      console.log(`[MENU MANAGEMENT] Bulk availability toggle completed for ${itemIds.length} items`);
      await loadData();
      setSelectedItems(new Set());
      setSelectionMode(false);
      Alert.alert('Success', `${itemIds.length} items updated successfully`);
    } catch (error) {
      console.error('[MENU MANAGEMENT] Error in bulk availability toggle:', error);
      Alert.alert('Error', 'Failed to update some items');
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return;

    const itemIds = Array.from(selectedItems);
    const itemNames = filteredItems
      .filter(item => selectedItems.has(item.id))
      .map(item => item.name);

    Alert.alert(
      'Delete Items',
      `Are you sure you want to delete ${itemIds.length} items?\n\n${itemNames.slice(0, 3).join('\n')}${itemNames.length > 3 ? '\n...and more' : ''}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => performBulkDelete(itemIds),
        },
      ]
    );
  };

  const performBulkDelete = async (itemIds) => {
    console.log(`[MENU MANAGEMENT] Performing bulk delete for ${itemIds.length} items`);
    
    try {
      const promises = itemIds.map(itemId => menuService.deleteItem(itemId));
      await Promise.all(promises);
      
      console.log(`[MENU MANAGEMENT] Bulk delete completed for ${itemIds.length} items`);
      await loadData();
      setSelectedItems(new Set());
      setSelectionMode(false);
      Alert.alert('Success', `${itemIds.length} items deleted successfully`);
    } catch (error) {
      console.error('[MENU MANAGEMENT] Error in bulk delete:', error);
      Alert.alert('Error', 'Failed to delete some items');
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.menuCard,
        selectionMode && selectedItems.has(item.id) && styles.menuCardSelected
      ]}
      onPress={() => {
        if (selectionMode) {
          toggleItemSelection(item.id);
        } else {
          navigation.navigate('EditMenuItem', { itemId: item.id });
        }
      }}
      onLongPress={() => {
        if (!selectionMode) {
          setSelectionMode(true);
          setSelectedItems(new Set([item.id]));
        }
      }}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuName}>{item.name}</Text>
        <View style={styles.statusContainer}>
          {selectionMode && (
            <View style={[
              styles.selectionIndicator,
              selectedItems.has(item.id) && styles.selectionIndicatorSelected
            ]}>
              <Text style={styles.selectionIndicatorText}>
                {selectedItems.has(item.id) ? '✓' : ''}
              </Text>
            </View>
          )}
          <View style={[styles.statusBadge, { backgroundColor: item.isAvailable ? '#4CAF50' : '#FF4444' }]}>
            <Text style={styles.statusText}>{item.isAvailable ? 'Available' : 'Unavailable'}</Text>
          </View>
          {!selectionMode && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => handleToggleAvailability(item.id, item.isAvailable)}
            >
              <Text style={styles.toggleButtonText}>
                {item.isAvailable ? 'Disable' : 'Enable'}
              </Text>
            </TouchableOpacity>
          )}
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
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading menu items...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Menu Management</Text>
              <Text style={styles.headerSubtitle}>
                {filteredItems.length} of {menuItems.length} items • {categories.length} categories
              </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999999"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearSearchButton}
                    onPress={() => setSearchQuery('')}
                  >
                    <Text style={styles.clearSearchText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <TouchableOpacity
                style={[styles.filterButton, getFilterCount() > 0 && styles.filterButtonActive]}
                onPress={() => setShowFilters(true)}
              >
                <Text style={styles.filterButtonText}>
                  Filters {getFilterCount() > 0 && `(${getFilterCount()})`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              {!selectionMode ? (
                <>
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
                  
                  <TouchableOpacity 
                    style={styles.bulkButton}
                    onPress={toggleSelectionMode}
                  >
                    <Text style={styles.bulkButtonText}>Select Items</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.analyticsButton}
                    onPress={() => navigation.navigate('MenuAnalytics')}
                  >
                    <Text style={styles.analyticsButtonText}>Analytics</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={toggleSelectionMode}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.selectAllButton}
                    onPress={selectAllItems}
                  >
                    <Text style={styles.selectAllButtonText}>
                      {selectedItems.size === filteredItems.length ? 'Deselect All' : 'Select All'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
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
            {!selectionMode ? (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('MenuPreview')}
              >
                <Text style={styles.actionButtonText}>Preview Menu</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.bulkActions}>
                <Text style={styles.bulkActionsTitle}>
                  {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
                </Text>
                <View style={styles.bulkActionButtons}>
                  <TouchableOpacity 
                    style={styles.bulkActionButton}
                    onPress={() => handleBulkToggleAvailability(true)}
                  >
                    <Text style={styles.bulkActionButtonText}>Enable</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.bulkActionButton}
                    onPress={() => handleBulkToggleAvailability(false)}
                  >
                    <Text style={styles.bulkActionButtonText}>Disable</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.bulkActionButton, styles.bulkDeleteButton]}
                    onPress={handleBulkDelete}
                  >
                    <Text style={[styles.bulkActionButtonText, styles.bulkDeleteButtonText]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.menuList, { paddingBottom: 80 + insets.bottom }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters & Sort</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.categoryFilter}>
                <TouchableOpacity
                  style={[
                    styles.categoryOption,
                    !selectedCategory && styles.categoryOptionSelected
                  ]}
                  onPress={() => setSelectedCategory('')}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    !selectedCategory && styles.categoryOptionTextSelected
                  ]}>All Categories</Text>
                </TouchableOpacity>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      selectedCategory === category.id && styles.categoryOptionSelected
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      selectedCategory === category.id && styles.categoryOptionTextSelected
                    ]}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Availability</Text>
              <View style={styles.availabilityFilter}>
                {[
                  { key: 'all', label: 'All Items' },
                  { key: 'available', label: 'Available Only' },
                  { key: 'unavailable', label: 'Unavailable Only' }
                ].map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.availabilityOption,
                      availabilityFilter === option.key && styles.availabilityOptionSelected
                    ]}
                    onPress={() => setAvailabilityFilter(option.key)}
                  >
                    <Text style={[
                      styles.availabilityOptionText,
                      availabilityFilter === option.key && styles.availabilityOptionTextSelected
                    ]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.sortContainer}>
                <View style={styles.sortOptions}>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'price', label: 'Price' },
                    { key: 'date', label: 'Date Added' }
                  ].map(option => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.sortOption,
                        sortBy === option.key && styles.sortOptionSelected
                      ]}
                      onPress={() => setSortBy(option.key)}
                    >
                      <Text style={[
                        styles.sortOptionText,
                        sortBy === option.key && styles.sortOptionTextSelected
                      ]}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <TouchableOpacity
                  style={styles.sortOrderButton}
                  onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <Text style={styles.sortOrderText}>
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearFiltersText}>Clear All</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.applyFiltersButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyFiltersText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    paddingVertical: 32,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    paddingVertical: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  
  // Search and Filter Styles
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333333',
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B35',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#999999',
    fontWeight: 'bold',
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  categoryFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryOptionSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  availabilityFilter: {
    flexDirection: 'row',
    gap: 8,
  },
  availabilityOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  availabilityOptionSelected: {
    backgroundColor: '#FF6B35',
  },
  availabilityOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  availabilityOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortOptions: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  sortOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  sortOptionSelected: {
    backgroundColor: '#FF6B35',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  sortOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sortOrderButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOrderText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  clearFiltersText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  applyFiltersText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Bulk Operations Styles
  menuCardSelected: {
    borderColor: '#FF6B35',
    borderWidth: 2,
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectionIndicatorSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  selectionIndicatorText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bulkButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  bulkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  analyticsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  analyticsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectAllButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  selectAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bulkActions: {
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
  bulkActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  bulkActionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  bulkActionButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  bulkActionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bulkDeleteButton: {
    backgroundColor: '#FF4444',
  },
  bulkDeleteButtonText: {
    color: '#FFFFFF',
  },
});

export default MenuManagementScreen;
