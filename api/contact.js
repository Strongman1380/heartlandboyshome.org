const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const LABELS = {
    form_type: null,        // used as email subject prefix, not shown in body
    from_name: 'Name',
    from_email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    agency: 'Agency / Organization',
    contact_name: 'Contact Name',
    contact_email: 'Contact Email',
    contact_phone: 'Contact Phone',
    youth_age: 'Youth Age',
    description: 'Description',
    notes: 'Additional Notes',
    donation_type: 'Donation Type',
    email: 'Email',
    name: 'Name',
};

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body;
    const formType = body.form_type || 'Contact Form';

    // Require at least one email field
    const emailField = body.from_email || body.contact_email || body.email;
    if (!emailField) {
        return res.status(400).json({ error: 'Missing required email field' });
    }

    // Build HTML rows from all submitted fields (excluding form_type)
    const rows = Object.entries(body)
        .filter(([key]) => key !== 'form_type')
        .map(([key, value]) => {
            const label = LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const display = value && value.toString().trim() ? value : '<em style="color:#999">Not provided</em>';
            return `
                <tr>
                    <td style="padding:10px 14px;font-weight:600;white-space:nowrap;border-bottom:1px solid #f0f0f0;color:#555;width:160px;">${label}</td>
                    <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#222;">${display}</td>
                </tr>`;
        })
        .join('');

    const html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#c41e3a,#8b0000);padding:28px 32px;border-radius:10px 10px 0 0;">
                <h2 style="color:#fff;margin:0;font-size:1.4rem;">New ${formType} Submission</h2>
                <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:0.9rem;">Heartland Boys Home — heartlandboyshome.org</p>
            </div>
            <div style="background:#fff;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 10px 10px;padding:8px 0;">
                <table style="width:100%;border-collapse:collapse;">
                    ${rows}
                </table>
            </div>
            <p style="color:#aaa;font-size:0.8rem;text-align:center;margin-top:16px;">
                Submitted via heartlandboyshome.org
            </p>
        </div>`;

    try {
        await resend.emails.send({
            from: 'Heartland Boys Home <onboarding@resend.dev>',
            to: 'rschroetling78@gmail.com',
            replyTo: emailField,
            subject: `New ${formType} from ${body.from_name || body.contact_name || body.name || emailField}`,
            html,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
};
