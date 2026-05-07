import { useEffect, useRef } from 'react'

const NAVY = '#0A2463'
const COPPER = '#D4A373'
const HIGHLIGHT = '#f1d6b3'
const THREAD = '#e7b985'

const PALETTE = [COPPER, THREAD, HIGHLIGHT, COPPER, THREAD]

export default function BackgroundCanvas() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    fibers: [],
    width: 0,
    height: 0,
    dpr: 1,
    t: 0,
    opacity: 0,
    targetOpacity: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = canvas.getContext('2d', { alpha: true })
    const s = stateRef.current

    const seedFibers = () => {
      const count = Math.min(
        70,
        Math.max(28, Math.floor((s.width * s.height) / 28000)),
      )
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          y: Math.random() * s.height,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.35,
          freq: 0.0025 + Math.random() * 0.004,
          amp: 18 + Math.random() * 60,
          drift: -0.08 - Math.random() * 0.18,
          color: PALETTE[i % PALETTE.length],
          width: 0.4 + Math.random() * 0.9,
          alpha: 0.35 + Math.random() * 0.45,
          weave: Math.random() * 0.5 + 0.5,
        })
      }
      s.fibers = arr
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      s.dpr = dpr
      s.width = w
      s.height = h
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedFibers()
    }

    const onScroll = () => {
      const heroEnd = window.innerHeight * 0.6
      const fadeRange = window.innerHeight * 0.4
      const y = window.scrollY
      const k = Math.min(1, Math.max(0, (y - heroEnd * 0.2) / fadeRange))
      s.targetOpacity = k
    }

    const draw = () => {
      const { width: w, height: h } = s
      s.t += reduced ? 0 : 0.0085
      s.opacity += (s.targetOpacity - s.opacity) * 0.06

      ctx.clearRect(0, 0, w, h)

      if (s.opacity < 0.002) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(10,36,99,0)')
      grad.addColorStop(0.5, 'rgba(10,36,99,0.04)')
      grad.addColorStop(1, 'rgba(10,36,99,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'

      const t = s.t
      const fibers = s.fibers
      const len = fibers.length

      for (let i = 0; i < len; i++) {
        const f = fibers[i]
        const baseY =
          ((f.y + t * f.drift * 60) % (h + 200) + (h + 200)) % (h + 200) - 100

        ctx.beginPath()
        ctx.lineWidth = f.width
        ctx.strokeStyle = f.color
        ctx.globalAlpha = f.alpha * s.opacity

        const step = 14
        let first = true
        for (let x = -20; x <= w + 20; x += step) {
          const warp =
            Math.sin(x * f.freq + t * f.speed + f.phase) * f.amp +
            Math.sin(x * f.freq * 2.4 + t * f.speed * 0.6) * (f.amp * 0.18)
          const weft =
            Math.cos(x * 0.012 + t * 0.4 + f.phase * 1.3) * 6 * f.weave
          const y = baseY + warp + weft
          if (first) {
            ctx.moveTo(x, y)
            first = false
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    onScroll()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(10,36,99,0) 0%, rgba(10,36,99,0.02) 60%, rgba(10,36,99,0.05) 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.085,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
