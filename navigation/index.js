import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import navigators
import AuthNavigator from './AuthNavigator';
import VendorNavigator from './VendorNavigator';

// Import context for authentication state
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              title: 'Authentication',
            }}
          />
        ) : (
          <Stack.Screen
            name="Vendor"
            component={VendorNavigator}
            options={{
              title: 'Crave Kitchen',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export individual navigators for direct use
export { AuthNavigator, VendorNavigator };

// Export the root navigator
export default RootNavigator; 