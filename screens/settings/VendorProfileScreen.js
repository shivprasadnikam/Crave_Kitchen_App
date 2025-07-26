import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const VendorProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profileImage: null,
    
    // Business Information
    businessName: '',
    businessType: '',
    cuisine: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Business Details
    taxId: '',
    businessLicense: '',
    yearEstablished: '',
    employeeCount: '',
    
    // Contact Information
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });
  const [errors, setErrors] = useState({});

  // Mock profile data
  const mockProfileData = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@cravekitchen.com',
    phone: '+1 (555) 123-4567',
    profileImage: null,
    businessName: 'Smith\'s Delicious Kitchen',
    businessType: 'Restaurant',
    cuisine: 'American, Italian',
    description: 'A family-owned restaurant serving delicious American and Italian cuisine with fresh, locally-sourced ingredients.',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    taxId: '12-3456789',
    businessLicense: 'NY-REST-2024-001',
    yearEstablished: '2020',
    employeeCount: '15',
    website: 'www.smithskitchen.com',
    socialMedia: {
      facebook: 'smithskitchen',
      instagram: '@smithskitchen',
      twitter: '@smithskitchen',
    },
  };

  const businessTypes = [
    'Restaurant',
    'Food Truck',
    'Catering',
    'Bakery',
    'Cafe',
    'Pizzeria',
    'Other',
  ];

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

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfileData(mockProfileData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Business Information Validation
    if (!profileData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!profileData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }

    if (!profileData.cuisine.trim()) {
      newErrors.cuisine = 'Cuisine type is required';
    }

    if (!profileData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!profileData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!profileData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!profileData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    // Website validation (optional)
    if (profileData.website && !validators.isValidUrl(profileData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [{ text: 'OK', onPress: () => setEditing(false) }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeProfileImage = () => {
    Alert.alert(
      'Change Profile Image',
      'Select an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => Alert.alert('Coming Soon', 'Camera integration will be available soon!') },
        { text: 'Choose from Gallery', onPress: () => Alert.alert('Coming Soon', 'Gallery integration will be available soon!') },
      ]
    );
  };

  const renderInput = (field, label, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={profileData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor={colors.textSecondary}
        editable={editing}
        keyboardType={options.keyboardType || 'default'}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
        maxLength={options.maxLength}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderProfileImage = () => (
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImageWrapper}>
        {profileData.profileImage ? (
          <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>
              {profileData.firstName?.charAt(0) || 'V'}{profileData.lastName?.charAt(0) || 'P'}
            </Text>
          </View>
        )}
        {editing && (
          <TouchableOpacity
            style={styles.changeImageButton}
            onPress={handleChangeProfileImage}
          >
            <Text style={styles.changeImageText}>📷</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.profileName}>
        {profileData.firstName} {profileData.lastName}
      </Text>
      <Text style={styles.profileRole}>Vendor</Text>
    </View>
  );

  const renderPersonalInformation = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.row}>
        {renderInput('firstName', 'First Name *', 'Enter first name')}
        {renderInput('lastName', 'Last Name *', 'Enter last name')}
      </View>
      {renderInput('email', 'Email Address *', 'Enter email address', { keyboardType: 'email-address' })}
      {renderInput('phone', 'Phone Number *', 'Enter phone number', { keyboardType: 'phone-pad' })}
    </View>
  );

  const renderBusinessInformation = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Business Information</Text>
      {renderInput('businessName', 'Business Name *', 'Enter business name')}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Business Type *</Text>
        <View style={styles.pickerContainer}>
          {businessTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.pickerOption,
                profileData.businessType === type && styles.selectedPickerOption,
                !editing && styles.disabledPickerOption,
              ]}
              onPress={() => editing && handleInputChange('businessType', type)}
              disabled={!editing}
            >
              <Text style={[
                styles.pickerOptionText,
                profileData.businessType === type && styles.selectedPickerOptionText,
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {renderInput('cuisine', 'Cuisine Type *', 'e.g., American, Italian, Mexican')}
      {renderInput('description', 'Business Description', 'Describe your business...', {
        multiline: true,
        numberOfLines: 3,
        maxLength: 500,
      })}
    </View>
  );

  const renderAddress = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Business Address</Text>
      {renderInput('address', 'Street Address *', 'Enter street address')}
      <View style={styles.row}>
        {renderInput('city', 'City *', 'Enter city')}
        {renderInput('state', 'State *', 'Enter state')}
      </View>
      <View style={styles.row}>
        {renderInput('zipCode', 'ZIP Code *', 'Enter ZIP code')}
        {renderInput('country', 'Country', 'Enter country')}
      </View>
    </View>
  );

  const renderBusinessDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Business Details</Text>
      {renderInput('taxId', 'Tax ID', 'Enter tax ID')}
      {renderInput('businessLicense', 'Business License', 'Enter license number')}
      <View style={styles.row}>
        {renderInput('yearEstablished', 'Year Established', 'e.g., 2020')}
        {renderInput('employeeCount', 'Number of Employees', 'e.g., 15')}
      </View>
    </View>
  );

  const renderContactInformation = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      {renderInput('website', 'Website', 'https://www.example.com', { keyboardType: 'url' })}
      
      <Text style={styles.subsectionTitle}>Social Media</Text>
      {renderInput('socialMedia.facebook', 'Facebook', 'Enter Facebook username')}
      {renderInput('socialMedia.instagram', 'Instagram', 'Enter Instagram handle')}
      {renderInput('socialMedia.twitter', 'Twitter', 'Enter Twitter handle')}
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      {editing ? (
        <>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton, saving && styles.disabledButton]}
            onPress={handleSaveProfile}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => {
              setEditing(false);
              setErrors({});
              loadProfileData(); // Reset to original data
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => setEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Vendor Profile"
        subtitle={editing ? 'Edit your profile' : 'View your profile'}
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
          {renderProfileImage()}
          {renderPersonalInformation()}
          {renderBusinessInformation()}
          {renderAddress()}
          {renderBusinessDetails()}
          {renderContactInformation()}
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    ...typography.h2,
    color: colors.white,
    fontWeight: '600',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  changeImageText: {
    fontSize: 16,
  },
  profileName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileRole: {
    ...typography.body2,
    color: colors.textSecondary,
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
  subsectionTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
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
  disabledPickerOption: {
    opacity: 0.6,
  },
  pickerOptionText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedPickerOptionText: {
    color: colors.white,
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  editButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default VendorProfileScreen; 