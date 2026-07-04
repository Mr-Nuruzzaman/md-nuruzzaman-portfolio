import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0A0F',
          elev: '#111119',
        },
        surface: {
          DEFAULT: '#16161F',
          2: '#1D1D2A',
        },
        border: {
          DEFAULT: '#262633',
          glow: '#3A3A55',
        },
        content: {
          DEFAULT: '#ECECF1',
          muted: '#A0A0B2',
          dim: '#8A8AA0', // ≥4.5:1 on bg for AA text contrast
        },
        accent: {
          DEFAULT: '#22D3EE', // cyan
          2: '#A855F7', // violet
          3: '#3B82F6', // blue
          pink: '#EC4899',
        },
        success: '#34D399',
        warning: '#FBBF24',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        heading: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h3: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      maxWidth: {
        container: '1200px',
        wide: '1440px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 45%, #A855F7 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 0 1px rgba(34,211,238,.3), 0 8px 32px -8px rgba(34,211,238,.35)',
        'glow-violet': '0 0 40px -10px rgba(168,85,247,.45)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          // Translate-only so the blurred mesh stays on the compositor (no scale repaint).
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(40px,-30px)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        drift: 'drift 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
