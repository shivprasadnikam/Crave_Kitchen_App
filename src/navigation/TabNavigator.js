import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Import screens
import VendorDashboardScreen from '../screens/dashboard/VendorDashboardScreen';
import MenuManagementScreen from '../screens/menu/MenuManagementScreen';
import OrderListScreen from '../screens/orders/OrderListScreen';
import VendorProfileScreen from '../screens/settings/VendorProfileScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Icons
const TabIcon = ({ name, focused, color }) => {
  const icons = {
    Dashboard: '📊',
    Menu: '🍽️',
    Activity: '📋',
    Profile: '👤',
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ 
        fontSize: 18, 
        color: focused ? '#0EA5E9' : '#94A3B8',
        opacity: focused ? 1 : 0.7
      }}>
        {icons[name]}
      </Text>
      <Text style={{ 
        fontSize: 8, 
        color: focused ? '#0EA5E9' : '#94A3B8',
        marginTop: 2,
        fontWeight: focused ? '500' : '400',
        opacity: focused ? 1 : 0.8
      }}>
        {name}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon name={route.name} focused={focused} color={color} />
        ),
        tabBarActiveTintColor: '#0EA5E9',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#F1F5F9',
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 3,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '400',
        },
        tabBarShowLabel: false, // Hide default labels since we have custom ones
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={VendorDashboardScreen}
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuManagementScreen}
      />
      <Tab.Screen 
        name="Activity" 
        component={OrderListScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={VendorProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 