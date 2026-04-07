# 🚀 Complete Deployment Guide - EduTrack

## Deployment Options

### Option 1: Docker Deployment (Recommended) ⭐
### Option 2: Cloud Deployment (AWS/Azure/GCP)
### Option 3: Traditional Server Deployment
### Option 4: Free Hosting (Render/Railway)

---

## 📦 Option 1: Docker Deployment (Easiest)

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Step 1: Create Docker Files

Already exists: `docker-compose.yml` in root directory

### Step 2: Build and Deploy

```bash
# Navigate to project root
cd d:\student-learning-tracker

# Build and start all services
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Database**: localhost:5432

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Data
```bash
docker-compose down -v
```

---

## ☁️ Option 2: Cloud Deployment - AWS

### A. Deploy Backend (Spring Boot) on AWS Elastic Beanstalk

#### Step 1: Package Backend
```bash
cd student-tracker
mvn clean package -DskipTests
```

This creates: `target/student-tracker-0.0.1-SNAPSHOT.jar`

#### Step 2: Create AWS Account
1. Go to https://aws.amazon.com
2. Create free tier account

#### Step 3: Setup RDS (PostgreSQL Database)
1. Go to AWS RDS Console
2. Click "Create database"
3. Choose PostgreSQL
4. Select Free tier
5. Set:
   - DB instance: `student-tracker-db`
   - Master username: `postgres`
   - Master password: `YourSecurePassword123`
   - Database name: `student_tracker`
6. Note the endpoint URL

#### Step 4: Deploy to Elastic Beanstalk
1. Go to Elastic Beanstalk Console
2. Click "Create Application"
3. Application name: `student-tracker`
4. Platform: Java 17
5. Upload `student-tracker-0.0.1-SNAPSHOT.jar`
6. Configure environment variables:
   ```
   SPRING_DATASOURCE_URL=jdbc:postgresql://your-rds-endpoint:5432/student_tracker
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=YourSecurePassword123
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   SERVER_PORT=5000
   ```
7. Click "Create environment"

#### Step 5: Configure Security Group
1. Go to EC2 Console
2. Find your Elastic Beanstalk security group
3. Add inbound rule: Port 5000 from anywhere

### B. Deploy Frontend (React) on AWS S3 + CloudFront

#### Step 1: Build Frontend
```bash
cd frontend

# Update API URL in .env.production
echo VITE_API_URL=https://your-backend-url.elasticbeanstalk.com/api > .env.production

# Build
npm run build
```

#### Step 2: Create S3 Bucket
1. Go to S3 Console
2. Create bucket: `student-tracker-frontend`
3. Enable static website hosting
4. Upload `dist` folder contents

#### Step 3: Setup CloudFront (Optional - for HTTPS)
1. Go to CloudFront Console
2. Create distribution
3. Origin: Your S3 bucket
4. Default root object: `index.html`

#### Step 4: Configure CORS on Backend
Update `application.properties`:
```properties
spring.web.cors.allowed-origins=https://your-cloudfront-url.cloudfront.net
```

---

## ☁️ Option 3: Cloud Deployment - Render (Free Tier)

### A. Deploy Database on Render

1. Go to https://render.com
2. Sign up for free account
3. Click "New +" → "PostgreSQL"
4. Name: `student-tracker-db`
5. Database: `student_tracker`
6. User: `postgres`
7. Note the connection details

### B. Deploy Backend on Render

1. Push code to GitHub (if not already)
2. On Render Dashboard, click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   ```
   Name: student-tracker-backend
   Environment: Java
   Build Command: mvn clean package -DskipTests
   Start Command: java -jar target/student-tracker-0.0.1-SNAPSHOT.jar
   ```
5. Add Environment Variables:
   ```
   SPRING_DATASOURCE_URL=<your-render-postgres-url>
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=<your-db-password>
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   SERVER_PORT=8080
   SPRING_FLYWAY_ENABLED=true
   ```
6. Click "Create Web Service"

### C. Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   ```
   Name: student-tracker-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/dist
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL=https://student-tracker-backend.onrender.com/api
   ```
5. Click "Create Static Site"

---

## 🖥️ Option 4: Traditional Server Deployment (VPS)

### Prerequisites
- Ubuntu 20.04+ VPS (DigitalOcean, Linode, etc.)
- Domain name (optional)

### Step 1: Setup Server

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Java 17
apt install openjdk-17-jdk -y

# Install PostgreSQL
apt install postgresql postgresql-contrib -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install nodejs -y

# Install Nginx
apt install nginx -y
```

### Step 2: Setup Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE student_tracker;
CREATE USER tracker_user WITH PASSWORD 'SecurePassword123';
GRANT ALL PRIVILEGES ON DATABASE student_tracker TO tracker_user;
\q
```

### Step 3: Deploy Backend

```bash
# Create app directory
mkdir -p /opt/student-tracker
cd /opt/student-tracker

# Upload your JAR file (use SCP or SFTP)
# From your local machine:
scp student-tracker/target/student-tracker-0.0.1-SNAPSHOT.jar root@your-server-ip:/opt/student-tracker/

# Create application.properties
cat > application.properties << EOF
spring.datasource.url=jdbc:postgresql://localhost:5432/student_tracker
spring.datasource.username=tracker_user
spring.datasource.password=SecurePassword123
server.port=8080
jwt.secret=your-super-secret-jwt-key-min-32-chars
spring.flyway.enabled=true
EOF

# Create systemd service
cat > /etc/systemd/system/student-tracker.service << EOF
[Unit]
Description=Student Tracker Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/student-tracker
ExecStart=/usr/bin/java -jar student-tracker-0.0.1-SNAPSHOT.jar --spring.config.location=application.properties
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start service
systemctl daemon-reload
systemctl start student-tracker
systemctl enable student-tracker
systemctl status student-tracker
```

### Step 4: Deploy Frontend

```bash
# Build frontend locally
cd frontend
npm run build

# Upload to server (from local machine)
scp -r dist/* root@your-server-ip:/var/www/student-tracker/

# Configure Nginx
cat > /etc/nginx/sites-available/student-tracker << EOF
server {
    listen 80;
    server_name your-domain.com;  # or server IP

    root /var/www/student-tracker;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/student-tracker /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 5: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

---

## 🔒 Security Checklist Before Deployment

### Backend Security

1. **Change JWT Secret**
   ```properties
   jwt.secret=CHANGE-THIS-TO-A-VERY-LONG-RANDOM-STRING-MIN-32-CHARS
   ```

2. **Use Strong Database Password**
   ```properties
   spring.datasource.password=VeryStrongPassword123!@#
   ```

3. **Disable Debug Logging**
   ```properties
   logging.level.com.tracker=INFO
   spring.jpa.show-sql=false
   ```

4. **Enable HTTPS Only**
   ```properties
   server.ssl.enabled=true
   ```

5. **Update CORS Origins**
   ```properties
   spring.web.cors.allowed-origins=https://your-production-domain.com
   ```

### Frontend Security

1. **Update API URL**
   ```javascript
   // In .env.production
   VITE_API_URL=https://your-backend-domain.com/api
   ```

2. **Remove Console Logs**
   - Remove all `console.log()` statements

3. **Enable Production Build**
   ```bash
   npm run build
   ```

---

## 📊 Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend is accessible
- [ ] Database connection works
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] CORS is properly configured
- [ ] SSL certificate is installed
- [ ] Backups are configured
- [ ] Monitoring is setup

---

## 🔧 Useful Commands

### Check Backend Status
```bash
# On server
systemctl status student-tracker
journalctl -u student-tracker -f
```

### Check Database
```bash
sudo -u postgres psql -d student_tracker -c "SELECT COUNT(*) FROM users;"
```

### Restart Services
```bash
systemctl restart student-tracker
systemctl restart nginx
```

### View Logs
```bash
# Backend logs
journalctl -u student-tracker -n 100

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 💰 Cost Estimates

### Free Tier Options
- **Render**: Free (with limitations)
- **Railway**: $5/month credit free
- **Vercel**: Free for frontend
- **Supabase**: Free PostgreSQL

### Paid Options
- **AWS**: ~$20-50/month
- **DigitalOcean**: $6-12/month (VPS)
- **Heroku**: ~$16/month

---

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check logs
journalctl -u student-tracker -n 50

# Common issues:
# - Database connection failed
# - Port already in use
# - Missing environment variables
```

### Frontend Shows Blank Page
```bash
# Check browser console (F12)
# Common issues:
# - Wrong API URL
# - CORS errors
# - Build errors
```

### Database Connection Failed
```bash
# Test connection
psql -h localhost -U tracker_user -d student_tracker

# Check PostgreSQL is running
systemctl status postgresql
```

---

## 📚 Additional Resources

- [Spring Boot Deployment Guide](https://spring.io/guides/gs/spring-boot/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Docker Documentation](https://docs.docker.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Choose the deployment option that best fits your needs and budget!** 🚀

For beginners, I recommend starting with **Render (Free Tier)** or **Docker on local server**.
