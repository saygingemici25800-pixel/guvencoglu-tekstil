import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { usePrefersReducedMotion } from '../shared/ReducedMotion.jsx'

const SPACING = 8
const CAMERA_START_Z = 4

function YearSign({ position, year, mono, index, sideOffset }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.z = Math.sin(t * 0.4 + index * 1.3) * 0.025
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.06
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 4.5, 6]} />
        <meshBasicMaterial color="#D4A373" transparent opacity={0.55} />
      </mesh>

      <mesh>
        <planeGeometry args={[3.4, 1.9]} />
        <meshStandardMaterial
          color="#F5F5F0"
          transparent
          opacity={0.92}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.2, 1.7]} />
        <meshBasicMaterial color="#0A2463" opacity={0.04} transparent />
      </mesh>

      <Html
        center
        transform
        distanceFactor={5}
        position={[0, 0, 0.05]}
        style={{ pointerEvents: 'none', width: 320, textAlign: 'center' }}
      >
        <div style={{ color: '#0A2463' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              letterSpacing: '0.18em',
              opacity: 0.55,
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            {mono} {sideOffset > 0 ? '→' : '←'}
          </div>
          <div
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {year}
          </div>
        </div>
      </Html>
    </group>
  )
}

function TunnelScene({ milestones, sectionRef, onActiveChange, reduced }) {
  const lastActive = useRef(-1)

  useFrame(({ camera }) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const viewportH = window.innerHeight
    const total = Math.max(1, rect.height - viewportH)
    let progress = -rect.top / total
    if (progress < 0) progress = 0
    if (progress > 1) progress = 1

    if (!reduced) {
      const startZ = CAMERA_START_Z
      const endZ = -(milestones.length - 0.5) * SPACING
      camera.position.z = startZ + (endZ - startZ) * progress
      camera.position.x = Math.sin(progress * Math.PI * 2) * 0.6
      camera.lookAt(0, 0, camera.position.z - 4)
    } else {
      camera.position.z = CAMERA_START_Z - ((milestones.length - 1) * SPACING) / 2
    }

    const eased = progress * milestones.length - 0.3
    const idx = Math.max(0, Math.min(milestones.length - 1, Math.floor(eased)))
    if (idx !== lastActive.current) {
      lastActive.current = idx
      onActiveChange(idx)
    }
  })

  return (
    <>
      <fog attach="fog" args={['#0A2463', 6, 32]} />
      <color attach="background" args={['#0A2463']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={0.9} color="#D4A373" />
      <directionalLight position={[-4, 2, 2]} intensity={0.3} color="#F5F5F0" />

      {milestones.map((m, i) => {
        const side = i % 2 === 0 ? -1.5 : 1.5
        return (
          <YearSign
            key={m.year}
            position={[side, 0.2, -i * SPACING]}
            year={m.year}
            mono={m.mono}
            index={i}
            sideOffset={side}
          />
        )
      })}

      <FloorPlane count={milestones.length} />
    </>
  )
}

function FloorPlane({ count }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -((count - 1) * SPACING) / 2]}>
      <planeGeometry args={[40, count * SPACING + 20, 1, 1]} />
      <meshStandardMaterial color="#0B0F1A" roughness={1} metalness={0} transparent opacity={0.4} />
    </mesh>
  )
}

function MilestonePanel({ milestone, index, total, isActive, reduced }) {
  return (
    <article
      aria-hidden={!isActive}
      style={{
        position: 'absolute',
        right: 'clamp(24px, 6vw, 96px)',
        top: '50%',
        maxWidth: 380,
        color: 'var(--v2-cream)',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(-50%)' : 'translate(24px, -50%)',
        transition: reduced ? 'none' : 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: '0.18em',
          color: 'var(--v2-copper)',
          marginBottom: 16,
          textTransform: 'uppercase',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} — {milestone.mono}
      </p>
      <h3
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 144',
          fontWeight: 500,
          lineHeight: 1.05,
          marginBottom: 20,
          color: 'var(--v2-cream)',
        }}
      >
        {milestone.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 17,
          lineHeight: 1.65,
          opacity: 0.82,
        }}
      >
        {milestone.description}
      </p>
    </article>
  )
}

function ProgressRail({ milestones, activeIndex }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 'clamp(20px, 4vw, 56px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {milestones.map((m, i) => (
        <div key={m.year} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: i === activeIndex ? 28 : 10,
              height: 2,
              background: i === activeIndex ? 'var(--v2-copper)' : 'rgba(245,245,240,0.3)',
              transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: i === activeIndex ? 'var(--v2-cream)' : 'rgba(245,245,240,0.4)',
              transition: 'color 400ms',
            }}
          >
            {m.year}
          </span>
        </div>
      ))}
    </div>
  )
}

function MobileTimeline({ milestones }) {
  return (
    <ol
      style={{
        background: 'var(--v2-navy)',
        color: 'var(--v2-cream)',
        listStyle: 'none',
        padding: '96px 24px',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
      }}
    >
      {milestones.map((m, i) => (
        <li key={m.year} style={{ position: 'relative', paddingLeft: 32 }}>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: 12,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--v2-copper)',
              boxShadow: '0 0 0 6px rgba(212,163,115,0.18)',
            }}
          />
          {i < milestones.length - 1 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 5,
                top: 30,
                bottom: -64,
                width: 2,
                background: 'rgba(212,163,115,0.25)',
              }}
            />
          )}
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--v2-copper)',
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            {m.mono}
          </p>
          <h3
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(36px, 9vw, 56px)',
              fontWeight: 500,
              fontVariationSettings: '"opsz" 144',
              lineHeight: 1,
              marginBottom: 12,
              color: 'var(--v2-cream)',
            }}
          >
            {m.year}
          </h3>
          <h4
            style={{
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
              fontSize: 22,
              fontWeight: 500,
              marginBottom: 12,
              color: 'var(--v2-copper)',
            }}
          >
            {m.title}
          </h4>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{m.description}</p>
        </li>
      ))}
    </ol>
  )
}

export default function TimelineTunnel({ milestones }) {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isMobile) {
    return <MobileTimeline milestones={milestones} />
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Kronolojik kilometre taşları"
      style={{
        position: 'relative',
        height: `${100 + milestones.length * 80}vh`,
        background: '#0A2463',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, CAMERA_START_Z], fov: 55 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={null}>
            <TunnelScene
              milestones={milestones}
              sectionRef={sectionRef}
              onActiveChange={setActive}
              reduced={reduced}
            />
          </Suspense>
        </Canvas>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10,36,99,0.55) 80%)',
            pointerEvents: 'none',
          }}
        />

        <ProgressRail milestones={milestones} activeIndex={active} />

        {milestones.map((m, i) => (
          <MilestonePanel
            key={m.year}
            milestone={m}
            index={i}
            total={milestones.length}
            isActive={i === active}
            reduced={reduced}
          />
        ))}
      </div>
    </section>
  )
}
