import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import analytics screens
import AnalyticsDashboardScreen from '../screens/analytics/AnalyticsDashboardScreen';
import RevenueAnalyticsScreen from '../screens/analytics/RevenueAnalyticsScreen';
import OrderAnalyticsScreen from '../screens/analytics/OrderAnalyticsScreen';
import PopularItemsScreen from '../screens/analytics/PopularItemsScreen';
import CustomerAnalyticsScreen from '../screens/analytics/CustomerAnalyticsScreen';

const Stack = createStackNavigator();

const AnalyticsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnalyticsDashboard"
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
        name="AnalyticsDashboard"
        component={AnalyticsDashboardScreen}
        options={{
          title: 'Analytics Dashboard',
        }}
      />
      <Stack.Screen
        name="RevenueAnalytics"
        component={RevenueAnalyticsScreen}
        options={{
          title: 'Revenue Analytics',
        }}
      />
      <Stack.Screen
        name="OrderAnalytics"
        component={OrderAnalyticsScreen}
        options={{
          title: 'Order Analytics',
        }}
      />
      <Stack.Screen
        name="PopularItems"
        component={PopularItemsScreen}
        options={{
          title: 'Popular Items',
        }}
      />
      <Stack.Screen
        name="CustomerAnalytics"
        component={CustomerAnalyticsScreen}
        options={{
          title: 'Customer Analytics',
        }}
      />
    </Stack.Navigator>
  );
};

export default AnalyticsNavigator; 