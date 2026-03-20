const REQUIRED_FIELDS = ['name', 'email', 'eventType', 'message'];
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_MAX_IPS = 5000;
const ipRequestLog = new Map();

function setCorsHeaders(res) {
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  } else if (process.env.NODE_ENV === 'production') {
    res.setHeader('Access-Control-Allow-Origin', 'null');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
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
  const existing = ipRequestLog.get(ip);

  if (!existing || (now - existing.windowStart) > RATE_LIMIT_WINDOW_MS) {
    ipRequestLog.set(ip, { windowStart: now, count: 1, lastSeen: now });
    return false;
  }

  existing.count += 1;
  existing.lastSeen = now;
  ipRequestLog.set(ip, existing);

  if (ipRequestLog.size > RATE_LIMIT_MAX_IPS) {
    for (const [entryIp, value] of ipRequestLog.entries()) {
      if ((now - value.lastSeen) > RATE_LIMIT_WINDOW_MS) {
        ipRequestLog.delete(entryIp);
      }
    }

    if (ipRequestLog.size > RATE_LIMIT_MAX_IPS) {
      const excess = ipRequestLog.size - RATE_LIMIT_MAX_IPS;
      const entriesByLastSeenAsc = Array.from(ipRequestLog.entries()).sort(
        (a, b) => a[1].lastSeen - b[1].lastSeen
      );

      for (let i = 0; i < excess && i < entriesByLastSeenAsc.length; i += 1) {
        ipRequestLog.delete(entriesByLastSeenAsc[i][0]);
      }
    }
  }

  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function badRequest(res, message) {
  return res.status(400).json({ success: false, message });
}

function sanitize(value) {
  return String(value || '').trim();
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
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  const webhookToken = process.env.CONTACT_WEBHOOK_TOKEN;

  if (process.env.NODE_ENV === 'production' && !allowedOrigin) {
    return res.status(500).json({
      success: false,
      message: 'Server is not configured. Missing CONTACT_ALLOWED_ORIGIN.'
    });
  }

  if (process.env.NODE_ENV === 'production' && !webhookToken) {
    return res.status(500).json({
      success: false,
      message: 'Server is not configured. Missing CONTACT_WEBHOOK_TOKEN.'
    });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(200).json({ success: true, message: "Inquiry submitted! We'll get back to you soon." });
  }

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
    if (!sanitize(data[field])) {
      return badRequest(res, `Missing required field: ${field}`);
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sanitize(data.name),
        email: sanitize(data.email),
        phone: sanitize(data.phone),
        eventType: sanitize(data.eventType),
        date: sanitize(data.date),
        location: sanitize(data.location),
        message: sanitize(data.message),
        submittedAt: sanitize(data.submittedAt) || new Date().toISOString(),
        ...(webhookToken ? { token: webhookToken } : {}),
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
