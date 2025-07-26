import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const InventoryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock inventory data
  const mockInventory = [
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 15,
      minStock: 20,
      unit: 'kg',
      cost: 8.50,
      supplier: 'Fresh Foods Co.',
      lastUpdated: '2024-01-15T10:30:00Z',
      status: 'low',
    },
    {
      id: '2',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 25,
      minStock: 10,
      unit: 'kg',
      cost: 3.20,
      supplier: 'Local Market',
      lastUpdated: '2024-01-15T09:15:00Z',
      status: 'good',
    },
    {
      id: '3',
      name: 'Olive Oil',
      category: 'Pantry',
      currentStock: 8,
      minStock: 15,
      unit: 'L',
      cost: 12.00,
      supplier: 'Premium Oils',
      lastUpdated: '2024-01-14T16:45:00Z',
      status: 'low',
    },
    {
      id: '4',
      name: 'Rice',
      category: 'Grains',
      currentStock: 50,
      minStock: 25,
      unit: 'kg',
      cost: 2.50,
      supplier: 'Bulk Foods',
      lastUpdated: '2024-01-15T11:20:00Z',
      status: 'good',
    },
    {
      id: '5',
      name: 'Cheese',
      category: 'Dairy',
      currentStock: 5,
      minStock: 12,
      unit: 'kg',
      cost: 15.00,
      supplier: 'Dairy Delights',
      lastUpdated: '2024-01-15T08:30:00Z',
      status: 'critical',
    },
  ];

  const filters = [
    { key: 'all', label: 'All Items', icon: '📦' },
    { key: 'low', label: 'Low Stock', icon: '⚠️' },
    { key: 'critical', label: 'Critical', icon: '🚨' },
    { key: 'good', label: 'Good', icon: '✅' },
  ];

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setInventory(mockInventory);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInventory();
    setRefreshing(false);
  };

  const getFilteredInventory = () => {
    if (selectedFilter === 'all') {
      return inventory;
    }
    return inventory.filter(item => item.status === selectedFilter);
  };

  const calculateInventoryMetrics = () => {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.status === 'low').length;
    const criticalItems = inventory.filter(item => item.status === 'critical').length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0);

    return {
      totalItems,
      lowStockItems,
      criticalItems,
      totalValue,
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return colors.error;
      case 'low': return colors.warning;
      case 'good': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return '🚨';
      case 'low': return '⚠️';
      case 'good': return '✅';
      default: return '📦';
    }
  };

  const renderFilterTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[styles.filterTab, selectedFilter === filter.key && styles.activeFilterTab]}
          onPress={() => setSelectedFilter(filter.key)}
        >
          <Text style={styles.filterIcon}>{filter.icon}</Text>
          <Text style={[styles.filterLabel, selectedFilter === filter.key && styles.activeFilterLabel]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMetricCard = (title, value, subtitle, color = colors.primary, icon = '📊') => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderInventoryMetrics = () => {
    const metrics = calculateInventoryMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Items',
            metrics.totalItems,
            'inventory items',
            colors.primary,
            '📦'
          )}
          {renderMetricCard(
            'Low Stock',
            metrics.lowStockItems,
            'need attention',
            colors.warning,
            '⚠️'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Critical',
            metrics.criticalItems,
            'urgent restock',
            colors.error,
            '🚨'
          )}
          {renderMetricCard(
            'Total Value',
            formatters.formatCurrency(metrics.totalValue),
            'inventory worth',
            colors.success,
            '💰'
          )}
        </View>
      </View>
    );
  };

  const renderInventoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inventoryCard}
      onPress={() => navigation.navigate('StockManagement', { itemId: item.id })}
    >
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
        <View style={styles.itemStatus}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Current Stock:</Text>
          <Text style={[styles.stockValue, { color: getStatusColor(item.status) }]}>
            {item.currentStock} {item.unit}
          </Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Min Stock:</Text>
          <Text style={styles.stockValue}>{item.minStock} {item.unit}</Text>
        </View>
      </View>

      <View style={styles.itemFooter}>
        <View style={styles.itemCost}>
          <Text style={styles.costLabel}>Cost:</Text>
          <Text style={styles.costValue}>{formatters.formatCurrency(item.cost)}/{item.unit}</Text>
        </View>
        <View style={styles.itemSupplier}>
          <Text style={styles.supplierLabel}>Supplier:</Text>
          <Text style={styles.supplierValue}>{item.supplier}</Text>
        </View>
      </View>

      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('StockManagement', { itemId: item.id })}
        >
          <Text style={styles.actionButtonText}>Update Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('IngredientTracking', { itemId: item.id })}
        >
          <Text style={styles.actionButtonText}>Track Usage</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('StockManagement')}
        >
          <Text style={styles.actionIcon}>📝</Text>
          <Text style={styles.actionTitle}>Update Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('LowStock')}
        >
          <Text style={styles.actionIcon}>⚠️</Text>
          <Text style={styles.actionTitle}>Low Stock Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('IngredientTracking')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Track Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Add new ingredient feature will be available soon!')}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionTitle}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => {
    let title = 'No Inventory Items';
    let message = 'Start by adding your first inventory item';
    let icon = '📦';

    if (selectedFilter !== 'all') {
      const filter = filters.find(f => f.key === selectedFilter);
      title = `No ${filter?.label} Items`;
      message = `No items match the ${filter?.label.toLowerCase()} filter`;
      icon = filter?.icon || '📦';
    }

    return (
      <EmptyState
        title={title}
        message={message}
        icon={icon}
      />
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredInventory = getFilteredInventory();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Inventory Management"
        subtitle={`${filteredInventory.length} items`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderFilterTabs()}
        {renderInventoryMetrics()}
        {renderQuickActions()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory Items</Text>
          {filteredInventory.length === 0 ? (
            renderEmptyState()
          ) : (
            filteredInventory.map((item) => renderInventoryItem({ item }))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  filterContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  filterLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterLabel: {
    color: colors.white,
  },
  metricsGrid: {
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    ...globalStyles.shadow,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  metricTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  metricValue: {
    ...typography.h2,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  inventoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  itemStatus: {
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  itemDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stockInfo: {
    flex: 1,
  },
  stockLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  stockValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  itemFooter: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemCost: {
    flex: 1,
  },
  costLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  costValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  itemSupplier: {
    flex: 1,
  },
  supplierLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  supplierValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
});

export default InventoryScreen; 