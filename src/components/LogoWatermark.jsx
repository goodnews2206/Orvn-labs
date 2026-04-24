import React from 'react';

export default function LogoWatermark() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src="../assets/logo.jpg"
        alt=""
        style={{
          width: 'clamp(300px, 50vw, 600px)',
          height: 'auto',
          opacity: 0.04,
          filter: 'grayscale(100%)',
          userSelect: 'none',
          draggable: false,
        }}
      />
    </div>
  );
}