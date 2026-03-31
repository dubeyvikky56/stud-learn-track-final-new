# Complete Setup & Run Guide

## ⚠️ IMPORTANT: Run These Commands in Your Cursor Terminal

### Step 1: Start MongoDB
If MongoDB is not running, start it:
```bash
# If MongoDB is installed as a service
net start MongoDB

# OR if you have MongoDB installed locally
mongod --dbpath "C:\data\db"

# OR if using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 2: Open TWO Terminals in Cursor

---

## 🔴 TERMINAL 1 - Spring Boot Backend

```bash
cd student-tracker
mvn spring-boot:run
```

**Wait for this message:**
```
Started StudentTrackerApplication in X.XXX seconds
```

Backend will be running on: **http://localhost:8080**

---

## 🔵 TERMINAL 2 - React Frontend

```bash
cd frontend
npm run dev
```

**You should see:**
```
VITE v8.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Frontend will be running on: **http://localhost:5173**

---

## ✅ Access Your Application

Open your browser and go to: **http://localhost:5173**

### First Time Setup:
1. Click "Register" 
2. Create an Admin account (select role: ADMIN)
3. Login with your credentials
4. Start adding students, courses, and assessments!

---

## 🎯 Quick Test

### Register Admin:
```json
POST http://localhost:8080/api/auth/register
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### Register Student:
```json
POST http://localhost:8080/api/auth/register
{
  "name": "John Doe",
  "email": "student@test.com",
  "password": "student123",
  "role": "STUDENT"
}
```

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running on port 27017
- Check connection string in `student-tracker/src/main/resources/application.properties`

### Port 8080 Already in Use
```bash
# Find and kill the process
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

### Port 5173 Already in Use
```bash
# Find and kill the process
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Maven Build Fails
```bash
cd student-tracker
mvn clean install -U
```

### Frontend Dependencies Missing
```bash
cd frontend
npm install
```

---

## 📝 Project Structure

```
student-learning-tracker/
├── student-tracker/          # Spring Boot Backend (Port 8080)
│   ├── src/main/java/
│   └── pom.xml
├── frontend/                 # React Frontend (Port 5173)
│   ├── src/
│   └── package.json
├── start.bat                 # Windows startup script
└── RUN_INSTRUCTIONS.md       # This file
```

---

## 🚀 Ready to Go!

Your complete full-stack application is ready. Just run the two commands in separate terminals and start using your Student Learning Tracker!
