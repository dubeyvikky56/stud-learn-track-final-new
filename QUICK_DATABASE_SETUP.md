# Quick Database Setup - You Already Have PostgreSQL!

## Step 1: Open pgAdmin 4

1. Open **pgAdmin 4** from your Start Menu
2. Enter your master password if prompted
3. You should see **Servers** in the left panel

## Step 2: Connect to PostgreSQL Server

1. Expand **Servers** in the left panel
2. Click on **PostgreSQL** (might be PostgreSQL 15 or 16)
3. Enter your **postgres password** when prompted
4. You should now see **Databases**, **Login/Group Roles**, etc.

## Step 3: Create Database

1. **Right-click** on **Databases**
2. Select **Create** → **Database...**
3. In the dialog:
   - **Database**: `student_tracker`
   - **Owner**: `postgres`
4. Click **Save**

✅ You should now see `student_tracker` in the Databases list!

## Step 4: Create Application User (Recommended)

1. **Right-click** on **Login/Group Roles**
2. Select **Create** → **Login/Group Role...**
3. **General Tab**:
   - **Name**: `tracker_user`
4. **Definition Tab**:
   - **Password**: `tracker_password`
5. **Privileges Tab**:
   - Check ✅ **Can login?**
   - Check ✅ **Create databases?**
6. Click **Save**

## Step 5: Grant Permissions to User

1. **Right-click** on `student_tracker` database
2. Select **Query Tool**
3. Copy and paste this SQL:

```sql
-- Grant all privileges to tracker_user
GRANT ALL PRIVILEGES ON DATABASE student_tracker TO tracker_user;

-- Connect to student_tracker
\c student_tracker

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO tracker_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tracker_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tracker_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO tracker_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO tracker_user;
```

4. Click **Execute** button (▶️) or press **F5**
5. You should see "Query returned successfully"

## Step 6: Update application.properties

Open: `d:\student-learning-tracker\student-tracker\src\main\resources\application.properties`

Replace the MongoDB configuration with:

```properties
# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/student_tracker
spring.datasource.username=tracker_user
spring.datasource.password=tracker_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Flyway Migration
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true

# JWT Configuration
jwt.secret=your-secret-key-change-this-in-production-minimum-256-bits
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

## Step 7: Start Your Application

Open **Terminal 1** in VS Code:

```cmd
cd d:\student-learning-tracker\student-tracker
mvn clean spring-boot:run
```

**What will happen:**
- Spring Boot will connect to PostgreSQL
- Flyway will automatically create all tables
- Sample data will be inserted (admin, student, courses, etc.)
- Server will start on port 8080

**Look for these success messages:**
```
Flyway Community Edition by Redgate
Successfully validated 2 migrations
Creating Schema History table "public"."flyway_schema_history"
Current version of schema "public": << Empty Schema >>
Migrating schema "public" to version "1 - Create initial schema"
Migrating schema "public" to version "2 - Insert sample data"
Successfully applied 2 migrations to schema "public"
```

## Step 8: Verify Data in pgAdmin

1. In pgAdmin, **right-click** on `student_tracker` database
2. Select **Refresh**
3. Expand: **Schemas** → **public** → **Tables**
4. You should see these tables:
   - users
   - students
   - courses
   - assessments
   - results
   - learning_progress
   - student_course_enrollment
   - flyway_schema_history

5. **Right-click** on `users` table → **View/Edit Data** → **All Rows**
6. You should see 2 users:
   - admin@test.com
   - student@test.com

## Step 9: Start Frontend

Open **Terminal 2** in VS Code:

```cmd
cd d:\student-learning-tracker\frontend
npm run dev
```

## Step 10: Test Your Application

1. Open browser: http://localhost:5173
2. **Login as Admin**:
   - Email: `admin@test.com`
   - Password: `admin123`
3. **Login as Student**:
   - Email: `student@test.com`
   - Password: `student123`

## ✅ Success Checklist

- [ ] pgAdmin connected to PostgreSQL
- [ ] Database `student_tracker` created
- [ ] User `tracker_user` created
- [ ] application.properties updated
- [ ] Spring Boot starts without errors
- [ ] Flyway migrations completed
- [ ] Tables visible in pgAdmin
- [ ] Sample data loaded
- [ ] Frontend connects successfully
- [ ] Login works

## 🚨 Common Issues

### Issue: "password authentication failed"
**Fix**: Update password in application.properties to match what you set

### Issue: "relation does not exist"
**Fix**: Flyway didn't run. Check console for errors and ensure migration files exist

### Issue: Spring Boot won't start
**Fix**: 
1. Check if PostgreSQL service is running
2. Verify database name and credentials
3. Check port 5432 is not blocked

---

**You're all set! Your Student Learning Tracker is now running on PostgreSQL!** 🎉
