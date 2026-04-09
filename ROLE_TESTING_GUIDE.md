# 🧪 Role-Based Login Testing Guide

## ⚠️ IMPORTANT: Clear Browser Data First!

Before testing, clear your browser's localStorage:

1. Open browser console (F12)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage"
4. Click "Clear All" or delete `token` and `user` keys
5. Refresh page

## 🚀 Test Scenarios

### Test 1: New User as ADMIN

**Steps:**
1. Go to: http://localhost:5173/login
2. Enter email: `newadmin@test.com`
3. **Select: 👨💼 Admin** (orange button should be highlighted)
4. Click "Send OTP"
5. Check backend console for OTP
6. Enter OTP
7. Click "Verify & Login"

**Expected Result:**
- Backend logs: `✅ Auto-registered new user: newadmin@test.com with role: ADMIN`
- Browser console: `User role: ADMIN`
- Browser console: `Navigating to: /admin/dashboard`
- **Redirects to ADMIN dashboard** ✅

---

### Test 2: New User as STUDENT

**Steps:**
1. **Clear localStorage** (see above)
2. Go to: http://localhost:5173/login
3. Enter email: `newstudent@test.com`
4. **Select: 🎓 Student** (blue button should be highlighted)
5. Click "Send OTP"
6. Check backend console for OTP
7. Enter OTP
8. Click "Verify & Login"

**Expected Result:**
- Backend logs: `✅ Auto-registered new user: newstudent@test.com with role: STUDENT`
- Browser console: `User role: STUDENT`
- Browser console: `Navigating to: /student/dashboard`
- **Redirects to STUDENT dashboard** ✅

---

### Test 3: Existing ADMIN User

**Steps:**
1. **Clear localStorage**
2. Go to: http://localhost:5173/login
3. Click "👨💼 Admin" demo button (auto-fills email + role)
4. Click "Send OTP"
5. Check backend console for OTP
6. Enter OTP
7. Click "Verify & Login"

**Expected Result:**
- Backend logs: `Login request received for email: admin@test.com with role: ADMIN`
- Browser console: `User role: ADMIN`
- **Redirects to ADMIN dashboard** ✅

---

### Test 4: Existing STUDENT User

**Steps:**
1. **Clear localStorage**
2. Go to: http://localhost:5173/login
3. Click "🎓 Student" demo button
4. Click "Send OTP"
5. Check backend console for OTP
6. Enter OTP
7. Click "Verify & Login"

**Expected Result:**
- Backend logs: `Login request received for email: student@test.com with role: STUDENT`
- Browser console: `User role: STUDENT`
- **Redirects to STUDENT dashboard** ✅

---

## 🔍 Debugging Steps

### Check Browser Console:

After clicking "Verify & Login", you should see:

```javascript
Sending login request: {email: "...", otp: "123456", role: "ADMIN"}
LOGIN RESPONSE: {partial: false, token: "...", email: "...", name: "...", role: "ADMIN"}
User data saved to localStorage: {email: "...", name: "...", role: "ADMIN"}
User role: ADMIN
Login result: {email: "...", name: "...", role: "ADMIN"}
User role from result: ADMIN
Navigating to: /admin/dashboard
```

### Check Backend Console:

```
Login request received for email: test@example.com with role: ADMIN
User not found, auto-registering: test@example.com
✅ Auto-registered new user: test@example.com with role: ADMIN
Generating and sending OTP to: test@example.com
🔐 OTP: 123456

Login request received for email: test@example.com with role: ADMIN
Verifying OTP for user: test@example.com
✅ OTP verified successfully for: test@example.com
```

### Check localStorage:

Open browser console and type:
```javascript
localStorage.getItem('user')
```

Should return:
```json
{"email":"test@example.com","name":"Test","role":"ADMIN"}
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Always redirects to Student dashboard

**Cause:** Old user data in localStorage

**Fix:**
1. Open console (F12)
2. Type: `localStorage.clear()`
3. Refresh page
4. Try again

---

### Issue 2: Role not changing

**Cause:** Existing user in database

**Fix:**
- Existing users keep their database role
- Role selection only works for NEW users
- Use a different email to test

---

### Issue 3: Backend shows wrong role

**Cause:** Role not sent in request

**Fix:**
1. Check browser console for: `Sending login request: {...}`
2. Verify `role` field is present
3. Restart frontend if needed

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can select ADMIN role (orange button highlights)
- [ ] Can select STUDENT role (blue button highlights)
- [ ] OTP appears in backend console
- [ ] Browser console shows correct role
- [ ] ADMIN users go to `/admin/dashboard`
- [ ] STUDENT users go to `/student/dashboard`
- [ ] localStorage has correct role
- [ ] Can logout and login again

---

## 📊 Quick Verification

Run this in browser console after login:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Current user:', user);
console.log('Role:', user.role);
console.log('Expected dashboard:', user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
```

---

## 🆘 Still Not Working?

1. **Restart backend:**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

2. **Restart frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Clear everything:**
   - Browser cache
   - localStorage
   - Cookies
   - Close all tabs
   - Open fresh browser window

4. **Check logs:**
   - Backend console for role
   - Browser console for navigation
   - Network tab for API responses

---

## 📝 Test Results Template

```
Test 1: New ADMIN
- Email: _______________
- Role selected: ADMIN ☐
- Backend role: _______________
- Frontend role: _______________
- Dashboard: _______________
- Result: PASS ☐ / FAIL ☐

Test 2: New STUDENT
- Email: _______________
- Role selected: STUDENT ☐
- Backend role: _______________
- Frontend role: _______________
- Dashboard: _______________
- Result: PASS ☐ / FAIL ☐
```

---

## ✅ System Ready!

Follow the test scenarios above to verify role-based login works correctly!
