# Google Apps Script template (Sheets + Email + Token + Bot filtering)

Use this script in **Extensions → Apps Script** for your Google Sheet.

## What this version does
- Writes contact submissions to Sheet.
- Sends a notification email to `bookings@beatgurus.org`.
- Verifies a shared secret token (via `token` query parameter or JSON body field).
- Blocks simple bots with honeypot check and content sanity checks.
- Returns JSON (`{ success: true|false, message }`).

## Script

```javascript
const SHEET_NAME = 'Leads';
const BOOKING_EMAIL = 'bookings@beatgurus.org';
const SHARED_TOKEN = 'REPLACE_WITH_LONG_RANDOM_TOKEN';
const MAX_MESSAGE_LENGTH = 3000;

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function safe(value) {
  return String(value || '').trim();
}

function hasUrlSpam(text) {
  const urlRegex = /(https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|io|co|in))/i;
  return urlRegex.test(text || '');
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '{}';
    const data = JSON.parse(raw);

    const headerToken = e && e.parameter ? safe(e.parameter.token) : '';
    const bodyToken = safe(data.token);
    const token = headerToken || bodyToken;
    if (!token || token !== SHARED_TOKEN) {
      return jsonResponse({ success: false, message: 'Unauthorized token.' });
    }

    // Honeypot: if this hidden field has content, silently accept but ignore.
    if (safe(data.website)) {
      return jsonResponse({ success: true, message: 'Submitted.' });
    }

    const payload = {
      name: safe(data.name),
      email: safe(data.email),
      phone: safe(data.phone),
      eventType: safe(data.eventType),
      date: safe(data.date),
      location: safe(data.location),
      message: safe(data.message),
      submittedAt: safe(data.submittedAt) || new Date().toISOString()
    };

    if (!payload.name || !payload.email || !payload.eventType || !payload.message) {
      return jsonResponse({ success: false, message: 'Missing required fields.' });
    }

    if (payload.message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ success: false, message: 'Message too long.' });
    }

    // Optional lightweight bot check: if message is only links, reject.
    if (hasUrlSpam(payload.message) && payload.message.length < 40) {
      return jsonResponse({ success: false, message: 'Rejected as likely spam.' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    sheet.appendRow([
      new Date(),
      payload.name,
      payload.email,
      payload.phone,
      payload.eventType,
      payload.date,
      payload.location,
      payload.message,
      payload.submittedAt
    ]);

    const subject = 'New Beat Gurus Contact Inquiry';
    const body =
      'A new inquiry was received:\n\n' +
      `Name: ${payload.name}\n` +
      `Email: ${payload.email}\n` +
      `Phone: ${payload.phone}\n` +
      `Event Type: ${payload.eventType}\n` +
      `Event Date: ${payload.date}\n` +
      `Location: ${payload.location}\n\n` +
      `Message:\n${payload.message}\n\n` +
      `Submitted At: ${payload.submittedAt}\n`;

    MailApp.sendEmail(BOOKING_EMAIL, subject, body);

    return jsonResponse({ success: true, message: 'Submitted.' });
  } catch (err) {
    return jsonResponse({ success: false, message: String(err) });
  }
}
```

## Deploy
1. **Deploy → New deployment → Web app**.
2. Execute as: **Me**.
3. Access: **Anyone** (or anyone with Google account).
4. Copy `/exec` URL.

## App env vars
- Backend/serverless:
  - `GOOGLE_SHEETS_WEBHOOK_URL=<apps_script_exec_url>`
  - `CONTACT_ALLOWED_ORIGIN=https://your-domain.com`
- Optional token pass-through from your backend to Apps Script:
  - `CONTACT_WEBHOOK_TOKEN=<same as SHARED_TOKEN>`
