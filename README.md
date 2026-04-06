# Student Learning Tracker - Spring Boot + React + PostgreSQL 🚀

## 🏗️ Project Structure
```
d:/student-learning-tracker/
├── student-tracker/               # Spring Boot Backend (Java 17, Port 8080)
│   ├── src/main/java/com/tracker/
│   ├── pom.xml
│   └── Dockerfile                 # Docker support
├── frontend/                      # React + Vite + Tailwind (Dev: 5173, Prod: 3000)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml             # Postgres + Backend + Frontend
└── database-setup.sql             # Initial DB setup
```

## 🚀 Quick Start (Development)

### 1. Prerequisites
- **Java 17+** + **Maven 3.6+**
- **Node.js 18+** + **npm/yarn**
- **PostgreSQL 15+** (local or Docker)

### 2. Setup PostgreSQL Database
```bash
# Run setup script (adjust path)
psql -U postgres -h localhost -d postgres -f d:/student-learning-tracker/database-setup.sql
```
*Or use Docker Compose (recommended)*

### 3. Start Backend (Terminal 1)
```bash
cd student-tracker
mvn clean compile flyway:migrate
mvn spring-boot:run
```
Backend ready at http://localhost:8080

### 4. Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Frontend ready at http://localhost:5173

## 🐳 Docker Compose (Recommended)
```bash
docker-compose up --build
```
- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- Postgres: localhost:5433 (student_tracker db)

## 🔐 Test Accounts
**Admin:** `admin@test.com` / `admin123`  
**Student:** `student@test.com` / `student123`

## 📊 Features
- **Admin:** Manage students/courses/assessments/results, reports/analytics
- **Student:** Dashboard, courses, results, progress analytics
- **JWT Auth**, Role-based access, Validation
- **Flyway Migrations**, JPA entities, Complex queries

## 🛠️ API Endpoints (Base: /api)
- `/auth/login`, `/auth/register`
- `/students` (CRUD, admin)
- `/courses`, `/assessments`, `/results`
- `/reports/performance/{studentId}`

## 🔧 Configuration
**Backend:** `student-tracker/src/main/resources/application.properties` (PostgreSQL, JWT)
**Frontend:** `frontend/vite.config.js` (CORS to localhost:8080)

## 🎯 Deployment
1. `docker-compose up --build -d`
2. Exec into postgres for data if needed.
3. Scale as required.

Backend fully migrated from MongoDB to PostgreSQL - all set! 🎉

