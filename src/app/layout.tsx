import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { siteMetadata, personJsonLd } from '@/lib/metadata';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CursorGlow } from '@/components/layout/CursorGlow';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

// Space Grotesk serves both display and heading — instantiate once (single @font-face set).
// Tailwind's font-heading token points at --font-display too (see tailwind.config.ts).
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${grotesk.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-content antialiased">
        {/* Recruiter/SEO schema */}
        <script
          type="application/ld+json"
          // Escape `<` so a value can never break out of the <script> element.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-content"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CursorGlow />
          <Navbar />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
