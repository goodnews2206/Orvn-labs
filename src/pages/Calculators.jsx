import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Gauge } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';

const TOOLS = [
  {
    title: 'Lead Leakage Scorecard',
    icon: Gauge,
    blurb:
      'Five-minute diagnostic of where your first-contact layer is leaking. Sub-scores for response time, contact rate, qualification depth, booking, and after-hours. Likely bottleneck and the most direct fix.',
    cta: { to: '/calculators/leakage', label: 'Run the scorecard' },
    bullets: ['8 inputs', 'Plain-English risk level', 'Bottleneck + fix recommendation'],
  },
  {
    title: 'Revenue Calculator',
    icon: Calculator,
    blurb:
      'Conservative estimate of what speed-to-lead delay and CRM graveyards are costing per year. Math shown step by step, every assumption tilted low.',
    cta: { to: '/calculators/revenue', label: 'Run the calculator' },
    bullets: ['6 inputs', 'Audit panels with full math', 'Break-even on PAS Starter'],
  },
];

export default function Calculators() {
  useDocumentMeta({
    title: 'Calculators',
    description:
      'ORVN diagnostics for real estate brokerages: Lead Leakage Scorecard and Revenue Calculator. Five minutes, no signup, math shown.',
    path: '/calculators',
  });

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 760 }}>
          <Eyebrow>Diagnostics</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5.5vw, 60px)', margin: '14px 0 16px' }}>
            Two ways to see where leads are dying.
          </h1>
          <p className="lead">
            Run the numbers in five minutes. No login, no calendar booking, no sales call. Both
            tools run locally in your browser — your inputs stay with you.
          </p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E5E8F0',
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Icon size={32} color="#5B3FD4" style={{ marginBottom: 14 }} />
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, margin: '0 0 12px', color: '#0F172A', lineHeight: 1.15 }}>
                  {t.title}
                </h2>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: '0 0 18px' }}>
                  {t.blurb}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {t.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13.5, color: '#0F172A', display: 'flex', gap: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B3FD4', marginTop: 8, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to={t.cta.to} className="btn-primary" style={{ marginTop: 'auto' }}>
                  {t.cta.label} <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </Section>
    </PageWrapper>
  );
}
