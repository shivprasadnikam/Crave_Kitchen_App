import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import order screens
import OrderListScreen from '../screens/orders/OrderListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import OrderHistoryScreen from '../screens/orders/OrderHistoryScreen';
import PendingOrdersScreen from '../screens/orders/PendingOrdersScreen';
import CompletedOrdersScreen from '../screens/orders/CompletedOrdersScreen';

const Stack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderList"
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
        name="OrderList"
        component={OrderListScreen}
        options={{
          title: 'Orders',
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          title: 'Order Details',
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          title: 'Order History',
        }}
      />
      <Stack.Screen
        name="PendingOrders"
        component={PendingOrdersScreen}
        options={{
          title: 'Pending Orders',
        }}
      />
      <Stack.Screen
        name="CompletedOrders"
        component={CompletedOrdersScreen}
        options={{
          title: 'Completed Orders',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator; 