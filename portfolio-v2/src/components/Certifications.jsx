import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCheckCircle, FaClock, FaShieldAlt, FaDatabase, FaGoogle, FaNodeJs } from 'react-icons/fa';
import { CERTIFICATIONS, HONORS } from '../utils/constants';

const ICON_MAP = {
  google: FaGoogle,
  node: FaNodeJs,
  db: FaDatabase,
  shield: FaShieldAlt,
};

const STATUS_CONFIG = {
  'completed':    { label: 'Completed',    color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)' },
  'in-progress':  { label: 'In Progress',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="certifications"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080d28 0%, #050816 100%)' }}
      ref={ref}
    >
      <div
        className="absolute top-0 left-1/3 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#06b6d4' }}>
            05. Credentials
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">
            Certifications & Honors
          </motion.h2>
          <motion.div variants={fadeUp} className="section-title-line" />
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = ICON_MAP[cert.icon] || FaCheckCircle;
            const s = STATUS_CONFIG[cert.status];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cert.color}30`;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${cert.color}10, 0 0 0 1px ${cert.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    <Icon size={18} style={{ color: cert.color }} />
                  </div>
                  <span
                    className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                  >
                    {cert.status === 'completed' ? <FaCheckCircle size={9} /> : <FaClock size={9} />}
                    {s.label}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {cert.title}
                </h3>
                <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{cert.issuer}</p>
                <p className="text-xs font-medium" style={{ color: cert.color }}>{cert.date}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Honors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Honors & Awards
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {HONORS.map((honor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="text-base mt-0.5">🏆</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{honor}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
