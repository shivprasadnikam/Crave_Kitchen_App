# API Configuration Guide

## Overview

This guide explains how to configure the API endpoints and base URLs for the Crave Kitchen Vendor App.

## Configuration Files

### 1. Main Configuration: `src/config/apiConfig.js`

This file contains all API configuration including:

- Base URLs for different environments
- All API endpoints
- Default headers
- Environment detection

### 2. Auth Service: `src/services/authService.js`

This file handles all authentication-related API calls using the configuration.

## Environment Setup

### Development Environment

```javascript
// In src/config/apiConfig.js
const CURRENT_ENV = ENV.DEVELOPMENT;

const API_CONFIGS = {
  [ENV.DEVELOPMENT]: {
    BASE_URL: "http://localhost:8080", // Your local Spring Boot server
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  // ... other environments
};
```

### Staging Environment

```javascript
const API_CONFIGS = {
  [ENV.STAGING]: {
    BASE_URL: "https://staging-api.cravekitchen.com", // Your staging server
    TIMEOUT: 15000,
    RETRY_ATTEMPTS: 3,
  },
};
```

### Production Environment

```javascript
const API_CONFIGS = {
  [ENV.PRODUCTION]: {
    BASE_URL: "https://api.cravekitchen.com", // Your production server
    TIMEOUT: 20000,
    RETRY_ATTEMPTS: 2,
  },
};
```

## API Endpoints

### Authentication Endpoints

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Forgot Password**: `POST /api/auth/forgot-password`
- **Reset Password**: `POST /api/auth/reset-password`
- **Refresh Token**: `POST /api/auth/refresh-token`
- **Verify Email**: `POST /api/auth/verify-email`

### Vendor Management Endpoints

- **Get Profile**: `GET /api/vendor/profile`
- **Update Profile**: `PUT /api/vendor/profile`
- **Business Hours**: `GET /api/vendor/business-hours`
- **Update Business Hours**: `PUT /api/vendor/business-hours`

### Menu Management Endpoints

- **Get Items**: `GET /api/menu/items`
- **Get Categories**: `GET /api/menu/categories`
- **Add Item**: `POST /api/menu/items`
- **Update Item**: `PUT /api/menu/items/{id}`
- **Delete Item**: `DELETE /api/menu/items/{id}`

### Orders Endpoints

- **Get Orders**: `GET /api/orders`
- **Get Order Detail**: `GET /api/orders/{id}`
- **Update Order Status**: `PUT /api/orders/{id}`
- **Order History**: `GET /api/orders/history`

### Analytics Endpoints

- **Dashboard**: `GET /api/analytics/dashboard`
- **Revenue**: `GET /api/analytics/revenue`
- **Orders**: `GET /api/analytics/orders`
- **Popular Items**: `GET /api/analytics/popular-items`

### Inventory Endpoints

- **Get Items**: `GET /api/inventory/items`
- **Add Item**: `POST /api/inventory/items`
- **Update Item**: `PUT /api/inventory/items/{id}`
- **Delete Item**: `DELETE /api/inventory/items/{id}`
- **Low Stock**: `GET /api/inventory/low-stock`

### Finances Endpoints

- **Payouts**: `GET /api/finances/payouts`
- **Payment History**: `GET /api/finances/payment-history`
- **Reports**: `GET /api/finances/reports`

## How to Change Environment

### Method 1: Change in Code

```javascript
// In src/config/apiConfig.js
const CURRENT_ENV = ENV.PRODUCTION; // Change this line
```

### Method 2: Environment Variables (Recommended)

```javascript
// In src/config/apiConfig.js
const CURRENT_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;
```

## Registration Request Example

Your registration request will be sent to:

```
POST http://localhost:8080/api/auth/register
```

With the following structure:

```json
{
  "email": "maria@tacohaven.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "name": "Maria Gonzales",
  "restaurantName": "Taco Haven",
  "phone": "+1234567890",
  "address": {
    "street": "123 Fiesta Lane",
    "city": "Austin",
    "state": "TX",
    "zipCode": "73301",
    "country": "USA"
  },
  "businessHours": {
    "monday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "17:00"
    },
    "tuesday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "17:00"
    }
    // ... other days
  },
  "cuisineType": "Mexican",
  "description": "Authentic Mexican street food served fresh daily.",
  "acceptTerms": true,
  "acceptMarketing": false
}
```

## Testing Your Configuration

### 1. Check Current Configuration

```javascript
import apiConfig from "./src/config/apiConfig";

console.log("Current Environment:", apiConfig.CURRENT_ENV);
console.log("Base URL:", apiConfig.getCurrentConfig().BASE_URL);
console.log("Register Endpoint:", apiConfig.ENDPOINTS.AUTH.REGISTER);
console.log(
  "Full Register URL:",
  apiConfig.getFullUrl(apiConfig.ENDPOINTS.AUTH.REGISTER)
);
```

### 2. Test API Connection

```javascript
// In your app, try registering a user
// The console will show the API calls and responses
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Spring Boot backend allows requests from your React Native app
2. **Network Errors**: Check if the base URL is correct and the server is running
3. **Authentication Errors**: Verify the API endpoints match your backend implementation

### Debug Mode

The API calls include console logging. Check your console for:

- API call details
- Request data
- Response data
- Error messages

## Security Notes

- Never commit sensitive API keys to version control
- Use environment variables for production configurations
- Implement proper token management
- Add request/response encryption for production

## Next Steps

1. Update the `BASE_URL` in `src/config/apiConfig.js` to match your Spring Boot server
2. Test the registration endpoint
3. Implement other API endpoints as needed
4. Add proper error handling and loading states
5. Implement token refresh logic
