import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { THEME } from '../../styles/theme';

const LowStockAlert = ({ 
  items = [], 
  onItemPress, 
  onRestockPress,
  onViewAllPress,
  loading = false,
  maxItems = 3 
}) => {
  const defaultItems = [
    {
      id: '1',
      name: 'Chicken Breast',
      currentStock: 5,
      minStock: 10,
      unit: 'kg',
      category: 'Meat',
      lastUpdated: '2 hours ago',
      priority: 'high',
    },
    {
      id: '2',
      name: 'Tomatoes',
      currentStock: 8,
      minStock: 15,
      unit: 'kg',
      category: 'Vegetables',
      lastUpdated: '1 hour ago',
      priority: 'medium',
    },
    {
      id: '3',
      name: 'Cheese',
      currentStock: 3,
      minStock: 8,
      unit: 'kg',
      category: 'Dairy',
      lastUpdated: '30 min ago',
      priority: 'high',
    },
  ];

  const displayItems = items.length > 0 ? items.slice(0, maxItems) : defaultItems;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return THEME.colors.ERROR.MAIN;
      case 'medium':
        return THEME.colors.WARNING.MAIN;
      case 'low':
        return THEME.colors.INFO.MAIN;
      default:
        return THEME.colors.TEXT.SECONDARY;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Critical';
      case 'medium':
        return 'Low';
      case 'low':
        return 'Warning';
      default:
        return 'Unknown';
    }
  };

  const getStockPercentage = (current, min) => {
    return Math.round((current / min) * 100);
  };

  const handleRestockPress = (item) => {
    if (onRestockPress) {
      onRestockPress(item);
    } else {
      Alert.alert(
        'Restock Item',
        `Would you like to restock ${item.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Restock', onPress: () => console.log('Restock pressed for:', item.name) },
        ]
      );
    }
  };

  const renderStockItem = ({ item }) => (
    <View style={styles.stockCard}>
      <View style={styles.stockHeader}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{getPriorityText(item.priority)}</Text>
        </View>
      </View>

      <View style={styles.stockDetails}>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Current Stock:</Text>
          <Text style={styles.stockValue}>
            {item.currentStock} {item.unit}
          </Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockLabel}>Min Required:</Text>
          <Text style={styles.stockValue}>
            {item.minStock} {item.unit}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(getStockPercentage(item.currentStock, item.minStock), 100)}%`,
                backgroundColor: getPriorityColor(item.priority)
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {getStockPercentage(item.currentStock, item.minStock)}% of minimum
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.lastUpdated}>Updated: {item.lastUpdated}</Text>
        <TouchableOpacity
          style={[styles.restockButton, { backgroundColor: getPriorityColor(item.priority) }]}
          onPress={() => handleRestockPress(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.restockButtonText}>Restock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLoadingItem = () => (
    <View style={styles.stockCard}>
      <View style={styles.loadingShimmer} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Low Stock Alerts</Text>
        <FlatList
          data={[1, 2, 3]}
          renderItem={renderLoadingItem}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Low Stock Alerts</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={displayItems}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: THEME.spacing.MD,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
  },
  sectionTitle: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
  },
  viewAllText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: THEME.spacing.MD,
  },
  stockCard: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.MD,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  itemCategory: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginTop: THEME.spacing.XS,
  },
  priorityBadge: {
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  priorityText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  stockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.MD,
  },
  stockInfo: {
    alignItems: 'center',
  },
  stockLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  stockValue: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: THEME.spacing.MD,
  },
  progressBar: {
    height: 6,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.ROUND,
    marginBottom: THEME.spacing.XS,
  },
  progressFill: {
    height: '100%',
    borderRadius: THEME.borderRadius.ROUND,
  },
  progressText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastUpdated: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  restockButton: {
    paddingHorizontal: THEME.spacing.MD,
    paddingVertical: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.MD,
  },
  restockButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  loadingShimmer: {
    height: 120,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.SM,
  },
});

export default LowStockAlert; 