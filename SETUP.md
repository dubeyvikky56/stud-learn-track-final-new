# Student Learning Outcome Tracking System - Setup Guide

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Docker (optional, for containerized deployment)

### Option 1: Local Development

#### 1. Backend Setup

```bash
cd student-learning-tracker/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your MongoDB connection string and JWT secret
# Example:
# MONGODB_URI=mongodb://localhost:27017/student_learning_tracker
# JWT_SECRET=your_jwt_secret_key_here
# JWT_EXPIRES_IN=7d
# PORT=5000
# FRONTEND_URL=http://localhost:3000

# Start the backend server
npm start
```

#### 2. Frontend Setup

```bash
cd student-learning-tracker/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your API URL
# Example:
# VITE_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

#### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Option 2: Docker Deployment

```bash
cd student-learning-tracker

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Default Demo Accounts

### Admin (Teacher) Account
- **Email**: admin@example.com
- **Password**: admin123
- **Access**: Admin dashboard with full management capabilities

### Student Account
- **Email**: student@example.com
- **Password**: student123
- **Access**: Student dashboard with personal learning analytics

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Students (Admin only)
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses (Admin only)
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Assessments (Admin only)
- `GET /api/assessments` - Get all assessments
- `POST /api/assessments` - Create new assessment
- `PUT /api/assessments/:id` - Update assessment
- `DELETE /api/assessments/:id` - Delete assessment

### Results (Admin only)
- `GET /api/results` - Get all results
- `POST /api/results` - Create new result
- `GET /api/results/student/:id` - Get student results
- `GET /api/results/assessment/:id` - Get assessment results
- `PUT /api/results/:id` - Update result
- `DELETE /api/results/:id` - Delete result

### Reports (Admin only)
- `GET /api/reports/performance` - Get performance analytics
- `GET /api/reports/student/:id` - Get student report
- `GET /api/reports/pdf/student/:id` - Generate PDF report

## Database Schema

### Collections

1. **Users**
   - id, name, email, password, role, createdAt

2. **Students**
   - studentId, name, email, courses, createdAt

3. **Courses**
   - courseId, courseName, instructor, description, students, createdAt

4. **Assessments**
   - assessmentId, courseId, title, assessmentType, maxMarks, date, description, createdAt

5. **Results**
   - studentId, assessmentId, marksObtained, percentage, grade, createdAt

## Features Overview

### Admin Dashboard
- Student management (add, edit, delete)
- Course management
- Assessment tracking
- Result management
- Performance analytics and reports
- PDF report generation

### Student Dashboard
- Personal learning progress
- Course performance tracking
- Assessment results
- Grade analytics
- Progress charts and visualizations
- Weak subject identification

### Authentication & Security
- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- CORS protection
- Rate limiting

## Development

### Backend Development
```bash
# Start backend in development mode with auto-reload
npm run dev
```

### Frontend Development
```bash
# Start frontend in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **Backend**: Add new models in `/backend/models/`, controllers in `/backend/controllers/`, and routes in `/backend/routes/`

2. **Frontend**: Add new pages in `/frontend/src/pages/`, components in `/frontend/src/components/`, and update routing in `/frontend/src/App.jsx`

3. **Database**: Mongoose automatically creates collections when models are used

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify MongoDB user permissions

2. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Ensure frontend is running on correct port

3. **JWT Authentication Issues**
   - Verify `JWT_SECRET` is set in backend `.env`
   - Check token expiration time

4. **Docker Issues**
   - Ensure Docker and Docker Compose are installed
   - Check port availability (27017, 5000, 3000)
   - View container logs with `docker-compose logs`

### Reset Database

To reset the database and start fresh:

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (this will delete all data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Production Deployment

### Environment Variables

Update the following in production:

- `JWT_SECRET`: Use a strong, unique secret
- `MONGODB_URI`: Use production MongoDB connection
- `NODE_ENV`: Set to `production`
- `FRONTEND_URL`: Set to your production frontend URL

### Security Considerations

1. Use HTTPS in production
2. Set strong JWT secrets
3. Configure proper CORS origins
4. Use environment-specific MongoDB credentials
5. Enable MongoDB authentication
6. Set up proper firewall rules

### Monitoring

The application includes:
- Request logging
- Error handling
- Health checks
- Performance metrics

## Support

For issues, questions, or contributions:

1. Check this documentation
2. Review the code comments
3. Create an issue in the repository
4. Contact the development team

## License

MIT License - see LICENSE file for details.