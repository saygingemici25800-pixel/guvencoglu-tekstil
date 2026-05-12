import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/hikayemiz', label: 'Hikayemiz' },
  { to: '/uretim', label: 'Üretim' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/iletisim', label: 'İletişim' },
]

const EASE = [0.22, 1, 0.36, 1]
const STAGGER = 0.08
const DURATION = 0.4

export default function NavV2() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 16, left: 16, right: 16,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderRadius: 999,
          background: scrolled ? 'rgba(245, 245, 240, 0.85)' : 'rgba(245, 245, 240, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--v2-line)',
          transition: 'background 300ms var(--v2-ease-out)',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            aria-hidden="true"
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--v2-navy), var(--v2-copper))',
            }}
          />
          <span style={{ fontFamily: 'var(--v2-font-display)', fontSize: 18, fontWeight: 600, color: 'var(--v2-navy)' }}>
            Güvencoğlu
          </span>
        </Link>

        <nav aria-label="Ana navigasyon" className="v2-nav-desktop" style={{ display: 'none' }}>
          <ul style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  style={({ isActive }) => ({
                    display: 'inline-block',
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 14,
                    color: isActive ? 'var(--v2-cream)' : 'var(--v2-navy)',
                    background: isActive ? 'var(--v2-navy)' : 'transparent',
                    transition: 'background 200ms var(--v2-ease-out), color 200ms var(--v2-ease-out)',
                  })}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/iletisim"
          className="v2-cta-desktop"
          style={{
            display: 'none',
            padding: '10px 20px',
            borderRadius: 999,
            background: 'var(--v2-copper)',
            color: 'var(--v2-navy)',
            fontWeight: 600,
            fontSize: 14,
            minHeight: 44,
            alignItems: 'center',
          }}
        >
          Teklif Al
        </Link>

        <button
          type="button"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="v2-burger"
          style={{
            width: 44, height: 44, display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
            <rect y="0" width="22" height="2" rx="1" fill="var(--v2-navy)" style={{ transform: open ? 'translate(0, 6px) rotate(45deg)' : 'none', transformOrigin: 'center', transition: 'transform 300ms var(--v2-ease-out)' }} />
            <rect y="6" width="22" height="2" rx="1" fill="var(--v2-navy)" style={{ opacity: open ? 0 : 1, transition: 'opacity 200ms var(--v2-ease-out)' }} />
            <rect y="12" width="22" height="2" rx="1" fill="var(--v2-navy)" style={{ transform: open ? 'translate(0, -6px) rotate(-45deg)' : 'none', transformOrigin: 'center', transition: 'transform 300ms var(--v2-ease-out)' }} />
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="v2-mobile-drawer"
            aria-label="Mobil menü"
            className="v2-mobile-drawer"
            style={{
              position: 'fixed',
              top: 80,
              right: 0,
              width: 'min(200px, 100vw)',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              background: 'transparent',
              pointerEvents: 'auto',
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: DURATION, delay: i * STAGGER, ease: EASE },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: { duration: DURATION, delay: (links.length - 1 - i) * STAGGER, ease: EASE },
                }}
              >
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className="v2-mobile-link"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '12px 24px',
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: 'right',
                    color: isActive ? 'var(--v2-cream)' : 'var(--v2-copper)',
                    fontFamily: 'var(--v2-font-display)',
                  })}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        .v2-mobile-link:hover { text-decoration: underline; }
        @media (min-width: 880px) {
          .v2-nav-desktop { display: block !important; }
          .v2-cta-desktop { display: inline-flex !important; }
          .v2-burger { display: none !important; }
          .v2-mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  )
}
