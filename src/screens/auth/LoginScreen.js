import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, SimpleFooter } from '../../components/ui';
import { colors, typography, spacing, commonStyles } from '../../theme/theme';

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('🔐 LoginScreen rendered');

  const handleLogin = async () => {
    console.log('🚀 Login attempt started');
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password.length);
    
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('✅ Form validation passed');

    try {
      console.log('🔄 Calling login function...');
      const result = await login(email, password);
      console.log('📊 Login result:', result);
      
      if (!result.success) {
        console.log('❌ Login failed:', result.error);
        Alert.alert('Login Failed', result.error);
      } else {
        console.log('✅ Login successful!');
      }
    } catch (error) {
      console.log('💥 Login error caught:', error);
      console.log('💥 Error message:', error.message);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleEmailChange = (text) => {
    console.log('📝 Email changed:', text);
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    console.log('🔒 Password changed (length):', text.length);
    setPassword(text);
  };

  console.log('🎨 LoginScreen rendering with state:', { email, password: password ? '***' : '' });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary[600], colors.primary[500], colors.primary[400]]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Crave Kitchen</Text>
            <Text style={styles.subtitle}>Welcome back to your kitchen</Text>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => console.log('📱 Email input focused')}
              onBlur={() => console.log('📱 Email input blurred')}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              onFocus={() => console.log('📱 Password input focused')}
              onBlur={() => console.log('📱 Password input blurred')}
            />
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              size="large"
              style={styles.loginButton}
              onPressIn={() => console.log('👆 Login button pressed')}
            />
            
            <Button
              title="Forgot Password?"
              onPress={() => console.log('Forgot password pressed')}
              variant="ghost"
              size="medium"
              style={styles.forgotButton}
            />
          </View>
        </View>

        {/* Simple Footer */}
        <SimpleFooter 
          style={styles.footer}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 12,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default LoginScreen; 