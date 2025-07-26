import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';
import { NotificationContext } from '../../context/NotificationContext';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../styles/globalStyles';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const VendorDashboardScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { orders, fetchOrders } = useContext(OrderContext);
  const { notifications, fetchNotifications } = useContext(NotificationContext);
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todayRevenue: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchOrders(),
        fetchNotifications(),
      ]);
      calculateStats();
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const today = new Date();
    const todayStart = dateUtils.startOfDay(today);
    const weekStart = dateUtils.startOfWeek(today);
    const monthStart = dateUtils.startOfMonth(today);

    const todayOrders = orders.filter(order => 
      new Date(order.createdAt) >= todayStart
    );
    const weekOrders = orders.filter(order => 
      new Date(order.createdAt) >= weekStart
    );
    const monthOrders = orders.filter(order => 
      new Date(order.createdAt) >= monthStart
    );

    setStats({
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      completedOrders: orders.filter(order => order.status === 'completed').length,
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.total, 0),
      weeklyRevenue: weekOrders.reduce((sum, order) => sum + order.total, 0),
      monthlyRevenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'newOrder':
        navigation.navigate('OrderList', { filter: 'pending' });
        break;
      case 'menuManagement':
        navigation.navigate('MenuManagement');
        break;
      case 'analytics':
        navigation.navigate('AnalyticsDashboard');
        break;
      case 'inventory':
        navigation.navigate('Inventory');
        break;
      case 'finances':
        navigation.navigate('Revenue');
        break;
      case 'settings':
        navigation.navigate('VendorProfile');
        break;
    }
  };

  const renderQuickStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pendingOrders}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.completedOrders}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatters.formatCurrency(stats.todayRevenue)}</Text>
          <Text style={styles.statLabel}>Today's Revenue</Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('newOrder')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
            <Text style={styles.actionIconText}>📋</Text>
          </View>
          <Text style={styles.actionLabel}>New Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('menuManagement')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
            <Text style={styles.actionIconText}>🍽️</Text>
          </View>
          <Text style={styles.actionLabel}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('analytics')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
            <Text style={styles.actionIconText}>📊</Text>
          </View>
          <Text style={styles.actionLabel}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('inventory')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.warning }]}>
            <Text style={styles.actionIconText}>📦</Text>
          </View>
          <Text style={styles.actionLabel}>Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('finances')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.info }]}>
            <Text style={styles.actionIconText}>💰</Text>
          </View>
          <Text style={styles.actionLabel}>Finances</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => handleQuickAction('settings')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.textSecondary }]}>
            <Text style={styles.actionIconText}>⚙️</Text>
          </View>
          <Text style={styles.actionLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentOrders = () => {
    const recentOrders = orders.slice(0, 5);
    
    return (
      <View style={styles.recentOrdersContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OrderList')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
            >
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
                <Text style={styles.orderTime}>
                  {dateUtils.formatTime(order.createdAt)}
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderItems}>
                  {order.items.length} items • {formatters.formatCurrency(order.total)}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <EmptyState
            title="No Orders Yet"
            message="Orders will appear here once customers start placing them"
            icon="📋"
          />
        )}
      </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'confirmed': return colors.info;
      case 'preparing': return colors.secondary;
      case 'ready': return colors.success;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${user?.restaurantName || 'Vendor'}`}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.notificationIcon}>🔔</Text>
            {notifications.filter(n => !n.read).length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>
                  {notifications.filter(n => !n.read).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderQuickStats()}
        {renderQuickActions()}
        {renderRecentOrders()}
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
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '31%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  recentOrdersContainer: {
    marginBottom: 24,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  orderTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItems: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default VendorDashboardScreen; 