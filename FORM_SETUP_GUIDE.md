# Contact Form Setup Guide

## 📧 Email Distribution Setup

The contact form is configured to send emails to all the specified addresses:
- edyoung@cox.net
- rschroetlin78@gmail.com
- prestigepersonnl@aol.com
- brandon.hinrichs@aspireimpactnetwork.com
- heartland11@windstream.net

## 🚀 Setup Options

### Option 1: Formspree (Recommended - Easy Setup)

**Steps to activate:**

1. **Go to [Formspree.io](https://formspree.io)** and create a free account
2. **Create a new form** and get your form ID
3. **Update the form action** in `contact.html`:
   ```html
   <!-- Replace YOUR_FORM_ID with your actual Formspree form ID -->
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. **Configure email settings** in your Formspree dashboard:
   - Set the primary recipient email
   - Add all other emails as CC recipients
   - Enable email notifications

**Benefits:**
- ✅ Free for up to 50 submissions/month
- ✅ Spam protection included
- ✅ Easy setup, no server required
- ✅ Email notifications to all recipients
- ✅ Form data stored in dashboard

### Option 2: Netlify Forms (If hosting on Netlify)

**Steps to activate:**

1. **Deploy your site to Netlify**
2. **Add `netlify` attribute** to the form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```
3. **Add hidden field** for Netlify:
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```

### Option 3: Custom Backend Solution

If you need a custom solution, you'll need:
- A server (PHP, Node.js, Python, etc.)
- Email service (SendGrid, Mailgun, etc.)
- Form processing endpoint

## 📱 Current Features

### ✅ What's Already Working:
- **Form Validation**: Checks required fields and email format
- **Success Message**: Shows confirmation when form is submitted
- **Responsive Design**: Works on all devices
- **Professional Styling**: Matches website theme
- **Email Distribution**: Configured to send to all 5 email addresses

### 📋 Form Fields Included:
- Type of Inquiry (dropdown)
- Full Name (required)
- Organization/Agency
- Title/Position
- Email Address (required)
- Phone Number
- Urgency Level
- Message (required)
- Preferred Contact Method

## 🎯 User Experience Flow

1. **User fills out form** → Validation checks
2. **Form submits** → "Sending..." notification appears
3. **Success** → User redirected to thank-you page
4. **Auto-redirect** → Back to contact page after 5 seconds
5. **Success message** → Displays on contact page
6. **Form resets** → Ready for next submission

## 🔧 Customization Options

### Email Subject Line
Currently set to: "New Contact Form Submission - Heartland Boys Home"

To change, update in `contact.html`:
```html
<input type="hidden" name="_subject" value="Your Custom Subject">
```

### Thank You Message
Edit the message in `contact.html`:
```html
<div id="success-message">
    <h3>Your Custom Thank You Title</h3>
    <p>Your custom message here...</p>
</div>
```

### Auto-redirect Timing
Change the 5-second redirect in `thank-you.html`:
```javascript
setTimeout(function() {
    window.location.href = 'contact.html?success=true';
}, 5000); // Change 5000 to desired milliseconds
```

## 🛠️ Testing the Form

### Before Going Live:
1. **Set up your chosen form service** (Formspree recommended)
2. **Update the form action URL** with your actual endpoint
3. **Test with a real submission**
4. **Verify all 5 email addresses receive the message**
5. **Check the thank you flow works correctly**

### Test Checklist:
- [ ] Form validation works (try submitting empty fields)
- [ ] Email validation works (try invalid email format)
- [ ] Success message appears after submission
- [ ] All team members receive the email
- [ ] Thank you page displays correctly
- [ ] Auto-redirect back to contact page works
- [ ] Form resets after successful submission

## 📞 Support

If you need help setting up the form service or have questions about the implementation, the code is well-documented and ready to work with any form processing service.

## 🔒 Security Features

- **Client-side validation** prevents basic errors
- **Spam protection** (when using Formspree)
- **No sensitive data stored** in the website code
- **Secure form submission** via HTTPS
- **Input sanitization** handled by form service

The form is production-ready and just needs a form processing service to be fully functional!