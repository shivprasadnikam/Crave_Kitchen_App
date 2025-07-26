# 🍽️ Crave Kitchen App

A comprehensive React Native mobile application for restaurant vendors to manage their business operations, including order management, menu management, analytics, inventory tracking, and financial reporting.

## 🚀 Features

### 🍽️ Order Management
- **Real-time order notifications** with push notifications
- **Order status tracking** and automated updates
- **Order history** with detailed analytics
- **Bulk order operations** for efficiency
- **Order timeline** with status change tracking
- **Customer communication** tools
- **Delivery tracking** and route optimization

### 📋 Menu Management
- **Add, edit, and delete menu items** with rich media support
- **Category management** with hierarchical organization
- **Price and availability controls** with dynamic pricing
- **Image upload and management** with optimization
- **Customization options** and add-ons
- **Nutritional information** and allergen tracking
- **Seasonal menu** management

### 📊 Analytics & Insights
- **Revenue analytics** with detailed reporting
- **Order analytics** and trend analysis
- **Popular items tracking** with performance metrics
- **Customer insights** and behavior analysis
- **Real-time dashboard** with live data
- **Custom reports** with export functionality
- **Performance metrics** and KPIs

### 📦 Inventory Management
- **Stock tracking** with automated alerts
- **Low stock notifications** with reorder suggestions
- **Ingredient management** with recipe integration
- **Inventory reports** with forecasting
- **Waste tracking** and optimization
- **Supplier management** and ordering
- **Cost analysis** and profitability tracking

### 💰 Financial Management
- **Revenue tracking** with detailed breakdowns
- **Payment history** with transaction details
- **Payout management** with scheduling
- **Financial reports** with tax calculations
- **Expense tracking** and categorization
- **Profit margin analysis** by item/category
- **Cash flow management** and forecasting

### ⚙️ Settings & Configuration
- **Restaurant profile management** with branding
- **Operating hours setup** with special schedules
- **Notification preferences** with granular control
- **Security settings** with biometric authentication
- **Staff management** with role-based access
- **Integration settings** for third-party services
- **Backup and restore** functionality

## 🛠️ Tech Stack

### Core Framework
- **React Native** (0.72.6) with Expo SDK 49
- **React** (18.2.0) with modern hooks
- **TypeScript** for type safety

### Navigation & Routing
- **React Navigation v6** with stack, tab, and drawer navigation
- **React Native Screens** for native navigation performance
- **React Native Gesture Handler** for touch interactions

### State Management
- **React Context API** for global state
- **Custom hooks** for reusable logic
- **AsyncStorage** for local persistence
- **SecureStore** for sensitive data

### UI & Design
- **React Native Paper** for Material Design components
- **React Native Elements** for additional UI components
- **React Native Vector Icons** for iconography
- **Expo Linear Gradient** for visual effects
- **React Native Reanimated** for smooth animations

### Data Visualization
- **React Native Chart Kit** for analytics charts
- **React Native SVG** for scalable graphics
- **Custom chart components** for specialized visualizations

### Networking & API
- **Axios** for HTTP requests
- **Custom API service layer** with error handling
- **Request/response interceptors** for authentication
- **Offline support** with data synchronization

### Media & File Handling
- **Expo Image Picker** for photo selection
- **Expo Camera** for photo capture
- **Expo File System** for file operations
- **Image optimization** and compression

### Notifications & Communication
- **Expo Notifications** for push notifications
- **Local notifications** for app events
- **Background task handling** for real-time updates

### Location & Maps
- **Expo Location** for GPS services
- **React Native Maps** for map integration
- **Geolocation services** for delivery tracking

### Security & Authentication
- **Expo SecureStore** for secure storage
- **Biometric authentication** support
- **JWT token management** with refresh logic

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Metro bundler** for fast builds

## 📋 Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn** (v1.22 or higher)
- **Expo CLI** (latest version)
- **Git** for version control

### Development Environment
- **iOS Development**: Xcode 14+ (macOS only)
- **Android Development**: Android Studio with SDK 33+
- **Code Editor**: VS Code with React Native extensions

### Device Requirements
- **iOS**: iOS 13.0 or later
- **Android**: Android 6.0 (API level 23) or later
- **Physical device** or **simulator/emulator** for testing

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crave-kitchen.git
cd crave-kitchen
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 4. Start Development Server
```bash
# Start Expo development server
npm start
# or
yarn start
# or
expo start
```

### 5. Run on Device/Simulator
```bash
# iOS Simulator
npm run ios
# or
yarn ios

# Android Emulator
npm run android
# or
yarn android

# Web Browser
npm run web
# or
yarn web
```

## 📁 Project Structure

```
Crave_Kitchen_App/
├── 📱 App.js                    # Main app entry point
├── 📋 app.json                  # Expo app configuration
├── ⚙️ eas.json                  # EAS Build configuration
├── 📦 package.json              # Dependencies and scripts
├── 🔧 metro.config.js           # Metro bundler configuration
├── 🏗️ babel.config.js           # Babel transpiler configuration
├── 🚫 .gitignore                # Git ignore patterns
├── 📖 README.md                 # Project documentation
│
├── 🎨 assets/                   # Static assets
│   ├── 📷 images/              # Image files
│   ├── 🎵 sounds/              # Audio files
│   ├── 📄 fonts/               # Custom fonts
│   └── 🎨 icons/               # App icons
│
├── 🧩 components/               # Reusable UI components
│   ├── 📊 analytics/           # Analytics components
│   ├── 🔧 common/              # Common UI components
│   ├── 📊 dashboard/           # Dashboard components
│   ├── 🍽️ menu/               # Menu management components
│   └── 📦 orders/              # Order management components
│
├── ⚙️ config/                   # Configuration files
│   ├── 🔗 apiConfig.js         # API configuration
│   ├── 🏗️ appConfig.js         # App configuration
│   └── 📋 constants.js         # App constants
│
├── 🔄 context/                  # React Context providers
│   ├── 📊 AnalyticsContext.js  # Analytics state management
│   ├── 🔐 AuthContext.js       # Authentication state
│   ├── 🍽️ MenuContext.js      # Menu state management
│   ├── 🔔 NotificationContext.js # Notification state
│   ├── 📦 OrderContext.js      # Order state management
│   └── 📁 index.js             # Context exports
│
├── 🪝 hooks/                    # Custom React hooks
│   ├── 📊 useAnalytics.js      # Analytics hooks
│   ├── 📦 useInventory.js      # Inventory hooks
│   ├── 🍽️ useMenu.js          # Menu hooks
│   ├── 🔔 useNotifications.js  # Notification hooks
│   ├── 📦 useOrders.js         # Order hooks
│   ├── 🔐 useVendorAuth.js     # Authentication hooks
│   └── 📁 index.js             # Hook exports
│
├── 🧭 navigation/               # Navigation configuration
│   ├── 📊 AnalyticsNavigator.js # Analytics navigation
│   ├── 🔐 AuthNavigator.js      # Authentication navigation
│   ├── 📊 DashboardNavigator.js # Dashboard navigation
│   ├── 🍽️ MenuNavigator.js     # Menu navigation
│   ├── 📦 OrdersNavigator.js    # Orders navigation
│   ├── ⚙️ SettingsNavigator.js  # Settings navigation
│   ├── 🏪 VendorNavigator.js    # Vendor navigation
│   └── 📁 index.js             # Navigation exports
│
├── 📱 screens/                  # App screens
│   ├── 📊 analytics/           # Analytics screens
│   ├── 🔐 auth/                # Authentication screens
│   ├── 📊 dashboard/           # Dashboard screens
│   ├── 💰 finances/            # Financial screens
│   ├── 📦 inventory/           # Inventory screens
│   ├── 🍽️ menu/               # Menu management screens
│   ├── 📦 orders/              # Order management screens
│   ├── ⚙️ settings/            # Settings screens
│   └── 🆘 support/             # Support screens
│
├── 🔧 services/                 # API and business logic services
│   ├── 📊 analyticsService.js  # Analytics API service
│   ├── 🔗 api.js               # Base API configuration
│   ├── 🔐 authService.js       # Authentication service
│   ├── 📦 inventoryService.js  # Inventory API service
│   ├── 🍽️ menuService.js      # Menu API service
│   ├── 🔔 notificationService.js # Notification service
│   ├── 📦 orderService.js      # Order API service
│   └── 💰 paymentService.js    # Payment API service
│
├── 🎨 styles/                   # Styling and theming
│   ├── 🎨 colors.js            # Color palette
│   ├── 🌍 globalStyles.js      # Global styles
│   ├── 🎨 theme.js             # Theme configuration
│   └── 📝 typography.js        # Typography styles
│
├── 📋 types/                    # TypeScript type definitions
│   ├── 📊 analytics.types.js   # Analytics types
│   ├── 🍽️ menu.types.js       # Menu types
│   ├── 📦 order.types.js       # Order types
│   └── 🏪 vendor.types.js      # Vendor types
│
└── 🛠️ utils/                    # Utility functions
    ├── 💰 currencyUtils.js     # Currency formatting
    ├── 📅 dateUtils.js         # Date manipulation
    ├── 📝 formatters.js        # Data formatting
    ├── 🛠️ helpers.js           # General utilities
    ├── 📋 validators.js        # Validation functions
    └── 📁 index.js             # Utility exports
```

## 🏗️ Build & Deployment

### Development Build
```bash
# iOS Development Build
eas build --platform ios --profile development

# Android Development Build
eas build --platform android --profile development
```

### Preview Build
```bash
# iOS Preview Build
eas build --platform ios --profile preview

# Android Preview Build
eas build --platform android --profile preview
```

### Production Build
```bash
# iOS Production Build
eas build --platform ios --profile production

# Android Production Build
eas build --platform android --profile production
```

### Submit to App Stores
```bash
# Submit to App Store
eas submit --platform ios --profile production

# Submit to Google Play Store
eas submit --platform android --profile production
```

## 🧪 Testing

### Unit Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Integration Testing
```bash
# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Manual Testing
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📱 Platform Support

### iOS
- **Minimum Version**: iOS 13.0
- **Target Version**: iOS 17.0
- **Devices**: iPhone, iPad
- **Features**: Face ID, Touch ID, Apple Pay

### Android
- **Minimum Version**: Android 6.0 (API 23)
- **Target Version**: Android 14 (API 34)
- **Devices**: Phones, Tablets
- **Features**: Fingerprint, Google Pay

### Web
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Features**: Responsive design, PWA support

## 🔧 Configuration

### Environment Variables
```bash
# API Configuration
API_URL=https://api.cravekitchen.com/v1
API_TIMEOUT=30000

# Authentication
AUTH_TOKEN_KEY=auth_token
REFRESH_TOKEN_KEY=refresh_token

# Notifications
PUSH_TOKEN_KEY=push_token
NOTIFICATION_CHANNEL_ID=orders

# Analytics
ANALYTICS_ENABLED=true
SENTRY_DSN=your_sentry_dsn

# Environment
NODE_ENV=development
ENVIRONMENT=development
```

### App Configuration
- **Bundle ID**: `com.cravekitchen.app`
- **Version**: `1.0.0`
- **Build Number**: `1`
- **Orientation**: Portrait (primary), Landscape (secondary)

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **TypeScript** for type safety
- **Conventional commits** for commit messages

### Testing Requirements
- **Unit tests** for all new features
- **Integration tests** for API interactions
- **Manual testing** on both platforms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Project Wiki](https://github.com/your-username/crave-kitchen/wiki)

### Community
- [GitHub Issues](https://github.com/your-username/crave-kitchen/issues)
- [Discord Community](https://discord.gg/cravekitchen)
- [Email Support](mailto:support@cravekitchen.com)

### Emergency Support
- **Critical Issues**: Create urgent issue with `[URGENT]` tag
- **Security Issues**: Email security@cravekitchen.com
- **Production Issues**: Contact DevOps team immediately

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **React Native Community** for the robust ecosystem
- **Contributors** who help improve this project
- **Beta Testers** for valuable feedback and testing

---

**Made with ❤️ by the Crave Kitchen Team**

```
Crave_Kitchen_Vendor/
├── assets/                    # App assets (icons, images, fonts)
├── components/                # Reusable UI components
│   ├── common/               # Common components (Header, Loading, etc.)
│   ├── orders/               # Order-related components
│   ├── menu/                 # Menu-related components
│   ├── analytics/            # Analytics components
│   └── dashboard/            # Dashboard components
├── screens/                  # App screens
│   ├── auth/                 # Authentication screens
│   ├── dashboard/            # Dashboard screens
│   ├── orders/               # Order management screens
│   ├── menu/                 # Menu management screens
│   ├── analytics/            # Analytics screens
│   ├── inventory/            # Inventory screens
│   ├── finances/             # Financial screens
│   ├── settings/             # Settings screens
│   └── support/              # Support screens
├── navigation/               # Navigation configuration
├── context/                  # React Context providers
├── hooks/                    # Custom React hooks
├── services/                 # API services
├── utils/                    # Utility functions
├── styles/                   # Global styles and theme
├── config/                   # Configuration files
└── types/                    # TypeScript type definitions
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://api.cravekitchen.com/v1
API_TIMEOUT=30000
```

### API Configuration

Update the API configuration in `config/apiConfig.js` with your backend endpoints.

## Building for Production

### iOS

1. **Configure iOS build**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### Android

1. **Configure Android build**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Google Play Store**
   ```bash
   eas submit --platform android
   ```

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow ESLint and Prettier configurations
- Use TypeScript for type safety
- Follow React Native best practices

### Component Structure

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { THEME } from '../styles/theme';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <View style={THEME.layout.container}>
      <Text>Component Content</Text>
    </View>
  );
};

export default ComponentName;
```

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Use custom hooks for reusable logic

### API Integration

- Use the centralized API service
- Handle loading and error states
- Implement proper error handling
- Use retry mechanisms for failed requests

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact:
- Email: support@cravekitchen.com
- Documentation: [docs.cravekitchen.com](https://docs.cravekitchen.com)

## Changelog

### Version 1.0.0
- Initial release
- Core order management features
- Menu management system
- Basic analytics dashboard
- User authentication
- Profile management

## Roadmap

### Version 1.1.0
- Advanced analytics
- Multi-language support
- Push notifications
- Offline mode

### Version 1.2.0
- Advanced inventory management
- Integration with POS systems
- Customer relationship management
- Advanced reporting

### Version 2.0.0
- AI-powered insights
- Advanced automation
- Multi-restaurant support
- Advanced security features 

