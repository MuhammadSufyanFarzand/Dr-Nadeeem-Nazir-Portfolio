import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Full-screen 3.0-second intro animation on every page load and refresh:
 * 1. 0.0–0.8s: "NN" monogram draws itself with SVG stroke animation.
 * 2. 0.8–1.8s: "Dr. Nadeem Nazir" reveals letter by letter; subtitle fades in under it.
 * 3. 1.8–2.4s: Thin gold progress line fills from 0% to 100%.
 * 4. 2.4–3.0s: Loader splits into two panels (top & bottom curtain) revealing the hero.
 */
export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock page scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      const quickTimer = window.setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        onComplete();
      }, 400);
      return () => {
        window.clearTimeout(quickTimer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // Progress counter between 1.8s and 2.4s
    const startProgressTimeout = window.setTimeout(() => {
      const startTime = performance.now();
      const duration = 600; // 1.8s -> 2.4s

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(pct);
        if (elapsed < duration) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    }, 1800);

    // Trigger split curtain at 2.4s
    const splitTimeout = window.setTimeout(() => {
      setIsSplitting(true);
    }, 2400);

    // Complete and unmount at 3.0s
    const completeTimeout = window.setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 3000);

    return () => {
      window.clearTimeout(startProgressTimeout);
      window.clearTimeout(splitTimeout);
      window.clearTimeout(completeTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete, prefersReducedMotion]);

  const nameLetters = PORTFOLIO_DATA.profile.name.split('');

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-auto flex flex-col justify-between overflow-hidden"
      aria-label="Loading portfolio of Dr. Nadeem Nazir"
      role="status"
    >
      {/* Top Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-1/2 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderBottom: isSplitting ? '1px solid var(--accent-gold)' : 'none',
        }}
      >
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'var(--orb-blue)' }}
        />
      </motion.div>

      {/* Bottom Curtain Panel */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-1/2 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderTop: isSplitting ? '1px solid var(--accent-gold)' : 'none',
        }}
      >
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'var(--orb-gold)' }}
        />
      </motion.div>

      {/* Center Stage Content (Fades & scales slightly as curtains part at 2.4s) */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isSplitting ? 0 : 1,
          scale: isSplitting ? 0.96 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-[101] flex flex-col items-center justify-center px-6 text-center pointer-events-none"
      >
        {/* 1. 0.0–0.8s: SVG Monogram "NN" draws itself */}
        <div className="relative mb-7">
          <svg
            width="108"
            height="108"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Outer Octagonal/Circular Crest Frame */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="47"
              stroke="var(--accent-primary)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            {/* First "N" */}
            <motion.path
              d="M32 78V42L54 78V42"
              stroke="var(--text-primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeInOut', delay: 0.05 }}
            />
            {/* Second "N" */}
            <motion.path
              d="M66 78V42L88 78V42"
              stroke="var(--accent-gold)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeInOut', delay: 0.15 }}
            />
          </svg>
        </div>

        {/* 2. 0.8–1.8s: Name "Dr. Nadeem Nazir" reveals letter by letter */}
        <h1
          className="font-serif-display text-3xl sm:text-5xl font-semibold tracking-tight mb-3 flex flex-wrap justify-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {nameLetters.map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.8 + idx * 0.038,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={char === ' ' ? 'w-2.5 sm:w-3.5' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle fading in under name between 1.15s and 1.8s */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.15, ease: 'easeOut' }}
          className="text-xs sm:text-sm md:text-base max-w-xl font-medium tracking-wide"
          style={{ color: 'var(--text-secondary)' }}
        >
          Professor of Accounting, Finance, Law &amp; Information Technology
        </motion.p>

        {/* 3. 1.8–2.4s: Thin gold progress line fills from 0 to 100% */}
        <div className="mt-8 w-64 sm:w-80 flex flex-col items-center">
          <div
            className="w-full h-[2px] rounded-full overflow-hidden relative"
            style={{ backgroundColor: 'var(--border-subtle)' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full origin-left"
              style={{ backgroundColor: 'var(--accent-gold)' }}
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 1.75 }}
            className="mt-2.5 text-[11px] font-mono-num tracking-widest"
            style={{ color: 'var(--accent-gold)' }}
          >
            {progress}%
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};
