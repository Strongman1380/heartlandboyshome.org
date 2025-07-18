# Vercel Deployment Guide - Heartland Boys Home

## Overview
This website has been converted from a Node.js backend application to a static website with Google Forms integration. All forms now use a single Google Form embedded via iframes. It's perfectly suited for Vercel's static hosting platform.

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
- `vercel.json` - Vercel configuration for routing and optimization

## Deployment Methods

### Method 1: Deploy from GitHub (Recommended)
1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository: `heartlandboyshome`
   - Vercel will automatically detect it as a static site

2. **Configure Project Settings**
   - **Framework Preset**: Other (or leave as detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty (serves from root)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your site
   - You'll get a URL like `https://heartlandboyshome-xyz.vercel.app`

### Method 2: Deploy via Vercel CLI
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from Project Directory**
   ```bash
   cd "/Users/brandonhinrichs/Local Repositories/Heartland Boys Home"
   vercel
   ```

3. **Follow CLI Prompts**
   - Link to existing project or create new one
   - Confirm settings
   - Deploy automatically

### Method 3: Drag and Drop
1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop your project folder
3. Vercel will automatically deploy

## Vercel Configuration

The `vercel.json` file provides:
- Custom 404 page routing
- Security headers
- Caching optimization
- Clean URLs (removes .html extensions)

## Custom Domain Setup (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain (e.g., `heartlandboyshome.org`)

2. **DNS Configuration**
   - Add CNAME record pointing to your Vercel deployment
   - Or use Vercel's nameservers for full DNS management

## Google Form Integration
- All forms use: https://docs.google.com/forms/d/e/1FAIpQLSe5zMM4Cl3oyWTcZXKIX-dzKg_komhGlIqw8ZNw8Q-r5HfmmQ/viewform
- Each page has instructions for users to select the appropriate inquiry type:
  - Contact page: General contact form
  - Referral page: "Referral/Admission" option
  - Volunteer page: "Partnership/Volunteer" option
  - Donate page: "Donation Inquiry" option
  - Newsletter page: Instructions to mention newsletter subscription

## Testing After Deployment

After deployment, verify:
- ✅ All pages load correctly
- ✅ Navigation works properly
- ✅ Google Forms load in iframes
- ✅ Mobile responsiveness
- ✅ 404 page works
- ✅ HTTPS is enabled (automatic with Vercel)

## Automatic Deployments

With GitHub integration:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Rollback capability to previous deployments

## Performance Benefits with Vercel

- **Global CDN**: Automatic worldwide distribution
- **Edge Caching**: Fast loading times globally
- **Automatic HTTPS**: SSL certificates included
- **Compression**: Automatic Gzip/Brotli compression
- **Image Optimization**: Automatic image optimization (if using Vercel's Image component)

## Environment Variables (Not Needed)

Since this is a static site with Google Forms:
- No environment variables required
- No server-side configuration needed
- No database connections

## Support and Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Monitoring**: Built-in performance monitoring
- **Logs**: View deployment and function logs in dashboard

## Making Updates

1. **Code Changes**: Push to GitHub repository
2. **Automatic Deployment**: Vercel deploys automatically
3. **Instant Updates**: Changes go live immediately

The website is now optimized for Vercel's platform with automatic deployments, global CDN, and excellent performance!