# reCAPTCHA Setup Guide for Heartland Boys Home Staff Login

## Overview
reCAPTCHA has been implemented on the staff login page (`training.html`) to prevent bot attacks and unauthorized access attempts. This guide will help you complete the setup.

## What's Already Implemented

✅ **Frontend Integration Complete:**
- reCAPTCHA v2 widgets added to both login and signup forms
- JavaScript validation to prevent form submission without reCAPTCHA completion
- Responsive styling and user-friendly error messages
- Privacy policy links as required by Google

## Required Setup Steps

### 1. Get Google reCAPTCHA Keys

1. **Visit Google reCAPTCHA Admin Console:**
   - Go to: https://www.google.com/recaptcha/admin/create

2. **Create a New Site:**
   - **Label:** `Heartland Boys Home Staff Portal`
   - **reCAPTCHA Type:** Choose `reCAPTCHA v2` → `"I'm not a robot" Checkbox`
   - **Domains:** Add your domains:
     - `heartlandboyshome.org`
     - `heartlandboyshome-org.vercel.app`
     - `localhost` (for testing)

3. **Get Your Keys:**
   - **Site Key:** Used in the frontend (public)
   - **Secret Key:** Used for backend verification (private)

### 2. Update the Frontend Code

Replace the placeholder site key in `training.html`:

**Find this line (around line 27):**
```html
<script src="https://www.google.com/recaptcha/api.js?render=6LfYourSiteKeyHere"></script>
```

**Replace with your actual site key:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_ACTUAL_SITE_KEY"></script>
```

**Also update line 1232:**
```javascript
const RECAPTCHA_SITE_KEY = 'YOUR_ACTUAL_SITE_KEY';
```

### 3. Backend Verification (Recommended)

Currently, the implementation only checks if a reCAPTCHA token exists. For production security, you should verify the token on your backend:

**Example backend verification (Node.js/Express):**
```javascript
const axios = require('axios');

async function verifyRecaptcha(token) {
    const secretKey = 'YOUR_SECRET_KEY';
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    try {
        const response = await axios.post(verifyURL);
        return response.data.success;
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return false;
    }
}
```

### 4. Testing

1. **Test the forms:**
   - Try submitting without completing reCAPTCHA (should be blocked)
   - Complete reCAPTCHA and submit (should work)
   - Test on different devices and browsers

2. **Monitor reCAPTCHA Analytics:**
   - Check the Google reCAPTCHA admin console for usage statistics
   - Monitor for any suspicious activity

## Security Features Implemented

- ✅ **Form Protection:** Both login and signup forms require reCAPTCHA completion
- ✅ **Token Validation:** JavaScript checks for valid reCAPTCHA response
- ✅ **Reset on Error:** reCAPTCHA resets after failed attempts
- ✅ **User Feedback:** Clear error messages guide users
- ✅ **Privacy Compliance:** Google Privacy Policy and Terms links included

## Current Limitations

⚠️ **Frontend-Only Verification:** The current implementation only validates that a reCAPTCHA token exists, not that it's valid. For full security, implement backend verification.

⚠️ **Placeholder Keys:** You must replace the placeholder keys with your actual Google reCAPTCHA keys.

## Next Steps

1. **Get your reCAPTCHA keys** from Google
2. **Update the site key** in the code
3. **Test thoroughly** on your live site
4. **Consider backend verification** for enhanced security
5. **Monitor usage** through Google's admin console

## Support

If you need help with:
- Getting reCAPTCHA keys
- Backend implementation
- Testing or troubleshooting

Please let me know and I can provide additional assistance.

---

**File Location:** `/training.html` (Staff Portal page)
**Implementation Date:** $(date)
**Status:** Ready for key configuration and testing