import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const NAVY = '#2D3142'
const COPPER = '#D4A373'
const COPPER_DIM = '#8E6B47'
const CREAM = '#EFEAE0'

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

function MannequinIcon({ active, reduced }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current || reduced) return
    ref.current.position.y = active ? 0.05 + Math.sin(s.clock.elapsedTime * 1.4) * 0.04 : 0
  })
  return (
    <group ref={ref}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.22, 24, 18]} />
        <meshStandardMaterial color={active ? COPPER : CREAM} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.32, 0.85, 24]} />
        <meshStandardMaterial color={active ? COPPER : CREAM} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.18]} />
        <meshStandardMaterial color={active ? COPPER : CREAM} roughness={0.65} />
      </mesh>
    </group>
  )
}

function HoopIcon({ active, reduced }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current || reduced) return
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.6) * 0.08
    ref.current.position.y = active ? Math.sin(s.clock.elapsedTime * 1.2) * 0.05 : 0
  })
  return (
    <group ref={ref} position={[0, 0.45, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 16, 64]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.025, 12, 64]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.5} roughness={0.4} />
      </mesh>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3]}>
            <sphereGeometry args={[0.02, 10, 8]} />
            <meshStandardMaterial
              color={active ? CREAM : '#B89880'}
              emissive={active ? COPPER : '#000'}
              emissiveIntensity={active ? 0.3 : 0}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function PrintIcon({ active, reduced }) {
  const rollRef = useRef()
  useFrame((_, delta) => {
    if (!rollRef.current || reduced) return
    rollRef.current.rotation.x += delta * (active ? 1.8 : 0.4)
  })
  return (
    <group position={[0, 0.25, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 0.06, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.5]} />
          <meshStandardMaterial color={active ? CREAM : '#D8D4C8'} roughness={0.85} />
        </mesh>
      ))}
      <mesh ref={rollRef} position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.85, 18]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

function PenIcon({ active, reduced }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current || reduced) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.5
    ref.current.position.y = active ? 0.05 + Math.sin(s.clock.elapsedTime * 1.2) * 0.04 : 0
  })
  return (
    <group ref={ref} position={[0, 0.35, 0]} rotation={[0, 0, 0.5]}>
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.06, 0.18, 16]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 18]} />
        <meshStandardMaterial color={active ? CREAM : '#C5C0B0'} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 18]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

function BoxesIcon({ active, reduced }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current || reduced) return
    ref.current.children.forEach((c, i) => {
      c.position.y = c.userData.baseY + Math.sin(s.clock.elapsedTime * 0.6 + i) * 0.015
    })
  })
  const boxes = [
    { x: -0.22, y: 0.08, z: 0 },
    { x: 0.22, y: 0.08, z: 0 },
    { x: 0, y: 0.32, z: 0 },
    { x: -0.22, y: 0.56, z: 0 },
    { x: 0.22, y: 0.56, z: 0 },
  ]
  return (
    <group ref={ref}>
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]} userData={{ baseY: b.y }}>
          <boxGeometry args={[0.36, 0.22, 0.32]} />
          <meshStandardMaterial color={active ? '#E8D9B8' : '#B8AB91'} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function LinkRingsIcon({ active, reduced }) {
  const groupRef = useRef()
  useFrame((s) => {
    if (!groupRef.current || reduced) return
    groupRef.current.rotation.y = s.clock.elapsedTime * 0.35
    if (active) groupRef.current.position.y = 0.4 + Math.sin(s.clock.elapsedTime * 1.2) * 0.04
  })
  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.18, 0, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 48]} />
        <meshStandardMaterial color={active ? COPPER : COPPER_DIM} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.18, 0, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 48]} />
        <meshStandardMaterial color={active ? CREAM : '#B8B5A8'} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

const GEOMETRY_MAP = {
  konfeksiyon: MannequinIcon,
  nakis: HoopIcon,
  baski: PrintIcon,
  ozeltasarim: PenIcon,
  toplu: BoxesIcon,
  b2b: LinkRingsIcon,
}

function Pedestal({ active }) {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh>
        <cylinderGeometry args={[0.7, 0.78, 0.1, 48]} />
        <meshStandardMaterial color={active ? '#1a3578' : '#0a1a44'} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.68, 0.72, 48]} />
        <meshBasicMaterial color={active ? COPPER : COPPER_DIM} transparent opacity={active ? 0.95 : 0.5} />
      </mesh>
      {active && (
        <pointLight position={[0, 0.6, 0]} color={COPPER} intensity={1.6} distance={3} />
      )}
    </group>
  )
}

function Carousel({ services, sectionRef, activeIdx, onActiveChange, reduced }) {
  const groupRef = useRef()
  const lastIdxRef = useRef(-1)
  const radius = 2.9

  useFrame((_, delta) => {
    if (!groupRef.current || !sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const totalScroll = Math.max(1, rect.height - window.innerHeight)
    const scrolled = -rect.top
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll))

    const span = services.length > 1 ? services.length - 1 : 1
    const target = -progress * Math.PI * 2 * (span / services.length)

    if (reduced) {
      groupRef.current.rotation.y = target
    } else {
      const current = groupRef.current.rotation.y
      let diff = target - current
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      groupRef.current.rotation.y = current + diff * Math.min(1, delta * 6)
    }

    const idx = Math.max(0, Math.min(services.length - 1, Math.round(progress * span)))
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx
      onActiveChange(idx)
    }
  })

  return (
    <group ref={groupRef}>
      {services.map((s, i) => {
        const angle = (i / services.length) * Math.PI * 2
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        const Comp = GEOMETRY_MAP[s.id] || MannequinIcon
        const isActive = i === activeIdx
        return (
          <group key={s.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Pedestal active={isActive} />
            <Comp active={isActive} reduced={reduced} />
          </group>
        )
      })}
    </group>
  )
}

export default function ServiceShowcase3D({ services, activeIdx, onPick }) {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [internalIdx, setInternalIdx] = useState(typeof activeIdx === 'number' ? activeIdx : 0)

  useEffect(() => {
    if (typeof activeIdx === 'number') setInternalIdx(activeIdx)
  }, [activeIdx])

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
      { rootMargin: '300px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const handleActiveChange = (idx) => {
    setInternalIdx(idx)
    if (onPick) onPick(idx)
  }

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        height: `${services.length * 100}vh`,
      }}
    >
      <div
        className="v2-showcase"
        style={{
          ...wrap,
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
        }}
      >
        {mounted ? (
          <Canvas
            tabIndex={-1}
            camera={{ position: [0, 1.5, 5.4], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', inset: 0, touchAction: 'pan-y', outline: 'none' }}
          >
            <fog attach="fog" args={[NAVY, 5, 14]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 3]} intensity={0.9} color={CREAM} />
            <directionalLight position={[-3, -1, -3]} intensity={0.3} color={COPPER} />
            <Carousel
              services={services}
              sectionRef={sectionRef}
              activeIdx={internalIdx}
              onActiveChange={handleActiveChange}
              reduced={reduced}
            />
          </Canvas>
        ) : null}

        <div style={vignette} aria-hidden="true" />
      </div>
    </section>
  )
}

const wrap = {
  position: 'relative',
  width: '100%',
  background: 'radial-gradient(ellipse at center, #0E2A6E 0%, #061332 70%, #04081E 100%)',
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid rgba(212, 163, 115, 0.18)',
}
const vignette = {
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(ellipse at center, transparent 40%, rgba(4, 8, 30, 0.55) 100%)',
  pointerEvents: 'none',
  zIndex: 2,
}
