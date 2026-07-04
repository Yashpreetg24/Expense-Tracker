# Full-Stack Expense Tracker

A comprehensive full-stack Expense Tracker application designed for both a backend architecture course (AP Lab) and a Database Management Systems (DBMS) project. 

This project provides a robust REST API backend using **Node.js, Express, and Prisma ORM**, and a beautiful, responsive frontend built with **React, Vite, and Tailwind CSS**.

## Features

*   **User Authentication:** Secure JWT-based registration and login with bcrypt password hashing.
*   **Expense Management:** Full CRUD (Create, Read, Update, Delete) for expenses.
*   **Soft Deletion & Recovery:** Expenses are soft-deleted and can be restored.
*   **Advanced Filtering & Sorting:** Filter expenses by category, payment method, date range, and amount. Search by title/note, with pagination support.
*   **Dashboard & Analytics:** Real-time metrics including total spend, monthly trends (bar charts), and category breakdown (pie charts).
*   **Centralized Error Handling:** Consistent API responses for Prisma, JWT, and generic errors.

## Tech Stack

### Backend (AP Lab Focus)
*   **Node.js & Express:** RESTful API framework.
*   **Prisma ORM:** Database schema management and queries.
*   **Database:** SQLite (development) / PostgreSQL (production target).
*   **Security:** `bcryptjs` for password hashing, `jsonwebtoken` for stateless auth.
*   **Validation:** `express-validator` for strict input validation.

### Frontend
*   **React & Vite:** Fast, modern frontend framework.
*   **Tailwind CSS (v4):** Utility-first styling for a beautiful UI.
*   **Recharts:** Interactive charting for dashboard metrics.
*   **Axios:** Configured with interceptors for seamless JWT injection.

## Project Structure

```
Expense-Tracker/
├── backend/          # Node.js + Express API
│   ├── prisma/       # Schema, migrations, and seed script
│   └── src/          # Controllers, routes, middleware, validators
├── frontend/         # React + Vite application
│   ├── src/          # Components, pages, contexts, utils
│   └── tailwind...   # Tailwind styling configurations
└── docs/             # Documentation (API docs, DBMS report)
```

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Yashpreetg24/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Ensure JWT_SECRET and PORT are set in .env

# Run Prisma migrations & seed the database (creates 25 test records)
npx prisma migrate dev --name init
npx prisma db seed

# Start the development server
npm run dev
```
*The backend API will run on `http://localhost:5000`.*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
*The frontend will run on `http://localhost:5173`. You can login using the seeded credentials (`test@example.com` / `password123`) or create a new account.*

## Documentation

*   **[API Documentation](./docs/api-docs.md):** Detailed request/response shapes for all backend endpoints.
*   **DBMS Report:** (To be added in `docs/DBMS-report/`) Contains the ER diagram, schema documentation, and 5 meaningful SQL queries.

## Deployment

The backend is configured for deployment on Render/Railway via the included `render.yaml` file. Ensure that the `DATABASE_URL` environment variable points to a PostgreSQL instance in production.
