# Running the Student Learning Tracker

## Prerequisites
1. **MongoDB** - Must be running on `mongodb://localhost:27017`
2. **Java 17+** - For Spring Boot backend
3. **Node.js** - For React frontend

## Quick Start

### Option 1: Run Both Servers (Automated)
Double-click `start.bat` or run in terminal:
```bash
start.bat
```

### Option 2: Run Manually in Separate Terminals

#### Terminal 1 - Backend (Spring Boot)
```bash
cd student-tracker
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

#### Terminal 2 - Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## Access the Application

1. Open browser: http://localhost:5173
2. Register as Admin or Student
3. Login and start using the system

## Default Ports
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **MongoDB**: mongodb://localhost:27017

## Troubleshooting

### MongoDB not running
Start MongoDB service:
```bash
net start MongoDB
```

### Port already in use
- Backend: Change port in `student-tracker/src/main/resources/application.properties`
- Frontend: Change port in `frontend/vite.config.js`

### Backend build fails
```bash
cd student-tracker
mvn clean install -U
```

### Frontend dependencies missing
```bash
cd frontend
npm install
```

## API Documentation
Backend API runs on: http://localhost:8080/api

### Endpoints:
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/students - Get all students
- POST /api/students - Create student (Admin)
- GET /api/courses - Get all courses
- POST /api/courses - Create course (Admin)
- GET /api/assessments - Get all assessments
- POST /api/assessments - Create assessment (Admin)
- POST /api/results - Create result (Admin)
- GET /api/results/student/{id} - Get student results
- GET /api/reports/performance/{id} - Get performance report
