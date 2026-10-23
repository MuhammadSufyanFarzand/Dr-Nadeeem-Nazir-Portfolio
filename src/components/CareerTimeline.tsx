import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionHeader, TiltCard } from './MotionPrimitives';

export const CareerTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          kicker="02 · Career Journey (1989 – Present)"
          title="Academic, Legal & Executive Progression"
          subtitle="Over three decades of continuous service across chartered accountancy, industrial finance, legal practice, and university leadership."
        />

        <div ref={containerRef} className="relative pl-6 sm:pl-10 md:pl-0">
          {/* Background Static Timeline Track */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2 sm:left-4 md:left-1/2 md:-translate-x-1/2 w-[2px]"
            style={{ backgroundColor: 'var(--border-subtle)' }}
          />

          {/* Animated Scroll-Drawing Timeline Line */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY,
              background:
                'linear-gradient(180deg, var(--accent-primary), var(--accent-gold))',
            }}
            className="absolute top-2 bottom-2 left-2 sm:left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] origin-top"
          />

          <div className="space-y-10 md:space-y-14">
            {PORTFOLIO_DATA.careerTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Animated Timeline Node Marker */}
                  <motion.div
                    aria-hidden="true"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 20,
                      delay: 0.08,
                    }}
                    className="absolute -left-4 sm:-left-6 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor:
                        idx === PORTFOLIO_DATA.careerTimeline.length - 1
                          ? 'var(--accent-gold)'
                          : 'var(--accent-primary)',
                    }}
                  />

                  {/* Alternating Slide-In Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 28,
                      x: isEven ? -24 : 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`w-full md:w-[calc(50%-2.25rem)] ${
                      isEven ? 'md:pr-2' : 'md:pl-2'
                    }`}
                  >
                    <TiltCard className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span
                          className="text-xs font-mono-num font-semibold tracking-wider uppercase"
                          style={{ color: 'var(--accent-gold)' }}
                        >
                          {item.period}
                        </span>
                        <span
                          className="text-xs font-mono-num"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <h3
                        className="font-serif-display text-xl sm:text-2xl font-semibold leading-snug mb-1.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm font-medium mb-3.5"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {item.institution}
                      </p>

                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.description}
                      </p>

                      {item.highlights && item.highlights.length > 0 && (
                        <ul
                          className="mt-4 pt-3.5 border-t space-y-1.5 text-sm"
                          style={{
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {item.highlights.map((inst) => (
                            <li key={inst} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="font-mono-num select-none"
                                style={{ color: 'var(--accent-gold)' }}
                              >
                                —
                              </span>
                              <span>{inst}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </TiltCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
