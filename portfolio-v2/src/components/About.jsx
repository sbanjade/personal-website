import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS, EDUCATION } from '../utils/constants';

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isFloat = value.toString().includes('.');

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(value);
    const duration = 1600;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(2) : Math.floor(count)}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0a0f2e 50%, #050816 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4ff' }}>
            01. Introduction
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">
            About Me
          </motion.h2>
          <motion.div variants={fadeUp} className="section-title-line" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + Stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 mb-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                I'm a <span style={{ color: '#00d4ff' }}>Full-Stack Software Engineer</span> and CS Honors
                graduate from the University of North Texas (GPA 3.80). I build production-ready web
                applications, RESTful APIs, and database-driven systems end-to-end.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                My stack spans <span style={{ color: '#7c3aed' }}>Java and Python</span> on the backend,
                <span style={{ color: '#7c3aed' }}> React and Angular</span> on the frontend, and MySQL for
                data management. I integrate AI/LLM APIs (Groq, LLaMA 3.1), build ETL pipelines, and
                write secure, testable code daily using Claude Code and Cursor.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                My <span style={{ color: '#10b981' }}>Alumni Networking Tool</span> won Best Project at
                the UNT Senior Design Research & Design Day & CSE Awards Ceremony 2026.
                Available full-time — open to relocation anywhere in the US.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="rounded-xl p-5 text-center"
                  style={{
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid rgba(0,212,255,0.12)',
                  }}
                >
                  <div className="text-3xl font-black gradient-text mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Education Timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Education
            </motion.p>
            <div className="relative pl-6">
              {/* Timeline line */}
              <div
                className="absolute left-0 top-3 bottom-3 w-px"
                style={{ background: 'linear-gradient(to bottom, #00d4ff, #7c3aed, transparent)' }}
              />
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full"
                    style={{ background: edu.color, boxShadow: `0 0 10px ${edu.color}60` }}
                  />
                  <div
                    className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${edu.color}30`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm" style={{ color: edu.color }}>{edu.school}</h3>
                      <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>{edu.period}</span>
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>{edu.degree}</p>
                    {edu.gpa && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                        GPA {edu.gpa}
                      </span>
                    )}
                    {edu.highlights && (
                      <ul className="space-y-1">
                        {edu.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            <span style={{ color: edu.color, marginTop: 2 }}>›</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
