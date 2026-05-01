import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Database, Users, FileSearch } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const TIERS = [
  {
    name: 'Starter',
    price: 500,
    credits: '1,000 PAS Credits / month',
    forWho: 'Small teams testing PAS on a single channel.',
    features: [
      'Inbound first-contact coverage',
      'Qualification + booking',
      'Single CRM write-back',
      'Standard routing rules',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: 1500,
    credits: '4,000 PAS Credits / month',
    forWho: 'Growing brokerages with active lead flow across multiple channels.',
    highlight: true,
    features: [
      'Voice + SMS + chat coverage',
      'Multi-rule routing',
      '24 / 7 after-hours capture',
      'PAS Intelligence Reports (weekly)',
      'CRM bidirectional sync',
      'Priority support',
    ],
  },
  {
    name: 'Scale',
    price: 3500,
    credits: '12,000 PAS Credits / month',
    forWho: 'High-volume teams routing inbound across many agents.',
    features: [
      'Everything in Growth',
      'Custom routing logic',
      'Multi-team / multi-calendar support',
      'Dedicated onboarding',
      'Quarterly performance review',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    credits: 'Custom volume',
    forWho: 'Multi-office brokerages, complex CRM integrations, custom workflows, SLA.',
    features: [
      'Everything in Scale',
      'Multi-office deployment',
      'Custom CRM integrations',
      'Custom data residency',
      'SLA + named CSM',
    ],
  },
];

const ALL_PLAN_FEATURES = [
  { icon: ShieldCheck, label: 'Fair Housing guardrails on every conversation' },
  { icon: Database, label: 'Structured records on every interaction' },
  { icon: Users, label: 'Routing to your existing agents — no replacement' },
  { icon: FileSearch, label: 'Full conversation logs in the PAS Control Room' },
];

function Hero() {
  return (
    <section style={{ padding: 'clamp(56px, 7vw, 96px) 0 clamp(32px, 4vw, 56px)', background: '#fff' }}>
      <div className="container-page" style={{ maxWidth: 880 }}>
        <Eyebrow>Pricing — early access</Eyebrow>
        <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', margin: '14px 0 18px' }}>
          Priced against what leakage already costs you.
        </h1>
        <p className="lead" style={{ maxWidth: 700 }}>
          ISA cost. Missed appointments. Wasted lead spend. PAS is priced as infrastructure, not a
          subscription experiment. Most operators run on Growth.
        </p>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <Section borderTop>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {TIERS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            style={{
              background: '#fff',
              border: t.highlight ? '1.5px solid #5B3FD4' : '1px solid #E5E8F0',
              borderRadius: 16,
              padding: 28,
              position: 'relative',
              boxShadow: t.highlight
                ? '0 0 0 6px rgba(91,63,212,0.08), 0 12px 28px rgba(15,23,42,0.08)'
                : '0 1px 2px rgba(15,23,42,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {t.highlight && (
              <span
                style={{
                  position: 'absolute',
                  top: -12,
                  left: 24,
                  background: '#5B3FD4',
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 999,
                  padding: '5px 12px',
                }}
              >
                Most operators
              </span>
            )}
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 12 }}>{t.name}</div>
            <div style={{ marginBottom: 8 }}>
              {typeof t.price === 'number' ? (
                <>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, color: '#0F172A', lineHeight: 1 }}>
                    ${t.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 14, color: '#94A3B8', marginLeft: 4 }}>/mo</span>
                </>
              ) : (
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, color: '#0F172A', lineHeight: 1 }}>
                  Custom
                </span>
              )}
            </div>
            <div style={{ fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace", color: '#475569', marginBottom: 14 }}>
              {t.credits}
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 18px' }}>{t.forWho}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {t.features.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: '#0F172A' }}>
                  <Check size={15} color="#0D9E6E" style={{ flexShrink: 0, marginTop: 2 }} /> {f}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto' }}>
              {t.name === 'Enterprise' ? (
                <a href="mailto:hello@orvnlabs.com?subject=PAS%20Enterprise%20enquiry" className="btn-primary" style={{ width: '100%' }}>
                  Talk to ORVN <ArrowRight size={15} />
                </a>
              ) : (
                <a
                  href={PAS_LINKS.earlyAccess}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.highlight ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  Apply for early access <ArrowRight size={15} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: '#475569', marginTop: 26, maxWidth: 760, lineHeight: 1.7 }}>
        Deployment and setup fees vary based on lead volume, integrations, routing complexity, and
        onboarding needs. Quoted per brokerage during early access.
      </p>
    </Section>
  );
}

function Included() {
  return (
    <Section background="surface" borderTop>
      <Eyebrow>In every plan</Eyebrow>
      <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 28px', maxWidth: 720 }}>
        The non-negotiables.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {ALL_PLAN_FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="card" style={{ padding: 22, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 9, background: '#EEEAFB', color: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} />
              </span>
              <p style={{ fontSize: 14, color: '#0F172A', margin: 0, lineHeight: 1.55 }}>{f.label}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function PositionedAgainst() {
  const rows = [
    { item: 'Full-time ISA', cost: '$70,000–$90,000 / year + benefits + turnover' },
    { item: 'Missed-appointment opportunity cost', cost: 'One commission per missed booking' },
    { item: 'Wasted lead spend on un-contacted leads', cost: 'Cost-per-lead × never-contacted rate' },
    { item: 'Operational delay (hours-to-first-response)', cost: 'Conversion decay across the funnel' },
    { item: 'PAS Growth plan', cost: '$1,500 / month — covers the first-contact layer' },
  ];
  return (
    <Section borderTop>
      <Eyebrow>How to think about pricing</Eyebrow>
      <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 24px', maxWidth: 720 }}>
        What PAS is competing against.
      </h2>
      <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #E5E8F0', borderRadius: 14 }}>
        <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F7F8FB', borderBottom: '1px solid #E5E8F0' }}>
              <th style={thStyle}>Line item</th>
              <th style={thStyle}>What it costs today</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.item} style={{ borderBottom: '1px solid #F1F3F9' }}>
                <td style={{ ...tdStyle, color: '#0F172A', fontWeight: 500, width: '40%' }}>{r.item}</td>
                <td style={tdStyle}>{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 13, color: '#475569', marginTop: 16, maxWidth: 720 }}>
        Compare PAS to the cost of the leakage it prevents, not to a generic SaaS subscription.
        The{' '}
        <Link to="/calculators/leakage" style={{ color: '#5B3FD4', fontWeight: 500 }}>
          Lead Leakage Scorecard
        </Link>{' '}
        and{' '}
        <Link to="/calculators/revenue" style={{ color: '#5B3FD4', fontWeight: 500 }}>
          Revenue Calculator
        </Link>{' '}
        give you the numbers in five minutes.
      </p>
    </Section>
  );
}

function Final() {
  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 720 }}>
        <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '0 0 16px' }}>
          Not sure which plan fits?
        </h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          Apply for early access. We will look at your inbound volume, channels, and routing rules,
          and recommend a plan based on actual usage — not a pre-set tier.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={PAS_LINKS.earlyAccess} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Apply for early access <ArrowRight size={15} />
          </a>
          <Link to="/calculators/leakage" className="btn-secondary">Run leakage scorecard first</Link>
        </div>
      </div>
    </Section>
  );
}

export default function Pricing() {
  useDocumentMeta({
    title: 'Pricing',
    description:
      'PAS pricing for real estate brokerages. Starter, Growth, Scale, and Enterprise plans. Priced against ISA cost, missed appointments, and wasted lead spend.',
    path: '/pricing',
  });
  return (
    <PageWrapper>
      <Hero />
      <Tiers />
      <Included />
      <PositionedAgainst />
      <Final />
    </PageWrapper>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '14px 18px',
  fontSize: 12,
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#475569',
  fontWeight: 600,
};
const tdStyle = {
  padding: '14px 18px',
  fontSize: 14,
  color: '#475569',
};
