# Set JAVA_HOME for this session
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Write-Host "JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Spring Boot Backend..." -ForegroundColor Cyan
Write-Host ""

Set-Location "d:\student-learning-tracker\student-tracker"
mvn spring-boot:run
