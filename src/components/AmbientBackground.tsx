import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Ambient background layer with slow-drifting aurora orbs and scroll-linked
 * geometric accents optimized for both mobile and desktop screens.
 */
export const AmbientBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Drifting Primary Accent Orb (Scaled for Mobile & Desktop) */}
      <motion.div
        style={{
          y: yOrb1,
          background: 'var(--orb-blue)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[8%] -left-20 sm:-left-36 w-72 h-72 sm:w-[32rem] sm:h-[32rem] rounded-full blur-3xl opacity-75"
      />

      {/* Drifting Gold Accent Orb (Scaled for Mobile & Desktop) */}
      <motion.div
        style={{
          y: yOrb2,
          background: 'var(--orb-gold)',
        }}
        animate={{
          x: [0, -30, 25, 0],
          scale: [1, 0.92, 1.14, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[8%] -right-20 sm:-right-36 w-72 h-72 sm:w-[34rem] sm:h-[34rem] rounded-full blur-3xl opacity-75"
      />

      {/* Scroll-Reactive Geometric Compass Ring (Visible on Mobile & Desktop) */}
      <motion.div
        style={{
          rotate: rotateRing,
          borderColor: 'var(--border-subtle)',
        }}
        className="absolute top-[28%] -right-24 sm:right-[6%] w-64 h-64 sm:w-[26rem] sm:h-[26rem] rounded-full border border-dashed opacity-35"
      />
    </div>
  );
};
