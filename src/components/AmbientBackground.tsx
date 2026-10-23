import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/**
 * Ambient background layer with slow-drifting aurora orbs and scroll-linked
 * geometric accents that respond smoothly to both Light and Dark mode.
 */
export const AmbientBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 180]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Drifting Primary Accent Orb */}
      <motion.div
        style={{
          y: yOrb1,
          background: 'var(--orb-blue)',
        }}
        animate={{
          x: [0, 45, -25, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[12%] -left-36 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-70"
      />

      {/* Drifting Gold Accent Orb */}
      <motion.div
        style={{
          y: yOrb2,
          background: 'var(--orb-gold)',
        }}
        animate={{
          x: [0, -50, 30, 0],
          scale: [1, 0.92, 1.14, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[10%] -right-36 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-70"
      />

      {/* Scroll-Reactive Geometric Compass Ring in Background */}
      <motion.div
        style={{
          rotate: rotateRing,
          borderColor: 'var(--border-subtle)',
        }}
        className="hidden xl:block absolute top-1/3 right-[6%] w-[26rem] h-[26rem] rounded-full border border-dashed opacity-35"
      />
    </div>
  );
};
