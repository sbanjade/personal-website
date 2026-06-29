export default function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: '#030610',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
        © {new Date().getFullYear()} Sachin Banjade. Built with React, Three.js & Framer Motion.
      </p>
    </footer>
  );
}
