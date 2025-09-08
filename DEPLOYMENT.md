# Deployment Guide - pennyanddebt.in

## Domain Configuration

**Primary Domain**: `pennyanddebt.in`
**Subdomains**:
- `www.pennyanddebt.in` - Main website
- `api.pennyanddebt.in` - Backend API
- `admin.pennyanddebt.in` - CRM Dashboard (optional)

## Deployment Architecture

### Frontend (Vercel - Recommended)
- **URL**: `https://pennyanddebt.in`
- **Build**: React production build
- **CDN**: Global edge network

### Backend (Railway - Recommended)  
- **URL**: `https://api.pennyanddebt.in`
- **Database**: Railway MySQL
- **Email**: Custom domain SMTP

## Quick Deploy Steps

### 1. Frontend Deployment (Vercel)
```bash
# Connect GitHub repo to Vercel
# Set custom domain: pennyanddebt.in
# Environment variables:
REACT_APP_API_URL=https://api.pennyanddebt.in
```

### 2. Backend Deployment (Railway)
```bash
# Deploy backend to Railway
# Set custom domain: api.pennyanddebt.in
# Environment variables in Railway dashboard
```

### 3. DNS Configuration
```
# Add these DNS records to your domain provider:
A     @           76.76.19.19        (Vercel)
CNAME www         pennyanddebt.in
CNAME api         railway-production-url
```

### 4. SSL Certificates
- Vercel: Auto SSL for main domain
- Railway: Auto SSL for API subdomain

## Environment Variables

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.pennyanddebt.in
REACT_APP_DOMAIN=pennyanddebt.in
```

### Backend (Railway)
```env
DB_HOST=railway-mysql-host
DB_USER=root
DB_PASSWORD=railway-generated-password
DB_NAME=penny_debt_crm

SMTP_HOST=mail.pennyanddebt.in
SMTP_PORT=587
SMTP_USER=care@pennyanddebt.in
SMTP_PASS=your_email_password

FRONTEND_URL=https://pennyanddebt.in
CORS_ORIGIN=https://pennyanddebt.in

JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

## Email Setup (Custom Domain)

### Option 1: Google Workspace
- Setup: `care@pennyanddebt.in`
- SMTP: `smtp.gmail.com:587`
- Use App Password for authentication

### Option 2: Zoho Mail (Free)
- Setup: `care@pennyanddebt.in` 
- SMTP: `smtp.zoho.in:587`
- Professional email solution

## Production Checklist

✅ Domain DNS configured
✅ SSL certificates active  
✅ Environment variables set
✅ Database schema imported
✅ Email SMTP configured
✅ CORS origins updated
✅ Error monitoring setup

## Monitoring & Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Railway Logs**: Backend error tracking
- **Google Analytics**: Website traffic (optional)

## Backup Strategy

- **Database**: Railway auto-backups
- **Code**: GitHub repository
- **Environment**: Documented configurations

## Cost Estimate

- **Vercel Pro**: $20/month (custom domain + analytics)
- **Railway**: $5-20/month (based on usage)
- **Domain**: $10-15/year
- **Email**: Free (Zoho) or $6/user/month (Google)

**Total**: ~$30-50/month for professional setup