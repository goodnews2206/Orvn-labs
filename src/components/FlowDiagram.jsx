import React from 'react';
import { ArrowRight } from 'lucide-react';

const DEFAULT_STEPS = [
  { label: 'Lead inquiry', tone: 'neutral' },
  { label: 'PAS', tone: 'primary' },
  { label: 'Qualified', tone: 'primary' },
  { label: 'Routed / Booked', tone: 'primary' },
  { label: 'Logged', tone: 'ok' },
];

const tone = (t) => {
  if (t === 'primary')
    return { bg: '#EEEAFB', border: '#C7BCF5', color: '#3A2899', dot: '#5B3FD4' };
  if (t === 'ok')
    return { bg: '#ECFDF5', border: '#A7F3D0', color: '#065F46', dot: '#0D9E6E' };
  if (t === 'risk')
    return { bg: '#FEF2F2', border: '#FECACA', color: '#991B1B', dot: '#DC2626' };
  return { bg: '#F7F8FB', border: '#E5E8F0', color: '#0F172A', dot: '#94A3B8' };
};

export default function FlowDiagram({ steps = DEFAULT_STEPS, label = 'How a lead flows through PAS' }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 16,
        padding: 'clamp(20px, 3vw, 28px)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)',
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#94A3B8',
          marginBottom: 18,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {steps.map((s, i) => {
          const t = tone(s.tone);
          return (
            <React.Fragment key={s.label}>
              <div
                style={{
                  flex: '1 1 140px',
                  minWidth: 120,
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  color: t.color,
                  borderRadius: 10,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: t.dot,
                    flexShrink: 0,
                  }}
                />
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#94A3B8',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={16} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
