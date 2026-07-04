import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient neon glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-grad-primary opacity-[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />

      <div className="relative flex flex-col items-center gap-6">
        <p className="text-eyebrow font-mono text-accent">Error 404</p>

        <GradientText className="text-display font-display leading-none tracking-tight" aria-hidden>
          404
        </GradientText>

        <h1 className="text-h3 font-heading text-content">Page not found</h1>

        <p className="max-w-md text-body text-content-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you
          back on track.
        </p>

        <div className="mt-2">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </main>
  );
}
