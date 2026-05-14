import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/hikayemiz', label: 'Hikayemiz' },
  { to: '/uretim', label: 'Üretim' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/iletisim', label: 'İletişim' },
  { to: '/iletisim', label: 'Teklif Al', cta: true },
]

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkStyle = (isActive, isCta) => ({
    display: 'inline-block',
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 'clamp(10px, 2.2vw, 14px)',
    color: isCta ? 'var(--v2-ink)' : (isActive ? 'var(--v2-cream)' : 'var(--v2-navy)'),
    background: isCta ? 'var(--v2-copper)' : (isActive ? 'var(--v2-navy)' : 'transparent'),
    textDecoration: 'none',
    fontFamily: 'var(--v2-font-body)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: 'background 200ms ease, color 200ms ease',
  })

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          padding: '8px 12px',
          borderRadius: 999,
          background: scrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--v2-line)',
          flexWrap: 'wrap',
        }}
      >
        {links.map((l, i) => (
          <NavLink key={`${l.to}-${i}`} to={l.to} style={({ isActive }) => linkStyle(isActive, l.cta)}>
            {l.label}
          </NavLink>
        ))}
      </header>

      <Link
        to="/"
        aria-label="Ana Sayfa"
        style={{
          position: 'fixed',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 51,
          display: 'block',
        }}
      >
        <img
          src="/logo-tekstil.png"
          alt="Güvençoğlu Tekstil"
          style={{
            height: 'clamp(80px, 18vw, 140px)',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
          }}
        />
      </Link>
    </>
  )
}
