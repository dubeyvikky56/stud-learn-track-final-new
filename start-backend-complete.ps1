# Kill any process on port 8080
Write-Host "Checking port 8080..." -ForegroundColor Yellow
$port8080 = netstat -ano | findstr :8080
if ($port8080) {
    $pid = ($port8080 -split '\s+')[-1]
    Write-Host "Killing process $pid on port 8080..." -ForegroundColor Red
    taskkill /PID $pid /F
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting MongoDB with Docker..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Check if MongoDB container exists
$mongoExists = docker ps -a --filter "name=student-tracker-mongo" --format "{{.Names}}"

if ($mongoExists) {
    Write-Host "MongoDB container exists, starting it..." -ForegroundColor Green
    docker start student-tracker-mongo
} else {
    Write-Host "Creating new MongoDB container..." -ForegroundColor Green
    docker run -d -p 27017:27017 --name student-tracker-mongo mongo:latest
}

Write-Host ""
Write-Host "Waiting for MongoDB to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Spring Boot Backend..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Set JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Set-Location "d:\student-learning-tracker\student-tracker"
mvn spring-boot:run
