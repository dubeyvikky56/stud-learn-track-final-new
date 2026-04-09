@echo off
echo ========================================
echo Role-Based Login - Quick Fix
echo ========================================
echo.

echo This script will help you test role-based login.
echo.

echo STEP 1: Clear Browser Data
echo ========================================
echo 1. Open your browser
echo 2. Press F12 to open console
echo 3. Type: localStorage.clear()
echo 4. Press Enter
echo 5. Refresh the page
echo.
pause

echo.
echo STEP 2: Test ADMIN Login
echo ========================================
echo 1. Go to: http://localhost:5173/login
echo 2. Enter: newadmin@example.com
echo 3. Select: Admin (orange button)
echo 4. Click "Send OTP"
echo 5. Check backend console for OTP
echo 6. Enter OTP
echo 7. Should redirect to /admin/dashboard
echo.
pause

echo.
echo STEP 3: Test STUDENT Login
echo ========================================
echo 1. Clear localStorage again (F12 -> localStorage.clear())
echo 2. Go to: http://localhost:5173/login
echo 3. Enter: newstudent@example.com
echo 4. Select: Student (blue button)
echo 5. Click "Send OTP"
echo 6. Check backend console for OTP
echo 7. Enter OTP
echo 8. Should redirect to /student/dashboard
echo.
pause

echo.
echo STEP 4: Check Browser Console
echo ========================================
echo After login, check browser console (F12) for:
echo - "User role: ADMIN" or "User role: STUDENT"
echo - "Navigating to: /admin/dashboard" or "/student/dashboard"
echo.
echo Also check localStorage:
echo Type: localStorage.getItem('user')
echo Should show: {"email":"...","name":"...","role":"ADMIN"}
echo.
pause

echo.
echo ========================================
echo Testing Complete!
echo ========================================
echo.
echo If still having issues:
echo 1. Restart backend: cd backend && mvn spring-boot:run
echo 2. Restart frontend: cd frontend && npm run dev
echo 3. Clear browser cache completely
echo 4. Try in incognito/private window
echo.
echo See ROLE_TESTING_GUIDE.md for detailed instructions.
echo.
pause
