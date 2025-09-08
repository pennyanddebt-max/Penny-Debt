# Penny Debt Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Update `.env` file with your actual credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=penny_debt_crm

# Email Configuration for care@pennyanddebt.in
EMAIL_HOST=smtp.gmail.com  # or your email provider's SMTP
EMAIL_PORT=587
EMAIL_USER=care@pennyanddebt.in
EMAIL_PASS=your_app_password  # Generate app password for Gmail

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup
1. Create MySQL database: `penny_debt_crm`
2. Run the SQL schema: `database/schema_updated.sql`
3. Create uploads directory:
```bash
mkdir uploads
mkdir uploads/resumes
```

### 4. Email Setup for care@pennyanddebt.in

#### Option 1: Gmail SMTP (Recommended for testing)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for your account
3. Use these settings in `.env`:
   - EMAIL_HOST=smtp.gmail.com
   - EMAIL_PORT=587
   - EMAIL_USER=care@pennyanddebt.in
   - EMAIL_PASS=your_16_character_app_password

#### Option 2: Custom Domain SMTP
If you have your own email server for pennyanddebt.in:
- EMAIL_HOST=mail.pennyanddebt.in
- EMAIL_PORT=587 (or 465 for SSL)
- EMAIL_USER=care@pennyanddebt.in
- EMAIL_PASS=your_email_password

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### OTP Endpoints
- `POST /api/otp/send-otp` - Send OTP to email
- `POST /api/otp/verify-otp` - Verify OTP

### Lead Endpoints
- `POST /api/leads/submit` - Submit debt relief application
- `GET /api/leads` - Get all applications (for CRM)

### Customer Endpoints
- `POST /api/customers/signup` - Customer registration

### Career Endpoints
- `POST /api/careers` - Submit job application with resume

### Health Check
- `GET /health` - Server health status

## Features

✅ **Email OTP Verification**
- Automated OTP sending from care@pennyanddebt.in
- 5-minute expiry time
- Rate limiting (5 OTPs per 15 minutes)
- Professional email templates

✅ **Form Validation**
- Server-side validation for all forms
- Input sanitization and normalization
- Error handling with detailed messages

✅ **Security**
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Password hashing with bcrypt
- SQL injection prevention

✅ **Database Integration**
- MySQL connection pooling
- Proper indexing for performance
- Foreign key relationships
- Activity logging

## Testing the Setup

1. Start the backend server
2. Test OTP sending: `POST http://localhost:5000/api/otp/send-otp`
3. Check your email for OTP
4. Verify OTP: `POST http://localhost:5000/api/otp/verify-otp`
5. Submit form: `POST http://localhost:5000/api/leads/submit`

The backend is now ready to handle all website forms with email verification!