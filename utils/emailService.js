const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(options) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: options.to,
        cc: options.cc,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments || []
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  generateContactEmailHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
          <p>Heartland Boys Home</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c41e3a;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Organization:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.organization || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Title:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.title || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Inquiry Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data['inquiry-type']}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Urgency:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.urgency}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Preferred Contact:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data['preferred-contact']}</td>
            </tr>
          </table>
          
          <h3 style="color: #c41e3a; margin-top: 20px;">Message:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #c41e3a; margin: 10px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
              <strong>IP Address:</strong> ${data.ipAddress || 'Not available'}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  generateReferralEmailHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
          <h1>New Referral/Admission Inquiry</h1>
          <p>Heartland Boys Home</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c41e3a;">Referral Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Referring Person:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.referrerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Organization:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.organization}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td>
            </tr>
          </table>
          
          <h3 style="color: #c41e3a; margin-top: 20px;">Youth Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Youth Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.youthName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Age:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.age}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Current Placement:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.currentPlacement}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Urgency:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.urgency}</td>
            </tr>
          </table>
          
          <h3 style="color: #c41e3a; margin-top: 20px;">Background & Needs:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #c41e3a; margin: 10px 0;">
            ${data.background.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  generateVolunteerEmailHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
          <h1>New Volunteer Application</h1>
          <p>Heartland Boys Home</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c41e3a;">Applicant Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Address:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.address}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Volunteer Interest:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.volunteerType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Availability:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.availability}</td>
            </tr>
          </table>
          
          <h3 style="color: #c41e3a; margin-top: 20px;">Experience & Motivation:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #c41e3a; margin: 10px 0;">
            ${data.experience.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  generateNewsletterEmailHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
          <h1>New Newsletter Subscription</h1>
          <p>Heartland Boys Home</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c41e3a;">Subscriber Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Interests:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.interests || 'General updates'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Subscribed:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  generateDonationEmailHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c41e3a; color: white; padding: 20px; text-align: center;">
          <h1>New Donation Inquiry</h1>
          <p>Heartland Boys Home</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c41e3a;">Donor Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Donation Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.donationType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Amount/Value:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.amount || 'Not specified'}</td>
            </tr>
          </table>
          
          <h3 style="color: #c41e3a; margin-top: 20px;">Message:</h3>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #c41e3a; margin: 10px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = new EmailService();