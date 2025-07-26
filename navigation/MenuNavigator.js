import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import menu screens
import MenuManagementScreen from '../screens/menu/MenuManagementScreen';
import AddMenuItemScreen from '../screens/menu/AddMenuItemScreen';
import EditMenuItemScreen from '../screens/menu/EditMenuItemScreen';
import CategoryManagementScreen from '../screens/menu/CategoryManagementScreen';
import MenuPreviewScreen from '../screens/menu/MenuPreviewScreen';

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MenuManagement"
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
        name="MenuManagement"
        component={MenuManagementScreen}
        options={{
          title: 'Menu Management',
        }}
      />
      <Stack.Screen
        name="AddMenuItem"
        component={AddMenuItemScreen}
        options={{
          title: 'Add Menu Item',
        }}
      />
      <Stack.Screen
        name="EditMenuItem"
        component={EditMenuItemScreen}
        options={{
          title: 'Edit Menu Item',
        }}
      />
      <Stack.Screen
        name="CategoryManagement"
        component={CategoryManagementScreen}
        options={{
          title: 'Category Management',
        }}
      />
      <Stack.Screen
        name="MenuPreview"
        component={MenuPreviewScreen}
        options={{
          title: 'Menu Preview',
        }}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator; 