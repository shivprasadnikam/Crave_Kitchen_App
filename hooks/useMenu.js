import { useState, useEffect, useCallback, useMemo } from 'react';
import { useMenu as useMenuContext } from '../context/MenuContext';
import { useNotifications } from '../context/NotificationContext';

export const useMenu = () => {
  const {
    menuItems,
    categories,
    selectedCategory,
    searchQuery,
    filters,
    isLoading,
    error,
    filteredMenuItems,
    fetchMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleItemAvailability,
    updateItemPrice,
    setSelectedCategory,
    setSearchQuery,
    setFilters,
    clearError,
    getItemsByCategory,
    getCategoryById,
  } = useMenuContext();

  const { addSystemNotification } = useNotifications();

  // Local state for additional functionality
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [selectedItems, setSelectedItems] = useState([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);

  // Computed values
  const sortedMenuItems = useMemo(() => {
    let sorted = [...filteredMenuItems];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        sorted.sort((a, b) => {
          const categoryA = getCategoryById(a.categoryId)?.name || '';
          const categoryB = getCategoryById(b.categoryId)?.name || '';
          return categoryA.localeCompare(categoryB);
        });
        break;
      case 'availability':
        sorted.sort((a, b) => {
          if (a.isAvailable === b.isAvailable) return 0;
          return a.isAvailable ? -1 : 1;
        });
        break;
      case 'createdAt':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    
    return sorted;
  }, [filteredMenuItems, sortBy, sortOrder, getCategoryById]);

  const menuStats = useMemo(() => {
    const total = menuItems.length;
    const available = menuItems.filter(item => item.isAvailable).length;
    const unavailable = total - available;
    const categoriesCount = categories.length;
    
    const totalValue = menuItems.reduce((sum, item) => sum + item.price, 0);
    const averagePrice = total > 0 ? totalValue / total : 0;
    
    return {
      total,
      available,
      unavailable,
      categoriesCount,
      totalValue,
      averagePrice,
    };
  }, [menuItems, categories]);

  const itemsByCategory = useMemo(() => {
    const grouped = {};
    categories.forEach(category => {
      grouped[category.id] = getItemsByCategory(category.id);
    });
    return grouped;
  }, [categories, getItemsByCategory]);

  const popularItems = useMemo(() => {
    // Mock popularity based on creation date (newer items are more popular)
    return [...menuItems]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [menuItems]);

  const lowStockItems = useMemo(() => {
    // Mock low stock items (items with price < 10)
    return menuItems.filter(item => item.price < 10);
  }, [menuItems]);

  // Enhanced actions with notifications
  const handleAddMenuItem = useCallback(async (menuItem) => {
    try {
      const newItem = await addMenuItem(menuItem);
      addSystemNotification(
        'Menu Item Added',
        `${newItem.name} has been added to your menu`
      );
      return newItem;
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  }, [addMenuItem, addSystemNotification]);

  const handleUpdateMenuItem = useCallback(async (id, updates) => {
    try {
      const updatedItem = await updateMenuItem(id, updates);
      addSystemNotification(
        'Menu Item Updated',
        `${updatedItem.name} has been updated`
      );
      return updatedItem;
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  }, [updateMenuItem, addSystemNotification]);

  const handleDeleteMenuItem = useCallback(async (id) => {
    try {
      const item = menuItems.find(item => item.id === id);
      await deleteMenuItem(id);
      if (item) {
        addSystemNotification(
          'Menu Item Deleted',
          `${item.name} has been removed from your menu`
        );
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }, [deleteMenuItem, menuItems, addSystemNotification]);

  const handleAddCategory = useCallback(async (category) => {
    try {
      const newCategory = await addCategory(category);
      addSystemNotification(
        'Category Added',
        `${newCategory.name} category has been created`
      );
      return newCategory;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  }, [addCategory, addSystemNotification]);

  const handleUpdateCategory = useCallback(async (id, updates) => {
    try {
      const updatedCategory = await updateCategory(id, updates);
      addSystemNotification(
        'Category Updated',
        `${updatedCategory.name} category has been updated`
      );
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }, [updateCategory, addSystemNotification]);

  const handleDeleteCategory = useCallback(async (id) => {
    try {
      const category = categories.find(cat => cat.id === id);
      await deleteCategory(id);
      if (category) {
        addSystemNotification(
          'Category Deleted',
          `${category.name} category has been removed`
        );
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }, [deleteCategory, categories, addSystemNotification]);

  const handleToggleAvailability = useCallback(async (id) => {
    try {
      await toggleItemAvailability(id);
      const item = menuItems.find(item => item.id === id);
      if (item) {
        const status = item.isAvailable ? 'unavailable' : 'available';
        addSystemNotification(
          'Availability Updated',
          `${item.name} is now ${status}`
        );
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      throw error;
    }
  }, [toggleItemAvailability, menuItems, addSystemNotification]);

  const handleUpdatePrice = useCallback(async (id, price) => {
    try {
      await updateItemPrice(id, price);
      const item = menuItems.find(item => item.id === id);
      if (item) {
        addSystemNotification(
          'Price Updated',
          `${item.name} price has been updated to $${price}`
        );
      }
    } catch (error) {
      console.error('Error updating price:', error);
      throw error;
    }
  }, [updateItemPrice, menuItems, addSystemNotification]);

  // Bulk operations
  const handleBulkToggleAvailability = useCallback(async (itemIds, makeAvailable) => {
    try {
      const promises = itemIds.map(id => toggleItemAvailability(id));
      await Promise.all(promises);
      
      addSystemNotification(
        'Bulk Update',
        `${itemIds.length} items have been ${makeAvailable ? 'made available' : 'made unavailable'}`
      );
    } catch (error) {
      console.error('Error bulk updating availability:', error);
      throw error;
    }
  }, [toggleItemAvailability, addSystemNotification]);

  const handleBulkDelete = useCallback(async (itemIds) => {
    try {
      const promises = itemIds.map(id => deleteMenuItem(id));
      await Promise.all(promises);
      
      addSystemNotification(
        'Bulk Delete',
        `${itemIds.length} items have been deleted`
      );
      setSelectedItems([]);
      setIsBulkEditing(false);
    } catch (error) {
      console.error('Error bulk deleting items:', error);
      throw error;
    }
  }, [deleteMenuItem, addSystemNotification]);

  // Selection management
  const toggleItemSelection = useCallback((itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const selectAllItems = useCallback(() => {
    setSelectedItems(sortedMenuItems.map(item => item.id));
  }, [sortedMenuItems]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  // Filter and search functions
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const updateAvailabilityFilter = useCallback((availability) => {
    setFilters({ availability });
  }, [setFilters]);

  const updateCategoryFilter = useCallback((categoryId) => {
    setFilters({ category: categoryId });
  }, [setFilters]);

  const updatePriceRangeFilter = useCallback((min, max) => {
    setFilters({ priceRange: { min, max } });
  }, [setFilters]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({
      availability: 'all',
      category: null,
      priceRange: null,
    });
  }, [setSearchQuery, setFilters]);

  // Sorting functions
  const updateSorting = useCallback((field, order = 'asc') => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  // Utility functions
  const getCategoryName = useCallback((categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? category.name : 'Uncategorized';
  }, [getCategoryById]);

  const getCategoryColor = useCallback((categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? category.color || '#9E9E9E' : '#9E9E9E';
  }, [getCategoryById]);

  const formatPrice = useCallback((price) => {
    return `$${price.toFixed(2)}`;
  }, []);

  const isItemSelected = useCallback((itemId) => {
    return selectedItems.includes(itemId);
  }, [selectedItems]);

  const getSelectedItemsCount = useCallback(() => {
    return selectedItems.length;
  }, [selectedItems]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchMenuItems();
      }
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [fetchMenuItems, isLoading]);

  return {
    // State
    menuItems,
    categories,
    selectedCategory,
    searchQuery,
    filters,
    isLoading,
    error,
    
    // Local state
    sortBy,
    sortOrder,
    viewMode,
    selectedItems,
    isBulkEditing,
    
    // Computed values
    sortedMenuItems,
    filteredMenuItems,
    menuStats,
    itemsByCategory,
    popularItems,
    lowStockItems,
    
    // Actions
    fetchMenuItems,
    addMenuItem: handleAddMenuItem,
    updateMenuItem: handleUpdateMenuItem,
    deleteMenuItem: handleDeleteMenuItem,
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    toggleItemAvailability: handleToggleAvailability,
    updateItemPrice: handleUpdatePrice,
    setSelectedCategory,
    setSearchQuery,
    setFilters,
    clearError,
    
    // Bulk operations
    handleBulkToggleAvailability,
    handleBulkDelete,
    
    // Selection management
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    isItemSelected,
    getSelectedItemsCount,
    
    // Filter and search
    updateSearchQuery,
    updateAvailabilityFilter,
    updateCategoryFilter,
    updatePriceRangeFilter,
    clearFilters,
    
    // Sorting
    updateSorting,
    
    // View management
    setViewMode,
    setIsBulkEditing,
    
    // Utility functions
    getItemsByCategory,
    getCategoryById,
    getCategoryName,
    getCategoryColor,
    formatPrice,
  };
}; 