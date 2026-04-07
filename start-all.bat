@echo off
echo ========================================
echo Student Learning Tracker - Full Stack
echo ========================================
echo.

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

echo JAVA_HOME: %JAVA_HOME%
echo.
echo Starting PostgreSQL if using docker-compose...
echo.
echo Starting Spring Boot Backend on port 8080...
start cmd /k "cd /d %~dp0 && run-backend.bat"
timeout /t 5
echo.
echo Starting React Frontend on port 5173...
start cmd /k "cd /d %~dp0 && run-frontend.bat"
echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo ========================================
