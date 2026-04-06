# 🚀 Quick Start Guide - EduTrack

## Start the Application

### Terminal 1 - Backend
```bash
cd d:\student-learning-tracker\student-tracker
mvn clean spring-boot:run
```
Wait for: `Started StudentTrackerApplication in X seconds`

### Terminal 2 - Frontend
```bash
cd d:\student-learning-tracker\frontend
npm run dev
```
Open: http://localhost:5173

## Test Authentication

### 1️⃣ Quick Test with Demo Accounts

**Login Page**: http://localhost:5173/login

**Admin Demo**:
- Click "👨💼 Admin Demo" button
- Click "Sign In"
- Should redirect to Admin Dashboard

**Student Demo**:
- Click "🎓 Student Demo" button
- Click "Sign In"
- Should redirect to Student Dashboard

### 2️⃣ Test Registration

**Register Page**: http://localhost:5173/register

**Create Student Account**:
1. Select "🎓 Student" account type
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Roll Number: CS2024001
   - Semester: 1
   - Department: Computer Science
   - Password: test123
   - Confirm Password: test123
3. Click "Create Account"
4. Should redirect to Student Dashboard

**Create Admin Account**:
1. Select "👨💼 Educator" account type
2. Fill in:
   - Name: Your Name
   - Email: admin@email.com
   - Department: Computer Science
   - Password: admin123
   - Confirm Password: admin123
3. Click "Create Account"
4. Should redirect to Admin Dashboard

### 3️⃣ Test Logout

1. Click "Logout" button in sidebar
2. Should see success message
3. Should redirect to login page

## Features Overview

### 🎓 Student Portal
- **Dashboard**: View your stats and recent results
- **My Courses**: See enrolled courses
- **My Results**: Check assessment results
- **Progress**: Track your academic progress

### 👨💼 Admin Panel
- **Dashboard**: System overview and statistics
- **Students**: Manage student records
- **Courses**: Create and manage courses
- **Assessments**: Create assessments
- **Results**: Enter and manage results
- **Reports**: Generate performance reports

## Common Issues & Solutions

### ❌ "Cannot deserialize value" error
**Solution**: Already fixed! Role values are now uppercase.

### ❌ Login/Register not working
**Solutions**:
1. Check if backend is running on port 8080
2. Check if PostgreSQL is running on port 5433
3. Clear browser localStorage: `localStorage.clear()`
4. Check browser console for errors

### ❌ Redirecting to wrong dashboard
**Solution**: Clear localStorage and login again

### ❌ Logout not working
**Solution**: Already fixed! Logout button now properly clears session.

## Database Info

- **Host**: localhost
- **Port**: 5433
- **Database**: student_tracker
- **Username**: postgres
- **Password**: kotaiit567

## API Base URL

- **Backend**: http://localhost:8080/api
- **Frontend**: http://localhost:5173

## Modern Design Features

✨ **Glassmorphism UI** - Modern glass-like cards
🎨 **Purple-Blue Gradient** - Consistent color theme
🌙 **Dark Mode** - Professional dark theme
⚡ **Smooth Animations** - Floating elements and transitions
📱 **Responsive Design** - Works on all screen sizes
🔐 **Secure Authentication** - JWT-based auth with role-based access

## Need Help?

Check these files:
- `AUTH_FIX_SUMMARY.md` - Detailed authentication fix documentation
- `BACKEND_REFERENCE.md` - Backend configuration and troubleshooting
- `README.md` - Project overview and setup

---

**Everything is now working! Enjoy your modern EduTrack application!** 🎉
