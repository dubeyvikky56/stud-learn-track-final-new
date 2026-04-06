# MongoDB to PostgreSQL Migration Guide

## 🚀 Complete Migration Steps

### Prerequisites
1. **PostgreSQL 15+** installed and running
2. **Java 17+** 
3. **Maven 3.6+**
4. **VS Code** with Java extensions

### Step 1: Install PostgreSQL (if not installed)

#### Windows:
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password for 'postgres' user
4. Default port: 5432

#### Verify Installation:
```bash
psql --version
```

### Step 2: Create Database

#### Option A: Using pgAdmin (GUI)
1. Open pgAdmin
2. Connect to PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `student_tracker_db`

#### Option B: Using Command Line
```bash
# Connect to PostgreSQL
psql -U postgres -h localhost

# Run the setup script
\i D:/student-learning-tracker/database-setup.sql
```

### Step 3: Update Application Configuration

The `application.properties` has been updated with:
- PostgreSQL connection settings
- JPA/Hibernate configuration
- Flyway migration settings

**Environment Variables (Recommended):**
```bash
# Set these in your system or IDE
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key_here
```

### Step 4: Build and Run

```bash
# Navigate to project directory
cd D:/student-learning-tracker/student-tracker

# Clean and compile
mvn clean compile

# Run Flyway migrations (optional - Spring Boot will do this automatically)
mvn flyway:migrate

# Start the application
mvn spring-boot:run
```

### Step 5: Verify Migration

#### Check Database Tables:
```sql
-- Connect to database
\c student_tracker_db

-- List all tables
\dt

-- Check sample data
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM courses;
SELECT COUNT(*) FROM assessments;
SELECT COUNT(*) FROM results;
```

#### Test API Endpoints:
```bash
# Health check
curl http://localhost:8080/api/test/health

# Login test
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'

# Get students (with JWT token)
curl -X GET http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Step 6: Frontend Testing

The React frontend should work without changes:

```bash
# Start frontend
cd D:/student-learning-tracker/frontend
npm run dev
```

Visit: http://localhost:5173

**Test Accounts:**
- Admin: `admin@test.com` / `admin123`
- Student: `student@test.com` / `student123`

## 🔧 Key Changes Made

### 1. Dependencies (pom.xml)
- ❌ Removed: `spring-boot-starter-data-mongodb`
- ✅ Added: `spring-boot-starter-data-jpa`
- ✅ Added: `postgresql` driver
- ✅ Added: `flyway-core` for migrations
- ✅ Added: `h2` for testing

### 2. Entities Migration
- `@Document` → `@Entity`
- `@Id` with `@GeneratedValue(strategy = GenerationType.IDENTITY)`
- Added proper JPA relationships (`@OneToMany`, `@ManyToOne`)
- Added validation annotations
- Added `@CreationTimestamp` and `@UpdateTimestamp`

### 3. Repositories Migration
- `MongoRepository` → `JpaRepository`
- Added custom `@Query` annotations
- Added pagination support
- Added complex analytical queries

### 4. Database Schema
- **users**: Authentication data
- **students**: Student-specific information
- **courses**: Course catalog
- **assessments**: Quizzes, exams, assignments
- **results**: Student assessment results
- **learning_progress**: Study session tracking
- **student_course_enrollments**: Many-to-many relationship

### 5. Key Features
- ✅ **ACID Compliance**: Full transaction support
- ✅ **Referential Integrity**: Foreign key constraints
- ✅ **Complex Queries**: JOINs, aggregations, analytics
- ✅ **Automatic Timestamps**: Created/updated tracking
- ✅ **Data Validation**: Database-level constraints
- ✅ **Indexing**: Optimized query performance
- ✅ **Migration Scripts**: Version-controlled schema changes

## 🐛 Troubleshooting

### Common Issues:

#### 1. Connection Refused
```
Error: Connection to localhost:5432 refused
```
**Solution:** Ensure PostgreSQL is running
```bash
# Windows
net start postgresql-x64-15

# Check if running
netstat -an | findstr 5432
```

#### 2. Authentication Failed
```
Error: password authentication failed for user "postgres"
```
**Solution:** Check password in `application.properties` or set environment variable

#### 3. Database Does Not Exist
```
Error: database "student_tracker_db" does not exist
```
**Solution:** Run the database setup script first

#### 4. Flyway Migration Failed
```
Error: Migration failed
```
**Solution:** Check if tables already exist, use `mvn flyway:clean` if needed

#### 5. Port Already in Use
```
Error: Port 8080 is already in use
```
**Solution:** 
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /F /PID <process_id>
```

## 📊 Performance Benefits

### MongoDB vs PostgreSQL:
- ✅ **ACID Transactions**: Guaranteed data consistency
- ✅ **Complex Queries**: Advanced JOINs and analytics
- ✅ **Referential Integrity**: Foreign key constraints
- ✅ **Mature Ecosystem**: Extensive tooling and monitoring
- ✅ **SQL Standards**: Industry-standard query language
- ✅ **Better Analytics**: Built-in aggregation functions

## 🔄 Data Migration (if needed)

If you have existing MongoDB data:

### Export from MongoDB:
```bash
# Export collections
mongoexport --db student_tracker --collection users --out users.json
mongoexport --db student_tracker --collection students --out students.json
mongoexport --db student_tracker --collection courses --out courses.json
```

### Import to PostgreSQL:
```sql
-- Use COPY command or write custom import scripts
-- The sample data in V2__Insert_sample_data.sql provides examples
```

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `student_tracker_db` created
- [ ] Spring Boot application starts without errors
- [ ] Flyway migrations executed successfully
- [ ] Sample data inserted correctly
- [ ] API endpoints respond correctly
- [ ] Frontend connects to backend
- [ ] Authentication works
- [ ] CRUD operations work
- [ ] Complex queries return correct results

## 🎯 Next Steps

1. **Test all API endpoints** with Postman or curl
2. **Verify frontend functionality** 
3. **Run integration tests**
4. **Set up monitoring** (optional)
5. **Configure production settings** (when ready)

Your Student Learning Tracker is now running on PostgreSQL with full relational database capabilities! 🎉