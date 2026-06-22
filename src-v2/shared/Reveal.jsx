import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { entranceSyncDelay } from './entrance.js'

/* Reveal — SSG-uyumlu, tek seferlik scroll reveal (fade-in + hafif translateY).

   SSG/no-JS güvenli: prerender ve ilk client render'da içerik GÖRÜNÜR çıkar
   (opacity:0 HTML'e gömülmez → JS kapalıyken/crawler için içerik kayıp olmaz).
   JS yüklenince layout-effect (paint'ten ÖNCE) öğeyi gizler ve viewport'a
   girince bir kez açar, sonra observer'ı söker (geri sarınca tekrar oynamaz).
   prefers-reduced-motion: reduce → hiç gizlemez, içerik direkt görünür kalır. */

// SSR'da useEffect (çalışmaz), client'ta useLayoutEffect (paint öncesi gizler).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 20,
  duration = 620,
  className,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const syncRef = useRef(0) // preloader varsa: on-mount giriş, fade-out ile senkron gecikir
  // 'idle' = SSR/no-JS görünür durum · 'hidden' = JS gizledi · 'shown' = açıldı
  const [state, setState] = useState('idle')

  useIsoLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return // animasyon yok → görünür kal
    }

    // Paint'ten önce gizle (görünür→gizli flaş'ı olmadan)
    setState('hidden')

    const vh = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    // Yüklemede zaten ekrandaysa: bir sonraki frame'de aç (giriş animasyonu çalışsın)
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      syncRef.current = entranceSyncDelay() // preloader fade-out ile senkron başla (ilk yükleme)
      const raf = requestAnimationFrame(() => setState('shown'))
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const animated = state !== 'idle'
  const revealStyle = {
    opacity: state === 'hidden' ? 0 : 1,
    transform: state === 'hidden' ? `translateY(${y}px)` : 'none',
    transition: animated
      ? `opacity ${duration}ms ${EASE} ${delay + syncRef.current}ms, transform ${duration}ms ${EASE} ${delay + syncRef.current}ms`
      : undefined,
  }

  return (
    <Tag ref={ref} className={className} style={{ ...revealStyle, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
