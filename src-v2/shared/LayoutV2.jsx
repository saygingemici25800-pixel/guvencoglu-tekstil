import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Lenis from 'lenis'
import NavV2 from './NavV2.jsx'
import FooterV2 from './FooterV2.jsx'
import { usePrefersReducedMotion } from './ReducedMotion.jsx'

import '../styles/tokens.css'
import '../styles/reset.css'
import '../styles/motion.css'

export default function LayoutV2() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return; if (window.matchMedia('(max-width: 767px)').matches) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reduced])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="v2-root">
      <a href="#v2-main" className="skip-link">İçeriğe atla</a>
      <NavV2 />
      <main id="v2-main">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <FooterV2 />
    </div>
  )
}
