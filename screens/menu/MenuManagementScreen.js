import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuContext } from '../../context/MenuContext';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../styles/globalStyles';
import { formatters } from '../../utils/formatters';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const MenuManagementScreen = ({ navigation }) => {
  const { menuItems, categories, fetchMenuItems, fetchCategories, toggleItemAvailability } = useContext(MenuContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    loadMenuData();
  }, []);

  useEffect(() => {
    filterMenuItems();
  }, [menuItems, activeCategory, searchQuery]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMenuItems(),
        fetchCategories(),
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMenuData();
    setRefreshing(false);
  };

  const filterMenuItems = () => {
    let filtered = menuItems;

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === activeCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category?.name.toLowerCase().includes(query)
      );
    }

    // Sort by category, then by name
    filtered.sort((a, b) => {
      if (a.category?.name !== b.category?.name) {
        return a.category?.name.localeCompare(b.category?.name);
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredItems(filtered);
  };

  const handleToggleAvailability = async (itemId, currentStatus) => {
    try {
      await toggleItemAvailability(itemId, !currentStatus);
      Alert.alert('Success', `Item ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update item availability');
    }
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Add delete functionality here
              Alert.alert('Success', 'Item deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ]
    );
  };

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
      contentContainerStyle={styles.categoryContent}
    >
      <TouchableOpacity
        style={[styles.categoryTab, activeCategory === 'all' && styles.activeCategoryTab]}
        onPress={() => setActiveCategory('all')}
      >
        <Text style={[styles.categoryText, activeCategory === 'all' && styles.activeCategoryText]}>
          All Items
        </Text>
      </TouchableOpacity>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.categoryTab, activeCategory === category.id && styles.activeCategoryTab]}
          onPress={() => setActiveCategory(category.id)}
        >
          <Text style={[styles.categoryText, activeCategory === category.id && styles.activeCategoryText]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search menu items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSearchQuery('')}
        >
          <Text style={styles.clearButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemCard}>
      <View style={styles.menuItemHeader}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemCategory}>{item.category?.name}</Text>
        </View>
        <View style={styles.menuItemActions}>
          <TouchableOpacity
            style={[styles.availabilityToggle, { backgroundColor: item.available ? colors.success : colors.error }]}
            onPress={() => handleToggleAvailability(item.id, item.available)}
          >
            <Text style={styles.availabilityText}>
              {item.available ? 'Active' : 'Inactive'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.menuItemDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.menuItemDetails}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{formatters.formatCurrency(item.price)}</Text>
        </View>
        
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('EditMenuItem', { itemId: item.id })}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.error }]}
            onPress={() => handleDeleteItem(item)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>📷 Image available</Text>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => {
    let title = 'No Menu Items';
    let message = 'Start by adding your first menu item';
    let icon = '🍽️';

    if (searchQuery.trim()) {
      title = 'No Matching Items';
      message = 'Try adjusting your search terms';
      icon = '🔍';
    } else if (activeCategory !== 'all') {
      const category = categories.find(c => c.id === activeCategory);
      title = `No Items in ${category?.name || 'Category'}`;
      message = `Add items to the ${category?.name || 'selected'} category`;
      icon = '📁';
    }

    return (
      <EmptyState
        title={title}
        message={message}
        icon={icon}
      />
    );
  };

  const renderStats = () => {
    const totalItems = menuItems.length;
    const activeItems = menuItems.filter(item => item.available).length;
    const inactiveItems = totalItems - activeItems;
    const totalCategories = categories.length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.success }]}>{activeItems}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.error }]}>{inactiveItems}</Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.info }]}>{totalCategories}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Menu Management"
        subtitle={`${filteredItems.length} items found`}
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('AddMenuItem')}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        }
      />

      {renderSearchBar()}
      {renderCategoryTabs()}
      {renderStats()}

      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  addButton: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.textPrimary,
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 24,
    top: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  activeCategoryTab: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  menuItemCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  menuItemActions: {
    alignItems: 'flex-end',
  },
  availabilityToggle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  menuItemDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  menuItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceInfo: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  priceValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  imageContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  imageText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default MenuManagementScreen; 