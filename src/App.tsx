/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CareerTimeline } from './components/CareerTimeline';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ResearchSection } from './components/ResearchSection';
import { EducationAndTeaching } from './components/EducationAndTeaching';
import { ContactAndFooter } from './components/ContactAndFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Theme initialization:
   * - Defaults to LIGHT MODE ('light') as specified.
   * - Reads saved preference from localStorage (wrapped in try/catch).
   * - Respects system preference on first visit if user has dark mode set.
   */
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('nn_portfolio_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    } catch {
      // Fallback to light mode if storage is blocked
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('nn_portfolio_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div
      className="min-h-screen relative selection:bg-blue-500/20"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* 3-Second Full-Screen Intro Animation on Every Load & Refresh */}
      {isLoading && <IntroLoader onComplete={handleLoaderComplete} />}

      {/* Ambient Floating Background Orbs & Scroll Parallax */}
      <AmbientBackground />

      {/* Custom Desktop Smooth Cursor Follower */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navbar + Scroll Progress Bar */}
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CareerTimeline />
        <ExpertiseSection />
        <ResearchSection />
        <EducationAndTeaching />
      </main>

      {/* Contact Section & Footer */}
      <div className="relative z-10">
        <ContactAndFooter />
      </div>

      {/* Floating WhatsApp Corner Button & Quick Chat Drawer */}
      <FloatingWhatsApp />
    </div>
  );
}
