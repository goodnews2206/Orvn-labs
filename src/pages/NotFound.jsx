import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', path: '/404' });
  return (
    <PageWrapper>
      <section
        style={{
          minHeight: 'calc(100vh - 240px)',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(48px, 8vw, 96px) 0',
          background: '#fff',
        }}
      >
        <div className="container-page" style={{ maxWidth: 720 }}>
          <Eyebrow>404</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', margin: '14px 0 16px' }}>
            That page isn’t here.
          </h1>
          <p className="lead" style={{ marginBottom: 24 }}>
            It may have moved, or it never existed. Try one of the routes below — or head back to
            the home page.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link to="/" className="btn-primary">Go home <ArrowRight size={15} /></Link>
            <Link to="/pas" className="btn-secondary">PAS</Link>
            <Link to="/calculators" className="btn-secondary">Calculators</Link>
            <Link to="/blog" className="btn-secondary">Blog</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
