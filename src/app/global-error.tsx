'use client';

// Root-layout crash fallback — must render its own <html>/<body> and stay dependency-free
// (the design system may not be available if layout itself failed).
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          background: '#0E0D0B',
          color: '#EDE9E0',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 400 }}>Something went wrong</h1>
        <p style={{ color: '#A9A296', maxWidth: '28rem' }}>
          The site hit an unexpected error. Reloading usually fixes it.
        </p>
        <button
          onClick={reset}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: '#E8582C',
            color: '#0E0D0B',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
