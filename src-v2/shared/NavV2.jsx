import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/hikayemiz', label: 'Hikayemiz' },
  { to: '/uretim', label: 'Üretim' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/iletisim', label: 'İletişim' },
]

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Logo - header'ın üstünde, ortada */}
      <Link
        to="/"
        aria-label="Anasayfa"
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 51,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 56, height: 56, borderRadius: 0, backgroundImage: 'url(/logo-tekstil.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
        <span style={{
          display: 'none', fontFamily: 'var(--v2-font-display)',
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--v2-navy)',
          letterSpacing: '-0.01em',
        }}>
          Güvencoğlu
        </span>
      </Link>

      {/* Header - logo altında, biraz aşağıda */}
      <header
        style={{
          position: 'fixed',
          top: 72,
          left: 16,
          right: 16,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 20px',
          borderRadius: 999,
          background: scrolled ? 'rgba(245, 245, 240, 0.92)' : 'rgba(245, 245, 240, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--v2-line)',
          transition: 'background 300ms var(--v2-ease-out)',
        }}
      >
        <nav aria-label="Ana navigasyon" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ul style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            justifyContent: 'center',
          }}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  style={({ isActive }) => ({
                    display: 'inline-block',
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 'clamp(12px, 2.6vw, 14px)',
                    color: isActive ? 'var(--v2-cream)' : 'var(--v2-navy)',
                    background: isActive ? 'var(--v2-navy)' : 'transparent',
                    textDecoration: 'none',
                    fontFamily: 'var(--v2-font-body)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
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
          style={{
            marginLeft: 12,
            padding: '8px 18px',
            borderRadius: 999,
            background: 'var(--v2-copper)',
            color: 'var(--v2-ink)',
            fontSize: 'clamp(12px, 2.6vw, 14px)',
            fontWeight: 500,
            textDecoration: 'none',
            fontFamily: 'var(--v2-font-body)',
            whiteSpace: 'nowrap',
          }}
        >
          Teklif Al
        </Link>
      </header>
    </>
  )
}
