import React from 'react';
import { motion } from 'motion/react';
import { Award, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionHeader, TiltCard } from './MotionPrimitives';

export const AboutSection: React.FC = () => {
  const { about } = PORTFOLIO_DATA;

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          kicker="01 · Academic & Executive Profile"
          title={about.heading}
        />

        {/* Main Summary + Quote + FWCCI Honor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Primary Summary Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-7 sm:p-9 rounded-[26px] border theme-surface flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="space-y-5">
              <p
                className="text-xs font-mono-num tracking-wider uppercase"
                style={{ color: 'var(--accent-gold)' }}
              >
                32+ Years of Multidisciplinary Leadership
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                {about.summary}
              </p>
            </div>

            {/* Honor Callout Box inside main profile */}
            <div
              className="mt-8 pt-6 border-t flex items-start gap-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--accent-gold-soft)',
                  color: 'var(--accent-gold)',
                }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-xs font-medium tracking-wide"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {about.honor.organization}
                </p>
                <h3
                  className="font-serif-display text-lg sm:text-xl font-semibold mt-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  “{about.honor.title}”
                </h3>
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {about.honor.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Philosophy Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-7 sm:p-9 rounded-[26px] border theme-surface flex flex-col justify-between relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--accent-gold)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: 'var(--accent-primary-soft)',
                color: 'var(--accent-primary)',
              }}
            >
              <Quote className="w-6 h-6" />
            </div>

            <blockquote
              className="font-serif-display italic text-xl sm:text-2xl leading-relaxed font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              “{about.quote}”
            </blockquote>

            <div
              className="mt-8 pt-5 border-t flex items-center justify-between"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div>
                <p
                  className="font-serif-display font-semibold text-base"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {PORTFOLIO_DATA.profile.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Chairman, Department of Management Sciences
                </p>
              </div>
              <span
                className="font-serif-display font-bold text-lg"
                style={{ color: 'var(--accent-gold)' }}
              >
                {PORTFOLIO_DATA.profile.monogram}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 Supporting Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {about.supportingPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="p-6 sm:p-7 h-full">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span
                    className="text-xs font-mono-num font-medium"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    0{index + 1} · {point.period}
                  </span>
                </div>
                <h3
                  className="font-serif-display text-xl font-semibold mb-2.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {point.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {point.text}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
