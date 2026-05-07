import { useEffect, useRef } from 'react'

const ITEMS = [
  'Fethiye Lisesi',
  'Muğla Üniversitesi',
  'Dalaman Havalimanı',
  'Türk Telekom',
  'Eczacıbaşı',
  'Petrol Ofisi',
  'Arçelik',
  'THY',
  'Koç Holding',
  'Sabancı',
]

export default function PerspectiveMarquee() {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const SPEED = 60
    let halfWidth = track.scrollWidth / 2

    const measure = () => {
      halfWidth = track.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)

    const tick = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      offsetRef.current -= SPEED * dt
      if (-offsetRef.current >= halfWidth) {
        offsetRef.current += halfWidth
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const loop = [...ITEMS, ...ITEMS]

  return (
    <section
      aria-label="Referanslarımız"
      style={{
        width: '100%',
        maxHeight: 120,
        height: 120,
        background: '#0A2463',
        overflow: 'hidden',
        position: 'relative',
        perspective: '900px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotateX(8deg) rotateY(-28deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            gap: '64px',
            paddingInline: '32px',
            color: '#D4A373',
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFamily: 'inherit',
          }}
        >
          {loop.map((name, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 64 }}>
              {name}
              <span aria-hidden style={{ opacity: 0.5 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to right, #0A2463 0%, rgba(10,36,99,0) 12%, rgba(10,36,99,0) 88%, #0A2463 100%)',
        }}
      />
    </section>
  )
}
