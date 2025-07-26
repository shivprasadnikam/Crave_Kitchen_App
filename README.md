# Crave_Kitchen_App


A comprehensive React Native mobile application for restaurant vendors to manage their business operations, including order management, menu management, analytics, and more.

## Features

### 🍽️ Order Management
- Real-time order notifications
- Order status tracking and updates
- Order history and analytics
- Bulk order operations

### 📋 Menu Management
- Add, edit, and delete menu items
- Category management
- Price and availability controls
- Image upload and management

### 📊 Analytics & Insights
- Revenue analytics and reports
- Order analytics and trends
- Popular items tracking
- Customer insights

### 📦 Inventory Management
- Stock tracking and alerts
- Low stock notifications
- Ingredient management
- Inventory reports

### 💰 Financial Management
- Revenue tracking
- Payment history
- Payout management
- Financial reports

### ⚙️ Settings & Configuration
- Restaurant profile management
- Operating hours setup
- Notification preferences
- Security settings

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **UI Components**: React Native Paper, React Native Elements
- **Charts**: React Native Chart Kit
- **HTTP Client**: Axios
- **Storage**: AsyncStorage, SecureStore
- **Notifications**: Expo Notifications
- **Image Handling**: Expo Image Picker
- **Icons**: React Native Vector Icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Crave_Kitchen_Vendor
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
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

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

