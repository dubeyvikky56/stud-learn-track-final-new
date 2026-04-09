# 🎓 Student Learning Tracker - OTP Authentication System

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern student learning management system with **passwordless OTP authentication**, role-based access control, and auto-registration.

## ✨ Key Features

### 🔐 Authentication
- **OTP-Only Login** - No passwords needed!
- **Auto-Registration** - New users created automatically
- **Role Selection** - Choose Admin or Student during login
- **Gmail SMTP** - Real email delivery (configurable)
- **Console Fallback** - Test without email setup
- **JWT Tokens** - Secure session management

### 👥 User Roles
- **Admin** - Manage students, courses, assessments, results
- **Student** - View courses, results, progress analytics

### 🎨 Modern UI
- Beautiful gradient design
- Smooth animations
- Mobile responsive
- Role selector with visual feedback
- Real-time OTP verification

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- PostgreSQL 15+ (or H2 for development)

### 1. Clone Repository
```bash
git clone https://github.com/dubeyvikky56/stud-learn-track-final-new.git
cd stud-learn-track-final-new
```

### 2. Start Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### 4. Login
1. Go to: http://localhost:5173/login
2. Enter any email
3. Select role (Admin or Student)
4. Click "Send OTP"
5. Check backend console for OTP
6. Enter OTP and login!

## 📧 Gmail Configuration (Optional)

For real email delivery, configure Gmail SMTP:

1. Get app password: https://myaccount.google.com/apppasswords
2. Edit `backend/src/main/resources/application.properties`:
```properties
spring.mail.username=your_email@gmail.com
spring.mail.password=your_16_char_app_password
```
3. Restart backend

**Without Gmail:** OTP will be printed in backend console for testing!

## 🧪 Testing

### Test Admin Login:
```
Email: admin@test.com (or any new email)
Role: Select "Admin"
OTP: Check backend console
Result: Redirects to /admin/dashboard
```

### Test Student Login:
```
Email: student@test.com (or any new email)
Role: Select "Student"
OTP: Check backend console
Result: Redirects to /student/dashboard
```

### Clear Browser Data:
```javascript
// Open browser console (F12)
localStorage.clear()
// Refresh page
```

## 📁 Project Structure

```
stud-learn-track-final-new/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/tracker/
│   │       ├── controller/     # REST Controllers
│   │       ├── service/        # Business Logic
│   │       ├── model/          # JPA Entities
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── repository/     # Database Access
│   │       └── security/       # JWT & Security
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable Components
│   │   ├── pages/              # Page Components
│   │   ├── hooks/              # Custom Hooks
│   │   └── services/           # API Services
│   ├── package.json
│   └── vite.config.js
│
└── Documentation/
    ├── START_HERE_OTP.md       # Quick start guide
    ├── ROLE_TESTING_GUIDE.md   # Testing instructions
    ├── GMAIL_SETUP.md          # Email configuration
    └── AUTO_REGISTRATION.md    # Auto-registration details
```

## 🔧 Technology Stack

### Backend
- **Spring Boot 3.3.4** - Application framework
- **Spring Security** - Authentication & authorization
- **JWT** - Token-based authentication
- **JPA/Hibernate** - ORM
- **PostgreSQL/H2** - Database
- **JavaMailSender** - Email delivery
- **Caffeine Cache** - OTP storage
- **Lombok** - Boilerplate reduction

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 🎯 Features in Detail

### Auto-Registration
- Any email can login
- Account created automatically
- Name extracted from email
- Role selected during login
- No pre-registration needed

### OTP System
- 6-digit secure code
- 5-minute expiration
- One-time use only
- Caffeine in-memory cache
- Console fallback for testing

### Role-Based Access
- **Admin Dashboard:**
  - Student management
  - Course management
  - Assessment management
  - Result management
  - Reports & analytics

- **Student Dashboard:**
  - View enrolled courses
  - Check results
  - Progress analytics
  - Personal dashboard

## 📊 API Endpoints

### Authentication
```
POST /api/auth/login          # Send OTP / Verify OTP
POST /api/auth/register       # Manual registration
```

### Admin Endpoints
```
GET    /api/students          # List all students
POST   /api/students          # Create student
PUT    /api/students/{id}     # Update student
DELETE /api/students/{id}     # Delete student

GET    /api/courses           # List courses
POST   /api/courses           # Create course

GET    /api/assessments       # List assessments
POST   /api/assessments       # Create assessment

GET    /api/results           # List results
POST   /api/results           # Create result

GET    /api/reports/performance/{studentId}  # Student report
```

### Student Endpoints
```
GET /api/results/student/{studentId}  # My results
```

## 🔒 Security Features

- JWT token authentication
- Role-based authorization
- OTP email verification
- Secure password hashing (for manual registration)
- CORS configuration
- Input validation
- SQL injection prevention

## 📝 Environment Variables

### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5433/student_tracker
spring.datasource.username=postgres
spring.datasource.password=your_password

# JWT
jwt.secret=your_secret_key
jwt.expiration=86400000

# Gmail (Optional)
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 🐛 Troubleshooting

### OTP Not Received
- Check backend console for OTP
- Verify Gmail configuration
- Check spam folder
- Ensure internet connection

### Wrong Dashboard
- Clear localStorage: `localStorage.clear()`
- Use new email for testing
- Check browser console for role
- Verify backend logs

### Backend Won't Start
- Check Java version: `java -version`
- Run: `mvn clean install`
- Check port 8080 is free
- Verify database connection

### Frontend Won't Start
- Check Node version: `node -v`
- Run: `npm install`
- Check port 5173 is free
- Clear npm cache: `npm cache clean --force`

## 📚 Documentation

- **START_HERE_OTP.md** - Quick start guide
- **ROLE_TESTING_GUIDE.md** - Testing instructions
- **GMAIL_SETUP.md** - Email configuration
- **AUTO_REGISTRATION.md** - Auto-registration details
- **ROLE_SELECTION.md** - Role selection feature
- **TESTING_GUIDE.md** - Comprehensive testing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vikky Dubey**
- GitHub: [@dubeyvikky56](https://github.com/dubeyvikky56)

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- React team for the powerful UI library
- All contributors and testers

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation files
- Review troubleshooting section

---

**⭐ Star this repo if you find it helpful!**

**🔗 Repository:** https://github.com/dubeyvikky56/stud-learn-track-final-new
