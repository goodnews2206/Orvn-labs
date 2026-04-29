import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────
const SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyzeChfTRMIcLlRn3MBEiH1znBEVTVDEcISZc8S1SH_fhatv1mHDBDN8ckuTocFqCqz/exec';
const RESEND_API_KEY = 're_VeJmdJBw_25cUcj1LG5htJnAQSaDJpJUC';
const SLACK_WEBHOOK  = 'PASTE_SLACK_WEBHOOK_URL_HERE'; // 🔌 Add when ready
const FROM_EMAIL     = 'Daniel @ ORVN Labs <daniel@orvnlabs.com>';

const RED    = '#DC2626';
const AMBER  = '#D97706';
const GREEN  = '#0D9E6E';
const PURPLE = '#5B3FD4';
const MONO   = "'JetBrains Mono', monospace";
const SERIF  = "'Instrument Serif', serif";
const SANS   = "'Inter', sans-serif";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fm  = n => '$' + Math.round(n).toLocaleString();
const pct = n => (n * 100).toFixed(0) + '%';

const getP = rt => {
  if (rt <= 5)   return 0;
  if (rt <= 30)  return 0.40;
  if (rt <= 60)  return 0.60;
  if (rt <= 240) return 0.72;
  return 0.82;
};

const formatResp = v => {
  if (v <= 60)  return v + ' min';
  return (v / 60).toFixed(1) + ' hrs';
};

const pctLabel = p => ({
  0:    'top 10%',
  0.40: 'bottom 30%',
  0.60: 'bottom 20%',
  0.72: 'bottom 12%',
  0.82: 'bottom 5%',
}[p] ?? 'bottom 30%');

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimCounter({ target, prefix = '', suffix = '', duration = 1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <>{prefix}{val.toLocaleString()}{suffix}</>;
}

// ─── Step-by-step math row ────────────────────────────────────────────────────
const MathRow = ({ label, value, color, bold, border }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0',
    borderBottom: border !== false ? '1px solid #F1F3F9' : 'none',
    borderTop: bold ? '1px solid #E2E6F0' : 'none',
    marginTop: bold ? 4 : 0,
  }}>
    <span style={{ fontSize: 13, color: bold ? '#1A1A2E' : '#5A6480', fontWeight: bold ? 600 : 400 }}>{label}</span>
    <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: bold ? 700 : 500, color: color || (bold ? '#1A1A2E' : '#5A6480') }}>
      {value}
    </span>
  </div>
);

// ─── Audit panel ─────────────────────────────────────────────────────────────
const AuditPanel = ({ number, title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, background: '#FAFBFD', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: open ? '1px solid #E2E6F0' : 'none' }}
      >
        <div style={{ width: 28, height: 28, borderRadius: 8, background: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>
          {number}
        </div>
        <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: PURPLE }}>{title}</span>
        {open ? <ChevronUp size={16} color="#8E97B5" /> : <ChevronDown size={16} color="#8E97B5" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '20px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Benchmark table row ──────────────────────────────────────────────────────
const TblRow = ({ cols, header }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `2fr 1fr 1fr 1fr`, gap: 8, padding: '8px 12px', background: header ? '#F8F9FC' : 'white', borderBottom: '1px solid #F1F3F9' }}>
    {cols.map((c, i) => (
      <span key={i} style={{ fontSize: header ? 10 : 13, fontFamily: header ? MONO : SANS, color: c.color || (header ? '#8E97B5' : '#5A6480'), fontWeight: c.bold ? 600 : (header ? 500 : 400), letterSpacing: header ? '0.08em' : 0, textTransform: header ? 'uppercase' : 'none' }}>
        {c.text}
      </span>
    ))}
  </div>
);

// ─── Calculator component ─────────────────────────────────────────────────────
export default function Calculator() {
  const [leads, setLeads]           = useState(150);
  const [commission, setCommission] = useState(12000);
  const [closeRate, setCloseRate]   = useState(8);
  const [responseTime, setResponseTime] = useState(45);
  const [isaCost, setIsaCost]       = useState('');
  const [crmSize, setCrmSize]       = useState('');
  const [results, setResults]       = useState(null);
  const [email, setEmail]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [showAudit, setShowAudit]   = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc-inner', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const calculate = () => {
    const rt   = parseInt(responseTime);
    const cr   = parseFloat(closeRate) / 100;
    const L    = parseFloat(leads) || 0;
    const C    = parseFloat(commission) || 0;
    const P    = getP(rt);
    const ISA  = parseFloat(isaCost) || 0;
    const CRM  = parseFloat(crmSize) || 0;

    // Speed-to-lead math
    const idealDeals  = L * cr;
    const actualDeals = idealDeals * (1 - P);
    const dealsLost   = idealDeals * P;
    const monthlyLost = dealsLost * C;
    const annualLost  = monthlyLost * 12;

    // Graveyard math
    const reactivatable    = CRM * 0.12;
    const adjustedClose    = cr * 0.40;
    const recoverableDeals = reactivatable * adjustedClose;
    const graveyardValue   = recoverableDeals * C;

    // ISA comparison
    const isaMonthly  = ISA / 12;
    const isaSaving   = isaMonthly - 999;

    // Break-even
    const revenuePerAppt = C * cr;
    const breakEvenAppts = revenuePerAppt > 0 ? (999 / revenuePerAppt).toFixed(2) : null;

    // Total
    const total = annualLost + graveyardValue;

    // Insight copy
    let insight = '';
    if (P === 0) {
      insight = `With a response time under 5 minutes, you're in the <strong>top 10% of brokerages</strong> for speed-to-lead. Your primary opportunity is graveyard CRM reactivation — <strong>${fm(graveyardValue)} in recoverable revenue</strong> sitting dormant in your database right now.`;
    } else if (P <= 0.40) {
      insight = `A ${formatResp(rt)} response time costs you <strong>${pct(P)} of your conversion potential</strong> before your agents even pick up the phone — <strong>${fm(monthlyLost)} per month</strong>, compounding to <strong>${fm(annualLost)} every year</strong>. That's not a hustle problem. That's a systems problem.`;
    } else {
      insight = `A ${formatResp(rt)} response time places you in the <strong>${pctLabel(P)} of US brokerages</strong> for speed-to-lead. You are losing <strong>${pct(P)} of your conversion potential</strong> — <strong>${fm(monthlyLost)} per month</strong> — before the first human interaction. The lead psychology decay curve is unforgiving after the 5-minute mark.`;
    }
    if (CRM > 500) {
      insight += ` Your CRM database of <strong>${CRM.toLocaleString()} leads</strong> is your most underutilised asset — an estimated <strong>${Math.round(reactivatable)} leads</strong> are likely to transact within 12 months with systematic re-engagement.`;
    }
    if (ISA > 0) {
      insight += ` Your ISA investment of <strong>${fm(ISA)}/year</strong> ($${Math.round(isaMonthly).toLocaleString()}/month) is your current infrastructure ceiling. ORVN Starter at <strong>$999/month</strong> saves <strong>${fm(isaSaving)}/month</strong> while removing the biological constraints entirely.`;
    }

    setResults({
      rt, P, cr, L, C, ISA, CRM,
      idealDeals, actualDeals, dealsLost,
      monthlyLost, annualLost,
      reactivatable, adjustedClose, recoverableDeals, graveyardValue,
      isaMonthly, isaSaving,
      revenuePerAppt, breakEvenAppts,
      total, insight,
    });
    setShowAudit(false);

    setTimeout(() => {
      document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleEmailSubmit = async e => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);

    const payload = {
      email,
      submittedAt: new Date().toISOString(),
      source: 'ORVN_REVENUE_CALCULATOR',
      inputs: {
        monthlyLeads: R.L,
        avgCommission: R.C,
        closeRate: R.cr,
        responseTimeMin: R.rt,
        annualIsaCost: R.ISA || null,
        crmDatabaseSize: R.CRM || null,
      },
      outputs: {
        annualRevenueLost: Math.round(R.annualLost),
        graveyardValue: Math.round(R.graveyardValue),
        totalOpportunity: Math.round(R.total),
        penaltyFactor: R.P,
        monthlyLost: Math.round(R.monthlyLost),
      },
    };

    // ── 1. Log to Google Sheet ──────────────────────────────────────────────
    try {
      await fetch(SHEET_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Sheet webhook failed:', err);
    }

    // ── 2. Send audit email via Resend ──────────────────────────────────────
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          subject: `Your ORVN Revenue Audit — You're Losing ${fm(R.total)}/year`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F8F9FC;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;margin-top:32px;margin-bottom:32px;border:1px solid #E2E6F0;">

    <!-- Header -->
    <div style="background:#5B3FD4;padding:32px;text-align:center;">
      <div style="font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;font-family:monospace;">ORVN Labs — Revenue Audit</div>
      <div style="font-size:28px;color:white;font-weight:700;line-height:1.2;">Your Brokerage Is Losing</div>
      <div style="font-size:56px;color:#FCA5A5;font-weight:900;line-height:1;margin:8px 0;">${fm(R.total)}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.6);">every year — conservative estimate</div>
    </div>

    <!-- Body -->
    <div style="padding:36px;">

      <p style="font-size:16px;color:#5A6480;line-height:1.75;margin-bottom:28px;">
        Here's the exact breakdown of what your current operation is costing you, based on the numbers you entered.
      </p>

      <!-- Numbers breakdown -->
      <div style="background:#F8F9FC;border:1px solid #E2E6F0;border-radius:10px;padding:24px;margin-bottom:24px;">
        <div style="font-size:10px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;color:#8E97B5;margin-bottom:16px;">Your Numbers</div>
        ${[
          ['Monthly leads',        R.L],
          ['Avg commission',       fm(R.C)],
          ['Close rate',           pct(R.cr)],
          ['Response time',        formatResp(R.rt)],
          ...(R.CRM > 0 ? [['CRM database', R.CRM.toLocaleString() + ' leads']] : []),
          ...(R.ISA > 0 ? [['Annual ISA cost', fm(R.ISA)]] : []),
        ].map(([k, v]) => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #F1F3F9;font-size:14px;">
            <span style="color:#5A6480;">${k}</span>
            <span style="color:#5B3FD4;font-weight:600;font-family:monospace;">${v}</span>
          </div>
        `).join('')}
      </div>

      <!-- Loss breakdown -->
      <div style="border-radius:10px;overflow:hidden;margin-bottom:24px;">
        <div style="background:#FEF2F2;border:1px solid #FECACA;padding:20px;text-align:center;margin-bottom:8px;border-radius:10px;">
          <div style="font-size:11px;font-family:monospace;color:#DC2626;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">Annual Speed-to-Lead Loss</div>
          <div style="font-size:36px;color:#DC2626;font-weight:900;">${fm(R.annualLost)}</div>
          <div style="font-size:12px;color:#5A6480;margin-top:4px;">${pct(R.P)} of your conversion potential lost before first contact</div>
        </div>
        ${R.CRM > 0 ? `
        <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:20px;text-align:center;border-radius:10px;">
          <div style="font-size:11px;font-family:monospace;color:#0D9E6E;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">Graveyard CRM — Recoverable Value</div>
          <div style="font-size:36px;color:#0D9E6E;font-weight:900;">${fm(R.graveyardValue)}</div>
          <div style="font-size:12px;color:#5A6480;margin-top:4px;">${Math.round(R.reactivatable)} leads likely to transact within 12 months</div>
        </div>` : ''}
      </div>

      <!-- Insight -->
      <div style="background:#F8F9FC;border-left:3px solid #5B3FD4;border-radius:0 8px 8px 0;padding:18px 20px;margin-bottom:28px;">
        <div style="font-size:10px;font-family:monospace;color:#5B3FD4;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">ORVN Analysis</div>
        <p style="font-size:14px;color:#5A6480;line-height:1.8;margin:0;">${R.insight.replace(/<[^>]+>/g, '')}</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;background:linear-gradient(135deg,#EEF2FF,#F0FDF7);border:1px solid #C7D2FE;border-radius:12px;padding:32px;">
        <div style="font-size:20px;color:#5B3FD4;font-weight:700;margin-bottom:8px;">The $500 Pilot — Zero Downside</div>
        <p style="font-size:14px;color:#5A6480;line-height:1.7;margin-bottom:24px;">14 days on your real leads. Full refund if no appointment is booked. The math above is your floor — the real number is likely higher.</p>
        <a href="mailto:orvnworldofficial@gmail.com?subject=ORVN%20Pilot%20%E2%80%94%20Let's%20Talk" style="display:inline-block;background:#5B3FD4;color:white;padding:14px 28px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">
          Book the $500 Pilot →
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;border-top:1px solid #F1F3F9;text-align:center;">
      <div style="font-size:12px;color:#8E97B5;">ORVN Labs · orvnworldofficial@gmail.com</div>
      <div style="font-size:11px;color:#C8CEDF;margin-top:4px;">You received this because you used the ORVN Revenue Calculator.</div>
    </div>

  </div>
</body>
</html>
          `,
        }),
      });
    } catch (err) {
      console.error('Resend failed:', err);
    }

    // ── 3. Slack alert to Daniel ────────────────────────────────────────────
    if (SLACK_WEBHOOK !== 'PASTE_SLACK_WEBHOOK_URL_HERE') {
      try {
        await fetch(SLACK_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🔥 *New Calculator Lead*`,
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `🔥 *New Calculator Lead — ${email}*\n\n*Annual leak: ${fm(R.total)}*\n\n• Leads/mo: ${R.L}  |  Commission: ${fm(R.C)}  |  Close rate: ${pct(R.cr)}\n• Response time: ${formatResp(R.rt)}  |  Penalty: ${pct(R.P)}\n• Speed-to-lead loss: ${fm(R.annualLost)}/yr${R.CRM > 0 ? `\n• Graveyard value: ${fm(R.graveyardValue)}` : ''}${R.ISA > 0 ? `\n• ISA cost: ${fm(R.ISA)}/yr → saves ${fm(R.isaSaving)}/mo vs ORVN` : ''}`,
                },
              },
              {
                type: 'actions',
                elements: [
                  {
                    type: 'button',
                    text: { type: 'plain_text', text: 'Reply to Lead' },
                    url: `mailto:${email}?subject=Your ORVN Revenue Audit`,
                    style: 'primary',
                  },
                ],
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Slack alert failed:', err);
      }
    }
  };

  const R = results;

  return (
    <section ref={ref} style={{ padding: 'clamp(72px, 8vw, 112px) clamp(20px, 5vw, 64px)', background: '#F8F9FC', borderTop: '1px solid #E2E6F0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 20, height: 1.5, background: PURPLE }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE, fontFamily: MONO }}>
              Free Revenue Audit
            </span>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: PURPLE, lineHeight: 1.1, marginBottom: 14, maxWidth: 640 }}>
            How Much Revenue Is Your Brokerage Bleeding Monthly?
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 48, maxWidth: 560 }}>
            Every formula shown step by step. Every source cited. Every assumption conservative — this is a floor, not a ceiling. The real number is likely higher.
          </p>
        </motion.div>

        {/* Card */}
        <div className="calc-inner" style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.06)' }}>

          {/* Card header */}
          <div style={{ padding: '20px 32px', borderBottom: '1px solid #F1F3F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFBFD' }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: PURPLE }}>Speed-to-Lead Revenue Audit</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: '#8E97B5' }}>6 inputs · 60 seconds</span>
          </div>

          <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>

            {/* Note */}
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderLeft: '3px solid #D97706', borderRadius: 8, padding: '12px 16px', marginBottom: 28, fontSize: 13, color: '#92400E' }}>
              <strong>Why this calculator is different:</strong> Every formula is shown step by step after you calculate. Every source cited. Every assumption conservative — this is a floor, not a ceiling.
            </div>

            {/* Input grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
              {[
                { label: 'Monthly Inbound Leads', value: leads, setter: setLeads, prefix: null, placeholder: '150', hint: 'All new inquiries across all sources', required: true },
                { label: 'Avg Commission Per Deal', value: commission, setter: setCommission, prefix: '$', placeholder: '12000', hint: 'Your average take-home per closed deal', required: true },
                { label: 'Annual ISA Cost', value: isaCost, setter: setIsaCost, prefix: '$', placeholder: '85000', hint: 'Salary + benefits. Leave blank if none.', required: false },
                { label: 'Total CRM Database Size', value: crmSize, setter: setCrmSize, prefix: null, placeholder: '2500', hint: 'All historical leads ever captured', required: false },
              ].map((f, idx) => (
                <div key={idx}>
                  <label style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                    {f.label}{f.required && <span style={{ color: PURPLE, marginLeft: 4 }}>*</span>}
                  </label>
                  <div style={{ position: 'relative' }}>
                    {f.prefix && <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontFamily: MONO, fontSize: 14, color: '#8E97B5' }}>{f.prefix}</span>}
                    <input
                      type="number" value={f.value}
                      onChange={e => f.setter(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: '100%', background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 8, padding: `12px ${f.prefix ? '14px' : '14px'} 12px ${f.prefix ? '28px' : '14px'}`, fontSize: 15, color: PURPLE, fontFamily: MONO, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = PURPLE}
                      onBlur={e => e.target.style.borderColor = '#E2E6F0'}
                    />
                  </div>
                  <p style={{ fontSize: 11, color: '#8E97B5', marginTop: 5, fontStyle: 'italic' }}>{f.hint}</p>
                </div>
              ))}
            </div>

            {/* Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28, marginBottom: 36 }}>
              <div>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                  Lead-to-Close Rate <span style={{ color: PURPLE }}>*</span>
                </label>
                <input type="range" min="1" max="30" value={closeRate} onChange={e => setCloseRate(e.target.value)} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#8E97B5' }}>1%</span>
                  <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: PURPLE }}>{closeRate}%</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#8E97B5' }}>30%</span>
                </div>
                <p style={{ fontSize: 11, color: '#8E97B5', textAlign: 'center', marginTop: 3 }}>Industry avg ~8%</p>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                  Avg Lead Response Time <span style={{ color: PURPLE }}>*</span>
                </label>
                <input type="range" min="1" max="480" value={responseTime} onChange={e => setResponseTime(e.target.value)} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#8E97B5' }}>&lt;1 min</span>
                  <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: responseTime > 60 ? RED : responseTime > 15 ? AMBER : GREEN }}>
                    {formatResp(parseInt(responseTime))}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#8E97B5' }}>8 hrs+</span>
                </div>
                <p style={{ fontSize: 11, color: '#8E97B5', textAlign: 'center', marginTop: 3 }}>Ideal: under 5 minutes · Critical threshold</p>
              </div>
            </div>

            <motion.button
              onClick={calculate}
              whileHover={{ background: '#7B5FEA', y: -1, boxShadow: '0 12px 32px rgba(27,37,89,0.25)' }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', background: PURPLE, color: 'white', border: 'none', borderRadius: 10, padding: '17px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: SANS, letterSpacing: '-0.01em' }}
            >
              → Calculate My Annual Revenue Loss
            </motion.button>
          </div>

          {/* ── RESULTS ── */}
          <AnimatePresence>
            {R && (
              <motion.div
                id="calc-results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ borderTop: '2px solid #F1F3F9', padding: 'clamp(24px, 4vw, 40px)' }}
              >

                {/* ── Hero number ── */}
                <div style={{ background: 'linear-gradient(135deg, #FEF2F2, #FFF7F7)', border: '1px solid #FECACA', borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', color: RED, textTransform: 'uppercase', marginBottom: 12 }}>
                    Estimated Annual Revenue Being Lost
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(52px, 9vw, 86px)', color: RED, lineHeight: 1, marginBottom: 8, fontWeight: 400 }}>
                    <AnimCounter target={R.total} prefix="$" />
                  </div>
                  <p style={{ fontSize: 13, color: '#5A6480' }}>Conservative estimate · Research-backed · Your specific numbers</p>
                </div>

                {/* ── 3 stat cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Leads Lost / Month', value: Math.round(R.dealsLost), suffix: '', color: RED, sub: 'to slow response time' },
                    { label: 'Monthly Commission Lost', value: Math.round(R.monthlyLost), prefix: '$', color: RED, sub: 'speed-to-lead only' },
                    { label: 'Graveyard CRM Value', value: Math.round(R.graveyardValue), prefix: '$', color: GREEN, sub: '12-month recoverable' },
                  ].map((c, i) => (
                    <div key={i} style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 10, padding: '18px', textAlign: 'center' }}>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: '#8E97B5', textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</div>
                      <div style={{ fontFamily: SERIF, fontSize: 28, color: c.color, lineHeight: 1, marginBottom: 4 }}>
                        <AnimCounter target={c.value} prefix={c.prefix || ''} suffix={c.suffix || ''} />
                      </div>
                      <div style={{ fontSize: 11, color: '#8E97B5' }}>{c.sub}</div>
                    </div>
                  ))}
                </div>

                {/* ── Step-by-step math ── */}
                <div style={{ background: '#FAFBFD', border: '1px solid #E2E6F0', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: AMBER, textTransform: 'uppercase', marginBottom: 14 }}>
                    Step-by-Step Calculation
                  </div>
                  <MathRow label="Monthly leads" value={R.L} />
                  <MathRow label="Lead-to-close rate" value={pct(R.cr)} />
                  <MathRow label={`Ideal deals/month  (${R.L} × ${pct(R.cr)})`} value={R.idealDeals.toFixed(1)} />
                  <MathRow label={`Response time penalty  P = ${pct(R.P)} at ${formatResp(R.rt)}`} value={pct(R.P)} color={RED} />
                  <MathRow label={`Deals lost/month  (${R.idealDeals.toFixed(1)} × ${pct(R.P)})`} value={R.dealsLost.toFixed(1)} color={RED} />
                  <MathRow label={`Monthly revenue lost  (${R.dealsLost.toFixed(1)} × ${fm(R.C)})`} value={fm(R.monthlyLost)} color={RED} />
                  <MathRow label="Annual speed-to-lead loss  (× 12)" value={fm(R.annualLost)} color={RED} />
                  {R.CRM > 0 && <>
                    <MathRow label={`Graveyard leads  (${R.CRM.toLocaleString()} × 12%)`} value={Math.round(R.reactivatable)} color={GREEN} />
                    <MathRow label={`Adjusted close rate  (${pct(R.cr)} × 40% discount)`} value={pct(R.adjustedClose)} color={GREEN} />
                    <MathRow label={`Recoverable deals  (${Math.round(R.reactivatable)} × ${pct(R.adjustedClose)})`} value={R.recoverableDeals.toFixed(1)} color={GREEN} />
                    <MathRow label={`Graveyard value  (${R.recoverableDeals.toFixed(1)} × ${fm(R.C)})`} value={fm(R.graveyardValue)} color={GREEN} />
                  </>}
                  <MathRow label="TOTAL ANNUAL OPPORTUNITY" value={fm(R.total)} color={RED} bold border={false} />
                </div>

                {/* ── ORVN Analysis insight ── */}
                <div style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderLeft: '3px solid ' + PURPLE, borderRadius: 10, padding: '18px 20px', marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: PURPLE, textTransform: 'uppercase', marginBottom: 10 }}>ORVN Labs Analysis</div>
                  <p style={{ fontSize: 14, lineHeight: 1.85, color: '#5A6480' }} dangerouslySetInnerHTML={{ __html: R.insight }} />
                </div>

                {/* ── Full Audit toggle ── */}
                <motion.button
                  onClick={() => { setShowAudit(o => !o); setTimeout(() => document.getElementById('full-audit')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120); }}
                  whileHover={{ background: '#F1F3F9' }}
                  style={{ width: '100%', background: 'white', border: '2px solid #E2E6F0', borderRadius: 10, padding: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: SANS, color: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16, transition: 'all 0.2s' }}
                >
                  {showAudit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {showAudit ? 'Hide' : 'View'} Full Personalised Audit Report
                </motion.button>

                {/* ── FULL AUDIT ── */}
                <AnimatePresence>
                  {showAudit && (
                    <motion.div
                      id="full-audit"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
                      style={{ marginBottom: 20 }}
                    >
                      {/* Audit header */}
                      <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #F0FDF9)', border: '1px solid #C7D2FE', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>ORVN Labs — Full Revenue Audit</div>
                        <div style={{ fontFamily: SERIF, fontSize: 22, color: PURPLE, marginBottom: 4 }}>Revenue Audit Report</div>
                        <div style={{ fontSize: 12, color: '#5A6480', marginBottom: 14 }}>Prepared {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                          {[
                            ['Leads/mo', R.L],
                            ['Commission', fm(R.C)],
                            ['Close rate', pct(R.cr)],
                            ['Response time', formatResp(R.rt)],
                            ...(R.CRM > 0 ? [['CRM size', R.CRM.toLocaleString()]] : []),
                          ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <span style={{ fontFamily: MONO, fontSize: 10, color: '#8E97B5' }}>{k}:</span>
                              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: PURPLE }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Panel 1: Speed-to-Lead */}
                      <AuditPanel number="1" title="Speed-to-Lead Analysis">
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '3px solid ' + RED, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#991B1B' }}>
                          <strong>Finding:</strong> Your response time of <strong>{formatResp(R.rt)}</strong> places your brokerage in the <strong>{pctLabel(R.P)}</strong> of US brokerages for speed-to-lead performance.
                        </div>
                        <div style={{ border: '1px solid #E2E6F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                          <TblRow header cols={[{ text: 'Metric' }, { text: 'Your Number' }, { text: 'Benchmark' }, { text: 'Gap' }]} />
                          <TblRow cols={[{ text: 'Avg response time' }, { text: formatResp(R.rt), color: RED }, { text: '< 5 min (top 10%)' }, { text: `−${Math.max(0, R.rt - 5)} min from optimal`, color: RED }]} />
                          <TblRow cols={[{ text: 'Penalty factor (P)' }, { text: pct(R.P), color: RED }, { text: 'P = 0% at optimal' }, { text: `−${pct(R.P)} conversion loss`, color: RED }]} />
                          <TblRow cols={[{ text: 'Ideal deals/month' }, { text: R.idealDeals.toFixed(1) }, { text: 'Your ceiling' }, { text: '—' }]} />
                          <TblRow cols={[{ text: 'Actual deals/month' }, { text: R.actualDeals.toFixed(1), color: RED }, { text: R.idealDeals.toFixed(1) + ' at optimal' }, { text: `−${R.dealsLost.toFixed(1)} deals/mo`, color: RED }]} />
                        </div>
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
                          <div style={{ fontFamily: SERIF, fontSize: 44, color: RED, lineHeight: 1, marginBottom: 6 }}>{fm(R.annualLost)}</div>
                          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#8E97B5', textTransform: 'uppercase' }}>Annual Speed-to-Lead Revenue Loss</div>
                          <div style={{ fontSize: 12, color: '#5A6480', marginTop: 4 }}>Deals lost × commission × 12 months</div>
                        </div>
                      </AuditPanel>

                      {/* Panel 2: Graveyard */}
                      {R.CRM > 0 && (
                        <AuditPanel number="2" title="Graveyard CRM Analysis">
                          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderLeft: '3px solid ' + GREEN, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#14532D' }}>
                            <strong>Finding:</strong> Your database of <strong>{R.CRM.toLocaleString()} leads</strong> contains significant recoverable revenue. 12% of abandoned leads transact within 12 months with systematic follow-up.
                          </div>
                          <div style={{ border: '1px solid #E2E6F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Value' }, { text: 'Formula' }, { text: 'Source' }]} />
                            <TblRow cols={[{ text: 'CRM database' }, { text: R.CRM.toLocaleString() + ' leads' }, { text: 'Your input' }, { text: '—' }]} />
                            <TblRow cols={[{ text: 'Re-engagement rate' }, { text: '12%' }, { text: 'crm × 0.12' }, { text: 'NAR research' }]} />
                            <TblRow cols={[{ text: 'Reactivatable leads' }, { text: Math.round(R.reactivatable) + ' leads', color: GREEN }, { text: '' }, { text: '' }]} />
                            <TblRow cols={[{ text: 'Adjusted close rate' }, { text: pct(R.adjustedClose) }, { text: `${pct(R.cr)} × 40% discount` }, { text: 'Conservative' }]} />
                            <TblRow cols={[{ text: 'Recoverable deals' }, { text: R.recoverableDeals.toFixed(1) + ' deals', color: GREEN }, { text: '' }, { text: '' }]} />
                          </div>
                          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontFamily: SERIF, fontSize: 44, color: GREEN, lineHeight: 1, marginBottom: 6 }}>{fm(R.graveyardValue)}</div>
                            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#8E97B5', textTransform: 'uppercase' }}>Recoverable Graveyard CRM Value</div>
                            <div style={{ fontSize: 12, color: '#5A6480', marginTop: 4 }}>Conservative estimate · 40% discount applied</div>
                          </div>
                        </AuditPanel>
                      )}

                      {/* Panel 3: ISA Comparison */}
                      {R.ISA > 0 && (
                        <AuditPanel number={R.CRM > 0 ? '3' : '2'} title="ISA Cost vs ORVN Infrastructure">
                          <div style={{ border: '1px solid #E2E6F0', borderRadius: 8, overflow: 'hidden', marginBottom: 0 }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Human ISA' }, { text: 'ORVN Infrastructure' }, { text: 'Difference' }]} />
                            <TblRow cols={[{ text: 'Monthly cost' }, { text: fm(R.isaMonthly) + '/mo', color: RED }, { text: '$999/mo (Starter)' }, { text: fm(R.isaSaving) + ' saved/mo', color: GREEN, bold: true }]} />
                            <TblRow cols={[{ text: 'Response time' }, { text: '30–90 min avg', color: RED }, { text: 'Under 3 seconds', color: GREEN }, { text: 'Structural win' }]} />
                            <TblRow cols={[{ text: 'Coverage' }, { text: '~45 hrs/week' }, { text: '8,760 hrs/year', color: GREEN }, { text: '+8,580 hrs/year' }]} />
                            <TblRow cols={[{ text: 'Turnover risk' }, { text: 'Every 14 months', color: RED }, { text: 'None — infrastructure', color: GREEN }, { text: '$10–15k saved/cycle' }]} />
                            <TblRow cols={[{ text: 'Graveyard reactivation' }, { text: 'Rarely systematic' }, { text: 'Automated sequence', color: GREEN }, { text: 'New revenue layer' }]} />
                          </div>
                        </AuditPanel>
                      )}

                      {/* Panel 4: Break-even */}
                      {R.breakEvenAppts && (
                        <AuditPanel number={[R.CRM > 0, R.ISA > 0].filter(Boolean).length + 2} title="Break-Even Analysis — ORVN Starter">
                          <div style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 8, padding: 20 }}>
                            <MathRow label="Revenue per appointment" value={fm(R.revenuePerAppt)} color={PURPLE} />
                            <MathRow label="ORVN Starter monthly cost" value="$999/mo" />
                            <MathRow label="Extra appointments to break even" value={R.breakEvenAppts + ' appts'} color={GREEN} bold border={false} />
                          </div>
                          <div style={{ marginTop: 14, padding: '14px 16px', background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 8, fontSize: 13, color: '#3730A3' }}>
                            <strong>Bottom line:</strong> ORVN Starter pays for itself with <strong>{R.breakEvenAppts} extra booked appointments per month</strong>. At your current lead volume and close rate, that is a straightforward calculation.
                          </div>
                        </AuditPanel>
                      )}

                      {/* Panel 5: Summary */}
                      <AuditPanel number={[R.CRM > 0, R.ISA > 0, !!R.breakEvenAppts].filter(Boolean).length + 2} title="Summary — Total Annual Opportunity">
                        <div style={{ border: '1px solid #E2E6F0', borderRadius: 8, overflow: 'hidden' }}>
                          <TblRow header cols={[{ text: 'Revenue Opportunity' }, { text: 'Annual Value' }, { text: 'Confidence' }, { text: '' }]} />
                          <TblRow cols={[{ text: 'Speed-to-lead loss (recoverable)' }, { text: fm(R.annualLost), color: RED, bold: true }, { text: 'High — research-backed' }, { text: '' }]} />
                          {R.CRM > 0 && <TblRow cols={[{ text: 'Graveyard CRM value (recoverable)' }, { text: fm(R.graveyardValue), color: GREEN, bold: true }, { text: 'Medium — conservative' }, { text: '' }]} />}
                          {R.ISA > 0 && <TblRow cols={[{ text: 'ISA cost reduction (monthly)' }, { text: fm(R.isaSaving) + '/mo', color: GREEN, bold: true }, { text: 'High — direct comparison' }, { text: '' }]} />}
                          <div style={{ background: '#FEF2F2', borderTop: '2px solid #FECACA' }}>
                            <TblRow cols={[{ text: 'TOTAL ANNUAL OPPORTUNITY', bold: true }, { text: fm(R.total), color: RED, bold: true }, { text: 'Conservative combined' }, { text: '' }]} />
                          </div>
                        </div>

                        {/* Next steps */}
                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {[
                            { n: 1, text: '<strong>This week:</strong> Deploy a sub-5-minute response mechanism for all inbound leads. Every hour above 5 minutes, you pay the penalty calculated above.' },
                            { n: 2, text: `<strong>This week:</strong> Run a graveyard analysis on your full CRM. The ${fm(R.graveyardValue || 0)} estimate above is your conservative floor — these are deals already in your database.` },
                            { n: 3, text: '<strong>This month:</strong> Consider the ORVN $500 pilot deployment. 14 days on real leads. Full refund if no appointment booked. The downside is zero.' },
                          ].map(s => (
                            <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 8, padding: '12px 14px' }}>
                              <div style={{ width: 24, height: 24, borderRadius: '50%', background: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>{s.n}</div>
                              <p style={{ fontSize: 13, color: '#5A6480', lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: s.text }} />
                            </div>
                          ))}
                        </div>
                      </AuditPanel>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Email capture ── */}
                <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #F0FDF7)', border: '1px solid #C7D2FE', borderRadius: 14, padding: 36, textAlign: 'center' }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: 22, color: PURPLE, marginBottom: 8 }}>Get Your Full Revenue Recovery Report</h3>
                  <p style={{ color: '#5A6480', fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                    A personalised PDF with your exact numbers, industry benchmarks, and a specific infrastructure roadmap for your brokerage.
                  </p>
                  {!submitted ? (
                    <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto 12px', flexWrap: 'wrap' }}>
                      <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="your@brokerage.com" required
                        style={{ flex: 1, minWidth: 200, background: 'white', border: '1px solid #E2E6F0', borderRadius: 8, padding: '13px 16px', fontSize: 14, color: PURPLE, outline: 'none', fontFamily: SANS }}
                        onFocus={e => e.target.style.borderColor = PURPLE}
                        onBlur={e => e.target.style.borderColor = '#E2E6F0'}
                      />
                      <button type="submit" style={{ background: GREEN, color: 'white', border: 'none', borderRadius: 8, padding: '13px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: SANS }}>
                        Send My Report →
                      </button>
                    </form>
                  ) : (
                    <div style={{ background: '#F0FDF7', border: '1px solid #BBF7D0', borderRadius: 8, padding: 16, fontSize: 14, color: GREEN, maxWidth: 440, margin: '0 auto 12px', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <CheckCircle size={16} /> Report on its way — check your inbox. Daniel reviews every submission personally.
                    </div>
                  )}
                  <p style={{ fontSize: 11, color: '#8E97B5' }}>No spam. One email. Your data stays private.</p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}