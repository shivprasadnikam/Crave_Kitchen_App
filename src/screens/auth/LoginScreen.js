import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { tr } from 'date-fns/locale';

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
    <View style={styles.container}>
      <Text style={styles.title}>Crave Clock</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => console.log('📱 Email input focused')}
          onBlur={() => console.log('📱 Email input blurred')}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          onFocus={() => console.log('📱 Password input focused')}
          onBlur={() => console.log('📱 Password input blurred')}
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          onPressIn={() => console.log('👆 Login button pressed')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen; 