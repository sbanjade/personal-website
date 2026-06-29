import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass glow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(5,8,22,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        } : {}}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-bold text-lg tracking-tight gradient-text cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          Sachin<span className="text-white">.</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-sm font-medium transition-colors duration-200"
              style={{
                background: 'none',
                border: 'none',
                color: active === link.href ? '#00d4ff' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-1 w-full h-px"
                  style={{ background: 'linear-gradient(90deg,#00d4ff,#7c3aed)' }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Resume CTA */}
        <a
          href="/documents/sachin_banjade_universal_SB.pdf"
          download
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00d4ff',
          }}
        >
          Resume
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className="block h-0.5 w-6 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
            />
            <span
              className="block h-0.5 w-6 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-6 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-6 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5,8,22,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-6 py-4 text-sm font-medium border-b transition-colors"
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/documents/sachin_banjade_universal_SB.pdf"
              download
              className="block px-6 py-4 text-sm font-semibold"
              style={{ color: '#00d4ff' }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
