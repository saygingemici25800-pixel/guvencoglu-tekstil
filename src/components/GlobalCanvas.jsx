import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  varying float vWave;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1, 0)), u.x),
      mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x),
      u.y
    );
  }

  void main() {
    vUv = uv;
    vec3 p = position;

    float t = uTime * 0.4;
    float warp = sin(p.x * 6.0 + t * 1.6) * 0.06;
    float weft = sin(p.y * 8.0 + t * 1.2 + warp * 4.0) * 0.05;
    float ripple = noise(p.xy * 1.4 + t * 0.4) * 0.18;

    float md = length(p.xy - uMouse * 1.6);
    float pull = smoothstep(1.6, 0.0, md) * 0.45;

    float wave = warp + weft + ripple + pull;
    p.z += wave + uScroll * 0.6;

    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uNavy;
  uniform vec3 uCopper;
  uniform vec3 uHighlight;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    float warpLine = abs(sin(vUv.x * 220.0 + sin(vUv.y * 60.0) * 1.5));
    float weftLine = abs(sin(vUv.y * 220.0 + sin(vUv.x * 60.0) * 1.5));
    float weave = smoothstep(0.85, 0.99, max(warpLine, weftLine));

    float h = clamp(vWave * 1.5 + 0.4, 0.0, 1.0);
    vec3 base = mix(uNavy, uCopper, smoothstep(0.55, 0.95, h));
    base = mix(base, uHighlight, smoothstep(0.85, 1.0, h) * 0.6);

    vec2 c = vUv - 0.5;
    float vig = smoothstep(0.85, 0.15, length(c));

    vec3 col = base + vec3(weave * 0.18) * mix(uCopper, uHighlight, 0.4);
    float scan = sin(vUv.y * 600.0) * 0.025;
    col += scan;

    float md = length(vUv - (uMouse * 0.5 + 0.5));
    float glow = smoothstep(0.45, 0.0, md) * 0.35;
    col += uCopper * glow;

    col *= mix(0.55, 1.05, vig);

    gl_FragColor = vec4(col, 0.96);
  }
`

function FabricMesh() {
  const meshRef = useRef(null)
  const matRef = useRef(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))
  const scroll = useRef(0)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uNavy: { value: new THREE.Color('#0A2463') },
      uCopper: { value: new THREE.Color('#D4A373') },
      uHighlight: { value: new THREE.Color('#f1d6b3') },
    }),
    [],
  )

  useEffect(() => {
    const onPointer = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      target.current.set(x, y)
    }
    const onScroll = () => {
      const max = Math.max(window.innerHeight * 0.8, 400)
      scroll.current = Math.min(window.scrollY / max, 1)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useFrame((_, dt) => {
    const m = matRef.current
    if (!m) return
    mouse.current.lerp(target.current, Math.min(dt * 4, 1))
    m.uniforms.uTime.value += dt
    m.uniforms.uMouse.value.copy(mouse.current)
    m.uniforms.uScroll.value = scroll.current

    if (meshRef.current) {
      meshRef.current.rotation.x = -0.55 + mouse.current.y * 0.05
      meshRef.current.rotation.y = mouse.current.x * 0.08
    }
  })

  const seg = Math.min(180, Math.max(80, Math.floor(size.width / 12)))

  return (
    <mesh ref={meshRef} position={[0, -0.1, 0]} rotation={[-0.55, 0, 0]}>
      <planeGeometry args={[6, 4, seg, Math.floor(seg * 0.66)]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
      />
    </mesh>
  )
}

function Threads() {
  const groupRef = useRef(null)
  const count = 14

  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 4.5,
        y: (Math.random() - 0.5) * 2.5,
        z: -1 + Math.random() * 0.6,
        rot: Math.random() * Math.PI,
        len: 0.6 + Math.random() * 1.2,
        speed: 0.2 + Math.random() * 0.5,
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const it = items[i]
      child.position.x = it.x + Math.sin(t * it.speed + i) * 0.18
      child.position.y = it.y + Math.cos(t * it.speed * 0.7 + i) * 0.12
      child.rotation.z = it.rot + t * 0.05 * (i % 2 ? 1 : -1)
    })
  })

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <mesh key={i} position={[it.x, it.y, it.z]} rotation={[0, 0, it.rot]}>
          <planeGeometry args={[it.len, 0.012]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#e7b985' : '#D4A373'}
            transparent
            opacity={0.32}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.4], fov: 55 }}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    >
      <color attach="background" args={['#0A2463']} />
      <ambientLight intensity={0.6} />
      <FabricMesh />
      <Threads />
    </Canvas>
  )
}
