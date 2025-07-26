import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { validators } from '../../utils/validators';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const VendorSignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    cuisine: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Restaurant name validation
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    } else if (formData.restaurantName.length < 2) {
      newErrors.restaurantName = 'Restaurant name must be at least 2 characters';
    }

    // Owner name validation
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validators.isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!validators.isValidPassword(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Cuisine validation
    if (!formData.cuisine.trim()) {
      newErrors.cuisine = 'Cuisine type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const signUpData = {
        ...formData,
        userType: 'vendor',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await signUp(signUpData);
      Alert.alert(
        'Sign Up Successful',
        'Your account has been created successfully. Please wait for admin approval.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (field, label, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize={options.autoCapitalize || 'none'}
        keyboardType={options.keyboardType || 'default'}
        secureTextEntry={options.secureTextEntry || false}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Vendor Account</Text>
            <Text style={styles.subtitle}>
              Join Crave Kitchen and start serving delicious food to customers
            </Text>
          </View>

          <View style={styles.form}>
            {renderInput('restaurantName', 'Restaurant Name', 'Enter your restaurant name', {
              autoCapitalize: 'words',
            })}

            {renderInput('ownerName', 'Owner Name', 'Enter owner name', {
              autoCapitalize: 'words',
            })}

            {renderInput('email', 'Email Address', 'Enter your email address', {
              keyboardType: 'email-address',
            })}

            {renderInput('phone', 'Phone Number', 'Enter your phone number', {
              keyboardType: 'phone-pad',
            })}

            {renderInput('password', 'Password', 'Create a password', {
              secureTextEntry: true,
            })}

            {renderInput('confirmPassword', 'Confirm Password', 'Confirm your password', {
              secureTextEntry: true,
            })}

            {renderInput('address', 'Restaurant Address', 'Enter restaurant address', {
              autoCapitalize: 'words',
              multiline: true,
              numberOfLines: 2,
            })}

            {renderInput('cuisine', 'Cuisine Type', 'e.g., Italian, Chinese, Mexican', {
              autoCapitalize: 'words',
            })}

            {renderInput('description', 'Restaurant Description', 'Brief description of your restaurant', {
              autoCapitalize: 'sentences',
              multiline: true,
              numberOfLines: 3,
            })}
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
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
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
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
  signUpButton: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  signUpButtonText: {
    ...typography.button,
    color: colors.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  loginLink: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default VendorSignUpScreen; 