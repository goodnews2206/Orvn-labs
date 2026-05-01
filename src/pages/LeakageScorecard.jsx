import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle2, Gauge } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Eyebrow from '../components/ui/Eyebrow';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';

const PURPLE = '#5B3FD4';
const RED = '#DC2626';
const AMBER = '#D97706';
const GREEN = '#0D9E6E';
const MONO = "'JetBrains Mono', monospace";
const SERIF = "'Instrument Serif', serif";

const FIRST_CONTACT_OWNERS = [
  'Lead agent or team lead',
  'Inside sales agent (ISA) team',
  'Round-robin to all agents',
  'Voicemail / form replies only',
  'No defined owner',
];

// ─── Scoring helpers ────────────────────────────────────────────────────────
const score = (input) => {
  const {
    leads,
    responseMin,
    contactRate,
    qualRate,
    apptRate,
    afterHoursPct,
    commission,
    leadCost,
  } = input;

  // Each metric is scored 0-100 against an operator-grade benchmark.
  // Lower-is-worse metrics: contact rate, qual rate, appt rate.
  // Higher-is-worse metrics: response time, after-hours leakage.

  const responseScore = (() => {
    if (responseMin <= 5) return 100;
    if (responseMin <= 15) return 80;
    if (responseMin <= 30) return 60;
    if (responseMin <= 60) return 40;
    if (responseMin <= 240) return 20;
    return 5;
  })();

  const contactScore = Math.min(100, Math.max(0, contactRate * 1.25)); // 80% contact = 100
  const qualScore = Math.min(100, Math.max(0, qualRate * 2)); // 50% qual = 100
  const apptScore = Math.min(100, Math.max(0, apptRate * 4)); // 25% appt = 100
  const afterHoursScore = Math.max(0, 100 - afterHoursPct * 1.5); // 67% after-hours w/ no coverage = 0

  const weights = {
    responseScore: 0.28,
    contactScore: 0.18,
    qualScore: 0.18,
    apptScore: 0.20,
    afterHoursScore: 0.16,
  };

  const health =
    responseScore * weights.responseScore +
    contactScore * weights.contactScore +
    qualScore * weights.qualScore +
    apptScore * weights.apptScore +
    afterHoursScore * weights.afterHoursScore;

  // Leakage score: 0-100 where 100 = lots of leakage (inverse of health).
  const leakage = Math.round(100 - health);

  // Risk band
  const risk =
    leakage <= 20 ? 'Low' : leakage <= 40 ? 'Moderate' : leakage <= 65 ? 'High' : 'Critical';

  const breakdown = [
    { name: 'Response time', score: Math.round(responseScore), weight: weights.responseScore },
    { name: 'Contact rate', score: Math.round(contactScore), weight: weights.contactScore },
    { name: 'Qualification depth', score: Math.round(qualScore), weight: weights.qualScore },
    { name: 'Appointment booking', score: Math.round(apptScore), weight: weights.apptScore },
    { name: 'After-hours coverage', score: Math.round(afterHoursScore), weight: weights.afterHoursScore },
  ];

  // Likely bottleneck = lowest sub-score (with weight tiebreak toward higher weight).
  const bottleneck = [...breakdown].sort((a, b) => a.score - b.score || b.weight - a.weight)[0];

  const FIXES = {
    'Response time':
      'Stand up a sub-5-minute response mechanism on every channel. PAS answers under 30 seconds, voice / SMS / chat, around the clock.',
    'Contact rate':
      'Most uncontacted leads are reachable on a different channel or at a different time. PAS works the lead across channels until contact is established or the lead opts out.',
    'Qualification depth':
      'Replace inconsistent intake with a structured qualification flow: intent, budget, timeline, financing, location. PAS captures all five in writing on every lead.',
    'Appointment booking':
      'Stop ending qualified conversations without a booked next step. PAS books directly on the right agent’s calendar with full context attached.',
    'After-hours coverage':
      'Inquiries after 7pm and before 9am are highest-intent and most likely to leak. PAS runs continuously and books for the next available agent slot.',
  };
  const fix = FIXES[bottleneck.name];

  // Missed opportunity estimate
  const idealAppts = leads * 0.35; // operator-grade: 35% of inbound becomes a booked appt
  const actualAppts = leads * (apptRate / 100);
  const missedAppts = Math.max(0, idealAppts - actualAppts);
  const missedClosesEst = missedAppts * 0.18; // ~18% of appts close
  const missedRevenue = missedClosesEst * commission;
  const missedSpend = leadCost > 0 ? leads * (1 - contactRate / 100) * leadCost : 0;

  return {
    health: Math.round(health),
    leakage,
    risk,
    breakdown,
    bottleneck,
    fix,
    missedAppts,
    missedRevenue,
    missedSpend,
  };
};

// ─── Sub components ─────────────────────────────────────────────────────────
function NumberInput({ label, value, set, prefix, suffix, hint, min, max, step = 1 }) {
  return (
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
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: MONO, fontSize: 14, color: '#94A3B8' }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => set(e.target.value)}
          min={min}
          max={max}
          step={step}
          style={{
            width: '100%',
            background: '#F7F8FB',
            border: '1px solid #E5E8F0',
            borderRadius: 10,
            padding: `12px ${suffix ? '34px' : '14px'} 12px ${prefix ? '28px' : '14px'}`,
            fontSize: 15,
            color: '#0F172A',
            fontFamily: MONO,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {suffix && (
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: MONO, fontSize: 13, color: '#94A3B8' }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 6 }}>{hint}</p>}
    </div>
  );
}

function RiskBadge({ risk }) {
  const map = {
    Low: { bg: '#ECFDF5', border: '#A7F3D0', color: '#065F46' },
    Moderate: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E' },
    High: { bg: '#FEF2F2', border: '#FECACA', color: '#991B1B' },
    Critical: { bg: '#FEE2E2', border: '#FCA5A5', color: '#7F1D1D' },
  }[risk] || { bg: '#F7F8FB', border: '#E5E8F0', color: '#475569' };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: map.bg,
        border: `1px solid ${map.border}`,
        color: map.color,
        padding: '6px 14px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {risk === 'Low' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
      First-contact risk: {risk}
    </span>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function LeakageScorecard() {
  useDocumentMeta({
    title: 'Lead Leakage Scorecard',
    description:
      'A five-minute diagnostic of where your real estate brokerage is leaking inbound leads. Identifies the likely bottleneck and the most direct fix.',
    path: '/calculators/leakage',
  });

  const [leads, setLeads] = useState(150);
  const [responseMin, setResponseMin] = useState(45);
  const [contactRate, setContactRate] = useState(55);
  const [qualRate, setQualRate] = useState(28);
  const [apptRate, setApptRate] = useState(15);
  const [afterHoursPct, setAfterHoursPct] = useState(35);
  const [commission, setCommission] = useState(12000);
  const [owner, setOwner] = useState(FIRST_CONTACT_OWNERS[0]);
  const [leadCost, setLeadCost] = useState('');
  const [result, setResult] = useState(null);

  const run = () => {
    const r = score({
      leads: parseFloat(leads) || 0,
      responseMin: parseFloat(responseMin) || 0,
      contactRate: parseFloat(contactRate) || 0,
      qualRate: parseFloat(qualRate) || 0,
      apptRate: parseFloat(apptRate) || 0,
      afterHoursPct: parseFloat(afterHoursPct) || 0,
      commission: parseFloat(commission) || 0,
      leadCost: parseFloat(leadCost) || 0,
    });
    setResult(r);
    setTimeout(() => document.getElementById('scorecard-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(20px, 3vw, 32px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 760 }}>
          <Eyebrow>Lead leakage scorecard</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: '14px 0 16px' }}>
            Where is your first-contact layer leaking?
          </h1>
          <p className="lead">
            A five-minute diagnostic. Eight inputs. Plain-English score, likely bottleneck,
            suggested fix. Runs locally — no signup, no calendar booking.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(20px, 3vw, 40px) 0 clamp(56px, 8vw, 96px)', background: '#F7F8FB', borderTop: '1px solid #E5E8F0' }}>
        <div className="container-page">
          <div
            style={{
              background: '#fff',
              border: '1px solid #E5E8F0',
              borderRadius: 16,
              padding: 'clamp(24px, 4vw, 36px)',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
              <NumberInput label="Monthly inbound leads" value={leads} set={setLeads} hint="All channels combined" />
              <NumberInput label="Avg response time" value={responseMin} set={setResponseMin} suffix="min" hint="Inquiry to first substantive reply" />
              <NumberInput label="Contact rate" value={contactRate} set={setContactRate} suffix="%" hint="Of leads ever reached at all" />
              <NumberInput label="Qualification rate" value={qualRate} set={setQualRate} suffix="%" hint="Of contacted leads with intent + timeline captured" />
              <NumberInput label="Appointment rate" value={apptRate} set={setApptRate} suffix="%" hint="Of inbound leads that become booked appts" />
              <NumberInput label="After-hours lead %" value={afterHoursPct} set={setAfterHoursPct} suffix="%" hint="Inquiries between 7pm and 9am" />
              <NumberInput label="Avg commission per deal" value={commission} set={setCommission} prefix="$" hint="Your take-home per closed deal" />
              <NumberInput label="Avg lead cost (optional)" value={leadCost} set={setLeadCost} prefix="$" hint="What you pay per lead, all sources" />

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
                  Current first-contact owner
                </label>
                <select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#F7F8FB',
                    border: '1px solid #E5E8F0',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 14,
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {FIRST_CONTACT_OWNERS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 6 }}>Who handles inbound first today</p>
              </div>
            </div>

            <button type="button" onClick={run} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 16, marginTop: 28 }}>
              <Gauge size={18} /> Run my leakage scorecard
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                id="scorecard-result"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: 24 }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #E5E8F0',
                    borderRadius: 16,
                    padding: 'clamp(24px, 4vw, 36px)',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, alignItems: 'center', marginBottom: 24 }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8 }}>
                        Leakage score
                      </div>
                      <div
                        style={{
                          fontFamily: SERIF,
                          fontSize: 'clamp(56px, 9vw, 96px)',
                          color: result.leakage <= 20 ? GREEN : result.leakage <= 40 ? AMBER : RED,
                          lineHeight: 1,
                          marginBottom: 8,
                        }}
                      >
                        {result.leakage}
                        <span style={{ fontSize: 24, color: '#94A3B8' }}> / 100</span>
                      </div>
                      <RiskBadge risk={result.risk} />
                    </div>

                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 12 }}>
                        Sub-scores (higher = healthier)
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {result.breakdown.map((b) => (
                          <div key={b.name}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                              <span style={{ color: '#0F172A' }}>{b.name}</span>
                              <span style={{ fontFamily: MONO, color: b.score >= 70 ? GREEN : b.score >= 40 ? AMBER : RED }}>
                                {b.score}/100
                              </span>
                            </div>
                            <div style={{ height: 6, background: '#F1F3F9', borderRadius: 3, overflow: 'hidden' }}>
                              <div
                                style={{
                                  height: '100%',
                                  width: `${b.score}%`,
                                  background: b.score >= 70 ? GREEN : b.score >= 40 ? AMBER : RED,
                                  transition: 'width 0.6s ease',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderLeft: `3px solid ${RED}`,
                      borderRadius: 10,
                      padding: 18,
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, marginBottom: 6 }}>
                      Likely bottleneck
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>
                      {result.bottleneck.name} — {result.bottleneck.score}/100
                    </div>
                    <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.65 }}>{result.fix}</p>
                  </div>

                  {(result.missedRevenue > 0 || result.missedSpend > 0) && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                      {result.missedRevenue > 0 && (
                        <div style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 10, padding: 18 }}>
                          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>
                            Estimated missed revenue / month
                          </div>
                          <div style={{ fontFamily: SERIF, fontSize: 28, color: RED, lineHeight: 1 }}>
                            ${Math.round(result.missedRevenue).toLocaleString()}
                          </div>
                          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
                            ~{result.missedAppts.toFixed(1)} missed appointments × ~18% close × commission
                          </div>
                        </div>
                      )}
                      {result.missedSpend > 0 && (
                        <div style={{ background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 10, padding: 18 }}>
                          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>
                            Wasted lead spend / month
                          </div>
                          <div style={{ fontFamily: SERIF, fontSize: 28, color: AMBER, lineHeight: 1 }}>
                            ${Math.round(result.missedSpend).toLocaleString()}
                          </div>
                          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
                            Cost-per-lead × never-contacted leads
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    background: '#5B3FD4',
                    borderRadius: 16,
                    padding: 'clamp(28px, 4vw, 40px)',
                    color: '#fff',
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 3vw, 32px)', color: '#fff', margin: '0 0 12px' }}>
                    {result.risk === 'Low'
                      ? 'Your first-contact layer is in solid shape.'
                      : `${result.bottleneck.name} is the highest-leverage fix.`}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.7, margin: '0 0 22px', maxWidth: 620 }}>
                    Test PAS on a real conversation, or run the Revenue Calculator to see what the
                    leakage costs in dollars per year.
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link to="/demo" className="btn-primary" style={{ background: '#fff', color: '#5B3FD4' }}>
                      Test PAS <ArrowRight size={16} />
                    </Link>
                    <Link to="/calculators/revenue" className="btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                      Run Revenue Calculator
                    </Link>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
                  <Newsletter source="leakage_scorecard" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}
