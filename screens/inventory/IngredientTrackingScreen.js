import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const IngredientTrackingScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [usageData, setUsageData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock ingredient tracking data
  const mockIngredients = [
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 15,
      unit: 'kg',
      cost: 8.50,
      supplier: 'Fresh Foods Co.',
    },
    {
      id: '2',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 25,
      unit: 'kg',
      cost: 3.20,
      supplier: 'Local Market',
    },
    {
      id: '3',
      name: 'Olive Oil',
      category: 'Pantry',
      currentStock: 8,
      unit: 'L',
      cost: 12.00,
      supplier: 'Premium Oils',
    },
    {
      id: '4',
      name: 'Rice',
      category: 'Grains',
      currentStock: 50,
      unit: 'kg',
      cost: 2.50,
      supplier: 'Bulk Foods',
    },
    {
      id: '5',
      name: 'Cheese',
      category: 'Dairy',
      currentStock: 5,
      unit: 'kg',
      cost: 15.00,
      supplier: 'Dairy Delights',
    },
  ];

  const mockUsageData = [
    {
      id: '1',
      ingredientId: '1',
      ingredientName: 'Chicken Breast',
      quantity: 2.5,
      unit: 'kg',
      usageType: 'cooking',
      date: '2024-01-15T10:30:00Z',
      cost: 21.25,
      notes: 'Used for chicken curry',
    },
    {
      id: '2',
      ingredientId: '1',
      ingredientName: 'Chicken Breast',
      quantity: 1.8,
      unit: 'kg',
      usageType: 'cooking',
      date: '2024-01-14T16:45:00Z',
      cost: 15.30,
      notes: 'Used for grilled chicken',
    },
    {
      id: '3',
      ingredientId: '2',
      ingredientName: 'Tomatoes',
      quantity: 3.0,
      unit: 'kg',
      usageType: 'cooking',
      date: '2024-01-15T09:15:00Z',
      cost: 9.60,
      notes: 'Used for tomato sauce',
    },
    {
      id: '4',
      ingredientId: '3',
      ingredientName: 'Olive Oil',
      quantity: 0.5,
      unit: 'L',
      usageType: 'cooking',
      date: '2024-01-15T11:20:00Z',
      cost: 6.00,
      notes: 'Used for salad dressing',
    },
    {
      id: '5',
      ingredientId: '4',
      ingredientName: 'Rice',
      quantity: 5.0,
      unit: 'kg',
      usageType: 'cooking',
      date: '2024-01-15T12:00:00Z',
      cost: 12.50,
      notes: 'Used for rice dishes',
    },
    {
      id: '6',
      ingredientId: '5',
      ingredientName: 'Cheese',
      quantity: 1.2,
      unit: 'kg',
      usageType: 'cooking',
      date: '2024-01-15T13:30:00Z',
      cost: 18.00,
      notes: 'Used for pizza',
    },
  ];

  const periods = [
    { key: 'today', label: 'Today', icon: '📅' },
    { key: 'week', label: 'This Week', icon: '📆' },
    { key: 'month', label: 'This Month', icon: '🗓️' },
    { key: 'quarter', label: 'This Quarter', icon: '📊' },
  ];

  const { itemId } = route.params || {};

  useEffect(() => {
    loadTrackingData();
  }, [itemId, selectedPeriod]);

  const loadTrackingData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (itemId) {
        const item = mockIngredients.find(i => i.id === itemId);
        if (item) {
          setSelectedItem(item);
        }
      }
      
      setUsageData(mockUsageData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tracking data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTrackingData();
    setRefreshing(false);
  };

  const getFilteredUsageData = () => {
    let filtered = usageData;

    // Filter by selected item if specified
    if (selectedItem) {
      filtered = filtered.filter(usage => usage.ingredientId === selectedItem.id);
    }

    // Filter by period
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'today':
        startDate = dateUtils.startOfDay(now);
        break;
      case 'week':
        startDate = dateUtils.startOfWeek(now);
        break;
      case 'month':
        startDate = dateUtils.startOfMonth(now);
        break;
      case 'quarter':
        startDate = dateUtils.startOfQuarter(now);
        break;
      default:
        startDate = dateUtils.startOfWeek(now);
    }

    filtered = filtered.filter(usage => new Date(usage.date) >= startDate);

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(usage => 
        usage.ingredientName.toLowerCase().includes(query) ||
        usage.notes.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateUsageMetrics = () => {
    const filteredData = getFilteredUsageData();
    const totalUsage = filteredData.reduce((sum, usage) => sum + usage.quantity, 0);
    const totalCost = filteredData.reduce((sum, usage) => sum + usage.cost, 0);
    const averageUsage = filteredData.length > 0 ? totalUsage / filteredData.length : 0;

    return {
      totalUsage,
      totalCost,
      averageUsage,
      usageCount: filteredData.length,
    };
  };

  const getTopUsedIngredients = () => {
    const filteredData = getFilteredUsageData();
    const ingredientUsage = {};

    filteredData.forEach(usage => {
      if (ingredientUsage[usage.ingredientName]) {
        ingredientUsage[usage.ingredientName] += usage.quantity;
      } else {
        ingredientUsage[usage.ingredientName] = usage.quantity;
      }
    });

    return Object.entries(ingredientUsage)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  const renderPeriodSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.periodContainer}
      contentContainerStyle={styles.periodContent}
    >
      {periods.map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[styles.periodTab, selectedPeriod === period.key && styles.activePeriodTab]}
          onPress={() => setSelectedPeriod(period.key)}
        >
          <Text style={styles.periodIcon}>{period.icon}</Text>
          <Text style={[styles.periodLabel, selectedPeriod === period.key && styles.activePeriodLabel]}>
            {period.label}
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

  const renderUsageMetrics = () => {
    const metrics = calculateUsageMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Usage',
            `${metrics.totalUsage.toFixed(1)} ${selectedItem?.unit || 'units'}`,
            `${selectedPeriod} consumption`,
            colors.primary,
            '📊'
          )}
          {renderMetricCard(
            'Total Cost',
            formatters.formatCurrency(metrics.totalCost),
            `${selectedPeriod} spending`,
            colors.warning,
            '💰'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Avg. Usage',
            `${metrics.averageUsage.toFixed(1)} ${selectedItem?.unit || 'units'}`,
            'per usage',
            colors.info,
            '📈'
          )}
          {renderMetricCard(
            'Usage Count',
            metrics.usageCount,
            'times used',
            colors.success,
            '📋'
          )}
        </View>
      </View>
    );
  };

  const renderTopUsedIngredients = () => {
    const topIngredients = getTopUsedIngredients();
    
    if (topIngredients.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Used Ingredients</Text>
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>No usage data for this period</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Used Ingredients</Text>
        {topIngredients.map((ingredient, index) => (
          <View key={index} style={styles.topIngredientCard}>
            <View style={styles.ingredientRank}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.ingredientInfo}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientUsage}>{ingredient.quantity.toFixed(1)} units used</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderUsageItem = ({ item }) => (
    <View style={styles.usageCard}>
      <View style={styles.usageHeader}>
        <View style={styles.usageInfo}>
          <Text style={styles.usageIngredient}>{item.ingredientName}</Text>
          <Text style={styles.usageDate}>{dateUtils.formatDateTime(item.date)}</Text>
        </View>
        <View style={styles.usageQuantity}>
          <Text style={styles.quantityValue}>{item.quantity} {item.unit}</Text>
          <Text style={styles.quantityCost}>{formatters.formatCurrency(item.cost)}</Text>
        </View>
      </View>

      <View style={styles.usageDetails}>
        <View style={styles.usageType}>
          <Text style={styles.typeLabel}>Type:</Text>
          <Text style={styles.typeValue}>{item.usageType.charAt(0).toUpperCase() + item.usageType.slice(1)}</Text>
        </View>
        {item.notes && (
          <View style={styles.usageNotes}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesValue}>{item.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search usage records..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Add usage record feature will be available soon!')}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionTitle}>Add Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Usage reports will be available soon!')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Usage Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Inventory')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionTitle}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Usage analytics will be available soon!')}
        >
          <Text style={styles.actionIcon}>📈</Text>
          <Text style={styles.actionTitle}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => {
    let title = 'No Usage Data';
    let message = 'No ingredient usage records found for this period';
    let icon = '📊';

    if (searchQuery.trim()) {
      title = 'No Search Results';
      message = `No usage records match "${searchQuery}"`;
      icon = '🔍';
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

  const filteredUsageData = getFilteredUsageData();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Ingredient Tracking"
        subtitle={selectedItem ? selectedItem.name : 'Usage Analytics'}
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
        {renderPeriodSelector()}
        {renderUsageMetrics()}
        {renderTopUsedIngredients()}
        {renderQuickActions()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Records</Text>
          {renderSearchBar()}
          
          {filteredUsageData.length === 0 ? (
            renderEmptyState()
          ) : (
            filteredUsageData.map((usage) => renderUsageItem({ item: usage }))
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
  periodContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  periodContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  periodTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activePeriodTab: {
    backgroundColor: colors.primary,
  },
  periodIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  periodLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activePeriodLabel: {
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
  topIngredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    ...globalStyles.shadow,
  },
  ingredientRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  ingredientUsage: {
    ...typography.caption,
    color: colors.textSecondary,
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
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  usageCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  usageInfo: {
    flex: 1,
  },
  usageIngredient: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  usageDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  usageQuantity: {
    alignItems: 'flex-end',
  },
  quantityValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  quantityCost: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  usageDetails: {
    gap: 8,
  },
  usageType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: 8,
  },
  typeValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  usageNotes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: 8,
  },
  notesValue: {
    ...typography.body2,
    color: colors.textPrimary,
    flex: 1,
  },
  emptySection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  emptySectionText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default IngredientTrackingScreen; 