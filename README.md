# Task Management System

A production-ready full-stack task management application.

## Prerequisites
- Java 17+
- Node.js 18+ & npm
- MySQL 8.0+

## Setup Instructions

### 1. Database Setup
Run the following SQL in your MySQL client:
```sql
CREATE DATABASE task_management;
```
The tables will be automatically created by Hibernate.

### 2. Backend Setup
1. Open the `backend` folder in VS Code.
2. Update `src/main/resources/application.properties` with your MySQL `root` password.
3. Run the application (using Maven or VS Code Java Extension):
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
- Backend: http://localhost:8080
- Frontend: http://localhost:5173
