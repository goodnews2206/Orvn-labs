import React from 'react';

// Tiny markdown renderer for blog post bodies.
// Supports: ## headings, blank-line paragraph breaks, "- " bullets,
// inline **bold**, _italic_, and inline `code`. No HTML passthrough — input is trusted
// (it lives in src/lib/blog.js and ships with the bundle), but we still escape <>.
const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const inline = (s) => {
  // Order matters: code first to avoid bold/italic inside code.
  let out = escape(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/_([^_]+)_/g, '<em>$1</em>');
  return out;
};

export default function Markdown({ source }) {
  const blocks = [];
  const lines = source.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={i}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(24px, 3vw, 32px)',
            color: '#0F172A',
            margin: '36px 0 14px',
            lineHeight: 1.2,
          }}
        >
          {line.slice(3).trim()}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push(
        <ul
          key={`ul-${i}`}
          style={{
            margin: '0 0 18px',
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            fontSize: 16,
            lineHeight: 1.75,
            color: '#0F172A',
          }}
        >
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inline(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // paragraph: collect contiguous non-empty non-special lines
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('- ')
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p
        key={`p-${i}`}
        style={{
          fontSize: 17,
          lineHeight: 1.75,
          color: '#0F172A',
          margin: '0 0 18px',
        }}
        dangerouslySetInnerHTML={{ __html: inline(para.join(' ')) }}
      />
    );
  }

  return <div>{blocks}</div>;
}
