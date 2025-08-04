# Order Management API - cURL Commands

## Overview

This document provides cURL commands for testing all the enhanced order management APIs in the Crave Kitchen App.

## Authentication

All API calls require a Bearer token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## Base URL

```bash
BASE_URL="http://localhost:8080"  # Replace with your actual backend URL
VENDOR_ID="123"                   # Replace with actual vendor ID
TOKEN="your_jwt_token_here"       # Replace with actual JWT token
```

## 1. Core Order APIs

### Get All Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Order by ID

```bash
ORDER_ID="ORD-001"
curl -X GET \
  "${BASE_URL}/api/orders/${ORDER_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Order History

```bash
curl -X GET \
  "${BASE_URL}/api/orders/history?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

## 2. Status-Specific APIs

### Get Pending Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders/pending?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Preparing Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders/preparing?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Ready Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders/ready?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Completed Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders/completed?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Cancelled Orders

```bash
curl -X GET \
  "${BASE_URL}/api/orders/cancelled?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

## 3. Order Action APIs

### Accept Order

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/accept" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "estimatedPreparationTime": 25,
    "acceptedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Order accepted at '$(date +"%H:%M")'"
  }'
```

### Reject Order

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/reject" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "reason": "Out of stock",
    "rejectedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Item not available"
  }'
```

### Start Preparing Order

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/start-preparing" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "startedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Started preparing order"
  }'
```

### Mark Order as Ready

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/ready" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "readyAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Order ready for pickup"
  }'
```

### Complete Order

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/complete" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "completedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Order completed successfully"
  }'
```

## 4. Search & Filter APIs

### Search Orders

```bash
SEARCH_QUERY="john"
curl -X GET \
  "${BASE_URL}/api/orders/search?vendorId=${VENDOR_ID}&query=${SEARCH_QUERY}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Filter Orders by Date Range

```bash
curl -X GET \
  "${BASE_URL}/api/orders/filter?vendorId=${VENDOR_ID}&dateFrom=2024-01-01&dateTo=2024-01-31" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Filter Orders by Amount Range

```bash
curl -X GET \
  "${BASE_URL}/api/orders/filter?vendorId=${VENDOR_ID}&minAmount=20&maxAmount=100" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Filter Orders by Multiple Criteria

```bash
curl -X GET \
  "${BASE_URL}/api/orders/filter?vendorId=${VENDOR_ID}&dateFrom=2024-01-01&dateTo=2024-01-31&minAmount=20&maxAmount=100&status=pending" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

## 5. Pagination Examples

### Get Orders with Pagination

```bash
curl -X GET \
  "${BASE_URL}/api/orders/pending?vendorId=${VENDOR_ID}&page=0&size=10" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Get Orders with Sorting

```bash
curl -X GET \
  "${BASE_URL}/api/orders/pending?vendorId=${VENDOR_ID}&sort=orderTime,desc&page=0&size=20" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

## 6. Error Testing

### Test Invalid Order ID

```bash
curl -X GET \
  "${BASE_URL}/api/orders/INVALID-ORDER-ID" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json"
```

### Test Unauthorized Access

```bash
curl -X GET \
  "${BASE_URL}/api/orders/pending?vendorId=${VENDOR_ID}" \
  -H "Content-Type: application/json"
```

### Test Invalid Action on Completed Order

```bash
ORDER_ID="ORD-001"
curl -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/accept" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "estimatedPreparationTime": 25
  }'
```

## 7. Windows PowerShell Examples

### Set Variables (PowerShell)

```powershell
$BASE_URL = "http://localhost:8080"
$VENDOR_ID = "123"
$TOKEN = "your_jwt_token_here"
$ORDER_ID = "ORD-001"
```

### Get Pending Orders (PowerShell)

```powershell
Invoke-RestMethod -Uri "$BASE_URL/api/orders/pending?vendorId=$VENDOR_ID" `
  -Headers @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
  } `
  -Method GET
```

### Accept Order (PowerShell)

```powershell
$body = @{
    vendorId = $VENDOR_ID
    estimatedPreparationTime = 25
    acceptedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    notes = "Order accepted at $(Get-Date -Format 'HH:mm')"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$BASE_URL/api/orders/$ORDER_ID/accept" `
  -Headers @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
  } `
  -Method POST `
  -Body $body
```

## 8. Testing Scripts

### Complete Order Workflow Test

```bash
#!/bin/bash

# Set variables
BASE_URL="http://localhost:8080"
VENDOR_ID="123"
TOKEN="your_jwt_token_here"
ORDER_ID="ORD-001"

echo "=== Testing Complete Order Workflow ==="

# 1. Get pending orders
echo "1. Getting pending orders..."
curl -s -X GET \
  "${BASE_URL}/api/orders/pending?vendorId=${VENDOR_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" | jq '.'

# 2. Accept order
echo -e "\n2. Accepting order..."
curl -s -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/accept" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "estimatedPreparationTime": 25,
    "acceptedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Order accepted"
  }' | jq '.'

# 3. Start preparing
echo -e "\n3. Starting preparation..."
curl -s -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/start-preparing" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "startedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Started preparing"
  }' | jq '.'

# 4. Mark as ready
echo -e "\n4. Marking as ready..."
curl -s -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/ready" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "readyAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Ready for pickup"
  }' | jq '.'

# 5. Complete order
echo -e "\n5. Completing order..."
curl -s -X POST \
  "${BASE_URL}/api/orders/${ORDER_ID}/complete" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "'${VENDOR_ID}'",
    "completedAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "notes": "Order completed"
  }' | jq '.'

echo -e "\n=== Workflow Test Complete ==="
```

## 9. Response Examples

### Successful Order Response

```json
{
  "success": true,
  "message": "Order accepted successfully",
  "data": {
    "orderId": "ORD-001",
    "status": "accepted",
    "acceptedAt": "2024-01-15T10:32:00Z",
    "estimatedPreparationTime": 25
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Order not found",
  "error": "ORDER_NOT_FOUND",
  "timestamp": "2024-01-15T10:32:00Z"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "ORD-001",
        "orderNumber": "ORD-2024-001",
        "customerName": "John Doe",
        "status": "pending",
        "orderTime": "2024-01-15T10:30:00Z",
        "totalAmount": 25.98
      }
    ],
    "totalElements": 5,
    "totalPages": 1,
    "currentPage": 0,
    "size": 10
  }
}
```

## 10. Quick Test Checklist

- [ ] Get all orders
- [ ] Get order by ID
- [ ] Get pending orders
- [ ] Get preparing orders
- [ ] Get ready orders
- [ ] Get completed orders
- [ ] Get cancelled orders
- [ ] Accept an order
- [ ] Reject an order
- [ ] Start preparing an order
- [ ] Mark order as ready
- [ ] Complete an order
- [ ] Search orders
- [ ] Filter orders
- [ ] Test pagination
- [ ] Test error scenarios

---

**Note**: Replace `YOUR_JWT_TOKEN`, `VENDOR_ID`, and `BASE_URL` with your actual values before running these commands.
