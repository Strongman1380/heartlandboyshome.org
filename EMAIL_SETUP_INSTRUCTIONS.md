# Email Setup Instructions for Contact Form

## 📧 Required Email Recipients

When someone submits the contact form, it should be sent to these 5 email addresses:

1. **edyoung@cox.net**
2. **rschroetlin78@gmail.com** 
3. **prestigepersonnl@aol.com**
4. **brandon.hinrichs@aspireimpactnetwork.com**
5. **heartland11@windstream.net**

## 🚀 Current Status

The contact form currently shows a "Thank You" popup when submitted, but **does not actually send emails yet**. To make it functional, you need to choose one of these options:

### Option 1: Formspree (Recommended - Easiest)

1. **Go to [formspree.io](https://formspree.io)** and create a free account
2. **Create a new form** and get your form endpoint
3. **Update contact.html** - change this line:
   ```html
   <form class="contact-form" id="contact-form">
   ```
   To:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. **Configure in Formspree dashboard:**
   - Set primary recipient email
   - Add other 4 emails as CC recipients
   - Enable notifications

**Cost:** Free for up to 50 submissions/month

### Option 2: EmailJS (Alternative)

1. **Go to [emailjs.com](https://emailjs.com)** and create account
2. **Set up email service** (Gmail, Outlook, etc.)
3. **Create email template** with all 5 recipients
4. **Add EmailJS code** to the website
5. **Update JavaScript** to use EmailJS instead of current popup

**Cost:** Free for up to 200 emails/month

### Option 3: Custom Backend

If you have web hosting with PHP/server capabilities:
1. **Create PHP script** to handle form submission
2. **Configure server email** settings
3. **Update form action** to point to PHP script

## 🎯 What Currently Works

- ✅ **Form validation** (checks required fields, email format)
- ✅ **Professional styling** (matches website theme)
- ✅ **Success popup** (shows "Thank You" message)
- ✅ **Responsive design** (works on all devices)
- ✅ **Form fields** (all necessary contact information)

## 📋 Form Fields Included

- Type of Inquiry (dropdown)
- Full Name (required)
- Organization/Agency
- Title/Position  
- Email Address (required)
- Phone Number
- Urgency Level
- Message (required)
- Preferred Contact Method

## 🔧 Next Steps

1. **Choose your preferred email service** (Formspree recommended)
2. **Set up the service** with your 5 email addresses
3. **Update the form** with the service endpoint
4. **Test the form** to ensure all recipients receive emails

## 📞 Testing Checklist

Once you set up the email service:

- [ ] Submit a test form
- [ ] Verify all 5 email addresses receive the message
- [ ] Check that form validation still works
- [ ] Confirm success popup still appears
- [ ] Test on mobile devices

The form is ready to go - it just needs an email service connected to make it fully functional!