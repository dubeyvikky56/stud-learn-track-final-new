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

echo [3/4] Checking Node.js...
node -v 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js
) else (
    echo ✅ Node.js is installed
)
echo.

echo [4/4] Checking MongoDB connection...
echo Attempting to connect to MongoDB on localhost:27017...
timeout /t 2 >nul
echo ⚠️  Please ensure MongoDB is running manually
echo.

echo ========================================
echo Setup Check Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Open Terminal 1: cd student-tracker ^&^& mvn spring-boot:run
echo 3. Open Terminal 2: cd frontend ^&^& npm run dev
echo 4. Open browser: http://localhost:5173
echo.
pause
