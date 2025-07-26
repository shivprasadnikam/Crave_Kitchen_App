import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../styles/theme';

// Import screens (these will be created later)
// import VendorDashboardScreen from '../screens/dashboard/VendorDashboardScreen';
// import OrderListScreen from '../screens/orders/OrderListScreen';
// import MenuManagementScreen from '../screens/menu/MenuManagementScreen';
// import AnalyticsDashboardScreen from '../screens/analytics/AnalyticsDashboardScreen';
// import VendorProfileScreen from '../screens/settings/VendorProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Placeholder Dashboard Screen
const PlaceholderScreen = ({ title }) => {
  return (
    <div style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: THEME.colors.BACKGROUND.PRIMARY,
      padding: 20
    }}>
      <h2 style={{ color: THEME.colors.TEXT.PRIMARY }}>{title}</h2>
      <p style={{ color: THEME.colors.TEXT.SECONDARY }}>This screen is under development</p>
    </div>
  );
};

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Dashboard" 
      component={() => <PlaceholderScreen title="Dashboard" />}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Orders" 
      component={() => <PlaceholderScreen title="Orders" />}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Menu" 
      component={() => <PlaceholderScreen title="Menu Management" />}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Analytics" 
      component={() => <PlaceholderScreen title="Analytics" />}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Settings" 
      component={() => <PlaceholderScreen title="Settings" />}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const VendorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'DashboardTab':
              iconName = 'dashboard';
              break;
            case 'OrdersTab':
              iconName = 'receipt';
              break;
            case 'MenuTab':
              iconName = 'restaurant-menu';
              break;
            case 'AnalyticsTab':
              iconName = 'analytics';
              break;
            case 'SettingsTab':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME.colors.PRIMARY.MAIN,
        tabBarInactiveTintColor: THEME.colors.TEXT.TERTIARY,
        tabBarStyle: {
          backgroundColor: THEME.colors.SURFACE.PRIMARY,
          borderTopColor: THEME.colors.BORDER.PRIMARY,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardStack}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="OrdersTab" 
        component={OrdersStack}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen 
        name="MenuTab" 
        component={MenuStack}
        options={{ tabBarLabel: 'Menu' }}
      />
      <Tab.Screen 
        name="AnalyticsTab" 
        component={AnalyticsStack}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsStack}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default VendorNavigator; 