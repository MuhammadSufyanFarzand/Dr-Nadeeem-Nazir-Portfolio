import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sectionIds = PORTFOLIO_DATA.navLinks.map((l) => l.href.replace('#', ''));
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-gold))',
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-4'
        }`}
        style={{
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Monogram + Name */}
          <a
            href="#home"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
            aria-label="Dr. Nadeem Nazir — Home"
          >
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center font-serif-display font-bold text-base tracking-tight transition-transform duration-200 group-hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                color: 'var(--text-primary)',
              }}
            >
              {PORTFOLIO_DATA.profile.monogram}
            </span>
            <span
              className="font-serif-display font-semibold text-lg tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {PORTFOLIO_DATA.profile.name}
            </span>
          </a>

          {/* Zone 2: Center Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: 'var(--accent-gold)' }}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle (Sun/Moon Morph) + Contact Me CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
              }
              title={
                theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
              }
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {theme === 'light' ? (
                  <>
                    <circle cx="12" cy="12" r="4.5" stroke="var(--accent-gold)" />
                    <path d="M12 2v2" stroke="var(--accent-gold)" />
                    <path d="M12 20v2" stroke="var(--accent-gold)" />
                    <path d="m4.93 4.93 1.41 1.41" stroke="var(--accent-gold)" />
                    <path d="m17.66 17.66 1.41 1.41" stroke="var(--accent-gold)" />
                    <path d="M2 12h2" stroke="var(--accent-gold)" />
                    <path d="M20 12h2" stroke="var(--accent-gold)" />
                    <path d="m6.34 17.66-1.41 1.41" stroke="var(--accent-gold)" />
                    <path d="m19.07 4.93-1.41 1.41" stroke="var(--accent-gold)" />
                  </>
                ) : (
                  <path
                    d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                    stroke="var(--accent-gold)"
                  />
                )}
              </motion.svg>
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex btn-shine items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-transform duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
              }}
            >
              Contact Me
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Full-Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 pt-24 pb-10 px-6 flex flex-col justify-between lg:hidden overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col space-y-2 mt-4"
            >
              {PORTFOLIO_DATA.navLinks.map((link, idx) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="font-serif-display text-2xl sm:text-3xl font-semibold py-3 border-b flex items-center justify-between"
                    style={{
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span>{link.label}</span>
                    <span
                      className="text-xs font-mono-num"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="pt-8 space-y-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl text-center font-medium text-base block"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#FFFFFF',
                }}
              >
                Contact Me
              </a>
              <p
                className="text-xs text-center"
                style={{ color: 'var(--text-muted)' }}
              >
                {PORTFOLIO_DATA.profile.credentials}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
