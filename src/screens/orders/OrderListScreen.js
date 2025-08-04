import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';

const OrderListScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [selectedStatus, searchQuery]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const vendorId = user?.vendorId || user?.id || 1;
      console.log(`[ORDER LIST] Loading orders for vendor: ${vendorId}, status: ${selectedStatus}`);
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      let response;
      
      // If there's a search query, use search endpoint
      if (searchQuery.trim()) {
        setIsSearching(true);
        response = await orderService.searchOrders(vendorId, searchQuery.trim());
        setIsSearching(false);
      } else if (selectedStatus === 'all') {
        response = await orderService.getAllOrders(vendorId);
      } else if (selectedStatus === 'pending') {
        response = await orderService.getPendingOrders(vendorId);
      } else if (selectedStatus === 'preparing') {
        response = await orderService.getPreparingOrders(vendorId);
      } else if (selectedStatus === 'ready') {
        response = await orderService.getReadyOrders(vendorId);
      } else if (selectedStatus === 'completed') {
        response = await orderService.getCompletedOrders(vendorId);
      } else if (selectedStatus === 'cancelled') {
        response = await orderService.getCancelledOrders(vendorId);
      } else {
        response = await orderService.getOrdersByStatus(vendorId, selectedStatus);
      }
      
      const ordersData = response.data?.content || [];
      console.log(`[ORDER LIST] Loaded ${ordersData.length} orders`);
      
      setOrders(ordersData);
    } catch (error) {
      console.error('[ORDER LIST] Error loading orders:', error);
      setError(error.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetail', { orderId: order.id });
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleOrderAction = async (order, action) => {
    try {
      const vendorId = user?.vendorId || user?.id || 1;
      
      switch (action) {
        case 'accept':
          await orderService.acceptOrder(order.id, vendorId);
          Alert.alert('Success', 'Order accepted successfully!');
          break;
        case 'start_preparing':
          await orderService.startPreparingOrder(order.id, vendorId);
          Alert.alert('Success', 'Order preparation started!');
          break;
        case 'mark_ready':
          await orderService.markOrderReady(order.id, vendorId);
          Alert.alert('Success', 'Order marked as ready!');
          break;
        case 'complete':
          await orderService.completeOrder(order.id, vendorId);
          Alert.alert('Success', 'Order completed!');
          break;
        case 'reject':
          Alert.prompt(
            'Reject Order',
            'Please provide a reason for rejection:',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Reject',
                style: 'destructive',
                onPress: async (reason) => {
                  await orderService.rejectOrder(order.id, vendorId, reason);
                  Alert.alert('Success', 'Order rejected!');
                }
              }
            ]
          );
          return;
        default:
          break;
      }
      
      // Refresh orders after action
      await loadOrders();
    } catch (error) {
      console.error('[ORDER LIST] Error performing order action:', error);
      Alert.alert('Error', error.message || 'Failed to perform action');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'preparing':
        return '#2196F3';
      case 'ready':
        return '#4CAF50';
      case 'completed':
        return '#9E9E9E';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search orders by customer name, order number..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999999"
      />
      {isSearching && (
        <ActivityIndicator size="small" color="#0EA5E9" style={styles.searchLoader} />
      )}
    </View>
  );

  const renderStatusFilter = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending', label: 'Pending' },
          { key: 'accepted', label: 'Accepted' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'ready', label: 'Ready' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedStatus === filter.key && styles.filterButtonActive
            ]}
            onPress={() => handleStatusFilter(filter.key)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedStatus === filter.key && styles.filterButtonTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderOrderActions = (order) => {
    const actions = [];
    
    switch (order.status) {
      case 'pending':
        actions.push(
          { label: 'Accept', action: 'accept', color: '#4CAF50' },
          { label: 'Reject', action: 'reject', color: '#F44336' }
        );
        break;
      case 'accepted':
        actions.push(
          { label: 'Start Preparing', action: 'start_preparing', color: '#2196F3' }
        );
        break;
      case 'preparing':
        actions.push(
          { label: 'Mark Ready', action: 'mark_ready', color: '#FF9800' }
        );
        break;
      case 'ready':
        actions.push(
          { label: 'Complete', action: 'complete', color: '#4CAF50' }
        );
        break;
    }
    
    if (actions.length === 0) return null;
    
    return (
      <View style={styles.actionButtons}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={() => handleOrderAction(order, action.action)}
          >
            <Text style={styles.actionButtonText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity onPress={() => handleOrderPress(item)}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>{item.orderNumber || `Order #${item.id}`}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        
        <View style={styles.orderInfo}>
          <Text style={styles.customerName}>{item.customerName || 'Customer'}</Text>
          <Text style={styles.orderTime}>
            {item.orderTime ? new Date(item.orderTime).toLocaleTimeString() : 'Recent'}
          </Text>
        </View>
        
        <View style={styles.orderItems}>
          <Text style={styles.itemsText}>
            {item.items ? 
              (Array.isArray(item.items) ? item.items.join(', ') : item.items) :
              `${item.totalItems || 0} items`
            }
          </Text>
        </View>
        
        <View style={styles.orderFooter}>
          <Text style={styles.totalAmount}>₹{item.totalAmount || item.total || 0}</Text>
        </View>
      </TouchableOpacity>
      
      {renderOrderActions(item)}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading activity...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} active orders
        </Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOrders}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {renderSearchBar()}
          {renderStatusFilter()}
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.ordersList, { paddingBottom: 80 + insets.bottom }]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No orders found</Text>
                <Text style={styles.emptyStateSubtext}>
                  {selectedStatus === 'all' ? 'New orders will appear here' : `No ${selectedStatus} orders found`}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 16,
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
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  ordersContainer: {
    flex: 1,
    padding: 20,
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderTime: {
    fontSize: 12,
    color: '#999999',
  },
  quickActions: {
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
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    color: '#FF6B35',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterButtonActive: {
    backgroundColor: '#0EA5E9',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderInfo: {
    marginBottom: 8,
  },
  itemsText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchLoader: {
    marginLeft: 8,
  },
});

export default OrderListScreen;
