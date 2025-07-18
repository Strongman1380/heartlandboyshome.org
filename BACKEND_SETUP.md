# Heartland Boys Home Backend Setup Guide

This guide will help you set up and deploy the Node.js backend for handling all forms on the Heartland Boys Home website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual values:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Email Configuration (Gmail SMTP recommended)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@heartlandboyshome.org

# Recipient Email Addresses
CONTACT_EMAILS=edyoung@cox.net,rschroetlin78@gmail.com,prestigepersonnl@aol.com,brandon.hinrichs@aspireimpactnetwork.com,heartland11@windstream.net
REFERRAL_EMAILS=edyoung@cox.net,rschroetlin78@gmail.com,brandon.hinrichs@aspireimpactnetwork.com
VOLUNTEER_EMAILS=prestigepersonnl@aol.com,brandon.hinrichs@aspireimpactnetwork.com
DONATION_EMAILS=edyoung@cox.net,brandon.hinrichs@aspireimpactnetwork.com

# Security
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Gmail App Password Setup

For Gmail SMTP, you'll need to create an App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password in the `EMAIL_PASS` field

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📋 Available Forms & Endpoints

The backend handles the following forms:

### 1. Contact Form (`/api/contact`)
- **File**: `contact.html`
- **Purpose**: General inquiries and contact
- **Recipients**: All staff emails
- **Features**: Auto-confirmation email, urgency levels

### 2. Referral Form (`/api/referral`)
- **File**: `referral.html`
- **Purpose**: Professional referrals for placement
- **Recipients**: Admissions team
- **Features**: Detailed youth information, urgency handling

### 3. Volunteer Application (`/api/volunteer`)
- **File**: `volunteer.html`
- **Purpose**: Volunteer applications
- **Recipients**: Volunteer coordinators
- **Features**: Background check info, skill matching

### 4. Newsletter Signup (`/api/newsletter`)
- **File**: `newsletter.html`
- **Purpose**: Newsletter subscriptions
- **Recipients**: Admin team
- **Features**: Welcome email, interest preferences

### 5. Donation Inquiry (`/api/donation`)
- **File**: `donate.html`
- **Purpose**: Donation inquiries and coordination
- **Recipients**: Donation coordinators
- **Features**: Tax info, pickup/delivery coordination

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Server-side validation for all forms
- **CORS Protection**: Configurable origin restrictions
- **Helmet Security**: Security headers and CSP
- **Email Sanitization**: Prevents email injection attacks

## 🌐 Deployment Options

### Option 1: Traditional VPS/Server

1. Upload files to your server
2. Install Node.js (version 16+)
3. Run `npm install`
4. Configure `.env` file
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name heartland-backend
   pm2 startup
   pm2 save
   ```

### Option 2: Heroku

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Option 4: Netlify Functions (Serverless)

The backend can be adapted for Netlify Functions if you prefer serverless deployment.

## 📧 Email Templates

All forms include professional HTML email templates with:
- Heartland Boys Home branding
- Organized information display
- Responsive design
- Automatic timestamps
- Confirmation emails for users

## 🔧 Customization

### Adding New Forms

1. Create a new route file in `/routes/`
2. Add validation rules in `/utils/validation.js`
3. Create email template in `/utils/emailService.js`
4. Register the route in `server.js`

### Modifying Email Recipients

Update the environment variables:
- `CONTACT_EMAILS`: General contact form
- `REFERRAL_EMAILS`: Referral/admission forms
- `VOLUNTEER_EMAILS`: Volunteer applications
- `DONATION_EMAILS`: Donation inquiries

### Changing Email Templates

Edit the template functions in `/utils/emailService.js`:
- `generateContactEmailHTML()`
- `generateReferralEmailHTML()`
- `generateVolunteerEmailHTML()`
- etc.

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail app password
   - Verify SMTP settings
   - Check firewall/port 587

2. **CORS errors**
   - Update `CORS_ORIGIN` in `.env`
   - Ensure frontend and backend domains match

3. **Rate limiting too strict**
   - Adjust `RATE_LIMIT_MAX_REQUESTS`
   - Modify `RATE_LIMIT_WINDOW_MS`

4. **Form validation errors**
   - Check required fields match frontend
   - Verify validation rules in `/utils/validation.js`

### Logs and Monitoring

The server logs all important events:
- Form submissions
- Email sending status
- Errors and warnings
- Rate limiting events

For production, consider using a logging service like LogDNA or Papertrail.

## 📞 Support

For technical support with the backend setup:
- Email: brandon.hinrichs@aspireimpactnetwork.com
- Check server logs for error details
- Verify environment configuration

## 🔄 Updates and Maintenance

### Regular Tasks
- Monitor email delivery rates
- Review and update rate limits
- Check for security updates
- Backup environment configuration

### Updating Dependencies
```bash
npm audit
npm update
```

### Health Check
The backend includes a health check endpoint at `/api/health` for monitoring.

---

**Note**: This backend is specifically designed for Heartland Boys Home's needs but can be adapted for other organizations with similar requirements.