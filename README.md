# Student Learning Tracker - Spring Boot + React

## 🏗️ Project Structure

```
student-learning-tracker/
├── student-tracker/          # Spring Boot Backend (Port 8080)
│   ├── src/main/java/com/tracker/
│   │   ├── config/          # Security & Configuration
│   │   ├── controller/      # REST Controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── model/           # MongoDB Entities
│   │   ├── repository/      # Data Access Layer
│   │   ├── security/        # JWT Authentication
│   │   └── service/         # Business Logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                 # React Frontend (Port 5173)
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Page Components
│   │   ├── services/        # API Services
│   │   └── hooks/           # Custom Hooks
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- MongoDB (running on localhost:27017)

### Start Backend (Terminal 1)
```bash
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
cd student-tracker
mvn clean spring-boot:run
```

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### Open Application
http://localhost:5173

## 🔐 Demo Accounts

### Admin Account
- Email: admin@test.com
- Password: admin123

### Student Account
- Email: student@test.com
- Password: student123

## 📊 Features

### Admin Dashboard
- ✅ Student Management (CRUD)
- ✅ Course Management
- ✅ Assessment Creation
- ✅ Result Entry & Management
- ✅ Performance Analytics
- ✅ Report Generation

### Student Dashboard
- ✅ View Enrolled Courses
- ✅ Check Assessment Results
- ✅ Track Academic Progress
- ✅ Performance Analytics
- ✅ Grade Distribution

## 🛠️ Tech Stack

**Backend:**
- Spring Boot 3.5.13
- Spring Security + JWT
- Spring Data MongoDB
- Java 17
- Maven

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Chart.js
- Axios

**Database:**
- MongoDB

## 🔧 Configuration

### Backend Configuration
File: `student-tracker/src/main/resources/application.properties`
```properties
spring.application.name=student-tracker
spring.data.mongodb.uri=mongodb://localhost:27017/student_tracker
jwt.secret=your-secret-key-change-this-in-production-minimum-256-bits
jwt.expiration=86400000
server.port=8080
```

### Frontend Configuration
File: `frontend/.env`
```
VITE_API_URL=http://localhost:8080/api
```

## 📡 API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Students (Admin access required for POST/PUT/DELETE)
- GET `/api/students` - Get all students
- POST `/api/students` - Create student
- PUT `/api/students/{id}` - Update student
- DELETE `/api/students/{id}` - Delete student

### Courses (Admin access required for POST)
- GET `/api/courses` - Get all courses
- POST `/api/courses` - Create course

### Assessments (Admin access required for POST)
- GET `/api/assessments` - Get all assessments
- POST `/api/assessments` - Create assessment

### Results (Admin access required for POST)
- GET `/api/results` - Get all results
- POST `/api/results` - Create result
- GET `/api/results/student/{studentId}` - Get student results

### Reports
- GET `/api/reports/performance/{studentId}` - Get performance report

## 🎯 Usage Flow

1. **Register/Login** as Admin or Student
2. **Admin Functions:**
   - Add students and courses
   - Create assessments (Quiz, Assignment, Exam, Project)
   - Enter student results
   - View analytics and generate reports
3. **Student Functions:**
   - View enrolled courses
   - Check assessment results
   - Track academic progress
   - View performance analytics

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (ADMIN/STUDENT)
- Password encryption with BCrypt
- CORS configuration for frontend
- Method-level security annotations

## 📈 Analytics Features

- Grade distribution charts
- Performance trends
- Pass/fail rates
- Student progress tracking
- Comparative analytics

## 🚀 Deployment Ready

The application is containerized and ready for deployment with:
- Docker support
- Environment-based configuration
- Production security settings
- Scalable architecture

---

**Your complete Student Learning Tracker is now running on Spring Boot!** 🎉