import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

const IngredientTrackingScreen = ({ navigation }) => {
  const ingredients = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      quantity: 25,
      unit: 'kg',
      expiryDate: '2024-01-20',
      status: 'Good',
      supplier: 'Fresh Farms',
    },
    {
      id: '2',
      name: 'Mozzarella Cheese',
      quantity: 15,
      unit: 'kg',
      expiryDate: '2024-01-25',
      status: 'Good',
      supplier: 'Dairy Co.',
    },
    {
      id: '3',
      name: 'Fresh Basil',
      quantity: 1.5,
      unit: 'kg',
      expiryDate: '2024-01-18',
      status: 'Expiring Soon',
      supplier: 'Herb Garden',
    },
    {
      id: '4',
      name: 'Olive Oil',
      quantity: 8,
      unit: 'L',
      expiryDate: '2024-06-15',
      status: 'Good',
      supplier: 'Oil Suppliers',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good':
        return '#4CAF50';
      case 'Expiring Soon':
        return '#FFA500';
      case 'Expired':
        return '#FF4444';
      default:
        return '#666666';
    }
  };

  const renderIngredient = ({ item }) => (
    <View style={styles.ingredientCard}>
      <View style={styles.ingredientHeader}>
        <Text style={styles.ingredientName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientQuantity}>
          {item.quantity} {item.unit}
        </Text>
        <Text style={styles.ingredientExpiry}>Expires: {item.expiryDate}</Text>
      </View>
      
      <View style={styles.supplierInfo}>
        <Text style={styles.supplierLabel}>Supplier:</Text>
        <Text style={styles.supplierName}>{item.supplier}</Text>
      </View>
      
      <View style={styles.ingredientActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Update Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Track Consumption</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ingredient Tracking</Text>
          <Text style={styles.headerSubtitle}>Monitor ingredient usage and expiry</Text>
        </View>

        {/* Ingredients List */}
        <View style={styles.content}>
          <FlatList
            data={ingredients}
            renderItem={renderIngredient}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ingredientsList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('StockManagement')}
          >
            <Text style={styles.quickActionText}>View Stock Levels</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('LowStock')}
          >
            <Text style={styles.quickActionText}>Low Stock Alerts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ingredientInfo: {
    marginBottom: 12,
  },
  ingredientQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  ingredientExpiry: {
    fontSize: 14,
    color: '#666666',
  },
  supplierInfo: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
  },
  supplierLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 2,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  ingredientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IngredientTrackingScreen;
