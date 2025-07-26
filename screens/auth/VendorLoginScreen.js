import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../../styles/theme';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { validateEmail, validateRequired } from '../../utils/validators';

const VendorLoginScreen = ({ navigation }) => {
  const { login, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!validateRequired(formData.email, 'Email').isValid) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!validateRequired(formData.password, 'Password').isValid) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login error:', error);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('VendorSignUp');
  };

  if (isLoading) {
    return <LoadingSpinner text="Logging in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Icon name="restaurant" size={80} color={THEME.colors.PRIMARY.MAIN} />
            <Text style={styles.title}>Crave Kitchen</Text>
            <Text style={styles.subtitle}>Vendor Portal</Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Sign In</Text>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Icon name="email" size={20} color={THEME.colors.TEXT.TERTIARY} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <Icon name="lock" size={20} color={THEME.colors.TEXT.TERTIARY} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={THEME.colors.TEXT.TERTIARY}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Auth Error */}
            {error && (
              <View style={styles.authErrorContainer}>
                <Text style={styles.authErrorText}>{error}</Text>
              </View>
            )}

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: THEME.spacing.LG,
  },
  header: {
    alignItems: 'center',
    marginTop: THEME.spacing.XL,
    marginBottom: THEME.spacing.XXL,
  },
  title: {
    ...THEME.typography.HEADING.H1,
    color: THEME.colors.TEXT.PRIMARY,
    marginTop: THEME.spacing.MD,
  },
  subtitle: {
    ...THEME.typography.BODY.LARGE,
    color: THEME.colors.TEXT.SECONDARY,
    marginTop: THEME.spacing.XS,
  },
  form: {
    flex: 1,
  },
  formTitle: {
    ...THEME.typography.HEADING.H3,
    color: THEME.colors.TEXT.PRIMARY,
    marginBottom: THEME.spacing.XL,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: THEME.spacing.LG,
  },
  label: {
    ...THEME.typography.LABEL.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    marginBottom: THEME.spacing.SM,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderWidth: 1,
    borderColor: THEME.colors.BORDER.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    paddingHorizontal: THEME.spacing.MD,
    paddingVertical: THEME.spacing.MD,
  },
  inputError: {
    borderColor: THEME.colors.BORDER.ERROR,
  },
  input: {
    flex: 1,
    marginLeft: THEME.spacing.SM,
    ...THEME.typography.INPUT.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
  },
  eyeIcon: {
    padding: THEME.spacing.XS,
  },
  errorText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.ERROR,
    marginTop: THEME.spacing.XS,
  },
  authErrorContainer: {
    backgroundColor: THEME.colors.ERROR.LIGHT,
    padding: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.MD,
    marginBottom: THEME.spacing.LG,
  },
  authErrorText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.ERROR.MAIN,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: THEME.spacing.XL,
  },
  forgotPasswordText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.LINK,
  },
  loginButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
    paddingVertical: THEME.spacing.LG,
    borderRadius: THEME.borderRadius.MD,
    alignItems: 'center',
    marginBottom: THEME.spacing.XL,
    ...THEME.shadows.SM,
  },
  loginButtonText: {
    ...THEME.typography.BUTTON.LARGE,
    color: THEME.colors.PRIMARY.CONTRAST,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
  },
  signUpLink: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.LINK,
    fontWeight: 'bold',
  },
});

export default VendorLoginScreen; 