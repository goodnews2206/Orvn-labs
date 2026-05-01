import React from 'react';

export default function Section({ id, background = 'white', borderTop = false, children, className = '' }) {
  const bg = background === 'surface' ? '#F7F8FB' : background === 'primary' ? '#5B3FD4' : '#FFFFFF';
  return (
    <section
      id={id}
      className={`section-y ${className}`}
      style={{
        background: bg,
        borderTop: borderTop ? '1px solid #E5E8F0' : 'none',
      }}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
