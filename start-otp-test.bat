@echo off
echo ========================================
echo OTP Login System - Quick Start
echo ========================================
echo.

echo IMPORTANT: Before running, configure Gmail in:
echo backend\src\main\resources\application.properties
echo.
echo Get app password: https://myaccount.google.com/apppasswords
echo.
pause

echo.
echo Starting Backend...
echo.
start cmd /k "cd backend && mvn spring-boot:run"

timeout /t 15 /nobreak

echo.
echo Starting Frontend...
echo.
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both services starting...
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Login with: admin@test.com
echo ========================================
echo.
pause
