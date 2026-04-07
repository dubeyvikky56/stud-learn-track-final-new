# 🚀 Complete Deployment Guide: Vercel + Heroku + Supabase

## 📋 Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Heroku (Spring Boot + Java 17)
- **Database**: Supabase (PostgreSQL)
- **Cost**: $0 (Free tiers)
- **Time**: ~45 minutes

---

## 🗄️ STEP 1: Deploy Database on Supabase (10 min)

### 1.1 Create Supabase Project
1. Go to https://supabase.com
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Fill in:
   - **Name**: `student-tracker`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
5. Click **"Create new project"** (takes 2-3 minutes)

### 1.2 Get Database Connection Details
1. In Supabase dashboard, go to **Settings** → **Database**
2. Scroll to **Connection String** section
3. Copy the **URI** (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)
4. Save these details:
   ```
   Host: db.xxx.supabase.co
   Port: 5432
   Database: postgres
   User: postgres
   Password: [your-password]
   ```

### 1.3 Create Database Schema
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'STUDENT')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create students table
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100),
    semester INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER,
    semester INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assessments table
CREATE TABLE assessments (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    max_marks DECIMAL(5,2) NOT NULL,
    weightage DECIMAL(5,2),
    assessment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create results table
CREATE TABLE results (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    assessment_id BIGINT REFERENCES assessments(id) ON DELETE CASCADE,
    marks_obtained DECIMAL(5,2) NOT NULL,
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, assessment_id)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_roll_number ON students(roll_number);
CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_assessments_course_id ON assessments(course_id);
CREATE INDEX idx_results_student_id ON results(student_id);
CREATE INDEX idx_results_assessment_id ON results(assessment_id);

-- Insert demo admin user (password: admin123)
INSERT INTO users (email, password, name, role) VALUES 
('admin@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin User', 'ADMIN');

-- Insert demo student user (password: student123)
INSERT INTO users (email, password, name, role) VALUES 
('student@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John Doe', 'STUDENT');

-- Insert demo student record
INSERT INTO students (user_id, roll_number, department, semester) VALUES 
((SELECT id FROM users WHERE email = 'student@test.com'), 'STU001', 'Computer Science', 5);

-- Insert demo courses
INSERT INTO courses (code, name, description, credits, semester) VALUES 
('CS101', 'Introduction to Programming', 'Basic programming concepts', 4, 1),
('CS201', 'Data Structures', 'Advanced data structures and algorithms', 4, 3),
('CS301', 'Database Systems', 'Relational database design and SQL', 3, 5);

-- Insert demo assessments
INSERT INTO assessments (course_id, title, description, max_marks, weightage, assessment_date) VALUES 
((SELECT id FROM courses WHERE code = 'CS101'), 'Midterm Exam', 'First midterm examination', 100, 30, '2024-03-15'),
((SELECT id FROM courses WHERE code = 'CS201'), 'Assignment 1', 'Implement binary search tree', 50, 20, '2024-03-20'),
((SELECT id FROM courses WHERE code = 'CS301'), 'Final Project', 'Database design project', 100, 40, '2024-04-25');

-- Insert demo results
INSERT INTO results (student_id, assessment_id, marks_obtained, feedback) VALUES 
((SELECT id FROM students WHERE roll_number = 'STU001'), 
 (SELECT id FROM assessments WHERE title = 'Midterm Exam'), 
 85, 'Excellent performance'),
((SELECT id FROM students WHERE roll_number = 'STU001'), 
 (SELECT id FROM assessments WHERE title = 'Assignment 1'), 
 42, 'Good implementation, minor improvements needed');
```

4. Click **"Run"** (bottom right)
5. Verify success message appears

---

## 🖥️ STEP 2: Deploy Backend on Heroku (15 min)

### 2.1 Install Heroku CLI
1. Download from https://devcenter.heroku.com/articles/heroku-cli
2. Install and restart terminal
3. Verify: `heroku --version`

### 2.2 Login to Heroku
```bash
heroku login
```
(Opens browser for authentication)

### 2.3 Create Heroku App
```bash
cd d:/student-learning-tracker/student-tracker
heroku create student-tracker-backend
```
**Note**: If name is taken, use `student-tracker-backend-[your-name]`

### 2.4 Set Environment Variables
Replace `[YOUR-SUPABASE-CONNECTION-STRING]` with your actual Supabase URI:

```bash
heroku config:set DATABASE_URL="jdbc:postgresql://db.xxx.supabase.co:5432/postgres" -a student-tracker-backend

heroku config:set DATABASE_USERNAME="postgres" -a student-tracker-backend

heroku config:set DATABASE_PASSWORD="[YOUR-SUPABASE-PASSWORD]" -a student-tracker-backend

heroku config:set JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-256-bits" -a student-tracker-backend

heroku config:set CORS_ORIGINS="https://your-frontend-app.vercel.app,http://localhost:5173" -a student-tracker-backend
```

### 2.5 Configure Java Version
Heroku already detects `system.properties` file (Java 17 specified).

### 2.6 Deploy to Heroku
```bash
# Add Heroku remote (if not already added)
heroku git:remote -a student-tracker-backend

# Push to Heroku
git push heroku blackboxai/main:main
```

**If you get an error about branch**, use:
```bash
git push heroku HEAD:main
```

### 2.7 Verify Deployment
```bash
# Check logs
heroku logs --tail -a student-tracker-backend

# Open app
heroku open -a student-tracker-backend
```

Your backend URL will be: `https://student-tracker-backend.herokuapp.com`

### 2.8 Test Backend API
```bash
curl https://student-tracker-backend.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

Should return JWT token.

---

## 🌐 STEP 3: Deploy Frontend on Vercel (10 min)

### 3.1 Update Frontend API URL
1. Edit `frontend/.env.production`:
```env
VITE_API_URL=https://student-tracker-backend.herokuapp.com/api
```

2. Commit changes:
```bash
cd d:/student-learning-tracker
git add frontend/.env.production
git commit -m "Update production API URL for Heroku"
git push origin blackboxai/main
```

### 3.2 Deploy to Vercel
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import `dubeyvikky56/student-learning-tracker1`
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**

### 3.3 Add Environment Variable (Optional)
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://student-tracker-backend.herokuapp.com/api`
3. Redeploy if needed

### 3.4 Get Frontend URL
Your app will be at: `https://student-learning-tracker1.vercel.app`

---

## 🔧 STEP 4: Update CORS Settings (5 min)

### 4.1 Update Backend CORS
```bash
heroku config:set CORS_ORIGINS="https://student-learning-tracker1.vercel.app,http://localhost:5173" -a student-tracker-backend
```

### 4.2 Restart Heroku App
```bash
heroku restart -a student-tracker-backend
```

---

## ✅ STEP 5: Test Complete Application (5 min)

### 5.1 Open Frontend
Visit: `https://student-learning-tracker1.vercel.app`

### 5.2 Test Login
- **Admin**: `admin@test.com` / `admin123`
- **Student**: `student@test.com` / `student123`

### 5.3 Verify Features
- ✅ Login/Register works
- ✅ Dashboard loads
- ✅ Student/Course/Assessment CRUD
- ✅ Reports and analytics

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: App crashes on Heroku
```bash
# Check logs
heroku logs --tail -a student-tracker-backend

# Common fixes:
# 1. Database connection issue
heroku config -a student-tracker-backend  # Verify DATABASE_URL

# 2. Port binding issue (should auto-detect)
heroku config:set PORT=8080 -a student-tracker-backend

# 3. Restart app
heroku restart -a student-tracker-backend
```

**Problem**: Database connection timeout
- Check Supabase is running (green status)
- Verify DATABASE_URL format: `jdbc:postgresql://...`
- Check Supabase allows external connections (should be enabled by default)

**Problem**: Build fails
```bash
# Check Java version
cat student-tracker/system.properties  # Should be java.runtime.version=17

# Check Procfile
cat student-tracker/Procfile  # Should have correct command
```

### Frontend Issues

**Problem**: API calls fail (CORS error)
1. Check browser console for exact error
2. Verify CORS_ORIGINS includes your Vercel URL
3. Update and restart:
```bash
heroku config:set CORS_ORIGINS="https://your-actual-vercel-url.vercel.app" -a student-tracker-backend
heroku restart -a student-tracker-backend
```

**Problem**: Environment variable not working
1. Rebuild in Vercel dashboard
2. Or redeploy:
```bash
git commit --allow-empty -m "Trigger Vercel rebuild"
git push origin blackboxai/main
```

### Database Issues

**Problem**: Tables not created
- Re-run SQL script in Supabase SQL Editor
- Check for error messages

**Problem**: Demo users not working
- Verify password hash is correct in SQL
- Try creating new user via Register page

---

## 📊 Monitoring & Maintenance

### Heroku
```bash
# View logs
heroku logs --tail -a student-tracker-backend

# Check dyno status
heroku ps -a student-tracker-backend

# Restart app
heroku restart -a student-tracker-backend

# Open dashboard
heroku open -a student-tracker-backend
```

### Vercel
- Dashboard: https://vercel.com/dashboard
- View deployments, logs, analytics
- Automatic deployments on git push

### Supabase
- Dashboard: https://supabase.com/dashboard
- Monitor database size, connections
- View logs and performance

---

## 🎯 Free Tier Limits

### Heroku Free Tier
- ✅ 550-1000 dyno hours/month
- ✅ Sleeps after 30 min inactivity (wakes on request)
- ✅ Custom domain support
- ⚠️ App sleeps (first request takes 10-15 seconds)

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### Supabase Free Tier
- ✅ 500 MB database
- ✅ Unlimited API requests
- ✅ 50,000 monthly active users
- ✅ 2 GB file storage

---

## 🚀 Production Checklist

- [ ] Database schema created in Supabase
- [ ] Demo data inserted
- [ ] Backend deployed to Heroku
- [ ] All environment variables set
- [ ] Frontend deployed to Vercel
- [ ] CORS configured correctly
- [ ] Login/Register tested
- [ ] Admin features tested
- [ ] Student features tested
- [ ] API endpoints responding
- [ ] No console errors

---

## 📝 Important URLs

**Save these URLs:**

```
Frontend: https://student-learning-tracker1.vercel.app
Backend: https://student-tracker-backend.herokuapp.com
Database: db.xxx.supabase.co:5432

Admin Login: admin@test.com / admin123
Student Login: student@test.com / student123
```

---

## 🔄 Updating Your App

### Update Backend
```bash
cd d:/student-learning-tracker
git add .
git commit -m "Your changes"
git push origin blackboxai/main
git push heroku blackboxai/main:main
```

### Update Frontend
```bash
git add .
git commit -m "Your changes"
git push origin blackboxai/main
# Vercel auto-deploys from GitHub
```

---

## 🎉 Success!

Your Student Learning Tracker is now live at:
- **Frontend**: https://student-learning-tracker1.vercel.app
- **Backend**: https://student-tracker-backend.herokuapp.com

**Total Cost**: $0/month
**Deployment Time**: ~45 minutes

Enjoy your deployed application! 🚀
