import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { THEME } from '../../styles/theme';

const RecentOrders = ({ 
  orders = [], 
  onOrderPress, 
  onViewAllPress,
  loading = false,
  maxItems = 5 
}) => {
  const defaultOrders = [
    {
      id: '1',
      orderNumber: '#ORD-001',
      customerName: 'John Doe',
      customerAvatar: null,
      items: ['Burger', 'Fries', 'Coke'],
      total: 24.99,
      status: 'pending',
      time: '2 min ago',
      itemCount: 3,
    },
    {
      id: '2',
      orderNumber: '#ORD-002',
      customerName: 'Jane Smith',
      customerAvatar: null,
      items: ['Pizza', 'Salad'],
      total: 18.50,
      status: 'preparing',
      time: '5 min ago',
      itemCount: 2,
    },
    {
      id: '3',
      orderNumber: '#ORD-003',
      customerName: 'Mike Johnson',
      customerAvatar: null,
      items: ['Chicken Wings', 'Beer'],
      total: 32.00,
      status: 'ready',
      time: '8 min ago',
      itemCount: 2,
    },
  ];

  const displayOrders = orders.length > 0 ? orders.slice(0, maxItems) : defaultOrders;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return THEME.colors.STATUS.PENDING;
      case 'confirmed':
        return THEME.colors.STATUS.CONFIRMED;
      case 'preparing':
        return THEME.colors.STATUS.PREPARING;
      case 'ready':
        return THEME.colors.STATUS.READY;
      case 'delivered':
        return THEME.colors.STATUS.DELIVERED;
      case 'cancelled':
        return THEME.colors.STATUS.CANCELLED;
      default:
        return THEME.colors.TEXT.SECONDARY;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => onOrderPress && onOrderPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderTime}>{item.time}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        {item.customerAvatar ? (
          <Image source={{ uri: item.customerAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.customerName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.customerDetails}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.itemCount}>{item.itemCount} items</Text>
        </View>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsText} numberOfLines={1}>
          {item.items.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderLoadingItem = () => (
    <View style={styles.orderCard}>
      <View style={styles.loadingShimmer} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
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
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={displayOrders}
        renderItem={renderOrderItem}
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
  orderCard: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    marginBottom: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.MD,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  orderTime: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginTop: THEME.spacing.XS,
  },
  statusBadge: {
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  statusText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.SM,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.ROUND,
    marginRight: THEME.spacing.SM,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.ROUND,
    backgroundColor: THEME.colors.PRIMARY.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.SM,
  },
  avatarText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '500',
  },
  itemCount: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginTop: THEME.spacing.XS,
  },
  orderTotal: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.SECONDARY,
    paddingTop: THEME.spacing.SM,
  },
  itemsText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
  loadingShimmer: {
    height: 100,
    backgroundColor: THEME.colors.GRAY[200],
    borderRadius: THEME.borderRadius.SM,
  },
});

export default RecentOrders; 