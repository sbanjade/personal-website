import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { PROJECTS } from '../utils/constants';

function TiltCard({ children, className, style }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const reset = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
        transition: hovered ? 'transform 0.05s ease' : 'transform 0.4s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? PROJECTS
    : filter === 'security' ? PROJECTS.filter(p => p.category === 'security')
    : PROJECTS.filter(p => !p.category);

  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{ background: '#050816' }}
      ref={ref}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7c3aed' }}>
            04. Portfolio
          </p>
          <h2 className="text-4xl lg:text-5xl font-black mb-4 gradient-text-white">Projects</h2>
          <div className="section-title-line" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-12"
        >
          {['all', 'software', 'security'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-200"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #00d4ff22, #7c3aed22)' : 'rgba(255,255,255,0.04)',
                border: filter === f ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                color: filter === f ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className="relative flex flex-col h-full rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: project.highlight
                    ? '1px solid rgba(0,212,255,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: project.highlight
                    ? '0 0 30px rgba(0,212,255,0.05)'
                    : 'none',
                }}
              >
                {/* Award badge */}
                {project.badge && (
                  <div
                    className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
                  >
                    {project.badge}
                  </div>
                )}

                {/* Image */}
                {project.image && (
                  <div className="h-40 overflow-hidden relative">
                    <div
                      className="absolute inset-0 z-10"
                      style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(5,8,22,1) 100%)' }}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs font-medium mb-1" style={{ color: 'rgba(0,212,255,0.7)' }}>
                    {project.subtitle}
                  </p>
                  <h3 className="font-bold text-base mb-2" style={{ color: 'white' }}>
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="space-y-1 mb-4">
                      {project.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <span style={{ color: '#00d4ff', marginTop: 2, flexShrink: 0 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techs.map((t) => (
                      <span key={t} className="tech-chip">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        <FaGithub size={12} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                        style={{
                          background: 'rgba(0,212,255,0.1)',
                          border: '1px solid rgba(0,212,255,0.3)',
                          color: '#00d4ff',
                        }}
                      >
                        <FaExternalLinkAlt size={10} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* More on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/sbanjade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <FaGithub size={18} />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
