# Heartland Boys Home Website

A professional static website for Heartland Boys Home, a residential treatment facility for youth in Geneva, Nebraska. This website provides information about programs, staff, and includes Google Forms integration for all inquiries and applications.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Google Forms Integration**: All forms use embedded Google Forms for easy management
- **Static Website**: No backend required - ready for any hosting service
- **Performance**: Optimized loading with compression and caching
- **Accessibility**: WCAG compliant design with proper semantic HTML
- **Security**: Security headers and best practices via .htaccess

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Forms**: Google Forms embedded via iframes
- **Hosting**: Static files ready for any web hosting service
- **Optimization**: .htaccess for Apache servers (Hostinger compatible)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heartland-boys-home
   ```

2. **Open locally**
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. **Visit the website**
   Open http://localhost:8000 in your browser

## Deployment

This is a static website ready for deployment on any hosting service. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for specific Vercel deployment instructions.

### Deployment Options
- **Vercel**: Deploy directly from Git repository (Recommended)
- **Netlify**: Drag and drop folder or connect to Git
- **GitHub Pages**: Enable Pages in repository settings
- **Hostinger**: Upload files to public_html folder
- **Any shared hosting**: Upload files via FTP/File Manager

## Google Forms Integration

All website forms now use a single Google Form:
- **Form URL**: https://docs.google.com/forms/d/e/1FAIpQLSe5zMM4Cl3oyWTcZXKIX-dzKg_komhGlIqw8ZNw8Q-r5HfmmQ/viewform

### Form Types Handled
- **Contact Form**: General inquiries and contact requests
- **Referral Form**: Professional referrals for youth placement (select "Referral/Admission")
- **Volunteer Form**: Volunteer applications (select "Partnership/Volunteer")
- **Donation Form**: Donation inquiries (select "Donation Inquiry")
- **Newsletter Form**: Newsletter subscription requests (mention in message)

## File Structure

```
heartland-boys-home/
├── index.html              # Homepage
├── about.html              # About page
├── programs.html           # Programs page
├── admissions.html         # Admissions page
├── staff.html              # Staff page
├── contact.html            # Contact page with Google Form
├── referral.html           # Referral page with Google Form
├── volunteer.html          # Volunteer page with Google Form
├── donate.html             # Donation page with Google Form
├── newsletter.html         # Newsletter page with Google Form
├── 404.html                # Custom 404 error page
├── vercel.json             # Vercel configuration
├── .htaccess               # Apache configuration (fallback)
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # Frontend JavaScript
├── images/                 # Website images
└── VERCEL_DEPLOYMENT.md    # Deployment guide
```

## No Backend Required

This website is now completely static:
- ✅ No Node.js server needed
- ✅ No database required
- ✅ No email server configuration
- ✅ No environment variables
- ✅ Works on any hosting service
- ✅ Easy to maintain and update

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Making Changes

1. **Content Updates**: Edit the HTML files directly
2. **Styling Changes**: Modify `css/styles.css`
3. **JavaScript Updates**: Edit `js/script.js`
4. **Images**: Replace files in the `images/` folder
5. **Forms**: Manage responses through Google Forms dashboard

## Google Form Management

- Form responses are collected in Google Forms
- Set up email notifications in Google Forms settings
- Export responses to Google Sheets for analysis
- Customize form questions as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For technical support or questions about the website, please contact the development team or create an issue in the repository.

## Contact Information

**Heartland Boys Home**
- Address: 904 Road P, Geneva, NE
- Phone: (402) 759-4334
- Email: rschroetlin78@gmail.com

---

*Empowering Youth. Restoring Hope. Building Futures.*