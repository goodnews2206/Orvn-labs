import React from 'react';
import { Link } from 'react-router-dom';

const styleFor = (variant) => {
  if (variant === 'primary') return 'btn-primary';
  if (variant === 'ghost') return 'btn-ghost';
  return 'btn-secondary';
};

export default function Button({
  to,
  href,
  external,
  onClick,
  variant = 'primary',
  type = 'button',
  children,
  className = '',
  ...rest
}) {
  const cls = `${styleFor(variant)} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
