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
    padding: 'clamp(4px, 1vw, 8px) clamp(6px, 1.6vw, 14px)',
    borderRadius: 999,
    fontSize: 'clamp(9px, 1.8vw, 14px)',
    color: isCta ? 'var(--v2-ink)' : (isActive ? 'var(--v2-cream)' : 'var(--v2-navy)'),
    background: isCta ? 'var(--v2-copper)' : (isActive ? 'var(--v2-navy)' : 'transparent'),
    textDecoration: 'none',
    fontFamily: 'var(--v2-font-body)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: 'background 200ms ease, color 200ms ease',
  })

  return (
    <header
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: 'clamp(6px, 1.4vw, 10px) clamp(10px, 2vw, 16px)',
        borderRadius: 999,
        background: scrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--v2-line)',
      }}
    >
      <Link to="/" aria-label="Ana Sayfa" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo-tekstil.png"
          alt="Güvençoğlu Tekstil"
          style={{
            height: 'clamp(36px, 8vw, 56px)',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 0.6vw, 6px)', flexWrap: 'nowrap' }}>
        {links.map((l, i) => (
          <NavLink key={`${l.to}-${i}`} to={l.to} style={({ isActive }) => linkStyle(isActive, l.cta)}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
