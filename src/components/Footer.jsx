import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import { PAS_LINKS } from '../lib/pas';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'PAS — Performative AI Superstaff', to: '/pas' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Test PAS', to: '/demo' },
      { label: 'PAS Control Room', href: PAS_LINKS.controlRoom, external: true },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Lead Leakage Scorecard', to: '/calculators/leakage' },
      { label: 'Revenue Calculator', to: '/calculators/revenue' },
      { label: 'All Calculators', to: '/calculators' },
    ],
  },
  {
    title: 'Intelligence',
    links: [
      { label: 'First-Contact Intelligence (Blog)', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Terms of Use', to: '/legal/terms' },
      { label: 'AI / Call Recording Disclosure', to: '/legal/ai-disclosure' },
      { label: 'Data Retention Policy', to: '/legal/data-retention' },
      { label: 'Acceptable Use Policy', to: '/legal/acceptable-use' },
      { label: 'Fair Housing Compliance', to: '/legal/fair-housing' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: '#F7F8FB',
        borderTop: '1px solid #E5E8F0',
        padding: '64px 0 28px',
      }}
    >
      <div className="container-page">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 36,
            marginBottom: 48,
          }}
        >
          <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) repeat(auto-fit, minmax(160px, 1fr))', gap: 36 }}>
            <div>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Logo size={32} />
                <span style={{ fontWeight: 700, fontSize: 17, color: '#0F172A' }}>
                  ORVN <span style={{ color: '#5B3FD4' }}>Labs</span>
                </span>
              </Link>
              <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
                Brokerage intelligence infrastructure. PAS controls what happens between inquiry and qualified appointment.
              </p>
              <a
                href="mailto:hello@orvnlabs.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 16,
                  fontSize: 13,
                  color: '#475569',
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} /> hello@orvnlabs.com
              </a>
            </div>

            {COLS.map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#94A3B8',
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          style={{ fontSize: 13.5, color: '#475569', textDecoration: 'none' }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          style={{ fontSize: 13.5, color: '#475569', textDecoration: 'none' }}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            paddingTop: 24,
            borderTop: '1px solid #E5E8F0',
          }}
        >
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>
            © {year} ORVN Labs. Built for real estate brokerages. PAS is a product of ORVN Labs.
          </p>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>
            Not affiliated with Fair Housing enforcement agencies. Not a CRM.
          </p>
        </div>
      </div>
    </footer>
  );
}
