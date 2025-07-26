import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import settings screens
import VendorProfileScreen from '../screens/settings/VendorProfileScreen';
import RestaurantSettingsScreen from '../screens/settings/RestaurantSettingsScreen';
import OperatingHoursScreen from '../screens/settings/OperatingHoursScreen';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen';
import SecuritySettingsScreen from '../screens/settings/SecuritySettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="VendorProfile"
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
        name="VendorProfile"
        component={VendorProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="RestaurantSettings"
        component={RestaurantSettingsScreen}
        options={{
          title: 'Restaurant Settings',
        }}
      />
      <Stack.Screen
        name="OperatingHours"
        component={OperatingHoursScreen}
        options={{
          title: 'Operating Hours',
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          title: 'Notification Settings',
        }}
      />
      <Stack.Screen
        name="SecuritySettings"
        component={SecuritySettingsScreen}
        options={{
          title: 'Security Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator; 