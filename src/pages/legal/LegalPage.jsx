import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import PageWrapper from '../../components/PageWrapper';
import Eyebrow from '../../components/ui/Eyebrow';
import { useDocumentMeta } from '../../lib/seo';

// Shared shell for legal pages. Pass a `sections` array of { heading, body } where body is JSX.
// Keep each legal page itself short — the shell handles layout + nav + meta.
//
// IMPORTANT: All policies on this site are drafts pending review by counsel. The "Last updated"
// header makes that visible to readers; the underlying content is structured so a lawyer can edit
// in place rather than rewrite from scratch.
export default function LegalPage({ title, intro, sections, lastUpdated, path, description }) {
  useDocumentMeta({ title, description: description || intro?.slice(0, 160), path });
  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 800 }}>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', margin: '14px 0 14px' }}>
            {title}
          </h1>
          {intro && <p className="lead" style={{ marginBottom: 16 }}>{intro}</p>}
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderLeft: '3px solid #D97706',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: 13,
              color: '#92400E',
              marginBottom: 14,
            }}
          >
            <strong>Draft policy — pending legal review.</strong> The intent and scope below
            represent ORVN Labs’ current operating practice. Final language will be confirmed with
            counsel before launch.
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(56px, 8vw, 96px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 800 }}>
          {sections.map((s) => (
            <section key={s.heading} style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  fontFamily: "'Instrument Serif', serif",
                  color: '#0F172A',
                  margin: '0 0 12px',
                  lineHeight: 1.2,
                }}
              >
                {s.heading}
              </h2>
              <div style={{ fontSize: 16, lineHeight: 1.75, color: '#0F172A' }}>{s.body}</div>
            </section>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid #E5E8F0', margin: '40px 0 20px' }} />
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
            Questions about this policy? Email{' '}
            <a href="mailto:hello@orvnlabs.com" style={{ color: '#5B3FD4' }}>
              <Mail size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> hello@orvnlabs.com
            </a>
            . See related: <Link to="/legal/privacy" style={{ color: '#5B3FD4' }}>Privacy</Link>,{' '}
            <Link to="/legal/ai-disclosure" style={{ color: '#5B3FD4' }}>AI Disclosure</Link>,{' '}
            <Link to="/legal/data-retention" style={{ color: '#5B3FD4' }}>Data Retention</Link>,{' '}
            <Link to="/legal/acceptable-use" style={{ color: '#5B3FD4' }}>Acceptable Use</Link>,{' '}
            <Link to="/legal/fair-housing" style={{ color: '#5B3FD4' }}>Fair Housing</Link>,{' '}
            <Link to="/legal/terms" style={{ color: '#5B3FD4' }}>Terms</Link>.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

export const P = ({ children }) => (
  <p style={{ margin: '0 0 14px', fontSize: 16, lineHeight: 1.75, color: '#0F172A' }}>{children}</p>
);

export const UL = ({ items }) => (
  <ul style={{ margin: '0 0 14px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16, lineHeight: 1.7, color: '#0F172A' }}>
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);
