const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');
const { newsletterValidation, handleValidationErrors } = require('../utils/validation');

// POST /api/newsletter
router.post('/', newsletterValidation, handleValidationErrors, async (req, res) => {
  try {
    const formData = req.body;

    // Send notification to admin
    const emailResult = await emailService.sendEmail({
      to: process.env.CONTACT_EMAILS.split(','),
      subject: `New Newsletter Subscription - ${formData.email}`,
      html: emailService.generateNewsletterEmailHTML(formData)
    });

    if (!emailResult.success) {
      console.error('Failed to send newsletter notification:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process newsletter subscription. Please try again.'
      });
    }

    // Send welcome email to subscriber
    const welcomeResult = await emailService.sendEmail({
      to: formData.email,
      subject: 'Welcome to Heartland Boys Home Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
            <h1>Welcome to Our Newsletter</h1>
            <p>Heartland Boys Home</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.name || 'Friend'},</p>
            
            <p>Thank you for subscribing to the Heartland Boys Home newsletter!</p>
            
            <p>You'll receive updates about:</p>
            
            <ul>
              <li>Success stories from our residents</li>
              <li>Program updates and new initiatives</li>
              <li>Volunteer opportunities</li>
              <li>Community events and fundraisers</li>
              <li>Ways to support our mission</li>
            </ul>
            
            <p>We typically send newsletters monthly, and we promise never to spam or share your email address.</p>
            
            <p>Thank you for your interest in supporting youth in our community!</p>
            
            <p>Best regards,<br>
            The Heartland Boys Home Team</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                You can unsubscribe at any time by contacting us at contact@heartlandboyshome.org
              </p>
            </div>
          </div>
        </div>
      `
    });

    res.json({
      success: true,
      message: 'Successfully subscribed to our newsletter! Check your email for a welcome message.',
      welcomeSent: welcomeResult.success
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your subscription. Please try again.'
    });
  }
});

module.exports = router;