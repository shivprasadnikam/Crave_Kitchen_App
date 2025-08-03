import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuOverviewService } from '../../services/menuService';

const MenuPreviewScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMenuPreviewData();
  }, []);

  const loadMenuPreviewData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorId || user?.id;
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      console.log(`[MENU PREVIEW] Loading menu preview data for vendor: ${vendorId}`);
      
      // Try to get both overview and featured items, but handle failures gracefully
      let overviewData = null;
      let featuredItems = [];

      try {
        const overviewResponse = await menuOverviewService.getMenuOverview(vendorId);
        overviewData = overviewResponse.data;
        console.log(`[MENU PREVIEW] Overview data retrieved successfully`);
      } catch (overviewError) {
        console.warn(`[MENU PREVIEW] Failed to get overview data:`, overviewError.message);
        // Provide fallback overview data
        overviewData = {
          totalItems: 0,
          availableItems: 0,
          totalCategories: 0,
          averagePrice: 0
        };
      }

      try {
        const featuredResponse = await menuOverviewService.getFeaturedItems(vendorId);
        featuredItems = featuredResponse.data || [];
        console.log(`[MENU PREVIEW] Featured items retrieved successfully: ${featuredItems.length} items`);
      } catch (featuredError) {
        console.warn(`[MENU PREVIEW] Failed to get featured items:`, featuredError.message);
        // Provide empty featured items array as fallback
        featuredItems = [];
      }

      setMenuData({
        overview: overviewData,
        featuredItems: featuredItems
      });
      
      console.log(`[MENU PREVIEW] Menu preview data loaded:`, {
        overviewStats: overviewData ? Object.keys(overviewData).length : 0,
        featuredItemsCount: featuredItems.length
      });
    } catch (error) {
      console.error('[MENU PREVIEW] Error loading menu preview data:', error);
      setError('Failed to load menu preview data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMenuPreviewData();
    setRefreshing(false);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuHeader}>
        <View style={styles.menuImageContainer}>
          {item.primaryImageUrl ? (
            <Text style={styles.menuImage}>🖼️</Text>
          ) : (
            <Text style={styles.menuImage}>🍽️</Text>
          )}
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuPrice}>₹{item.price}</Text>
          {item.hasDiscount && (
                          <Text style={styles.discountText}>
                Save ₹{(item.originalPrice - item.price).toFixed(2)}!
              </Text>
          )}
        </View>
      </View>
      <Text style={styles.menuDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.menuFooter}>
        <Text style={styles.menuCategory}>{item.categoryName}</Text>
        <View style={styles.menuBadges}>
          {item.isVegetarian && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌱 Veg</Text>
            </View>
          )}
          {item.isVegan && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌿 Vegan</Text>
            </View>
          )}
          {item.isGlutenFree && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌾 GF</Text>
            </View>
          )}
          {item.isSpicy && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌶️ Spicy</Text>
            </View>
          )}
          {item.isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>⭐ Featured</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderOverviewCard = () => {
    if (!menuData) return null;

    const { overview } = menuData;
    
    return (
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>Menu Overview</Text>
        <View style={styles.overviewStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{overview.totalItems}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{overview.totalCategories}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{overview.featuredItems?.length || 0}</Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>
        </View>
        <View style={styles.dietaryStats}>
          <Text style={styles.dietaryTitle}>Dietary Options</Text>
          <View style={styles.dietaryGrid}>
            <View style={styles.dietaryItem}>
              <Text style={styles.dietaryNumber}>{overview.vegetarianItems || 0}</Text>
              <Text style={styles.dietaryLabel}>Vegetarian</Text>
            </View>
            <View style={styles.dietaryItem}>
              <Text style={styles.dietaryNumber}>{overview.veganItems || 0}</Text>
              <Text style={styles.dietaryLabel}>Vegan</Text>
            </View>
            <View style={styles.dietaryItem}>
              <Text style={styles.dietaryNumber}>{overview.glutenFreeItems || 0}</Text>
              <Text style={styles.dietaryLabel}>Gluten-Free</Text>
            </View>
            <View style={styles.dietaryItem}>
              <Text style={styles.dietaryNumber}>{overview.spicyItems || 0}</Text>
              <Text style={styles.dietaryLabel}>Spicy</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading menu preview...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMenuPreviewData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuData?.featuredItems || []}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Menu Preview</Text>
              <Text style={styles.headerSubtitle}>How your menu appears to customers</Text>
            </View>

            {/* Overview Card */}
            {renderOverviewCard()}

            {/* Section Title */}
            <View style={styles.content}>
              <Text style={styles.sectionTitle}>Featured Items</Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No featured items</Text>
            <Text style={styles.emptyStateSubtext}>
              Mark items as featured to highlight them to customers
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
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
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  overviewCard: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  dietaryStats: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  dietaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  dietaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dietaryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  dietaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  dietaryLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
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
  menuImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuImage: {
    fontSize: 24,
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
    marginBottom: 2,
  },
  discountText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
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
    marginBottom: 8,
  },
  menuBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  featuredBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 10,
    color: '#856404',
    fontWeight: '600',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default MenuPreviewScreen;
