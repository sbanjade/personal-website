import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILL_CATEGORIES } from '../utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function SkillPill({ skill, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium cursor-default transition-all duration-200"
      style={{
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,255,255,0.08)'}`,
        color: hovered ? color : 'rgba(255,255,255,0.6)',
        transform: hovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
        boxShadow: hovered ? `0 4px 15px ${color}20` : 'none',
      }}
    >
      {skill}
    </motion.span>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: '#050816' }}
      ref={ref}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7c3aed' }}>
            02. Expertise
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">
            Skills & Stack
          </motion.h2>
          <motion.div variants={fadeUp} className="section-title-line" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-wrap gap-3 mb-10"
        >
          <motion.button
            variants={fadeUp}
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: activeCategory === null ? 'linear-gradient(135deg,#00d4ff,#7c3aed)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: activeCategory === null ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            All
          </motion.button>
          {SKILL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.title}
              variants={fadeUp}
              onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: activeCategory === cat.title ? `${cat.color}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat.title ? cat.color + '50' : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat.title ? cat.color : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
              }}
            >
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES
            .filter((cat) => !activeCategory || cat.title === activeCategory)
            .map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cat.color}30`;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${cat.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  </div>
                  <h3 className="font-bold text-sm tracking-wide" style={{ color: cat.color }}>
                    {cat.title}
                  </h3>
                </div>

                {/* Skills pills */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  className="flex flex-wrap gap-2"
                >
                  {cat.skills.map((skill) => (
                    <SkillPill key={skill} skill={skill} color={cat.color} />
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </div>

        {/* Orbit visual (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 flex items-center justify-center"
        >
          <div className="relative w-48 h-48">
            {/* Core */}
            <div
              className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff',
                width: 64,
                height: 64,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 10,
              }}
            >
              Dev
            </div>
            {/* Orbit rings */}
            {[70, 90].map((r, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: r * 2,
                  height: r * 2,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  border: `1px solid rgba(${i === 0 ? '0,212,255' : '124,58,237'},0.12)`,
                  animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
                }}
              />
            ))}
            {/* Orbiting dots */}
            {['Java', 'React', 'Python', 'MySQL', 'AI'].map((label, i) => {
              const angle = (i / 5) * 360;
              const r = 80;
              const x = r * Math.cos((angle * Math.PI) / 180);
              const y = r * Math.sin((angle * Math.PI) / 180);
              return (
                <div
                  key={label}
                  className="absolute flex items-center justify-center rounded-full text-[9px] font-bold"
                  style={{
                    width: 28,
                    height: 28,
                    top: `calc(50% + ${y}px - 14px)`,
                    left: `calc(50% + ${x}px - 14px)`,
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.3)',
                    color: '#00d4ff',
                  }}
                >
                  {label[0]}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
