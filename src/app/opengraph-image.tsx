import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.brandName} — ${profile.title}`;

// Branded dark-neon OpenGraph card, generated at build time (no static asset needed).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#0A0A0F',
          backgroundImage:
            'radial-gradient(1000px circle at 15% 0%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(900px circle at 100% 100%, rgba(168,85,247,0.22), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#22D3EE', fontSize: 26, letterSpacing: 6, fontWeight: 700 }}>
          {profile.title.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: '#ECECF1', fontSize: 108, fontWeight: 800, letterSpacing: -3 }}>
            {profile.brandName}
          </div>
          <div style={{ display: 'flex', marginTop: 24, color: '#A0A0B2', fontSize: 34, maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', width: 220, height: 8, borderRadius: 8, background: 'linear-gradient(90deg,#22D3EE,#3B82F6,#A855F7)' }} />
          <div style={{ display: 'flex', color: '#8A8AA0', fontSize: 26 }}>
            Codeforces Expert · 3000+ solved · FastAPI · Next.js · AWS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
