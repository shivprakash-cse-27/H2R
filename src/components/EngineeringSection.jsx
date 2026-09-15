import { motion } from 'framer-motion';

const pillars = [
  {
    id: 'aero',
    label: 'AERODYNAMICS',
    icon: '◈',
    headline: 'Air Is The Enemy.',
    body: 'Every surface sculpted in a wind tunnel. The fairing generates positive downforce, forcing the front wheel into the road at extreme velocity. Winglets, ducts, and channels work in concert to manage airflow and thermal heat.',
    metric: '340+',
    unit: 'KM/H',
    metricLabel: 'TOP SPEED CONCEPT',
    img: '/assets/components/bodywork.jpg',
  },
  {
    id: 'power',
    label: 'POWER',
    icon: '⚡',
    headline: 'Beyond Redline.',
    body: 'A centrifugal supercharger feeds forced air into the inline-four at extreme pressure, producing power output that makes conventional performance figures irrelevant. The powerband is relentless, linear, and total.',
    metric: '300+',
    unit: 'BHP',
    metricLabel: 'CONCEPT OUTPUT',
    img: '/assets/components/engine.jpg',
  },
  {
    id: 'chassis',
    label: 'CHASSIS',
    icon: '◻',
    headline: 'Weight Is The Enemy.',
    body: 'A high-tensile steel trellis frame with aluminium monocoque sections provides extreme torsional stiffness at minimal weight. Every bracket, bolt and brace serves a structural purpose. There is no excess.',
    metric: '<200',
    unit: 'KG',
    metricLabel: 'DRY WEIGHT CONCEPT',
    img: '/assets/components/rear-shock.jpg',
  },
  {
    id: 'thermal',
    label: 'THERMAL MANAGEMENT',
    icon: '◎',
    headline: 'Heat Controlled.',
    body: 'Supercharged engines generate extreme thermal loads. Precision-engineered oil cooling, liquid cooling and strategic airflow channels maintain operating temperatures under sustained track conditions.',
    metric: '110',
    unit: '°C',
    metricLabel: 'PEAK ENGINE TEMP',
    img: '/assets/components/exhaust.jpg',
  },
];

export default function EngineeringSection() {
  return (
    <section
      id="engineering"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#030303',
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scan-line overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.006) 2px, rgba(0,255,136,0.006) 4px)',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
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
            ENGINEERING
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(0,255,136,0.45)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
            color: '#fff',
            letterSpacing: '0.06em',
            lineHeight: 0.92,
            margin: 0,
          }}
        >
          BUILT WITHOUT <span style={{ color: '#00ff88' }}>COMPROMISE</span>
        </motion.h2>
      </div>

      {/* 2x2 pillar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 32px',
        background: 'rgba(0,255,136,0.07)',
      }}>
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            style={{
              position: 'relative',
              background: '#030303',
              padding: '40px 40px 36px',
              overflow: 'hidden',
            }}
            className="group"
          >
            {/* Corner TL accent */}
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <div style={{ width: 16, height: 1, background: '#00ff88', opacity: 0.4 }} />
              <div style={{ width: 1, height: 16, background: '#00ff88', opacity: 0.4 }} />
            </div>

            {/* Background image (very subtle) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${pillar.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.04,
              filter: 'grayscale(1)',
            }} />

            {/* Icon */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: 28,
              color: '#00ff88',
              textShadow: '0 0 18px rgba(0,255,136,0.5)',
              marginBottom: 14,
              position: 'relative',
              zIndex: 1,
            }}>
              {pillar.icon}
            </div>

            {/* Label badge */}
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              letterSpacing: '0.3em',
              color: '#00ff88',
              opacity: 0.75,
              marginBottom: 12,
              position: 'relative',
              zIndex: 1,
            }}>
              {pillar.label}
            </div>

            {/* Headline */}
            <h3 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              color: '#fff',
              letterSpacing: '0.05em',
              margin: '0 0 14px',
              position: 'relative',
              zIndex: 1,
            }}>
              {pillar.headline}
            </h3>

            {/* Body */}
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.75,
              marginBottom: 28,
              position: 'relative',
              zIndex: 1,
            }}>
              {pillar.body}
            </p>

            {/* Metric */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, position: 'relative', zIndex: 1 }}>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                color: '#00ff88',
                textShadow: '0 0 24px rgba(0,255,136,0.35)',
                lineHeight: 1,
              }}>
                {pillar.metric}
              </span>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'rgba(0,255,136,0.6)',
              }}>
                {pillar.unit}
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#444',
                letterSpacing: '0.1em',
                marginLeft: 4,
                alignSelf: 'flex-end',
                marginBottom: 3,
              }}>
                {pillar.metricLabel}
              </span>
            </div>

            {/* Hover glow */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 80px rgba(0,255,136,0.04)',
                opacity: 0,
                pointerEvents: 'none',
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
