# Navigation Structure

This directory contains all navigation-related files for the Crave Kitchen vendor app.

## 📁 File Structure

```
src/navigation/
├── index.js           # Main exports
├── AppNavigator.js    # Root navigation container
├── AuthNavigator.js   # Authentication screens
├── MainNavigator.js   # Main app screens
└── README.md         # This documentation
```

## 🎯 Navigation Flow

### **AppNavigator.js** - Root Container

- **Purpose**: Main navigation container that switches between auth and main flows
- **Logic**: Checks authentication status and renders appropriate navigator
- **Screens**: None (just container)

### **AuthNavigator.js** - Authentication Flow

- **Purpose**: Handles all authentication-related screens
- **Screens**:
  - `VendorAuth` - Main auth screen with Login/Register options
  - `VendorLogin` - Login form
  - `VendorRegister` - Registration form
  - `ForgotPassword` - Password reset

### **MainNavigator.js** - Main App Flow

- **Purpose**: Handles all main app screens after authentication
- **Screens**:
  - `Home` - Main dashboard/home screen
  - `Cart` - Shopping cart (if needed)

## 🔄 User Flow

```
App Start
    ↓
AppNavigator (checks auth)
    ↓
┌─────────────────┬─────────────────┐
│   Not Auth      │   Authenticated │
│     ↓           │       ↓         │
│ AuthNavigator   │ MainNavigator   │
│     ↓           │       ↓         │
│ VendorAuth      │     Home        │
│     ↓           │       ↓         │
│ Login/Register  │   Other Screens │
└─────────────────┴─────────────────┘
```

## 🚀 Usage

### Import in App.js

```javascript
import AppNavigator from "./src/navigation/AppNavigator";
```

### Import specific navigators

```javascript
import { AuthNavigator, MainNavigator } from "./src/navigation";
```

## 📱 Adding New Screens

### 1. Add to AuthNavigator (if auth-related)

```javascript
// In AuthNavigator.js
import NewAuthScreen from "../screens/auth/NewAuthScreen";

<Stack.Screen name="NewAuth" component={NewAuthScreen} />;
```

### 2. Add to MainNavigator (if main app screen)

```javascript
// In MainNavigator.js
import NewScreen from "../screens/NewScreen";

<Stack.Screen name="NewScreen" component={NewScreen} />;
```

## 🎨 Navigation Options

### Auth Screens

- `headerShown: false` - Clean, full-screen experience

### Main Screens

- `headerStyle: { backgroundColor: '#FF6B35' }` - Brand colors
- `headerTintColor: '#fff'` - White text
- `headerTitleStyle: { fontWeight: 'bold' }` - Bold titles

## 🔧 Best Practices

1. **Separation of Concerns**: Auth and main flows are separate
2. **Clean Imports**: Use index.js for clean imports
3. **Consistent Styling**: All main screens use same header style
4. **Easy Maintenance**: Each navigator handles its own screens
5. **Scalable**: Easy to add new screens to appropriate navigator

## 🐛 Troubleshooting

### Common Issues:

1. **Import Errors**: Check if screen exists in correct location
2. **Navigation Not Working**: Ensure screen is added to correct navigator
3. **Styling Issues**: Check header options in navigator

### Debug Tips:

- Use `console.log` in navigator components
- Check screen names match exactly
- Verify import paths are correct
