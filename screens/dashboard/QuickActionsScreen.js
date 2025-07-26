import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../styles/globalStyles';
import Header from '../../components/common/Header';

const QuickActionsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { updateOrderStatus } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);

  const actionCategories = [
    {
      title: 'Orders',
      icon: '📋',
      color: colors.primary,
      actions: [
        {
          title: 'View New Orders',
          subtitle: 'Check pending orders',
          icon: '🆕',
          action: () => navigation.navigate('OrderList', { filter: 'pending' }),
        },
        {
          title: 'Order History',
          subtitle: 'View completed orders',
          icon: '📊',
          action: () => navigation.navigate('OrderHistory'),
        },
        {
          title: 'Today\'s Orders',
          subtitle: 'View today\'s activity',
          icon: '📅',
          action: () => navigation.navigate('OrderList', { filter: 'today' }),
        },
      ],
    },
    {
      title: 'Menu Management',
      icon: '🍽️',
      color: colors.secondary,
      actions: [
        {
          title: 'Add New Item',
          subtitle: 'Create new menu item',
          icon: '➕',
          action: () => navigation.navigate('AddMenuItem'),
        },
        {
          title: 'Edit Menu',
          subtitle: 'Modify existing items',
          icon: '✏️',
          action: () => navigation.navigate('MenuManagement'),
        },
        {
          title: 'Category Management',
          subtitle: 'Organize menu categories',
          icon: '📁',
          action: () => navigation.navigate('CategoryManagement'),
        },
        {
          title: 'Menu Preview',
          subtitle: 'See how customers view your menu',
          icon: '👁️',
          action: () => navigation.navigate('MenuPreview'),
        },
      ],
    },
    {
      title: 'Analytics & Reports',
      icon: '📈',
      color: colors.success,
      actions: [
        {
          title: 'Revenue Analytics',
          subtitle: 'View earnings and trends',
          icon: '💰',
          action: () => navigation.navigate('RevenueAnalytics'),
        },
        {
          title: 'Order Analytics',
          subtitle: 'Order patterns and insights',
          icon: '📊',
          action: () => navigation.navigate('OrderAnalytics'),
        },
        {
          title: 'Popular Items',
          subtitle: 'Best selling menu items',
          icon: '🔥',
          action: () => navigation.navigate('PopularItems'),
        },
        {
          title: 'Customer Analytics',
          subtitle: 'Customer behavior insights',
          icon: '👥',
          action: () => navigation.navigate('CustomerAnalytics'),
        },
      ],
    },
    {
      title: 'Inventory & Stock',
      icon: '📦',
      color: colors.warning,
      actions: [
        {
          title: 'Stock Management',
          subtitle: 'Manage inventory levels',
          icon: '📋',
          action: () => navigation.navigate('StockManagement'),
        },
        {
          title: 'Low Stock Alerts',
          subtitle: 'Items running low',
          icon: '⚠️',
          action: () => navigation.navigate('LowStock'),
        },
        {
          title: 'Ingredient Tracking',
          subtitle: 'Track ingredient usage',
          icon: '🥬',
          action: () => navigation.navigate('IngredientTracking'),
        },
      ],
    },
    {
      title: 'Finances',
      icon: '💳',
      color: colors.info,
      actions: [
        {
          title: 'Revenue Overview',
          subtitle: 'View earnings and payouts',
          icon: '💵',
          action: () => navigation.navigate('Revenue'),
        },
        {
          title: 'Payment History',
          subtitle: 'Track all transactions',
          icon: '📜',
          action: () => navigation.navigate('PaymentHistory'),
        },
        {
          title: 'Payout Settings',
          subtitle: 'Configure payment methods',
          icon: '🏦',
          action: () => navigation.navigate('Payout'),
        },
        {
          title: 'Financial Reports',
          subtitle: 'Generate detailed reports',
          icon: '📄',
          action: () => navigation.navigate('FinancialReports'),
        },
      ],
    },
    {
      title: 'Settings & Support',
      icon: '⚙️',
      color: colors.textSecondary,
      actions: [
        {
          title: 'Restaurant Profile',
          subtitle: 'Update restaurant details',
          icon: '🏪',
          action: () => navigation.navigate('VendorProfile'),
        },
        {
          title: 'Operating Hours',
          subtitle: 'Set business hours',
          icon: '🕒',
          action: () => navigation.navigate('OperatingHours'),
        },
        {
          title: 'Notification Settings',
          subtitle: 'Manage alerts and notifications',
          icon: '🔔',
          action: () => navigation.navigate('NotificationSettings'),
        },
        {
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: '❓',
          action: () => navigation.navigate('HelpCenter'),
        },
      ],
    },
  ];

  const handleAction = async (action) => {
    try {
      setLoading(true);
      await action();
    } catch (error) {
      Alert.alert('Error', 'Failed to perform action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (category) => (
    <View key={category.title} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Text style={styles.categoryIconText}>{category.icon}</Text>
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      
      <View style={styles.actionsList}>
        {category.actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={() => handleAction(action.action)}
            disabled={loading}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>{action.icon}</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Quick Actions"
        subtitle="Access all features quickly"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, {user?.restaurantName || 'Vendor'}!</Text>
          <Text style={styles.welcomeSubtitle}>
            Choose an action to get started or manage your restaurant
          </Text>
        </View>

        {actionCategories.map(renderCategory)}
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
  welcomeSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  welcomeTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  actionsList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 2,
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionArrow: {
    ...typography.body1,
    color: colors.textSecondary,
    fontSize: 18,
  },
});

export default QuickActionsScreen; 