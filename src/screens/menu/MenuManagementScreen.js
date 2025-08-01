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

const MenuManagementScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      name: 'Pizza Margherita',
      price: '$12.99',
      category: 'Main Course',
      status: 'Available',
    },
    {
      id: '2',
      name: 'Chicken Burger',
      price: '$8.99',
      category: 'Fast Food',
      status: 'Available',
    },
    {
      id: '3',
      name: 'Pasta Carbonara',
      price: '$14.99',
      category: 'Main Course',
      status: 'Out of Stock',
    },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuCard}
      onPress={() => navigation.navigate('EditMenuItem', { itemId: item.id })}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#FF4444' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.menuPrice}>{item.price}</Text>
      <Text style={styles.menuCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu Management</Text>
          <Text style={styles.headerSubtitle}>Manage your restaurant menu</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddMenuItem')}
          >
            <Text style={styles.addButtonText}>Add New Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => navigation.navigate('CategoryManagement')}
          >
            <Text style={styles.categoryButtonText}>Manage Categories</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Menu Items</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MenuPreview')}
          >
            <Text style={styles.actionButtonText}>Preview Menu</Text>
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
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  menuList: {
    gap: 12,
  },
  menuCard: {
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
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  menuCategory: {
    fontSize: 14,
    color: '#666666',
  },
  quickActions: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MenuManagementScreen;
