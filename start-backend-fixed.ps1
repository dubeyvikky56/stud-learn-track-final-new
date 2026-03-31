# Set JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up environment..." -ForegroundColor Yellow
Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "d:\student-learning-tracker\student-tracker"

Write-Host "Cleaning and compiling project..." -ForegroundColor Yellow
mvn clean compile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Compilation successful!" -ForegroundColor Green
    Write-Host "Starting Spring Boot application..." -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    mvn spring-boot:run
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Compilation failed! Check errors above." -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    pause
}
