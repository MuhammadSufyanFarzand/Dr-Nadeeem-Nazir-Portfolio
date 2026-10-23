import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Landmark,
  Calculator,
  Cpu,
  Scale,
  Compass,
  Microscope,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PORTFOLIO_DATA, ExpertiseCardItem } from '../data/portfolioData';
import { SectionHeader, TiltCard } from './MotionPrimitives';

const IconMap: Record<ExpertiseCardItem['iconName'], React.ReactNode> = {
  landmark: <Landmark className="w-5 h-5" />,
  calculator: <Calculator className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
  compass: <Compass className="w-5 h-5" />,
  microscope: <Microscope className="w-5 h-5" />,
};

export const ExpertiseSection: React.FC = () => {
  const { expertiseCards, skillsAndCompetencies, softwareAndTools } =
    PORTFOLIO_DATA;
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'card-a': true,
    'card-d': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Duplicate arrays for seamless continuous marquee loops
  const marqueeSkillsRow1 = [
    ...skillsAndCompetencies.items.slice(0, 7),
    ...skillsAndCompetencies.items.slice(0, 7),
  ];
  const marqueeSkillsRow2 = [
    ...skillsAndCompetencies.items.slice(7),
    ...skillsAndCompetencies.items.slice(7),
  ];

  const allSoftwareMarquee = [
    ...softwareAndTools.researchSoftware,
    ...softwareAndTools.accountingErpSoftware,
    ...softwareAndTools.researchSoftware,
    ...softwareAndTools.accountingErpSoftware,
  ];

  return (
    <section
      id="expertise"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 5: 6 Expertise Pillars */}
        <SectionHeader
          kicker="03 · Multidisciplinary Authority"
          title="Core Domains of Expertise"
          subtitle="Bridging academic theory, statutory law, enterprise resource planning, and empirical research across six specialized pillars."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-24">
          {expertiseCards.map((card, idx) => {
            const isExpanded = Boolean(expandedCards[card.id]);
            const subjects = card.subjectsOrAreas || [];
            const visibleSubjects = isExpanded ? subjects : subjects.slice(0, 6);
            const hasMore = subjects.length > 6;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <TiltCard className="p-7 h-full flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Numerical Code */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--accent-primary-soft)',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {IconMap[card.iconName]}
                      </div>
                      <span
                        className="font-mono-num text-xs font-semibold"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        {card.code}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3
                      className="font-serif-display text-xl sm:text-2xl font-semibold leading-snug mb-1.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm font-medium mb-4"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      {card.subtitle}
                    </p>

                    {/* Summary */}
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {card.summary}
                    </p>
                  </div>

                  {/* Subjects / Areas List */}
                  {subjects.length > 0 && (
                    <div
                      className="pt-4 border-t"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <p
                        className="text-xs font-mono-num uppercase tracking-wider mb-2.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {card.subjectsLabel || 'Key Focus Areas'} ({subjects.length})
                      </p>
                      <div
                        className="text-xs sm:text-[13px] leading-relaxed"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {visibleSubjects.map((subj, i) => (
                          <React.Fragment key={subj}>
                            <span>{subj}</span>
                            {i < visibleSubjects.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="mx-1.5 font-bold"
                                style={{ color: 'var(--accent-gold)' }}
                              >
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {hasMore && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(card.id)}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          {isExpanded ? (
                            <>
                              <span>Show condensed list</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>
                                Show all {subjects.length} subjects
                              </span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Section 6: Key Skills and Competencies (Marquee + Synthesis) */}
        <div className="mb-24">
          <SectionHeader
            kicker="04 · Key Skills & Competencies"
            title="Executive, Legal & Analytical Capabilities"
            subtitle={skillsAndCompetencies.synthesisParagraph}
          />

          {/* Interactive Marquee Strips (Pause on Hover) */}
          <div className="space-y-4 marquee-container overflow-hidden py-2">
            {/* Row 1: Leftward Marquee */}
            <div className="overflow-hidden relative">
              <div className="animate-marquee-left flex items-center gap-6">
                {marqueeSkillsRow1.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="px-5 py-3 rounded-2xl border whitespace-nowrap shrink-0 text-sm font-medium theme-surface flex items-center gap-3"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono-num text-xs"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      /
                    </span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Rightward Marquee */}
            <div className="overflow-hidden relative">
              <div className="animate-marquee-right flex items-center gap-6">
                {marqueeSkillsRow2.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="px-5 py-3 rounded-2xl border whitespace-nowrap shrink-0 text-sm font-medium theme-surface flex items-center gap-3"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono-num text-xs"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      /
                    </span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Software & Tools */}
        <div>
          <SectionHeader
            kicker="05 · Software & Enterprise Tools"
            title="Econometric, Statistical & ERP Systems"
            subtitle="Complete authority over quantitative research packages and modern enterprise resource planning software."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-8">
            {/* Research Software Card */}
            <TiltCard className="p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className="text-xs font-mono-num uppercase tracking-wider"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  Quantitative &amp; Empirical Modeling
                </span>
                <span
                  className="text-xs italic font-serif-display"
                  style={{ color: 'var(--text-muted)' }}
                >
                  “{softwareAndTools.researchNote}”
                </span>
              </div>
              <h3
                className="font-serif-display text-2xl font-semibold mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                Research &amp; Econometric Software
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {softwareAndTools.researchSoftware.map((tool) => (
                  <div
                    key={tool}
                    className="p-3.5 rounded-xl border text-center font-medium text-sm whitespace-nowrap shrink-0 theme-surface"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Accounting / ERP Software Card */}
            <TiltCard className="p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className="text-xs font-mono-num uppercase tracking-wider"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Financial &amp; Enterprise Architecture
                </span>
                <span
                  className="text-xs font-mono-num"
                  style={{ color: 'var(--text-muted)' }}
                >
                  7 Platforms
                </span>
              </div>
              <h3
                className="font-serif-display text-2xl font-semibold mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                Accounting &amp; ERP Systems
              </h3>
              <div className="flex flex-wrap gap-3">
                {softwareAndTools.accountingErpSoftware.map((tool) => (
                  <div
                    key={tool}
                    className="px-4 py-2.5 rounded-xl border font-medium text-sm whitespace-nowrap shrink-0 theme-surface"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Continuous Software Ribbon Marquee */}
          <div className="marquee-container overflow-hidden pt-2">
            <div className="animate-marquee-left flex items-center gap-8">
              {allSoftwareMarquee.map((sw, i) => (
                <span
                  key={`${sw}-${i}`}
                  className="text-sm font-mono-num tracking-wider whitespace-nowrap shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {sw}
                  <span
                    aria-hidden="true"
                    className="ml-8"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
