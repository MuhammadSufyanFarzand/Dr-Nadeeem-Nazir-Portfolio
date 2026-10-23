import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookMarked, Check, Copy, GraduationCap, Search } from 'lucide-react';
import { PORTFOLIO_DATA, PublicationItem } from '../data/portfolioData';
import { SectionHeader, TiltCard } from './MotionPrimitives';

export const ResearchSection: React.FC = () => {
  const { research } = PORTFOLIO_DATA;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cited' | 'recent'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const totalCitations = useMemo(
    () =>
      research.publications.reduce(
        (sum, pub) => sum + (pub.citations ? pub.citations : 0),
        0
      ),
    [research.publications]
  );

  const filteredPublications = useMemo(() => {
    return research.publications.filter((pub) => {
      const matchesQuery =
        !searchQuery.trim() ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.year.includes(searchQuery.trim());

      if (!matchesQuery) return false;
      if (selectedFilter === 'cited') return Boolean(pub.citations && pub.citations > 0);
      if (selectedFilter === 'recent') return Number(pub.year) >= 2018;
      return true;
    });
  }, [research.publications, searchQuery, selectedFilter]);

  const handleCopyCitation = (pub: PublicationItem) => {
    const citationText = `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}.`;
    navigator.clipboard?.writeText(citationText).catch(() => {});
    setCopiedId(pub.id);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === pub.id ? null : prev));
    }, 2000);
  };

  return (
    <section
      id="research"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <p
              className="text-xs sm:text-sm font-medium tracking-wider mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              06 · Scholarly Output &amp; Supervision
            </p>
            <h2
              className="font-serif-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.15] [text-wrap:balance]"
              style={{ color: 'var(--text-primary)' }}
            >
              Research, Theses &amp; Publications
            </h2>
            <p
              className="mt-4 text-base sm:text-lg font-serif-display italic"
              style={{ color: 'var(--text-primary)' }}
            >
              “{research.intro}”
            </p>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {research.workflowSummary}
            </p>
          </div>

          {/* Google Scholar Verification Note */}
          <div
            className="p-4 sm:p-5 rounded-2xl border shrink-0 theme-surface"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <p
              className="text-xs font-mono-num uppercase tracking-wider mb-1"
              style={{ color: 'var(--accent-gold)' }}
            >
              Academic Index Verification
            </p>
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {research.scholarVerification}
            </p>
            <p
              className="text-xs mt-1 font-mono-num"
              style={{ color: 'var(--text-muted)' }}
            >
              {research.publications.length} Publications · {totalCitations} Listed Citations
            </p>
          </div>
        </div>

        {/* Highlighted Thesis Topics (M.Phil & Ph.D.) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-14">
          {research.theses.map((thesis, idx) => (
            <motion.div
              key={thesis.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="p-7 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap
                        className="w-5 h-5"
                        style={{ color: 'var(--accent-gold)' }}
                      />
                      <span
                        className="text-xs font-mono-num font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        {thesis.degree}
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono-num"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {thesis.institutionAndYear}
                    </span>
                  </div>

                  <h3
                    className="font-serif-display text-xl sm:text-2xl font-semibold leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    “{thesis.title}”
                  </h3>
                </div>

                <div
                  className="mt-6 pt-4 border-t flex items-center justify-between text-xs"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>Government College University Faisalabad (GCUF)</span>
                  <span className="font-mono-num">Empirical Finance</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Publications Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Interactive Segmented Filter Controls */}
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-xl border self-start"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {(
              [
                { id: 'all', label: `All Publications (${research.publications.length})` },
                { id: 'cited', label: 'Most Cited' },
                { id: 'recent', label: '2018 – 2023' },
              ] as const
            ).map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className="px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, author, journal, year..."
              aria-label="Search research publications"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm theme-surface"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Publications List (All 9 Items) */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPublications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 rounded-2xl border text-center"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <p
                  className="text-base font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  No publications match “{searchQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                  className="mt-3 text-xs font-semibold underline cursor-pointer"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              filteredPublications.map((pub) => (
                <motion.article
                  key={pub.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-7 rounded-[22px] border theme-surface flex flex-col md:flex-row md:items-center justify-between gap-6"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div className="space-y-2 max-w-4xl">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div
                      className="flex flex-wrap items-center gap-2 text-xs font-mono-num"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span style={{ color: 'var(--accent-gold)' }}>
                        Publication 0{pub.id}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Year: {pub.year}</span>
                      {pub.citations !== undefined && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span
                            className="font-semibold"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            Cited by {pub.citations}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif-display text-lg sm:text-xl font-semibold leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {pub.title}
                    </h3>

                    {/* Authors & Journal */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {pub.authors}
                      </span>{' '}
                      <span aria-hidden="true">—</span>{' '}
                      <span className="italic">{pub.journal}</span>
                    </p>
                  </div>

                  {/* Action: Copy Citation Button */}
                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(pub)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-card-elevated)',
                        borderColor:
                          copiedId === pub.id
                            ? 'var(--accent-gold)'
                            : 'var(--border-strong)',
                        color: 'var(--text-primary)',
                      }}
                      aria-label={`Copy citation for ${pub.title}`}
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: 'var(--accent-gold)' }}
                          />
                          <span>Citation Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy
                            className="w-3.5 h-3.5"
                            style={{ color: 'var(--accent-primary)' }}
                          />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
