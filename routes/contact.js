const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');
const { contactValidation, handleValidationErrors } = require('../utils/validation');

// POST /api/contact
router.post('/', contactValidation, handleValidationErrors, async (req, res) => {
  try {
    const formData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // Send email to staff
    const emailResult = await emailService.sendEmail({
      to: process.env.CONTACT_EMAILS.split(','),
      subject: `New Contact Form Submission - ${formData['inquiry-type']} - ${formData.urgency}`,
      html: emailService.generateContactEmailHTML(formData)
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again or contact us directly.'
      });
    }

    // Send confirmation email to user
    const confirmationResult = await emailService.sendEmail({
      to: formData.email,
      subject: 'Thank you for contacting Heartland Boys Home',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
            <h1>Thank You for Your Message</h1>
            <p>Heartland Boys Home</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for contacting Heartland Boys Home. We have received your ${formData['inquiry-type']} inquiry and will respond within the timeframe you requested (${formData.urgency}).</p>
            
            <p>Our team will review your message and get back to you via your preferred contact method: ${formData['preferred-contact']}.</p>
            
            <p>If you have any urgent questions, please don't hesitate to call us at <strong>(402) 759-4334</strong>.</p>
            
            <p>Best regards,<br>
            The Heartland Boys Home Team</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `
    });

    res.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      confirmationSent: confirmationResult.success
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again.'
    });
  }
});

module.exports = router;