import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import auth screens
import VendorAuthScreen from '../screens/auth/VendorAuthScreen';
import VendorLoginScreen from '../screens/auth/VendorLoginScreen';
import VendorRegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegistrationStatusScreen from '../screens/auth/RegistrationStatusScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorAuth" component={VendorAuthScreen} />
      <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
      <Stack.Screen name="VendorRegister" component={VendorRegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RegistrationStatus" component={RegistrationStatusScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator; 