const REQUIRED_FIELDS = ['name', 'email', 'eventType', 'message'];
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const ipRequestLog = new Map();

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getClientIp(req) {
  const xff = req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip']);
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = ipRequestLog.get(ip) || [];
  const recent = timestamps.filter((ts) => ts > windowStart);
  recent.push(now);
  ipRequestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function badRequest(res, message) {
  return res.status(400).json({ success: false, message });
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
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

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(200).json({ success: true, message: "Inquiry submitted! We'll get back to you soon." });
  }

  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  if (allowedOrigin) {
    const origin = req.headers && req.headers.origin;
    const referer = req.headers && req.headers.referer;
    const originAllowed =
      (typeof origin === 'string' && origin === allowedOrigin) ||
      (typeof referer === 'string' && referer.startsWith(allowedOrigin));

    if (!originAllowed) {
      return res.status(200).json({ success: true, message: "Inquiry submitted! We'll get back to you soon." });
    }
  }

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
