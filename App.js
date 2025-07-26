import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { MenuProvider } from './context/MenuContext';
import { NotificationProvider } from './context/NotificationContext';

// Navigation
import AuthNavigator from './navigation/AuthNavigator';
import VendorNavigator from './navigation/VendorNavigator';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Services
import { initializeAuth } from './services/authService';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize authentication state
        const authState = await initializeAuth();
        setIsAuthenticated(authState.isAuthenticated);
        setUser(authState.user);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingSpinner text="Initializing..." />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <AuthProvider>
              <OrderProvider>
                <MenuProvider>
                  <NotificationProvider>
                    {isAuthenticated ? (
                      <VendorNavigator />
                    ) : (
                      <AuthNavigator />
                    )}
                  </NotificationProvider>
                </MenuProvider>
              </OrderProvider>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App; 