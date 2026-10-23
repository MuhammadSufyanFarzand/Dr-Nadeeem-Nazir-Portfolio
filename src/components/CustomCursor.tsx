import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * Custom smooth cursor follower (desktop only) that enlarges on links and buttons.
 * Automatically hides on touch devices or when prefers-reduced-motion is active.
 */
export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 320, mass: 0.45 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktopPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopPointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isDesktopPointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'
        );
        setIsHoveringInteractive(Boolean(interactive));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isDesktopPointer, isVisible, prefersReducedMotion]);

  if (!isDesktopPointer || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHoveringInteractive ? 48 : 22,
        height: isHoveringInteractive ? 48 : 22,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <div
        className="w-full h-full rounded-full transition-colors duration-300 flex items-center justify-center"
        style={{
          border: isHoveringInteractive
            ? '1.5px solid var(--accent-gold)'
            : '1.5px solid var(--accent-primary)',
          backgroundColor: isHoveringInteractive
            ? 'var(--accent-gold-soft)'
            : 'transparent',
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full transition-transform duration-200"
          style={{
            backgroundColor: isHoveringInteractive
              ? 'var(--accent-gold)'
              : 'var(--accent-primary)',
            transform: isHoveringInteractive ? 'scale(0.5)' : 'scale(1)',
          }}
        />
      </div>
    </motion.div>
  );
};
