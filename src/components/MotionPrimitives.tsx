import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

/**
 * Masked word-by-word heading reveal on scroll with expanding gold accent line.
 * Works on both mobile and desktop viewports.
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
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const words = title.split(' ');

  return (
    <div
      ref={ref}
      className={`mb-10 sm:mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      }`}
    >
      {kicker && (
        <div
          className={`flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 overflow-hidden ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 sm:w-8 h-[1.5px] origin-left inline-block shrink-0"
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
        className={`font-serif-display text-2xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.16] flex flex-wrap gap-x-2 sm:gap-x-2.5 gap-y-1 ${
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
                delay: 0.05 + idx * 0.045,
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
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/**
 * 3D Perspective Tilt Card with dynamic cursor-tracking AND mobile touch-tracking
 * radial spotlight glow.
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const pixelX = useMotionValue(140);
  const pixelY = useMotionValue(100);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 260,
    damping: 22,
  });

  const spotlightBackground = useMotionTemplate`radial-gradient(340px circle at ${pixelX}px ${pixelY}px, var(--accent-primary-soft), transparent 80%)`;

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    pixelX.set(localX);
    pixelY.set(localY);
    mouseX.set(Math.max(0, Math.min(1, localX / rect.width)));
    mouseY.set(Math.max(0, Math.min(1, localY / rect.height)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsActive(true);
    const touch = e.touches[0];
    if (touch) {
      updateCoordinates(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      updateCoordinates(touch.clientX, touch.clientY);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleReset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        backgroundColor: 'var(--bg-card)',
        borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
        boxShadow: isActive ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-[22px] sm:rounded-[24px] border theme-surface relative overflow-hidden group ${className}`}
    >
      {/* Dynamic Cursor / Touch Spotlight Overlay */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-[24px] transition-opacity duration-300 z-0 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ background: spotlightBackground }}
      />

      {/* Subtle Top Highlight Sweep on Hover / Touch */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1.5px] transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
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
 * Magnetic Button with cursor pull, mobile touch feedback, and shine sweep.
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
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
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

  const baseClass = `btn-shine inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer select-none ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
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
 * Animated Number Counter triggered when scrolled into view on mobile & desktop.
 */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono-num tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};
