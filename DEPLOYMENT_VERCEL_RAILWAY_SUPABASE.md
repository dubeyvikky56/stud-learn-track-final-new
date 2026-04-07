# 🚀 Complete Deployment Guide
## Frontend: Vercel | Backend: Railway | Database: Supabase

---

## 📋 Overview

- **Frontend (React)**: Vercel (Free)
- **Backend (Spring Boot)**: Railway ($5 credit free)
- **Database (PostgreSQL)**: Supabase (Free tier)

**Total Cost**: FREE for development/testing!

---

## 🗄️ STEP 1: Deploy Database on Supabase

### 1.1 Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended)

### 1.2 Create New Project

1. Click "New Project"
2. Fill in details:
   - **Name**: `student-tracker`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### 1.3 Get Database Connection Details

1. Go to **Project Settings** (gear icon)
2. Click **Database** in sidebar
3. Scroll to **Connection string**
4. Copy the **URI** (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. **SAVE THIS URL** - you'll need it!

### 1.4 Run Database Schema

1. In Supabase Dashboard, click **SQL Editor**
2. Click **New Query**
3. Copy and paste the following SQL:

```sql
-- Create ENUM types
CREATE TYPE user_role AS ENUM ('ADMIN', 'STUDENT');
CREATE TYPE assessment_type AS ENUM ('QUIZ', 'ASSIGNMENT', 'EXAM', 'PROJECT');
CREATE TYPE grade_type AS ENUM ('A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F');

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    semester INTEGER CHECK (semester >= 1 AND semester <= 8),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3 CHECK (credits > 0),
    instructor_name VARCHAR(255),
    instructor_email VARCHAR(255),
    semester INTEGER CHECK (semester >= 1 AND semester <= 8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessments table
CREATE TABLE assessments (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type assessment_type NOT NULL,
    total_marks INTEGER NOT NULL CHECK (total_marks > 0),
    passing_marks INTEGER NOT NULL CHECK (passing_marks >= 0),
    assessment_date DATE,
    duration_minutes INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT passing_marks_check CHECK (passing_marks <= total_marks)
);

-- Results table
CREATE TABLE results (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    assessment_id BIGINT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    marks_obtained INTEGER NOT NULL CHECK (marks_obtained >= 0),
    total_marks INTEGER NOT NULL CHECK (total_marks > 0),
    percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_marks > 0 THEN (marks_obtained * 100.0 / total_marks)
            ELSE 0
        END
    ) STORED,
    grade grade_type,
    remarks TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, assessment_id),
    CONSTRAINT marks_obtained_check CHECK (marks_obtained <= total_marks)
);

-- Learning Progress table
CREATE TABLE learning_progress (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    hours_studied DECIMAL(4,2) NOT NULL CHECK (hours_studied >= 0),
    topics_covered TEXT,
    notes TEXT,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    understanding_level INTEGER CHECK (understanding_level >= 1 AND understanding_level <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Course Enrollment table
CREATE TABLE student_course_enrollments (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_roll_number ON students(roll_number);
CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_assessments_course_id ON assessments(course_id);
CREATE INDEX idx_results_student_id ON results(student_id);
CREATE INDEX idx_results_assessment_id ON results(assessment_id);
CREATE INDEX idx_enrollments_student_id ON student_course_enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON student_course_enrollments(course_id);

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password, name, role) VALUES
('admin@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin User', 'ADMIN');

-- Insert sample student user (password: student123)
INSERT INTO users (email, password, name, role) VALUES
('student@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John Doe', 'STUDENT');

-- Insert sample student record
INSERT INTO students (user_id, roll_number, department, semester) VALUES
((SELECT id FROM users WHERE email = 'student@test.com'), 'CS2021001', 'Computer Science', 6);
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### 1.5 Verify Database

1. Click **Table Editor** in sidebar
2. You should see all tables: users, students, courses, etc.
3. Click on **users** table - you should see 2 users (admin and student)

✅ **Database Setup Complete!**

---

## 🖥️ STEP 2: Deploy Backend on Railway

### 2.1 Prepare Backend for Deployment

#### Update `application.properties`

Open: `student-tracker/src/main/resources/application.properties`

Replace with:

```properties
# Application Configuration
spring.application.name=student-tracker

# PostgreSQL Database Configuration (will be overridden by Railway env vars)
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5433/student_tracker}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD:kotaiit567}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.properties.hibernate.jdbc.time_zone=UTC
spring.jpa.open-in-view=false

# Flyway Configuration
spring.flyway.enabled=false

# JWT Configuration
jwt.secret=${JWT_SECRET:mySecretKey123456789012345678901234567890}
jwt.expiration=${JWT_EXPIRATION:86400000}

# Server Configuration
server.port=${PORT:8080}
server.servlet.context-path=/

# Logging Configuration
logging.level.com.tracker=INFO
logging.level.org.springframework.security=INFO
logging.level.org.springframework.web=INFO

# CORS Configuration - IMPORTANT: Update after deploying frontend
spring.web.cors.allowed-origins=${CORS_ORIGINS:http://localhost:5173,http://localhost:3000}
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Jackson Configuration
spring.jackson.default-property-inclusion=NON_NULL
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.time-zone=UTC

# Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=5
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=600000
spring.datasource.hikari.connection-timeout=30000
```

#### Create `railway.json` (Optional but recommended)

Create file: `student-tracker/railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/student-tracker-0.0.1-SNAPSHOT.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2.2 Push Code to GitHub

```bash
# Initialize git (if not already)
cd d:\student-learning-tracker
git init

# Create .gitignore
echo "target/
node_modules/
.env
*.log
.DS_Store" > .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repository (go to github.com and create new repo)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/student-learning-tracker.git
git branch -M main
git push -u origin main
```

### 2.3 Deploy on Railway

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Click **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository: `student-learning-tracker`
6. Railway will detect it's a Java project

### 2.4 Configure Railway Environment Variables

1. Click on your deployed service
2. Go to **Variables** tab
3. Add these variables:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[YOUR-SUPABASE-PASSWORD]
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random-min-32-chars
PORT=8080
CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

**Important**: 
- Replace `[YOUR-PASSWORD]` with your Supabase password
- Replace `[YOUR-SUPABASE-PASSWORD]` with your Supabase password
- We'll update `CORS_ORIGINS` after deploying frontend

### 2.5 Configure Build Settings

1. Go to **Settings** tab
2. Under **Build**, set:
   - **Root Directory**: `student-tracker`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/student-tracker-0.0.1-SNAPSHOT.jar`

### 2.6 Deploy

1. Click **Deploy** button
2. Wait 5-10 minutes for build
3. Check **Deployments** tab for progress
4. Once deployed, you'll get a URL like: `https://student-tracker-production.up.railway.app`

### 2.7 Test Backend

Open in browser:
```
https://your-backend-url.up.railway.app/api/auth/health
```

Should return: `"Auth service is running"`

✅ **Backend Deployed!**

---

## 🌐 STEP 3: Deploy Frontend on Vercel

### 3.1 Prepare Frontend for Deployment

#### Update API URL

Create file: `frontend/.env.production`

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

**Replace** `your-backend-url.up.railway.app` with your actual Railway URL!

#### Update `vite.config.js`

Open: `frontend/vite.config.js`

Make sure it looks like this:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
```

#### Create `vercel.json`

Create file: `frontend/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### 3.2 Push Changes to GitHub

```bash
cd d:\student-learning-tracker
git add .
git commit -m "Configure for production deployment"
git push origin main
```

### 3.3 Deploy on Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.4 Add Environment Variables

1. In Vercel project settings
2. Go to **Settings** → **Environment Variables**
3. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.up.railway.app/api
   ```
4. Click **Save**

### 3.5 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://student-tracker.vercel.app`

✅ **Frontend Deployed!**

---

## 🔗 STEP 4: Connect Everything

### 4.1 Update Backend CORS

1. Go to Railway dashboard
2. Click your backend service
3. Go to **Variables**
4. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS=https://student-tracker.vercel.app,https://your-custom-domain.com
   ```
5. Click **Save**
6. Backend will automatically redeploy

### 4.2 Test Complete Application

1. Open your Vercel URL: `https://student-tracker.vercel.app`
2. Try to register a new account
3. Try to login with demo accounts:
   - Admin: `admin@test.com` / `admin123`
   - Student: `student@test.com` / `student123`

---

## ✅ Deployment Checklist

- [ ] Supabase database created and schema loaded
- [ ] Backend deployed on Railway
- [ ] Backend environment variables configured
- [ ] Backend health endpoint working
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variables configured
- [ ] CORS configured correctly
- [ ] Registration works
- [ ] Login works
- [ ] All features working

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend won't start on Railway

**Solutions**:
1. Check **Deployments** tab for error logs
2. Verify DATABASE_URL is correct
3. Check if Supabase database is accessible
4. Verify Java version (should be 17)

**Problem**: Database connection failed

**Solutions**:
1. Check Supabase is running (go to dashboard)
2. Verify DATABASE_URL format
3. Check password is correct
4. Ensure Supabase allows connections from Railway

### Frontend Issues

**Problem**: Frontend shows blank page

**Solutions**:
1. Check browser console (F12)
2. Verify VITE_API_URL is correct
3. Check if backend is running
4. Clear browser cache

**Problem**: CORS errors

**Solutions**:
1. Update CORS_ORIGINS in Railway
2. Include your Vercel URL
3. Redeploy backend after changing CORS

**Problem**: API calls fail

**Solutions**:
1. Check Network tab in browser (F12)
2. Verify API URL is correct
3. Test backend health endpoint directly
4. Check Railway logs for errors

---

## 📊 Monitoring & Logs

### Railway Logs
1. Go to Railway dashboard
2. Click your service
3. Click **Deployments**
4. Click on latest deployment
5. View logs in real-time

### Vercel Logs
1. Go to Vercel dashboard
2. Click your project
3. Click **Deployments**
4. Click on latest deployment
5. View function logs

### Supabase Logs
1. Go to Supabase dashboard
2. Click **Logs** in sidebar
3. View database queries and errors

---

## 💰 Cost Breakdown

### Free Tier Limits

**Supabase (Free)**:
- 500 MB database
- 2 GB bandwidth
- 50,000 monthly active users
- Unlimited API requests

**Railway (Free)**:
- $5 credit per month
- ~500 hours of usage
- 1 GB RAM
- 1 GB disk

**Vercel (Free)**:
- 100 GB bandwidth
- Unlimited deployments
- Automatic SSL
- Global CDN

**Total**: FREE for small projects!

---

## 🚀 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project settings
2. Click **Domains**
3. Add your domain
4. Update DNS records as instructed
5. SSL automatically configured

### Add Custom Domain to Railway

1. Go to Railway project settings
2. Click **Settings** → **Domains**
3. Add custom domain
4. Update DNS CNAME record
5. SSL automatically configured

---

## 🔒 Security Best Practices

### Before Going Live

1. **Change JWT Secret**
   ```
   JWT_SECRET=use-a-very-long-random-string-here-min-64-chars
   ```

2. **Use Strong Database Password**
   - Change Supabase password to something strong

3. **Enable Rate Limiting**
   - Configure in Spring Security

4. **Add API Key Authentication** (Optional)
   - For additional security layer

5. **Enable HTTPS Only**
   - Already done by Vercel and Railway

6. **Regular Backups**
   - Supabase has automatic backups
   - Download manual backups regularly

---

## 📚 Useful Links

- **Your Frontend**: https://student-tracker.vercel.app
- **Your Backend**: https://your-app.up.railway.app
- **Supabase Dashboard**: https://app.supabase.com
- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 🎉 You're Done!

Your application is now live and accessible worldwide!

**Share your app**:
- Frontend URL: `https://student-tracker.vercel.app`
- Demo Accounts:
  - Admin: `admin@test.com` / `admin123`
  - Student: `student@test.com` / `student123`

**Next Steps**:
1. Test all features thoroughly
2. Monitor logs for errors
3. Set up monitoring/alerts
4. Add more features
5. Share with users!

---

Need help? Check the troubleshooting section or contact support:
- Supabase: https://supabase.com/docs
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
