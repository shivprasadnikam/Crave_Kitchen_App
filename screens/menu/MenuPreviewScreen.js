import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuContext } from '../../context/MenuContext';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const MenuPreviewScreen = ({ navigation }) => {
  const { menuItems, categories, fetchMenuItems, fetchCategories } = useContext(MenuContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    loadMenuData();
  }, []);

  useEffect(() => {
    filterMenuItems();
  }, [menuItems, activeCategory]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMenuItems(),
        fetchCategories(),
      ]);
    } catch (error) {
      console.error('Failed to load menu data:', error);
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
    let filtered = menuItems.filter(item => item.available);

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === activeCategory);
    }

    // Sort by category, then by name
    filtered.sort((a, b) => {
      const categoryA = categories.find(c => c.id === a.categoryId);
      const categoryB = categories.find(c => c.id === b.categoryId);
      
      if (categoryA?.name !== categoryB?.name) {
        return (categoryA?.name || '').localeCompare(categoryB?.name || '');
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredItems(filtered);
  };

  const getCategoryItems = (categoryId) => {
    return menuItems.filter(item => item.categoryId === categoryId && item.available);
  };

  const renderCategoryHeader = (category) => (
    <View style={styles.categoryHeader}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <View style={styles.categoryDetails}>
          <Text style={styles.categoryName}>{category.name}</Text>
          {category.description && (
            <Text style={styles.categoryDescription}>{category.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.categoryStats}>
        <Text style={styles.itemCount}>
          {getCategoryItems(category.id).length} items
        </Text>
      </View>
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemCard}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          {item.ingredients && (
            <Text style={styles.menuItemIngredients}>
              <Text style={styles.ingredientsLabel}>Ingredients: </Text>
              {item.ingredients}
            </Text>
          )}
          
          {item.allergens && (
            <Text style={styles.menuItemAllergens}>
              <Text style={styles.allergensLabel}>Allergens: </Text>
              {item.allergens}
            </Text>
          )}
          
          {item.notes && (
            <Text style={styles.menuItemNotes}>
              <Text style={styles.notesLabel}>Notes: </Text>
              {item.notes}
            </Text>
          )}
        </View>

        <View style={styles.menuItemDetails}>
          <Text style={styles.menuItemPrice}>{formatters.formatCurrency(item.price)}</Text>
          
          {item.preparationTime && (
            <Text style={styles.preparationTime}>
              ⏱️ {item.preparationTime} min
            </Text>
          )}
          
          {item.calories && (
            <Text style={styles.calories}>
              🔥 {item.calories} cal
            </Text>
          )}
        </View>
      </View>

      {item.image && (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>📷 Image</Text>
        </View>
      )}
    </View>
  );

  const renderCategorySection = ({ item: category }) => {
    const categoryItems = getCategoryItems(category.id);
    
    if (categoryItems.length === 0) {
      return null;
    }

    return (
      <View style={styles.categorySection}>
        {renderCategoryHeader(category)}
        <FlatList
          data={categoryItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
        <Text style={[styles.categoryTabText, activeCategory === 'all' && styles.activeCategoryTabText]}>
          All Items
        </Text>
      </TouchableOpacity>
      {categories.map((category) => {
        const itemCount = getCategoryItems(category.id).length;
        if (itemCount === 0) return null;
        
        return (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryTab, activeCategory === category.id && styles.activeCategoryTab]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={[styles.categoryTabText, activeCategory === category.id && styles.activeCategoryTabText]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderEmptyState = () => (
    <EmptyState
      title="No Menu Items"
      message="Add some menu items to see them here"
      icon="🍽️"
    />
  );

  const renderStats = () => {
    const totalItems = menuItems.filter(item => item.available).length;
    const totalCategories = categories.filter(category => getCategoryItems(category.id).length > 0).length;
    const averagePrice = totalItems > 0 
      ? menuItems.filter(item => item.available).reduce((sum, item) => sum + item.price, 0) / totalItems 
      : 0;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCategories}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatters.formatCurrency(averagePrice)}</Text>
          <Text style={styles.statLabel}>Avg. Price</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const availableCategories = categories.filter(category => getCategoryItems(category.id).length > 0);
  const displayCategories = activeCategory === 'all' ? availableCategories : [categories.find(c => c.id === activeCategory)].filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Menu Preview"
        subtitle="How customers see your menu"
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('MenuManagement')}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        }
      />

      {renderCategoryTabs()}
      {renderStats()}

      <FlatList
        data={displayCategories}
        renderItem={renderCategorySection}
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
  editButton: {
    fontSize: 20,
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
  categoryTabText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeCategoryTabText: {
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
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  categoryInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    ...typography.h2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  categoryStats: {
    alignItems: 'flex-end',
  },
  itemCount: {
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  menuItemCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  menuItemIngredients: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  ingredientsLabel: {
    fontWeight: '600',
  },
  menuItemAllergens: {
    ...typography.caption,
    color: colors.warning,
    marginBottom: 4,
  },
  allergensLabel: {
    fontWeight: '600',
  },
  menuItemNotes: {
    ...typography.caption,
    color: colors.info,
    fontStyle: 'italic',
  },
  notesLabel: {
    fontWeight: '600',
  },
  menuItemDetails: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  menuItemPrice: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  preparationTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  calories: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  imagePlaceholder: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  imageText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default MenuPreviewScreen; 