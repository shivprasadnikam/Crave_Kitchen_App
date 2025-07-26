import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  menuItems: [],
  categories: [],
  isLoading: false,
  error: null,
};

// Action types
const MENU_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_MENU_ITEMS: 'SET_MENU_ITEMS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_MENU_ITEM: 'ADD_MENU_ITEM',
  UPDATE_MENU_ITEM: 'UPDATE_MENU_ITEM',
  DELETE_MENU_ITEM: 'DELETE_MENU_ITEM',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const menuReducer = (state, action) => {
  switch (action.type) {
    case MENU_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case MENU_ACTIONS.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
        isLoading: false,
        error: null,
      };
    
    case MENU_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: null,
      };
    
    case MENU_ACTIONS.ADD_MENU_ITEM:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
      };
    
    case MENU_ACTIONS.UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    
    case MENU_ACTIONS.DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item.id !== action.payload),
      };
    
    case MENU_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case MENU_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
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

  const value = {
    // State
    menuItems: state.menuItems,
    categories: state.categories,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions (to be implemented)
    // fetchMenuItems,
    // fetchCategories,
    // addMenuItem,
    // updateMenuItem,
    // deleteMenuItem,
    // toggleItemAvailability,
    // clearError,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export default MenuContext; 