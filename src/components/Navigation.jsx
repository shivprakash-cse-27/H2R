import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'MACHINE', href: '#machine' },
  { label: 'COMPONENTS', href: '#components' },
  { label: 'ENGINEERING', href: '#engineering' },
  { label: 'PERFORMANCE', href: '#performance' },
];

export default function Navigation({ isMuted, onToggleMute, experienceStarted }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px',
        height: 64,
        background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,136,0.1)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '0.32em',
          color: '#fff',
        }}>
          ZOKES
        </span>
        <div style={{ width: 1, height: 16, background: 'rgba(0,255,136,0.4)' }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#00ff88',
          opacity: 0.75,
        }}>
          H2R
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#666',
              textDecoration: 'none',
              position: 'relative',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00ff88'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 8px #00ff88',
            animation: 'pulse-dot 1.8s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#00ff88',
          }}>
            SYSTEM ONLINE
          </span>
        </div>

        {/* Sound toggle */}
        <AnimatePresence>
          {experienceStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={onToggleMute}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '7px 14px',
                border: '1px solid rgba(0,255,136,0.3)',
                borderRadius: 4,
                background: 'transparent',
                color: isMuted ? '#444' : '#00ff88',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              whileHover={{ borderColor: '#00ff88' }}
              whileTap={{ scale: 0.96 }}
            >
              {isMuted ? '🔇 ENGINE OFF' : '🔊 ENGINE ON'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
