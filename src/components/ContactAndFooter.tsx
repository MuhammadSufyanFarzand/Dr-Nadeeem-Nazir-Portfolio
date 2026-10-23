import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUp,
  CheckCircle2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Send,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MagneticButton, SectionHeader, TiltCard } from './MotionPrimitives';

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  multiline?: boolean;
}

const FloatingField: React.FC<FloatingInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = true,
  multiline = false,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.trim().length > 0;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 pt-6 pb-2.5 rounded-xl border text-sm sm:text-base theme-surface resize-y"
          style={{
            backgroundColor: 'var(--bg-card-elevated)',
            borderColor: focused ? 'var(--accent-primary)' : 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 pt-6 pb-2.5 rounded-xl border text-sm sm:text-base theme-surface"
          style={{
            backgroundColor: 'var(--bg-card-elevated)',
            borderColor: focused ? 'var(--accent-primary)' : 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          isFloating ? 'top-2 text-[11px] font-medium' : 'top-4 text-sm'
        }`}
        style={{
          color: focused
            ? 'var(--accent-primary)'
            : isFloating
            ? 'var(--accent-gold)'
            : 'var(--text-muted)',
        }}
      >
        {label}
      </label>
    </div>
  );
};

export const ContactAndFooter: React.FC = () => {
  const { contact, profile, navLinks } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rocketLaunching, setRocketLaunching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * HOW TO CONNECT FORMSPREE OR EMAILJS LATER:
     * ------------------------------------------------------------------------
     * Option A (Formspree):
     *   await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify({ name, email, subject, message }),
     *   });
     *
     * Option B (EmailJS):
     *   await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
     *     from_name: name,
     *     reply_to: email,
     *     subject,
     *     message,
     *   }, "YOUR_PUBLIC_KEY");
     */

    const mailtoSubject = encodeURIComponent(
      subject.trim() || `Academic / Consultancy Inquiry from ${name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    );

    const mailtoHref = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailtoHref;

    setIsSubmitted(true);
    window.setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 5000);
  };

  const handleBackToTop = () => {
    setRocketLaunching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => setRocketLaunching(false), 900);
  };

  return (
    <>
      <section
        id="contact"
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            kicker="10 · Direct Correspondence"
            title="Get in Touch"
            subtitle="Available for academic leadership, postgraduate research supervision, legal consultancy, and enterprise ERP/SAP advisory."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Details + Quick Action Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <TiltCard className="p-7 sm:p-8 space-y-6">
                <div>
                  <p
                    className="text-xs font-mono-num uppercase tracking-wider mb-1"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    Direct Contact Channels
                  </p>
                  <h3
                    className="font-serif-display text-2xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {profile.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Chairman, Department of Management Sciences
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Email */}
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-4 p-3.5 rounded-2xl border transition-transform duration-200 hover:translate-x-1"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-primary-soft)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-mono-num"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Email Address
                      </p>
                      <p
                        className="text-sm sm:text-base font-medium break-all"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {contact.email}
                      </p>
                    </div>
                  </a>

                  {/* Cellular & WhatsApp */}
                  <a
                    href={`tel:${contact.phoneRaw}`}
                    className="flex items-start gap-4 p-3.5 rounded-2xl border transition-transform duration-200 hover:translate-x-1"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-gold-soft)',
                        color: 'var(--accent-gold)',
                      }}
                    >
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-mono-num"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Cellular &amp; WhatsApp
                      </p>
                      <p
                        className="text-sm sm:text-base font-mono-num font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {contact.phoneRaw}
                      </p>
                    </div>
                  </a>

                  {/* LinkedIn Profile */}
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-3.5 rounded-2xl border transition-transform duration-200 hover:translate-x-1"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-primary-soft)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-mono-num"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        LinkedIn Profile
                      </p>
                      <p
                        className="text-sm sm:text-base font-medium break-all"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {contact.linkedinDisplay}
                      </p>
                    </div>
                  </a>

                  {/* Residence / Office Address */}
                  <div
                    className="flex items-start gap-4 p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: 'var(--bg-card-elevated)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-gold-soft)',
                        color: 'var(--accent-gold)',
                      }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-mono-num"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Address
                      </p>
                      <p
                        className="text-sm sm:text-base font-medium leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons: Email Me, WhatsApp, LinkedIn, Call */}
                <div className="pt-3 grid grid-cols-2 gap-3">
                  <MagneticButton
                    href={`mailto:${contact.email}`}
                    variant="primary"
                    className="w-full"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Me</span>
                  </MagneticButton>

                  <MagneticButton
                    href={contact.whatsappUrl}
                    external
                    variant="secondary"
                    className="w-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </MagneticButton>

                  <MagneticButton
                    href={contact.linkedinUrl}
                    external
                    variant="outline"
                    className="w-full"
                  >
                    <Linkedin
                      className="w-4 h-4"
                      style={{ color: 'var(--accent-primary)' }}
                    />
                    <span>LinkedIn</span>
                  </MagneticButton>

                  <MagneticButton
                    href={`tel:${contact.phoneRaw}`}
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </MagneticButton>
                </div>
              </TiltCard>
            </div>

            {/* Right Column: Stylish Contact Form with Floating Labels */}
            <div className="lg:col-span-7">
              <TiltCard className="p-7 sm:p-9">
                <h3
                  className="font-serif-display text-2xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Send a Direct Message
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Complete the form below to compose a pre-addressed message directly to{' '}
                  <span className="font-mono-num font-medium" style={{ color: 'var(--text-primary)' }}>
                    {contact.email}
                  </span>
                  .
                </p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="p-8 rounded-2xl border text-center space-y-3"
                      style={{
                        backgroundColor: 'var(--bg-card-elevated)',
                        borderColor: 'var(--accent-gold)',
                      }}
                    >
                      <CheckCircle2
                        className="w-12 h-12 mx-auto"
                        style={{ color: 'var(--accent-gold)' }}
                      />
                      <h4
                        className="font-serif-display text-2xl font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Message Prepared in Your Mail Client
                      </h4>
                      <p
                        className="text-sm max-w-md mx-auto leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Your email client has been opened with your prefilled message to{' '}
                        <span className="font-mono-num">{contact.email}</span>.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold underline cursor-pointer"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        Send another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FloatingField
                          id="contact-name"
                          label="Your Full Name"
                          value={name}
                          onChange={setName}
                        />
                        <FloatingField
                          id="contact-email"
                          label="Your Email Address"
                          type="email"
                          value={email}
                          onChange={setEmail}
                        />
                      </div>

                      <FloatingField
                        id="contact-subject"
                        label="Subject (e.g., Academic Supervision, Legal or ERP Consultancy)"
                        value={subject}
                        onChange={setSubject}
                      />

                      <FloatingField
                        id="contact-message"
                        label="Your Message"
                        value={message}
                        onChange={setMessage}
                        multiline
                      />

                      <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                        <span
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Opens prefilled email to {contact.email}
                        </span>

                        <MagneticButton type="submit" variant="primary">
                          <span>Send Inquiry</span>
                          <Send className="w-4 h-4" />
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t theme-surface"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            {/* Brand Monogram & Credentials */}
            <div className="flex items-center gap-3.5">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center font-serif-display font-bold text-lg shrink-0"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--text-primary)',
                }}
              >
                {profile.monogram}
              </span>
              <div>
                <p
                  className="font-serif-display font-semibold text-lg"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {profile.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {profile.credentials}
                </p>
              </div>
            </div>

            {/* Quick Navigation Links + LinkedIn */}
            <nav
              aria-label="Footer Quick Links"
              className="flex flex-wrap items-center gap-5"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors hover:underline"
                style={{ color: 'var(--accent-primary)' }}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </nav>

            {/* Back to Top Button with Rocket/Arrow Animation */}
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer group theme-surface"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <span>Back to top</span>
              <motion.span
                animate={
                  rocketLaunching
                    ? { y: -22, opacity: 0 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-flex items-center justify-center"
                style={{ color: 'var(--accent-gold)' }}
              >
                <Rocket className="w-4 h-4 hidden sm:inline-block group-hover:-translate-y-0.5 transition-transform" />
                <ArrowUp className="w-4 h-4 sm:hidden" />
              </motion.span>
            </button>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <p>{contact.copyright}</p>
            <p className="text-center">
              This website is developed by{' '}
              <span
                className="font-serif-display font-semibold tracking-wide"
                style={{ color: 'var(--accent-gold)' }}
              >
                {contact.developerName}
              </span>
            </p>
            <p className="text-center md:text-right">
              Department of Management Sciences · Government Graduate College Samanabad, Faisalabad
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
