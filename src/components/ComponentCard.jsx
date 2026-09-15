import { motion } from 'framer-motion';

export default function ComponentCard({ part, onClose }) {
  if (!part) return null;

  return (
    <motion.div
      key={part.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.88)',
        border: '1px solid rgba(0,255,136,0.18)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 5,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,255,136,0.3)',
          borderRadius: 4,
          background: 'transparent',
          color: '#00ff88',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        ✕
      </button>

      {/* Body */}
      <div style={{ padding: '24px 22px', flex: 1 }}>
        {/* Tag */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          letterSpacing: '0.24em',
          color: '#00ff88',
          marginBottom: 6,
          opacity: 0.8,
        }}>
          COMPONENT ANALYSIS
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          fontSize: '1.55rem',
          color: '#fff',
          letterSpacing: '0.08em',
          margin: '0 0 4px',
        }}>
          {part.name}
        </h3>

        {/* Tagline */}
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.82rem',
          color: '#00ff88',
          letterSpacing: '0.06em',
          marginBottom: 14,
          fontWeight: 500,
        }}>
          {part.tagline}
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: 1,
          background: 'rgba(0,255,136,0.1)',
          marginBottom: 14,
        }} />

        {/* Description */}
        <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.52)',
          lineHeight: 1.7,
          marginBottom: 20,
        }}>
          {part.description}
        </p>

        {/* Spec table */}
        <div style={{
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid rgba(0,255,136,0.1)',
        }}>
          {/* Table header */}
          <div style={{
            padding: '9px 12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: '#00ff88',
            background: 'rgba(0,255,136,0.05)',
            borderBottom: '1px solid rgba(0,255,136,0.1)',
          }}>
            SPECIFICATIONS
          </div>

          {part.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                borderBottom: i < part.specs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)',
              }}
            >
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#505050',
                letterSpacing: '0.1em',
              }}>
                {spec.label.toUpperCase()}
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: '#ccc',
                fontWeight: 500,
              }}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9,
          color: '#2a2a2a',
          letterSpacing: '0.05em',
          marginTop: 14,
          lineHeight: 1.6,
        }}>
          ⚠ {part.note}
        </p>
      </div>
    </motion.div>
  );
}
