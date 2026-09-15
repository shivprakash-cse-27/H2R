import { useState, useCallback } from 'react';
import './index.css';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Speedometer from './components/Speedometer';
import HUDOverlay from './components/HUDOverlay';
import MotorcycleViewer from './components/MotorcycleViewer';
import ComponentExplorer from './components/ComponentExplorer';
import EngineeringSection from './components/EngineeringSection';
import PerformanceSection from './components/PerformanceSection';

import { useScrollProgress } from './hooks/useScrollProgress';
import { useSpeedometer } from './hooks/useSpeedometer';
import { useEngineAudio } from './hooks/useEngineAudio';

export default function App() {
  const [experienceStarted, setExperienceStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const progress = useScrollProgress();
  const hudValues = useSpeedometer(progress);

  // Engine audio — requires experienceStarted
  useEngineAudio(experienceStarted, hudValues.rpmPct, isMuted);

  const handleStartExperience = useCallback(() => {
    setExperienceStarted(true);
    // Smooth scroll to machine section
    setTimeout(() => {
      const el = document.getElementById('machine');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((m) => !m);
    // Persist in session
    sessionStorage.setItem('zokes_muted', String(!isMuted));
  }, [isMuted]);

  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative" style={{ background: '#000' }}>
      {/* Fixed HUD elements */}
      <Navigation
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        experienceStarted={experienceStarted}
      />
      <Speedometer
        {...hudValues}
        experienceStarted={experienceStarted}
      />
      <HUDOverlay
        {...hudValues}
        experienceStarted={experienceStarted}
      />

      {/* Page sections */}
      <Hero onStartExperience={handleStartExperience} />

      <MotorcycleViewer
        progress={progress}
        selectedPart={selectedPart}
        onSelectPart={setSelectedPart}
        experienceStarted={experienceStarted}
      />

      <ComponentExplorer
        selectedPart={selectedPart}
        onSelectPart={setSelectedPart}
      />

      <EngineeringSection />

      <PerformanceSection onRestart={handleRestart} />
    </div>
  );
}
