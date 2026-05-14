import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CanvasTexture, SRGBColorSpace } from 'three'
import { usePrefersReducedMotion } from '../shared/ReducedMotion.jsx'

const SPACING = 7
const FLOOR_Y = -0.85
const NAVY = '#2D3142'
const COPPER = '#D4A373'
const CREAM = '#EFEAE0'
const INK = '#0B0F1A'

/* Station 1: Hammadde — yarn spools */
function StationSpools({ reduced }) {
  const groupRef = useRef(null)
  useFrame((state) => {
    if (reduced || !groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((spool, i) => {
      spool.rotation.y = t * (0.4 + i * 0.08) * (i % 2 ? 1 : -1)
    })
  })
  const spools = [
    { x: -0.7, y: 0, c: COPPER },
    { x: 0, y: 0, c: '#E5C9A7' },
    { x: 0.7, y: 0, c: COPPER },
    { x: -0.35, y: 0.55, c: '#B88557' },
    { x: 0.35, y: 0.55, c: CREAM },
  ]
  return (
    <group ref={groupRef}>
      {spools.map((s, i) => (
        <mesh key={i} position={[s.x, FLOOR_Y + 0.28 + s.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.5, 28]} />
          <meshStandardMaterial color={s.c} roughness={0.65} metalness={0.05} />
        </mesh>
      ))}
    </group>
  )
}

/* Station 2: Kesim — fabric + animated cut line */
function StationCutting({ reduced }) {
  const cutRef = useRef(null)
  useFrame((state) => {
    if (reduced || !cutRef.current) return
    const t = state.clock.elapsedTime
    cutRef.current.position.x = ((t * 0.4) % 2.4) - 1.2
  })
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.01, 0]}>
        <planeGeometry args={[2.4, 1.6]} />
        <meshStandardMaterial color={NAVY} roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.02, 0]}>
        <planeGeometry args={[2.4, 0.04]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.15} />
      </mesh>
      <mesh ref={cutRef} position={[-1.2, FLOOR_Y + 0.18, 0]}>
        <boxGeometry args={[0.06, 0.32, 0.06]} />
        <meshStandardMaterial color={COPPER} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* Station 3: Dikim — sewing machine + needle */
function StationSewing({ reduced }) {
  const needleRef = useRef(null)
  const fabricRef = useRef(null)
  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    if (needleRef.current) needleRef.current.position.y = FLOOR_Y + 0.5 + Math.abs(Math.sin(t * 7)) * 0.18
    if (fabricRef.current) fabricRef.current.position.x = Math.sin(t * 0.8) * 0.18
  })
  return (
    <group>
      <mesh position={[0, FLOOR_Y + 0.45, -0.3]}>
        <boxGeometry args={[1.3, 0.5, 0.5]} />
        <meshStandardMaterial color={INK} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0.4, FLOOR_Y + 0.78, -0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.28, 16]} />
        <meshStandardMaterial color={COPPER} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={needleRef} position={[0.4, FLOOR_Y + 0.5, 0]}>
        <cylinderGeometry args={[0.012, 0.006, 0.35, 8]} />
        <meshStandardMaterial color="#EFEFEF" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={fabricRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.21, 0.15]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial color={CREAM} roughness={0.9} />
      </mesh>
    </group>
  )
}

/* Station 4: Nakış — embroidery dot grid pulsing */
function StationEmbroidery({ reduced }) {
  const groupRef = useRef(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((dot, i) => {
      const phase = ((i / 25) + t * 0.15) % 1
      const visible = phase < 0.5 ? phase * 2 : 1
      dot.scale.setScalar(reduced ? 1 : visible * 0.04 + 0.01)
    })
  })
  const dots = []
  const SIZE = 5
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      dots.push({ x: (c - (SIZE - 1) / 2) * 0.22, z: (r - (SIZE - 1) / 2) * 0.22 })
    }
  }
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.01, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshStandardMaterial color={CREAM} roughness={0.95} />
      </mesh>
      <group ref={groupRef} position={[0, FLOOR_Y + 0.06, 0]}>
        {dots.map((d, i) => (
          <mesh key={i} position={[d.x, 0, d.z]}>
            <sphereGeometry args={[1, 14, 14]} />
            <meshStandardMaterial color={COPPER} emissive={COPPER} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* Station 5: Kalite — magnifier hovering with point light */
function StationMagnifier({ reduced }) {
  const groupRef = useRef(null)
  useFrame((state) => {
    if (reduced || !groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.x = Math.sin(t * 0.7) * 0.35
    groupRef.current.position.z = Math.cos(t * 0.5) * 0.25
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.1
  })
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.01, 0]}>
        <planeGeometry args={[1.6, 1.1]} />
        <meshStandardMaterial color={NAVY} roughness={0.9} />
      </mesh>
      <group ref={groupRef} position={[0, FLOOR_Y + 0.55, 0]}>
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <torusGeometry args={[0.32, 0.04, 14, 36]} />
          <meshStandardMaterial color={COPPER} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.42, -0.18]} rotation={[Math.PI / 2.6, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
          <meshStandardMaterial color={INK} metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial color={COPPER} transparent opacity={0.18} />
        </mesh>
      </group>
      <pointLight position={[0, FLOOR_Y + 0.4, 0.2]} color={COPPER} intensity={1.6} distance={2.4} />
    </group>
  )
}

/* Station 6: Paketleme — stacked boxes */
function StationBoxes({ reduced }) {
  const boxes = [
    { x: -0.45, y: 0, r: 0.1 },
    { x: 0.25, y: 0, r: -0.08 },
    { x: -0.1, y: 0.45, r: 0.04 },
    { x: 0.5, y: 0.45, r: -0.12 },
    { x: 0.05, y: 0.9, r: 0.06 },
  ]
  const refs = useRef([])
  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    refs.current.forEach((box, i) => {
      if (!box) return
      box.position.y = FLOOR_Y + 0.2 + boxes[i].y + Math.sin(t * 0.4 + i) * 0.012
    })
  })
  return (
    <group>
      {boxes.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[b.x, FLOOR_Y + 0.2 + b.y, 0]}
          rotation={[0, b.r, 0]}
        >
          <boxGeometry args={[0.55, 0.4, 0.45]} />
          <meshStandardMaterial color="#E8D9B8" roughness={0.85} />
        </mesh>
      ))}
      {boxes.map((b, i) => (
        <mesh
          key={`tape-${i}`}
          position={[b.x, FLOOR_Y + 0.4 + b.y, 0.226]}
          rotation={[0, b.r, 0]}
        >
          <planeGeometry args={[0.5, 0.06]} />
          <meshBasicMaterial color={COPPER} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* Brand decal — Güvençoğlu Tekstil logo + wordmark for truck cargo sides */
function useTruckBrandTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    // Copper monogram disk
    const cx = 150
    const cy = 256
    const r = 96
    ctx.fillStyle = COPPER
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    // Cream "G" inside the disk
    ctx.fillStyle = CREAM
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '600 italic 140px "Fraunces", "Times New Roman", serif'
    ctx.fillText('G', cx, cy + 6)

    // Wordmark — GÜVENÇOĞLU (upright) + TEKSTİL (italic accent)
    ctx.fillStyle = CREAM
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.font = '600 100px "Fraunces", "Times New Roman", serif'
    ctx.fillText('GÜVENÇOĞLU', 280, 210)
    ctx.font = '500 italic 96px "Fraunces", "Times New Roman", serif'
    ctx.fillStyle = COPPER
    ctx.fillText('TEKSTİL', 280, 332)

    // Hairline copper underline
    ctx.fillRect(280, 392, 520, 4)

    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
    return tex
  }, [])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/* Station 7: Teslimat — truck silhouette traveling */
function StationTruck({ reduced }) {
  const truckRef = useRef(null)
  const brandTexture = useTruckBrandTexture()
  useFrame((state) => {
    if (reduced || !truckRef.current) return
    const t = state.clock.elapsedTime
    const cycle = (t * 0.4) % 4
    truckRef.current.position.x = -2 + cycle
  })
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.005, 0]}>
        <planeGeometry args={[6, 0.6]} />
        <meshStandardMaterial color={INK} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.01, 0]}>
        <planeGeometry args={[6, 0.04]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.55} />
      </mesh>
      <group ref={truckRef} position={[-2, FLOOR_Y + 0.4, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.1, 0.55, 0.5]} />
          <meshStandardMaterial color={NAVY} roughness={0.6} />
        </mesh>
        {/* Brand decal — front side (+Z) */}
        <mesh position={[0, 0.1, 0.2515]}>
          <planeGeometry args={[1.02, 0.46]} />
          <meshBasicMaterial map={brandTexture} transparent />
        </mesh>
        {/* Brand decal — back side (-Z), mirrored so text reads correctly */}
        <mesh position={[0, 0.1, -0.2515]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.02, 0.46]} />
          <meshBasicMaterial map={brandTexture} transparent />
        </mesh>
        <mesh position={[-0.55, 0.02, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.45]} />
          <meshStandardMaterial color={COPPER} roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[-0.55, 0.05, 0.18]}>
          <boxGeometry args={[0.18, 0.18, 0.1]} />
          <meshBasicMaterial color={CREAM} />
        </mesh>
        <mesh position={[-0.45, -0.25, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 18]} />
          <meshStandardMaterial color={INK} />
        </mesh>
        <mesh position={[0.35, -0.25, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 18]} />
          <meshStandardMaterial color={INK} />
        </mesh>
        <mesh position={[-0.45, -0.25, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 18]} />
          <meshStandardMaterial color={INK} />
        </mesh>
        <mesh position={[0.35, -0.25, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 18]} />
          <meshStandardMaterial color={INK} />
        </mesh>
      </group>
    </group>
  )
}

const STATION_COMPONENTS = [
  StationSpools,
  StationCutting,
  StationSewing,
  StationEmbroidery,
  StationMagnifier,
  StationBoxes,
  StationTruck,
]

function WorkshopFloor({ count }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, -((count - 1) * SPACING) / 2]}>
      <planeGeometry args={[20, count * SPACING + 20]} />
      <meshStandardMaterial color="#070a14" roughness={1} />
    </mesh>
  )
}

function WorkshopSceneInner({ stations, sectionRef, onActiveChange, reduced }) {
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
    let raf = 0
    const tick = () => {
      update()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionRef])

  useFrame(({ camera }) => {
    const progress = progressRef.current

    if (!reduced) {
      const eased = progress * (stations.length - 1)
      const targetZ = -eased * SPACING
      camera.position.z = targetZ + 3.6
      camera.position.x = Math.sin(progress * Math.PI * 3) * 0.7
      camera.position.y = 1.05 + Math.sin(progress * Math.PI * 2) * 0.1
      camera.lookAt(0, FLOOR_Y + 0.45, targetZ - 0.5)
    } else {
      camera.position.set(0, 1.1, 3.6)
      camera.lookAt(0, FLOOR_Y + 0.45, 0)
    }

    const idx = Math.max(0, Math.min(stations.length - 1, Math.round(progress * (stations.length - 1))))
    if (idx !== lastActive.current) {
      lastActive.current = idx
      onActiveChange(idx)
    }
  })

  return (
    <>
      <fog attach="fog" args={[NAVY, 5, 30]} />
      <color attach="background" args={[NAVY]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 7, 3]} intensity={0.85} color={COPPER} />
      <directionalLight position={[-3, 4, 2]} intensity={0.25} color={CREAM} />
      <WorkshopFloor count={stations.length} />
      {stations.map((s, i) => {
        const Comp = STATION_COMPONENTS[i] || STATION_COMPONENTS[0]
        return (
          <group key={s.id} position={[0, 0, -i * SPACING]}>
            <Comp reduced={reduced} />
          </group>
        )
      })}
    </>
  )
}

function StationPanel({ station, index, total, isActive, reduced }) {
  return (
    <article
      aria-hidden={!isActive}
      style={{
        position: 'absolute',
        right: 'clamp(24px, 6vw, 96px)',
        bottom: 'clamp(48px, 8vh, 96px)',
        maxWidth: 420,
        color: CREAM,
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateX(0)' : 'translateX(24px)',
        transition: reduced
          ? 'none'
          : 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: '0.2em',
          color: COPPER,
          marginBottom: 16,
          textTransform: 'uppercase',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} — {station.mono}
      </p>
      <h3
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 144',
          fontWeight: 500,
          lineHeight: 1.05,
          marginBottom: 20,
          color: CREAM,
        }}
      >
        {station.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 17,
          lineHeight: 1.65,
          opacity: 0.82,
          maxWidth: '52ch',
        }}
      >
        {station.description}
      </p>
    </article>
  )
}

function ProgressRail({ stations, activeIndex }) {
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
        gap: 12,
      }}
    >
      {stations.map((s, i) => {
        const active = i === activeIndex
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: active ? 32 : 10,
                height: 2,
                background: active ? COPPER : 'rgba(239,234,224,0.3)',
                transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: active ? CREAM : 'rgba(239,234,224,0.4)',
                transition: 'color 400ms',
                letterSpacing: '0.16em',
              }}
            >
              {String(i + 1).padStart(2, '0')} · {s.mono}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function StationVisualHint({ hint }) {
  const base = { width: 80, height: 80, flexShrink: 0, marginRight: 24 }
  if (hint === 'spools') {
    return (
      <span style={{ ...base, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
        {[COPPER, '#E5C9A7', COPPER, '#B88557', CREAM, COPPER].map((c, i) => (
          <span key={i} style={{ background: c, borderRadius: '50%', aspectRatio: '1' }} />
        ))}
      </span>
    )
  }
  if (hint === 'cutting') {
    return (
      <span style={{ ...base, background: NAVY, position: 'relative' }}>
        <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: COPPER }} />
      </span>
    )
  }
  if (hint === 'sewing') {
    return (
      <span style={{ ...base, background: CREAM, position: 'relative' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ position: 'absolute', left: 12 + i * 14, top: '40%', width: 2, height: 16, background: COPPER }} />
        ))}
      </span>
    )
  }
  if (hint === 'embroidery') {
    return (
      <span style={{ ...base, background: CREAM, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, padding: 8 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} style={{ background: COPPER, borderRadius: '50%', aspectRatio: '1' }} />
        ))}
      </span>
    )
  }
  if (hint === 'magnifier') {
    return (
      <span style={{ ...base, background: NAVY, position: 'relative' }}>
        <span style={{ position: 'absolute', top: 12, left: 12, width: 40, height: 40, border: `3px solid ${COPPER}`, borderRadius: '50%' }} />
        <span style={{ position: 'absolute', top: 48, left: 48, width: 24, height: 3, background: COPPER, transform: 'rotate(45deg)', transformOrigin: 'left' }} />
      </span>
    )
  }
  if (hint === 'boxes') {
    return (
      <span style={{ ...base, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{ background: '#E8D9B8', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, top: '40%', height: 4, background: COPPER }} />
          </span>
        ))}
      </span>
    )
  }
  if (hint === 'truck') {
    return (
      <span style={{ ...base, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, paddingBottom: 16 }}>
        <span style={{ width: 24, height: 32, background: COPPER }} />
        <span style={{ width: 36, height: 44, background: NAVY }} />
      </span>
    )
  }
  return null
}

function MobileWorkshop({ stations }) {
  return (
    <ol
      style={{
        background: NAVY,
        color: CREAM,
        listStyle: 'none',
        padding: '96px 24px 128px',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 56,
      }}
    >
      {stations.map((s, i) => (
        <li key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
          <StationVisualHint hint={s.visualHint} />
          <div style={{ flex: 1 }}>
            <p className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: COPPER, marginBottom: 8, textTransform: 'uppercase' }}>
              {String(i + 1).padStart(2, '0')} / {s.mono}
            </p>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 500, fontStyle: 'italic', fontVariationSettings: '"opsz" 144', marginBottom: 12, lineHeight: 1.1, color: CREAM }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function MobileStationPanel({ station, index, total }) {
  return (
    <article
      key={index}
      style={{
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 64,
        color: CREAM,
        pointerEvents: 'none',
        animation: 'v2-mobile-fade 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          color: COPPER,
          marginBottom: 12,
          textTransform: 'uppercase',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} — {station.mono}
      </p>
      <h3
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(22px, 6.5vw, 32px)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 144',
          fontWeight: 500,
          lineHeight: 1.1,
          marginBottom: 10,
          color: CREAM,
        }}
      >
        {station.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.85,
          maxWidth: '36ch',
        }}
      >
        {station.description}
      </p>
    </article>
  )
}

function MobileWorkshopDots({ count, active }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
        display: 'flex',
        gap: 6,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: i === active ? 28 : 8,
            height: 3,
            background: i === active ? COPPER : 'rgba(239,234,224,0.28)',
            borderRadius: 2,
            transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ))}
    </div>
  )
}

function MobileWorkshopExperience({ stations, reduced }) {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  return (
    <section
      ref={sectionRef}
      aria-label="Üretim hattının 7 adımı"
      style={{
        position: 'relative',
        height: `${stations.length * 100}vh`,
        background: NAVY,
      }}
    >
      <div className="v2-mobile-3d-sticky">
        <Canvas
          tabIndex={-1}
          camera={{ position: [0, 1.1, 3.6], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          style={{ position: 'absolute', inset: 0, touchAction: 'pan-y', outline: 'none' }}
        >
          <Suspense fallback={null}>
            <WorkshopSceneInner
              stations={stations}
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
              'linear-gradient(180deg, rgba(45,49,66,0.2) 0%, rgba(45,49,66,0) 30%, rgba(45,49,66,0) 55%, rgba(45,49,66,0.85) 100%)',
            pointerEvents: 'none',
          }}
        />

        <MobileStationPanel station={stations[active]} index={active} total={stations.length} />
        <MobileWorkshopDots count={stations.length} active={active} />
      </div>

      <style>{`
        .v2-mobile-3d-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          isolation: isolate;
          touch-action: pan-y;
        }
        .v2-mobile-3d-sticky canvas { outline: none !important; }
        @keyframes v2-mobile-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default function WorkshopScene({ stations }) {
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
    if (false) return
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
    let raf = 0
    const tick = () => {
      update()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isMobile])

  if (false) {
    if (reduced) return <MobileWorkshop stations={stations} />
    return <MobileWorkshopExperience stations={stations} reduced={reduced} />
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Üretim hattının 7 adımı"
      style={{
        position: 'relative',
        height: `${stations.length * 100}vh`,
        background: NAVY,
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
          camera={{ position: [0, 1.1, 3.6], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={null}>
            <WorkshopSceneInner
              stations={stations}
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
              'linear-gradient(180deg, rgba(45,49,66,0.35) 0%, rgba(45,49,66,0) 30%, rgba(45,49,66,0) 60%, rgba(45,49,66,0.7) 100%)',
            pointerEvents: 'none',
          }}
        />

        <ProgressRail stations={stations} activeIndex={active} />
        {stations.map((s, i) => (
          <StationPanel
            key={s.id}
            station={s}
            index={i}
            total={stations.length}
            isActive={i === active}
            reduced={reduced}
          />
        ))}
      </div>
    </section>
  )
}
