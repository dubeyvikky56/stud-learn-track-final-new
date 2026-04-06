-- PostgreSQL Database Setup Script for Student Learning Tracker
-- Run this script as a PostgreSQL superuser (postgres)

-- Create database
CREATE DATABASE student_tracker_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Connect to the database
\c student_tracker_db;

-- Create application user (optional, for security)
CREATE USER student_tracker_user WITH PASSWORD 'tracker_password_2024';

-- Grant privileges to the application user
GRANT CONNECT ON DATABASE student_tracker_db TO student_tracker_user;
GRANT USAGE ON SCHEMA public TO student_tracker_user;
GRANT CREATE ON SCHEMA public TO student_tracker_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO student_tracker_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO student_tracker_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO student_tracker_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO student_tracker_user;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Display connection info
SELECT 'Database student_tracker_db created successfully!' as status;
SELECT 'User student_tracker_user created with necessary privileges!' as status;
SELECT 'You can now run your Spring Boot application!' as status;