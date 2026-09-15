import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motorcycleParts } from '../data/motorcycleParts';
import ComponentCard from './ComponentCard';

export default function ComponentExplorer({ selectedPart, onSelectPart }) {
  const [activeId, setActiveId] = useState(null);
  const activePart = motorcycleParts.find((p) => p.id === activeId) || null;

  const handleSelect = (part) => {
    setActiveId(part.id);
    onSelectPart(part);
  };

  const handleClose = () => {
    setActiveId(null);
    onSelectPart(null);
  };

  return (
    <section
      id="components"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#050505',
        paddingBottom: 80,
        position: 'relative',
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.018) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: 100, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 14 }}
        >
          <div style={{ width: 40, height: 1, background: 'rgba(0,255,136,0.45)' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: '#00ff88',
          }}>
            COMPONENT EXPLORER
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(0,255,136,0.45)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            color: '#fff',
            letterSpacing: '0.08em',
            margin: '0 0 10px',
          }}
        >
          EXPLORE EVERY <span style={{ color: '#00ff88' }}>COMPONENT</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.1em',
          }}
        >
          Select any component to reveal detailed engineering specifications
        </motion.p>
      </div>

      {/* Main layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        padding: '0 32px',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
        className="flex-col-mobile"
      >
        {/* LEFT — parts list */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(0,255,136,0.12)',
            background: 'rgba(0,0,0,0.6)',
          }}>
            {/* List header */}
            <div style={{
              padding: '12px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#00ff88',
              background: 'rgba(0,255,136,0.05)',
              borderBottom: '1px solid rgba(0,255,136,0.1)',
            }}>
              SELECT COMPONENT
            </div>

            {/* Parts */}
            <div style={{ overflowY: 'auto', maxHeight: 600 }}>
              {motorcycleParts.map((part, i) => {
                const active = activeId === part.id;
                return (
                  <motion.button
                    key={part.id}
                    onClick={() => handleSelect(part)}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.035 }}
                    whileHover={{ background: 'rgba(0,255,136,0.06)' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      textAlign: 'left',
                      padding: '11px 14px',
                      background: active ? 'rgba(0,255,136,0.09)' : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      borderLeft: active ? '2.5px solid #00ff88' : '2.5px solid transparent',
                      cursor: 'pointer',
                      outline: 'none',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      borderLeft: active ? '2.5px solid #00ff88' : '2.5px solid transparent',
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: active ? '#00ff88' : 'rgba(0,255,136,0.3)',
                      boxShadow: active ? '0 0 8px #00ff88' : 'none',
                      transition: 'all 0.2s',
                    }} />
                    <div>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        color: active ? '#00ff88' : '#aaa',
                        fontWeight: 500,
                      }}>
                        {part.name}
                      </div>
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 10,
                        color: '#3a3a3a',
                        marginTop: 2,
                      }}>
                        {part.tagline}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — preview + card */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            {activePart ? (
              <motion.div
                key={activePart.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 20,
                  alignItems: 'start',
                }}
                className="component-grid"
              >
                {/* Large image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(0,255,136,0.22)',
                    background: '#000',
                    aspectRatio: '1 / 1',
                  }}
                >
                  <img
                    src={activePart.image}
                    alt={activePart.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.88)',
                    }}
                    loading="lazy"
                  />
                  {/* Glow overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 50px rgba(0,255,136,0.1)',
                    pointerEvents: 'none',
                  }} />
                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                    pointerEvents: 'none',
                  }} />
                  {/* Name overlay */}
                  <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      letterSpacing: '0.24em',
                      color: '#00ff88',
                      marginBottom: 4,
                    }}>COMPONENT</div>
                    <div style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: '#fff',
                      letterSpacing: '0.08em',
                    }}>{activePart.name}</div>
                  </div>
                </motion.div>

                {/* Info card */}
                <AnimatePresence mode="wait">
                  <ComponentCard key={activePart.id} part={activePart} onClose={handleClose} />
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  minHeight: 480,
                  border: '1px solid rgba(0,255,136,0.07)',
                  borderRadius: 12,
                  background: 'rgba(0,255,136,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 52, opacity: 0.18, filter: 'grayscale(1)' }}>⚙</div>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  color: '#2e2e2e',
                  letterSpacing: '0.22em',
                }}>
                  SELECT A COMPONENT FROM THE LIST
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
