// Vercel serverless function: receives revenue-calculator submissions from
// /src/pages/RevenueCalculator.jsx and emails the audit report.
//
// Env vars (set in Vercel project settings):
//   - RESEND_API_KEY    (required to send the report email; otherwise function is a no-op)
//   - SHEET_WEBHOOK_URL (optional — log to a Google Sheet)
//   - SLACK_WEBHOOK_URL (optional — notify Daniel of a new lead)
//   - FROM_EMAIL        (Resend "from" — must be verified)
//
// IMPORTANT: keep all secrets here. The browser-side client only sends inputs/outputs.

const fmt = (n) => '$' + Math.round(Number(n) || 0).toLocaleString();
const pct = (n) => Math.round((Number(n) || 0) * 100) + '%';

const isValidEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let payload = req.body;
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
  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const inputs = payload.inputs || {};
  const outputs = payload.outputs || {};
  const submittedAt = payload.submittedAt || new Date().toISOString();

  const record = {
    email: payload.email,
    submittedAt,
    source: 'revenue_calculator',
    inputs,
    outputs,
  };

  await Promise.allSettled([
    logToSheet(record),
    notifySlack(record),
    sendReportEmail(record),
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
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.warn('[calculator-email] sheet log failed', err);
  }
}

async function notifySlack(record) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    const o = record.outputs || {};
    const i = record.inputs || {};
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New revenue-calculator submission · ${record.email}\nTotal opportunity: ${fmt(o.totalOpportunity)} / yr · Speed-to-lead loss: ${fmt(o.annualRevenueLost)} · Graveyard: ${fmt(o.graveyardValue)}\nLeads/mo ${i.monthlyLeads} · Commission ${fmt(i.avgCommission)} · Close ${pct(i.closeRate)} · Response ${i.responseTimeMin} min`,
      }),
    });
  } catch (err) {
    console.warn('[calculator-email] slack notify failed', err);
  }
}

async function sendReportEmail(record) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || 'ORVN Labs <hello@orvnlabs.com>';
  if (!apiKey) return;

  const o = record.outputs || {};
  const i = record.inputs || {};

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
        subject: `Your ORVN revenue audit — ${fmt(o.totalOpportunity)} annual opportunity`,
        html: buildEmailHtml({ inputs: i, outputs: o }),
      }),
    });
  } catch (err) {
    console.warn('[calculator-email] resend failed', err);
  }
}

function buildEmailHtml({ inputs, outputs }) {
  const inputRow = (k, v) =>
    `<tr><td style="padding:8px 0;color:#475569;font-size:14px;">${k}</td><td style="padding:8px 0;color:#0F172A;font-weight:600;font-family:'JetBrains Mono',monospace;font-size:13px;text-align:right;">${v}</td></tr>`;
  return `
<!DOCTYPE html>
<html><body style="margin:0;background:#F7F8FB;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:24px auto;background:#fff;border:1px solid #E5E8F0;border-radius:14px;overflow:hidden;">
    <div style="background:#5B3FD4;padding:28px;text-align:center;color:#fff;">
      <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;opacity:0.7;font-family:monospace;margin-bottom:6px;">ORVN — Revenue audit</div>
      <div style="font-size:14px;opacity:0.85;margin-bottom:6px;">Conservative annual opportunity</div>
      <div style="font-size:48px;font-family:Georgia,serif;line-height:1;">${fmt(outputs.totalOpportunity)}</div>
    </div>
    <div style="padding:28px;">
      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 22px;">
        The numbers below are based on the inputs you entered. Every assumption tilts conservative, so the real cost is usually higher.
      </p>
      <div style="background:#F7F8FB;border:1px solid #E5E8F0;border-radius:10px;padding:18px;margin-bottom:18px;">
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#94A3B8;font-family:monospace;margin-bottom:10px;">Your inputs</div>
        <table style="width:100%;border-collapse:collapse;">
          ${inputRow('Monthly leads', inputs.monthlyLeads)}
          ${inputRow('Avg commission', fmt(inputs.avgCommission))}
          ${inputRow('Close rate', pct(inputs.closeRate))}
          ${inputRow('Response time', inputs.responseTimeMin + ' min')}
          ${inputs.crmDatabaseSize ? inputRow('CRM database', inputs.crmDatabaseSize.toLocaleString() + ' leads') : ''}
          ${inputs.annualIsaCost ? inputRow('Annual ISA cost', fmt(inputs.annualIsaCost)) : ''}
        </table>
      </div>

      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:18px;text-align:center;margin-bottom:10px;">
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#DC2626;font-family:monospace;margin-bottom:6px;">Annual speed-to-lead loss</div>
        <div style="font-size:32px;color:#DC2626;font-family:Georgia,serif;line-height:1;">${fmt(outputs.annualRevenueLost)}</div>
        <div style="font-size:12px;color:#475569;margin-top:4px;">${pct(outputs.penaltyFactor)} of conversion potential lost before first contact</div>
      </div>

      ${outputs.graveyardValue > 0 ? `
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:10px;padding:18px;text-align:center;margin-bottom:18px;">
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#0D9E6E;font-family:monospace;margin-bottom:6px;">Recoverable graveyard value</div>
        <div style="font-size:32px;color:#0D9E6E;font-family:Georgia,serif;line-height:1;">${fmt(outputs.graveyardValue)}</div>
      </div>
      ` : ''}

      <div style="text-align:center;background:#EEEAFB;border:1px solid #C7BCF5;border-radius:12px;padding:22px;">
        <div style="font-size:18px;color:#0F172A;font-weight:600;margin-bottom:8px;">Run the leakage scorecard while it’s fresh</div>
        <p style="color:#475569;font-size:14px;line-height:1.65;margin:0 0 18px;">Five-minute diagnostic of where the leakage is concentrated, with the most direct fix.</p>
        <a href="https://orvnlabs.com/calculators/leakage" style="display:inline-block;background:#5B3FD4;color:#fff;padding:12px 22px;border-radius:10px;font-weight:600;font-size:14px;text-decoration:none;">Run scorecard →</a>
      </div>
    </div>
    <div style="padding:18px 28px;border-top:1px solid #F1F3F9;text-align:center;color:#94A3B8;font-size:12px;">
      ORVN Labs · hello@orvnlabs.com
    </div>
  </div>
</body></html>
  `;
}
