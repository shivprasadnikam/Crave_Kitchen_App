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

const PopularItemsScreen = ({ navigation }) => {
  const popularItems = [
    {
      id: '1',
      name: 'Pizza Margherita',
      image: '🍕',
      orders: 45,
      revenue: '$1,125.00',
      rating: 4.8,
      category: 'Pizza',
    },
    {
      id: '2',
      name: 'Chicken Burger',
      image: '🍔',
      orders: 38,
      revenue: '$950.00',
      rating: 4.6,
      category: 'Burgers',
    },
    {
      id: '3',
      name: 'Pasta Carbonara',
      image: '🍝',
      orders: 32,
      revenue: '$800.00',
      rating: 4.7,
      category: 'Pasta',
    },
    {
      id: '4',
      name: 'Caesar Salad',
      image: '🥗',
      orders: 28,
      revenue: '$560.00',
      rating: 4.5,
      category: 'Salads',
    },
    {
      id: '5',
      name: 'Chocolate Cake',
      image: '🍰',
      orders: 25,
      revenue: '$375.00',
      rating: 4.9,
      category: 'Desserts',
    },
    {
      id: '6',
      name: 'Coca Cola',
      image: '🥤',
      orders: 42,
      revenue: '$210.00',
      rating: 4.3,
      category: 'Beverages',
    },
  ];

  const renderPopularItem = ({ item, index }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
        <Text style={styles.itemImage}>{item.image}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.itemStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{item.orders}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statValue}>{item.revenue}</Text>
        </View>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Popular Items</Text>
          <Text style={styles.headerSubtitle}>Your best-performing menu items</Text>
        </View>

        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>210</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryValue}>$4,020</Text>
          </View>
        </View>

        {/* Popular Items List */}
        <View style={styles.content}>
          <FlatList
            data={popularItems}
            renderItem={renderPopularItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemsList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AnalyticsDashboard')}
          >
            <Text style={styles.quickActionText}>Back to Analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('MenuManagement')}
          >
            <Text style={styles.quickActionText}>Manage Menu</Text>
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
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  content: {
    padding: 20,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
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
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemImage: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 12,
    color: '#666666',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFA500',
  },
  itemStats: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemActions: {
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

export default PopularItemsScreen;
