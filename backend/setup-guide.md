# Environment Configuration Guide

## Step 1: MySQL Database Setup

1. **Install MySQL** (if not already installed)
2. **Create Database:**
```sql
CREATE DATABASE penny_debt_crm;
```

3. **Update .env file:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=penny_debt_crm
```

## Step 2: Email Configuration for care@pennyanddebt.in

### Option A: Gmail SMTP (Recommended for Testing)

1. **Setup Gmail Account:**
   - Use your Gmail account or create one
   - Enable 2-Factor Authentication
   - Generate App Password:
     - Go to Google Account Settings
     - Security → 2-Step Verification → App passwords
     - Generate password for "Mail"

2. **Update .env file:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Option B: Custom Domain Email (Production)

If you have email hosting for pennyanddebt.in:

```env
EMAIL_HOST=mail.pennyanddebt.in
EMAIL_PORT=587
EMAIL_USER=care@pennyanddebt.in
EMAIL_PASS=your_email_password
```

## Step 3: Complete .env Configuration

Your final `.env` should look like:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=penny_debt_crm

# JWT Secret
JWT_SECRET=PennyDebt2024$SecretKey#CRM@System!9876

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Step 4: Database Schema Setup

Run this SQL in your MySQL database:

```sql
-- Run the complete schema from database/schema_updated.sql
```

## Step 5: Test the Setup

1. **Start the backend:**
```bash
cd backend
npm install
npm run dev
```

2. **Test OTP sending:**
```bash
curl -X POST http://localhost:5000/api/otp/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

3. **Check your email for OTP**

## Common Issues & Solutions

### MySQL Connection Error
- Check if MySQL service is running
- Verify username/password in .env
- Ensure database exists

### Email Not Sending
- Verify Gmail app password (16 characters, no spaces)
- Check if 2FA is enabled on Gmail
- Try with a different email provider

### Port Already in Use
- Change PORT in .env to 5001 or another available port
- Update FRONTEND_URL accordingly

## Security Notes

- Never commit .env file to version control
- Use strong passwords for database
- Generate unique JWT secret for production
- Use environment-specific configurations