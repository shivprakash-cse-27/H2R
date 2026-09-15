import { useEffect, useRef, useCallback } from 'react';

export function useEngineAudio(experienceStarted, rpmPct, isMuted) {
  const ctxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainRef = useRef(null);
  const distortionRef = useRef(null);
  const startedRef = useRef(false);

  const createDistortionCurve = (amount) => {
    const n = 256;
    const curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  };

  const start = useCallback(() => {
    if (startedRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      ctxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : 0.15;
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // Distortion (engine growl)
      const distortion = ctx.createWaveShaper();
      distortion.curve = createDistortionCurve(80);
      distortion.oversample = '4x';
      distortion.connect(masterGain);
      distortionRef.current = distortion;

      // Filter (muffler)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.5;
      filter.connect(distortion);

      // Engine fundamental + harmonics
      const freqs = [55, 110, 165, 220];
      const gains = [0.4, 0.3, 0.15, 0.08];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'sawtooth' : 'square';
        osc.frequency.value = f;

        const oscGain = ctx.createGain();
        oscGain.gain.value = gains[i];

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscillatorsRef.current.push({ osc, gain: oscGain });
      });

      startedRef.current = true;
    } catch (e) {
      console.warn('Web Audio API not available', e);
    }
  }, [isMuted]);

  // Update frequency based on RPM
  useEffect(() => {
    if (!startedRef.current || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const now = ctx.currentTime;

    // Map rpmPct 0→1 to base freq 55→220 Hz
    const baseFreq = 55 + rpmPct * 165;
    const harmonics = [1, 2, 3, 4];

    oscillatorsRef.current.forEach(({ osc }, i) => {
      const targetFreq = baseFreq * harmonics[i];
      osc.frequency.setTargetAtTime(targetFreq, now, 0.1);
    });

    // Increase volume at high RPM
    if (gainRef.current && !isMuted) {
      const targetVol = 0.08 + rpmPct * 0.22;
      gainRef.current.gain.setTargetAtTime(targetVol, now, 0.2);
    }
  }, [rpmPct, isMuted]);

  // Mute/unmute
  useEffect(() => {
    if (!gainRef.current || !ctxRef.current) return;
    const now = ctxRef.current.currentTime;
    gainRef.current.gain.setTargetAtTime(isMuted ? 0 : 0.08 + rpmPct * 0.22, now, 0.1);
  }, [isMuted, rpmPct]);

  // Start when experience begins
  useEffect(() => {
    if (experienceStarted) start();
  }, [experienceStarted, start]);

  // Cleanup
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(({ osc }) => {
        try { osc.stop(); } catch (_) {}
      });
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch (_) {}
      }
    };
  }, []);

  return { start };
}
