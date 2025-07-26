import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VendorLoginScreen from '../screens/auth/VendorLoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
      {/* Add other auth screens here */}
      {/* <Stack.Screen name="VendorSignUp" component={VendorSignUpScreen} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator; 