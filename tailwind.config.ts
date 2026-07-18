import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Midnight Signal" — deep navy monochrome; depth comes from lightness shifts.
        bg: {
          DEFAULT: '#0A1628',
          elev: '#0F1E33',
        },
        surface: {
          DEFAULT: '#132840',
          2: '#1B3350',
        },
        border: {
          DEFAULT: '#22344D',
          glow: '#2F4B6E',
        },
        content: {
          DEFAULT: '#E6EEFB',
          muted: '#9FB2CC',
          dim: '#7B8CA6', // ≥4.5:1 on bg for AA text contrast
        },
        // Single teal accent family — tints/shades of one hue, never a second hue.
        accent: {
          DEFAULT: '#5EEAD4', // teal signal
          2: '#2DD4BF', // pressed / lower-emphasis teal
          3: '#0F766E', // deep teal (filled backgrounds)
          pink: '#99F6E4', // pale teal tint (legacy key)
        },
        success: '#4ADE80',
        warning: '#FBBF24',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        heading: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
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
        container: '1320px',
        wide: '1536px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 100%)',
      },
      boxShadow: {
        // Legacy keys kept; cyan = subtle teal signal glow (accent elements only), violet = quiet elevation.
        'glow-cyan': '0 0 24px -6px rgba(94,234,212,.35)',
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
