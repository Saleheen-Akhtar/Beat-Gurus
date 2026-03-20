const REQUIRED_FIELDS = ['name', 'email', 'eventType', 'message'];

function badRequest(res, message) {
  return res.status(400).json({ success: false, message });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({
      success: false,
      message: 'Server is not configured. Missing GOOGLE_SHEETS_WEBHOOK_URL.'
    });
  }

  const data = req.body || {};

  // Honeypot for simple bot filtering.
  if (data.website) {
    return res.status(200).json({ success: true, message: "Inquiry submitted! We'll get back to you soon." });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!String(data[field] || '').trim()) {
      return badRequest(res, `Missing required field: ${field}`);
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        eventType: data.eventType,
        date: data.date || '',
        location: data.location || '',
        message: data.message,
        submittedAt: data.submittedAt || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: `Webhook upstream error: ${response.status}`
      });
    }

    return res.status(200).json({ success: true, message: "Inquiry submitted! We'll get back to you soon." });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: 'Failed to reach webhook upstream.'
    });
  }
}
