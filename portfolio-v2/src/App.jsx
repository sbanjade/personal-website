import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveDot = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
    };

    let rafId;
    const animateRing = () => {
      if (ring.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ring.current.style.left = `${ringPos.current.x}px`;
        ring.current.style.top = `${ringPos.current.y}px`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const addHover = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea');
      if (el) {
        dot.current?.classList.add('hover');
        ring.current?.classList.add('hover');
      }
    };
    const removeHover = () => {
      dot.current?.classList.remove('hover');
      ring.current?.classList.remove('hover');
    };

    window.addEventListener('mousemove', moveDot);
    document.addEventListener('mouseover', addHover);
    document.addEventListener('mouseout', removeHover);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveDot);
      document.removeEventListener('mouseover', addHover);
      document.removeEventListener('mouseout', removeHover);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" style={{ position: 'fixed', pointerEvents: 'none' }} />
      <div ref={ring} className="cursor-follower" style={{ position: 'fixed', pointerEvents: 'none' }} />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
