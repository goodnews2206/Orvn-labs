import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Markdown from '../components/Markdown';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';
import { getPost, getRelatedPosts } from '../lib/blog';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useDocumentMeta(
    post
      ? {
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          type: 'article',
        }
      : { title: 'Post not found' }
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedPosts(post.slug, 3);

  return (
    <PageWrapper>
      <article style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 760 }}>
          <Link
            to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#5B3FD4', marginBottom: 24 }}
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5B3FD4',
                fontWeight: 600,
              }}
            >
              {post.category}
            </span>
            <span style={{ color: '#CBD5E1' }}>·</span>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>{fmt(post.date)}</span>
            <span style={{ color: '#CBD5E1' }}>·</span>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>{post.readMinutes} min read</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: '0 0 18px' }}>
            {post.title}
          </h1>
          <p className="lead" style={{ marginBottom: 32 }}>{post.excerpt}</p>
        </div>

        <div className="container-page" style={{ maxWidth: 760, paddingBlock: 'clamp(16px, 3vw, 32px)' }}>
          <Markdown source={post.body} />
        </div>

        <div className="container-page" style={{ maxWidth: 760, marginTop: 40 }}>
          <div
            style={{
              background: '#F7F8FB',
              border: '1px solid #E5E8F0',
              borderLeft: '3px solid #5B3FD4',
              borderRadius: 12,
              padding: 'clamp(20px, 3vw, 28px)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
                Run the leakage scorecard while it’s fresh.
              </div>
              <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Five-minute diagnostic. No signup. Your inputs stay with you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/calculators/leakage" className="btn-primary">
                Run scorecard <ArrowRight size={15} />
              </Link>
              <Link to="/demo" className="btn-secondary">Test PAS</Link>
            </div>
          </div>
        </div>
      </article>

      <Section borderTop background="surface">
        <Newsletter source={`blog_post_${post.slug}`} />
      </Section>

      {related.length > 0 && (
        <Section borderTop>
          <h2 className="h-section" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '0 0 20px' }}>
            Keep reading
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {related.map((p) => (
              <article key={p.slug} className="card" style={{ padding: 24 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5B3FD4',
                    marginBottom: 8,
                    display: 'inline-block',
                  }}
                >
                  {p.category}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#0F172A', margin: '0 0 8px', lineHeight: 1.35 }}>
                  <Link to={`/blog/${p.slug}`} style={{ color: '#0F172A' }}>{p.title}</Link>
                </h3>
                <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {p.excerpt}
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}
    </PageWrapper>
  );
}
