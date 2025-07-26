import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const NotificationSettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    // General Notifications
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Order Notifications
    newOrderAlerts: true,
    orderStatusUpdates: true,
    orderCancellations: true,
    orderModifications: true,
    orderReadyAlerts: true,
    
    // Business Notifications
    lowStockAlerts: true,
    inventoryUpdates: true,
    revenueReports: true,
    paymentNotifications: true,
    payoutAlerts: true,
    
    // Customer Notifications
    customerReviews: true,
    customerMessages: true,
    customerComplaints: true,
    customerFeedback: true,
    
    // System Notifications
    appUpdates: true,
    maintenanceAlerts: true,
    systemAnnouncements: true,
    featureUpdates: true,
    
    // Marketing Notifications
    promotionalOffers: false,
    seasonalCampaigns: false,
    partnerPromotions: false,
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietHoursStart: '10:00 PM',
    quietHoursEnd: '8:00 AM',
    
    // Notification Frequency
    notificationFrequency: 'immediate', // immediate, hourly, daily, weekly
  });

  // Mock notification settings data
  const mockNotificationSettings = {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    newOrderAlerts: true,
    orderStatusUpdates: true,
    orderCancellations: true,
    orderModifications: true,
    orderReadyAlerts: true,
    lowStockAlerts: true,
    inventoryUpdates: true,
    revenueReports: true,
    paymentNotifications: true,
    payoutAlerts: true,
    customerReviews: true,
    customerMessages: true,
    customerComplaints: true,
    customerFeedback: true,
    appUpdates: true,
    maintenanceAlerts: true,
    systemAnnouncements: true,
    featureUpdates: true,
    promotionalOffers: false,
    seasonalCampaigns: false,
    partnerPromotions: false,
    quietHoursEnabled: false,
    quietHoursStart: '10:00 PM',
    quietHoursEnd: '8:00 AM',
    notificationFrequency: 'immediate',
  };

  const notificationCategories = [
    {
      title: 'Order Notifications',
      icon: '📋',
      description: 'Notifications related to orders and order management',
      settings: [
        { key: 'newOrderAlerts', label: 'New Order Alerts', description: 'Get notified when new orders are received' },
        { key: 'orderStatusUpdates', label: 'Order Status Updates', description: 'Updates when order status changes' },
        { key: 'orderCancellations', label: 'Order Cancellations', description: 'Notifications when orders are cancelled' },
        { key: 'orderModifications', label: 'Order Modifications', description: 'Alerts when customers modify orders' },
        { key: 'orderReadyAlerts', label: 'Order Ready Alerts', description: 'Notify when orders are ready for pickup/delivery' },
      ]
    },
    {
      title: 'Business Notifications',
      icon: '💼',
      description: 'Notifications related to business operations and finances',
      settings: [
        { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Get notified when inventory is running low' },
        { key: 'inventoryUpdates', label: 'Inventory Updates', description: 'Updates about inventory changes' },
        { key: 'revenueReports', label: 'Revenue Reports', description: 'Daily/weekly revenue summaries' },
        { key: 'paymentNotifications', label: 'Payment Notifications', description: 'Payment confirmations and updates' },
        { key: 'payoutAlerts', label: 'Payout Alerts', description: 'Notifications about payouts and transfers' },
      ]
    },
    {
      title: 'Customer Notifications',
      icon: '👥',
      description: 'Notifications related to customer interactions',
      settings: [
        { key: 'customerReviews', label: 'Customer Reviews', description: 'New customer reviews and ratings' },
        { key: 'customerMessages', label: 'Customer Messages', description: 'Direct messages from customers' },
        { key: 'customerComplaints', label: 'Customer Complaints', description: 'Customer complaints and issues' },
        { key: 'customerFeedback', label: 'Customer Feedback', description: 'General customer feedback' },
      ]
    },
    {
      title: 'System Notifications',
      icon: '⚙️',
      description: 'System updates and maintenance notifications',
      settings: [
        { key: 'appUpdates', label: 'App Updates', description: 'New app versions and updates' },
        { key: 'maintenanceAlerts', label: 'Maintenance Alerts', description: 'System maintenance notifications' },
        { key: 'systemAnnouncements', label: 'System Announcements', description: 'Important system announcements' },
        { key: 'featureUpdates', label: 'Feature Updates', description: 'New features and improvements' },
      ]
    },
    {
      title: 'Marketing Notifications',
      icon: '📢',
      description: 'Promotional and marketing communications',
      settings: [
        { key: 'promotionalOffers', label: 'Promotional Offers', description: 'Special offers and promotions' },
        { key: 'seasonalCampaigns', label: 'Seasonal Campaigns', description: 'Seasonal marketing campaigns' },
        { key: 'partnerPromotions', label: 'Partner Promotions', description: 'Promotions from partner businesses' },
      ]
    },
  ];

  const frequencyOptions = [
    { key: 'immediate', label: 'Immediate', description: 'Receive notifications instantly' },
    { key: 'hourly', label: 'Hourly Digest', description: 'Receive notifications every hour' },
    { key: 'daily', label: 'Daily Digest', description: 'Receive notifications once per day' },
    { key: 'weekly', label: 'Weekly Digest', description: 'Receive notifications once per week' },
  ];

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotificationSettings(mockNotificationSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange = (settingKey, value) => {
    setNotificationSettings(prev => ({ ...prev, [settingKey]: value }));
  };

  const handleFrequencyChange = (frequency) => {
    setNotificationSettings(prev => ({ ...prev, notificationFrequency: frequency }));
  };

  const handleQuietHoursToggle = (enabled) => {
    setNotificationSettings(prev => ({ ...prev, quietHoursEnabled: enabled }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Notification settings updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestNotification = () => {
    Alert.alert(
      'Test Notification',
      'This is a test notification to verify your settings are working correctly.',
      [{ text: 'OK' }]
    );
  };

  const renderNotificationMethod = (method, label, description) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={notificationSettings[method]}
        onValueChange={(value) => handleToggleChange(method, value)}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={notificationSettings[method] ? colors.white : colors.textSecondary}
      />
    </View>
  );

  const renderNotificationCategory = (category) => (
    <View key={category.title} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>

      {category.settings.map((setting) => (
        <View key={setting.key} style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>{setting.label}</Text>
            <Text style={styles.settingDescription}>{setting.description}</Text>
          </View>
          <Switch
            value={notificationSettings[setting.key]}
            onValueChange={(value) => handleToggleChange(setting.key, value)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={notificationSettings[setting.key] ? colors.white : colors.textSecondary}
          />
        </View>
      ))}
    </View>
  );

  const renderFrequencySelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notification Frequency</Text>
      <Text style={styles.sectionDescription}>
        Choose how often you want to receive notifications
      </Text>
      
      {frequencyOptions.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.frequencyOption,
            notificationSettings.notificationFrequency === option.key && styles.selectedFrequencyOption,
          ]}
          onPress={() => handleFrequencyChange(option.key)}
        >
          <View style={styles.frequencyInfo}>
            <Text style={[
              styles.frequencyLabel,
              notificationSettings.notificationFrequency === option.key && styles.selectedFrequencyLabel,
            ]}>
              {option.label}
            </Text>
            <Text style={[
              styles.frequencyDescription,
              notificationSettings.notificationFrequency === option.key && styles.selectedFrequencyDescription,
            ]}>
              {option.description}
            </Text>
          </View>
          {notificationSettings.notificationFrequency === option.key && (
            <Text style={styles.selectedIcon}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuietHours = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quiet Hours</Text>
      <Text style={styles.sectionDescription}>
        Set quiet hours when you don't want to receive notifications
      </Text>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Enable Quiet Hours</Text>
          <Text style={styles.settingDescription}>
            Mute notifications during specified hours
          </Text>
        </View>
        <Switch
          value={notificationSettings.quietHoursEnabled}
          onValueChange={handleQuietHoursToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={notificationSettings.quietHoursEnabled ? colors.white : colors.textSecondary}
        />
      </View>

      {notificationSettings.quietHoursEnabled && (
        <View style={styles.quietHoursContainer}>
          <View style={styles.timeRow}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => Alert.alert('Coming Soon', 'Time picker will be available soon!')}
              >
                <Text style={styles.timePickerText}>{notificationSettings.quietHoursStart}</Text>
                <Text style={styles.timePickerIcon}>🕐</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>End Time</Text>
              <TouchableOpacity
                style={styles.timePicker}
                onPress={() => Alert.alert('Coming Soon', 'Time picker will be available soon!')}
              >
                <Text style={styles.timePickerText}>{notificationSettings.quietHoursEnd}</Text>
                <Text style={styles.timePickerIcon}>🕐</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.testButton}
        onPress={handleTestNotification}
      >
        <Text style={styles.testButtonText}>Test Notification</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.disabledButton]}
        onPress={handleSaveSettings}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notification Settings"
        subtitle="Configure your notification preferences"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Methods</Text>
          {renderNotificationMethod('pushNotifications', 'Push Notifications', 'Receive notifications on your device')}
          {renderNotificationMethod('emailNotifications', 'Email Notifications', 'Receive notifications via email')}
          {renderNotificationMethod('smsNotifications', 'SMS Notifications', 'Receive notifications via text message')}
        </View>

        {notificationCategories.map(renderNotificationCategory)}
        {renderFrequencySelector()}
        {renderQuietHours()}
        {renderActionButtons()}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  categoryContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...globalStyles.shadow,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  frequencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    ...globalStyles.shadow,
  },
  selectedFrequencyOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  frequencyInfo: {
    flex: 1,
  },
  frequencyLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  frequencyDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  selectedFrequencyLabel: {
    color: colors.primary,
  },
  selectedFrequencyDescription: {
    color: colors.primary,
  },
  selectedIcon: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  quietHoursContainer: {
    marginTop: 16,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeContainer: {
    flex: 1,
  },
  timeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timePickerText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  timePickerIcon: {
    fontSize: 16,
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  testButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  testButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default NotificationSettingsScreen; 