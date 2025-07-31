# Authentication API Endpoints Documentation

This document defines the request and response structures for all authentication-related API endpoints in the Crave Kitchen App.

## Base URL

```
https://api.cravekitchen.com
```

## Authentication Headers

All authenticated requests should include:

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 1. POST /api/auth/login

**Description:** Authenticate a user with email and password

### Request

```json
{
  "email": "vendor@restaurant.com",
  "password": "securePassword123"
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "vendor@restaurant.com",
      "name": "John Doe",
      "role": "vendor",
      "restaurantName": "Tasty Bites",
      "phone": "+1234567890",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLoginAt": "2024-01-20T14:45:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

### Response (Error - 401)

```json
{
  "success": false,
  "message": "Invalid email or password",
  "error": "AUTHENTICATION_FAILED",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 2. POST /api/auth/register

**Description:** Register a new vendor account

### Request

```json
{
  "email": "newvendor@restaurant.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "name": "Jane Smith",
  "restaurantName": "Fresh Delights",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "businessHours": {
    "monday": { "open": "09:00", "close": "22:00" },
    "tuesday": { "open": "09:00", "close": "22:00" },
    "wednesday": { "open": "09:00", "close": "22:00" },
    "thursday": { "open": "09:00", "close": "22:00" },
    "friday": { "open": "09:00", "close": "23:00" },
    "saturday": { "open": "10:00", "close": "23:00" },
    "sunday": { "open": "10:00", "close": "21:00" }
  },
  "cuisineType": "Italian",
  "acceptTerms": true
}
```

### Response (Success - 201)

```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "user": {
      "id": 2,
      "email": "newvendor@restaurant.com",
      "name": "Jane Smith",
      "role": "vendor",
      "restaurantName": "Fresh Delights",
      "phone": "+1234567890",
      "isActive": false,
      "isEmailVerified": false,
      "createdAt": "2024-01-20T14:45:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

### Response (Error - 400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is already registered"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ],
  "error": "VALIDATION_ERROR",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 3. POST /api/auth/forgot-password

**Description:** Request a password reset email

### Request

```json
{
  "email": "vendor@restaurant.com"
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Password reset email sent successfully",
  "data": {
    "email": "vendor@restaurant.com",
    "resetTokenExpiry": "2024-01-20T16:45:00Z"
  }
}
```

### Response (Error - 404)

```json
{
  "success": false,
  "message": "User not found",
  "error": "USER_NOT_FOUND",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 4. POST /api/auth/reset-password

**Description:** Reset password using reset token

### Request

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": {
    "userId": 1,
    "passwordChangedAt": "2024-01-20T14:45:00Z"
  }
}
```

### Response (Error - 400)

```json
{
  "success": false,
  "message": "Invalid or expired reset token",
  "error": "INVALID_TOKEN",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 5. POST /api/auth/refresh-token

**Description:** Refresh access token using refresh token

### Request

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### Response (Error - 401)

```json
{
  "success": false,
  "message": "Invalid refresh token",
  "error": "INVALID_REFRESH_TOKEN",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 6. POST /api/auth/logout

**Description:** Logout user and invalidate tokens

### Request

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": {
    "userId": 1,
    "loggedOutAt": "2024-01-20T14:45:00Z"
  }
}
```

### Response (Error - 401)

```json
{
  "success": false,
  "message": "Invalid refresh token",
  "error": "INVALID_REFRESH_TOKEN",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 7. GET /api/auth/profile

**Description:** Get current user profile

### Request Headers

```
Authorization: Bearer <access_token>
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "vendor@restaurant.com",
      "name": "John Doe",
      "role": "vendor",
      "restaurantName": "Tasty Bites",
      "phone": "+1234567890",
      "address": {
        "street": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "businessHours": {
        "monday": { "open": "09:00", "close": "22:00" },
        "tuesday": { "open": "09:00", "close": "22:00" },
        "wednesday": { "open": "09:00", "close": "22:00" },
        "thursday": { "open": "09:00", "close": "22:00" },
        "friday": { "open": "09:00", "close": "23:00" },
        "saturday": { "open": "10:00", "close": "23:00" },
        "sunday": { "open": "10:00", "close": "21:00" }
      },
      "cuisineType": "Italian",
      "isActive": true,
      "isEmailVerified": true,
      "profileImage": "https://api.cravekitchen.com/uploads/profile/user1.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:45:00Z",
      "lastLoginAt": "2024-01-20T14:45:00Z"
    }
  }
}
```

### Response (Error - 401)

```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": "UNAUTHORIZED",
  "timestamp": "2024-01-20T14:45:00Z"
}
```

---

## 8. PUT /api/auth/profile

**Description:** Update current user profile

### Request Headers

```
Authorization: Bearer <access_token>
```

### Request

```json
{
  "name": "John Smith",
  "restaurantName": "Tasty Bites Deluxe",
  "phone": "+1234567890",
  "address": {
    "street": "456 Oak Avenue",
    "city": "New York",
    "state": "NY",
    "zipCode": "10002",
    "country": "USA"
  },
  "businessHours": {
    "monday": { "open": "08:00", "close": "23:00" },
    "tuesday": { "open": "08:00", "close": "23:00" },
    "wednesday": { "open": "08:00", "close": "23:00" },
    "thursday": { "open": "08:00", "close": "23:00" },
    "friday": { "open": "08:00", "close": "00:00" },
    "saturday": { "open": "09:00", "close": "00:00" },
    "sunday": { "open": "09:00", "close": "22:00" }
  },
  "cuisineType": "Mediterranean"
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "vendor@restaurant.com",
      "name": "John Smith",
      "role": "vendor",
      "restaurantName": "Tasty Bites Deluxe",
      "phone": "+1234567890",
      "address": {
        "street": "456 Oak Avenue",
        "city": "New York",
        "state": "NY",
        "zipCode": "10002",
        "country": "USA"
      },
      "businessHours": {
        "monday": { "open": "08:00", "close": "23:00" },
        "tuesday": { "open": "08:00", "close": "23:00" },
        "wednesday": { "open": "08:00", "close": "23:00" },
        "thursday": { "open": "08:00", "close": "23:00" },
        "friday": { "open": "08:00", "close": "00:00" },
        "saturday": { "open": "09:00", "close": "00:00" },
        "sunday": { "open": "09:00", "close": "22:00" }
      },
      "cuisineType": "Mediterranean",
      "isActive": true,
      "isEmailVerified": true,
      "profileImage": "https://api.cravekitchen.com/uploads/profile/user1.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T15:30:00Z",
      "lastLoginAt": "2024-01-20T14:45:00Z"
    }
  }
}
```

### Response (Error - 400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "phone",
      "message": "Invalid phone number format"
    }
  ],
  "error": "VALIDATION_ERROR",
  "timestamp": "2024-01-20T15:30:00Z"
}
```

---

## Error Response Format

All error responses follow this standard format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "timestamp": "2024-01-20T14:45:00Z",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Common Error Codes

- `AUTHENTICATION_FAILED` - Invalid credentials
- `UNAUTHORIZED` - Missing or invalid access token
- `VALIDATION_ERROR` - Request validation failed
- `USER_NOT_FOUND` - User does not exist
- `INVALID_TOKEN` - Invalid or expired token
- `INVALID_REFRESH_TOKEN` - Invalid refresh token
- `EMAIL_ALREADY_EXISTS` - Email is already registered
- `SERVER_ERROR` - Internal server error

## Status Codes

- `200` - Success
- `201` - Created (for registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
