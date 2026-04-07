@echo off
echo ========================================
echo Checking Student Learning Tracker Setup
echo ========================================
echo.

echo [1/4] Checking Java...
java -version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java not found! Please install Java 17+
) else (
    echo ✅ Java is installed
)
echo.

echo [2/4] Checking Maven...
mvn -version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Maven not found! Please install Maven
) else (
    echo ✅ Maven is installed
)
echo.

echo [2/3] Checking Node.js (for frontend)...
node -v 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js ^(frontend requires it^)
) else (
    echo ✅ Node.js is installed
)
echo.

echo [3/3] Checking PostgreSQL...
echo PostgreSQL should be running on localhost:5433
echo Use docker-compose up or install locally
echo.

echo ========================================
echo Setup Check Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Start PostgreSQL ^(docker-compose up postgres^)
echo 2. Terminal 1: cd student-tracker ^&^& mvn spring-boot:run
echo 3. Terminal 2: cd frontend ^&^& npm run dev
echo 4. Browser: http://localhost:5173
echo.
pause
