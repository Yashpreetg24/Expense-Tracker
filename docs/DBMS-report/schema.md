# Database Schema Report

This document outlines the database tables, columns, constraints, and relationships used in the Expense Tracker application.

## Tables & Constraints

### 1. User
Stores user authentication details.
*   `id` (Int, Primary Key): Unique identifier.
*   `name` (String): Full name of the user.
*   `email` (String, Unique): User's email address for login.
*   `password` (String): Hashed password.
*   `createdAt` (DateTime): Record creation timestamp.
*   `updatedAt` (DateTime): Record modification timestamp.

### 2. Category
Represents categories under which expenses are grouped (e.g., Food, Travel).
*   `id` (Int, Primary Key): Unique identifier.
*   `name` (String, Unique): Category name.
*   `createdAt` (DateTime)
*   `updatedAt` (DateTime)

### 3. PaymentMethod
Represents the method of payment (e.g., UPI, Credit Card).
*   `id` (Int, Primary Key): Unique identifier.
*   `name` (String, Unique): Payment method name.
*   `createdAt` (DateTime)
*   `updatedAt` (DateTime)

### 4. Expense
The core table storing individual transaction records.
*   `id` (Int, Primary Key)
*   `title` (String): Brief description of the expense.
*   `amount` (Float): Transaction value. Must be strictly positive.
*   `expenseDate` (DateTime): When the transaction occurred.
*   `note` (String, Optional): Additional context.
*   `isDeleted` (Boolean): Soft delete flag (default: false).
*   **Foreign Keys:**
    *   `userId` (Int) -> `User(id)` [ON DELETE CASCADE]
    *   `categoryId` (Int) -> `Category(id)` [ON DELETE RESTRICT]
    *   `paymentMethodId` (Int) -> `PaymentMethod(id)` [ON DELETE RESTRICT]

### 5. Tag
A generalized tag that can be attached to multiple expenses.
*   `id` (Int, Primary Key)
*   `name` (String, Unique)

### 6. ExpenseTag
A junction table facilitating a Many-to-Many relationship between `Expense` and `Tag`.
*   `expenseId` (Int) -> `Expense(id)` [ON DELETE CASCADE]
*   `tagId` (Int) -> `Tag(id)` [ON DELETE CASCADE]
*   **Composite Primary Key:** `(expenseId, tagId)`

## Relational Design Decisions
*   **Normalization:** The schema adheres to 3NF. Categories and Payment Methods are extracted into separate reference tables to prevent data anomalies and inconsistencies.
*   **Referential Integrity:** `ON DELETE CASCADE` is used for `Expense` when a `User` is deleted. However, `ON DELETE RESTRICT` is used for `Category` and `PaymentMethod` to prevent the accidental deletion of reference data that is currently mapped to an expense.
*   **Soft Deletion:** Implemented on the `Expense` table (`isDeleted` flag) to allow data recovery.
