import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';

const RED = '#DC2626';
const AMBER = '#D97706';
const GREEN = '#0D9E6E';
const PURPLE = '#5B3FD4';
const MONO = "'JetBrains Mono', monospace";
const SERIF = "'Instrument Serif', serif";
const SANS = "'Inter', sans-serif";

const fm = (n) => '$' + Math.round(n).toLocaleString();
const pct = (n) => (n * 100).toFixed(0) + '%';
const pct1 = (n) => (n * 100).toFixed(1) + '%';

const formatResp = (v) => (v <= 60 ? `${v} min` : `${(v / 60).toFixed(1)} hrs`);

// Qualitative response-time risk band. No revenue multiplier — there is no sourced
// response-time→conversion distribution in this repo, so response time is a risk
// signal only, never a dollar figure.
const responseBand = (rt) => {
  if (rt < 5) return { label: 'Target zone', tone: GREEN, bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' };
  if (rt <= 15) return { label: 'Early leakage risk', tone: AMBER, bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' };
  if (rt <= 60) return { label: 'Meaningful delay', tone: AMBER, bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' };
  if (rt <= 240) return { label: 'High delay', tone: RED, bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' };
  return { label: 'Severe delay', tone: RED, bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' };
};

function AnimCounter({ target, prefix = '', suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return (
    <>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

const MathRow = ({ label, value, color, bold, border }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: border !== false ? '1px solid #F1F3F9' : 'none',
      borderTop: bold ? '1px solid #E5E8F0' : 'none',
      marginTop: bold ? 4 : 0,
    }}
  >
    <span style={{ fontSize: 13, color: bold ? '#0F172A' : '#475569', fontWeight: bold ? 600 : 400 }}>{label}</span>
    <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: bold ? 700 : 500, color: color || (bold ? '#0F172A' : '#475569') }}>
      {value}
    </span>
  </div>
);

function AuditPanel({ number, title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#F7F8FB',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderBottom: open ? '1px solid #E5E8F0' : 'none',
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: PURPLE,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{title}</span>
        {open ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '20px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TblRow = ({ cols, header }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 8,
      padding: '8px 12px',
      background: header ? '#F7F8FB' : '#fff',
      borderBottom: '1px solid #F1F3F9',
    }}
  >
    {cols.map((c, i) => (
      <span
        key={i}
        style={{
          fontSize: header ? 10 : 13,
          fontFamily: header ? MONO : SANS,
          color: c.color || (header ? '#94A3B8' : '#475569'),
          fontWeight: c.bold ? 600 : header ? 500 : 400,
          letterSpacing: header ? '0.1em' : 0,
          textTransform: header ? 'uppercase' : 'none',
        }}
      >
        {c.text}
      </span>
    ))}
  </div>
);

const SliderField = ({ label, hint, value, onChange, min, max, suffix = '%', valueColor = PURPLE }) => (
  <div>
    <label
      style={{
        display: 'block',
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#94A3B8',
        marginBottom: 8,
      }}
    >
      {label} <span style={{ color: PURPLE }}>*</span>
    </label>
    <input type="range" min={min} max={max} value={value} onChange={onChange} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>{min}{suffix}</span>
      <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: valueColor }}>{value}{suffix}</span>
      <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>{max}{suffix}</span>
    </div>
    {hint && <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>{hint}</p>}
  </div>
);

export default function RevenueCalculator() {
  useDocumentMeta({
    title: 'Revenue Calculator',
    description:
      'Conservative estimate of the annual revenue a real estate brokerage could recover with faster, more consistent first contact. Math shown step by step.',
    path: '/calculators/revenue',
  });

  const [leads, setLeads] = useState(150);
  const [commission, setCommission] = useState(12000);
  const [currentClose, setCurrentClose] = useState(8);
  // Pre-filled, editable target scenario — a modest lift above the current rate.
  const [targetClose, setTargetClose] = useState(12);
  const [responseTime, setResponseTime] = useState(45);
  const [isaCost, setIsaCost] = useState('');
  const [crmSize, setCrmSize] = useState('');
  // Re-engagement rate is an editable, illustrative assumption — not research-backed.
  const [reEngage, setReEngage] = useState(12);
  const [results, setResults] = useState(null);
  const [showAudit, setShowAudit] = useState(false);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState('idle');

  const calculate = () => {
    const rt = parseInt(responseTime, 10) || 0;
    const curCR = (parseFloat(currentClose) || 0) / 100;
    const tgtCR = (parseFloat(targetClose) || 0) / 100;
    const L = parseFloat(leads) || 0;
    const C = parseFloat(commission) || 0;
    const ISA = parseFloat(isaCost) || 0;
    const CRM = parseFloat(crmSize) || 0;
    const reRate = (parseFloat(reEngage) || 0) / 100;

    // ── Recoverable-opportunity model (close rate is never penalized twice) ──
    const currentDeals = L * curCR;
    const targetDeals = L * tgtCR;
    const hasGap = tgtCR > curCR;
    const recoverableDeals = hasGap ? Math.max(targetDeals - currentDeals, 0) : 0;
    const recoverableMonth = recoverableDeals * C;
    const recoverableYear = recoverableMonth * 12;

    // ── Database re-engagement ("graveyard") — separate, clearly-labeled bucket ──
    const reactivatable = CRM * reRate;
    const graveyardClose = curCR * 0.4; // 40% OF the current close rate (a 60% haircut)
    const graveyardDeals = reactivatable * graveyardClose;
    const graveyardValue = graveyardDeals * C;

    // ── ISA coverage / operating-cost context (no fabricated PAS price) ──
    const isaHoursWeek = 45;
    const isaAnnualHours = isaHoursWeek * 52; // 2,340 hrs/yr
    const pasAnnualHours = 8760; // 24 × 365
    const coverageGap = Math.max(pasAnnualHours - isaAnnualHours, 0); // 6,420 hrs/yr
    const isaMonthly = ISA / 12;

    // Combined upside is only ever shown as an explicitly-labeled scenario.
    const combinedUpside = recoverableYear + graveyardValue;

    const band = responseBand(rt);

    let insight = '';
    if (!hasGap) {
      insight = `Based on your inputs, your target close rate (${pct(tgtCR)}) isn't higher than your current rate (${pct(curCR)}), so there's no modeled close-rate gap to recover. Faster, more consistent first contact still reduces risk on the leads you're currently losing — your response time of ${formatResp(rt)} is in the "${band.label.toLowerCase()}" range.`;
    } else {
      insight = `Lifting your close rate from ${pct(curCR)} to a target of ${pct(tgtCR)} on ${L.toLocaleString()} monthly leads models ${recoverableDeals.toFixed(1)} additional deals per month — ${fm(recoverableMonth)}/month, ${fm(recoverableYear)}/year of recoverable opportunity. This is a systems opportunity: protect more of the intent you already pay for.`;
    }
    if (CRM > 0) {
      insight += ` Separately, your database of ${CRM.toLocaleString()} leads holds an illustrative ${Math.round(reactivatable)} re-engageable contacts (a ${pct(reRate)} editable assumption) worth roughly ${fm(graveyardValue)} at a conservative reactivation close rate.`;
    }
    if (ISA > 0) {
      insight += ` Your ISA investment of ${fm(ISA)}/year (${fm(isaMonthly)}/month) is your current first-contact cost. A human ISA covers about ${isaAnnualHours.toLocaleString()} hours/year against continuous coverage — a gap of roughly ${coverageGap.toLocaleString()} hours. PAS early-access pricing is quoted per brokerage.`;
    }

    setResults({
      rt, band, curCR, tgtCR, hasGap, L, C, ISA, CRM, reRate,
      currentDeals, targetDeals, recoverableDeals, recoverableMonth, recoverableYear,
      reactivatable, graveyardClose, graveyardDeals, graveyardValue,
      isaHoursWeek, isaAnnualHours, pasAnnualHours, coverageGap, isaMonthly,
      combinedUpside, insight,
    });
    setShowAudit(false);

    setTimeout(() => {
      document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@') || !results) return;
    setSubmitState('loading');

    const payload = {
      email,
      submittedAt: new Date().toISOString(),
      source: 'revenue_calculator',
      inputs: {
        monthlyLeads: results.L,
        avgCommission: results.C,
        currentCloseRate: results.curCR,
        targetCloseRate: results.tgtCR,
        responseTimeMin: results.rt,
        annualIsaCost: results.ISA || null,
        crmDatabaseSize: results.CRM || null,
        reEngagementRate: results.reRate,
      },
      outputs: {
        recoverableRevenuePerMonth: Math.round(results.recoverableMonth),
        recoverableRevenuePerYear: Math.round(results.recoverableYear),
        recoverableDealsPerMonth: Number(results.recoverableDeals.toFixed(2)),
        databaseReactivationValue: Math.round(results.graveyardValue),
        combinedUpsideScenario: Math.round(results.combinedUpside),
        responseRiskBand: results.band.label,
      },
    };

    try {
      // Server-side function handles Resend / Sheet / Slack. NEVER call those services directly
      // from the browser — secrets must not ship in the bundle.
      const res = await fetch('/api/calculator-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.warn('[calculator] backend unavailable, captured locally', err, payload);
    }
    setSubmitState('success');
  };

  const R = results;

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(20px, 3vw, 32px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 760 }}>
          <Eyebrow>Revenue calculator</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: '14px 0 16px' }}>
            How much revenue could faster first contact recover?
          </h1>
          <p className="lead">
            Every formula shown step by step. Every assumption conservative — this is a floor, not
            a ceiling. The real number is usually higher.
          </p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div
          style={{
            background: '#fff',
            border: '1px solid #E5E8F0',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
          }}
        >
          <div
            style={{
              padding: '18px 28px',
              borderBottom: '1px solid #F1F3F9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F7F8FB',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
              Recoverable revenue model
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: '#94A3B8' }}>
              All inputs editable · runs locally · no signup
            </span>
          </div>

          <div style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
            <div
              style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderLeft: '3px solid #D97706',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 24,
                fontSize: 13.5,
                color: '#92400E',
                lineHeight: 1.6,
              }}
            >
              <strong>Conservative by design.</strong> Every formula is shown step by step after
              you calculate. Every assumption tilts low. The real opportunity is almost always
              higher.
            </div>

            {/* C1 — How to read this number */}
            <div
              style={{
                background: '#EEEAFB',
                border: '1px solid #C7BCF5',
                borderLeft: `3px solid ${PURPLE}`,
                borderRadius: 8,
                padding: '14px 16px',
                marginBottom: 24,
                fontSize: 13.5,
                color: '#3A2899',
                lineHeight: 1.7,
              }}
            >
              <strong>How to read this number.</strong> Your current close rate already reflects
              your current operation — including how fast you respond today. This calculator does
              not punish that number twice. Instead, it estimates the annual opportunity if faster,
              more consistent first contact lifts your close rate from your current baseline to a
              target scenario you control. If your target isn’t higher than your current rate, the
              recoverable opportunity is $0 — and the response-time risk below still applies to the
              leads you’re currently losing.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 24 }}>
              {[
                { label: 'Monthly inbound leads', value: leads, set: setLeads, prefix: null, hint: 'All new inquiries across all sources', required: true },
                { label: 'Avg commission per deal', value: commission, set: setCommission, prefix: '$', hint: 'Your average take-home per closed deal', required: true },
                { label: 'Annual ISA cost', value: isaCost, set: setIsaCost, prefix: '$', hint: 'Salary + benefits. Leave blank if none.', required: false },
                { label: 'Total CRM database size', value: crmSize, set: setCrmSize, prefix: null, hint: 'All historical leads ever captured', required: false },
                { label: 'Re-engagement rate (illustrative)', value: reEngage, set: setReEngage, prefix: null, suffix: '%', hint: 'Editable assumption — not research-backed', required: false },
              ].map((f, idx) => (
                <div key={idx}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#94A3B8',
                      marginBottom: 8,
                    }}
                  >
                    {f.label}
                    {f.required && <span style={{ color: PURPLE, marginLeft: 4 }}>*</span>}
                  </label>
                  <div style={{ position: 'relative' }}>
                    {f.prefix && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 14,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontFamily: MONO,
                          fontSize: 14,
                          color: '#94A3B8',
                        }}
                      >
                        {f.prefix}
                      </span>
                    )}
                    <input
                      type="number"
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder=""
                      style={{
                        width: '100%',
                        background: '#F7F8FB',
                        border: '1px solid #E5E8F0',
                        borderRadius: 10,
                        padding: `12px ${f.suffix ? '34px' : '14px'} 12px ${f.prefix ? '28px' : '14px'}`,
                        fontSize: 15,
                        color: '#0F172A',
                        fontFamily: MONO,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    {f.suffix && (
                      <span
                        style={{
                          position: 'absolute',
                          right: 14,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontFamily: MONO,
                          fontSize: 13,
                          color: '#94A3B8',
                        }}
                      >
                        {f.suffix}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 6 }}>{f.hint}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 28 }}>
              <SliderField
                label="Current close rate"
                hint="What you close today, as-is"
                value={currentClose}
                onChange={(e) => setCurrentClose(e.target.value)}
                min={1}
                max={30}
              />
              <SliderField
                label="Target close rate — editable scenario"
                hint="Achievable with faster, better first contact"
                value={targetClose}
                onChange={(e) => setTargetClose(e.target.value)}
                min={1}
                max={30}
                valueColor={GREEN}
              />
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#94A3B8',
                    marginBottom: 8,
                  }}
                >
                  Avg lead response time <span style={{ color: PURPLE }}>*</span>
                </label>
                <input type="range" min="1" max="480" value={responseTime} onChange={(e) => setResponseTime(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>&lt;1 min</span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 18,
                      fontWeight: 700,
                      color: responseTime > 60 ? RED : responseTime > 15 ? AMBER : GREEN,
                    }}
                  >
                    {formatResp(parseInt(responseTime, 10))}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>8 hrs+</span>
                </div>
                <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
                  Risk signal only — not a revenue multiplier
                </p>
              </div>
            </div>

            <button type="button" onClick={calculate} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 16 }}>
              Calculate recoverable opportunity <ArrowRight size={16} />
            </button>
          </div>

          <AnimatePresence>
            {R && (
              <motion.div
                id="calc-results"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ borderTop: '2px solid #F1F3F9', padding: 'clamp(24px, 4vw, 36px)' }}
              >
                {R.hasGap ? (
                  <div
                    style={{
                      background: '#EEEAFB',
                      border: '1px solid #C7BCF5',
                      borderRadius: 14,
                      padding: 32,
                      textAlign: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        color: PURPLE,
                        textTransform: 'uppercase',
                        marginBottom: 12,
                      }}
                    >
                      Estimated annual recoverable opportunity
                    </div>
                    <div
                      style={{
                        fontFamily: SERIF,
                        fontSize: 'clamp(48px, 8vw, 78px)',
                        color: PURPLE,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      <AnimCounter target={R.recoverableYear} prefix="$" />
                    </div>
                    <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
                      Close-rate opportunity · math shown below · database reactivation shown separately
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#F7F8FB',
                      border: '1px solid #E5E8F0',
                      borderLeft: `3px solid ${PURPLE}`,
                      borderRadius: 14,
                      padding: 28,
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: PURPLE, textTransform: 'uppercase', marginBottom: 10 }}>
                      Estimated annual recoverable opportunity · $0
                    </div>
                    <p style={{ fontSize: 14.5, color: '#0F172A', margin: 0, lineHeight: 1.7 }}>
                      Based on your inputs, there’s no modeled close-rate gap to recover — your
                      target rate isn’t higher than your current rate. Faster first contact still
                      reduces risk on the leads you’re currently losing — see the response-time risk
                      below.
                    </p>
                  </div>
                )}

                {/* Response-time risk — qualitative band, no dollar figure */}
                <div
                  style={{
                    background: R.band.bg,
                    border: `1px solid ${R.band.border}`,
                    borderLeft: `3px solid ${R.band.tone}`,
                    borderRadius: 10,
                    padding: '16px 20px',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: R.band.text, marginBottom: 6 }}>
                    Response-time risk
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>
                    {formatResp(R.rt)} — {R.band.label}
                  </div>
                  <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.65 }}>
                    Faster first contact protects intent before it cools. The sub-5-minute window is
                    the ceiling most operations never reach — not because people aren’t trying, but
                    because no human is on every inbound lead the moment it arrives.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Recoverable deals / month', value: Number(R.recoverableDeals.toFixed(1)), color: GREEN, sub: 'target − current close' },
                    { label: 'Recoverable revenue / month', value: Math.round(R.recoverableMonth), prefix: '$', color: GREEN, sub: 'close-rate opportunity' },
                    { label: 'Database reactivation', value: Math.round(R.graveyardValue), prefix: '$', color: PURPLE, sub: 'separate · illustrative' },
                  ].map((c, i) => (
                    <div key={i} style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>
                        {c.label}
                      </div>
                      <div style={{ fontFamily: SERIF, fontSize: 28, color: c.color, lineHeight: 1, marginBottom: 4 }}>
                        <AnimCounter target={c.value} prefix={c.prefix || ''} />
                      </div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>{c.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: AMBER, textTransform: 'uppercase', marginBottom: 14 }}>
                    Step-by-step calculation
                  </div>
                  <MathRow label="Monthly leads" value={R.L} />
                  <MathRow label="Current close rate" value={pct(R.curCR)} />
                  <MathRow label="Target close rate (editable scenario)" value={pct(R.tgtCR)} color={GREEN} />
                  <MathRow label={`Current deals/month  (${R.L} × ${pct(R.curCR)})`} value={R.currentDeals.toFixed(1)} />
                  <MathRow label={`Target deals/month  (${R.L} × ${pct(R.tgtCR)})`} value={R.targetDeals.toFixed(1)} color={GREEN} />
                  <MathRow label="Recoverable deals/month  (target − current)" value={R.recoverableDeals.toFixed(1)} color={GREEN} />
                  <MathRow label={`Recoverable revenue/month  (${R.recoverableDeals.toFixed(1)} × ${fm(R.C)})`} value={fm(R.recoverableMonth)} color={GREEN} />
                  <MathRow label="Recoverable revenue/year  (× 12)" value={fm(R.recoverableYear)} color={GREEN} bold border={false} />
                  {!R.hasGap && (
                    <div style={{ marginTop: 10, fontSize: 12.5, color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '10px 12px' }}>
                      Guardrail: target ≤ current, so recoverable opportunity is set to $0.
                    </div>
                  )}
                </div>

                {R.CRM > 0 && (
                  <div style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: PURPLE, textTransform: 'uppercase', marginBottom: 6 }}>
                      Database reactivation — separate bucket
                    </div>
                    <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '0 0 12px', lineHeight: 1.6 }}>
                      Kept separate from the close-rate opportunity above. The re-engagement rate is
                      an editable, illustrative assumption — not research-backed.
                    </p>
                    <MathRow label={`Re-engageable leads  (${R.CRM.toLocaleString()} × ${pct(R.reRate)} illustrative)`} value={Math.round(R.reactivatable)} color={PURPLE} />
                    <MathRow label={`Reactivation close rate  (${pct(R.curCR)} × 40% of current = 60% haircut)`} value={pct1(R.graveyardClose)} color={PURPLE} />
                    <MathRow label={`Recoverable deals  (${Math.round(R.reactivatable)} × ${pct1(R.graveyardClose)})`} value={R.graveyardDeals.toFixed(1)} color={PURPLE} />
                    <MathRow label={`Database reactivation value  (${R.graveyardDeals.toFixed(1)} × ${fm(R.C)})`} value={fm(R.graveyardValue)} color={PURPLE} bold border={false} />
                  </div>
                )}

                {R.CRM > 0 && (R.recoverableYear > 0 || R.graveyardValue > 0) && (
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid #E5E8F0',
                      borderRadius: 10,
                      padding: 18,
                      marginBottom: 20,
                    }}
                  >
                    <MathRow label="Recoverable revenue/year (close-rate opportunity)" value={fm(R.recoverableYear)} color={GREEN} />
                    <MathRow label="Database reactivation (illustrative)" value={fm(R.graveyardValue)} color={PURPLE} />
                    <MathRow label="Combined upside scenario (revenue opportunity + database reactivation)" value={fm(R.combinedUpside)} color={PURPLE} bold border={false} />
                  </div>
                )}

                {/* Assumptions note (B9) */}
                <div
                  style={{
                    background: '#F7F8FB',
                    border: '1px dashed #C7BCF5',
                    borderRadius: 10,
                    padding: '14px 18px',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: PURPLE, textTransform: 'uppercase', marginBottom: 8 }}>
                    Assumptions in this model
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: '#475569', lineHeight: 1.7 }}>
                    <li>Recoverable opportunity = (target − current close rate) × leads × commission. Close rate is never penalized twice.</li>
                    <li>Response time is a qualitative risk signal only — it does not multiply any dollar figure.</li>
                    <li>Database reactivation uses an editable {pct(R.reRate)} re-engagement assumption and a reactivation close rate of 40% of your current rate. Both are illustrative, not research-backed.</li>
                    {R.ISA > 0 && <li>ISA coverage assumes ~{R.isaHoursWeek} hrs/week ({R.isaAnnualHours.toLocaleString()} hrs/year) against 24/7 ({R.pasAnnualHours.toLocaleString()} hrs/year).</li>}
                  </ul>
                </div>

                <div
                  style={{
                    background: '#F7F8FB',
                    border: '1px solid #E5E8F0',
                    borderLeft: `3px solid ${PURPLE}`,
                    borderRadius: 10,
                    padding: '18px 20px',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: PURPLE, textTransform: 'uppercase', marginBottom: 10 }}>
                    ORVN analysis
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#0F172A', margin: 0 }}>{R.insight}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAudit((o) => !o);
                    setTimeout(() => document.getElementById('full-audit')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', marginBottom: 16 }}
                >
                  {showAudit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {showAudit ? 'Hide' : 'View'} full personalised audit report
                </button>

                <AnimatePresence>
                  {showAudit && (
                    <motion.div
                      id="full-audit"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginBottom: 20 }}
                    >
                      <div style={{ background: '#EEEAFB', border: '1px solid #C7BCF5', borderRadius: 12, padding: 22, marginBottom: 14 }}>
                        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>
                          ORVN — Full revenue audit
                        </div>
                        <div style={{ fontFamily: SERIF, fontSize: 22, color: '#0F172A', marginBottom: 4 }}>Revenue Audit Report</div>
                        <div style={{ fontSize: 12, color: '#475569', marginBottom: 12 }}>
                          Prepared {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                          {[
                            ['Leads/mo', R.L],
                            ['Commission', fm(R.C)],
                            ['Current close', pct(R.curCR)],
                            ['Target close', pct(R.tgtCR)],
                            ['Response time', formatResp(R.rt)],
                            ...(R.CRM > 0 ? [['CRM size', R.CRM.toLocaleString()]] : []),
                          ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>{k}:</span>
                              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <AuditPanel number="1" title="Close-rate opportunity analysis">
                        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#065F46' }}>
                          <strong>Finding:</strong> Lifting your close rate from <strong>{pct(R.curCR)}</strong> to a target of <strong>{pct(R.tgtCR)}</strong> models <strong>{R.recoverableDeals.toFixed(1)} additional deals/month</strong>. {R.hasGap ? '' : 'Your target is not above your current rate, so the modeled opportunity is $0.'}
                        </div>
                        <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                          <TblRow header cols={[{ text: 'Metric' }, { text: 'Current' }, { text: 'Target scenario' }, { text: 'Gap' }]} />
                          <TblRow cols={[{ text: 'Close rate' }, { text: pct(R.curCR) }, { text: pct(R.tgtCR), color: GREEN }, { text: R.hasGap ? `+${pct(R.tgtCR - R.curCR)}` : '0%', color: R.hasGap ? GREEN : '#94A3B8' }]} />
                          <TblRow cols={[{ text: 'Deals/month' }, { text: R.currentDeals.toFixed(1) }, { text: R.targetDeals.toFixed(1), color: GREEN }, { text: `+${R.recoverableDeals.toFixed(1)}`, color: GREEN }]} />
                        </div>
                        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                          <div style={{ fontFamily: SERIF, fontSize: 40, color: GREEN, lineHeight: 1, marginBottom: 6 }}>{fm(R.recoverableYear)}</div>
                          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase' }}>
                            Annual recoverable revenue opportunity
                          </div>
                        </div>
                      </AuditPanel>

                      <AuditPanel number="2" title="Response-time risk (qualitative)">
                        <div style={{ background: R.band.bg, border: `1px solid ${R.band.border}`, borderLeft: `3px solid ${R.band.tone}`, borderRadius: 8, padding: '12px 16px', fontSize: 13.5, color: R.band.text }}>
                          <strong>Finding:</strong> Your response time of <strong>{formatResp(R.rt)}</strong> falls in the <strong>{R.band.label}</strong> band.
                        </div>
                        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {[
                            ['Under 5 minutes', 'Target zone'],
                            ['5–15 minutes', 'Early leakage risk'],
                            ['15–60 minutes', 'Meaningful delay'],
                            ['1–4 hours', 'High delay'],
                            ['4+ hours', 'Severe delay'],
                          ].map(([range, label]) => (
                            <div key={range} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #F1F3F9' }}>
                              <span style={{ color: '#475569' }}>{range}</span>
                              <span style={{ fontFamily: MONO, fontSize: 12, color: label === R.band.label ? R.band.tone : '#94A3B8', fontWeight: label === R.band.label ? 700 : 400 }}>{label}</span>
                            </div>
                          ))}
                        </div>
                        <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '12px 0 0', lineHeight: 1.65 }}>
                          Response time is a risk signal, not a revenue multiplier. There is no
                          sourced response-time→conversion distribution behind a dollar figure, so we
                          don’t invent one.
                        </p>
                      </AuditPanel>

                      {R.CRM > 0 && (
                        <AuditPanel number="3" title="Database reactivation (illustrative)">
                          <div style={{ background: '#EEEAFB', border: '1px solid #C7BCF5', borderLeft: `3px solid ${PURPLE}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#3A2899' }}>
                            <strong>Finding:</strong> Your database of <strong>{R.CRM.toLocaleString()} leads</strong> may hold recoverable revenue. The figures below use editable, illustrative assumptions — not research-backed rates.
                          </div>
                          <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Value' }, { text: 'Formula' }, { text: 'Basis' }]} />
                            <TblRow cols={[{ text: 'CRM database' }, { text: `${R.CRM.toLocaleString()} leads` }, { text: 'Your input' }, { text: '—' }]} />
                            <TblRow cols={[{ text: 'Re-engagement rate' }, { text: pct(R.reRate) }, { text: `CRM × ${pct(R.reRate)}` }, { text: 'Illustrative' }]} />
                            <TblRow cols={[{ text: 'Re-engageable leads' }, { text: `${Math.round(R.reactivatable)} leads`, color: PURPLE }, { text: '' }, { text: '' }]} />
                            <TblRow cols={[{ text: 'Reactivation close rate' }, { text: pct1(R.graveyardClose) }, { text: `${pct(R.curCR)} × 40% of current` }, { text: 'Conservative' }]} />
                            <TblRow cols={[{ text: 'Recoverable deals' }, { text: `${R.graveyardDeals.toFixed(1)} deals`, color: PURPLE }, { text: '' }, { text: '' }]} />
                          </div>
                          <div style={{ background: '#EEEAFB', border: '1px solid #C7BCF5', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                            <div style={{ fontFamily: SERIF, fontSize: 40, color: PURPLE, lineHeight: 1, marginBottom: 6 }}>{fm(R.graveyardValue)}</div>
                            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase' }}>
                              Illustrative database reactivation value
                            </div>
                          </div>
                        </AuditPanel>
                      )}

                      {R.ISA > 0 && (
                        <AuditPanel number={R.CRM > 0 ? '4' : '3'} title="ISA coverage & cost context">
                          <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden' }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Human ISA' }, { text: 'PAS' }, { text: 'Note' }]} />
                            <TblRow cols={[{ text: 'Annual cost' }, { text: `${fm(R.ISA)}/yr`, color: RED }, { text: 'Custom early-access quote' }, { text: 'Your input' }]} />
                            <TblRow cols={[{ text: 'Coverage' }, { text: `~${R.isaHoursWeek} hrs/wk (${R.isaAnnualHours.toLocaleString()} hrs/yr)` }, { text: `24/7/365 (${R.pasAnnualHours.toLocaleString()} hrs/yr)`, color: GREEN }, { text: `+${R.coverageGap.toLocaleString()} hrs/yr`, bold: true }]} />
                            <TblRow cols={[{ text: 'Response time' }, { text: 'Varies by rep & shift', color: RED }, { text: 'Consistent, every channel', color: GREEN }, { text: 'Structural' }]} />
                            <TblRow cols={[{ text: 'Turnover risk' }, { text: 'Typically high-turnover', color: RED }, { text: 'Infrastructure', color: GREEN }, { text: 'No re-hire cost' }]} />
                          </div>
                          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '12px 0 0', lineHeight: 1.65 }}>
                            Revenue opportunity and operating-cost savings are different buckets — they
                            are not added together. PAS early-access pricing is quoted per brokerage,
                            so no PAS price is asserted here.
                          </p>
                        </AuditPanel>
                      )}

                      <AuditPanel number={[R.CRM > 0, R.ISA > 0].filter(Boolean).length + 3} title="Summary — opportunity by bucket">
                        <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden' }}>
                          <TblRow header cols={[{ text: 'Bucket' }, { text: 'Annual value' }, { text: 'Confidence' }, { text: '' }]} />
                          <TblRow cols={[{ text: 'Recoverable revenue (close-rate opportunity)' }, { text: fm(R.recoverableYear), color: GREEN, bold: true }, { text: 'Your target scenario' }, { text: '' }]} />
                          {R.CRM > 0 && <TblRow cols={[{ text: 'Database reactivation (illustrative)' }, { text: fm(R.graveyardValue), color: PURPLE, bold: true }, { text: 'Illustrative assumptions' }, { text: '' }]} />}
                          {R.CRM > 0 && (
                            <div style={{ background: '#EEEAFB', borderTop: '2px solid #C7BCF5' }}>
                              <TblRow cols={[{ text: 'Combined upside scenario', bold: true }, { text: fm(R.combinedUpside), color: PURPLE, bold: true }, { text: 'Revenue + reactivation' }, { text: '' }]} />
                            </div>
                          )}
                          {R.ISA > 0 && <TblRow cols={[{ text: 'ISA cost (separate — operating cost, not revenue)' }, { text: `${fm(R.ISA)}/yr` }, { text: 'Context only' }, { text: '' }]} />}
                        </div>

                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {[
                            { n: 1, text: 'This week: stand up a sub-5-minute response mechanism for every inbound channel — the highest-leverage move on response-time risk.' },
                            { n: 2, text: R.CRM > 0 ? `This week: run a re-engagement pass on your database. The ${fm(R.graveyardValue)} above is illustrative — treat it as a hypothesis to test, not a promise.` : 'This week: capture your CRM database size to model database reactivation as a separate bucket.' },
                            { n: 3, text: 'This month: run the Lead Leakage Scorecard to identify the single bottleneck with the highest payoff.' },
                          ].map((s) => (
                            <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 8, padding: '12px 14px' }}>
                              <div style={{ width: 24, height: 24, borderRadius: '50%', background: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                                {s.n}
                              </div>
                              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65, margin: 0 }}>{s.text}</p>
                            </div>
                          ))}
                        </div>

                        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          <Link to="/calculators/leakage" className="btn-secondary">Run Lead Leakage Scorecard</Link>
                          <Link to="/demo" className="btn-primary">Test PAS</Link>
                        </div>
                      </AuditPanel>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  style={{
                    background: '#F7F8FB',
                    border: '1px solid #E5E8F0',
                    borderRadius: 14,
                    padding: 28,
                    marginTop: 8,
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontFamily: SERIF, color: '#0F172A', margin: '0 0 6px' }}>
                        Email me the full audit report.
                      </h3>
                      <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.6 }}>
                        A copy of these numbers, the math, and a one-page diagnosis you can share
                        with your team. No spam.
                      </p>
                    </div>
                    {submitState === 'success' ? (
                      <div
                        style={{
                          background: '#ECFDF5',
                          border: '1px solid #A7F3D0',
                          borderRadius: 10,
                          padding: 16,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          color: '#065F46',
                          fontSize: 14,
                        }}
                      >
                        <CheckCircle2 size={18} /> On its way — check your inbox.
                      </div>
                    ) : (
                      <form
                        onSubmit={handleEmailSubmit}
                        style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
                      >
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@brokerage.com"
                          style={{
                            flex: '1 1 200px',
                            background: '#fff',
                            border: '1px solid #E5E8F0',
                            borderRadius: 10,
                            padding: '12px 14px',
                            fontSize: 14,
                            color: '#0F172A',
                            outline: 'none',
                          }}
                        />
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={submitState === 'loading'}
                          style={{ opacity: submitState === 'loading' ? 0.7 : 1 }}
                        >
                          {submitState === 'loading' ? 'Sending…' : 'Send report'} <ArrowRight size={15} />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </PageWrapper>
  );
}
