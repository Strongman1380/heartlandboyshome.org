# Heartland Boys Home Website

A comprehensive, professional website for Heartland Boys Home featuring a red and yellow color scheme and trauma-informed, privacy-conscious content.

## Website Structure

```
/
├── index.html          # Homepage
├── about.html          # About Us page
├── programs.html       # Programs & Services
├── admissions.html     # Admissions & Referrals
├── staff.html          # Our Staff
├── contact.html        # Contact Information
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets folder
└── README.md           # This file
```

## Features

### Design & User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional Color Scheme**: Red (#C41E3A) and yellow (#FFD700) branding
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Modern UI**: Clean, professional design with smooth animations

### Content Sections
- **Homepage**: Hero section, mission, services overview, testimonials
- **About**: Mission, philosophy, credentials, innovation
- **Programs**: Detailed program descriptions, daily schedule, services
- **Admissions**: Referral process, eligibility, emergency placements
- **Staff**: Team profiles, qualifications, professional development
- **Contact**: Contact forms, emergency information, partnership opportunities

### Interactive Features
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Forms**: Professional inquiry forms with validation
- **Smooth Scrolling**: Enhanced user experience
- **Back to Top Button**: Easy navigation
- **Animated Elements**: Scroll-triggered animations

## Adding Images

### Required Images
Place these images in the `/images/` folder:

1. **logo.png** - Heartland Boys Home logo
2. **hero-image.jpg** - Main hero section image (facility or youth activities)
3. **facility-exterior.jpg** - Building exterior
4. **classroom.jpg** - Educational spaces
5. **common-area.jpg** - Living/recreation areas
6. **staff-photos/** - Individual staff photos (optional)

### Image Specifications
- **Logo**: PNG format, transparent background, 200x80px recommended
- **Hero Image**: JPG format, 1200x800px minimum, high quality
- **Other Images**: JPG format, 800x600px minimum

### Adding Images
1. Save images to the `/images/` folder
2. Update image references in HTML files if needed
3. Ensure file names match those referenced in the code

## Customization

### Contact Information
Update placeholder contact information in all files:
- Replace `(XXX) XXX-XXXX` with actual phone numbers
- Replace `contact@heartlandboyshome.org` with actual email
- Add specific address details as appropriate

### Colors
The color scheme is defined in CSS variables at the top of `styles.css`:
```css
:root {
    --primary-red: #C41E3A;
    --secondary-red: #8B0000;
    --primary-yellow: #FFD700;
    --secondary-yellow: #FFA500;
    /* ... other colors */
}
```

### Content Updates
- All content is easily editable in the HTML files
- Staff information can be updated in `staff.html`
- Program details can be modified in `programs.html`
- Contact forms can be customized in `contact.html`

## Technical Features

### Form Handling
- Contact forms include client-side validation
- Forms are ready for backend integration
- Professional inquiry categorization
- Emergency contact prioritization

### SEO Optimization
- Semantic HTML structure
- Meta tags for search engines
- Descriptive page titles
- Alt text for images (when added)

### Performance
- Optimized CSS and JavaScript
- Efficient image loading
- Minimal external dependencies
- Fast loading times

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### Local Testing
1. Open `index.html` in a web browser
2. Test all navigation and forms
3. Verify responsive design on different screen sizes

### Web Hosting
1. Upload all files to your web server
2. Ensure folder structure is maintained
3. Test all links and functionality
4. Set up form handling backend if needed

## Maintenance

### Regular Updates
- Update staff information as needed
- Refresh testimonials periodically
- Keep contact information current
- Add new program information

### Content Guidelines
- Maintain trauma-informed language
- Respect privacy and confidentiality
- Use professional, approachable tone
- Keep information current and accurate

## Support

For technical support or customization needs, contact the development team or refer to the documentation in the code comments.

## License

This website is created specifically for Heartland Boys Home. All rights reserved.