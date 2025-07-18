const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');
const { volunteerValidation, handleValidationErrors } = require('../utils/validation');

// POST /api/volunteer
router.post('/', volunteerValidation, handleValidationErrors, async (req, res) => {
  try {
    const formData = req.body;

    // Send email to volunteer coordinator
    const emailResult = await emailService.sendEmail({
      to: process.env.VOLUNTEER_EMAILS.split(','),
      subject: `New Volunteer Application - ${formData.volunteerType} - ${formData.name}`,
      html: emailService.generateVolunteerEmailHTML(formData)
    });

    if (!emailResult.success) {
      console.error('Failed to send volunteer email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send volunteer application. Please try again or contact us directly.'
      });
    }

    // Send confirmation email to volunteer
    const confirmationResult = await emailService.sendEmail({
      to: formData.email,
      subject: 'Volunteer Application Received - Heartland Boys Home',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
            <h1>Thank You for Your Interest in Volunteering</h1>
            <p>Heartland Boys Home</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for your interest in volunteering with Heartland Boys Home! We have received your application for <strong>${formData.volunteerType}</strong> volunteer opportunities.</p>
            
            <p>Our volunteer coordinator will review your application and contact you within 3-5 business days to discuss:</p>
            
            <ul>
              <li>Background check requirements</li>
              <li>Training opportunities</li>
              <li>Scheduling and availability</li>
              <li>Specific volunteer roles that match your interests</li>
            </ul>
            
            <p>We appreciate your willingness to support our youth and make a positive impact in their lives.</p>
            
            <p>If you have any questions in the meantime, please don't hesitate to contact us at <strong>(402) 759-4334</strong>.</p>
            
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
      message: 'Volunteer application submitted successfully. We will contact you soon!',
      confirmationSent: confirmationResult.success
    });

  } catch (error) {
    console.error('Volunteer form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your application. Please try again.'
    });
  }
});

module.exports = router;