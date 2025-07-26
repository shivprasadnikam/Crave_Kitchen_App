import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import navigators
import DashboardNavigator from './DashboardNavigator';
import OrdersNavigator from './OrdersNavigator';
import MenuNavigator from './MenuNavigator';
import AnalyticsNavigator from './AnalyticsNavigator';
import SettingsNavigator from './SettingsNavigator';

// Import additional screens
import InventoryScreen from '../screens/inventory/InventoryScreen';
import RevenueScreen from '../screens/finances/RevenueScreen';
import HelpCenterScreen from '../screens/support/HelpCenterScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const VendorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Orders':
              iconName = 'receipt';
              break;
            case 'Menu':
              iconName = 'restaurant-menu';
              break;
            case 'Analytics':
              iconName = 'analytics';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardNavigator}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersNavigator}
        options={{
          title: 'Orders',
        }}
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuNavigator}
        options={{
          title: 'Menu',
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsNavigator}
        options={{
          title: 'Analytics',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsNavigator}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const VendorNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#FF6B35',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={VendorTabNavigator}
        options={{
          title: 'Crave Kitchen',
          drawerIcon: ({ color, size }) => (
            <Icon name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: 'Inventory',
          drawerIcon: ({ color, size }) => (
            <Icon name="inventory" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{
          title: 'Revenue',
          drawerIcon: ({ color, size }) => (
            <Icon name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpCenterScreen}
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color, size }) => (
            <Icon name="help" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default VendorNavigator; 