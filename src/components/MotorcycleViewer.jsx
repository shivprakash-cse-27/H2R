import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motorcycleParts } from '../data/motorcycleParts';

function Hotspot({ part, onClick, isActive }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => onClick(part)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + Math.random() * 0.6, type: 'spring', stiffness: 200 }}
      style={{
        position: 'absolute',
        left: `${part.hotspot.x}%`,
        top: `${part.hotspot.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer pulse ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `1px solid ${isActive ? '#00ff88' : 'rgba(0,255,136,0.5)'}`,
        }}
        animate={{
          scale: [1, 1.7, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: isActive ? 1.2 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Second ring for active */}
      {isActive && (
        <motion.div
          style={{
            position: 'absolute',
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(0,255,136,0.25)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      )}

      {/* Core dot */}
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: isActive ? '#00ff88' : (hovered ? '#00ff88' : 'rgba(0,255,136,0.7)'),
        boxShadow: (isActive || hovered)
          ? '0 0 14px #00ff88, 0 0 28px rgba(0,255,136,0.45)'
          : '0 0 6px rgba(0,255,136,0.35)',
        transition: 'all 0.2s ease',
      }} />

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ duration: 0.14 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '5px 10px',
              borderRadius: 3,
              background: 'rgba(0,0,0,0.92)',
              border: '1px solid rgba(0,255,136,0.45)',
              color: '#00ff88',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            {part.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function MotorcycleViewer({ onSelectPart, selectedPart, progress, experienceStarted }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setMousePos({ x, y });
  };

  const brightness = 0.55 + progress * 0.75;
  const glowAmt = progress * 0.35;

  return (
    <section
      id="machine"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
        position: 'relative',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginTop: 90, marginBottom: 32 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
          <div style={{ width: 40, height: 1, background: 'rgba(0,255,136,0.45)' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: '#00ff88',
          }}>
            THE MACHINE
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(0,255,136,0.45)' }} />
        </div>

        <h2 style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          color: '#fff',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          ZOKES H2R <span style={{ color: '#00ff88' }}>CONCEPT</span>
        </h2>

        {experienceStarted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#555',
              letterSpacing: '0.18em',
              marginTop: 10,
            }}
          >
            HOVER HOTSPOTS TO EXPLORE · CLICK TO SELECT
          </motion.p>
        )}
      </motion.div>

      {/* Motorcycle image container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1000,
          margin: '0 auto',
          cursor: 'crosshair',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ground glow */}
        <div style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '55%',
          height: 36,
          background: `rgba(0,255,136,${glowAmt})`,
          filter: 'blur(32px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Parallax wrapper */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            transform: `perspective(1200px) rotateX(${mousePos.y * 0.18}deg) rotateY(${mousePos.x * 0.18}deg)`,
            transition: 'transform 0.2s ease-out',
            willChange: 'transform',
          }}
        >
          <img
            src="/assets/motorcycle/hero.jpg"
            alt="ZOKES H2R Concept Motorcycle"
            style={{
              width: '100%',
              objectFit: 'contain',
              maxHeight: '58vh',
              display: 'block',
              margin: '0 auto',
              filter: `brightness(${brightness}) drop-shadow(0 0 ${35 + progress * 45}px rgba(0,255,136,${glowAmt}))`,
              transition: 'filter 0.6s ease',
            }}
            loading="lazy"
          />

          {/* Hotspots */}
          {experienceStarted && motorcycleParts.map((part) => (
            <Hotspot
              key={part.id}
              part={part}
              onClick={onSelectPart}
              isActive={selectedPart?.id === part.id}
            />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: '#2a2a2a',
          letterSpacing: '0.2em',
          textAlign: 'center',
          marginTop: 28,
        }}
      >
        H2R-INSPIRED CONCEPT · NOT AN OFFICIAL MANUFACTURER PRODUCT
      </motion.p>
    </section>
  );
}
