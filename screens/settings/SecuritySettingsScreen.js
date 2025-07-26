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

const SecuritySettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    // Authentication Settings
    twoFactorAuth: false,
    biometricAuth: false,
    pinCode: false,
    rememberDevice: true,
    
    // Password Settings
    passwordLastChanged: '2024-01-15',
    passwordExpiryDays: 90,
    requireStrongPassword: true,
    preventCommonPasswords: true,
    
    // Session Settings
    autoLogout: true,
    sessionTimeout: 30, // minutes
    maxFailedAttempts: 5,
    lockoutDuration: 15, // minutes
    
    // Privacy Settings
    shareAnalytics: true,
    shareUsageData: false,
    allowMarketingEmails: false,
    allowPushNotifications: true,
    
    // Device Management
    trustedDevices: [],
    lastLoginLocation: 'New York, NY',
    lastLoginTime: '2024-01-15T14:30:00Z',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock security settings data
  const mockSecuritySettings = {
    twoFactorAuth: false,
    biometricAuth: true,
    pinCode: false,
    rememberDevice: true,
    passwordLastChanged: '2024-01-15',
    passwordExpiryDays: 90,
    requireStrongPassword: true,
    preventCommonPasswords: true,
    autoLogout: true,
    sessionTimeout: 30,
    maxFailedAttempts: 5,
    lockoutDuration: 15,
    shareAnalytics: true,
    shareUsageData: false,
    allowMarketingEmails: false,
    allowPushNotifications: true,
    trustedDevices: [
      { id: '1', name: 'iPhone 14', lastUsed: '2024-01-15T14:30:00Z', location: 'New York, NY' },
      { id: '2', name: 'MacBook Pro', lastUsed: '2024-01-14T10:15:00Z', location: 'New York, NY' },
    ],
    lastLoginLocation: 'New York, NY',
    lastLoginTime: '2024-01-15T14:30:00Z',
  };

  const sessionTimeoutOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 0, label: 'Never' },
  ];

  const failedAttemptsOptions = [
    { value: 3, label: '3 attempts' },
    { value: 5, label: '5 attempts' },
    { value: 10, label: '10 attempts' },
  ];

  const lockoutDurationOptions = [
    { value: 5, label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
  ];

  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecuritySettings(mockSecuritySettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load security settings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange = (settingKey, value) => {
    setSecuritySettings(prev => ({ ...prev, [settingKey]: value }));
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!validators.isValidPassword(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) {
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Password changed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowPasswordForm(false);
              setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
              setErrors({});
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Security settings updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update security settings');
    } finally {
      setSaving(false);
    }
  };

  const handleEnableTwoFactor = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'Two-factor authentication adds an extra layer of security to your account. Would you like to enable it?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Enable',
          onPress: () => {
            setSecuritySettings(prev => ({ ...prev, twoFactorAuth: true }));
            Alert.alert('Coming Soon', 'Two-factor authentication setup will be available soon!');
          },
        },
      ]
    );
  };

  const handleRemoveDevice = (deviceId) => {
    Alert.alert(
      'Remove Device',
      'Are you sure you want to remove this device from your trusted devices?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSecuritySettings(prev => ({
              ...prev,
              trustedDevices: prev.trustedDevices.filter(d => d.id !== deviceId)
            }));
          },
        },
      ]
    );
  };

  const renderSettingItem = (settingKey, label, description, options = {}) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={securitySettings[settingKey]}
        onValueChange={(value) => handleToggleChange(settingKey, value)}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={securitySettings[settingKey] ? colors.white : colors.textSecondary}
      />
    </View>
  );

  const renderAuthenticationSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Authentication</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
          <Text style={styles.settingDescription}>
            Add an extra layer of security with 2FA
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.twoFactorButton,
            securitySettings.twoFactorAuth && styles.enabledButton,
          ]}
          onPress={handleEnableTwoFactor}
        >
          <Text style={[
            styles.twoFactorButtonText,
            securitySettings.twoFactorAuth && styles.enabledButtonText,
          ]}>
            {securitySettings.twoFactorAuth ? 'Enabled' : 'Enable'}
          </Text>
        </TouchableOpacity>
      </View>

      {renderSettingItem('biometricAuth', 'Biometric Authentication', 'Use fingerprint or face ID to log in')}
      {renderSettingItem('pinCode', 'PIN Code', 'Use a PIN code for quick access')}
      {renderSettingItem('rememberDevice', 'Remember This Device', 'Stay logged in on this device')}
    </View>
  );

  const renderPasswordSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Password Security</Text>
      
      <View style={styles.passwordInfo}>
        <Text style={styles.passwordLabel}>Last Changed</Text>
        <Text style={styles.passwordValue}>{securitySettings.passwordLastChanged}</Text>
      </View>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => setShowPasswordForm(!showPasswordForm)}
      >
        <Text style={styles.changePasswordButtonText}>Change Password</Text>
      </TouchableOpacity>

      {showPasswordForm && (
        <View style={styles.passwordForm}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={[styles.input, errors.currentPassword && styles.inputError]}
              placeholder="Enter current password"
              value={passwordForm.currentPassword}
              onChangeText={(value) => handlePasswordInputChange('currentPassword', value)}
              secureTextEntry
              placeholderTextColor={colors.textSecondary}
            />
            {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={[styles.input, errors.newPassword && styles.inputError]}
              placeholder="Enter new password"
              value={passwordForm.newPassword}
              onChangeText={(value) => handlePasswordInputChange('newPassword', value)}
              secureTextEntry
              placeholderTextColor={colors.textSecondary}
            />
            {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChangeText={(value) => handlePasswordInputChange('confirmPassword', value)}
              secureTextEntry
              placeholderTextColor={colors.textSecondary}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <View style={styles.passwordFormActions}>
            <TouchableOpacity
              style={[styles.passwordFormButton, styles.cancelButton]}
              onPress={() => {
                setShowPasswordForm(false);
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setErrors({});
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.passwordFormButton, styles.saveButton, saving && styles.disabledButton]}
              onPress={handleChangePassword}
              disabled={saving}
            >
              <Text style={styles.saveButtonText}>
                {saving ? 'Changing...' : 'Change Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {renderSettingItem('requireStrongPassword', 'Require Strong Password', 'Enforce strong password requirements')}
      {renderSettingItem('preventCommonPasswords', 'Prevent Common Passwords', 'Block commonly used passwords')}
    </View>
  );

  const renderSessionSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Session Management</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Auto Logout</Text>
          <Text style={styles.settingDescription}>
            Automatically log out after {securitySettings.sessionTimeout} minutes of inactivity
          </Text>
        </View>
        <Switch
          value={securitySettings.autoLogout}
          onValueChange={(value) => handleToggleChange('autoLogout', value)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={securitySettings.autoLogout ? colors.white : colors.textSecondary}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Max Failed Attempts</Text>
          <Text style={styles.settingDescription}>
            Lock account after {securitySettings.maxFailedAttempts} failed login attempts
          </Text>
        </View>
        <Text style={styles.settingValue}>{securitySettings.maxFailedAttempts}</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Lockout Duration</Text>
          <Text style={styles.settingDescription}>
            Account locked for {securitySettings.lockoutDuration} minutes after failed attempts
          </Text>
        </View>
        <Text style={styles.settingValue}>{securitySettings.lockoutDuration} min</Text>
      </View>
    </View>
  );

  const renderPrivacySettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Privacy & Data</Text>
      {renderSettingItem('shareAnalytics', 'Share Analytics', 'Help improve the app by sharing usage analytics')}
      {renderSettingItem('shareUsageData', 'Share Usage Data', 'Share detailed usage data for research')}
      {renderSettingItem('allowMarketingEmails', 'Marketing Emails', 'Receive promotional and marketing emails')}
      {renderSettingItem('allowPushNotifications', 'Push Notifications', 'Receive push notifications')}
    </View>
  );

  const renderDeviceManagement = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Device Management</Text>
      
      <View style={styles.lastLoginInfo}>
        <Text style={styles.lastLoginLabel}>Last Login</Text>
        <Text style={styles.lastLoginValue}>
          {securitySettings.lastLoginTime} from {securitySettings.lastLoginLocation}
        </Text>
      </View>

      <Text style={styles.devicesTitle}>Trusted Devices</Text>
      {securitySettings.trustedDevices.length === 0 ? (
        <View style={styles.emptyDevices}>
          <Text style={styles.emptyDevicesText}>No trusted devices</Text>
        </View>
      ) : (
        securitySettings.trustedDevices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceDetails}>
                Last used: {device.lastUsed} • {device.location}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeDeviceButton}
              onPress={() => handleRemoveDevice(device.id)}
            >
              <Text style={styles.removeDeviceText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.disabledButton]}
        onPress={handleSaveSettings}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Security Settings'}
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
        title="Security Settings"
        subtitle="Manage your account security"
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
          {renderAuthenticationSettings()}
          {renderPasswordSettings()}
          {renderSessionSettings()}
          {renderPrivacySettings()}
          {renderDeviceManagement()}
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  settingValue: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  twoFactorButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  enabledButton: {
    backgroundColor: colors.primary,
  },
  twoFactorButtonText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  enabledButtonText: {
    color: colors.white,
  },
  passwordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  passwordLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  passwordValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  changePasswordButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  changePasswordButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  passwordForm: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...globalStyles.shadow,
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
    backgroundColor: colors.background,
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
  passwordFormActions: {
    flexDirection: 'row',
    gap: 12,
  },
  passwordFormButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  saveButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  lastLoginInfo: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...globalStyles.shadow,
  },
  lastLoginLabel: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lastLoginValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  devicesTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyDevices: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  emptyDevicesText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  deviceDetails: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  removeDeviceButton: {
    backgroundColor: colors.error + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeDeviceText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: 24,
  },
});

export default SecuritySettingsScreen; 