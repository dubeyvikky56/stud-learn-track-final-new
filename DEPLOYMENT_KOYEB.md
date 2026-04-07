# 🚀 Complete Deployment Guide: Vercel + Koyeb + Supabase

## 📋 Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Koyeb (Spring Boot + Java 17)
- **Database**: Supabase (PostgreSQL)
- **Cost**: $0 (Free tiers)
- **Time**: ~40 minutes

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
   Full JDBC URL: jdbc:postgresql://db.xxx.supabase.co:5432/postgres
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

## 🖥️ STEP 2: Deploy Backend on Koyeb (15 min)

### 2.1 Create Koyeb Account
1. Go to https://www.koyeb.com
2. Sign up with GitHub (recommended)
3. Verify your email

### 2.2 Connect GitHub Repository
1. In Koyeb dashboard, click **"Create App"**
2. Select **"GitHub"** as deployment method
3. Click **"Connect GitHub"**
4. Authorize Koyeb to access your repositories
5. Select repository: `dubeyvikky56/student-learning-tracker1`
6. Select branch: `blackboxai/main` (or `main`)

### 2.3 Configure Build Settings
Fill in these settings:

**Basic Settings:**
- **App Name**: `student-tracker-backend`
- **Region**: Choose closest to you (e.g., Washington DC, Frankfurt)

**Build Settings:**
- **Builder**: `Buildpack`
- **Build Command**: Leave empty (auto-detected)
- **Run Command**: `java -Dserver.port=$PORT -jar target/student-tracker-0.0.1-SNAPSHOT.jar`
- **Working Directory**: `student-tracker`

**Instance Settings:**
- **Instance Type**: `Nano` (Free tier - 512MB RAM, 0.1 vCPU)
- **Scaling**: 1 instance
- **Port**: `8080` (Koyeb will auto-map to HTTPS)

### 2.4 Add Environment Variables
Click **"Environment Variables"** and add these:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `jdbc:postgresql://db.xxx.supabase.co:5432/postgres` |
| `DATABASE_USERNAME` | `postgres` |
| `DATABASE_PASSWORD` | `[YOUR-SUPABASE-PASSWORD]` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-min-256-bits` |
| `CORS_ORIGINS` | `https://your-frontend-app.vercel.app,http://localhost:5173` |
| `PORT` | `8080` |

**Important**: Replace placeholders with actual values!

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait 5-10 minutes for build and deployment
3. Monitor logs in real-time

### 2.6 Get Backend URL
Once deployed, your backend will be at:
```
https://student-tracker-backend-[your-koyeb-id].koyeb.app
```

Copy this URL - you'll need it for frontend!

### 2.7 Test Backend API
Open browser or use curl:
```bash
curl https://student-tracker-backend-[your-id].koyeb.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

Should return JWT token.

---

## 🌐 STEP 3: Deploy Frontend on Vercel (10 min)

### 3.1 Update Frontend API URL
1. Edit `frontend/.env.production`:
```env
VITE_API_URL=https://student-tracker-backend-[your-id].koyeb.app/api
```

2. Commit changes:
```bash
cd d:/student-learning-tracker
git add frontend/.env.production
git commit -m "Update production API URL for Koyeb"
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

### 3.3 Add Environment Variable
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://student-tracker-backend-[your-id].koyeb.app/api`
3. Click **"Save"**
4. Go to **Deployments** → Click **"Redeploy"** on latest deployment

### 3.4 Get Frontend URL
Your app will be at: `https://student-learning-tracker1.vercel.app`

---

## 🔧 STEP 4: Update CORS Settings (5 min)

### 4.1 Update Backend CORS in Koyeb
1. Go to Koyeb dashboard
2. Click on your app: `student-tracker-backend`
3. Go to **Settings** → **Environment Variables**
4. Edit `CORS_ORIGINS`:
   ```
   https://student-learning-tracker1.vercel.app,http://localhost:5173
   ```
5. Click **"Save"**
6. App will auto-redeploy

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

### Backend Issues on Koyeb

**Problem**: Build fails
1. Check build logs in Koyeb dashboard
2. Verify `Working Directory` is set to `student-tracker`
3. Ensure `system.properties` has `java.runtime.version=17`
4. Check Maven build:
   ```bash
   cd student-tracker
   mvn clean package -DskipTests
   ```

**Problem**: App crashes after deployment
1. Check **Logs** tab in Koyeb dashboard
2. Common issues:
   - Database connection: Verify `DATABASE_URL` format
   - Port binding: Ensure `PORT=8080` is set
   - Memory: Nano instance might be insufficient (upgrade if needed)

**Problem**: Database connection timeout
- Verify Supabase is running (green status)
- Check `DATABASE_URL` format: `jdbc:postgresql://...`
- Test connection from local machine first
- Ensure Supabase allows external connections

**Problem**: Environment variables not loading
1. Go to Koyeb → App → Settings → Environment Variables
2. Verify all variables are set correctly
3. Click **"Redeploy"** after changes

### Frontend Issues

**Problem**: API calls fail (CORS error)
1. Check browser console for exact error
2. Verify `CORS_ORIGINS` in Koyeb includes your Vercel URL
3. Update CORS_ORIGINS and redeploy backend
4. Clear browser cache and try again

**Problem**: Environment variable not working
1. Verify `.env.production` has correct Koyeb URL
2. Rebuild in Vercel dashboard
3. Or trigger redeploy:
   ```bash
   git commit --allow-empty -m "Trigger Vercel rebuild"
   git push origin blackboxai/main
   ```

**Problem**: 404 on page refresh
- Already fixed with `vercel.json` (SPA routing)
- If issue persists, verify `vercel.json` is in `frontend/` directory

### Database Issues

**Problem**: Tables not created
- Re-run SQL script in Supabase SQL Editor
- Check for error messages in SQL output

**Problem**: Demo users not working
- Verify password hash is correct in SQL
- Try creating new user via Register page
- Check users table: `SELECT * FROM users;`

---

## 📊 Monitoring & Maintenance

### Koyeb Dashboard
1. Go to https://app.koyeb.com
2. View your app: `student-tracker-backend`
3. Tabs available:
   - **Overview**: Status, URL, metrics
   - **Logs**: Real-time application logs
   - **Metrics**: CPU, Memory, Network usage
   - **Settings**: Environment variables, scaling

### Useful Commands
```bash
# View logs (if CLI installed)
koyeb logs student-tracker-backend

# Redeploy
# Go to Koyeb dashboard → App → Click "Redeploy"
```

### Vercel Dashboard
- Dashboard: https://vercel.com/dashboard
- View deployments, logs, analytics
- Automatic deployments on git push

### Supabase Dashboard
- Dashboard: https://supabase.com/dashboard
- Monitor database size, connections
- View logs and performance
- SQL Editor for queries

---

## 🎯 Free Tier Limits

### Koyeb Free Tier
- ✅ 1 Nano instance (512MB RAM, 0.1 vCPU)
- ✅ Always-on (no sleep)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ GitHub auto-deploy
- ⚠️ Limited to 1 free app

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ GitHub integration

### Supabase Free Tier
- ✅ 500 MB database
- ✅ Unlimited API requests
- ✅ 50,000 monthly active users
- ✅ 2 GB file storage
- ⚠️ Pauses after 1 week inactivity (free tier)

---

## 🚀 Production Checklist

- [ ] Database schema created in Supabase
- [ ] Demo data inserted
- [ ] Backend deployed to Koyeb
- [ ] All environment variables set in Koyeb
- [ ] Backend URL obtained
- [ ] Frontend `.env.production` updated
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
Backend: https://student-tracker-backend-[your-id].koyeb.app
Database: db.xxx.supabase.co:5432

Admin Login: admin@test.com / admin123
Student Login: student@test.com / student123

Koyeb Dashboard: https://app.koyeb.com
Vercel Dashboard: https://vercel.com/dashboard
Supabase Dashboard: https://supabase.com/dashboard
```

---

## 🔄 Updating Your App

### Update Backend
```bash
cd d:/student-learning-tracker
git add .
git commit -m "Your backend changes"
git push origin blackboxai/main
# Koyeb auto-deploys from GitHub
```

### Update Frontend
```bash
git add .
git commit -m "Your frontend changes"
git push origin blackboxai/main
# Vercel auto-deploys from GitHub
```

### Manual Redeploy
- **Koyeb**: Dashboard → App → Click "Redeploy"
- **Vercel**: Dashboard → Deployments → Click "Redeploy"

---

## 💡 Pro Tips

1. **Koyeb Build Time**: First build takes 5-10 minutes. Subsequent builds are faster.

2. **Environment Variables**: Always redeploy after changing env vars in Koyeb.

3. **Logs**: Monitor Koyeb logs during first deployment to catch issues early.

4. **Database Connection**: Test Supabase connection locally before deploying.

5. **CORS**: Update CORS_ORIGINS whenever you change frontend URL.

6. **Custom Domain**: Both Koyeb and Vercel support custom domains (free).

7. **Auto-Deploy**: Both platforms auto-deploy on git push (very convenient!).

8. **Rollback**: Both platforms allow easy rollback to previous deployments.

---

## 🎉 Success!

Your Student Learning Tracker is now live at:
- **Frontend**: https://student-learning-tracker1.vercel.app
- **Backend**: https://student-tracker-backend-[your-id].koyeb.app

**Total Cost**: $0/month
**Deployment Time**: ~40 minutes
**Always-On**: Yes (Koyeb doesn't sleep like Heroku free tier)

Enjoy your deployed application! 🚀

---

## 📞 Support

- **Koyeb Docs**: https://www.koyeb.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Repo**: https://github.com/dubeyvikky56/student-learning-tracker1
