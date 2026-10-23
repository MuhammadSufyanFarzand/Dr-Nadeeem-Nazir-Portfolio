import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Building2, GraduationCap, Languages } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionHeader, TiltCard } from './MotionPrimitives';

export const EducationAndTeaching: React.FC = () => {
  const { education, teachingAndInstitutions, languages } = PORTFOLIO_DATA;
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const ringsInView = useInView(ringsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="education"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 9: Education */}
        <SectionHeader
          kicker="07 · Academic Credentials"
          title="Education & Qualifications"
          subtitle="Doctoral, postgraduate, legal, professional accounting, and computer science degrees from premier Pakistani institutions."
        />

        {/*
          IMPORTANT NOTE FOR OWNER:
          // TODO: verify year and division for the lower education rows in `src/data/portfolioData.ts`.
          Only explicitly stated years/divisions from the verified brief are rendered below.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {education.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="p-6 sm:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--accent-primary-soft)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span
                      className="text-xs font-mono-num"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className="font-serif-display text-xl font-semibold mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.degree}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.institution}
                  </p>
                </div>

                {(item.year || item.division) && (
                  <div
                    className="mt-5 pt-3.5 border-t flex items-center gap-2 text-xs font-mono-num"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--accent-gold)',
                    }}
                  >
                    {item.year && <span>{item.year}</span>}
                    {item.year && item.division && <span aria-hidden="true">·</span>}
                    {item.division && <span>{item.division}</span>}
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Section 10: Teaching Levels & Institutions */}
        <div className="mb-24">
          <SectionHeader
            kicker="08 · Academic Reach & Affiliations"
            title="Teaching Levels & Institutions"
            subtitle="Instructing across professional charter qualifications, undergraduate, graduate, and postgraduate cohorts."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Classes Taught */}
            <div className="lg:col-span-5">
              <TiltCard className="p-7 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Award
                    className="w-5 h-5"
                    style={{ color: 'var(--accent-gold)' }}
                  />
                  <h3
                    className="font-serif-display text-2xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Classes &amp; Programs Taught
                  </h3>
                </div>
                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Comprehensive curriculum delivery across academic degrees and international professional accountancy boards:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {teachingAndInstitutions.classesTaught.map((cls) => (
                    <div
                      key={cls}
                      className="px-3.5 py-2.5 rounded-xl border text-center font-mono-num text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 theme-surface"
                      style={{
                        backgroundColor: 'var(--bg-card-elevated)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {cls}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>

            {/* Institutions Served */}
            <div className="lg:col-span-7">
              <TiltCard className="p-7 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Building2
                    className="w-5 h-5"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                  <h3
                    className="font-serif-display text-2xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Academic &amp; Professional Institutions
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {teachingAndInstitutions.institutions.map((inst, i) => (
                    <div
                      key={inst}
                      className="p-3.5 rounded-xl border flex items-start gap-3 theme-surface"
                      style={{
                        backgroundColor: 'var(--bg-card-elevated)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <span
                        className="text-xs font-mono-num font-semibold mt-0.5 shrink-0"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-sm font-medium leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {inst}
                      </span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Section 11: Languages (Animated Progress Rings) */}
        <div ref={ringsRef}>
          <SectionHeader
            kicker="09 · Communication"
            title="Language Proficiency"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {languages.map((lang, idx) => {
              const radius = 48;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset =
                circumference - (lang.percentage / 100) * circumference;

              return (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard className="p-7 flex items-center gap-6">
                    {/* Animated SVG Progress Ring */}
                    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 112 112"
                      >
                        <circle
                          cx="56"
                          cy="56"
                          r={radius}
                          fill="none"
                          stroke="var(--border-strong)"
                          strokeWidth="7"
                        />
                        <motion.circle
                          cx="56"
                          cy="56"
                          r={radius}
                          fill="none"
                          stroke={
                            idx === 0 ? 'var(--accent-gold)' : 'var(--accent-primary)'
                          }
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{
                            strokeDashoffset: ringsInView
                              ? strokeDashoffset
                              : circumference,
                          }}
                          transition={{
                            duration: 1.3,
                            delay: 0.2 + idx * 0.15,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Languages
                          className="w-4 h-4 mb-0.5"
                          style={{ color: 'var(--accent-gold)' }}
                        />
                        <span
                          className="text-xs font-mono-num font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {lang.percentage}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3
                        className="font-serif-display text-2xl font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {lang.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {lang.proficiency}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
