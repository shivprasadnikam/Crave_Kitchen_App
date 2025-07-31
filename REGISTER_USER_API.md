# Register User API Documentation

## POST /api/auth/register

**Description:** Register a new vendor account in the Crave Kitchen system

**Content-Type:** `application/json`

---

## Request Structure

### Headers

```
Content-Type: application/json
Accept: application/json
```

### Request Body

```json
{
  "email": "newvendor@restaurant.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!",
  "name": "John Smith",
  "restaurantName": "Tasty Bites Deluxe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "businessHours": {
    "monday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "22:00"
    },
    "tuesday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "22:00"
    },
    "wednesday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "22:00"
    },
    "thursday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "22:00"
    },
    "friday": {
      "isOpen": true,
      "openTime": "09:00",
      "closeTime": "23:00"
    },
    "saturday": {
      "isOpen": true,
      "openTime": "10:00",
      "closeTime": "23:00"
    },
    "sunday": {
      "isOpen": true,
      "openTime": "10:00",
      "closeTime": "21:00"
    }
  },
  "cuisineType": "Italian",
  "description": "Authentic Italian cuisine with fresh ingredients",
  "acceptTerms": true,
  "acceptMarketing": false
}
```

### Field Descriptions

| Field                           | Type    | Required | Description                                                                     |
| ------------------------------- | ------- | -------- | ------------------------------------------------------------------------------- |
| `email`                         | string  | Yes      | Valid email address (must be unique)                                            |
| `password`                      | string  | Yes      | Password (min 8 chars, must contain uppercase, lowercase, number, special char) |
| `confirmPassword`               | string  | Yes      | Must match password exactly                                                     |
| `name`                          | string  | Yes      | Full name of the vendor                                                         |
| `restaurantName`                | string  | Yes      | Name of the restaurant                                                          |
| `phone`                         | string  | Yes      | Phone number with country code                                                  |
| `address`                       | object  | Yes      | Restaurant address information                                                  |
| `address.street`                | string  | Yes      | Street address                                                                  |
| `address.city`                  | string  | Yes      | City name                                                                       |
| `address.state`                 | string  | Yes      | State/province                                                                  |
| `address.zipCode`               | string  | Yes      | ZIP/postal code                                                                 |
| `address.country`               | string  | No       | Country (defaults to "USA")                                                     |
| `businessHours`                 | object  | Yes      | Operating hours for each day                                                    |
| `businessHours.[day].isOpen`    | boolean | Yes      | Whether restaurant is open on this day                                          |
| `businessHours.[day].openTime`  | string  | No       | Opening time in HH:MM format (required if isOpen=true)                          |
| `businessHours.[day].closeTime` | string  | No       | Closing time in HH:MM format (required if isOpen=true)                          |
| `cuisineType`                   | string  | No       | Type of cuisine served                                                          |
| `description`                   | string  | No       | Restaurant description                                                          |
| `acceptTerms`                   | boolean | Yes      | Must be true to accept terms and conditions                                     |
| `acceptMarketing`               | boolean | No       | Whether to receive marketing emails                                             |

---

## Response Structures

### Success Response (201 Created)

```json
{
  "success": true,
  "message": "Registration successful. Please verify your email to activate your account.",
  "data": {
    "user": {
      "id": 2,
      "email": "newvendor@restaurant.com",
      "name": "John Smith",
      "role": "vendor",
      "isActive": false,
      "isEmailVerified": false,
      "createdAt": "2024-01-20T14:45:00Z",
      "updatedAt": "2024-01-20T14:45:00Z"
    },
    "vendorProfile": {
      "id": 2,
      "restaurantName": "Tasty Bites Deluxe",
      "cuisineType": "Italian",
      "description": "Authentic Italian cuisine with fresh ingredients",
      "address": {
        "street": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "phone": "+1234567890",
      "isApproved": false,
      "approvalStatus": "pending",
      "createdAt": "2024-01-20T14:45:00Z"
    },
    "businessHours": {
      "monday": {
        "isOpen": true,
        "openTime": "09:00",
        "closeTime": "22:00"
      },
      "tuesday": {
        "isOpen": true,
        "openTime": "09:00",
        "closeTime": "22:00"
      },
      "wednesday": {
        "isOpen": true,
        "openTime": "09:00",
        "closeTime": "22:00"
      },
      "thursday": {
        "isOpen": true,
        "openTime": "09:00",
        "closeTime": "22:00"
      },
      "friday": {
        "isOpen": true,
        "openTime": "09:00",
        "closeTime": "23:00"
      },
      "saturday": {
        "isOpen": true,
        "openTime": "10:00",
        "closeTime": "23:00"
      },
      "sunday": {
        "isOpen": true,
        "openTime": "10:00",
        "closeTime": "21:00"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "expiresIn": 3600
    },
    "nextSteps": [
      "Check your email for verification link",
      "Complete email verification to activate account",
      "Wait for admin approval (usually within 24 hours)",
      "Set up your menu and pricing once approved"
    ]
  }
}
```

### Error Response (400 Bad Request) - Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "error": "VALIDATION_ERROR",
  "timestamp": "2024-01-20T14:45:00Z",
  "errors": [
    {
      "field": "email",
      "message": "Email is already registered",
      "code": "EMAIL_ALREADY_EXISTS"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
      "code": "PASSWORD_REQUIREMENTS_NOT_MET"
    },
    {
      "field": "confirmPassword",
      "message": "Passwords do not match",
      "code": "PASSWORDS_DONT_MATCH"
    },
    {
      "field": "phone",
      "message": "Invalid phone number format. Please use international format (e.g., +1234567890)",
      "code": "INVALID_PHONE_FORMAT"
    },
    {
      "field": "businessHours.monday.openTime",
      "message": "Opening time is required when restaurant is marked as open",
      "code": "MISSING_OPENING_TIME"
    },
    {
      "field": "acceptTerms",
      "message": "You must accept the terms and conditions to register",
      "code": "TERMS_NOT_ACCEPTED"
    }
  ]
}
```

### Error Response (409 Conflict) - Email Already Exists

```json
{
  "success": false,
  "message": "Email address is already registered",
  "error": "EMAIL_ALREADY_EXISTS",
  "timestamp": "2024-01-20T14:45:00Z",
  "data": {
    "email": "newvendor@restaurant.com",
    "suggestion": "Try logging in instead or use a different email address"
  }
}
```

### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Internal server error occurred during registration",
  "error": "INTERNAL_SERVER_ERROR",
  "timestamp": "2024-01-20T14:45:00Z",
  "requestId": "req_1234567890abcdef"
}
```

---

## Validation Rules

### Email Validation

- Must be a valid email format
- Must be unique in the system
- Maximum length: 255 characters

### Password Validation

- Minimum length: 8 characters
- Must contain at least:
  - One uppercase letter (A-Z)
  - One lowercase letter (a-z)
  - One number (0-9)
  - One special character (!@#$%^&\*()\_+-=[]{}|;:,.<>?)

### Phone Validation

- Must be in international format (e.g., +1234567890)
- Must be a valid phone number format

### Business Hours Validation

- If `isOpen` is true, both `openTime` and `closeTime` are required
- Time format must be HH:MM (24-hour format)
- `closeTime` must be after `openTime`
- If `isOpen` is false, `openTime` and `closeTime` should be null

### Address Validation

- All address fields are required
- ZIP code must be valid format for the country
- State must be valid for the country

---

## Business Logic

### Account Creation Process

1. **Validation**: Validate all input fields
2. **Email Check**: Ensure email is not already registered
3. **Password Hashing**: Hash password using bcrypt
4. **User Creation**: Create user record in `ck_users` table
5. **Vendor Profile**: Create vendor profile in `ck_vendor_profiles` table
6. **Business Hours**: Create business hours records in `ck_business_hours` table
7. **Email Verification**: Generate and store email verification token
8. **Welcome Email**: Send welcome email with verification link
9. **Token Generation**: Generate JWT access and refresh tokens
10. **Response**: Return user data and tokens

### Email Verification

- Email verification is required before account activation
- Verification token expires in 24 hours
- User cannot login until email is verified

### Account Approval

- New vendor accounts require admin approval
- Approval status starts as "pending"
- Admin can approve or reject with notes
- Only approved vendors can access full features

---

## Security Considerations

### Password Security

- Passwords are hashed using bcrypt with salt rounds of 12
- Password history is not currently tracked
- Password reset functionality available

### Token Security

- JWT tokens are signed with a secure secret key
- Access tokens expire in 1 hour
- Refresh tokens expire in 7 days
- Tokens are stored securely in `ck_auth_tokens` table

### Data Protection

- Personal data is encrypted at rest
- API responses do not include sensitive information
- Audit trail is maintained for all operations

---

## Rate Limiting

- Registration attempts are limited to 5 per hour per IP address
- Email verification requests are limited to 3 per hour per email
- Failed attempts are logged for security monitoring

---

## Testing Examples

### Valid Registration Request

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testvendor@restaurant.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "name": "Test Vendor",
    "restaurantName": "Test Restaurant",
    "phone": "+1234567890",
    "address": {
      "street": "123 Test St",
      "city": "Test City",
      "state": "TS",
      "zipCode": "12345",
      "country": "USA"
    },
    "businessHours": {
      "monday": {"isOpen": true, "openTime": "09:00", "closeTime": "17:00"}
    },
    "acceptTerms": true
  }'
```

### Invalid Registration Request (Missing Fields)

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "incomplete@test.com",
    "password": "weak"
  }'
```
