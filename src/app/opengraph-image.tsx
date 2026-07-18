import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.brandName} — ${profile.title}`;

// Branded Midnight Signal OpenGraph card, generated at build time (no static asset needed).
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        backgroundColor: '#0A1628',
        backgroundImage:
          'radial-gradient(1000px circle at 15% 0%, rgba(94,234,212,0.12), transparent 45%), radial-gradient(900px circle at 100% 100%, rgba(45,212,191,0.10), transparent 45%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', color: '#5EEAD4', fontSize: 26, letterSpacing: 6, fontWeight: 700 }}>
        {profile.title.toUpperCase()}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', color: '#E6EEFB', fontSize: 108, fontWeight: 800, letterSpacing: -3 }}>
          {profile.brandName}
        </div>
        <div style={{ display: 'flex', marginTop: 24, color: '#9FB2CC', fontSize: 34, maxWidth: 900 }}>
          {profile.tagline}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', width: 220, height: 8, borderRadius: 8, background: '#5EEAD4' }} />
        <div style={{ display: 'flex', color: '#9FB2CC', fontSize: 26 }}>
          Codeforces Expert · 3000+ solved · FastAPI · Next.js · AWS
        </div>
      </div>
    </div>,
    size,
  );
}
