import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import main screens
import HomeScreen from '../screens/HomeScreen';
import VendorDashboardScreen from '../screens/dashboard/VendorDashboardScreen';

// Import menu screens
import MenuManagementScreen from '../screens/menu/MenuManagementScreen';
import AddMenuItemScreen from '../screens/menu/AddMenuItemScreen';
import EditMenuItemScreen from '../screens/menu/EditMenuItemScreen';
import MenuPreviewScreen from '../screens/menu/MenuPreviewScreen';
import CategoryManagementScreen from '../screens/menu/CategoryManagementScreen';

// Import order screens
import OrderListScreen from '../screens/orders/OrderListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import PendingOrdersScreen from '../screens/orders/PendingOrdersScreen';
import CompletedOrdersScreen from '../screens/orders/CompletedOrdersScreen';
import OrderHistoryScreen from '../screens/orders/OrderHistoryScreen';

// Import analytics screens
import AnalyticsDashboardScreen from '../screens/analytics/AnalyticsDashboardScreen';
import RevenueAnalyticsScreen from '../screens/analytics/RevenueAnalyticsScreen';
import OrderAnalyticsScreen from '../screens/analytics/OrderAnalyticsScreen';
import CustomerAnalyticsScreen from '../screens/analytics/CustomerAnalyticsScreen';
import PopularItemsScreen from '../screens/analytics/PopularItemsScreen';

// Import inventory screens
import InventoryScreen from '../screens/inventory/InventoryScreen';
import IngredientTrackingScreen from '../screens/inventory/IngredientTrackingScreen';
import LowStockScreen from '../screens/inventory/LowStockScreen';
import StockManagementScreen from '../screens/inventory/StockManagementScreen';

// Import finances screens
import RevenueScreen from '../screens/finances/RevenueScreen';
import PaymentHistoryScreen from '../screens/finances/PaymentHistoryScreen';
import PayoutScreen from '../screens/finances/PayoutScreen';
import FinancialReportsScreen from '../screens/finances/FinancialReportsScreen';

// Import settings screens
import VendorProfileScreen from '../screens/settings/VendorProfileScreen';
import RestaurantSettingsScreen from '../screens/settings/RestaurantSettingsScreen';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen';
import OperatingHoursScreen from '../screens/settings/OperatingHoursScreen';
import SecuritySettingsScreen from '../screens/settings/SecuritySettingsScreen';

// Import support screens
import HelpCenterScreen from '../screens/support/HelpCenterScreen';
import FAQScreen from '../screens/support/FAQScreen';
import ContactSupportScreen from '../screens/support/ContactSupportScreen';

// Import dashboard screens
import QuickActionsScreen from '../screens/dashboard/QuickActionsScreen';
import NotificationsScreen from '../screens/dashboard/NotificationsScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="VendorDashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Dashboard */}
      <Stack.Screen 
        name="VendorDashboard" 
        component={VendorDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen 
        name="QuickActions" 
        component={QuickActionsScreen}
        options={{ title: 'Quick Actions' }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />

      {/* Menu Management */}
      <Stack.Screen 
        name="MenuManagement" 
        component={MenuManagementScreen}
        options={{ title: 'Menu Management' }}
      />
      <Stack.Screen 
        name="AddMenuItem" 
        component={AddMenuItemScreen}
        options={{ title: 'Add Menu Item' }}
      />
      <Stack.Screen 
        name="EditMenuItem" 
        component={EditMenuItemScreen}
        options={{ title: 'Edit Menu Item' }}
      />
      <Stack.Screen 
        name="MenuPreview" 
        component={MenuPreviewScreen}
        options={{ title: 'Menu Preview' }}
      />
      <Stack.Screen 
        name="CategoryManagement" 
        component={CategoryManagementScreen}
        options={{ title: 'Categories' }}
      />

      {/* Orders */}
      <Stack.Screen 
        name="OrderList" 
        component={OrderListScreen}
        options={{ title: 'Orders' }}
      />
      <Stack.Screen 
        name="OrderDetail" 
        component={OrderDetailScreen}
        options={{ title: 'Order Details' }}
      />
      <Stack.Screen 
        name="PendingOrders" 
        component={PendingOrdersScreen}
        options={{ title: 'Pending Orders' }}
      />
      <Stack.Screen 
        name="CompletedOrders" 
        component={CompletedOrdersScreen}
        options={{ title: 'Completed Orders' }}
      />
      <Stack.Screen 
        name="OrderHistory" 
        component={OrderHistoryScreen}
        options={{ title: 'Order History' }}
      />

      {/* Analytics */}
      <Stack.Screen 
        name="AnalyticsDashboard" 
        component={AnalyticsDashboardScreen}
        options={{ title: 'Analytics' }}
      />
      <Stack.Screen 
        name="RevenueAnalytics" 
        component={RevenueAnalyticsScreen}
        options={{ title: 'Revenue Analytics' }}
      />
      <Stack.Screen 
        name="OrderAnalytics" 
        component={OrderAnalyticsScreen}
        options={{ title: 'Order Analytics' }}
      />
      <Stack.Screen 
        name="CustomerAnalytics" 
        component={CustomerAnalyticsScreen}
        options={{ title: 'Customer Analytics' }}
      />
      <Stack.Screen 
        name="PopularItems" 
        component={PopularItemsScreen}
        options={{ title: 'Popular Items' }}
      />

      {/* Inventory */}
      <Stack.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{ title: 'Inventory' }}
      />
      <Stack.Screen 
        name="IngredientTracking" 
        component={IngredientTrackingScreen}
        options={{ title: 'Ingredient Tracking' }}
      />
      <Stack.Screen 
        name="LowStock" 
        component={LowStockScreen}
        options={{ title: 'Low Stock Alert' }}
      />
      <Stack.Screen 
        name="StockManagement" 
        component={StockManagementScreen}
        options={{ title: 'Stock Management' }}
      />

      {/* Finances */}
      <Stack.Screen 
        name="Revenue" 
        component={RevenueScreen}
        options={{ title: 'Revenue' }}
      />
      <Stack.Screen 
        name="PaymentHistory" 
        component={PaymentHistoryScreen}
        options={{ title: 'Payment History' }}
      />
      <Stack.Screen 
        name="Payout" 
        component={PayoutScreen}
        options={{ title: 'Payout' }}
      />
      <Stack.Screen 
        name="FinancialReports" 
        component={FinancialReportsScreen}
        options={{ title: 'Financial Reports' }}
      />

      {/* Settings */}
      <Stack.Screen 
        name="VendorProfile" 
        component={VendorProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="RestaurantSettings" 
        component={RestaurantSettingsScreen}
        options={{ title: 'Restaurant Settings' }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen}
        options={{ title: 'Notification Settings' }}
      />
      <Stack.Screen 
        name="OperatingHours" 
        component={OperatingHoursScreen}
        options={{ title: 'Operating Hours' }}
      />
      <Stack.Screen 
        name="SecuritySettings" 
        component={SecuritySettingsScreen}
        options={{ title: 'Security Settings' }}
      />

      {/* Support */}
      <Stack.Screen 
        name="HelpCenter" 
        component={HelpCenterScreen}
        options={{ title: 'Help Center' }}
      />
      <Stack.Screen 
        name="FAQ" 
        component={FAQScreen}
        options={{ title: 'FAQ' }}
      />
      <Stack.Screen 
        name="ContactSupport" 
        component={ContactSupportScreen}
        options={{ title: 'Contact Support' }}
      />

      {/* Legacy Home Screen */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Crave Kitchen' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator; 