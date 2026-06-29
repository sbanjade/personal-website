import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #080d28 100%)' }}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#06b6d4' }}>
            03. Career
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">
            Experience
          </motion.h2>
          <motion.div variants={fadeUp} className="section-title-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, #00d4ff, #7c3aed, transparent)' }}
          />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-12 last:mb-0 group"
            >
              {/* Dot */}
              <div
                className="absolute -left-10 top-4 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: exp.color, boxShadow: `0 0 15px ${exp.color}60` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>

              <div
                className="rounded-2xl p-7 transition-all duration-400 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${exp.color}08`;
                  e.currentTarget.style.borderColor = `${exp.color}25`;
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${exp.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'white' }}>{exp.title}</h3>
                    <p className="text-sm font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                    >
                      {exp.period}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{exp.location}</span>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="space-y-3">
                  {exp.achievements.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <span
                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: exp.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
