import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

/**
 * Masked word-by-word heading reveal on scroll with expanding gold accent line.
 */
interface MaskedHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<MaskedHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'left',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-70px' });
  const words = title.split(' ');

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      }`}
    >
      {kicker && (
        <div
          className={`flex items-center gap-3 mb-3 overflow-hidden ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-8 h-[1.5px] origin-left inline-block shrink-0"
            style={{ backgroundColor: 'var(--accent-gold)' }}
          />
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={
              isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-medium tracking-wider"
            style={{ color: 'var(--accent-gold)' }}
          >
            {kicker}
          </motion.p>
        </div>
      )}

      <h2
        className={`font-serif-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.15] flex flex-wrap gap-x-2.5 gap-y-1 ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
        style={{ color: 'var(--text-primary)' }}
      >
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className="overflow-hidden inline-block pb-1">
            <motion.span
              initial={{ y: '110%', rotateZ: 3, opacity: 0 }}
              animate={
                isInView
                  ? { y: '0%', rotateZ: 0, opacity: 1 }
                  : { y: '110%', rotateZ: 3, opacity: 0 }
              }
              transition={{
                duration: 0.62,
                delay: 0.06 + idx * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ y: 18, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/**
 * 3D Perspective Tilt Card with dynamic cursor-tracking radial spotlight glow.
 */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const pixelX = useMotionValue(0);
  const pixelY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5.5, -5.5]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5.5, 5.5]), {
    stiffness: 260,
    damping: 22,
  });

  const spotlightBackground = useMotionTemplate`radial-gradient(380px circle at ${pixelX}px ${pixelY}px, var(--accent-primary-soft), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    pixelX.set(localX);
    pixelY.set(localY);
    mouseX.set(localX / rect.width);
    mouseY.set(localY / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 1100,
        backgroundColor: 'var(--bg-card)',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--border-subtle)',
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      }}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-[24px] border theme-surface relative overflow-hidden group ${className}`}
    >
      {/* Dynamic Cursor-Following Spotlight Overlay */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* Subtle Top Highlight Sweep on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

/**
 * Magnetic Button with cursor pull, spring tap, and shine sweep.
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  external?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  ariaLabel,
  external = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getStyle = (): React.CSSProperties => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'var(--accent-primary)',
        color: '#FFFFFF',
        border: '1px solid transparent',
      };
    }
    if (variant === 'secondary') {
      return {
        backgroundColor: 'var(--accent-gold-soft)',
        color: 'var(--text-primary)',
        border: '1px solid var(--accent-gold)',
      };
    }
    return {
      backgroundColor: 'var(--bg-card)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
    };
  };

  const baseClass = `btn-shine inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer select-none ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          style={getStyle()}
          className={baseClass}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          style={getStyle()}
          className={baseClass}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
};

/**
 * Animated Number Counter triggered when scrolled into view.
 */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let animationFrame: number;
    const duration = 1650;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <span ref={ref} className="font-mono-num tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};
