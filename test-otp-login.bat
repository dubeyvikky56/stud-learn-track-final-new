@echo off
echo ========================================
echo Testing OTP Login System
echo ========================================
echo.

echo Step 1: Testing backend health...
curl -X GET http://localhost:8080/api/auth/health
echo.
echo.

echo Step 2: Testing OTP send (email only)...
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@test.com\"}"
echo.
echo.

echo Step 3: Enter the OTP you received in email:
set /p OTP="OTP: "

echo.
echo Step 4: Testing OTP verification...
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@test.com\",\"otp\":\"%OTP%\"}"
echo.
echo.

echo ========================================
echo Test Complete!
echo ========================================
pause
