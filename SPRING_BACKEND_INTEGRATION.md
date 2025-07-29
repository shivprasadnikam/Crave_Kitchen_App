# Spring Backend Integration Guide

## Overview

This React Native app is designed to work with a Java Spring backend. The app currently uses mock data for development and can seamlessly switch to real API calls when your Spring backend is ready.

## Current Setup

### Mock Data Mode (Development)

- ✅ **Enabled by default** in development mode
- ✅ **Realistic data** for all features
- ✅ **Simulated API delays** for realistic testing
- ✅ **No backend required** for development

### Real API Mode (Production)

- 🔄 **Ready to switch** when Spring backend is available
- 🔄 **Configured endpoints** match Spring REST API structure
- 🔄 **Authentication flow** supports JWT tokens
- 🔄 **Error handling** for network issues

## Spring Backend Requirements

### Base URL Configuration

```java
// Your Spring app should run on:
http://localhost:8080/api/v1
```

### Required Dependencies

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- JWT Support -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>

    <!-- Database (JPA/Hibernate) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- File Upload -->
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.4</version>
    </dependency>
</dependencies>
```

### Required API Endpoints

#### Authentication

```
POST /api/v1/auth/vendor/login
POST /api/v1/auth/vendor/register
POST /api/v1/auth/vendor/logout
POST /api/v1/auth/vendor/refresh
POST /api/v1/auth/vendor/forgot-password
POST /api/v1/auth/vendor/reset-password
```

#### Vendor Profile

```
GET    /api/v1/vendor/profile
PUT    /api/v1/vendor/profile/update
POST   /api/v1/vendor/profile/avatar
GET    /api/v1/vendor/restaurant
PUT    /api/v1/vendor/restaurant/update
GET    /api/v1/vendor/operating-hours
PUT    /api/v1/vendor/operating-hours/update
```

#### Menu Management

```
GET    /api/v1/vendor/menu/categories
POST   /api/v1/vendor/menu/categories
PUT    /api/v1/vendor/menu/categories/{id}
DELETE /api/v1/vendor/menu/categories/{id}

GET    /api/v1/vendor/menu/items
POST   /api/v1/vendor/menu/items
PUT    /api/v1/vendor/menu/items/{id}
DELETE /api/v1/vendor/menu/items/{id}
PATCH  /api/v1/vendor/menu/items/{id}/availability
PATCH  /api/v1/vendor/menu/items/{id}/price
POST   /api/v1/vendor/menu/items/{id}/image
```

#### Orders

```
GET    /api/v1/vendor/orders
GET    /api/v1/vendor/orders/{id}
PATCH  /api/v1/vendor/orders/{id}/status
POST   /api/v1/vendor/orders/{id}/accept
POST   /api/v1/vendor/orders/{id}/reject
POST   /api/v1/vendor/orders/{id}/ready
POST   /api/v1/vendor/orders/{id}/delivered
POST   /api/v1/vendor/orders/{id}/cancel
```

#### Analytics

```
GET /api/v1/vendor/analytics/dashboard
GET /api/v1/vendor/analytics/revenue
GET /api/v1/vendor/analytics/orders
GET /api/v1/vendor/analytics/popular-items
GET /api/v1/vendor/analytics/customers
```

#### Inventory

```
GET    /api/v1/vendor/inventory/items
POST   /api/v1/vendor/inventory/items
PUT    /api/v1/vendor/inventory/items/{id}
DELETE /api/v1/vendor/inventory/items/{id}
PATCH  /api/v1/vendor/inventory/items/{id}/stock
GET    /api/v1/vendor/inventory/low-stock
```

#### Notifications

```
GET    /api/v1/vendor/notifications
PATCH  /api/v1/vendor/notifications/{id}/read
PATCH  /api/v1/vendor/notifications/mark-all-read
DELETE /api/v1/vendor/notifications/{id}
```

#### File Upload

```
POST /api/v1/upload/image
POST /api/v1/upload/menu-image
POST /api/v1/upload/avatar
```

## Data Models (Java Entities)

### Vendor Entity

```java
@Entity
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String name;
    private String phone;
    private String role;
    private String avatar;
    private boolean isVerified;
    private boolean twoFactorEnabled;
    private LocalDateTime lastLogin;

    // Getters, setters, constructors
}
```

### Restaurant Entity

```java
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String cuisine;
    private String phone;
    private String email;
    private String website;
    private boolean isOpen;
    private Double rating;
    private Integer totalReviews;
    private String logo;
    private String banner;

    @Embedded
    private Address address;

    @Embedded
    private Coordinates coordinates;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<OperatingHours> operatingHours;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<DeliveryZone> deliveryZones;

    // Getters, setters, constructors
}
```

### Menu Item Entity

```java
@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private String image;
    private boolean isAvailable;
    private boolean isPopular;
    private Integer preparationTime;
    private Integer calories;

    @ElementCollection
    private List<String> allergens;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private MenuCategory category;

    @OneToMany(mappedBy = "menuItem", cascade = CascadeType.ALL)
    private List<Customization> customizations;

    @OneToMany(mappedBy = "menuItem", cascade = CascadeType.ALL)
    private List<AddOn> addOns;

    // Getters, setters, constructors
}
```

### Order Entity

```java
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerId;
    private String customerName;
    private String customerPhone;
    private String customerAddress;

    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal deliveryFee;
    private BigDecimal tip;
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String paymentMethod;
    private LocalDateTime orderTime;
    private LocalDateTime estimatedDelivery;
    private String notes;
    private String priority;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    // Getters, setters, constructors
}
```

## Response Format

All API responses should follow this format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Authentication

### JWT Token Structure

```java
// Token payload should include:
{
  "sub": "vendor_001",
  "email": "vendor@cravekitchen.com",
  "role": "vendor",
  "restaurantId": "rest_001",
  "iat": 1640995200,
  "exp": 1640998800
}
```

### Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/upload/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

## Switching from Mock to Real API

### 1. Update Configuration

```javascript
// In config/appConfig.js, change:
API_BASE_URL: "http://localhost:8080/api/v1"; // Your Spring backend URL
```

### 2. Disable Mock Data

```javascript
// In config/appConfig.js, change:
MOCK_DATA_ENABLED: false;
```

### 3. Test Connection

```javascript
// The app will automatically switch to real API calls
// Test with login: vendor@cravekitchen.com / password
```

## Development Workflow

### Phase 1: Frontend Development (Current)

- ✅ Use mock data for all features
- ✅ Develop UI/UX without backend dependency
- ✅ Test all user flows with realistic data

### Phase 2: Backend Development

- 🔄 Build Spring backend with required endpoints
- 🔄 Implement authentication and authorization
- 🔄 Set up database and data models
- 🔄 Test API endpoints independently

### Phase 3: Integration

- 🔄 Connect frontend to real backend
- 🔄 Test end-to-end functionality
- 🔄 Optimize performance and error handling

### Phase 4: Production

- 🔄 Deploy backend to production server
- 🔄 Update frontend API configuration
- 🔄 Monitor and maintain

## Testing

### Mock Data Credentials

```
Email: vendor@cravekitchen.com
Password: password
```

### API Testing

Use tools like Postman or curl to test your Spring endpoints:

```bash
# Test login
curl -X POST http://localhost:8080/api/v1/auth/vendor/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@cravekitchen.com","password":"password"}'

# Test protected endpoint
curl -X GET http://localhost:8080/api/v1/vendor/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Common Issues & Solutions

### CORS Issues

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### File Upload Issues

```java
@PostMapping("/upload/image")
public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
    // Handle file upload
    String fileName = fileStorageService.storeFile(file);
    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/downloadFile/")
        .path(fileName)
        .toUriString();

    return ResponseEntity.ok(new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize()));
}
```

## Next Steps

1. **Set up Spring Boot project** with required dependencies
2. **Create database schema** based on the entity models
3. **Implement authentication** with JWT tokens
4. **Build API endpoints** following the specified structure
5. **Test endpoints** with Postman or similar tools
6. **Update frontend configuration** to use real API
7. **Deploy and monitor** the integrated system

## Support

If you need help with:

- **Spring Boot setup**: Check Spring Boot documentation
- **JWT implementation**: Use Spring Security + JWT libraries
- **Database design**: Follow JPA/Hibernate best practices
- **API testing**: Use Postman or similar API testing tools

The frontend is ready to work with your Spring backend once it's implemented!
