export default function HUDOverlay({ speed, rpm, gear, temp, boost, traction, stage, experienceStarted }) {
  if (!experienceStarted) return null;

  const rpmBar = Math.min((rpm - 800) / 15200, 1);
  const isRedline = rpmBar > 0.85;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,255,136,0.12)',
    }}>
      {/* RPM progress bar */}
      <div style={{ width: '100%', height: 2, background: 'rgba(0,255,136,0.08)' }}>
        <div style={{
          height: '100%',
          width: `${rpmBar * 100}%`,
          background: isRedline
            ? 'linear-gradient(90deg, #00ff88, #ff3333)'
            : 'linear-gradient(90deg, #00aa55, #00ff88)',
          boxShadow: `0 0 8px ${isRedline ? '#ff3333' : '#00ff88'}`,
          transition: 'width 0.2s ease',
        }} />
      </div>

      {/* Data row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 40px',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <HUDItem label="KM/H" value={String(Math.round(speed)).padStart(3, '0')} accent large />
          <Divider />
          <HUDItem label="GEAR" value={gear} accent />
          <Divider />
          <HUDItem label="RPM" value={rpm >= 1000 ? `${(rpm / 1000).toFixed(1)}K` : `${rpm}`} />
        </div>

        {/* Center */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            color: '#2a2a2a',
            letterSpacing: '0.24em',
            marginBottom: 1,
          }}>STAGE</div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            fontWeight: 700,
            color: '#00ff88',
            letterSpacing: '0.2em',
            textShadow: '0 0 10px rgba(0,255,136,0.4)',
          }}>
            {stage}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <HUDItem label="TEMP" value={`${temp}°C`} />
          <Divider />
          <HUDItem label="BOOST" value={`${boost}B`} />
          <Divider />
          <HUDItem label="TRACTION" value={`${traction}%`} />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width: 1, height: 28, background: 'rgba(0,255,136,0.15)', flexShrink: 0 }} />
  );
}

function HUDItem({ label, value, accent, large }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 52 }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 9,
        color: '#3a3a3a',
        letterSpacing: '0.2em',
        marginBottom: 1,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: large ? 22 : 14,
        color: accent ? '#00ff88' : '#cccccc',
        textShadow: accent ? '0 0 12px rgba(0,255,136,0.45)' : 'none',
        lineHeight: 1.1,
        letterSpacing: '0.04em',
      }}>
        {value}
      </div>
    </div>
  );
}
