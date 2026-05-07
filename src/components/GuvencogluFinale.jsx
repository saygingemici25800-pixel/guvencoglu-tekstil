const STRIPS = [
  { left: '5%',  w: 1.5, h: 60, dur: 9.0,  delay: -3.2, color: '#D4A373' },
  { left: '11%', w: 1.0, h: 38, dur: 11.0, delay: -7.8, color: '#0A2463' },
  { left: '18%', w: 2.0, h: 70, dur: 7.0,  delay: -1.4, color: '#D4A373' },
  { left: '25%', w: 1.0, h: 34, dur: 10.0, delay: -5.6, color: '#e7b985' },
  { left: '32%', w: 1.5, h: 55, dur: 8.0,  delay: -9.1, color: '#0A2463' },
  { left: '40%', w: 1.0, h: 46, dur: 12.0, delay: -2.0, color: '#D4A373' },
  { left: '48%', w: 2.0, h: 64, dur: 9.0,  delay: -6.3, color: '#0A2463' },
  { left: '55%', w: 1.0, h: 30, dur: 7.0,  delay: -8.7, color: '#D4A373' },
  { left: '63%', w: 1.5, h: 60, dur: 11.0, delay: -4.5, color: '#e7b985' },
  { left: '70%', w: 1.0, h: 50, dur: 10.0, delay: -1.0, color: '#0A2463' },
  { left: '78%', w: 2.0, h: 42, dur: 8.0,  delay: -10.2, color: '#D4A373' },
  { left: '85%', w: 1.5, h: 56, dur: 9.5,  delay: -5.0, color: '#0A2463' },
  { left: '92%', w: 1.0, h: 36, dur: 10.5, delay: -2.5, color: '#D4A373' },
  { left: '96%', w: 1.0, h: 48, dur: 8.5,  delay: -8.0, color: '#e7b985' },
]

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&display=swap');

@keyframes gf-fall {
  0%   { transform: translateY(-100vh); opacity: 0; }
  15%  { opacity: 0.6; }
  85%  { opacity: 0.6; }
  100% { transform: translateY(110vh); opacity: 0; }
}

.gf-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #F5F5F0;
  overflow: hidden;
  isolation: isolate;
}

.gf-strips {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.gf-strip {
  position: absolute;
  top: 0;
  will-change: transform, opacity;
  animation: gf-fall infinite ease-in;
  pointer-events: none;
}

.gf-title-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  z-index: 2;
  pointer-events: none;
  display: block;
  line-height: 0;
}

.gf-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.gf-svg text {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-weight: 800;
}

@media (prefers-reduced-motion: reduce) {
  .gf-strip { animation: none; opacity: 0.4; }
}
`

export default function GuvencogluFinale() {
  return (
    <>
      <style>{STYLES}</style>
      <section className="gf-wrap" aria-label="Güvençoğlu Tekstil">
        <div className="gf-strips" aria-hidden="true">
          {STRIPS.map((s, i) => (
            <span
              key={i}
              className="gf-strip"
              style={{
                left: s.left,
                width: `${s.w}px`,
                height: `${s.h}vh`,
                background: `linear-gradient(180deg, transparent 0%, ${s.color} 25%, ${s.color} 75%, transparent 100%)`,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="gf-title-wrap">
          <svg
            className="gf-svg"
            viewBox="0 0 1000 220"
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GÜVENÇOĞLU"
            role="img"
          >
            <defs>
              <linearGradient id="gf-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A2463" />
                <stop offset="55%" stopColor="#0A2463" />
                <stop offset="100%" stopColor="#D4A373" />
              </linearGradient>
            </defs>

            <text
              x="500"
              y="210"
              textAnchor="middle"
              fontSize="220"
              letterSpacing="-12"
              textLength="970"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#gf-fill)"
            >
              GÜVENÇOĞLU
            </text>
          </svg>
        </div>
      </section>
    </>
  )
}
