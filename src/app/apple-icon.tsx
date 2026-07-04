import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS home-screen / apple-touch icon — gradient "MN" monogram.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#22D3EE 0%,#3B82F6 45%,#A855F7 100%)',
          color: '#0A0A0F',
          fontSize: 92,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: -4,
        }}
      >
        MN
      </div>
    ),
    size,
  );
}
