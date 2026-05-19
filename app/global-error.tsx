'use client';

import { useEffect, type CSSProperties } from 'react';

const btnStyle: CSSProperties = {
  background: '#D4FF00',
  color: '#0B0B0B',
  borderRadius: 9999,
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  padding: '10px 24px',
  fontSize: 14,
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#0B0B0B',
          color: '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: '2.25rem',
              margin: '0 0 8px',
              letterSpacing: '0.02em',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, maxWidth: 420, margin: '0 0 32px' }}>
            {error.message || 'A critical error occurred. Please try again.'}
          </p>
          <button type="button" onClick={() => reset()} style={btnStyle}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
