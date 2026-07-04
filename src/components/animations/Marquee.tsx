'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: React.ReactNode[];
  /** Seconds per loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** Pause the scroll while hovered. */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee. Duplicates the track and translates -50% so the loop is seamless.
 * CSS animation (`animate-marquee`) — auto-frozen under reduced-motion via globals.css.
 */
export function Marquee({ items, speed = 30, reverse = false, className, pauseOnHover = true }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={cn('group relative flex w-full overflow-hidden', className)}>
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center whitespace-nowrap animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
        aria-hidden
      >
        {/* Trailing margin (not flex gap) so a gap also follows the last item — seamless -50% loop. */}
        {track.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center pr-8">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
