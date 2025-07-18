# Heartland Boys Home - Complete Deployment Guide

## 🎯 Overview

Your Heartland Boys Home website now includes a complete Node.js backend that handles all forms:
- ✅ Contact Form
- ✅ Referral/Admission Form  
- ✅ Volunteer Application
- ✅ Newsletter Signup
- ✅ Donation Inquiry

## 📋 Pre-Deployment Checklist

### 1. Email Configuration
- [ ] Set up Gmail App Password (see instructions below)
- [ ] Update `.env` file with real email credentials
- [ ] Test email sending functionality

### 2. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Configure all email addresses
- [ ] Set production domain for CORS
- [ ] Adjust rate limiting if needed

### 3. Security Review
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Review rate limiting settings
- [ ] Verify CORS configuration
- [ ] Test form validation

## 🚀 Deployment Options

### Option 1: Traditional VPS/Server (Recommended)

#### Requirements:
- Ubuntu/CentOS server with root access
- Node.js 16+ installed
- Domain name pointing to server
- SSL certificate (Let's Encrypt recommended)

#### Steps:

1. **Upload Files**
   ```bash
   # Upload all files to your server
   scp -r * user@yourserver.com:/var/www/heartland/
   ```

2. **Install Dependencies**
   ```bash
   cd /var/www/heartland/
   npm install --production
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your settings
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name heartland-backend
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx (Reverse Proxy)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location /api/ {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       location / {
           root /var/www/heartland;
           index index.html;
           try_files $uri $uri/ =404;
       }
   }
   ```

6. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 2: Heroku (Easy Deployment)

1. **Create Heroku App**
   ```bash
   heroku create heartland-boys-home
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   # ... set all other variables
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. Connect your GitHub repository
2. Configure environment variables in the dashboard
3. Set build command: `npm install`
4. Set run command: `npm start`
5. Deploy automatically

## 📧 Gmail Setup Instructions

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

### Step 2: Create App Password
1. Go to Security → App passwords
2. Select "Mail" as the app
3. Generate password
4. Copy the 16-character password (no spaces)

### Step 3: Update Environment
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd-efgh-ijkl-mnop  # The app password
```

## 🔧 Configuration Details

### Environment Variables Explained

```env
# Server Configuration
PORT=3000                    # Port for the backend server
NODE_ENV=production         # Environment mode

# Email Configuration
EMAIL_HOST=smtp.gmail.com   # SMTP server
EMAIL_PORT=587              # SMTP port
EMAIL_USER=your@gmail.com   # Your Gmail address
EMAIL_PASS=app-password     # Gmail app password
EMAIL_FROM=noreply@domain.com # From address for emails

# Recipients (comma-separated)
CONTACT_EMAILS=email1@domain.com,email2@domain.com
REFERRAL_EMAILS=admissions@domain.com
VOLUNTEER_EMAILS=volunteer@domain.com
DONATION_EMAILS=donations@domain.com

# Security
CORS_ORIGIN=https://yourdomain.com  # Your website domain
RATE_LIMIT_WINDOW_MS=900000         # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100         # Max requests per window
```

### Form URLs After Deployment

- Contact Form: `https://yourdomain.com/contact.html`
- Referral Form: `https://yourdomain.com/referral.html`
- Volunteer Application: `https://yourdomain.com/volunteer.html`
- Newsletter Signup: `https://yourdomain.com/newsletter.html`
- Donation Inquiry: `https://yourdomain.com/donate.html`

## 🧪 Testing Your Deployment

### 1. Health Check
Visit: `https://yourdomain.com/api/health`
Should return: `{"status":"OK","timestamp":"...","environment":"production"}`

### 2. Form Testing
1. Fill out each form with test data
2. Verify emails are received
3. Check confirmation emails are sent
4. Test form validation (try submitting empty forms)

### 3. Rate Limiting Test
Submit forms rapidly to ensure rate limiting works

## 🔍 Monitoring & Maintenance

### Log Monitoring
```bash
# View PM2 logs
pm2 logs heartland-backend

# View specific log lines
pm2 logs heartland-backend --lines 100
```

### Health Monitoring
Set up monitoring for:
- Server uptime
- Email delivery rates
- Form submission rates
- Error rates

### Regular Maintenance
- Monitor email delivery
- Update dependencies monthly
- Review and rotate app passwords annually
- Check SSL certificate renewal

## 🚨 Troubleshooting

### Common Issues

1. **Emails not sending**
   - Verify Gmail app password
   - Check SMTP settings
   - Ensure 2FA is enabled
   - Check server firewall (port 587)

2. **CORS errors**
   - Update `CORS_ORIGIN` to match your domain
   - Include `https://` in the origin

3. **Form submissions failing**
   - Check server logs
   - Verify all required fields
   - Test API endpoints directly

4. **Rate limiting too strict**
   - Adjust `RATE_LIMIT_MAX_REQUESTS`
   - Increase `RATE_LIMIT_WINDOW_MS`

### Debug Commands
```bash
# Check if server is running
pm2 status

# Restart server
pm2 restart heartland-backend

# View detailed logs
pm2 logs heartland-backend --lines 50

# Test email configuration
node -e "require('./utils/emailService.js')"
```

## 📞 Support

For deployment assistance:
- Technical Support: brandon.hinrichs@aspireimpactnetwork.com
- Check logs first for error details
- Include environment details when requesting help

## 🔄 Future Updates

### Adding New Forms
1. Create new route in `/routes/`
2. Add validation in `/utils/validation.js`
3. Create email template in `/utils/emailService.js`
4. Register route in `server.js`
5. Create HTML form page

### Modifying Existing Forms
1. Update HTML form fields
2. Adjust validation rules
3. Modify email templates
4. Test thoroughly

---

**Your website is now ready for production with a complete backend system that handles all forms professionally and securely!**