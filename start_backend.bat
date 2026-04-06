@echo off
cd /d d:\student-learning-tracker\student-tracker
echo Starting backend...
mvn spring-boot:run > startup_log.txt 2>&1
