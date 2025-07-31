import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const VendorRegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  
  // Basic user info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  // Restaurant info
  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [description, setDescription] = useState('');
  
  // Address
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressZipCode, setAddressZipCode] = useState('');
  const [addressCountry, setAddressCountry] = useState('India');
  
  // Business hours for all days
  const [businessHours, setBusinessHours] = useState({
    monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
    tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
    wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
    thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
    friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
    saturday: { isOpen: true, openTime: '10:00', closeTime: '16:00' },
    sunday: { isOpen: false, openTime: '', closeTime: '' }
  });
  
  // Terms
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const updateBusinessHours = (day, field, value) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleRegister = async () => {
    console.log('📝 [REGISTER SCREEN] Starting registration validation...');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword || !phone || !restaurantName) {
      console.log('❌ [REGISTER SCREEN] Validation failed: Missing required fields');
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Required fields validation passed');

    if (!validateEmail(email)) {
      console.log('❌ [REGISTER SCREEN] Email validation failed:', email);
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Email validation passed');

    if (!validatePassword(password)) {
      console.log('❌ [REGISTER SCREEN] Password validation failed');
      Alert.alert('Error', 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Password validation passed');

    if (password !== confirmPassword) {
      console.log('❌ [REGISTER SCREEN] Password confirmation mismatch');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Password confirmation passed');

    if (!validatePhone(phone)) {
      console.log('❌ [REGISTER SCREEN] Phone validation failed:', phone);
      Alert.alert('Error', 'Please enter a valid phone number in international format (e.g., +1234567890)');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Phone validation passed');

    if (!acceptTerms) {
      console.log('❌ [REGISTER SCREEN] Terms not accepted');
      Alert.alert('Error', 'You must accept the terms and conditions to register');
      return;
    }
    console.log('✅ [REGISTER SCREEN] Terms accepted');

    console.log('🚀 [REGISTER SCREEN] All validations passed, calling register API...');

    try {
      const userData = {
        email,
        password,
        confirmPassword,
        name,
        restaurantName,
        phone,
        address: {
          street: addressStreet,
          city: addressCity,
          state: addressState,
          zipCode: addressZipCode,
          country: addressCountry,
        },
        businessHours: businessHours,
        cuisineType,
        description,
        acceptTerms,
        acceptMarketing,
      };
      
      console.log('📤 [REGISTER SCREEN] Calling register function with user data...');
      const result = await register(userData);
      
      console.log('📥 [REGISTER SCREEN] Register function returned:', result);
      
      if (!result.success) {
        console.log('❌ [REGISTER SCREEN] Registration failed:', result.error);
        Alert.alert('Registration Failed', result.error);
      } else {
        console.log('✅ [REGISTER SCREEN] Registration successful, navigating to status screen');
        // Navigate to registration status screen
        navigation.navigate('RegistrationStatus', {
          userData: {
            name: name,
            email: email,
            restaurantName: restaurantName
          },
          registrationResponse: result
        });
      }
    } catch (error) {
      console.log('💥 [REGISTER SCREEN] Unexpected error:', error.message);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleBackToAuth = () => {
    navigation.navigate('VendorAuth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToAuth}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Vendor Registration</Text>
            <Text style={styles.subtitle}>Create your restaurant account</Text>
          </View>
      
      <View style={styles.form}>
        {/* Basic Information */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number (e.g., +1234567890) *"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Restaurant Information */}
        <Text style={styles.sectionTitle}>Restaurant Information</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name *"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Cuisine Type (e.g., Mexican, Italian)"
          value={cuisineType}
          onChangeText={setCuisineType}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Restaurant Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={addressStreet}
          onChangeText={setAddressStreet}
        />
        
        <TextInput
          style={styles.input}
          placeholder="City"
          value={addressCity}
          onChangeText={setAddressCity}
        />
        
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="State"
            value={addressState}
            onChangeText={setAddressState}
          />
          
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="ZIP Code"
            value={addressZipCode}
            onChangeText={setAddressZipCode}
            keyboardType="numeric"
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={addressCountry}
          onChangeText={setAddressCountry}
        />

        {/* Business Hours */}
        <Text style={styles.sectionTitle}>Business Hours</Text>
        
        {Object.entries(businessHours).map(([day, hours]) => (
          <View key={day}>
            <View style={styles.businessHoursRow}>
              <Text style={styles.dayLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
              <Switch
                value={hours.isOpen}
                onValueChange={(value) => updateBusinessHours(day, 'isOpen', value)}
                trackColor={{ false: '#767577', true: '#4A90E2' }}
              />
            </View>
            
            {hours.isOpen && (
              <View style={styles.timeRow}>
                <TextInput
                  style={[styles.input, styles.timeInput]}
                  placeholder="Open Time (HH:MM)"
                  value={hours.openTime}
                  onChangeText={(value) => updateBusinessHours(day, 'openTime', value)}
                />
                <Text style={styles.timeSeparator}>to</Text>
                <TextInput
                  style={[styles.input, styles.timeInput]}
                  placeholder="Close Time (HH:MM)"
                  value={hours.closeTime}
                  onChangeText={(value) => updateBusinessHours(day, 'closeTime', value)}
                />
              </View>
            )}
          </View>
        ))}

        {/* Terms */}
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        
        <View style={styles.termsRow}>
          <Switch
            value={acceptTerms}
            onValueChange={setAcceptTerms}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
          />
          <Text style={styles.termsText}>I accept the terms and conditions *</Text>
        </View>
        
        <View style={styles.termsRow}>
          <Switch
            value={acceptMarketing}
            onValueChange={setAcceptMarketing}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
          />
          <Text style={styles.termsText}>I would like to receive marketing emails</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  businessHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeInput: {
    flex: 1,
    marginBottom: 0,
  },
  timeSeparator: {
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 16,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VendorRegisterScreen; 