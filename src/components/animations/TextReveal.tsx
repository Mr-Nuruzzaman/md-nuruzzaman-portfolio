'use client';

import { m } from 'framer-motion';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  /** Split unit. 'char' for hero name, 'word' for sub-lines/headings. */
  by?: 'char' | 'word';
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll-into-view. Use for the hero. */
  onMount?: boolean;
  as?: React.ElementType;
}

/** Mask-up reveal, split per char or word. Falls back to a plain fade under reduced-m. */
export function TextReveal({
  text,
  by = 'word',
  className,
  delay = 0,
  stagger = by === 'char' ? 0.04 : 0.07,
  onMount = false,
  as: Tag = 'span',
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion();
  // Always split into words so line-breaks only ever happen at spaces (never mid-word).
  const words = text.split(' ');

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  // Slide-only mask reveal (the per-unit overflow-hidden wrapper does the hiding).
  // No opacity fade → the hero heading (LCP element) paints immediately.
  const child = {
    hidden: { y: reduced ? '0%' : '100%' },
    show: { y: '0%', transition: { duration: 0.9, ease: EASE_EXPO } },
  };

  const animateProps = onMount
    ? { initial: 'hidden' as const, animate: 'show' as const }
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, margin: '-10% 0px' } };

  // One masked, animated unit (a whole word, or a single char).
  const unit = (content: string, key: string) => (
    <span key={key} className="inline-block overflow-hidden align-bottom">
      <m.span className="inline-block" variants={child}>
        {content}
      </m.span>
    </span>
  );

  return (
    <Tag className={cn('inline-block', className)} aria-label={text}>
      <m.span className="inline" variants={container} {...animateProps}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap" aria-hidden>
            {by === 'char'
              ? Array.from(word).map((ch, ci) => unit(ch, `${wi}-${ci}`))
              : unit(word, `${wi}`)}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
