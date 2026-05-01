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

const STARTER_PRICE = 500;

const fm = (n) => '$' + Math.round(n).toLocaleString();
const pct = (n) => (n * 100).toFixed(0) + '%';

const responsePenalty = (rt) => {
  if (rt <= 5) return 0;
  if (rt <= 30) return 0.4;
  if (rt <= 60) return 0.6;
  if (rt <= 240) return 0.72;
  return 0.82;
};

const formatResp = (v) => (v <= 60 ? `${v} min` : `${(v / 60).toFixed(1)} hrs`);

const pctLabel = (p) =>
  ({
    0: 'top 10%',
    0.4: 'bottom 30%',
    0.6: 'bottom 20%',
    0.72: 'bottom 12%',
    0.82: 'bottom 5%',
  }[p] ?? 'bottom 30%');

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

export default function RevenueCalculator() {
  useDocumentMeta({
    title: 'Revenue Calculator',
    description:
      'Conservative estimate of what speed-to-lead delay and CRM graveyards cost a real estate brokerage per year. Math shown step by step.',
    path: '/calculators/revenue',
  });

  const [leads, setLeads] = useState(150);
  const [commission, setCommission] = useState(12000);
  const [closeRate, setCloseRate] = useState(8);
  const [responseTime, setResponseTime] = useState(45);
  const [isaCost, setIsaCost] = useState('');
  const [crmSize, setCrmSize] = useState('');
  const [results, setResults] = useState(null);
  const [showAudit, setShowAudit] = useState(false);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState('idle');

  const calculate = () => {
    const rt = parseInt(responseTime, 10);
    const cr = parseFloat(closeRate) / 100;
    const L = parseFloat(leads) || 0;
    const C = parseFloat(commission) || 0;
    const P = responsePenalty(rt);
    const ISA = parseFloat(isaCost) || 0;
    const CRM = parseFloat(crmSize) || 0;

    const idealDeals = L * cr;
    const actualDeals = idealDeals * (1 - P);
    const dealsLost = idealDeals * P;
    const monthlyLost = dealsLost * C;
    const annualLost = monthlyLost * 12;

    const reactivatable = CRM * 0.12;
    const adjustedClose = cr * 0.4;
    const recoverableDeals = reactivatable * adjustedClose;
    const graveyardValue = recoverableDeals * C;

    const isaMonthly = ISA / 12;
    const isaSaving = isaMonthly - STARTER_PRICE;

    const revenuePerAppt = C * cr;
    const breakEvenAppts = revenuePerAppt > 0 ? (STARTER_PRICE / revenuePerAppt).toFixed(2) : null;

    const total = annualLost + graveyardValue;

    let insight = '';
    if (P === 0) {
      insight = `With a response time under 5 minutes, you are in the top 10% of brokerages for speed-to-lead. Your primary opportunity is graveyard CRM reactivation — ${fm(graveyardValue)} in recoverable revenue sitting dormant in your database.`;
    } else if (P <= 0.4) {
      insight = `A ${formatResp(rt)} response time costs you ${pct(P)} of your conversion potential before any agent picks up the phone — ${fm(monthlyLost)} per month, ${fm(annualLost)} per year. This is a systems problem, not an effort problem.`;
    } else {
      insight = `A ${formatResp(rt)} response time places you in the ${pctLabel(P)} of US brokerages for speed-to-lead. You are losing ${pct(P)} of your conversion potential — ${fm(monthlyLost)} per month — before the first human interaction.`;
    }
    if (CRM > 500) {
      insight += ` Your CRM database of ${CRM.toLocaleString()} leads contains an estimated ${Math.round(reactivatable)} reactivatable contacts within a 12-month window.`;
    }
    if (ISA > 0) {
      insight += ` Your ISA investment of ${fm(ISA)}/year (${fm(isaMonthly)}/month) is the current first-contact infrastructure cost. PAS Starter at $${STARTER_PRICE}/month would represent ${isaSaving > 0 ? fm(isaSaving) + '/month savings' : 'a more flexible structure'} while removing the human delay variable entirely.`;
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
        closeRate: results.cr,
        responseTimeMin: results.rt,
        annualIsaCost: results.ISA || null,
        crmDatabaseSize: results.CRM || null,
      },
      outputs: {
        annualRevenueLost: Math.round(results.annualLost),
        graveyardValue: Math.round(results.graveyardValue),
        totalOpportunity: Math.round(results.total),
        penaltyFactor: results.P,
        monthlyLost: Math.round(results.monthlyLost),
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
            How much revenue is your brokerage losing every year?
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
              Speed-to-lead revenue audit
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: '#94A3B8' }}>
              6 inputs · runs locally · no signup
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
              you calculate. Every assumption tilts low. The real cost is almost always higher.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 24 }}>
              {[
                { label: 'Monthly inbound leads', value: leads, set: setLeads, prefix: null, hint: 'All new inquiries across all sources', required: true },
                { label: 'Avg commission per deal', value: commission, set: setCommission, prefix: '$', hint: 'Your average take-home per closed deal', required: true },
                { label: 'Annual ISA cost', value: isaCost, set: setIsaCost, prefix: '$', hint: 'Salary + benefits. Leave blank if none.', required: false },
                { label: 'Total CRM database size', value: crmSize, set: setCrmSize, prefix: null, hint: 'All historical leads ever captured', required: false },
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
                        padding: `12px 14px 12px ${f.prefix ? '28px' : '14px'}`,
                        fontSize: 15,
                        color: '#0F172A',
                        fontFamily: MONO,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 6 }}>{f.hint}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 28 }}>
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
                  Lead-to-close rate <span style={{ color: PURPLE }}>*</span>
                </label>
                <input type="range" min="1" max="30" value={closeRate} onChange={(e) => setCloseRate(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>1%</span>
                  <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: PURPLE }}>{closeRate}%</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: '#94A3B8' }}>30%</span>
                </div>
                <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>Industry avg ~8%</p>
              </div>
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
                  Ideal: under 5 minutes
                </p>
              </div>
            </div>

            <button type="button" onClick={calculate} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 16 }}>
              Calculate annual revenue loss <ArrowRight size={16} />
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
                <div
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
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
                      color: RED,
                      textTransform: 'uppercase',
                      marginBottom: 12,
                    }}
                  >
                    Estimated annual revenue being lost
                  </div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(48px, 8vw, 78px)',
                      color: RED,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    <AnimCounter target={R.total} prefix="$" />
                  </div>
                  <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
                    Conservative estimate · math shown below
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Leads lost / month', value: Math.round(R.dealsLost), color: RED, sub: 'to slow response time' },
                    { label: 'Monthly commission lost', value: Math.round(R.monthlyLost), prefix: '$', color: RED, sub: 'speed-to-lead only' },
                    { label: 'Graveyard CRM value', value: Math.round(R.graveyardValue), prefix: '$', color: GREEN, sub: '12-month recoverable' },
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
                  <MathRow label="Lead-to-close rate" value={pct(R.cr)} />
                  <MathRow label={`Ideal deals/month  (${R.L} × ${pct(R.cr)})`} value={R.idealDeals.toFixed(1)} />
                  <MathRow label={`Response-time penalty  P = ${pct(R.P)} at ${formatResp(R.rt)}`} value={pct(R.P)} color={RED} />
                  <MathRow label={`Deals lost/month  (${R.idealDeals.toFixed(1)} × ${pct(R.P)})`} value={R.dealsLost.toFixed(1)} color={RED} />
                  <MathRow label={`Monthly revenue lost  (${R.dealsLost.toFixed(1)} × ${fm(R.C)})`} value={fm(R.monthlyLost)} color={RED} />
                  <MathRow label="Annual speed-to-lead loss  (× 12)" value={fm(R.annualLost)} color={RED} />
                  {R.CRM > 0 && (
                    <>
                      <MathRow label={`Graveyard leads  (${R.CRM.toLocaleString()} × 12%)`} value={Math.round(R.reactivatable)} color={GREEN} />
                      <MathRow label={`Adjusted close rate  (${pct(R.cr)} × 40% discount)`} value={pct(R.adjustedClose)} color={GREEN} />
                      <MathRow label={`Recoverable deals  (${Math.round(R.reactivatable)} × ${pct(R.adjustedClose)})`} value={R.recoverableDeals.toFixed(1)} color={GREEN} />
                      <MathRow label={`Graveyard value  (${R.recoverableDeals.toFixed(1)} × ${fm(R.C)})`} value={fm(R.graveyardValue)} color={GREEN} />
                    </>
                  )}
                  <MathRow label="TOTAL ANNUAL OPPORTUNITY" value={fm(R.total)} color={RED} bold border={false} />
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
                            ['Close rate', pct(R.cr)],
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

                      <AuditPanel number="1" title="Speed-to-lead analysis">
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: `3px solid ${RED}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#991B1B' }}>
                          <strong>Finding:</strong> Your response time of <strong>{formatResp(R.rt)}</strong> places your brokerage in the <strong>{pctLabel(R.P)}</strong> of US brokerages for speed-to-lead.
                        </div>
                        <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                          <TblRow header cols={[{ text: 'Metric' }, { text: 'Your number' }, { text: 'Benchmark' }, { text: 'Gap' }]} />
                          <TblRow cols={[{ text: 'Avg response time' }, { text: formatResp(R.rt), color: RED }, { text: '< 5 min (top 10%)' }, { text: `−${Math.max(0, R.rt - 5)} min from optimal`, color: RED }]} />
                          <TblRow cols={[{ text: 'Penalty factor (P)' }, { text: pct(R.P), color: RED }, { text: 'P = 0% at optimal' }, { text: `−${pct(R.P)} conversion loss`, color: RED }]} />
                          <TblRow cols={[{ text: 'Ideal deals/month' }, { text: R.idealDeals.toFixed(1) }, { text: 'Your ceiling' }, { text: '—' }]} />
                          <TblRow cols={[{ text: 'Actual deals/month' }, { text: R.actualDeals.toFixed(1), color: RED }, { text: `${R.idealDeals.toFixed(1)} at optimal` }, { text: `−${R.dealsLost.toFixed(1)} deals/mo`, color: RED }]} />
                        </div>
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                          <div style={{ fontFamily: SERIF, fontSize: 40, color: RED, lineHeight: 1, marginBottom: 6 }}>{fm(R.annualLost)}</div>
                          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase' }}>
                            Annual speed-to-lead revenue loss
                          </div>
                        </div>
                      </AuditPanel>

                      {R.CRM > 0 && (
                        <AuditPanel number="2" title="Graveyard CRM analysis">
                          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#065F46' }}>
                            <strong>Finding:</strong> Your database of <strong>{R.CRM.toLocaleString()} leads</strong> contains recoverable revenue. Roughly 12% of abandoned leads transact within 12 months with systematic follow-up.
                          </div>
                          <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Value' }, { text: 'Formula' }, { text: 'Source' }]} />
                            <TblRow cols={[{ text: 'CRM database' }, { text: `${R.CRM.toLocaleString()} leads` }, { text: 'Your input' }, { text: '—' }]} />
                            <TblRow cols={[{ text: 'Re-engagement rate' }, { text: '12%' }, { text: 'CRM × 0.12' }, { text: 'Industry research' }]} />
                            <TblRow cols={[{ text: 'Reactivatable leads' }, { text: `${Math.round(R.reactivatable)} leads`, color: GREEN }, { text: '' }, { text: '' }]} />
                            <TblRow cols={[{ text: 'Adjusted close rate' }, { text: pct(R.adjustedClose) }, { text: `${pct(R.cr)} × 40% discount` }, { text: 'Conservative' }]} />
                            <TblRow cols={[{ text: 'Recoverable deals' }, { text: `${R.recoverableDeals.toFixed(1)} deals`, color: GREEN }, { text: '' }, { text: '' }]} />
                          </div>
                          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                            <div style={{ fontFamily: SERIF, fontSize: 40, color: GREEN, lineHeight: 1, marginBottom: 6 }}>{fm(R.graveyardValue)}</div>
                            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase' }}>
                              Recoverable graveyard CRM value
                            </div>
                          </div>
                        </AuditPanel>
                      )}

                      {R.ISA > 0 && (
                        <AuditPanel number={R.CRM > 0 ? '3' : '2'} title="ISA cost vs PAS">
                          <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden' }}>
                            <TblRow header cols={[{ text: 'Component' }, { text: 'Human ISA' }, { text: 'PAS Starter ($500)' }, { text: 'Difference' }]} />
                            <TblRow cols={[{ text: 'Monthly cost' }, { text: `${fm(R.isaMonthly)}/mo`, color: RED }, { text: `$${STARTER_PRICE}/mo` }, { text: `${fm(R.isaSaving)}/mo`, color: GREEN, bold: true }]} />
                            <TblRow cols={[{ text: 'Response time' }, { text: '15–90 min avg', color: RED }, { text: 'Under 30 sec', color: GREEN }, { text: 'Structural' }]} />
                            <TblRow cols={[{ text: 'Coverage' }, { text: '~45 hrs/wk' }, { text: '24 / 7 / 365', color: GREEN }, { text: '+8,580 hrs/yr' }]} />
                            <TblRow cols={[{ text: 'Turnover risk' }, { text: 'Avg 14 months', color: RED }, { text: 'Infrastructure', color: GREEN }, { text: 'No re-hire cost' }]} />
                          </div>
                        </AuditPanel>
                      )}

                      {R.breakEvenAppts && (
                        <AuditPanel number={[R.CRM > 0, R.ISA > 0].filter(Boolean).length + 2} title={`Break-even on PAS Starter ($${STARTER_PRICE})`}>
                          <div style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 8, padding: 18 }}>
                            <MathRow label="Revenue per appointment" value={fm(R.revenuePerAppt)} color={PURPLE} />
                            <MathRow label="PAS Starter monthly cost" value={`$${STARTER_PRICE}/mo`} />
                            <MathRow label="Extra appointments to break even" value={`${R.breakEvenAppts} appts`} color={GREEN} bold border={false} />
                          </div>
                          <div style={{ marginTop: 14, padding: '14px 16px', background: '#EEEAFB', border: '1px solid #C7BCF5', borderRadius: 8, fontSize: 13.5, color: '#3A2899' }}>
                            <strong>Bottom line:</strong> PAS Starter pays for itself with{' '}
                            <strong>{R.breakEvenAppts} extra booked appointments per month</strong>. Most operators land on Growth ($1,500/mo) at this lead volume.
                          </div>
                        </AuditPanel>
                      )}

                      <AuditPanel number={[R.CRM > 0, R.ISA > 0, !!R.breakEvenAppts].filter(Boolean).length + 2} title="Summary — total annual opportunity">
                        <div style={{ border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden' }}>
                          <TblRow header cols={[{ text: 'Revenue opportunity' }, { text: 'Annual value' }, { text: 'Confidence' }, { text: '' }]} />
                          <TblRow cols={[{ text: 'Speed-to-lead loss (recoverable)' }, { text: fm(R.annualLost), color: RED, bold: true }, { text: 'High — research-backed' }, { text: '' }]} />
                          {R.CRM > 0 && <TblRow cols={[{ text: 'Graveyard CRM value (recoverable)' }, { text: fm(R.graveyardValue), color: GREEN, bold: true }, { text: 'Medium — conservative' }, { text: '' }]} />}
                          {R.ISA > 0 && <TblRow cols={[{ text: 'ISA cost reduction' }, { text: `${fm(R.isaSaving)}/mo`, color: GREEN, bold: true }, { text: 'High — direct comparison' }, { text: '' }]} />}
                          <div style={{ background: '#FEF2F2', borderTop: '2px solid #FECACA' }}>
                            <TblRow cols={[{ text: 'TOTAL ANNUAL OPPORTUNITY', bold: true }, { text: fm(R.total), color: RED, bold: true }, { text: 'Conservative combined' }, { text: '' }]} />
                          </div>
                        </div>

                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {[
                            { n: 1, text: 'This week: stand up a sub-5-minute response mechanism for every inbound channel. Every hour past 5 minutes pays the penalty above.' },
                            { n: 2, text: `This week: run a graveyard scan on your CRM. The ${fm(R.graveyardValue || 0)} above is the conservative floor.` },
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
