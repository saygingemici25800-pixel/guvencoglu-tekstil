import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Link } from 'react-router-dom'

const SECTIONS = [
  { to: '/v2/hikayemiz',   no: '02', title: 'Hikayemiz',     hint: 'Üç kuşak, tek iplik' },
  { to: '/v2/uretim',      no: '03', title: 'Üretim Süreci', hint: 'Hammaddeden teslimata, 7 adım' },
  { to: '/v2/hizmetler',   no: '04', title: 'Hizmetler',     hint: 'Konfeksiyon, nakış, baskı, B2B' },
  { to: '/v2/referanslar', no: '05', title: 'Referanslar',   hint: 'Birlikte çalıştıklarımız' },
  { to: '/v2/iletisim',    no: '06', title: 'İletişim',      hint: 'Teklif al — yolculuğun sonu' },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

function Spool({ reduced }) {
  const groupRef = useRef()
  const wrapsCount = 30

  const wrapPositions = useMemo(() => {
    const total = 1.7
    return Array.from({ length: wrapsCount }, (_, i) => -0.85 + (i * total) / (wrapsCount - 1))
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (reduced) {
      groupRef.current.rotation.y = -0.4
      return
    }
    groupRef.current.rotation.y += delta * 0.45
  })

  return (
    <group ref={groupRef} rotation={[-0.32, 0, 0.05]}>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.14, 96]} />
        <meshStandardMaterial color="#2D3142" metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.14, 96]} />
        <meshStandardMaterial color="#2D3142" metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.82, 0.82, 1.78, 64]} />
        <meshStandardMaterial color="#7E5837" roughness={0.85} />
      </mesh>
      {wrapPositions.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.88, 0.022, 10, 80]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#D4A373' : '#BD8557'}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
      ))}
      <mesh position={[0.88, -1.45, 0]} rotation={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.018, 0.018, 1.1, 12]} />
        <meshStandardMaterial color="#D4A373" />
      </mesh>
      <mesh position={[0.88, -2.0, 0]}>
        <sphereGeometry args={[0.035, 16, 12]} />
        <meshStandardMaterial color="#D4A373" />
      </mesh>
    </group>
  )
}

export default function ThreadSpool() {
  const sectionRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="v2-thread-spool" style={wrap}>
      <div style={inner}>
        <header style={headerStyle}>
          <p style={tag}>02 / İçindekiler</p>
          <h2 style={h2}>
            Her sayfa, ipliğin{' '}
            <em style={emStyle}>başka bir hali.</em>
          </h2>
          <p style={lede}>
            Makaradan çekilen iplik gibi: hikaye, üretim, hizmet, referans, iletişim.
            Sırasıyla ya da hangisi seni çekiyorsa ondan başla.
          </p>
        </header>

        <div className="v2-spool-grid" style={grid}>
          <div className="v2-spool-canvas" style={canvasWrap} aria-hidden="true">
            {mounted ? (
              <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 0.25, 4.6], fov: 36 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.55} />
                <directionalLight position={[3.5, 4, 3]} intensity={1.05} />
                <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#D4A373" />
                <Spool reduced={reduced} />
              </Canvas>
            ) : null}
            <div style={canvasShadow} aria-hidden="true" />
          </div>

          <ul style={list}>
            {SECTIONS.map((s, i) => (
              <li
                key={s.to}
                className="v2-spool-item"
                style={{ ...item, animationDelay: `${120 + i * 90}ms` }}
              >
                <Link to={s.to} style={link} className="v2-spool-link">
                  <span style={no} className="v2-spool-no">{s.no}</span>
                  <span style={titleCol}>
                    <span style={t1} className="v2-spool-title">{s.title}</span>
                    <span style={t2}>{s.hint}</span>
                  </span>
                  <span aria-hidden="true" style={arrow} className="v2-spool-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p style={footnote}>
          <span style={footnoteDot} /> Aşağıda{' '}
          <em style={footnoteEm}>45 yıllık üretimin</em> rakamları.
        </p>
      </div>

      <style>{`
        @keyframes v2-spool-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-spool-item {
          animation: v2-spool-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .v2-spool-link {
          transition: background 240ms ease, border-color 240ms ease;
        }
        .v2-spool-link:hover,
        .v2-spool-link:focus-visible {
          background: rgba(212, 163, 115, 0.07);
          border-color: rgba(212, 163, 115, 0.45);
        }
        .v2-spool-link:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        .v2-spool-link:hover .v2-spool-arrow,
        .v2-spool-link:focus-visible .v2-spool-arrow {
          transform: translateX(10px);
          color: #D4A373;
        }
        .v2-spool-link:hover .v2-spool-title,
        .v2-spool-link:focus-visible .v2-spool-title {
          color: #D4A373;
        }
        .v2-spool-link:hover .v2-spool-no,
        .v2-spool-link:focus-visible .v2-spool-no {
          color: #2D3142;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-spool-item { animation: none; opacity: 1; transform: none; }
          .v2-spool-link,
          .v2-spool-arrow { transition: none !important; }
        }
        @media (max-width: 960px) {
          .v2-spool-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .v2-spool-canvas { height: 360px !important; min-height: 0 !important; aspect-ratio: auto !important; }
        }
        @media (max-width: 560px) {
          .v2-spool-canvas { height: 280px !important; }
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  background: 'var(--v2-cream, #EFEAE0)',
  color: 'var(--v2-ink, #0B0F1A)',
  padding: '128px 32px',
  zIndex: 2,
}
const inner = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 80,
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
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
  letterSpacing: '-0.02em',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const lede = {
  fontSize: 18,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.72,
  margin: 0,
  maxWidth: '54ch',
}
const grid = {
  display: 'grid',
  gridTemplateColumns: 'minmax(340px, 0.9fr) 1.1fr',
  gap: 80,
  alignItems: 'center',
}
const canvasWrap = {
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
  minHeight: 420,
}
const canvasShadow = {
  position: 'absolute',
  bottom: '6%',
  left: '15%',
  right: '15%',
  height: 36,
  background: 'radial-gradient(ellipse at center, rgba(45, 49, 66, 0.22) 0%, transparent 70%)',
  filter: 'blur(8px)',
  pointerEvents: 'none',
  zIndex: -1,
}
const list = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }
const item = { opacity: 0 }
const link = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: 24,
  padding: '22px 24px',
  textDecoration: 'none',
  color: 'var(--v2-ink, #0B0F1A)',
  borderTop: '1px solid rgba(45, 49, 66, 0.12)',
  background: 'transparent',
}
const no = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.1em',
  color: 'var(--v2-mist, #8A8F9E)',
  transition: 'color 240ms ease',
}
const titleCol = { display: 'flex', flexDirection: 'column', gap: 4 }
const t1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(22px, 2.4vw, 32px)',
  color: 'var(--v2-navy, #2D3142)',
  lineHeight: 1.1,
  transition: 'color 240ms ease',
}
const t2 = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.65,
  lineHeight: 1.4,
}
const arrow = {
  fontSize: 22,
  color: 'var(--v2-mist, #8A8F9E)',
  transition: 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1), color 240ms ease',
  display: 'inline-block',
}
const footnote = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--v2-mist, #8A8F9E)',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}
const footnoteDot = {
  display: 'inline-block',
  width: 6,
  height: 6,
  borderRadius: 999,
  background: 'var(--v2-copper, #D4A373)',
}
const footnoteEm = { fontStyle: 'italic', textTransform: 'none', color: 'var(--v2-copper, #D4A373)' }
