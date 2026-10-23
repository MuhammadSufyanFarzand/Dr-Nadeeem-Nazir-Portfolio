import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowDown, ArrowRight, BookOpen, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SAVED_PORTRAIT_DATA_URL } from '../data/savedPortrait';
import { AnimatedCounter, MagneticButton, TiltCard } from './MotionPrimitives';

export const HeroSection: React.FC = () => {
  const { profile, stats, contact } = PORTFOLIO_DATA;
  const prefersReducedMotion = useReducedMotion();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [typedText, setTypedText] = useState(profile.rotatingDisciplines[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [permanentPhoto, setPermanentPhoto] = useState<string>(() => {
    if (SAVED_PORTRAIT_DATA_URL) return SAVED_PORTRAIT_DATA_URL;
    if (profile.portraitUrl) return profile.portraitUrl;
    try {
      const saved = localStorage.getItem('nn_portfolio_preview_photo');
      if (saved) return saved;
    } catch {
      // Ignore storage errors
    }
    return '';
  });

  // Interactive mouse parallax for the portrait assembly
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const badgeOffsetReverseX = useTransform(smoothPointerX, (v) => -v * 0.7);
  const badgeOffsetReverseY = useTransform(smoothPointerY, (v) => -v * 0.7);

  // Automatically persist the uploaded photo into the codebase if not already saved
  useEffect(() => {
    if (SAVED_PORTRAIT_DATA_URL) {
      setPermanentPhoto(SAVED_PORTRAIT_DATA_URL);
      return;
    }
    if (profile.portraitUrl) {
      setPermanentPhoto(profile.portraitUrl);
      return;
    }
    try {
      const saved = localStorage.getItem('nn_portfolio_preview_photo');
      if (saved) {
        setPermanentPhoto(saved);
        // Persist into src/data/savedPortrait.ts via dev server middleware
        fetch('/api/save-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: saved }),
        }).catch(() => {});
      }
    } catch {
      // Ignore storage errors
    }
  }, [profile.portraitUrl]);

  // Smooth typewriter animation for Accounting | Finance | Law | Information Technology
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(profile.rotatingDisciplines[disciplineIndex]);
      return;
    }

    const fullWord = profile.rotatingDisciplines[disciplineIndex];
    const typeSpeed = isDeleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (!isDeleting && typedText.length < fullWord.length) {
        setTypedText(fullWord.slice(0, typedText.length + 1));
      } else if (!isDeleting && typedText.length === fullWord.length) {
        window.setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(fullWord.slice(0, typedText.length - 1));
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setDisciplineIndex(
          (prev) => (prev + 1) % profile.rotatingDisciplines.length
        );
      }
    }, typeSpeed);

    return () => window.clearTimeout(timer);
  }, [
    typedText,
    isDeleting,
    disciplineIndex,
    profile.rotatingDisciplines,
    prefersReducedMotion,
  ]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const { innerWidth, innerHeight } = window;
    const xOffset = ((e.clientX - innerWidth / 2) / innerWidth) * 22;
    const yOffset = ((e.clientY - innerHeight / 2) / innerHeight) * 22;
    pointerX.set(xOffset);
    pointerY.set(yOffset);
  };

  const heroNameWords = profile.name.split(' ');

  return (
    <section
      id="home"
      onMouseMove={handleHeroMouseMove}
      className="relative pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Kicker Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-8 h-[1.5px] origin-left inline-block"
                style={{ backgroundColor: 'var(--accent-gold)' }}
              />
              <p
                className="text-xs sm:text-sm font-medium tracking-wide"
                style={{ color: 'var(--accent-gold)' }}
              >
                {profile.kicker}
              </p>
            </motion.div>

            {/* Big Heading with Word-by-Word Masked Reveal */}
            <div className="space-y-3">
              <h1
                className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] flex flex-wrap gap-x-3.5"
                style={{ color: 'var(--text-primary)' }}
              >
                {heroNameWords.map((word, i) => (
                  <span key={word} className="overflow-hidden inline-block pb-1">
                    <motion.span
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.08 + i * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5"
              >
                {profile.credentials.split(';').map((cred, index) => {
                  const cleanCred = cred.trim();
                  return (
                    <motion.span
                      key={cleanCred}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.28 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-serif-display font-semibold tracking-wide theme-surface shadow-xs"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-strong)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rotate-45 inline-block shrink-0"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                        }}
                      />
                      <span>{cleanCred}</span>
                    </motion.span>
                  );
                })}
              </motion.p>
            </div>

            {/* Sub-heading + Animated Typewriter Discipline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2.5"
            >
              <h2
                className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug [text-wrap:balance]"
                style={{ color: 'var(--text-primary)' }}
              >
                {profile.title}
              </h2>

              <div className="flex items-center gap-2 text-sm sm:text-base font-medium min-h-[30px]">
                <span style={{ color: 'var(--text-muted)' }}>
                  Specialized Authority in:
                </span>
                <span
                  className="font-serif-display italic font-semibold inline-flex items-center"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity }}
                    className="ml-0.5 inline-block w-[2px] h-5"
                    style={{ backgroundColor: 'var(--accent-gold)' }}
                  />
                </span>
              </div>
            </motion.div>

            {/* Current Chairman Position Callout Line */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="p-4 sm:p-5">
                <p
                  className="text-sm sm:text-base font-medium leading-relaxed"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {profile.currentRoleLine}
                </p>
              </TiltCard>
            </motion.div>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile.heroIntro}
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton href="#contact" variant="primary">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton href="#research" variant="outline">
                <BookOpen
                  className="w-4 h-4"
                  style={{ color: 'var(--accent-gold)' }}
                />
                <span>View Research</span>
              </MagneticButton>

              <MagneticButton
                href={contact.linkedinUrl}
                external
                variant="outline"
                ariaLabel="Visit Dr. Nadeem Nazir on LinkedIn"
              >
                <Linkedin
                  className="w-4 h-4"
                  style={{ color: 'var(--accent-primary)' }}
                />
                <span>LinkedIn</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Permanent Circular Portrait Frame + Orbiting Rings + Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: smoothPointerX, y: smoothPointerY }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-6"
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
              {/* Soft Breathing Halo Glow Behind Portrait */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.6, 0.35],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-6 rounded-full blur-2xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, var(--accent-gold-soft) 0%, var(--accent-primary-soft) 65%, transparent 100%)',
                }}
              />

              {/* Outer Orbiting Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed animate-orbit-slow pointer-events-none"
                style={{ borderColor: 'var(--accent-gold)' }}
              >
                <span
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--accent-gold)' }}
                />
                <span
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              </div>

              {/* Inner Counter-Rotating Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-5 rounded-full border animate-orbit-reverse-slow pointer-events-none opacity-60"
                style={{ borderColor: 'var(--border-strong)' }}
              >
                <span
                  className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              </div>

              {/* Permanent Circular Portrait Frame (No Change/Upload Options) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-72 md:h-72 rounded-full overflow-hidden flex flex-col items-center justify-center text-center p-6 select-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-card-hover)',
                }}
              >
                {permanentPhoto ? (
                  <img
                    src={permanentPhoto}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none opacity-45"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 35%, var(--accent-gold-soft), transparent 70%)',
                      }}
                    />

                    {/* Elegant Monogram "NN" */}
                    <motion.span
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="font-serif-display text-6xl sm:text-7xl font-bold tracking-tight select-none relative z-10"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {profile.monogram}
                    </motion.span>

                    <div
                      className="w-10 h-[1.5px] my-3 relative z-10"
                      style={{ backgroundColor: 'var(--accent-gold)' }}
                    />

                    <span
                      className="text-xs font-medium tracking-widest uppercase relative z-10"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {profile.name}
                    </span>
                  </>
                )}
              </motion.div>

              {/* Floating Badge 1: "32+ Years" */}
              <motion.div
                style={{ x: badgeOffsetReverseX, y: badgeOffsetReverseY }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-3 -left-2 sm:left-0 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 theme-surface"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--accent-gold)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {profile.floatingBadges[0]}
              </motion.div>

              {/* Floating Badge 2: "Ph.D. Finance" */}
              <motion.div
                style={{ x: badgeOffsetReverseX, y: badgeOffsetReverseY }}
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                className="absolute top-12 -right-2 sm:right-0 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 theme-surface"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--accent-primary)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {profile.floatingBadges[1]}
              </motion.div>

              {/* Floating Badge 3: "Advocate High Court" */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 theme-surface"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {profile.floatingBadges[2]}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Full-Width Animated Stats Strip */}
        <div
          className="mt-16 sm:mt-20 pt-10 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <TiltCard className="p-6 h-full flex flex-col justify-between">
                  <div
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {stat.label}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll-Down Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="inline-flex flex-col items-center gap-2 text-xs font-medium tracking-wider transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>Scroll to Explore</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
              style={{ borderColor: 'var(--border-strong)' }}
            >
              <ArrowDown
                className="w-3.5 h-3.5"
                style={{ color: 'var(--accent-gold)' }}
              />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
};
