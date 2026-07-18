import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata, personJsonLd, projectsJsonLd } from '@/lib/metadata';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CursorGlow } from '@/components/layout/CursorGlow';
import { SideRails } from '@/components/layout/SideRails';
import { BackToTop } from '@/components/layout/BackToTop';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

// Clash Display serves both display and heading — sharp technical voice.
// Tailwind's font-heading token points at --font-display too (see tailwind.config.ts).
const display = localFont({
  src: [
    { path: '../fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-content antialiased">
        {/* Recruiter/SEO schema */}
        <script
          type="application/ld+json"
          // Escape `<` so a value can never break out of the <script> element.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-content"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <CursorGlow />
          <SideRails />
          <Navbar />
          <SmoothScroll>
            {children}
            <Footer />
            <BackToTop />
          </SmoothScroll>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
