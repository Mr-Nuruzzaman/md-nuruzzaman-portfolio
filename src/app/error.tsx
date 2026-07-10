'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient ember bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-accent-3 opacity-[0.08] blur-[120px]"
      />

      <div className="relative flex flex-col items-center gap-6">
        <p className="font-mono text-eyebrow uppercase text-accent-2">Something broke</p>

        <GradientText className="font-display text-display leading-none tracking-tight" aria-hidden>
          Oops
        </GradientText>

        <h1 className="font-heading text-h3 text-content">An unexpected error occurred</h1>

        <p className="max-w-md text-body text-content-muted">
          This one&rsquo;s on me, not you. Try again — or head back to the start.
        </p>

        <div className="mt-2 flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
      </div>
    </main>
  );
}
