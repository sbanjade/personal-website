import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const SOCIALS = [
  { icon: FaGithub,     href: 'https://github.com/sbanjade',                          label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/sachin-banjade-345339248/', label: 'LinkedIn' },
  { icon: FaInstagram,  href: 'https://www.instagram.com/banjadesachin/',              label: 'Instagram' },
];

const INFO = [
  { icon: FaEnvelope,      value: 'banjadesachin2060@gmail.com', href: 'mailto:banjadesachin2060@gmail.com' },
  { icon: FaMapMarkerAlt,  value: 'Euless, TX — open to relocation', href: null },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        'service_938122z',
        'template_njvjenl',
        formRef.current,
        'iJZNw5y-jxGWx2jz1',
      );
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: '#050816' }}
      ref={ref}
    >
      {/* Ambient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7c3aed' }}>
            06. Say Hi
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">
            Get In Touch
          </motion.h2>
          <motion.div variants={fadeUp} className="section-title-line" />
          <motion.p variants={fadeUp} className="mt-5 text-base" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480 }}>
            Whether you have a job opportunity, a project in mind, or just want to connect —
            my inbox is always open. I'll respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-6"
          >
            {INFO.map(({ icon: Icon, value, href }) => (
              <motion.div key={value} variants={fadeUp} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  <Icon size={16} style={{ color: '#00d4ff' }} />
                </div>
                {href ? (
                  <a href={href} className="text-sm hover:text-cyan-400 transition-colors" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {value}
                  </a>
                ) : (
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{value}</span>
                )}
              </motion.div>
            ))}

            {/* Social */}
            <motion.div variants={fadeUp} className="flex gap-3 pt-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                    e.currentTarget.style.color = '#00d4ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>

            {/* Resume download */}
            <motion.div variants={fadeUp}>
              <a
                href="/documents/sachin_banjade_universal_SB.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm mt-2 transition-all duration-200 hover:scale-105 btn-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))',
                  border: '1px solid rgba(0,212,255,0.25)',
                  color: '#00d4ff',
                }}
              >
                <span>📄</span>
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl p-7 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Name</label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Email</label>
                  <input
                    name="from_email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Subject</label>
                <input
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                }}
              >
                {status === 'idle' && 'Send Message →'}
                {status === 'sending' && 'Sending…'}
                {status === 'success' && '✓ Message sent!'}
                {status === 'error' && '✕ Failed — try email directly'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
