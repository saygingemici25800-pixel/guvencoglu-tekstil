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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 720px)').matches : false
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const onChange = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const linkStyle = (isActive, isCta) => ({
    display: 'inline-block',
    padding: isCta
      ? (isMobile ? '5px 10px' : '8px 16px')
      : (isMobile ? '5px 8px' : '8px 14px'),
    marginLeft: isCta ? 4 : 0,
    borderRadius: 999,
    fontSize: isMobile ? '11px' : '14px',
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
        top: 20,
        left: isMobile ? 16 : 32,
        right: isMobile ? 16 : 32,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: 8,
        padding: isMobile ? '4px 10px' : '6px 16px',
        borderRadius: 999,
        background: scrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--v2-line)',
      }}
    >
      <Link
        to="/"
        aria-label="Ana Sayfa"
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
      >
        <img
          src="/logo-tekstil.png"
          alt="Güvençoğlu Tekstil"
          style={{
            height: isMobile ? '56px' : 'clamp(64px, 12vw, 84px)',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
          }}
        />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1px' : '2px', flexWrap: 'nowrap' }}>
        {links.map((l, i) => (
          <NavLink key={`${l.to}-${i}`} to={l.to} style={({ isActive }) => linkStyle(isActive, l.cta)}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
