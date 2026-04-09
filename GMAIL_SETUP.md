# 📧 Gmail SMTP Configuration - Step by Step

## ⚠️ YOU MUST DO THIS BEFORE TESTING!

The system needs Gmail credentials to send OTP emails. Follow these exact steps:

## Step 1: Get Gmail App Password

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Sign in** with your Gmail account
3. **Select app:** Choose "Mail"
4. **Select device:** Choose "Windows Computer" or "Other"
5. **Click "Generate"**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

## Step 2: Update Configuration File

1. **Open file:** `backend/src/main/resources/application.properties`

2. **Find these lines:**
```properties
spring.mail.username=${GMAIL_USERNAME:YOUR_GMAIL@gmail.com}
spring.mail.password=${GMAIL_APP_PASSWORD:YOUR_APP_PASSWORD}
```

3. **Replace with YOUR credentials:**
```properties
spring.mail.username=your.email@gmail.com
spring.mail.password=abcdefghijklmnop
```

**EXAMPLE (with real values):**
```properties
spring.mail.username=john.doe@gmail.com
spring.mail.password=xyzw abcd efgh ijkl
```

## Step 3: Save and Restart

1. **Save** the file
2. **Stop** the backend (Ctrl+C)
3. **Restart** the backend:
```bash
cd backend
mvn spring-boot:run
```

## Step 4: Test

1. Go to http://localhost:5173/login
2. Enter: `admin@test.com`
3. Click "Send OTP"
4. **Check YOUR email** (the one you configured)
5. You should receive OTP!

## 🚨 Common Issues

### "App Passwords" option not available?

**Solution 1:** Enable 2-Step Verification first
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Then go back to App Passwords

**Solution 2:** Use "Less secure app access"
1. Go to: https://myaccount.google.com/lesssecureapps
2. Turn ON "Allow less secure apps"
3. Use your regular Gmail password in config

### Still not working?

**Check:**
- Gmail account is active
- Internet connection working
- No typos in email/password
- Removed spaces from app password
- Restarted backend after config change

## 📝 Example Configuration

```properties
# BEFORE (won't work):
spring.mail.username=${GMAIL_USERNAME:YOUR_GMAIL@gmail.com}
spring.mail.password=${GMAIL_APP_PASSWORD:YOUR_APP_PASSWORD}

# AFTER (will work):
spring.mail.username=myemail@gmail.com
spring.mail.password=abcdefghijklmnop
```

## ✅ How to Verify It's Working

Backend logs should show:
```
OTP sent successfully to: admin@test.com
```

If you see:
```
Failed to send OTP: ...
```
Then Gmail is NOT configured correctly!

## 🆘 Need Help?

1. Double-check email and password
2. Try with a different Gmail account
3. Check backend console for detailed error
4. Make sure you're using APP PASSWORD, not regular password
