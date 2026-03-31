@echo off
echo Setting JAVA_HOME...
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo JAVA_HOME set to: %JAVA_HOME%
echo.
echo Starting Spring Boot Backend...
echo.

cd /d "%~dp0student-tracker"
mvn spring-boot:run
