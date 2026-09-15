import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 6,
}));

function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: '#00ff88' }}
      animate={{ opacity: [0, 0.5, 0], y: [0, -50, -100], scale: [0, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function Hero({ onStartExperience }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 7;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(0,255,136,0.07) 0%, transparent 65%)',
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent, #00ff88, transparent)', opacity: 0.35,
      }} />

      {/* Corner TL */}
      <div className="absolute pointer-events-none" style={{ top: 90, left: 24 }}>
        <div style={{ width: 28, height: 1, background: '#00ff88', opacity: 0.45 }} />
        <div style={{ width: 1, height: 28, background: '#00ff88', opacity: 0.45 }} />
      </div>
      {/* Corner TR */}
      <div className="absolute pointer-events-none" style={{ top: 90, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ width: 28, height: 1, background: '#00ff88', opacity: 0.45 }} />
        <div style={{ width: 1, height: 28, background: '#00ff88', opacity: 0.45 }} />
      </div>

      {/* Content wrapper — single vertical column, perfectly centered */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 1400,
        padding: '100px 40px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
        >
          <div style={{ width: 32, height: 1, background: '#00ff88' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.38em',
            color: '#00ff88',
            textTransform: 'uppercase',
          }}>
            ZOKES // H2R EXPERIENCE
          </span>
          <div style={{ width: 32, height: 1, background: '#00ff88' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3.2rem, 8vw, 9rem)',
            lineHeight: 0.88,
            letterSpacing: '0.06em',
            textAlign: 'center',
            color: '#fff',
            textShadow: '0 0 80px rgba(0,255,136,0.12)',
            marginBottom: 0,
          }}
        >
          ENGINEERED
          <br />
          <span style={{ color: '#00ff88', textShadow: '0 0 50px rgba(0,255,136,0.55)' }}>
            FOR EXTREMES.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.16em',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Experience the machine beyond ordinary performance.
        </motion.p>

        {/* Motorcycle image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: 920,
            margin: '32px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `perspective(1200px) rotateX(${mousePos.y * 0.25}deg) rotateY(${mousePos.x * 0.25}deg)`,
            transition: 'transform 0.18s ease-out',
            willChange: 'transform',
          }}
        >
          {/* Ground reflection glow */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '65%',
            height: 32,
            background: 'rgba(0,255,136,0.18)',
            filter: 'blur(28px)',
            borderRadius: '50%',
          }} />
          <img
            src="/assets/motorcycle/hero.jpg"
            alt="ZOKES H2R Concept Hyperbike"
            style={{
              width: '100%',
              objectFit: 'contain',
              maxHeight: '46vh',
              filter: 'drop-shadow(0 0 70px rgba(0,255,136,0.28)) drop-shadow(0 24px 48px rgba(0,0,0,0.85))',
              display: 'block',
            }}
            loading="eager"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
        >
          <motion.button
            onClick={onStartExperience}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative',
              padding: '16px 44px',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              border: '1px solid #00ff88',
              background: 'transparent',
              color: hovered ? '#000' : '#00ff88',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'color 0.3s ease',
              outline: 'none',
            }}
          >
            <motion.span
              style={{
                position: 'absolute',
                inset: 0,
                background: '#00ff88',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>START EXPERIENCE →</span>
          </motion.button>

          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#444',
            letterSpacing: '0.14em',
            textAlign: 'center',
          }}>
            SCROLL TO EXPLORE · CLICK TO ENABLE AUDIO
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: 120,
        background: 'linear-gradient(to bottom, transparent, #000)',
      }} />
    </section>
  );
}
