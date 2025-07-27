# Crave Kitchen - Restaurant Management App

A comprehensive React Native application for restaurant vendors to manage orders, menus, inventory, and analytics.

## 🚀 Features

### Core Functionality
- **Order Management**: Real-time order tracking, status updates, and order history
- **Menu Management**: Create, edit, and manage menu items and categories
- **Inventory Tracking**: Monitor stock levels and receive low stock alerts
- **Analytics Dashboard**: Revenue tracking, order analytics, and performance metrics
- **Push Notifications**: Real-time notifications for new orders and updates
- **Offline Support**: Work without internet connection with data sync

### Vendor Features
- **Profile Management**: Restaurant information and operating hours
- **Payment Processing**: Track payments, payouts, and financial reports
- **Customer Management**: View customer orders and preferences
- **Settings & Preferences**: Customize app behavior and notifications

## 📱 Screenshots

*Screenshots will be added here*

## 🛠 Tech Stack

- **Framework**: React Native 0.72.6
- **Platform**: Expo SDK 49
- **Navigation**: React Navigation 6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **UI Components**: React Native Paper, React Native Elements
- **Charts**: React Native Chart Kit
- **Icons**: React Native Vector Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/crave-kitchen.git
   cd crave-kitchen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🏗 Project Structure

```
crave-kitchen/
├── components/          # Reusable UI components
│   ├── analytics/      # Analytics and chart components
│   ├── common/         # Common UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── menu/          # Menu management components
│   └── orders/        # Order management components
├── config/            # App configuration files
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── navigation/        # Navigation configuration
├── screens/           # App screens
│   ├── analytics/     # Analytics screens
│   ├── auth/          # Authentication screens
│   ├── dashboard/     # Dashboard screens
│   ├── finances/      # Financial screens
│   ├── inventory/     # Inventory screens
│   ├── menu/          # Menu screens
│   ├── orders/        # Order screens
│   ├── settings/      # Settings screens
│   └── support/       # Support screens
├── services/          # API services and utilities
├── styles/            # Global styles and themes
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔧 Configuration

### Environment Setup

1. **Create environment files**
   ```bash
   # Development
   cp .env.example .env.development
   
   # Production
   cp .env.example .env.production
   ```

2. **Configure API endpoints**
   Update the API URLs in `config/apiConfig.js`:
   ```javascript
   export const API_CONFIG = {
     BASE_URL: process.env.API_BASE_URL || 'https://api.cravekitchen.com/v1',
     // ... other config
   };
   ```

### Build Configuration

1. **EAS Build Setup**
   ```bash
   # Install EAS CLI
   npm install -g @expo/eas-cli
   
   # Login to Expo
   eas login
   
   # Configure build
   eas build:configure
   ```

2. **Build for different environments**
   ```bash
   # Development build
   eas build --profile development --platform ios
   eas build --profile development --platform android
   
   # Production build
   eas build --profile production --platform ios
   eas build --profile production --platform android
   ```

## 📱 App Configuration

### iOS Configuration

Update `app.json` for iOS-specific settings:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.cravekitchen.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Camera access for menu photos",
        "NSLocationWhenInUseUsageDescription": "Location for delivery services"
      }
    }
  }
}
```

### Android Configuration

Update `app.json` for Android-specific settings:
```json
{
  "expo": {
    "android": {
      "package": "com.cravekitchen.app",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "INTERNET"
      ]
    }
  }
}
```

## 🔌 API Integration

The app integrates with the Crave Kitchen API for:

- **Authentication**: Login, registration, and session management
- **Orders**: Order CRUD operations and status updates
- **Menu**: Menu item and category management
- **Inventory**: Stock tracking and alerts
- **Analytics**: Revenue and performance data
- **Notifications**: Push notification management

### API Endpoints

Key API endpoints are defined in `services/api.js`:
- `/auth/*` - Authentication endpoints
- `/vendor/orders/*` - Order management
- `/vendor/menu/*` - Menu management
- `/vendor/analytics/*` - Analytics data
- `/vendor/notifications/*` - Notification management

## 🎨 UI/UX Design

The app follows Material Design principles with:
- **Color Scheme**: Orange primary (#FF6B35) with supporting colors
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable, accessible UI components
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Adapts to different screen sizes

## 🔒 Security

- **Authentication**: JWT token-based authentication
- **Data Encryption**: Sensitive data encrypted in storage
- **API Security**: HTTPS-only API communication
- **Input Validation**: Client-side and server-side validation
- **Session Management**: Secure session handling

## 📊 Analytics

The app includes comprehensive analytics:
- **Revenue Tracking**: Daily, weekly, monthly revenue
- **Order Analytics**: Order volume and trends
- **Menu Performance**: Popular items and categories
- **Customer Insights**: Customer behavior and preferences
- **Inventory Analytics**: Stock usage and trends

## 🔔 Push Notifications

Configured for real-time notifications:
- **New Orders**: Instant notifications for incoming orders
- **Order Updates**: Status change notifications
- **Low Stock**: Inventory alert notifications
- **System Alerts**: Important system notifications

## 🚀 Deployment

### Development
```bash
# Start development server
npm start

# Run on device
expo start --tunnel
```

### Staging
```bash
# Build staging version
eas build --profile staging --platform all

# Submit to stores (staging)
eas submit --profile staging --platform ios
eas submit --profile staging --platform android
```

### Production
```bash
# Build production version
eas build --profile production --platform all

# Submit to stores (production)
eas submit --profile production --platform ios
eas submit --profile production --platform android
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@cravekitchen.com
- **Documentation**: [docs.cravekitchen.com](https://docs.cravekitchen.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/crave-kitchen/issues)

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Core order management functionality
- Menu management system
- Basic analytics dashboard
- Push notification support

---

**Built with ❤️ for restaurant vendors** 

