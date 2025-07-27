import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNotifications } from '../context/NotificationContext';

export const useInventory = () => {
  const { addSystemNotification } = useNotifications();

  // Local state for inventory management
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    stockLevel: 'all', // all, low, out
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Constants
  const AUTO_REFRESH_INTERVAL = 300000; // 5 minutes
  const MOCK_API_DELAY = 1000; // 1 second
  const EXPIRY_WARNING_DAYS = 7;
  const CRITICAL_STOCK_THRESHOLD = 0.5;
  const LOW_STOCK_THRESHOLD = 1.0;

  // Mock inventory data for development
  const mockInventory = useMemo(() => [
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unit: 'kg',
      cost: 8.50,
      supplier: 'Fresh Foods Inc.',
      lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'low',
    },
    {
      id: '2',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 8,
      minStock: 15,
      maxStock: 30,
      unit: 'kg',
      cost: 3.20,
      supplier: 'Local Farm Market',
      lastRestocked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'low',
    },
    {
      id: '3',
      name: 'Cheese',
      category: 'Dairy',
      currentStock: 3,
      minStock: 8,
      maxStock: 25,
      unit: 'kg',
      cost: 12.00,
      supplier: 'Dairy Delights',
      lastRestocked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'critical',
    },
    {
      id: '4',
      name: 'Flour',
      category: 'Pantry',
      currentStock: 20,
      minStock: 5,
      maxStock: 40,
      unit: 'kg',
      cost: 2.50,
      supplier: 'Bulk Foods Co.',
      lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'good',
    },
    {
      id: '5',
      name: 'Olive Oil',
      category: 'Pantry',
      currentStock: 0,
      minStock: 2,
      maxStock: 10,
      unit: 'L',
      cost: 15.00,
      supplier: 'Mediterranean Imports',
      lastRestocked: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'out',
    },
  ], []);

  // Initialize inventory
  useEffect(() => {
    setInventory(mockInventory);
  }, [mockInventory]);

  // Computed values
  const filteredInventory = useMemo(() => {
    let filtered = [...inventory];

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Apply stock level filter
    if (filters.stockLevel !== 'all') {
      filtered = filtered.filter(item => item.status === filters.stockLevel);
    }

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [inventory, filters]);

  const sortedInventory = useMemo(() => {
    let sorted = [...filteredInventory];

    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'currentStock':
        sorted.sort((a, b) => a.currentStock - b.currentStock);
        break;
      case 'status':
        sorted.sort((a, b) => getStatusPriority(a.status) - getStatusPriority(b.status));
        break;
      case 'lastRestocked':
        sorted.sort((a, b) => new Date(a.lastRestocked) - new Date(b.lastRestocked));
        break;
      case 'expiryDate':
        sorted.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
        break;
      default:
        break;
    }

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredInventory, sortBy, sortOrder]);

  const inventoryStats = useMemo(() => {
    const total = inventory.length;
    const lowStock = inventory.filter(item => item.status === 'low').length;
    const critical = inventory.filter(item => item.status === 'critical').length;
    const outOfStock = inventory.filter(item => item.status === 'out').length;
    const good = inventory.filter(item => item.status === 'good').length;

    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0);
    const averageCost = total > 0 ? inventory.reduce((sum, item) => sum + item.cost, 0) / total : 0;

    return {
      total,
      lowStock,
      critical,
      outOfStock,
      good,
      totalValue,
      averageCost,
    };
  }, [inventory]);

  const lowStockItems = useMemo(() => {
    return inventory.filter(item => item.status === 'low' || item.status === 'critical');
  }, [inventory]);

  const outOfStockItems = useMemo(() => {
    return inventory.filter(item => item.status === 'out');
  }, [inventory]);

  const expiringItems = useMemo(() => {
    const now = new Date();
    const warningDate = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000);
    
    return inventory.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= warningDate && item.currentStock > 0;
    });
  }, [inventory]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(inventory.map(item => item.category))];
    return uniqueCategories.sort();
  }, [inventory]);

  // Actions
  const fetchInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Implement API call to fetch inventory
      // const response = await inventoryService.getInventory();
      // setInventory(response.data);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
      
      setInventory(mockInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to fetch inventory data');
    } finally {
      setIsLoading(false);
    }
  }, [mockInventory]);

  const addInventoryItem = useCallback(async (item) => {
    try {
      setIsLoading(true);
      setError(null);

      const newItem = {
        ...item,
        id: Date.now().toString(),
        status: calculateStockStatus(item.currentStock, item.minStock),
        lastRestocked: new Date().toISOString(),
      };

      // TODO: Implement API call to add inventory item
      // await inventoryService.addInventoryItem(newItem);

      setInventory(prev => [newItem, ...prev]);
      addSystemNotification(
        'Inventory Item Added',
        `${newItem.name} has been added to inventory`
      );

      return newItem;
    } catch (error) {
      console.error('Error adding inventory item:', error);
      setError('Failed to add inventory item');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addSystemNotification]);

  const updateInventoryItem = useCallback(async (id, updates) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedItem = {
        ...updates,
        id,
        status: calculateStockStatus(updates.currentStock, updates.minStock),
        updatedAt: new Date().toISOString(),
      };

      // TODO: Implement API call to update inventory item
      // await inventoryService.updateInventoryItem(id, updatedItem);

      setInventory(prev =>
        prev.map(item => (item.id === id ? { ...item, ...updatedItem } : item))
      );

      addSystemNotification(
        'Inventory Updated',
        `${updatedItem.name} has been updated`
      );

      return updatedItem;
    } catch (error) {
      console.error('Error updating inventory item:', error);
      setError('Failed to update inventory item');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addSystemNotification]);

  const deleteInventoryItem = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      const item = inventory.find(item => item.id === id);

      // TODO: Implement API call to delete inventory item
      // await inventoryService.deleteInventoryItem(id);

      setInventory(prev => prev.filter(item => item.id !== id));

      if (item) {
        addSystemNotification(
          'Inventory Item Deleted',
          `${item.name} has been removed from inventory`
        );
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      setError('Failed to delete inventory item');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, addSystemNotification]);

  const restockItem = useCallback(async (id, quantity) => {
    try {
      setIsLoading(true);
      setError(null);

      const item = inventory.find(item => item.id === id);
      if (!item) throw new Error('Item not found');

      const updatedStock = item.currentStock + quantity;
      const updatedItem = {
        ...item,
        currentStock: updatedStock,
        status: calculateStockStatus(updatedStock, item.minStock),
        lastRestocked: new Date().toISOString(),
      };

      // TODO: Implement API call to restock item
      // await inventoryService.restockItem(id, quantity);

      setInventory(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );

      addSystemNotification(
        'Item Restocked',
        `${item.name} has been restocked with ${quantity} ${item.unit}`
      );

      return updatedItem;
    } catch (error) {
      console.error('Error restocking item:', error);
      setError('Failed to restock item');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, addSystemNotification]);

  const useStock = useCallback(async (id, quantity) => {
    try {
      setIsLoading(true);
      setError(null);

      const item = inventory.find(item => item.id === id);
      if (!item) throw new Error('Item not found');

      if (item.currentStock < quantity) {
        throw new Error('Insufficient stock');
      }

      const updatedStock = item.currentStock - quantity;
      const updatedItem = {
        ...item,
        currentStock: updatedStock,
        status: calculateStockStatus(updatedStock, item.minStock),
      };

      // TODO: Implement API call to use stock
      // await inventoryService.useStock(id, quantity);

      setInventory(prev =>
        prev.map(item => (item.id === id ? updatedItem : item))
      );

      // Check if stock is now low
      if (updatedStock <= item.minStock) {
        addSystemNotification(
          'Low Stock Alert',
          `${item.name} is running low on stock (${updatedStock} ${item.unit} remaining)`
        );
      }

      return updatedItem;
    } catch (error) {
      console.error('Error using stock:', error);
      setError('Failed to use stock');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, addSystemNotification]);

  // Filter and search functions
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      stockLevel: 'all',
      searchQuery: '',
    });
  }, []);

  // Sorting functions
  const updateSorting = useCallback((field, order = 'asc') => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  // Utility functions
  const calculateStockStatus = useCallback((currentStock, minStock) => {
    if (currentStock === 0) return 'out';
    if (currentStock <= minStock * CRITICAL_STOCK_THRESHOLD) return 'critical';
    if (currentStock <= minStock * LOW_STOCK_THRESHOLD) return 'low';
    return 'good';
  }, []);

  const getStatusPriority = useCallback((status) => {
    switch (status) {
      case 'out': return 0;
      case 'critical': return 1;
      case 'low': return 2;
      case 'good': return 3;
      default: return 4;
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'out': return '#F44336';
      case 'critical': return '#FF5722';
      case 'low': return '#FF9800';
      case 'good': return '#4CAF50';
      default: return '#9E9E9E';
    }
  }, []);

  const getStatusText = useCallback((status) => {
    switch (status) {
      case 'out': return 'Out of Stock';
      case 'critical': return 'Critical';
      case 'low': return 'Low Stock';
      case 'good': return 'Good';
      default: return 'Unknown';
    }
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }, []);

  const formatCurrency = useCallback((amount) => {
    return `$${amount.toFixed(2)}`;
  }, []);

  const getStockPercentage = useCallback((current, min) => {
    return Math.round((current / min) * 100);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchInventory();
      }
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchInventory, isLoading]);

  return {
    // State
    inventory,
    isLoading,
    error,
    filters,
    sortBy,
    sortOrder,

    // Computed values
    filteredInventory,
    sortedInventory,
    inventoryStats,
    lowStockItems,
    outOfStockItems,
    expiringItems,
    categories,

    // Actions
    fetchInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    restockItem,
    useStock,

    // Filter and search
    updateFilters,
    clearFilters,

    // Sorting
    updateSorting,

    // Utility functions
    calculateStockStatus,
    getStatusPriority,
    getStatusColor,
    getStatusText,
    formatDate,
    formatCurrency,
    getStockPercentage,
  };
}; 