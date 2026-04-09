# OTP Login System - Test Guide

## ✅ Implementation Complete

### Backend Changes:
1. ✅ OtpService.java - Caffeine cache + Gmail SMTP
2. ✅ pom.xml - Added Caffeine dependency
3. ✅ application.properties - Gmail config added
4. ✅ AuthService.java - OTP flow (already done)
5. ✅ AuthController.java - OTP endpoint (already done)

### Frontend Changes:
1. ✅ OtpInput.jsx - Fixed regex bug
2. ✅ LoginPage.jsx - Added OTP step
3. ✅ useAuth.jsx - OTP support (already done)
4. ✅ api.js - verifyOtp (already done)

## 🚀 How to Test

### Step 1: Configure Gmail
Edit `backend/src/main/resources/application.properties`:
```properties
spring.mail.username=your_email@gmail.com
spring.mail.password=your_16_char_app_password
```

Get app password: https://myaccount.google.com/apppasswords

### Step 2: Start Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Test Login Flow
1. Go to http://localhost:5173/login
2. Enter: admin@test.com / admin123
3. Click "Sign In"
4. Check your email for OTP (6 digits)
5. Enter OTP on the verification screen
6. You should be logged in!

## 🔧 Troubleshooting

**OTP not received?**
- Check Gmail credentials in application.properties
- Enable "Less secure app access" or use App Password
- Check spam folder

**Backend error?**
- Run: `mvn clean install` to download Caffeine
- Check port 8080 is free

**Frontend error?**
- Clear browser cache
- Check console for errors

## 📝 Notes
- OTP expires in 5 minutes
- One-time use only
- Stored in memory (Caffeine cache)
- Works with any email provider (Gmail configured)
