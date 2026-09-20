export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, phone, suburb, services, message } = req.body;

  if (!firstName || !email || !phone) {
    return res.status(400).json({ error: 'Por favor completa los campos obligatorios.' });
  }

  const servicesText = Array.isArray(services) && services.length > 0
    ? services.join(', ')
    : 'No especificado';

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#142740;border-bottom:2px solid #1a5fa8;padding-bottom:8px;">
        Nueva Solicitud de Presupuesto
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#5a6272;width:140px;">Nombre</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Email</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Teléfono</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;">Suburb</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${suburb || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;vertical-align:top;">Servicios</td><td style="padding:8px 0;font-weight:600;color:#1c1c1c;">${servicesText}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6272;vertical-align:top;">Mensaje</td><td style="padding:8px 0;color:#1c1c1c;">${message || '—'}</td></tr>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#aaa;">Enviado desde briya.com.au</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Briya Website <noreply@briya.com.au>',
        to: ['info@briya.com.au'],
        reply_to: email,
        subject: `Nuevo presupuesto – ${firstName} ${lastName} (${servicesText})`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Error al enviar el email.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Error del servidor.' });
  }
}
