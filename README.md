# ZOKES // H2R Experience — Implementation Plan (Updated)

> **Status: ✅ COMPLETE & DEPLOYED**
> Last updated: 2026-08-24

---

## What Was Built

A cinematic, fully immersive premium motorcycle website for **Brand Zokes**, built in **React.js + Vite**, targeting **1920×1080** desktop-first. The experience is H2R-inspired with dark futuristic aesthetics, scroll-based storytelling, an interactive component explorer, a live SVG HUD speedometer, and Web Audio API engine synthesis.

---

## Final Architecture

```
H2R/
├── public/
│   ├── assets/
│   │   ├── motorcycle/
│   │   │   └── hero.jpg                ← AI-generated hero motorcycle (DALL-E)
│   │   └── components/                 ← 10 AI-generated component images (DALL-E)
│   │       ├── engine.jpg
│   │       ├── exhaust.jpg
│   │       ├── bodywork.jpg
│   │       ├── front-wheel.jpg
│   │       ├── front-suspension.jpg
│   │       ├── rear-shock.jpg
│   │       ├── brake-system.jpg
│   │       ├── handlebar.jpg
│   │       ├── seat.jpg
│   │       └── speedometer.jpg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx              ← Fixed top bar, ZOKES brand, sound toggle
│   │   ├── Hero.jsx                    ← Cinematic hero, particles, parallax, CTA
│   │   ├── Speedometer.jsx             ← SVG arc dial, needle, data cells
│   │   ├── HUDOverlay.jsx              ← Fixed bottom bar, RPM bar, telemetry
│   │   ├── MotorcycleViewer.jsx        ← Parallax bike, 11 interactive hotspots
│   │   ├── ComponentExplorer.jsx       ← Parts list + image + spec card layout
│   │   ├── ComponentCard.jsx           ← Info card, specs table, dismiss button
│   │   ├── EngineeringSection.jsx      ← 4-pillar 2×2 grid, scan lines, metrics
│   │   └── PerformanceSection.jsx      ← Final reveal, stats row, speed lines
│   ├── data/
│   │   └── motorcycleParts.js          ← 11 components, hotspot coords, specs
│   ├── hooks/
│   │   ├── useScrollProgress.js        ← rAF-throttled scroll → 0–1 progress
│   │   ├── useSpeedometer.js           ← progress → speed/RPM/gear/temp/boost
│   │   └── useEngineAudio.js           ← Web Audio API oscillator engine synth
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.1 | UI framework |
| Vite | 8.2 | Build tool / dev server |
| Framer Motion | 13.x | Component animations |
| GSAP | 3.x | (available, scroll extras) |
| Tailwind CSS | 4.x | Base utilities |
| Web Audio API | Native | Engine sound synthesis |
| DALL-E | Latest | All 10 component images + hero |

---

## Completed Features

### ✅ Hero Section
- Full-screen cinematic layout, perfectly centered single-column
- 25-particle field with green glow particles
- Mouse-parallax `perspective(1200px)` motorcycle with smooth easing
- Animated headline: **ENGINEERED FOR EXTREMES.**
- `START EXPERIENCE →` button with fill-from-left hover animation
- No autoplay audio — browser-safe

### ✅ HUD Speedometer (top-right, fixed)
- SVG arc dial with 17 tick marks
- Smooth CSS-transitioned needle (`x2/y2` transition)
- Redline mode: turns red at 85%+ RPM
- Data cells: RPM · GEAR · TEMP · BOOST · MODE
- Shows STANDBY state before experience starts

### ✅ Bottom HUD Bar (fixed)
- RPM progress bar (0 → full width, redline gradient)
- Live values: KM/H · GEAR · RPM · TEMP · BOOST · TRACTION
- Center stage label: IDLE → WARMUP → EXPLORING → ENGINEERING → PERFORMANCE → REDLINE
- Hidden until experience started

### ✅ Scroll → Speed Mapping (Updated)

| Scroll Stage | Speed | Gear | Notes |
|---|---|---|---|
| Hero (top) | **0 KM/H** | **N** | Hard zero, RPM=800 idle |
| Past hero → machine | 0→95 KM/H | 1 | Ramps from first scroll |
| Component explorer | 95–190 KM/H | 2–3 | |
| Engineering | 190–240 KM/H | 4 | |
| Performance final | 240–300 KM/H | 5–6 | |

> **Change applied 2026-08-24**: Hero section now shows exactly `000 KM/H | N` with RPM at idle 800 and Boost at `0.0`. Values only climb once user scrolls past the hero.

### ✅ Web Audio Engine Sound
- Oscillator-based synthesis (no audio files required)
- 4 harmonics: sawtooth + square oscillators
- Low-pass filter + waveshaper distortion for engine growl
- Frequency tracks RPM: idle ~55 Hz → full rev ~220 Hz
- Volume scales with RPM progression
- Mute toggle persists in sessionStorage

### ✅ Motorcycle Viewer (Section 2)
- Scroll-driven brightness reveal (dim → fully lit)
- CSS perspective parallax on mouse movement
- 11 glowing hotspots with dual-ring pulse animation
- Tooltip labels on hover
- Click opens ComponentExplorer for that part
- Disclaimer: "H2R-INSPIRED CONCEPT · NOT OFFICIAL"

### ✅ Component Explorer (Section 3)
- Scrollable parts list sidebar (11 components)
- Active state: green left border + dot glow
- Large component image panel (aspect-ratio 1:1, object-fit: cover)
- ComponentCard: name, tagline, description, spec table, disclaimer
- `✕` close button returns to empty placeholder

### ✅ Engineering Section (Section 4)
- 4 pillars in 2×2 grid: AERODYNAMICS · POWER · CHASSIS · THERMAL
- Each pillar has subtle component image as background (opacity 0.04)
- Metric display: value + unit + label
- Scan-line overlay texture
- `whileInView` stagger animations

### ✅ Performance Final (Section 5)
- 16 animated speed-line rays from center
- Motorcycle with intense green glow filter
- Stats row: 300+ BHP · 340+ KM/H · <3S · SC
- `EXPLORE AGAIN →` CTA scrolls back to top
- Legal disclaimer

---

## Commands

```bash
# Development
npm run dev

# Production build
npm run build    # → dist/

# Preview build
npm run preview
```

**Dev server:** `http://localhost:5173`
**Build output:** `dist/index.html` (0.95 kB) + `dist/assets/`

---

## Design System

| Token | Value |
|---|---|
| Primary bg | `#000000` |
| Surface | `#030303` – `#080808` |
| Accent green | `#00ff88` |
| Redline | `#ff3333` |
| Muted text | `rgba(255,255,255,0.42)` |
| HUD font | `JetBrains Mono` |
| Headline font | `Rajdhani` |
| Body font | `Space Grotesk` |

---

## Open Items / Possible Enhancements

| Item | Priority | Notes |
|---|---|---|
| Three.js 3D model | Optional | Requires `.glb` motorcycle file |
| Real engine audio file | Optional | Use Howler.js; needs licensed asset |
| Mobile swipe explorer | Medium | Replace sidebar list with swipeable cards |
| GSAP ScrollTrigger | Low | Replace Framer `whileInView` for finer scroll control |
| WebP image conversion | Low | `sharp` CLI: `sharp hero.jpg -o hero.webp` |
