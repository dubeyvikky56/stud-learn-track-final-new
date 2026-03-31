# 🚀 EXACT COMMANDS TO RUN IN CURSOR TERMINAL

## Prerequisites Check
Run this first to verify your setup:
```bash
check-setup.bat
```

---

## 🎯 STEP-BY-STEP EXECUTION

### STEP 1: Ensure MongoDB is Running

**Option A - If MongoDB is installed as Windows Service:**
```bash
net start MongoDB
```

**Option B - If MongoDB is installed locally:**
```bash
mongod
```

**Option C - Using Docker (Recommended if you don't have MongoDB):**
```bash
docker run -d -p 27017:27017 --name student-tracker-mongo mongo:latest
```

---

### STEP 2: Open First Terminal - Backend

In Cursor, open a new terminal and run:

```bash
cd d:\student-learning-tracker\student-tracker
mvn spring-boot:run
```

**Wait for this output:**
```
Started StudentTrackerApplication in X.XXX seconds (process running on XXXX)
```

✅ Backend is now running on **http://localhost:8080**

---

### STEP 3: Open Second Terminal - Frontend

In Cursor, open ANOTHER new terminal (keep the first one running) and run:

```bash
cd d:\student-learning-tracker\frontend
npm run dev
```

**You should see:**
```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ Frontend is now running on **http://localhost:5173**

---

### STEP 4: Open Your Browser

Navigate to: **http://localhost:5173**

---

## 🎓 USING THE APPLICATION

### Create Admin Account:
1. Click "Sign Up" or "Register"
2. Fill in:
   - Name: Admin User
   - Email: admin@college.edu
   - Password: admin123
   - Role: Select "ADMIN"
3. Click Register
4. You'll be logged in automatically

### Admin Features:
- ➕ Add Students
- 📚 Create Courses
- 📝 Create Assessments (Quiz, Assignment, Exam, Project)
- 📊 Upload Marks/Results
- 📈 View Analytics & Reports
- 📄 Generate Performance Reports

### Create Student Account:
1. Logout from Admin
2. Click "Sign Up"
3. Fill in:
   - Name: Student Name
   - Email: student@college.edu
   - Password: student123
   - Role: Select "STUDENT"
4. Click Register

### Student Features:
- 📚 View Enrolled Courses
- 📊 View Marks & Results
- 📈 Track Academic Progress
- 📉 View Performance Charts
- 🎯 Identify Weak Areas
- 📄 Download Reports

---

## 🔧 TROUBLESHOOTING

### If Backend Fails to Start:

**Error: Port 8080 already in use**
```bash
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

**Error: Cannot connect to MongoDB**
- Ensure MongoDB is running
- Check if port 27017 is accessible
- Verify connection string in `application.properties`

**Error: Maven build fails**
```bash
cd student-tracker
mvn clean install -U
mvn spring-boot:run
```

### If Frontend Fails to Start:

**Error: Port 5173 already in use**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

**Error: Dependencies missing**
```bash
cd frontend
npm install
npm run dev
```

**Error: Cannot connect to backend**
- Verify backend is running on port 8080
- Check `.env` file has: `VITE_API_URL=http://localhost:8080/api`

---

## 📱 API ENDPOINTS (for testing)

### Authentication
- POST http://localhost:8080/api/auth/register
- POST http://localhost:8080/api/auth/login

### Students (Admin only for POST/PUT/DELETE)
- GET http://localhost:8080/api/students
- POST http://localhost:8080/api/students
- PUT http://localhost:8080/api/students/{id}
- DELETE http://localhost:8080/api/students/{id}

### Courses
- GET http://localhost:8080/api/courses
- POST http://localhost:8080/api/courses (Admin only)

### Assessments
- GET http://localhost:8080/api/assessments
- POST http://localhost:8080/api/assessments (Admin only)

### Results
- GET http://localhost:8080/api/results
- POST http://localhost:8080/api/results (Admin only)
- GET http://localhost:8080/api/results/student/{studentId}

### Reports
- GET http://localhost:8080/api/reports/performance/{studentId}

---

## ✅ VERIFICATION CHECKLIST

- [ ] MongoDB is running
- [ ] Backend terminal shows "Started StudentTrackerApplication"
- [ ] Frontend terminal shows "Local: http://localhost:5173/"
- [ ] Browser opens http://localhost:5173
- [ ] Can register and login
- [ ] Admin can create students/courses/assessments
- [ ] Students can view their results

---

## 🎉 YOU'RE ALL SET!

Your complete Student Learning Tracker is now running!

**Backend**: http://localhost:8080
**Frontend**: http://localhost:5173
**Database**: MongoDB on localhost:27017

Enjoy your college project! 🚀
