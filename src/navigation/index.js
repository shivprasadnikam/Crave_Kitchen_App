import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Import screens
import VendorLoginScreen from '../screens/auth/VendorLoginScreen';
import VendorSignUpScreen from '../screens/auth/VendorSignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VendorDashboardScreen from '../screens/dashboard/VendorDashboardScreen';

// Create navigator
const Stack = createStackNavigator();

// Root Navigator
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen 
          name="Dashboard" 
          component={VendorDashboardScreen}
          options={{
            headerShown: true,
            title: 'Dashboard',
            headerStyle: {
              backgroundColor: '#FF6B35',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={VendorLoginScreen} />
          <Stack.Screen name="SignUp" component={VendorSignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator; 