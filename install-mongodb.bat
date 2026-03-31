@echo off
echo ========================================
echo Installing MongoDB Community Server
echo ========================================
echo.

REM Check if Chocolatey is installed
where choco >nul 2>&1
if %errorlevel% neq 0 (
    echo Chocolatey not found. Installing Chocolatey first...
    echo.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    
    echo.
    echo Chocolatey installed! Please close this window and run this script again.
    pause
    exit
)

echo Installing MongoDB...
choco install mongodb -y

echo.
echo ========================================
echo MongoDB Installation Complete!
echo ========================================
echo.
echo Starting MongoDB service...
net start MongoDB

echo.
echo MongoDB is now running on localhost:27017
echo.
echo Now you can run: mvn spring-boot:run
echo.
pause
