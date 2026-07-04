# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)

### 1. Register User
*   **Method:** `POST`
*   **Endpoint:** `/auth/register`
*   **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*   **Success Response (201):**
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
    }
    ```

### 2. Login User
*   **Method:** `POST`
*   **Endpoint:** `/auth/login`
*   **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*   **Success Response (200):**
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1...",
      "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
    }
    ```

### 3. Get Profile (Protected)
*   **Method:** `GET`
*   **Endpoint:** `/auth/profile`
*   **Headers:** `Authorization: Bearer <token>`
*   **Success Response (200):**
    ```json
    {
      "message": "Profile retrieved successfully",
      "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
    }
    ```

---

## Expenses (`/expenses`) - Protected

*All routes require `Authorization: Bearer <token>` header.*

### 1. Create Expense
*   **Method:** `POST`
*   **Endpoint:** `/expenses`
*   **Request Body:**
    ```json
    {
      "title": "Lunch",
      "amount": 250,
      "expenseDate": "2026-07-04T12:00:00Z",
      "categoryId": 1,
      "paymentMethodId": 1,
      "note": "Office lunch"
    }
    ```
*   **Success Response (201):**
    ```json
    {
      "message": "Expense created successfully",
      "expense": { /* expense object */ }
    }
    ```

### 2. Get All Expenses (with Filters & Pagination)
*   **Method:** `GET`
*   **Endpoint:** `/expenses`
*   **Query Parameters:**
    *   `search`: string
    *   `categoryId`: integer
    *   `paymentMethodId`: integer
    *   `minAmount`: float
    *   `maxAmount`: float
    *   `startDate`: ISO date string
    *   `endDate`: ISO date string
    *   `sortBy`: 'date' | 'amount' (default: 'date')
    *   `sortOrder`: 'asc' | 'desc' (default: 'desc')
    *   `page`: integer (default: 1)
    *   `limit`: integer (default: 10)
*   **Success Response (200):**
    ```json
    {
      "message": "Expenses retrieved successfully",
      "expenses": [ /* array of expense objects with relation data */ ],
      "pagination": {
        "total": 50,
        "page": 1,
        "limit": 10,
        "totalPages": 5
      }
    }
    ```

### 3. Update Expense
*   **Method:** `PUT`
*   **Endpoint:** `/expenses/:id`
*   **Request Body:** (Partial updates allowed)
    ```json
    {
      "amount": 300,
      "note": "Updated note"
    }
    ```
*   **Success Response (200):**
    ```json
    {
      "message": "Expense updated successfully",
      "expense": { /* updated expense object */ }
    }
    ```

### 4. Delete Expense (Soft Delete)
*   **Method:** `DELETE`
*   **Endpoint:** `/expenses/:id`
*   **Success Response (200):**
    ```json
    {
      "message": "Expense deleted successfully"
    }
    ```

### 5. Restore Expense
*   **Method:** `PATCH`
*   **Endpoint:** `/expenses/:id/restore`
*   **Success Response (200):**
    ```json
    {
      "message": "Expense restored successfully"
    }
    ```

---

## Analytics & Dashboard (`/dashboard`, `/analytics`) - Protected

*All routes require `Authorization: Bearer <token>` header.*

### 1. Dashboard Summary
*   **Method:** `GET`
*   **Endpoint:** `/dashboard`
*   **Success Response (200):**
    ```json
    {
      "message": "Dashboard summary retrieved successfully",
      "data": {
        "totalExpenses": 45000,
        "thisMonthExpenses": 12000,
        "totalTransactions": 25,
        "highestExpense": 8500,
        "lowestExpense": 119
      }
    }
    ```

### 2. Monthly Trend
*   **Method:** `GET`
*   **Endpoint:** `/analytics/monthly`
*   **Success Response (200):**
    ```json
    {
      "message": "Monthly summary retrieved successfully",
      "data": [
        { "month": "2026-07", "total": 15000 },
        { "month": "2026-06", "total": 30000 }
      ]
    }
    ```

### 3. Category Spend (Total Amount)
*   **Method:** `GET`
*   **Endpoint:** `/analytics/category`
*   **Success Response (200):**
    ```json
    {
      "message": "Category spend retrieved successfully",
      "data": [
        { "category": "Food", "total": 8320 },
        { "category": "Travel", "total": 19400 }
      ]
    }
    ```

### 4. Category Count (Number of Transactions)
*   **Method:** `GET`
*   **Endpoint:** `/analytics/category-count`
*   **Success Response (200):**
    ```json
    {
      "message": "Category count retrieved successfully",
      "data": [
        { "category": "Food", "count": 5 },
        { "category": "Travel", "count": 6 }
      ]
    }
    ```

### 5. Recent Transactions
*   **Method:** `GET`
*   **Endpoint:** `/analytics/recent?limit=5`
*   **Success Response (200):**
    ```json
    {
      "message": "Recent transactions retrieved successfully",
      "data": [ /* Array of 5 most recent expenses */ ]
    }
    ```
