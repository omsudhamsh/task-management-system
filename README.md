# Task Management System

A production-ready full-stack task management application with Role-Based Access Control (Admin/User) and JWT authentication.

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios for API requests
- Standard CSS / Flexbox

**Backend:**
- Java 17
- Spring Boot 3.2.5
- Spring Security (JWT Authentication)
- Spring Data JPA
- H2 Database (File-based persistence)
- Maven Build Tool

## Prerequisites
- Java 17+
- Node.js 18+ & npm

## Setup Instructions

### 1. Database Setup
The application uses an **H2 File-based Database**. You do not need to install MySQL. 
The database file will be automatically created in the `backend/data/` folder when the backend starts.

### 2. Backend Setup
1. Open the `backend` folder in VS Code.
2. Run the Spring Boot application (using Maven or VS Code Java Extension):
   ```bash
   mvn spring-boot:run
   ```

### 3. Frontend Setup
1. Open the `frontend` folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## API Documentation (Endpoints)
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive JWT.
- **GET** `/api/tasks`: Get all tasks (Admin) or user tasks.
- **POST** `/api/tasks`: Create a new task.
- **PUT** `/api/tasks/{id}`: Update task status/fields.
- **DELETE** `/api/tasks/{id}`: Delete a task.

## Running Locally
- Backend API: http://localhost:8081
- H2 Database Console: http://localhost:8081/h2-console
- Frontend App: http://localhost:5174 (or 5173 depending on Vite)
