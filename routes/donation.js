const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');
const { donationValidation, handleValidationErrors } = require('../utils/validation');

// POST /api/donation
router.post('/', donationValidation, handleValidationErrors, async (req, res) => {
  try {
    const formData = req.body;

    // Send email to donation coordinator
    const emailResult = await emailService.sendEmail({
      to: process.env.DONATION_EMAILS.split(','),
      subject: `New Donation Inquiry - ${formData.donationType} - ${formData.name}`,
      html: emailService.generateDonationEmailHTML(formData)
    });

    if (!emailResult.success) {
      console.error('Failed to send donation email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send donation inquiry. Please try again or contact us directly.'
      });
    }

    // Send confirmation email to donor
    const confirmationResult = await emailService.sendEmail({
      to: formData.email,
      subject: 'Donation Inquiry Received - Heartland Boys Home',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
            <h1>Thank You for Your Generous Heart</h1>
            <p>Heartland Boys Home</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for your interest in supporting Heartland Boys Home through your generous donation inquiry!</p>
            
            <p>We have received your inquiry about a <strong>${formData.donationType}</strong> donation, and our team will contact you within 24-48 hours to discuss:</p>
            
            <ul>
              <li>How your donation can best support our youth</li>
              <li>Tax deduction information (if applicable)</li>
              <li>Recognition preferences</li>
              <li>Delivery or pickup arrangements (for goods/services)</li>
            </ul>
            
            <p>Your support makes a direct impact on the lives of the young men in our care, helping them build the skills and confidence they need for successful futures.</p>
            
            <p>If you have any immediate questions, please don't hesitate to contact us at <strong>(402) 759-4334</strong>.</p>
            
            <p>With gratitude,<br>
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
      message: 'Donation inquiry submitted successfully. We will contact you soon to discuss your generous offer!',
      confirmationSent: confirmationResult.success
    });

  } catch (error) {
    console.error('Donation form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your donation inquiry. Please try again.'
    });
  }
});

module.exports = router;