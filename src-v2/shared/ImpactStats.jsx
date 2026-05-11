import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 45,    suffix: '',    label: 'Yıllık Deneyim', hint: 'Kesintisiz üretim',       mono: '1980 →' },
  { value: 8000,  suffix: ' m²', label: 'Üretim Alanı',   hint: 'Fethiye fabrikası',       mono: 'TR · MUĞLA' },
  { value: 120,   suffix: '+',   label: 'Uzman Ekip',     hint: 'Kesim → nakış → kalite',  mono: 'KADRO' },
  { value: 18,    suffix: '',    label: 'İhracat Ülkesi', hint: 'Avrupa & MENA hattı',     mono: 'GLOBAL' },
]

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function useCountUp(target, isActive, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVal(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(target * easeOutCubic(p)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, isActive, duration])
  return val
}

function Stat({ value, suffix, label, hint, mono, isActive, index }) {
  const current = useCountUp(value, isActive)
  return (
    <article
      className="v2-stat"
      style={{ ...statCard, animationDelay: `${index * 110}ms` }}
    >
      <p style={statMono}>{mono}</p>
      <p style={statValue}>
        <span style={statNumber}>{current.toLocaleString('tr-TR')}</span>
        <span style={statSuffix}>{suffix}</span>
      </p>
      <h3 style={statLabel}>{label}</h3>
      <p style={statHint}>{hint}</p>
    </article>
  )
}

export default function ImpactStats() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="v2-impact" style={wrap}>
      <div style={inner}>
        <header style={headerStyle}>
          <p style={tag}>03 / Rakamlar</p>
          <h2 style={h2}>
            <em style={emStyle}>45 yıl</em> üretmenin
            <br />
            damıttığı şey.
          </h2>
        </header>
        <div className="v2-impact-grid" style={grid}>
          {STATS.map((s, i) => (
            <Stat key={s.label} index={i} isActive={active} {...s} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes v2-impact-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-stat {
          animation: v2-impact-rise 720ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-stat { animation: none; opacity: 1; transform: none; }
        }
        @media (max-width: 960px) {
          .v2-impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .v2-impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  background: 'var(--v2-navy, #0A2463)',
  color: '#F5F5F0',
  padding: '128px 32px',
  zIndex: 2,
}
const inner = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 72,
}
const headerStyle = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '60ch' }
const tag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  color: 'var(--v2-copper, #D4A373)',
  textTransform: 'uppercase',
  margin: 0,
}
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 88px)',
  lineHeight: 1.0,
  color: '#F5F5F0',
  margin: 0,
  letterSpacing: '-0.02em',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 0,
  borderTop: '1px solid rgba(212, 163, 115, 0.25)',
  borderBottom: '1px solid rgba(212, 163, 115, 0.25)',
}
const statCard = {
  padding: '40px 32px 40px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  borderRight: '1px solid rgba(212, 163, 115, 0.18)',
  opacity: 0,
}
const statMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  color: 'var(--v2-copper, #D4A373)',
  textTransform: 'uppercase',
  margin: 0,
}
const statValue = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 6,
  margin: 0,
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  color: '#F5F5F0',
  letterSpacing: '-0.03em',
  lineHeight: 1,
}
const statNumber = { fontSize: 'clamp(56px, 6.5vw, 96px)', fontVariantNumeric: 'tabular-nums' }
const statSuffix = {
  fontSize: 'clamp(20px, 2vw, 28px)',
  color: 'var(--v2-copper, #D4A373)',
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontStyle: 'normal',
}
const statLabel = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 500,
  fontSize: 18,
  color: '#F5F5F0',
  margin: 0,
  letterSpacing: '-0.005em',
}
const statHint = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  color: 'rgba(245, 245, 240, 0.6)',
  margin: 0,
  lineHeight: 1.45,
}
