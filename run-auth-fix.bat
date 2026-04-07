@echo off
echo Fixing H2 DB lock and starting servers...
taskkill /f /im java.exe 2>nul
Remove-Item -Recurse -Force student-tracker\data -ErrorAction SilentlyContinue 2>nul
mkdir student-tracker\data 2>nul
echo Fresh DB created. Starting...
.\start-all.bat
pause
