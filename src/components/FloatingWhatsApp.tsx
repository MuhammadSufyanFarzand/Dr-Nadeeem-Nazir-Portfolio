import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MessageCircle, Send, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const QUICK_TOPICS = [
  'Assalam-o-Alaikum Dr. Nadeem Nazir, I would like to discuss Academic / Research Supervision.',
  'Assalam-o-Alaikum Dr. Nadeem Nazir, I am reaching out regarding Legal / Corporate Consultancy.',
  'Assalam-o-Alaikum Dr. Nadeem Nazir, I would like to inquire about Accounting, Tax, or SAP/ERP Advisory.',
];

export const FloatingWhatsApp: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const phoneDigits = PORTFOLIO_DATA.contact.phoneRaw.replace(/[^0-9]/g, '');

  const openWhatsAppWithText = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${phoneDigits}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      customText.trim() ||
      'Assalam-o-Alaikum Dr. Nadeem Nazir, I visited your portfolio website and would like to connect.';
    openWhatsAppWithText(msg);
    setCustomText('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[65] flex flex-col items-end">
      {/* Expandable Quick WhatsApp Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3.5 w-[310px] sm:w-[340px] rounded-[22px] border overflow-hidden theme-surface"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-strong)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between gap-3"
              style={{
                background: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
                color: '#FFFFFF',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-serif-display font-bold text-sm">
                  {PORTFOLIO_DATA.profile.monogram}
                </div>
                <div>
                  <p className="font-serif-display font-semibold text-sm leading-tight">
                    {PORTFOLIO_DATA.profile.name}
                  </p>
                  <p className="text-[11px] opacity-90 font-mono-num">
                    WhatsApp · {PORTFOLIO_DATA.contact.phoneDisplay}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat widget"
                className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Select a topic below or write a direct message to start chatting on WhatsApp:
              </p>

              {/* Quick Topic Buttons */}
              <div className="space-y-2">
                {[
                  {
                    label: 'Academic & Research Supervision',
                    msg: QUICK_TOPICS[0],
                  },
                  {
                    label: 'Legal & Corporate Consultancy',
                    msg: QUICK_TOPICS[1],
                  },
                  {
                    label: 'Accounting, Tax & SAP/ERP Advisory',
                    msg: QUICK_TOPICS[2],
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => openWhatsAppWithText(item.msg)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-transform duration-150 hover:translate-x-1 cursor-pointer flex items-center justify-between gap-2"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>{item.label}</span>
                    <Send className="w-3.5 h-3.5 shrink-0 text-[#25D366]" />
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <form onSubmit={handleCustomSubmit} className="pt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Write your message..."
                  aria-label="Custom WhatsApp message"
                  className="flex-1 px-3.5 py-2 rounded-xl border text-xs"
                  style={{
                    backgroundColor: 'var(--bg-card-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Send on WhatsApp"
                  className="px-3.5 py-2 rounded-xl text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <span>Chat</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button + Hover Label */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.a
              href={PORTFOLIO_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 theme-surface"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <span>WhatsApp Dr. Nadeem Nazir</span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -7, 0],
                }
          }
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Animated Expanding Aura Ring */}
          {!prefersReducedMotion && (
            <motion.span
              aria-hidden="true"
              animate={{
                scale: [1, 1.45, 1.55],
                opacity: [0.45, 0.15, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ backgroundColor: '#25D366' }}
            />
          )}

          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open WhatsApp chat options"
            aria-expanded={isOpen}
            className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow: '0 12px 30px -6px rgba(37, 211, 102, 0.55)',
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <MessageCircle className="w-7 h-7 fill-white/15" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
