import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const leftLinks = [
  { to: '/hikayemiz', label: 'Hikayemiz' },
  { to: '/uretim', label: 'Üretim' },
  { to: '/hizmetler', label: 'Hizmetler' },
]

const rightLinks = [
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

  const linkStyle = ({ isActive }) => ({
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
  })

  return (
    <header
      style={{
        position: 'fixed',
        top: 20,
        left: 16,
        right: 16,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        background: scrolled ? 'rgba(245, 245, 240, 0.92)' : 'rgba(245, 245, 240, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--v2-line)',
      }}
    >
      <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'flex-end' }}>
        {leftLinks.map((l) => (
          <NavLink key={l.to} to={l.to} style={linkStyle}>{l.label}</NavLink>
        ))}
      </nav>

      <Link to="/" aria-label="Ana Sayfa" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <img
          src="/logo-tekstil.png"
          alt="Güvençoğlu Tekstil"
          style={{ height: 56, width: 'auto', objectFit: 'contain' }}
        />
      </Link>

      <nav style={{ display: 'flex', gap: 4, alignItems: 'center', flex: 1 }}>
        {rightLinks.map((l) => (
          <NavLink key={l.to} to={l.to} style={linkStyle}>{l.label}</NavLink>
        ))}
        <Link
          to="/iletisim"
          style={{
            marginLeft: 8,
            padding: '10px 22px 10px 16px',
            borderTopLeftRadius: 999,
            borderBottomLeftRadius: 999,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 22,
            background: 'var(--v2-copper)',
            color: 'var(--v2-ink)',
            fontSize: 'clamp(12px, 2.6vw, 14px)',
            fontWeight: 500,
            textDecoration: 'none',
            fontFamily: 'var(--v2-font-body)',
            whiteSpace: 'nowrap',
            transform: 'rotate(-2deg)',
          }}
        >
          Teklif Al
        </Link>
      </nav>
    </header>
  )
}
