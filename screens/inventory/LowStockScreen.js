import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
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

const LowStockScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock low stock data
  const mockLowStockItems = [
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
      priority: 'medium',
      daysUntilEmpty: 3,
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
      priority: 'high',
      daysUntilEmpty: 2,
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
      priority: 'urgent',
      daysUntilEmpty: 1,
    },
    {
      id: '6',
      name: 'Butter',
      category: 'Dairy',
      currentStock: 3,
      minStock: 8,
      unit: 'kg',
      cost: 6.50,
      supplier: 'Dairy Delights',
      lastUpdated: '2024-01-15T07:30:00Z',
      status: 'critical',
      priority: 'urgent',
      daysUntilEmpty: 1,
    },
    {
      id: '7',
      name: 'Onions',
      category: 'Vegetables',
      currentStock: 12,
      minStock: 15,
      unit: 'kg',
      cost: 2.00,
      supplier: 'Local Market',
      lastUpdated: '2024-01-15T09:00:00Z',
      status: 'low',
      priority: 'low',
      daysUntilEmpty: 4,
    },
  ];

  const filters = [
    { key: 'all', label: 'All Alerts', icon: '🚨' },
    { key: 'urgent', label: 'Urgent', icon: '🔥' },
    { key: 'high', label: 'High', icon: '⚠️' },
    { key: 'medium', label: 'Medium', icon: '📊' },
    { key: 'low', label: 'Low', icon: '📈' },
  ];

  useEffect(() => {
    loadLowStockItems();
  }, []);

  const loadLowStockItems = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLowStockItems(mockLowStockItems);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLowStockItems();
    setRefreshing(false);
  };

  const getFilteredItems = () => {
    if (selectedFilter === 'all') {
      return lowStockItems;
    }
    return lowStockItems.filter(item => item.priority === selectedFilter);
  };

  const calculateMetrics = () => {
    const totalAlerts = lowStockItems.length;
    const urgentAlerts = lowStockItems.filter(item => item.priority === 'urgent').length;
    const criticalItems = lowStockItems.filter(item => item.status === 'critical').length;
    const totalValue = lowStockItems.reduce((sum, item) => sum + (item.currentStock * item.cost), 0);

    return {
      totalAlerts,
      urgentAlerts,
      criticalItems,
      totalValue,
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return colors.error;
      case 'high': return colors.warning;
      case 'medium': return colors.secondary;
      case 'low': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return '🔥';
      case 'high': return '⚠️';
      case 'medium': return '📊';
      case 'low': return '📈';
      default: return '📦';
    }
  };

  const getDaysUntilEmptyColor = (days) => {
    if (days <= 1) return colors.error;
    if (days <= 2) return colors.warning;
    if (days <= 3) return colors.secondary;
    return colors.info;
  };

  const handleRestockItem = (item) => {
    Alert.alert(
      'Restock Item',
      `Would you like to restock ${item.name}?\n\nCurrent: ${item.currentStock} ${item.unit}\nMinimum: ${item.minStock} ${item.unit}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restock',
          onPress: () => navigation.navigate('StockManagement', { itemId: item.id }),
        },
      ]
    );
  };

  const handleContactSupplier = (item) => {
    Alert.alert(
      'Contact Supplier',
      `Contact ${item.supplier} for ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Alert.alert('Coming Soon', 'Phone integration will be available soon!'),
        },
        {
          text: 'Message',
          onPress: () => Alert.alert('Coming Soon', 'Messaging integration will be available soon!'),
        },
      ]
    );
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

  const renderMetrics = () => {
    const metrics = calculateMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Alerts',
            metrics.totalAlerts,
            'items need restocking',
            colors.primary,
            '🚨'
          )}
          {renderMetricCard(
            'Urgent',
            metrics.urgentAlerts,
            'critical items',
            colors.error,
            '🔥'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Critical',
            metrics.criticalItems,
            'out of stock soon',
            colors.warning,
            '⚠️'
          )}
          {renderMetricCard(
            'Value at Risk',
            formatters.formatCurrency(metrics.totalValue),
            'inventory value',
            colors.info,
            '💰'
          )}
        </View>
      </View>
    );
  };

  const renderLowStockItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
        <View style={styles.itemPriority}>
          <Text style={styles.priorityIcon}>{getPriorityIcon(item.priority)}</Text>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Current Stock:</Text>
          <Text style={[styles.stockValue, { color: getPriorityColor(item.priority) }]}>
            {item.currentStock} {item.unit}
          </Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Minimum Stock:</Text>
          <Text style={styles.stockValue}>{item.minStock} {item.unit}</Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Days Until Empty:</Text>
          <Text style={[styles.stockValue, { color: getDaysUntilEmptyColor(item.daysUntilEmpty) }]}>
            {item.daysUntilEmpty} days
          </Text>
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
          onPress={() => handleRestockItem(item)}
        >
          <Text style={styles.actionButtonText}>Restock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={() => handleContactSupplier(item)}
        >
          <Text style={styles.actionButtonText}>Contact Supplier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.info }]}
          onPress={() => navigation.navigate('StockManagement', { itemId: item.id })}
        >
          <Text style={styles.actionButtonText}>Update Stock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Bulk restock feature will be available soon!')}
        >
          <Text style={styles.actionIcon}>📦</Text>
          <Text style={styles.actionTitle}>Bulk Restock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Supplier contact list will be available soon!')}
        >
          <Text style={styles.actionIcon}>📞</Text>
          <Text style={styles.actionTitle}>Contact All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Restock history will be available soon!')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Restock History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Inventory')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionTitle}>Full Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => {
    let title = 'No Low Stock Alerts';
    let message = 'All inventory items are well stocked';
    let icon = '✅';

    if (selectedFilter !== 'all') {
      const filter = filters.find(f => f.key === selectedFilter);
      title = `No ${filter?.label} Alerts`;
      message = `No items match the ${filter?.label.toLowerCase()} priority`;
      icon = filter?.icon || '✅';
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

  const filteredItems = getFilteredItems();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Low Stock Alerts"
        subtitle={`${filteredItems.length} items need attention`}
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
        {renderMetrics()}
        {renderQuickActions()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Low Stock Items</Text>
          {filteredItems.length === 0 ? (
            renderEmptyState()
          ) : (
            filteredItems.map((item) => renderLowStockItem({ item }))
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
  itemCard: {
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
  itemPriority: {
    alignItems: 'center',
  },
  priorityIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  priorityText: {
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

export default LowStockScreen; 