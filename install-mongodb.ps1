# MongoDB Installation Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installing MongoDB Community Server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit
}

# Check if Chocolatey is installed
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey package manager..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    Write-Host ""
    Write-Host "Chocolatey installed! Refreshing environment..." -ForegroundColor Green
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

Write-Host ""
Write-Host "Installing MongoDB Community Server..." -ForegroundColor Yellow
choco install mongodb -y

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "MongoDB Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
Start-Service MongoDB -ErrorAction SilentlyContinue

if ($?) {
    Write-Host "MongoDB is running on localhost:27017" -ForegroundColor Green
} else {
    Write-Host "Starting MongoDB manually..." -ForegroundColor Yellow
    net start MongoDB
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready! Now run your Spring Boot backend:" -ForegroundColor Green
Write-Host "mvn spring-boot:run" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
pause
