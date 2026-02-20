const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { from_name, from_email, phone, subject, message } = req.body;

    if (!from_name || !from_email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await resend.emails.send({
            from: 'Heartland Boys Home <onboarding@resend.dev>',
            to: 'rschroetlin78@gmail.com',
            replyTo: from_email,
            subject: `New Inquiry: ${subject} from ${from_name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
                        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${from_name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
                        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${from_email}">${from_email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
                        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Subject</td>
                        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${subject}</td>
                    </tr>
                </table>
                <h3 style="margin-top: 20px;">Message</h3>
                <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
            `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
};
