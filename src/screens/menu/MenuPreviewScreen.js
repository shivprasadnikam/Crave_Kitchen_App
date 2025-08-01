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

const MenuPreviewScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      name: 'Pizza Margherita',
      price: '$12.99',
      description: 'Classic Italian pizza with tomato sauce and mozzarella',
      category: 'Main Course',
      image: '🍕',
    },
    {
      id: '2',
      name: 'Chicken Burger',
      price: '$8.99',
      description: 'Grilled chicken burger with fresh vegetables',
      category: 'Fast Food',
      image: '🍔',
    },
    {
      id: '3',
      name: 'Pasta Carbonara',
      price: '$14.99',
      description: 'Creamy pasta with bacon and parmesan',
      category: 'Main Course',
      image: '🍝',
    },
    {
      id: '4',
      name: 'Caesar Salad',
      price: '$9.99',
      description: 'Fresh romaine lettuce with caesar dressing',
      category: 'Appetizers',
      image: '🥗',
    },
    {
      id: '5',
      name: 'Chocolate Cake',
      price: '$6.99',
      description: 'Rich chocolate cake with vanilla ice cream',
      category: 'Desserts',
      image: '🍰',
    },
  ];

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuImage}>{item.image}</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuPrice}>{item.price}</Text>
        </View>
      </View>
      <Text style={styles.menuDescription}>{item.description}</Text>
      <View style={styles.menuFooter}>
        <Text style={styles.menuCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu Preview</Text>
          <Text style={styles.headerSubtitle}>How your menu appears to customers</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.content}>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuList}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MenuManagement')}
          >
            <Text style={styles.actionButtonText}>Edit Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddMenuItem')}
          >
            <Text style={styles.actionButtonText}>Add Item</Text>
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
  menuList: {
    gap: 16,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  menuImage: {
    fontSize: 32,
    marginRight: 12,
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  menuCategory: {
    fontSize: 12,
    color: '#999999',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
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

export default MenuPreviewScreen;
