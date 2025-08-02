import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-001 has been placed',
      time: '2 minutes ago',
      type: 'order',
      isRead: false,
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Chicken breast is running low',
      time: '1 hour ago',
      type: 'inventory',
      isRead: false,
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment of $24.99 has been processed',
      time: '3 hours ago',
      type: 'payment',
      isRead: true,
    },
    {
      id: '4',
      title: 'Menu Update',
      message: 'Pizza Margherita has been updated',
      time: '1 day ago',
      type: 'menu',
      isRead: true,
    },
  ]);

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.isRead).length;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <Text style={styles.headerSubtitle}>
        {getUnreadCount()} unread notifications
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.actions}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => {
          setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({ ...notification, isRead: true }))
          );
        }}
      >
        <Text style={styles.actionButtonText}>Mark All as Read</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No notifications</Text>
      <Text style={styles.emptyStateSubtext}>
        You're all caught up!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
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
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
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
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  actions: {
    padding: 20,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
  },
});

export default NotificationsScreen;
