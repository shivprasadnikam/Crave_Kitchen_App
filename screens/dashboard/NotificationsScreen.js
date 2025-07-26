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
import { NotificationContext } from '../../context/NotificationContext';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../styles/globalStyles';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const NotificationsScreen = ({ navigation }) => {
  const { notifications, fetchNotifications, markAsRead, deleteNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, orders, system

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      await fetchNotifications();
    } catch (error) {
      Alert.alert('Error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark notification as read');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNotification(notificationId);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete notification');
            }
          },
        },
      ]
    );
  };

  const handleNotificationPress = async (notification) => {
    // Mark as read if unread
    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'new_order':
        navigation.navigate('OrderDetail', { orderId: notification.data.orderId });
        break;
      case 'order_status_change':
        navigation.navigate('OrderDetail', { orderId: notification.data.orderId });
        break;
      case 'low_stock':
        navigation.navigate('LowStock');
        break;
      case 'payment_received':
        navigation.navigate('Revenue');
        break;
      case 'system_update':
        // No navigation needed for system updates
        break;
      default:
        break;
    }
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'orders':
        return notifications.filter(n => n.type.includes('order'));
      case 'system':
        return notifications.filter(n => n.type === 'system_update');
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_order':
        return '🆕';
      case 'order_status_change':
        return '📋';
      case 'low_stock':
        return '⚠️';
      case 'payment_received':
        return '💰';
      case 'system_update':
        return '🔔';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_order':
        return colors.primary;
      case 'order_status_change':
        return colors.info;
      case 'low_stock':
        return colors.warning;
      case 'payment_received':
        return colors.success;
      case 'system_update':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
          { key: 'orders', label: 'Orders', count: notifications.filter(n => n.type.includes('order')).length },
          { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system_update').length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.filterTab, filter === tab.key && styles.activeFilterTab]}
            onPress={() => setFilter(tab.key)}
          >
            <Text style={[styles.filterTabText, filter === tab.key && styles.activeFilterTabText]}>
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={[styles.filterBadge, filter === tab.key && styles.activeFilterBadge]}>
                <Text style={[styles.filterBadgeText, filter === tab.key && styles.activeFilterBadgeText]}>
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderNotification = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[styles.notificationCard, !notification.read && styles.unreadCard]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationHeader}>
        <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) }]}>
          <Text style={styles.notificationIconText}>
            {getNotificationIcon(notification.type)}
          </Text>
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.notificationTime}>
            {dateUtils.formatRelativeTime(notification.createdAt)}
          </Text>
        </View>
        <View style={styles.notificationActions}>
          {!notification.read && (
            <View style={styles.unreadIndicator} />
          )}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteNotification(notification.id)}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        subtitle={`${notifications.filter(n => !n.read).length} unread`}
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Mark All as Read',
              'Mark all notifications as read?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Mark All Read',
                  onPress: async () => {
                    try {
                      const unreadNotifications = notifications.filter(n => !n.read);
                      await Promise.all(unreadNotifications.map(n => markAsRead(n.id)));
                    } catch (error) {
                      Alert.alert('Error', 'Failed to mark all as read');
                    }
                  },
                },
              ]
            );
          }}>
            <Text style={styles.markAllReadText}>Mark All Read</Text>
          </TouchableOpacity>
        }
      />

      {renderFilterTabs()}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(renderNotification)
        ) : (
          <EmptyState
            title={filter === 'all' ? 'No Notifications' : `No ${filter} notifications`}
            message={filter === 'all' 
              ? 'You\'re all caught up! New notifications will appear here.'
              : `No ${filter} notifications to show.`
            }
            icon="🔔"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  markAllReadText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  filterContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: colors.white,
  },
  filterBadge: {
    backgroundColor: colors.textSecondary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  activeFilterBadge: {
    backgroundColor: colors.white,
  },
  filterBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
  activeFilterBadgeText: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  notificationTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  notificationActions: {
    alignItems: 'center',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginBottom: 8,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen; 