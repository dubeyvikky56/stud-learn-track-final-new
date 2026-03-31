@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
cd /d "d:\student-learning-tracker\student-tracker"
mvn clean compile
pause
