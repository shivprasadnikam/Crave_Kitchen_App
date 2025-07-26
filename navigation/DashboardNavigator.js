import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import dashboard screens
import VendorDashboardScreen from '../screens/dashboard/VendorDashboardScreen';
import QuickActionsScreen from '../screens/dashboard/QuickActionsScreen';
import NotificationsScreen from '../screens/dashboard/NotificationsScreen';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={VendorDashboardScreen}
        options={{
          title: 'Dashboard',
          headerShown: false, // Hide header for main dashboard
        }}
      />
      <Stack.Screen
        name="QuickActions"
        component={QuickActionsScreen}
        options={{
          title: 'Quick Actions',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator; 