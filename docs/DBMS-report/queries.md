# Meaningful SQL Queries

Below are the 5 core SQL queries used to fulfill the DBMS project requirements. These queries demonstrate filtering, sorting, JOINs, aggregate functions, and GROUP BY operations.

---

### 1. Advanced Search and Filter
**Purpose:** Fetches a filtered, sorted, and paginated list of expenses for the dashboard listing.
**Code:**
```sql
SELECT e.id, e.title, e.amount, e.expenseDate, c.name as category, p.name as paymentMethod
FROM "Expense" e
JOIN "Category" c ON e.categoryId = c.id
JOIN "PaymentMethod" p ON e.paymentMethodId = p.id
WHERE e.userId = 1 
  AND e.isDeleted = false
  AND e.amount >= 500
  AND (e.title LIKE '%bill%' OR e.note LIKE '%bill%')
ORDER BY e.expenseDate DESC
LIMIT 10 OFFSET 0;
```
**Explanation:** This query combines multiple filtering conditions (`amount >= 500` and keyword search using `LIKE`) alongside two `JOIN` clauses to fetch human-readable category and payment method names. It sorts the results chronologically and applies standard `LIMIT` and `OFFSET` for pagination.

---

### 2. Monthly Expense Trend
**Purpose:** Groups expenses by month and year to generate data for the dashboard's bar chart.
**Code:**
```sql
SELECT strftime('%Y-%m', expenseDate) as month, SUM(amount) as total
FROM "Expense"
WHERE userId = 1 AND isDeleted = false
GROUP BY month
ORDER BY month DESC;
```
*(Note: In PostgreSQL, `strftime` is replaced with `to_char(expenseDate, 'YYYY-MM')`)*
**Explanation:** This query utilizes the `SUM` aggregate function and the `GROUP BY` clause to calculate the total amount spent per month. It extracts the month string from the timestamp to facilitate grouping.

---

### 3. Category Spend Breakdown
**Purpose:** Calculates the total amount of money spent across different categories to power the pie chart.
**Code:**
```sql
SELECT c.name as category, SUM(e.amount) as total 
FROM "Expense" e 
JOIN "Category" c ON e."categoryId" = c.id 
WHERE e."userId" = 1 AND e."isDeleted" = false
GROUP BY c.id, c.name;
```
**Explanation:** This is a classic analytics query combining a `JOIN` (to retrieve the category name), an aggregate function (`SUM(amount)`), and a `GROUP BY` clause. It allows the user to see exactly where their money is going.

---

### 4. Transaction Count by Category
**Purpose:** Determines the frequency of spending in each category, irrespective of the total monetary amount.
**Code:**
```sql
SELECT c.name as category, COUNT(e.id) as count 
FROM "Expense" e 
JOIN "Category" c ON e."categoryId" = c.id 
WHERE e."userId" = 1 AND e."isDeleted" = false
GROUP BY c.id, c.name;
```
**Explanation:** Similar to the previous query, but utilizes the `COUNT()` aggregate function. It counts the number of primary keys (`e.id`) associated with each category grouping.

---

### 5. Recent High-Value Transactions
**Purpose:** Retrieves the most recent transactions to display a quick-access list on the main dashboard overview, specifically focusing on the most recent 5 records.
**Code:**
```sql
SELECT id, title, amount, note, "expenseDate", "createdAt"
FROM "Expense"
WHERE "userId" = 1 AND "isDeleted" = false
ORDER BY "expenseDate" DESC, "createdAt" DESC
LIMIT 5;
```
**Explanation:** This query demonstrates sorting (`ORDER BY`) using multiple columns (prioritizing the actual transaction date, and falling back to the system creation date in the event of a tie). It restricts the payload size using `LIMIT`.
