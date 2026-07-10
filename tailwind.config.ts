import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm ink monochrome — depth comes from lightness shifts, not hue or glow.
        bg: {
          DEFAULT: '#0E0D0B',
          elev: '#14120F',
        },
        surface: {
          DEFAULT: '#191713',
          2: '#201D18',
        },
        border: {
          DEFAULT: '#2B2822',
          glow: '#3B372F',
        },
        content: {
          DEFAULT: '#EDE9E0',
          muted: '#A9A296',
          dim: '#8C8578', // ≥4.5:1 on bg for AA text contrast
        },
        // Single ember accent family — tints/shades of one hue, never a second hue.
        accent: {
          DEFAULT: '#E8582C', // ember
          2: '#F2926B', // clay tint (accent text on dark)
          3: '#B4441F', // deep ember
          pink: '#C86A4A', // muted clay (legacy key)
        },
        success: '#86B378',
        warning: '#D9A03F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        heading: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 9vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.015em' }],
        h1: ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        h2: ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        h3: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
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
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #E8582C 0%, #F2926B 100%)',
      },
      boxShadow: {
        // Legacy keys kept; values are now quiet elevation, not neon glow.
        'glow-cyan': '0 1px 0 0 rgba(237,233,224,.04) inset, 0 12px 32px -12px rgba(0,0,0,.6)',
        'glow-violet': '0 16px 48px -16px rgba(0,0,0,.55)',
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
