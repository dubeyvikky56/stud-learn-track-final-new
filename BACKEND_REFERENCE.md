# Student Learning Tracker - Backend Code Reference

## 🚀 Quick Start Commands

### Start Backend
```cmd
cd d:\student-learning-tracker\student-tracker
mvn spring-boot:run
```

### Stop Backend (if port 8080 is in use)
```cmd
netstat -ano | findstr :8080
taskkill /F /PID <PID_NUMBER>
```

### Clean Build
```cmd
mvn clean install
mvn spring-boot:run
```

---

## 📁 Project Structure

```
student-tracker/
├── src/main/java/com/tracker/
│   ├── StudentTrackerApplication.java    # Main application
│   ├── config/                           # Configuration classes
│   │   ├── SecurityConfig.java
│   │   ├── WebConfig.java
│   │   └── GlobalExceptionHandler.java
│   ├── controller/                       # REST Controllers
│   │   ├── AuthController.java
│   │   ├── StudentController.java
│   │   ├── CourseController.java
│   │   ├── AssessmentController.java
│   │   ├── ResultController.java
│   │   └── ReportController.java
│   ├── dto/                              # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   └── AuthResponse.java
│   ├── model/                            # JPA Entities
│   │   ├── User.java
│   │   ├── Student.java
│   │   ├── Course.java
│   │   ├── Assessment.java
│   │   ├── Result.java
│   │   ├── LearningProgress.java
│   │   └── StudentCourseEnrollment.java
│   ├── repository/                       # JPA Repositories
│   │   ├── UserRepository.java
│   │   ├── StudentRepository.java
│   │   ├── CourseRepository.java
│   │   ├── AssessmentRepository.java
│   │   ├── ResultRepository.java
│   │   ├── LearningProgressRepository.java
│   │   └── StudentCourseEnrollmentRepository.java
│   ├── security/                         # Security & JWT
│   │   ├── JwtUtil.java
│   │   └── JwtAuthFilter.java
│   └── service/                          # Business Logic
│       ├── AuthService.java
│       ├── StudentService.java
│       ├── CourseService.java
│       ├── AssessmentService.java
│       ├── ResultService.java
│       └── ReportService.java
├── src/main/resources/
│   ├── application.properties            # Configuration
│   └── db/migration/                     # Flyway migrations
│       ├── V1__Create_initial_schema.sql
│       └── V2__Insert_sample_data.sql
└── pom.xml                               # Maven dependencies
```

---

## ⚙️ Configuration Files

### application.properties
```properties
# Application Configuration
spring.application.name=student-tracker

# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5433/student_tracker
spring.datasource.username=postgres
spring.datasource.password=kotaiit567
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.format-sql=true
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.properties.hibernate.jdbc.time_zone=UTC
spring.jpa.open-in-view=false

# Flyway Configuration
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
spring.flyway.validate-on-migrate=true

# JWT Configuration
jwt.secret=mySecretKey123456789012345678901234567890
jwt.expiration=86400000

# Server Configuration
server.port=8080

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

---

## 🗄️ Database Setup

### PostgreSQL Configuration
- **Host**: localhost
- **Port**: 5433
- **Database**: student_tracker
- **Username**: postgres
- **Password**: kotaiit567

### Create Database in pgAdmin
```sql
-- Create database
CREATE DATABASE student_tracker;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE student_tracker TO postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
```

---

## 📊 Database Schema

### Tables Created by Flyway
1. **users** - User authentication (admin/student)
2. **students** - Student information
3. **courses** - Course details
4. **assessments** - Quizzes, exams, assignments
5. **results** - Student assessment results
6. **learning_progress** - Study hours tracking
7. **student_course_enrollment** - Student-course relationships
8. **flyway_schema_history** - Migration tracking

---

## 🔐 Sample Data (Auto-loaded)

### Users
- **Admin**: admin@test.com / admin123
- **Student**: student@test.com / student123

### Students
- John Doe (CS101)
- Jane Smith (CS102)
- Bob Johnson (CS103)

### Courses
- Introduction to Programming
- Data Structures
- Database Management
- Web Development

### Sample Results
- Pre-loaded assessment results for testing

---

## 🛠️ API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Students (Admin access for POST/PUT/DELETE)
```
GET    /api/students     - Get all students
GET    /api/students/{id} - Get student by ID
POST   /api/students     - Create student (Admin)
PUT    /api/students/{id} - Update student (Admin)
DELETE /api/students/{id} - Delete student (Admin)
```

### Courses
```
GET  /api/courses     - Get all courses
GET  /api/courses/{id} - Get course by ID
POST /api/courses     - Create course (Admin)
```

### Assessments
```
GET  /api/assessments     - Get all assessments
GET  /api/assessments/{id} - Get assessment by ID
POST /api/assessments     - Create assessment (Admin)
```

### Results
```
GET  /api/results                  - Get all results
GET  /api/results/student/{id}     - Get student results
POST /api/results                  - Create result (Admin)
```

### Reports
```
GET /api/reports/performance/{studentId} - Get performance report
```

---

## 🔧 Maven Commands

### Build Project
```cmd
mvn clean install
```

### Run Tests
```cmd
mvn test
```

### Package JAR
```cmd
mvn clean package
```

### Run Application
```cmd
mvn spring-boot:run
```

### Skip Tests
```cmd
mvn clean install -DskipTests
```

---

## 🐛 Troubleshooting

### Port 8080 Already in Use
```cmd
netstat -ano | findstr :8080
taskkill /F /PID <PID>
```

### Database Connection Failed
1. Check PostgreSQL is running
2. Verify port 5433 is correct
3. Check password in application.properties
4. Ensure database `student_tracker` exists

### Flyway Migration Failed
```cmd
# In pgAdmin, run:
DROP TABLE IF EXISTS flyway_schema_history;
# Then restart application
```

### Clean Rebuild
```cmd
mvn clean
del /s /q target
mvn clean install
mvn spring-boot:run
```

---

## 📦 Key Dependencies (pom.xml)

```xml
<!-- Spring Boot Starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Security + JWT -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- PostgreSQL + JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>

<!-- Flyway Migration -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

## ✅ Success Indicators

When backend starts successfully, you should see:

```
✅ HikariPool-1 - Start completed
✅ Database: jdbc:postgresql://localhost:5433/student_tracker (PostgreSQL 18.3)
✅ Successfully validated 2 migrations
✅ Schema "public" is up to date. No migration necessary
✅ Initialized JPA EntityManagerFactory
✅ Tomcat started on port 8080 (http)
✅ Started StudentTrackerApplication in X seconds
```

---

## 🔗 Integration with Frontend

### CORS Configuration
Backend allows requests from:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Alternative port)

### JWT Token Flow
1. User logs in → Backend returns JWT token
2. Frontend stores token in localStorage
3. Frontend sends token in Authorization header
4. Backend validates token for protected routes

---

## 📝 Notes

- Backend runs on **port 8080**
- PostgreSQL runs on **port 5433**
- JWT tokens expire after **24 hours**
- Flyway automatically creates tables on first run
- Sample data is loaded automatically
- All passwords are encrypted with BCrypt

---

**Your backend is ready! Keep the terminal running and start the frontend.** 🚀
