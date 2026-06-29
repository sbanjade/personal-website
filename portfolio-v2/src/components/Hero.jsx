import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaInstagram } from 'react-icons/fa';
import StarsCanvas from '../canvas/StarsCanvas';
import { HERO_ROLES } from '../utils/constants';
import { useMouseParallax } from '../hooks/useMouseParallax';

const SOCIALS = [
  { icon: FaGithub,     href: 'https://github.com/sbanjade',                          label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/sachin-banjade-345339248/', label: 'LinkedIn' },
  { icon: FaEnvelope,   href: 'mailto:banjadesachin2060@gmail.com',                    label: 'Email' },
  { icon: FaInstagram,  href: 'https://www.instagram.com/banjadesachin/',              label: 'Instagram' },
];

function useTypingEffect(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && text === current) {
      timeout.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout.current = setTimeout(() => {
        setText(deleting ? text.slice(0, -1) : current.slice(0, text.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout.current);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const mouse = useMouseParallax();
  const typedText = useTypingEffect(HERO_ROLES);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050816' }}
    >
      {/* 3D Stars */}
      <StarsCanvas />

      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
          transition: 'transform 0.4s ease',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          bottom: '5%',
          right: '5%',
          transform: `translate(${-mouse.x * 15}px, ${-mouse.y * 10}px)`,
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: '#00d4ff',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black leading-none tracking-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Sachin</span>
              <br />
              <span className="text-white">Banjade</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl lg:text-2xl font-medium mb-6"
              style={{ color: 'rgba(255,255,255,0.7)', minHeight: '2em' }}
            >
              <span style={{ color: '#00d4ff' }}>{typedText}</span>
              <span className="typing-cursor" style={{ color: '#7c3aed' }}>|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480 }}
            >
              CS Honors Graduate (GPA 3.80) from UNT. Award-winning full-stack engineer
              building production-ready web apps with Java, Python, React, and AI integration.
              Daily Claude Code + Cursor user.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-3 mb-8"
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                    e.currentTarget.style.color = '#00d4ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn-pulse px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              >
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff, #7c3aed, #06b6d4, transparent, #00d4ff)',
                  padding: 3,
                  borderRadius: '50%',
                  animation: 'spin 6s linear infinite',
                  width: '100%',
                  height: '100%',
                }}
              />
              {/* Glow */}
              <div
                className="profile-glow absolute inset-0 rounded-full"
                style={{ borderRadius: '50%' }}
              />
              {/* Photo */}
              <div
                className="relative rounded-full overflow-hidden float-anim"
                style={{
                  width: 300,
                  height: 300,
                  border: '3px solid rgba(0,212,255,0.3)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(124,58,237,0.1)',
                }}
              >
                <img
                  src="/images/WhatsApp Image 2024-04-24 at 09.18.57_ebefb72c.jpg"
                  alt="Sachin Banjade"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  color: '#10b981',
                  whiteSpace: 'nowrap',
                }}
              >
                🏆 Award Winner 2026
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00d4ff',
                  whiteSpace: 'nowrap',
                }}
              >
                GPA 3.80 / 4.0
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <div className="scroll-dot w-1 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
        </div>
      </motion.div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
