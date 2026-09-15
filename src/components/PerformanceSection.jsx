import { motion } from 'framer-motion';

const stats = [
  { value: '300+', unit: 'BHP', label: 'CONCEPT OUTPUT' },
  { value: '340+', unit: 'KM/H', label: 'TOP SPEED' },
  { value: '<3S', unit: '0→100', label: 'CONCEPT TIME' },
  { value: 'SC', unit: 'BOOST', label: 'SUPERCHARGED' },
];

const speedLines = Array.from({ length: 16 }, (_, i) => i);

export default function PerformanceSection({ onRestart }) {
  return (
    <section
      id="performance"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 40px',
        boxSizing: 'border-box',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,255,136,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Scan lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.008) 3px, rgba(0,255,136,0.008) 6px)',
        pointerEvents: 'none',
      }} />

      {/* Speed lines radiating from center */}
      {speedLines.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            height: 1,
            width: `${50 + i * 35}px`,
            background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.12), transparent)',
            transformOrigin: 'left center',
            transform: `rotate(${i * 22.5}deg)`,
            marginTop: '-0.5px',
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], scaleX: [1, 1.25, 1] }}
          transition={{ duration: 2.2 + i * 0.15, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>

        {/* Stage label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
        >
          <div style={{ width: 52, height: 1, background: '#00ff88', opacity: 0.5 }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.38em',
            color: '#00ff88',
          }}>
            FINAL STAGE · 200+ KM/H
          </span>
          <div style={{ width: 52, height: 1, background: '#00ff88', opacity: 0.5 }} />
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 9vw, 9.5rem)',
            lineHeight: 0.88,
            letterSpacing: '0.04em',
            textAlign: 'center',
            color: '#fff',
            margin: 0,
          }}
        >
          BUILT FOR THE
          <br />
          <span style={{
            color: '#00ff88',
            textShadow: '0 0 70px rgba(0,255,136,0.55), 0 0 130px rgba(0,255,136,0.2)',
          }}>
            UNREASONABLE.
          </span>
        </motion.h2>

        {/* Motorcycle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            width: '100%',
            maxWidth: 860,
            margin: '40px auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Ground glow */}
          <div style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: 40,
            background: 'rgba(0,255,136,0.22)',
            filter: 'blur(36px)',
            borderRadius: '50%',
          }} />
          <img
            src="/assets/motorcycle/hero.jpg"
            alt="ZOKES H2R Final Reveal"
            style={{
              width: '100%',
              objectFit: 'contain',
              maxHeight: '38vh',
              display: 'block',
              filter: 'brightness(1.1) saturate(1.15) drop-shadow(0 0 90px rgba(0,255,136,0.45)) drop-shadow(0 0 180px rgba(0,255,136,0.15))',
            }}
            loading="lazy"
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            marginBottom: 44,
            width: '100%',
            maxWidth: 900,
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.1 }}
                style={{ textAlign: 'center', padding: '0 36px' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                    color: '#00ff88',
                    textShadow: '0 0 24px rgba(0,255,136,0.35)',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'rgba(0,255,136,0.6)',
                  }}>
                    {stat.unit}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: '#444',
                  letterSpacing: '0.22em',
                  marginTop: 4,
                }}>
                  {stat.label}
                </div>
              </motion.div>
              {i < stats.length - 1 && (
                <div style={{ width: 1, height: 40, background: 'rgba(0,255,136,0.12)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '16px 48px',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '0.3em',
              color: '#000',
              background: '#00ff88',
              border: '1px solid #00ff88',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 0 30px rgba(0,255,136,0.3)',
              transition: 'all 0.2s',
            }}
          >
            EXPLORE AGAIN →
          </motion.button>

          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#2a2a2a',
            letterSpacing: '0.18em',
            textAlign: 'center',
          }}>
            ZOKES // H2R EXPERIENCE · CONCEPT SHOWCASE
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            color: '#1a1a1a',
            letterSpacing: '0.05em',
            textAlign: 'center',
            maxWidth: 600,
            marginTop: 28,
            lineHeight: 1.7,
          }}
        >
          This is an H2R-inspired interactive concept created for ZOKES brand experience purposes.
          All specifications are fictional and do not represent official Kawasaki product data.
        </motion.p>
      </div>
    </section>
  );
}
