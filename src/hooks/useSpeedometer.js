import { useMemo } from 'react';

// Maps scroll progress [0-1] to motorcycle HUD values
export function useSpeedometer(progress) {
  return useMemo(() => {
    // Speed: 0 KM/H at hero (progress < 0.05), then 0→300 KM/H as user scrolls
    const speed = progress < 0.05 ? 0 : Math.round((progress - 0.05) / 0.95 * 300);

    // RPM: idle 800 at hero, then 800→16000 as user scrolls
    const rpm = progress < 0.05 ? 800 : Math.round(800 + ((progress - 0.05) / 0.95) * 15200);

    // Gear
    let gear;
    if (progress < 0.05) gear = 'N';
    else if (progress < 0.2)  gear = '1';
    else if (progress < 0.35) gear = '2';
    else if (progress < 0.5)  gear = '3';
    else if (progress < 0.65) gear = '4';
    else if (progress < 0.8)  gear = '5';
    else gear = '6';

    // Engine temp: 60°C idle → 110°C at max
    const temp = Math.round(60 + progress * 50);

    // Boost pressure: 0.0 at hero, then 0→2.8 bar
    const boost = progress < 0.05 ? '0.0' : ((progress - 0.05) / 0.95 * 2.8).toFixed(1);

    // Traction: 100% → reduces to simulate controlled slip
    const traction = Math.round(100 - progress * 18);

    // RPM percentage for needle/arc (0-1)
    const rpmPct = Math.min((rpm - 800) / 15200, 1);

    // Stage label
    let stage;
    if (progress < 0.1) stage = 'IDLE';
    else if (progress < 0.25) stage = 'WARMUP';
    else if (progress < 0.5) stage = 'EXPLORING';
    else if (progress < 0.75) stage = 'ENGINEERING';
    else if (progress < 0.9) stage = 'PERFORMANCE';
    else stage = 'REDLINE';

    return { speed, rpm, gear, temp, boost, traction, rpmPct, stage };
  }, [progress]);
}
