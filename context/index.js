import React from 'react';

// Import all context providers
import { AuthProvider } from './AuthContext';
import { OrderProvider } from './OrderContext';
import { MenuProvider } from './MenuContext';
import { AnalyticsProvider } from './AnalyticsContext';
import { NotificationProvider } from './NotificationContext';

// Combined provider component
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <OrderProvider>
        <MenuProvider>
          <AnalyticsProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </AnalyticsProvider>
        </MenuProvider>
      </OrderProvider>
    </AuthProvider>
  );
};

// Export individual providers
export { AuthProvider } from './AuthContext';
export { OrderProvider } from './OrderContext';
export { MenuProvider } from './MenuContext';
export { AnalyticsProvider } from './AnalyticsContext';
export { NotificationProvider } from './NotificationContext';

// Export hooks
export { useAuth } from './AuthContext';
export { useOrders } from './OrderContext';
export { useMenu } from './MenuContext';
export { useAnalytics } from './AnalyticsContext';
export { useNotifications } from './NotificationContext';

// Export default
export default AppProvider; 