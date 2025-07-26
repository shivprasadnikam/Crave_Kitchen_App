import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RestaurantSettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    restaurantName: '',
    restaurantLogo: null,
    cuisineType: '',
    description: '',
    tags: [],
    
    // Contact Information
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Delivery Settings
    deliveryEnabled: true,
    pickupEnabled: true,
    deliveryRadius: '5',
    deliveryFee: '3.50',
    minimumOrder: '15.00',
    freeDeliveryThreshold: '25.00',
    deliveryTime: '30-45',
    
    // Order Settings
    maxOrderValue: '100.00',
    advanceOrderHours: '24',
    orderPreparationTime: '20',
    autoAcceptOrders: false,
    requireCustomerConfirmation: true,
    
    // Payment Settings
    acceptCash: true,
    acceptCard: true,
    acceptDigitalWallet: true,
    requirePrepayment: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    
    // Display Settings
    showNutritionInfo: true,
    showAllergenInfo: true,
    showCalories: true,
    showPopularItems: true,
    
    // Business Settings
    autoCloseWhenBusy: false,
    maxConcurrentOrders: '10',
    busyThreshold: '15',
  });
  const [errors, setErrors] = useState({});

  // Mock settings data
  const mockSettings = {
    restaurantName: 'Smith\'s Delicious Kitchen',
    restaurantLogo: null,
    cuisineType: 'American, Italian',
    description: 'A family-owned restaurant serving delicious American and Italian cuisine with fresh, locally-sourced ingredients.',
    tags: ['Family-friendly', 'Fresh ingredients', 'Local'],
    phone: '+1 (555) 123-4567',
    email: 'info@smithskitchen.com',
    website: 'www.smithskitchen.com',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    deliveryEnabled: true,
    pickupEnabled: true,
    deliveryRadius: '5',
    deliveryFee: '3.50',
    minimumOrder: '15.00',
    freeDeliveryThreshold: '25.00',
    deliveryTime: '30-45',
    maxOrderValue: '100.00',
    advanceOrderHours: '24',
    orderPreparationTime: '20',
    autoAcceptOrders: false,
    requireCustomerConfirmation: true,
    acceptCash: true,
    acceptCard: true,
    acceptDigitalWallet: true,
    requirePrepayment: false,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    showNutritionInfo: true,
    showAllergenInfo: true,
    showCalories: true,
    showPopularItems: true,
    autoCloseWhenBusy: false,
    maxConcurrentOrders: '10',
    busyThreshold: '15',
  };

  const cuisineTypes = [
    'American',
    'Italian',
    'Mexican',
    'Chinese',
    'Japanese',
    'Indian',
    'Thai',
    'Mediterranean',
    'French',
    'Greek',
    'Other',
  ];

  const popularTags = [
    'Family-friendly',
    'Fresh ingredients',
    'Local',
    'Organic',
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Halal',
    'Kosher',
    'Quick service',
    'Fine dining',
    'Casual',
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings(mockSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleToggleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag) => {
    setSettings(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!settings.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    if (!settings.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!settings.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(settings.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!settings.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!settings.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!settings.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!settings.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (settings.website && !validators.isValidUrl(settings.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (parseFloat(settings.deliveryFee) < 0) {
      newErrors.deliveryFee = 'Delivery fee cannot be negative';
    }

    if (parseFloat(settings.minimumOrder) < 0) {
      newErrors.minimumOrder = 'Minimum order cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSettings = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Restaurant settings updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const renderInput = (field, label, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={settings[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor={colors.textSecondary}
        keyboardType={options.keyboardType || 'default'}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
        maxLength={options.maxLength}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderSwitch = (field, label, description) => (
    <View style={styles.switchContainer}>
      <View style={styles.switchInfo}>
        <Text style={styles.switchLabel}>{label}</Text>
        {description && <Text style={styles.switchDescription}>{description}</Text>}
      </View>
      <Switch
        value={settings[field]}
        onValueChange={(value) => handleToggleChange(field, value)}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={settings[field] ? colors.white : colors.textSecondary}
      />
    </View>
  );

  const renderCuisineSelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Cuisine Type</Text>
      <View style={styles.pickerContainer}>
        {cuisineTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.pickerOption,
              settings.cuisineType.includes(type) && styles.selectedPickerOption,
            ]}
            onPress={() => handleInputChange('cuisineType', type)}
          >
            <Text style={[
              styles.pickerOptionText,
              settings.cuisineType.includes(type) && styles.selectedPickerOptionText,
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTagsSelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Restaurant Tags</Text>
      <View style={styles.tagsContainer}>
        {popularTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagOption,
              settings.tags.includes(tag) && styles.selectedTagOption,
            ]}
            onPress={() => handleTagToggle(tag)}
          >
            <Text style={[
              styles.tagOptionText,
              settings.tags.includes(tag) && styles.selectedTagOptionText,
            ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderGeneralSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>General Information</Text>
      {renderInput('restaurantName', 'Restaurant Name *', 'Enter restaurant name')}
      {renderCuisineSelector()}
      {renderInput('description', 'Description', 'Describe your restaurant...', {
        multiline: true,
        numberOfLines: 3,
        maxLength: 500,
      })}
      {renderTagsSelector()}
    </View>
  );

  const renderContactSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      {renderInput('phone', 'Phone Number *', 'Enter phone number', { keyboardType: 'phone-pad' })}
      {renderInput('email', 'Email Address *', 'Enter email address', { keyboardType: 'email-address' })}
      {renderInput('website', 'Website', 'https://www.example.com', { keyboardType: 'url' })}
      {renderInput('address', 'Address *', 'Enter street address')}
      <View style={styles.row}>
        {renderInput('city', 'City *', 'Enter city')}
        {renderInput('state', 'State *', 'Enter state')}
      </View>
      {renderInput('zipCode', 'ZIP Code *', 'Enter ZIP code')}
    </View>
  );

  const renderDeliverySettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Delivery Settings</Text>
      {renderSwitch('deliveryEnabled', 'Enable Delivery', 'Allow customers to order for delivery')}
      {renderSwitch('pickupEnabled', 'Enable Pickup', 'Allow customers to order for pickup')}
      
      {settings.deliveryEnabled && (
        <>
          {renderInput('deliveryRadius', 'Delivery Radius (miles)', '5', { keyboardType: 'decimal-pad' })}
          {renderInput('deliveryFee', 'Delivery Fee ($)', '3.50', { keyboardType: 'decimal-pad' })}
          {renderInput('freeDeliveryThreshold', 'Free Delivery Threshold ($)', '25.00', { keyboardType: 'decimal-pad' })}
          {renderInput('deliveryTime', 'Delivery Time (minutes)', '30-45')}
        </>
      )}
      
      {renderInput('minimumOrder', 'Minimum Order ($)', '15.00', { keyboardType: 'decimal-pad' })}
    </View>
  );

  const renderOrderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Settings</Text>
      {renderInput('maxOrderValue', 'Maximum Order Value ($)', '100.00', { keyboardType: 'decimal-pad' })}
      {renderInput('advanceOrderHours', 'Advance Order Hours', '24', { keyboardType: 'numeric' })}
      {renderInput('orderPreparationTime', 'Preparation Time (minutes)', '20', { keyboardType: 'numeric' })}
      {renderSwitch('autoAcceptOrders', 'Auto-Accept Orders', 'Automatically accept incoming orders')}
      {renderSwitch('requireCustomerConfirmation', 'Require Customer Confirmation', 'Ask customers to confirm large orders')}
      {renderInput('maxConcurrentOrders', 'Max Concurrent Orders', '10', { keyboardType: 'numeric' })}
      {renderInput('busyThreshold', 'Busy Threshold (orders)', '15', { keyboardType: 'numeric' })}
      {renderSwitch('autoCloseWhenBusy', 'Auto-Close When Busy', 'Temporarily close when order limit is reached')}
    </View>
  );

  const renderPaymentSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Settings</Text>
      {renderSwitch('acceptCash', 'Accept Cash', 'Allow cash payments')}
      {renderSwitch('acceptCard', 'Accept Credit/Debit Cards', 'Allow card payments')}
      {renderSwitch('acceptDigitalWallet', 'Accept Digital Wallets', 'Allow digital wallet payments')}
      {renderSwitch('requirePrepayment', 'Require Prepayment', 'Require payment before order preparation')}
    </View>
  );

  const renderNotificationSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      {renderSwitch('emailNotifications', 'Email Notifications', 'Receive notifications via email')}
      {renderSwitch('smsNotifications', 'SMS Notifications', 'Receive notifications via SMS')}
      {renderSwitch('pushNotifications', 'Push Notifications', 'Receive push notifications')}
      {renderSwitch('orderAlerts', 'Order Alerts', 'Get notified of new orders')}
      {renderSwitch('lowStockAlerts', 'Low Stock Alerts', 'Get notified when inventory is low')}
    </View>
  );

  const renderDisplaySettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Display Settings</Text>
      {renderSwitch('showNutritionInfo', 'Show Nutrition Information', 'Display nutrition facts on menu')}
      {renderSwitch('showAllergenInfo', 'Show Allergen Information', 'Display allergen information on menu')}
      {renderSwitch('showCalories', 'Show Calorie Count', 'Display calorie information on menu')}
      {renderSwitch('showPopularItems', 'Show Popular Items', 'Highlight popular menu items')}
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.actionButton, styles.saveButton, saving && styles.disabledButton]}
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
        title="Restaurant Settings"
        subtitle="Configure your restaurant preferences"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderGeneralSettings()}
          {renderContactSettings()}
          {renderDeliverySettings()}
          {renderOrderSettings()}
          {renderPaymentSettings()}
          {renderNotificationSettings()}
          {renderDisplaySettings()}
          {renderActionButtons()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  switchDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedPickerOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pickerOptionText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedPickerOptionText: {
    color: colors.white,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedTagOption: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  tagOptionText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedTagOptionText: {
    color: colors.white,
  },
  actionButtons: {
    marginTop: 24,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  saveButton: {
    backgroundColor: colors.primary,
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

export default RestaurantSettingsScreen; 