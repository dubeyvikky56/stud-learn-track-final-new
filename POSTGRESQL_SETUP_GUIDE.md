# PostgreSQL Installation & Setup Guide for Student Learning Tracker

## 📥 Step 1: Download PostgreSQL

1. Visit: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download PostgreSQL 15 or 16 (recommended)
4. Choose Windows x86-64 version

## 🛠️ Step 2: Install PostgreSQL

1. **Run the installer** as Administrator
2. **Installation Directory**: Keep default `C:\Program Files\PostgreSQL\15`
3. **Components**: Select all (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
4. **Data Directory**: Keep default `C:\Program Files\PostgreSQL\15\data`
5. **Password**: Set a strong password for `postgres` user (remember this!)
6. **Port**: Keep default `5432`
7. **Locale**: Keep default
8. Click **Next** through remaining steps and **Finish**

## 🔧 Step 3: Verify Installation

### Option A: Using pgAdmin (GUI)
1. Open **pgAdmin 4** from Start Menu
2. Create master password when prompted
3. Expand **Servers** → **PostgreSQL 15**
4. Enter your postgres password
5. You should see the database server connected

### Option B: Using Command Line
1. Open **Command Prompt** as Administrator
2. Navigate to PostgreSQL bin directory:
```cmd
cd "C:\Program Files\PostgreSQL\15\bin"
```
3. Connect to PostgreSQL:
```cmd
psql -U postgres
```
4. Enter your password when prompted
5. You should see `postgres=#` prompt

## 🗄️ Step 4: Create Database for Student Tracker

### Using pgAdmin (Recommended)
1. Right-click **Databases** under PostgreSQL server
2. Select **Create** → **Database**
3. **Database name**: `student_tracker`
4. **Owner**: `postgres`
5. Click **Save**

### Using Command Line
```sql
-- Connect to PostgreSQL first
psql -U postgres

-- Create database
CREATE DATABASE student_tracker;

-- Verify database creation
\l

-- Connect to the new database
\c student_tracker

-- Exit
\q
```

## 🔐 Step 5: Create Application User (Optional but Recommended)

### Using pgAdmin
1. Right-click **Login/Group Roles**
2. Select **Create** → **Login/Group Role**
3. **General Tab**:
   - Name: `tracker_user`
4. **Definition Tab**:
   - Password: `tracker_password`
5. **Privileges Tab**:
   - Can login: ✅
   - Create databases: ✅
6. Click **Save**

### Using Command Line
```sql
-- Connect as postgres user
psql -U postgres

-- Create user
CREATE USER tracker_user WITH PASSWORD 'tracker_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE student_tracker TO tracker_user;

-- Connect to student_tracker database
\c student_tracker

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO tracker_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tracker_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tracker_user;

-- Exit
\q
```

## ⚙️ Step 6: Update Application Configuration

Update your `application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/student_tracker
spring.datasource.username=tracker_user
spring.datasource.password=tracker_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Flyway Configuration
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
```

## 🚀 Step 7: Run Database Migrations

1. **Start your Spring Boot application**:
```cmd
cd d:\student-learning-tracker\student-tracker
mvn clean spring-boot:run
```

2. **Flyway will automatically**:
   - Create tables from `V1__Create_initial_schema.sql`
   - Insert sample data from `V2__Insert_sample_data.sql`

3. **Verify in pgAdmin**:
   - Refresh `student_tracker` database
   - Check **Schemas** → **public** → **Tables**
   - You should see: users, students, courses, assessments, results, etc.

## 🔍 Step 8: Verify Sample Data

### Using pgAdmin Query Tool
1. Right-click `student_tracker` database
2. Select **Query Tool**
3. Run these queries:

```sql
-- Check users
SELECT * FROM users;

-- Check students
SELECT * FROM students;

-- Check courses
SELECT * FROM courses;

-- Check sample results
SELECT r.*, s.first_name, s.last_name, c.course_name, a.title 
FROM results r
JOIN students s ON r.student_id = s.id
JOIN courses c ON r.course_id = c.id
JOIN assessments a ON r.assessment_id = a.id;
```

## 🛠️ Troubleshooting

### Issue: "Connection refused"
**Solution**: Ensure PostgreSQL service is running
```cmd
# Check service status
sc query postgresql-x64-15

# Start service if stopped
net start postgresql-x64-15
```

### Issue: "Authentication failed"
**Solution**: 
1. Check password in `application.properties`
2. Verify user exists in pgAdmin
3. Reset password if needed:
```sql
ALTER USER tracker_user WITH PASSWORD 'new_password';
```

### Issue: "Database does not exist"
**Solution**: Create database manually using pgAdmin or:
```sql
psql -U postgres
CREATE DATABASE student_tracker;
```

### Issue: Flyway migration fails
**Solution**: 
1. Check migration files in `src/main/resources/db/migration/`
2. Clear Flyway history if needed:
```sql
DROP TABLE IF EXISTS flyway_schema_history;
```
3. Restart application

## 📊 Step 9: Test Your Application

1. **Start Backend**:
```cmd
cd d:\student-learning-tracker\student-tracker
mvn clean spring-boot:run
```

2. **Start Frontend**:
```cmd
cd d:\student-learning-tracker\frontend
npm run dev
```

3. **Test Login**:
   - Admin: admin@test.com / admin123
   - Student: student@test.com / student123

4. **Verify Data**: Check if students, courses, and results display correctly

## 🎉 Success Indicators

✅ PostgreSQL service running on port 5432  
✅ Database `student_tracker` created  
✅ Spring Boot starts without errors  
✅ Flyway migrations execute successfully  
✅ Sample data loaded (2 users, 3 students, 4 courses, etc.)  
✅ Frontend connects and displays data  
✅ Login works for both admin and student accounts  

## 📞 Need Help?

- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **pgAdmin Documentation**: https://www.pgadmin.org/docs/
- **Spring Boot + PostgreSQL**: https://spring.io/guides/gs/accessing-data-jpa/

Your Student Learning Tracker is now ready with PostgreSQL! 🚀