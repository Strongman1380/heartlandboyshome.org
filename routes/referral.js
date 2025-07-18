const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');
const { referralValidation, handleValidationErrors } = require('../utils/validation');

// POST /api/referral
router.post('/', referralValidation, handleValidationErrors, async (req, res) => {
  try {
    const formData = req.body;

    // Send email to referral team
    const emailResult = await emailService.sendEmail({
      to: process.env.REFERRAL_EMAILS.split(','),
      subject: `URGENT: New Referral - ${formData.youthName} (Age ${formData.age}) - ${formData.urgency}`,
      html: emailService.generateReferralEmailHTML(formData)
    });

    if (!emailResult.success) {
      console.error('Failed to send referral email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send referral. Please try again or contact us directly.'
      });
    }

    // Send confirmation email to referrer
    const confirmationResult = await emailService.sendEmail({
      to: formData.email,
      subject: 'Referral Received - Heartland Boys Home',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
            <h1>Referral Received</h1>
            <p>Heartland Boys Home</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${formData.referrerName},</p>
            
            <p>Thank you for your referral of <strong>${formData.youthName}</strong> to Heartland Boys Home.</p>
            
            <p>We have received your referral and our admissions team will review the information provided. Based on the urgency level you indicated (${formData.urgency}), we will respond accordingly:</p>
            
            <ul>
              <li><strong>Immediate:</strong> Within 2-4 hours</li>
              <li><strong>Within a week:</strong> Within 24 hours</li>
              <li><strong>Within a month:</strong> Within 48 hours</li>
              <li><strong>Planning ahead:</strong> Within 72 hours</li>
            </ul>
            
            <p>Our team will contact you at ${formData.phone} or ${formData.email} to discuss next steps in the referral process.</p>
            
            <p>If you have any immediate questions or need to provide additional information, please call us at <strong>(402) 759-4334</strong>.</p>
            
            <p>Best regards,<br>
            Heartland Boys Home Admissions Team</p>
            
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
      message: 'Referral submitted successfully. Our admissions team will contact you soon.',
      confirmationSent: confirmationResult.success
    });

  } catch (error) {
    console.error('Referral form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your referral. Please try again.'
    });
  }
});

module.exports = router;