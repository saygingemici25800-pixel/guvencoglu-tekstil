import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const NAVY = '#2D3142'
const COPPER = '#D4A373'
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

function Pin({ reduced }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime
    ref.current.position.y = 0.55 + Math.sin(t * 1.4) * 0.09
    ref.current.rotation.y = t * 0.25
  })
  return (
    <group ref={ref} position={[0, 0.55, 0]}>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.36, 36, 28]} />
        <meshStandardMaterial color={NAVY} roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.22, 0.355]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color={COPPER} />
      </mesh>
      <mesh position={[0, 0.22, 0.36]}>
        <circleGeometry args={[0.05, 24]} />
        <meshBasicMaterial color={CREAM} />
      </mesh>
      <mesh position={[0, -0.34, 0]}>
        <coneGeometry args={[0.3, 0.65, 32]} />
        <meshStandardMaterial color={NAVY} roughness={0.55} metalness={0.15} />
      </mesh>
    </group>
  )
}

function Ground({ reduced }) {
  const ringARef = useRef()
  const ringBRef = useRef()
  useFrame((state) => {
    if (reduced) {
      if (ringARef.current) {
        ringARef.current.scale.setScalar(1)
        ringARef.current.material.opacity = 0.5
      }
      if (ringBRef.current) {
        ringBRef.current.scale.setScalar(1.4)
        ringBRef.current.material.opacity = 0.25
      }
      return
    }
    const t = state.clock.elapsedTime
    const pulseA = ((t * 0.45) % 1)
    const pulseB = ((t * 0.45 + 0.5) % 1)
    if (ringARef.current) {
      ringARef.current.scale.setScalar(0.6 + pulseA * 1.8)
      ringARef.current.material.opacity = (1 - pulseA) * 0.55
    }
    if (ringBRef.current) {
      ringBRef.current.scale.setScalar(0.6 + pulseB * 1.8)
      ringBRef.current.material.opacity = (1 - pulseB) * 0.55
    }
  })
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <mesh>
        <circleGeometry args={[1.6, 64]} />
        <meshStandardMaterial color="#070a14" roughness={1} />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <ringGeometry args={[1.55, 1.58, 64]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringARef} position={[0, 0, 0.002]}>
        <ringGeometry args={[0.55, 0.6, 64]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringBRef} position={[0, 0, 0.002]}>
        <ringGeometry args={[0.55, 0.58, 64]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color={COPPER} />
      </mesh>
    </group>
  )
}

function PinShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
      <circleGeometry args={[0.32, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.35} />
    </mesh>
  )
}

export default function LocationPin3D({ height = 360, caption }) {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [mounted, setMounted] = useState(false)

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
    <div
      ref={sectionRef}
      className="v2-pin"
      style={{ ...wrap, height }}
      role="img"
      aria-label="Güvencoğlu Tekstil fabrikası — Fethiye, Muğla"
    >
      {mounted ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [1.2, 1.7, 2.4], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3.2, 4, 3]} intensity={0.95} />
          <directionalLight position={[-3, -2, -3]} intensity={0.35} color={COPPER} />
          <Ground reduced={reduced} />
          <PinShadow />
          <Pin reduced={reduced} />
        </Canvas>
      ) : null}

      <div style={overlay} aria-hidden="true">
        <p style={coord}>36.6512° N · 29.1264° E</p>
        <p style={label}>{caption || 'FABRİKA'}</p>
      </div>
    </div>
  )
}

const wrap = {
  position: 'relative',
  width: '100%',
  background: 'var(--v2-navy, #2D3142)',
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid rgba(212, 163, 115, 0.25)',
}
const overlay = {
  position: 'absolute',
  left: 20,
  bottom: 16,
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  zIndex: 2,
}
const coord = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.14em',
  color: 'rgba(239, 234, 224, 0.55)',
  margin: 0,
  textTransform: 'uppercase',
}
const label = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
  textTransform: 'uppercase',
}
