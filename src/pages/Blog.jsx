import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';
import { CATEGORIES, getAllPosts } from '../lib/blog';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function Blog() {
  useDocumentMeta({
    title: 'First-Contact Intelligence',
    description:
      'Field notes on how real estate brokerages lose, recover, and convert inbound leads. Lead leakage, CRM graveyards, ISA operations, agent handoffs, and PAS build notes.',
    path: '/blog',
  });

  const allPosts = useMemo(() => getAllPosts(), []);
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? allPosts : allPosts.filter((p) => p.category === category);

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 800 }}>
          <Eyebrow>First-Contact Intelligence</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5.5vw, 60px)', margin: '14px 0 16px' }}>
            Field notes on lead conversion.
          </h1>
          <p className="lead">
            Weekly, operator-grade writing on speed-to-lead, ISA failure, CRM graveyards, agent
            handoffs, after-hours leads, and the build of PAS.
          </p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 28,
          }}
        >
          {['All', ...CATEGORIES].map((cat) => {
            const active = cat === category;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  background: active ? '#5B3FD4' : '#fff',
                  color: active ? '#fff' : '#475569',
                  border: `1px solid ${active ? '#5B3FD4' : '#E5E8F0'}`,
                  borderRadius: 999,
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="card"
              style={{ padding: 28, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5B3FD4',
                  }}
                >
                  {p.category}
                </span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{fmt(p.date)}</span>
              </div>
              <h2 style={{ fontSize: 21, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#0F172A', margin: '0 0 12px', lineHeight: 1.3 }}>
                <Link to={`/blog/${p.slug}`} style={{ color: '#0F172A' }}>{p.title}</Link>
              </h2>
              <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>
                {p.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/blog/${p.slug}`} style={{ fontSize: 13, fontWeight: 600, color: '#5B3FD4', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Read post <ArrowRight size={14} />
                </Link>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{p.readMinutes} min read</span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, marginTop: 32 }}>
            No posts in this category yet.
          </p>
        )}
      </Section>

      <Section borderTop>
        <Newsletter source="blog_index" />
      </Section>
    </PageWrapper>
  );
}
