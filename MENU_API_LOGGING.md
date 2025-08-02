# Menu API Logging Documentation

## Overview

This document describes the comprehensive logging system implemented for the Menu Management APIs in the Crave Kitchen App. The logging system provides detailed tracking of all API interactions, user actions, and error scenarios to facilitate debugging and monitoring.

## Logging Structure

### 1. Log Format

All logs follow a consistent format with prefixes to identify the source:

```
[TAG] Message: details
```

### 2. Log Tags

- `[MENU API]` - Core API call logging
- `[MENU CATEGORIES]` - Category-related operations
- `[MENU ITEMS]` - Menu item operations
- `[MENU IMAGES]` - Image management operations
- `[MENU AVAILABILITY]` - Availability and scheduling operations
- `[MENU OVERVIEW]` - Analytics and overview operations
- `[MENU SERVICE]` - High-level service operations
- `[ADD MENU ITEM]` - AddMenuItemScreen operations
- `[MENU MANAGEMENT]` - MenuManagementScreen operations
- `[CATEGORY MANAGEMENT]` - CategoryManagementScreen operations

## Detailed Logging Categories

### 1. API Call Logging

#### Request Logging

```javascript
[MENU API] Starting GET request to: /api/menu/categories?vendorId=1
[MENU API] Full URL: http://localhost:9090/api/menu/categories?vendorId=1
[MENU API] Headers: { Authorization: "Bearer token", Content-Type: "application/json" }
[MENU API] Request config: { method: "GET", headers: {...}, body: "None" }
```

#### Response Logging

```javascript
[MENU API] Response received in 245ms: { status: 200, statusText: "OK", success: true, message: "Categories retrieved successfully" }
[MENU SUCCESS] GET /api/menu/categories: Categories retrieved successfully
```

#### Error Logging

```javascript
[MENU API] Request failed after 5000ms: Error: Network request failed
[MENU API ERROR] GET /api/menu/categories: Error: Network request failed
```

### 2. Category Operations Logging

#### Get Categories

```javascript
[MENU CATEGORIES] Getting all categories for vendor: 1
[MENU CATEGORIES] Filters: { isActive: true }
[MENU API] Query params: vendorId=1&isActive=true
[MENU CATEGORIES] Retrieved 5 categories
```

#### Create Category

```javascript
[MENU CATEGORIES] Creating new category: { name: "Appetizers", description: "Starters", vendorId: 1 }
[MENU CATEGORIES] Category created successfully: Appetizers
```

#### Update Category

```javascript
[MENU CATEGORIES] Updating category 1: { name: "Updated Appetizers", description: "Updated description" }
[MENU CATEGORIES] Category updated successfully: Updated Appetizers
```

#### Delete Category

```javascript
[MENU CATEGORIES] Deleting category: 1
[MENU CATEGORIES] Category deleted successfully: 1
```

### 3. Menu Item Operations Logging

#### Get Items

```javascript
[MENU ITEMS] Getting all items for vendor: 1
[MENU ITEMS] Filters: { isAvailable: true, categoryId: 1 }
[MENU ITEMS] Retrieved 12 items
```

#### Create Item

```javascript
[MENU ITEMS] Creating new item: { name: "Pizza Margherita", categoryId: 1, price: 12.99, vendorId: 1 }
[MENU ITEMS] Item created successfully: Pizza Margherita
```

#### Update Item

```javascript
[MENU ITEMS] Updating item 1: { name: "Updated Pizza", categoryId: 1, price: 14.99 }
[MENU ITEMS] Item updated successfully: Updated Pizza
```

#### Delete Item

```javascript
[MENU ITEMS] Deleting item: 1
[MENU ITEMS] Item deleted successfully: 1
```

#### Search Items

```javascript
[MENU ITEMS] Searching items for vendor: 1, term: "pizza"
[MENU ITEMS] Search found 3 items
```

### 4. Image Operations Logging

#### Get Images

```javascript
[MENU IMAGES] Getting images for item: 1
[MENU IMAGES] Retrieved 2 images for item 1
```

#### Upload Image

```javascript
[MENU IMAGES] Uploading image for item: 1
[MENU IMAGES] Image uploaded successfully for item 1
```

#### Set Primary Image

```javascript
[MENU IMAGES] Setting primary image 2 for item: 1
[MENU IMAGES] Primary image set successfully for item 1
```

#### Delete Image

```javascript
[MENU IMAGES] Deleting image 2 for item: 1
[MENU IMAGES] Image deleted successfully: 2
```

### 5. Availability Operations Logging

#### Get Availability

```javascript
[MENU AVAILABILITY] Getting availability for item: 1
[MENU AVAILABILITY] Retrieved availability for item 1
```

#### Update Availability

```javascript
[MENU AVAILABILITY] Updating availability for item: 1
[MENU AVAILABILITY] Availability updated successfully for item 1
```

#### Create Special Offer

```javascript
[MENU AVAILABILITY] Creating special offer for item: 1 { dayOfWeek: 1, specialOfferPrice: 9.99 }
[MENU AVAILABILITY] Special offer created successfully for item 1
```

### 6. Overview & Analytics Logging

#### Get Menu Overview

```javascript
[MENU OVERVIEW] Getting menu overview for vendor: 1
[MENU OVERVIEW] Retrieved menu overview for vendor 1
```

#### Get Featured Items

```javascript
[MENU OVERVIEW] Getting featured items for vendor: 1, limit: 10
[MENU OVERVIEW] Retrieved 5 featured items for vendor 1
```

#### Get Dietary Preferences

```javascript
[MENU OVERVIEW] Getting dietary preference items for vendor: 1, preference: VEGETARIAN
[MENU OVERVIEW] Retrieved 8 VEGETARIAN items for vendor 1
```

### 7. Service Operations Logging

#### Get Menu Management Data

```javascript
[MENU SERVICE] Getting menu management data for vendor: 1
[MENU SERVICE] Menu management data retrieved: { categoriesCount: 5, itemsCount: 25 }
```

#### Get Menu Preview Data

```javascript
[MENU SERVICE] Getting menu preview data for vendor: 1
[MENU SERVICE] Menu preview data retrieved: { overviewStats: 8, featuredItemsCount: 5 }
```

#### Toggle Item Availability

```javascript
[MENU SERVICE] Toggling availability for item 1 to: false
[MENU SERVICE] Item 1 availability toggled successfully to: false
```

### 8. Screen Operations Logging

#### AddMenuItemScreen

```javascript
[ADD MENU ITEM] Loading categories for vendor: 1
[ADD MENU ITEM] Loaded 5 categories
[ADD MENU ITEM] Validating form data: { name: "Pizza", price: "12.99", categoryId: "1" }
[ADD MENU ITEM] Form validation result: PASS {}
[ADD MENU ITEM] Save button pressed
[ADD MENU ITEM] Creating menu item with data: { name: "Pizza", price: 12.99, categoryId: 1 }
[ADD MENU ITEM] Menu item created successfully: Pizza
[ADD MENU ITEM] Navigating back after successful creation
```

#### MenuManagementScreen

```javascript
[MENU MANAGEMENT] Loading menu data for vendor: 1
[MENU MANAGEMENT] Loaded 25 items and 5 categories
[MENU MANAGEMENT] Pull-to-refresh triggered
[MENU MANAGEMENT] Toggling availability for item 1 to: false
[MENU MANAGEMENT] Availability toggled successfully for item 1
[MENU MANAGEMENT] Edit item pressed for: Pizza Margherita (ID: 1)
[MENU MANAGEMENT] Delete item pressed for: Pizza Margherita (ID: 1)
[MENU MANAGEMENT] Performing delete for item: 1
[MENU MANAGEMENT] Item 1 deleted successfully
```

#### CategoryManagementScreen

```javascript
[CATEGORY MANAGEMENT] Loading categories for vendor: 1
[CATEGORY MANAGEMENT] Loaded 5 categories
[CATEGORY MANAGEMENT] Pull-to-refresh triggered
[CATEGORY MANAGEMENT] Add category button pressed
[CATEGORY MANAGEMENT] Creating category with data: { name: "Desserts", description: "Sweet treats" }
[CATEGORY MANAGEMENT] Category created successfully: Desserts
[CATEGORY MANAGEMENT] Performing delete for category: 1 (Appetizers)
[CATEGORY MANAGEMENT] Category 1 deleted successfully
```

## Error Logging Examples

### Network Errors

```javascript
[MENU API] Request failed after 5000ms: Error: Network request failed
[MENU CATEGORIES] Failed to get categories: Error: Network request failed
```

### Validation Errors

```javascript
[ADD MENU ITEM] Form validation result: FAIL { name: "Item name is required", price: "Price must be a positive number" }
```

### API Errors

```javascript
[MENU API] Response received in 200ms: { status: 400, statusText: "Bad Request", success: false, message: "Validation failed" }
[MENU ITEMS] Failed to create item: Error: Validation failed
```

### Authorization Errors

```javascript
[MENU API] Response received in 150ms: { status: 401, statusText: "Unauthorized", success: false, message: "Invalid token" }
[MENU CATEGORIES] Failed to get categories: Error: Invalid token
```

## Performance Monitoring

### Response Time Logging

```javascript
[MENU API] Response received in 245ms: { status: 200, success: true }
[MENU API] Request failed after 5000ms: Error: Timeout
```

### Data Volume Logging

```javascript
[MENU CATEGORIES] Retrieved 5 categories
[MENU ITEMS] Retrieved 25 items
[MENU SERVICE] Menu management data retrieved: { categoriesCount: 5, itemsCount: 25 }
```

## Debugging Tips

### 1. Filtering Logs

Use the log tags to filter and search for specific operations:

- Search for `[MENU API]` to see all API calls
- Search for `[MENU ITEMS]` to see item-related operations
- Search for `[ADD MENU ITEM]` to see add item screen operations

### 2. Error Tracking

- Look for `[MENU API ERROR]` tags for API failures
- Check for validation errors in screen operations
- Monitor response times for performance issues

### 3. User Flow Tracking

- Follow the sequence of logs to understand user actions
- Check for successful operations vs failures
- Monitor data loading and refresh operations

### 4. Performance Analysis

- Monitor response times in `[MENU API]` logs
- Check for timeouts or slow responses
- Analyze data volume in service operations

## Log Levels

The logging system uses different console methods for different levels:

- `console.log()` - General information and success messages
- `console.error()` - Error messages and failures
- `console.warn()` - Warning messages (if implemented)

## Best Practices

1. **Consistent Tagging**: Always use the appropriate tag for each operation
2. **Detailed Context**: Include relevant IDs, names, and parameters in logs
3. **Error Handling**: Log both the error and the context where it occurred
4. **Performance Monitoring**: Track response times and data volumes
5. **User Actions**: Log user interactions to understand usage patterns

## Future Enhancements

1. **Remote Logging**: Send logs to a remote service for production monitoring
2. **Log Levels**: Implement configurable log levels (DEBUG, INFO, WARN, ERROR)
3. **Performance Metrics**: Add more detailed performance tracking
4. **User Analytics**: Track user behavior patterns from logs
5. **Alert System**: Set up alerts for critical errors or performance issues
