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

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-001 has been placed by John Doe',
      time: '2 minutes ago',
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $24.99 has been processed for order #ORD-001',
      time: '5 minutes ago',
      type: 'payment',
      read: false,
    },
    {
      id: '3',
      title: 'Low Stock Alert',
      message: 'Cheese inventory is running low. Consider reordering soon.',
      time: '1 hour ago',
      type: 'inventory',
      read: true,
    },
    {
      id: '4',
      title: 'Menu Update',
      message: 'Your menu has been successfully updated with 3 new items',
      time: '2 hours ago',
      type: 'menu',
      read: true,
    },
    {
      id: '5',
      title: 'Payout Processed',
      message: 'Your weekly payout of $1,250.00 has been processed',
      time: '1 day ago',
      type: 'payout',
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return '📋';
      case 'payment':
        return '💰';
      case 'inventory':
        return '📦';
      case 'menu':
        return '🍽️';
      case 'payout':
        return '💳';
      default:
        return '🔔';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => {
        // Handle notification tap
        console.log('Notification tapped:', item.id);
      }}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationIcon}>{getNotificationIcon(item.type)}</Text>
        <View style={styles.notificationInfo}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      
      <Text style={styles.notificationMessage}>{item.message}</Text>
      
      <View style={styles.notificationActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Mark Read</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>Stay updated with your business</Text>
        </View>

        {/* Notifications List */}
        <View style={styles.content}>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationsList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('VendorDashboard')}
          >
            <Text style={styles.quickActionText}>Back to Dashboard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => {
              // Mark all as read
              console.log('Mark all as read');
            }}
          >
            <Text style={styles.quickActionText}>Mark All Read</Text>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  unreadTitle: {
    fontWeight: 'bold',
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
  notificationActions: {
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

export default NotificationsScreen;
