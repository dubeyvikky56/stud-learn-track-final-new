@echo off
echo ========================================
echo Student Learning Tracker - Full Stack
echo ========================================
echo.
echo Starting MongoDB (make sure MongoDB is running)...
echo.
echo Starting Spring Boot Backend on port 8080...
start cmd /k "cd student-tracker && mvn spring-boot:run"
timeout /t 5
echo.
echo Starting React Frontend on port 5173...
start cmd /k "cd frontend && npm run dev"
echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo ========================================
