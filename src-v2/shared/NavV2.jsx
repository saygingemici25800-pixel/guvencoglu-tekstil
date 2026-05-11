import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/v2', label: 'Ana Sayfa', end: true },
  { to: '/v2/hikayemiz', label: 'Hikayemiz' },
  { to: '/v2/uretim', label: 'Üretim' },
  { to: '/v2/hizmetler', label: 'Hizmetler' },
  { to: '/v2/referanslar', label: 'Referanslar' },
  { to: '/v2/iletisim', label: 'İletişim' },
]

export default function NavV2() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
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
      <Link to="/v2" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
        to="/v2/iletisim"
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

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menü"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--v2-navy)',
            color: 'var(--v2-cream)',
            zIndex: -1,
            padding: '96px 32px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--v2-font-display)',
                    fontSize: 'clamp(28px, 7vw, 44px)',
                    color: isActive ? 'var(--v2-copper)' : 'var(--v2-cream)',
                    padding: '8px 0',
                    minHeight: 44,
                  })}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/v2/iletisim"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 'auto',
              alignSelf: 'flex-start',
              padding: '14px 28px',
              borderRadius: 999,
              background: 'var(--v2-copper)',
              color: 'var(--v2-navy)',
              fontWeight: 600,
              minHeight: 48,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Teklif Al
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 880px) {
          .v2-nav-desktop { display: block !important; }
          .v2-cta-desktop { display: inline-flex !important; }
          .v2-burger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
