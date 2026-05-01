// Vercel serverless function: receives newsletter signups from /src/components/Newsletter.jsx.
//
// Env vars (set in Vercel project settings, NEVER in client code):
//   - RESEND_API_KEY        (optional — used to send a confirmation email)
//   - SHEET_WEBHOOK_URL     (optional — Apps Script endpoint to log signups)
//   - SLACK_WEBHOOK_URL     (optional — sends a notification to a Slack channel)
//   - FROM_EMAIL            (Resend "from" — must be verified)
//
// All downstream calls are best-effort: if a provider is unset or fails, we still return 200
// to the client so the visitor experience is clean. Failures are logged for backfill.
//
// TODO: persist signups to a real database before launch. Right now, the canonical record is
// whatever is in the Sheet. If SHEET_WEBHOOK_URL is unset, signups are only emailed to Slack.

const SCHEMA = {
  email: 'string',
  role: 'string',
  companyName: 'string',
  leadVolume: 'string',
  source: 'string',
};

const isValidEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let payload = req.body;
  // Vercel parses JSON automatically when content-type is set; fall back if needed.
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ error: 'invalid_json' });
    }
  }
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'missing_body' });
  }

  // Coerce all expected fields to strings, ignore unknowns.
  const clean = Object.fromEntries(
    Object.keys(SCHEMA).map((k) => [k, typeof payload[k] === 'string' ? payload[k].slice(0, 500) : ''])
  );

  if (!isValidEmail(clean.email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const submittedAt = new Date().toISOString();
  const record = { ...clean, submittedAt };

  // Best-effort fanout. Do NOT await with rejection — catch each.
  await Promise.allSettled([
    logToSheet(record),
    notifySlack(record),
    sendConfirmationEmail(record),
  ]);

  return res.status(200).json({ ok: true });
}

async function logToSheet(record) {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'newsletter', ...record }),
    });
  } catch (err) {
    console.warn('[newsletter] sheet log failed', err);
  }
}

async function notifySlack(record) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New First-Contact Intelligence signup: ${record.email}${record.companyName ? ` — ${record.companyName}` : ''}${record.leadVolume ? ` · ${record.leadVolume}` : ''}`,
      }),
    });
  } catch (err) {
    console.warn('[newsletter] slack notify failed', err);
  }
}

async function sendConfirmationEmail(record) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || 'ORVN Labs <hello@orvnlabs.com>';
  if (!apiKey) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [record.email],
        subject: 'You’re in — First-Contact Intelligence',
        html: `
          <p>Welcome to <strong>First-Contact Intelligence</strong>.</p>
          <p>Weekly field notes on how real estate brokerages lose, recover, and convert inbound leads. The first issue will hit your inbox soon.</p>
          <p>If you ever want to opt out, reply with the word <em>stop</em> — that’s it.</p>
          <p style="color:#475569; font-size: 13px; margin-top: 24px;">— ORVN Labs</p>
        `,
      }),
    });
  } catch (err) {
    console.warn('[newsletter] confirmation email failed', err);
  }
}
