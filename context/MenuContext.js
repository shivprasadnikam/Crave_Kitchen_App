import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { menuService } from '../services/menuService';

// Initial state
const initialState = {
  menuItems: [],
  categories: [],
  currentItem: null,
  loading: false,
  error: null,
  filters: {
    category: [],
    status: [],
    searchTerm: '',
    priceRange: null,
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
  statistics: {
    totalItems: 0,
    activeItems: 0,
    inactiveItems: 0,
    categories: 0,
  },
};

// Action types
const MENU_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_MENU_ITEMS: 'SET_MENU_ITEMS',
  ADD_MENU_ITEM: 'ADD_MENU_ITEM',
  UPDATE_MENU_ITEM: 'UPDATE_MENU_ITEM',
  REMOVE_MENU_ITEM: 'REMOVE_MENU_ITEM',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  SET_CURRENT_ITEM: 'SET_CURRENT_ITEM',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_STATISTICS: 'SET_STATISTICS',
  REFRESH_MENU: 'REFRESH_MENU',
};

// Reducer
const menuReducer = (state, action) => {
  switch (action.type) {
    case MENU_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MENU_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case MENU_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case MENU_ACTIONS.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
        loading: false,
      };
    case MENU_ACTIONS.ADD_MENU_ITEM:
      return {
        ...state,
        menuItems: [action.payload, ...state.menuItems],
        loading: false,
      };
    case MENU_ACTIONS.UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        currentItem: state.currentItem?.id === action.payload.id
          ? action.payload
          : state.currentItem,
        loading: false,
      };
    case MENU_ACTIONS.REMOVE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item.id !== action.payload),
        currentItem: state.currentItem?.id === action.payload
          ? null
          : state.currentItem,
        loading: false,
      };
    case MENU_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case MENU_ACTIONS.ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false,
      };
    case MENU_ACTIONS.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
      };
    case MENU_ACTIONS.REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
        loading: false,
      };
    case MENU_ACTIONS.SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case MENU_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      };
    case MENU_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case MENU_ACTIONS.SET_STATISTICS:
      return {
        ...state,
        statistics: action.payload,
      };
    case MENU_ACTIONS.REFRESH_MENU:
      return {
        ...state,
        menuItems: [],
        pagination: { ...state.pagination, page: 1 },
      };
    default:
      return state;
  }
};

// Create context
const MenuContext = createContext();

// Provider component
export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, [state.filters, state.pagination.page]);

  // Load menu items
  const loadMenuItems = async (refresh = false) => {
    try {
      if (refresh) {
        dispatch({ type: MENU_ACTIONS.REFRESH_MENU });
      }

      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.getMenuItems({
        page: state.pagination.page,
        limit: state.pagination.limit,
        ...state.filters,
      });

      const { menuItems, pagination, statistics } = response.data;

      if (refresh || state.pagination.page === 1) {
        dispatch({ type: MENU_ACTIONS.SET_MENU_ITEMS, payload: menuItems });
      } else {
        // Append new items for pagination
        dispatch({
          type: MENU_ACTIONS.SET_MENU_ITEMS,
          payload: [...state.menuItems, ...menuItems],
        });
      }

      dispatch({ type: MENU_ACTIONS.SET_PAGINATION, payload: pagination });
      dispatch({ type: MENU_ACTIONS.SET_STATISTICS, payload: statistics });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load menu items';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.getCategories();
      const categories = response.data;

      dispatch({ type: MENU_ACTIONS.SET_CATEGORIES, payload: categories });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load categories';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  };

  // Get menu item by ID
  const getMenuItemById = async (itemId) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.getMenuItemById(itemId);
      const item = response.data;

      dispatch({ type: MENU_ACTIONS.SET_CURRENT_ITEM, payload: item });
      return { success: true, item };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load menu item';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Create menu item
  const createMenuItem = async (itemData) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.createMenuItem(itemData);
      const newItem = response.data;

      dispatch({ type: MENU_ACTIONS.ADD_MENU_ITEM, payload: newItem });

      // Refresh statistics
      loadStatistics();

      return { success: true, item: newItem };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create menu item';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update menu item
  const updateMenuItem = async (itemId, itemData) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.updateMenuItem(itemId, itemData);
      const updatedItem = response.data;

      dispatch({ type: MENU_ACTIONS.UPDATE_MENU_ITEM, payload: updatedItem });

      return { success: true, item: updatedItem };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update menu item';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Delete menu item
  const deleteMenuItem = async (itemId) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      await menuService.deleteMenuItem(itemId);

      dispatch({ type: MENU_ACTIONS.REMOVE_MENU_ITEM, payload: itemId });

      // Refresh statistics
      loadStatistics();

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete menu item';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Create category
  const createCategory = async (categoryData) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.createCategory(categoryData);
      const newCategory = response.data;

      dispatch({ type: MENU_ACTIONS.ADD_CATEGORY, payload: newCategory });

      return { success: true, category: newCategory };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create category';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update category
  const updateCategory = async (categoryId, categoryData) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      const response = await menuService.updateCategory(categoryId, categoryData);
      const updatedCategory = response.data;

      dispatch({ type: MENU_ACTIONS.UPDATE_CATEGORY, payload: updatedCategory });

      return { success: true, category: updatedCategory };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update category';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      dispatch({ type: MENU_ACTIONS.SET_LOADING, payload: true });

      await menuService.deleteCategory(categoryId);

      dispatch({ type: MENU_ACTIONS.REMOVE_CATEGORY, payload: categoryId });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category';
      dispatch({ type: MENU_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    try {
      const response = await menuService.getMenuStatistics();
      const statistics = response.data;

      dispatch({ type: MENU_ACTIONS.SET_STATISTICS, payload: statistics });
    } catch (error) {
      console.error('Failed to load menu statistics:', error);
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: MENU_ACTIONS.SET_FILTERS, payload: filters });
  };

  // Clear filters
  const clearFilters = () => {
    dispatch({
      type: MENU_ACTIONS.SET_FILTERS,
      payload: {
        category: [],
        status: [],
        searchTerm: '',
        priceRange: null,
      },
    });
  };

  // Load more items (pagination)
  const loadMoreItems = () => {
    if (state.pagination.hasMore && !state.loading) {
      dispatch({
        type: MENU_ACTIONS.SET_PAGINATION,
        payload: { page: state.pagination.page + 1 },
      });
    }
  };

  // Refresh menu
  const refreshMenu = () => {
    loadMenuItems(true);
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: MENU_ACTIONS.CLEAR_ERROR });
  };

  // Get items by category
  const getItemsByCategory = (categoryId) => {
    return state.menuItems.filter(item => item.categoryId === categoryId);
  };

  // Get active items
  const getActiveItems = () => {
    return state.menuItems.filter(item => item.isAvailable);
  };

  // Get inactive items
  const getInactiveItems = () => {
    return state.menuItems.filter(item => !item.isAvailable);
  };

  const value = {
    // State
    menuItems: state.menuItems,
    categories: state.categories,
    currentItem: state.currentItem,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    statistics: state.statistics,

    // Actions
    loadMenuItems,
    loadCategories,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createCategory,
    updateCategory,
    deleteCategory,
    setFilters,
    clearFilters,
    loadMoreItems,
    refreshMenu,
    clearError,
    getItemsByCategory,
    getActiveItems,
    getInactiveItems,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

// Custom hook to use menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 