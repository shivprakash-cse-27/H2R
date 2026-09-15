import { motion } from 'framer-motion';

function Arc({ cx, cy, r, startAngle, endAngle, stroke, strokeWidth, opacity = 1 }) {
  const toRad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const sweep = endAngle - startAngle > 180 ? 1 : 0;
  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${sweep} 1 ${x2} ${y2}`}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

function DataCell({ label, value, accent }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '5px 4px',
      borderRadius: 4,
      background: 'rgba(0,255,136,0.03)',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 9,
        color: '#3a3a3a',
        letterSpacing: '0.14em',
        marginBottom: 2,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: 13,
        color: accent ? '#00ff88' : '#e0e0e0',
        textShadow: accent ? '0 0 10px rgba(0,255,136,0.5)' : 'none',
        lineHeight: 1,
      }}>
        {value}
      </div>
    </div>
  );
}

export default function Speedometer({ speed, rpm, gear, temp, boost, rpmPct, experienceStarted }) {
  const needleAngle = -135 + rpmPct * 270;
  const displaySpeed = String(Math.round(speed)).padStart(3, '0');
  const isRedline = rpmPct > 0.85;

  if (!experienceStarted) {
    return (
      <div style={{
        position: 'fixed',
        top: 76,
        right: 24,
        zIndex: 40,
        width: 200,
        padding: '12px 14px',
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid rgba(0,255,136,0.1)',
        borderRadius: 10,
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#2a2a2a',
            letterSpacing: '0.18em',
            marginBottom: 6,
          }}>ENGINE STATUS</div>
          <div style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: '#222',
            letterSpacing: '0.12em',
          }}>STANDBY</div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            color: '#1e1e1e',
            marginTop: 4,
            letterSpacing: '0.1em',
          }}>START TO ACTIVATE HUD</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 76,
        right: 24,
        zIndex: 40,
        width: 240,
      }}
    >
      <div style={{
        background: 'rgba(0,0,0,0.82)',
        border: '1px solid rgba(0,255,136,0.2)',
        borderRadius: 12,
        padding: '14px 14px 12px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(0,255,136,0.05), inset 0 0 20px rgba(0,0,0,0.5)',
      }}>

        {/* SVG dial */}
        <svg viewBox="0 0 200 115" style={{ width: '100%', overflow: 'visible' }}>
          {/* Background arc */}
          <Arc cx={100} cy={105} r={78} startAngle={-135} endAngle={135}
            stroke="rgba(255,255,255,0.05)" strokeWidth={7} />

          {/* Active arc glow */}
          {rpmPct > 0 && (
            <Arc cx={100} cy={105} r={78}
              startAngle={-135} endAngle={-135 + rpmPct * 270}
              stroke={isRedline ? 'rgba(255,50,50,0.25)' : 'rgba(0,255,136,0.2)'} strokeWidth={14} />
          )}

          {/* Active arc */}
          {rpmPct > 0 && (
            <Arc cx={100} cy={105} r={78}
              startAngle={-135} endAngle={-135 + rpmPct * 270}
              stroke={isRedline ? '#ff3333' : '#00ff88'} strokeWidth={6} />
          )}

          {/* Tick marks */}
          {Array.from({ length: 17 }).map((_, i) => {
            const angle = -135 + i * (270 / 16);
            const rad = (angle * Math.PI) / 180;
            const filled = i / 16 <= rpmPct;
            const isMajor = i % 4 === 0;
            const r1 = isMajor ? 64 : 68;
            return (
              <line key={i}
                x1={100 + r1 * Math.cos(rad)} y1={105 + r1 * Math.sin(rad)}
                x2={100 + 75 * Math.cos(rad)} y2={105 + 75 * Math.sin(rad)}
                stroke={filled ? (isRedline ? '#ff3333' : '#00ff88') : 'rgba(255,255,255,0.1)'}
                strokeWidth={isMajor ? 2.5 : 1.2}
                strokeLinecap="round"
              />
            );
          })}

          {/* Needle */}
          <line
            x1={100} y1={105}
            x2={100 + 62 * Math.cos((needleAngle * Math.PI) / 180)}
            y2={105 + 62 * Math.sin((needleAngle * Math.PI) / 180)}
            stroke={isRedline ? '#ff3333' : '#00ff88'}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 5px ${isRedline ? '#ff3333' : '#00ff88'})`,
              transition: 'x2 0.25s ease, y2 0.25s ease',
            }}
          />

          {/* Center cap */}
          <circle cx={100} cy={105} r={5} fill={isRedline ? '#ff3333' : '#00ff88'}
            style={{ filter: `drop-shadow(0 0 8px ${isRedline ? '#ff3333' : '#00ff88'})` }} />

          {/* Speed value */}
          <text x={100} y={90} textAnchor="middle"
            fill="#ffffff"
            fontFamily="JetBrains Mono, monospace"
            fontSize="24" fontWeight="700" letterSpacing="2">
            {displaySpeed}
          </text>
          <text x={100} y={103} textAnchor="middle"
            fill="#00ff88"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8" letterSpacing="4">
            KM/H
          </text>
        </svg>

        {/* Data cells */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          marginTop: 8,
          paddingTop: 8,
          borderTop: '1px solid rgba(0,255,136,0.1)',
        }}>
          <DataCell label="RPM" value={rpm >= 1000 ? `${(rpm / 1000).toFixed(1)}K` : rpm} />
          <DataCell label="GEAR" value={gear} accent />
          <DataCell label="TEMP" value={`${temp}°`} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 4,
          marginTop: 4,
        }}>
          <DataCell label="BOOST" value={`${boost}B`} />
          <DataCell label="MODE" value="RACE" accent />
        </div>
      </div>
    </motion.div>
  );
}
