# Hostinger Deployment Guide - Heartland Boys Home

## Overview
This website has been converted from a Node.js backend application to a static website with Google Forms integration. All forms now use a single Google Form embedded via iframes.

## Files Ready for Deployment

### Core Website Files
- `index.html` - Homepage
- `about.html` - About page
- `programs.html` - Programs page
- `admissions.html` - Admissions page
- `staff.html` - Staff page
- `contact.html` - Contact page with Google Form
- `referral.html` - Referral page with Google Form
- `volunteer.html` - Volunteer page with Google Form
- `donate.html` - Donation page with Google Form
- `newsletter.html` - Newsletter page with Google Form
- `404.html` - Custom 404 error page

### Assets
- `css/styles.css` - All website styles
- `js/script.js` - Frontend JavaScript (no backend dependencies)
- `images/` - All website images
- `.htaccess` - Apache configuration for optimization and security

## Deployment Steps

### 1. Upload Files to Hostinger
1. Log into your Hostinger control panel
2. Go to File Manager
3. Navigate to the `public_html` folder (or your domain's root folder)
4. Upload all files and folders from this project
5. Ensure the file structure is maintained:
   ```
   public_html/
   ├── index.html
   ├── about.html
   ├── contact.html
   ├── referral.html
   ├── volunteer.html
   ├── donate.html
   ├── newsletter.html
   ├── programs.html
   ├── admissions.html
   ├── staff.html
   ├── 404.html
   ├── .htaccess
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── script.js
   └── images/
       └── (all image files)
   ```

### 2. Verify Google Form Integration
- All forms now use the Google Form: https://docs.google.com/forms/d/e/1FAIpQLSe5zMM4Cl3oyWTcZXKIX-dzKg_komhGlIqw8ZNw8Q-r5HfmmQ/viewform
- Each page has instructions for users to select the appropriate inquiry type:
  - Contact page: General contact form
  - Referral page: "Referral/Admission" option
  - Volunteer page: "Partnership/Volunteer" option
  - Donate page: "Donation Inquiry" option
  - Newsletter page: Instructions to mention newsletter subscription

### 3. Test the Website
After deployment, test:
- All pages load correctly
- Navigation works
- Google Forms load properly in iframes
- Mobile responsiveness
- Contact information is correct

### 4. Optional: SSL Certificate
- Enable SSL certificate in Hostinger control panel for HTTPS
- Uncomment the HTTPS redirect lines in .htaccess if needed

## Google Form Management
- Form responses will go to the Google account that created the form
- You can view responses in Google Forms or set up email notifications
- Consider creating separate forms for different purposes if needed

## No Backend Required
- No Node.js, PHP, or server-side processing needed
- No database required
- No email server configuration needed
- Pure static HTML/CSS/JavaScript website

## Support
If you need to make changes:
- Edit HTML files directly
- Modify CSS in `css/styles.css`
- Update JavaScript in `js/script.js`
- Replace images in the `images/` folder

The website is now ready for deployment on any static hosting service, including Hostinger's shared hosting plans.