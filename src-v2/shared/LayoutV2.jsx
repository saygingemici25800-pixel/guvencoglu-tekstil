import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import NavV2 from './NavV2.jsx'
import FooterV2 from './FooterV2.jsx'
import Preloader from './Preloader.jsx'
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
      {/* Açılış preloader'ı — ilk girişte oturum başına 1 kez, üstte overlay (SSG-safe) */}
      <Preloader />
      <a href="#v2-main" className="skip-link">İçeriğe atla</a>
      <NavV2 />
      <main id="v2-main">
        {/* key={pathname} → route değişiminde Outlet remount olur; PageTransition'ın
            saf-CSS clip-path giriş geçişi bu remount'la tetiklenir (framer-motion
            gerekmez). AnimatePresence no-op'tu (CSS exit yok), kaldırıldı. */}
        <Outlet key={location.pathname} />
      </main>

      {/* Floating WhatsApp — tüm sayfalarda, nav'ın altında (z-index 40 < 50) */}
      <a
        href="https://wa.me/905321347602"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="WhatsApp ile yazın"
      >
        <span className="wa-fab-label">Bize Yazın</span>
        <span className="wa-fab-circle" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" focusable="false">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </span>
      </a>

      <style>{`
        .wa-fab {
          position: fixed;
          right: clamp(16px, 3vw, 28px);
          bottom: clamp(16px, 3vw, 28px);
          z-index: 40;
          display: inline-flex;
          align-items: center;
          gap: 0;
          text-decoration: none;
        }
        .wa-fab-circle {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 999px;
          background: var(--v2-navy, #2D3142);
          color: var(--v2-cream, #EFEAE0);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(45, 49, 66, 0.32);
          transition: transform 260ms cubic-bezier(0.16,1,0.3,1), background 260ms ease;
        }
        .wa-fab-label {
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0;
          color: var(--v2-cream, #EFEAE0);
          background: var(--v2-navy, #2D3142);
          font-family: var(--v2-font-body, sans-serif);
          font-size: 14px;
          font-weight: 600;
          border-radius: 999px 0 0 999px;
          line-height: 56px;
          height: 56px;
          padding: 0;
          box-shadow: 0 8px 24px rgba(45, 49, 66, 0.32);
          transition: max-width 320ms cubic-bezier(0.16,1,0.3,1), padding 320ms ease, opacity 220ms ease;
        }
        .wa-fab:hover .wa-fab-label,
        .wa-fab:focus-visible .wa-fab-label {
          max-width: 200px;
          opacity: 1;
          padding: 0 18px 0 22px;
        }
        .wa-fab:hover .wa-fab-circle,
        .wa-fab:focus-visible .wa-fab-circle {
          transform: scale(1.05);
        }
        .wa-fab:focus-visible {
          outline: 2px solid var(--v2-copper, #D4A373);
          outline-offset: 3px;
          border-radius: 999px;
        }
        @media (max-width: 720px) {
          .wa-fab-label { display: none; }
        }
      `}</style>

      <FooterV2 />
    </div>
  )
}
