export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, phone, suburb, services, message, contactPref } = req.body;

  if (!firstName || !email || !phone) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const servicesText = Array.isArray(services) && services.length > 0
    ? services.join(', ')
    : 'Not specified';

  const notificationHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#142740;border-bottom:2px solid #1a5fa8;padding-bottom:8px;">
        New Quote Request
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#5a6272;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Email</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Suburb</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${suburb || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;vertical-align:top;">Services</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${servicesText}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;vertical-align:top;">Message</td><td style="padding:8px 0;color:#1c1c1c;">${message || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Contact via</td><td style="padding:8px 0;font-weight:700;color:#1a5fa8;">${contactPref || 'Not specified'}</td></tr>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#aaa;">Sent from briya.com.au</p>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
      <div style="background:#0b2043;padding:28px 32px;border-radius:10px 10px 0 0;text-align:center;">
        <h1 style="color:#ffffff;font-size:22px;margin:0;letter-spacing:0.04em;">BRIYA EXTERIOR CLEANING</h1>
        <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:6px 0 0;">Gold Coast · Byron Bay · Brisbane</p>
      </div>
      <div style="padding:36px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;">
        <h2 style="color:#142740;font-size:20px;margin:0 0 12px;">Hi ${firstName}, we've received your request!</h2>
        <p style="color:#5a6272;line-height:1.7;margin:0 0 20px;">
          Thank you for reaching out to Briya Exterior Cleaning. We've received your quote request and one of our team members will be in touch with you shortly.
        </p>
        <div style="background:#f4f6f9;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#142740;text-transform:uppercase;letter-spacing:0.06em;">Your request summary</p>
          <p style="margin:4px 0;font-size:14px;color:#1c1c1c;"><strong>Services:</strong> ${servicesText}</p>
          ${suburb ? `<p style="margin:4px 0;font-size:14px;color:#1c1c1c;"><strong>Suburb:</strong> ${suburb}</p>` : ''}
          <p style="margin:4px 0;font-size:14px;color:#1c1c1c;"><strong>Phone:</strong> ${phone}</p>
        </div>
        <p style="color:#5a6272;line-height:1.7;margin:0 0 28px;">
          If you have any urgent questions in the meantime, don't hesitate to call us directly at <a href="tel:0415908436" style="color:#1a5fa8;font-weight:600;">0415 908 436</a> or reply to this email.
        </p>
        <div style="text-align:center;">
          <a href="https://www.briya.com.au" style="display:inline-block;background:#1a5fa8;color:#ffffff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
            Visit Our Website
          </a>
        </div>
        <p style="margin-top:32px;font-size:12px;color:#aaa;text-align:center;">
          © 2026 Briya Exterior Cleaning · <a href="https://www.briya.com.au" style="color:#aaa;">briya.com.au</a>
        </p>
      </div>
    </div>
  `;

  try {
    const headers = {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Send both emails in parallel
    const [notifRes, confirmRes] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: 'Briya - Exterior Cleaning <noreply@briya.com.au>',
          to: ['info@briya.com.au', 'jonathan.rodero.martinez@gmail.com', 'lpalaciosalvero@gmail.com'],
          reply_to: email,
          subject: `New quote request – ${firstName} ${lastName} (${servicesText})`,
          html: notificationHtml,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: 'Briya Exterior Cleaning <noreply@briya.com.au>',
          to: [email],
          subject: 'We received your quote request – Briya Exterior Cleaning',
          html: confirmationHtml,
        }),
      }),
    ]);

    if (!notifRes.ok) {
      const err = await notifRes.json().catch(() => ({}));
      console.error('Notification email error:', err);
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    // Log confirmation result but don't fail if it errors
    if (!confirmRes.ok) {
      const err = await confirmRes.json().catch(() => ({}));
      console.error('Confirmation email error:', err);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
}
