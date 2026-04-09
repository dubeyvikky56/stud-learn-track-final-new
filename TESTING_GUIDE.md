# 🧪 OTP Login Testing Guide

## ⚠️ BEFORE TESTING - CRITICAL SETUP

### 1. Configure Gmail SMTP (REQUIRED!)

Edit: `backend/src/main/resources/application.properties`

Find these lines and replace with YOUR credentials:
```properties
spring.mail.username=YOUR_GMAIL@gmail.com
spring.mail.password=YOUR_16_CHAR_APP_PASSWORD
```

**How to get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Google account
3. Create app password for "Mail"
4. Copy the 16-character password
5. Paste it in application.properties

**Example:**
```properties
spring.mail.username=john.doe@gmail.com
spring.mail.password=abcd efgh ijkl mnop
```

### 2. Verify Database Has Users

The system needs existing users. Default users:
- `admin@test.com` (Admin)
- `student@test.com` (Student)

## 🚀 Testing Steps

### Step 1: Start Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Wait for:** `Started StudentTrackerApplication`

### Step 2: Test Backend Health
Open browser: http://localhost:8080/api/auth/health

Should see: `Auth service is running`

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

**Wait for:** `Local: http://localhost:5173`

### Step 4: Test Login Flow

1. Open: http://localhost:5173/login
2. Enter email: `admin@test.com` (or click "Admin" demo button)
3. Click "Send OTP"
4. **Check your email** (the one configured in application.properties)
5. Copy the 6-digit OTP
6. Enter OTP in the form
7. Click "Verify & Login"
8. ✅ Should redirect to dashboard!

## 🐛 Troubleshooting

### Error: "Failed to send OTP, invalid input data"

**Cause:** Email not configured or validation error

**Fix:**
1. Check `application.properties` has valid Gmail credentials
2. Restart backend after changing config
3. Check backend console for errors

### Error: "User not found"

**Cause:** Email doesn't exist in database

**Fix:**
1. Use `admin@test.com` or `student@test.com`
2. Or register a new account first
3. Check database has users

### Error: "Failed to send OTP. Please check email configuration"

**Cause:** Gmail SMTP not configured or wrong credentials

**Fix:**
1. Verify Gmail app password is correct (16 chars)
2. Check internet connection
3. Enable "Less secure app access" if needed
4. Check backend logs for detailed error

### OTP Not Received in Email

**Check:**
1. Spam/Junk folder
2. Gmail credentials are correct
3. Backend logs show "OTP sent successfully"
4. Email address is correct

### Error: "Invalid or expired OTP"

**Cause:** OTP expired (5 min) or wrong code

**Fix:**
1. Request new OTP
2. Enter code within 5 minutes
3. Check for typos in OTP

## 📝 Backend Logs to Watch

When you click "Send OTP", backend should show:
```
Login request received for email: admin@test.com
Generating and sending OTP to: admin@test.com
OTP sent successfully to: admin@test.com
```

When you verify OTP, backend should show:
```
Login request received for email: admin@test.com
Verifying OTP for user: admin@test.com
OTP verified successfully for: admin@test.com
```

## 🔍 Manual API Testing

Use the provided script:
```bash
test-otp-login.bat
```

Or test manually with curl:

**Send OTP:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@test.com\"}"
```

**Verify OTP:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@test.com\",\"otp\":\"123456\"}"
```

## ✅ Success Indicators

1. Backend starts without errors
2. Health endpoint responds
3. "Send OTP" shows success toast
4. Email received with 6-digit code
5. "Verify & Login" redirects to dashboard
6. User is logged in (check localStorage for token)

## 🆘 Still Having Issues?

1. Check backend console for errors
2. Check browser console (F12) for errors
3. Verify all files are saved
4. Restart both backend and frontend
5. Clear browser cache and localStorage
6. Try with a different email account
