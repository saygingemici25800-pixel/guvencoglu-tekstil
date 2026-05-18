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
          color="#EFEAE0"
          transparent
          opacity={0.92}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.2, 1.7]} />
        <meshBasicMaterial color="#2D3142" opacity={0.04} transparent />
      </mesh>

      <Html
        center
        transform
        distanceFactor={5}
        position={[0, 0, 0.05]}
        style={{ pointerEvents: 'none', width: 320, textAlign: 'center' }}
      >
        <div style={{ color: '#2D3142' }}>
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
  const progressRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const node = sectionRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = Math.max(1, rect.height - window.innerHeight)
      let p = -rect.top / total
      if (p < 0) p = 0
      if (p > 1) p = 1
      progressRef.current = p
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionRef])

  useFrame(({ camera }) => {
    const progress = progressRef.current

    if (!reduced) {
      const lerpK = window.innerWidth < 768 ? 0.18 : 0.12
      const startZ = CAMERA_START_Z
      const endZ = -(milestones.length - 0.5) * SPACING
      camera.position.z += (startZ + (endZ - startZ) * progress - camera.position.z) * lerpK
      camera.position.x += (Math.sin(progress * Math.PI * 2) * 0.6 - camera.position.x) * lerpK
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
      <fog attach="fog" args={['#2D3142', 6, 32]} />
      <color attach="background" args={['#2D3142']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={0.9} color="#D4A373" />
      <directionalLight position={[-4, 2, 2]} intensity={0.3} color="#EFEAE0" />

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
              background: i === activeIndex ? 'var(--v2-copper)' : 'rgba(239,234,224,0.3)',
              transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: i === activeIndex ? 'var(--v2-cream)' : 'rgba(239,234,224,0.4)',
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

function MobileTimelineStatic({ milestones }) {
  return (
    <section
      aria-label="Kronolojik kilometre taşları"
      style={{
        background: '#2D3142',
        color: 'var(--v2-cream)',
        padding: '80px 20px',
      }}
    >
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1
          return (
            <li
              key={m.year}
              style={{
                position: 'relative',
                paddingLeft: 28,
                paddingBottom: isLast ? 0 : 48,
                borderLeft: isLast ? 'none' : '1px solid rgba(212,163,115,0.25)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: -6,
                  top: 6,
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: 'var(--v2-copper)',
                  boxShadow: '0 0 0 5px rgba(212,163,115,0.18)',
                }}
              />
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'var(--v2-copper)',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                }}
              >
                {m.mono}
              </p>
              <h3
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(44px, 12vw, 64px)',
                  fontWeight: 500,
                  fontVariationSettings: '"opsz" 144',
                  lineHeight: 1,
                  marginBottom: 14,
                  color: 'var(--v2-copper)',
                }}
              >
                {m.year}
              </h3>
              <h4
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 22,
                  fontStyle: 'italic',
                  fontWeight: 500,
                  marginBottom: 12,
                  color: 'var(--v2-cream)',
                }}
              >
                {m.title}
              </h4>
              <p
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontSize: 15,
                  lineHeight: 1.65,
                  opacity: 0.78,
                  color: 'var(--v2-cream)',
                }}
              >
                {m.description}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default function TimelineTunnel({ milestones }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
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

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current
      const pin = pinRef.current
      if (!section || !pin) return
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const sectionH = rect.height
      let y
      if (rect.top >= 0) y = 0
      else if (-rect.top + viewportH >= sectionH) y = sectionH - viewportH
      else y = -rect.top
      pin.style.transform = `translate3d(0, ${y}px, 0)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isMobile])

  if (isMobile) {
    return <MobileTimelineStatic milestones={milestones} />
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Kronolojik kilometre taşları"
      style={{
        position: 'relative',
        height: `${milestones.length * 100}vh`,
        background: '#2D3142',
      }}
    >
      <div
        ref={pinRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          overflow: 'hidden',
          isolation: 'isolate',
          willChange: 'transform',
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
              'radial-gradient(circle at 50% 50%, transparent 30%, rgba(45,49,66,0.55) 80%)',
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
