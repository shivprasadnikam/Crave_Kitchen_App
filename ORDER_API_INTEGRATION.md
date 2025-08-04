# Order Management API Integration

## Overview

This document describes the integration of order management APIs in the Crave Kitchen App.

## Implemented APIs

### 1. Core Order APIs

- **GET** `/api/orders` - Get all orders with filters
- **GET** `/api/orders/{id}` - Get order by ID
- **PUT** `/api/orders/{id}` - Update order status
- **GET** `/api/orders/history` - Get order history

### 2. Enhanced Status-Specific APIs

- **GET** `/api/orders/pending` - Get pending orders only
- **GET** `/api/orders/preparing` - Get orders being prepared
- **GET** `/api/orders/ready` - Get ready orders
- **GET** `/api/orders/completed` - Get completed orders
- **GET** `/api/orders/cancelled` - Get cancelled orders

### 3. Order Action APIs

- **POST** `/api/orders/{id}/accept` - Accept order
- **POST** `/api/orders/{id}/reject` - Reject order
- **POST** `/api/orders/{id}/start-preparing` - Start preparing order
- **POST** `/api/orders/{id}/ready` - Mark order as ready
- **POST** `/api/orders/{id}/complete` - Mark order as completed

### 4. Search & Filter APIs

- **GET** `/api/orders/search` - Search orders
- **GET** `/api/orders/filter` - Filter orders by criteria

### 2. Enhanced Order Service Methods

#### Basic Operations

```javascript
// Get all orders for a vendor
orderService.getAllOrders(vendorId, filters);

// Get order by ID
orderService.getOrderById(orderId, vendorId);

// Update order status
orderService.updateOrderStatus(orderId, status, vendorId, additionalData);

// Get order history
orderService.getOrderHistory(vendorId, filters);
```

#### Order Status Workflow

```javascript
// Accept order
orderService.acceptOrder(orderId, vendorId, estimatedPreparationTime);

// Start preparing order
orderService.startPreparingOrder(orderId, vendorId);

// Mark order as ready
orderService.markOrderReady(orderId, vendorId);

// Complete order
orderService.completeOrder(orderId, vendorId);

// Reject order
orderService.rejectOrder(orderId, vendorId, reason);
```

#### Status-Specific Order Retrieval

```javascript
// Get orders by specific status
orderService.getPendingOrders(vendorId);
orderService.getPreparingOrders(vendorId);
orderService.getReadyOrders(vendorId);
orderService.getCompletedOrders(vendorId);
orderService.getCancelledOrders(vendorId);
```

#### Search & Filter

```javascript
// Search orders
orderService.searchOrders(vendorId, searchQuery, filters);

// Filter orders
orderService.filterOrders(vendorId, filters);
```

#### Filtering Orders

```javascript
// Get orders by status
orderService.getOrdersByStatus(vendorId, status);

// Get pending orders
orderService.getPendingOrders(vendorId);

// Get completed orders
orderService.getCompletedOrders(vendorId);
```

## Order Status Flow

```
pending → accepted → preparing → ready → completed
    ↓
  rejected
```

## API Request Examples

### Get Orders with Filters

```
GET /api/orders?vendorId=123&status=pending&date=2024-01-15&page=0&size=20
```

**Response:**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "ORD-001",
        "orderNumber": "ORD-2024-001",
        "customerName": "John Doe",
        "customerPhone": "+1234567890",
        "items": [
          {
            "id": "ITEM-001",
            "name": "Margherita Pizza",
            "quantity": 2,
            "price": 12.99,
            "specialInstructions": "Extra cheese"
          }
        ],
        "totalAmount": 25.98,
        "status": "pending",
        "orderTime": "2024-01-15T10:30:00Z",
        "estimatedDeliveryTime": "2024-01-15T11:00:00Z",
        "paymentStatus": "paid",
        "deliveryAddress": "123 Main St, City, State",
        "notes": "Ring doorbell twice"
      }
    ],
    "totalElements": 45,
    "totalPages": 3,
    "currentPage": 0,
    "size": 20
  }
}
```

### Update Order Status

```
PUT /api/orders/ORD-001
```

**Request Body:**

```json
{
  "status": "preparing",
  "vendorId": 123,
  "updatedAt": "2024-01-15T10:35:00Z",
  "preparationStartedAt": "2024-01-15T10:35:00Z",
  "notes": "Started preparing at 10:35 AM"
}
```

## Screens Updated

### 1. OrderListScreen (`src/screens/orders/OrderListScreen.js`)

- ✅ Integrated with real APIs
- ✅ Added status filtering (All, Pending, Accepted, Preparing, Ready, Completed)
- ✅ Added order action buttons (Accept, Reject, Start Preparing, Mark Ready, Complete)
- ✅ Real-time order updates
- ✅ Pull-to-refresh functionality
- ✅ Error handling and loading states

### 2. OrderDetailScreen (`src/screens/orders/OrderDetailScreen.js`)

- ✅ Detailed order information display
- ✅ Customer information
- ✅ Order items with special instructions
- ✅ Order timeline
- ✅ Order action buttons
- ✅ Real-time status updates

## Testing the Integration

### 1. Test Order List

1. Navigate to the "Activity" tab
2. Verify orders are loaded from the API
3. Test status filtering by tapping different filter buttons
4. Test order actions by tapping action buttons
5. Test pull-to-refresh functionality

### 2. Test Order Details

1. Tap on any order in the list
2. Verify order details are displayed correctly
3. Test order actions from the detail screen
4. Verify status updates in real-time

### 3. Test Error Handling

1. Disconnect from the internet
2. Try to load orders
3. Verify error messages are displayed
4. Test retry functionality

## API Configuration

### Environment Setup

The API base URL is configured in `src/config/apiConfig.js`:

```javascript
const API_CONFIGS = {
  [ENV.DEVELOPMENT]: {
    BASE_URL: "http://192.168.1.3:9090", // Update this to your backend URL
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  // ... other environments
};
```

### Authentication

All API calls include authentication headers:

```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}
```

## Error Handling

The order service includes comprehensive error handling:

1. **Network Errors**: Timeout, connection issues
2. **HTTP Errors**: 4xx, 5xx status codes
3. **API Errors**: Backend validation errors
4. **Authentication Errors**: Invalid/missing tokens

All errors are logged with detailed information for debugging.

## Logging

The order service includes detailed logging for debugging:

```javascript
console.log(`[ORDER SERVICE] Getting orders for vendor: ${vendorId}`);
console.log(`[ORDER SERVICE] Retrieved ${orders.length} orders`);
console.error(`[ORDER SERVICE] Failed to get orders:`, error);
```

## Next Steps

1. **Real-time Updates**: Implement WebSocket connection for live order updates
2. **Push Notifications**: Add push notifications for new orders
3. **Order Search**: Implement search functionality
4. **Bulk Operations**: Add bulk order status updates
5. **Order Analytics**: Add order performance metrics

## Troubleshooting

### Common Issues

1. **Orders not loading**

   - Check API base URL configuration
   - Verify authentication token
   - Check network connectivity

2. **Order actions failing**

   - Verify order status workflow
   - Check API endpoint permissions
   - Review error logs

3. **Status not updating**
   - Check API response format
   - Verify status values match backend expectations
   - Review order service error handling
