# Penny Debt CRM System

Full-stack debt relief CRM application with React frontend, Node.js backend, and MySQL database.

## Features

- 📧 Email OTP verification system
- 💼 Debt relief application processing
- 👥 Customer relationship management
- 🔐 Secure authentication and validation
- 📊 Lead tracking and management

## Tech Stack

- **Frontend**: React.js, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Email**: Nodemailer with SMTP
- **Deployment**: Ready for Vercel/Netlify (Frontend) + Railway/Heroku (Backend)

## Quick Start

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- SMTP email credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd penny-debt-crm
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with database and email credentials
npm run dev
```

3. **Setup Frontend**
```bash
cd crm-frontend
npm install
npm start
```

4. **Database Setup**
```bash
# Import the database schema
mysql -u root -p < database/schema_updated.sql
```

## Environment Configuration

Create `backend/.env` with:
```env
# Database
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=penny_debt_crm

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=care@pennyanddebt.in
SMTP_PASS=your_app_password

# Security
JWT_SECRET=your_jwt_secret
```

## Deployment

### Frontend (Vercel/Netlify)
- Build command: `npm run build`
- Output directory: `build`
- Environment variables: API endpoint

### Backend (Railway/Heroku)
- Deploy from `backend/` directory
- Add environment variables
- Connect MySQL database

## Project Structure

```
penny-debt-crm/
├── crm-frontend/          # React application
├── backend/               # Node.js API server
├── database/              # SQL schema files
└── docs/                  # Documentation
```

## API Endpoints

- `POST /api/send-otp` - Send email OTP
- `POST /api/verify-otp` - Verify OTP
- `POST /api/leads/submit` - Submit debt relief application

## License

MIT License - see LICENSE file for details