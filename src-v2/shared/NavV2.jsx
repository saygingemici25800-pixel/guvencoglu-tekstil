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

const positions = [
  { top: '0%', left: '25%' },
  { top: '0%', left: '75%' },
  { top: '50%', left: '0%' },
  { top: '50%', left: '100%' },
  { top: '100%', left: '25%' },
  { top: '100%', left: '75%' },
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
    padding: '6px 12px',
    borderRadius: 999,
    fontSize: 'clamp(10px, 2.2vw, 13px)',
    color: isCta ? 'var(--v2-ink)' : (isActive ? 'var(--v2-cream)' : 'var(--v2-navy)'),
    background: isCta ? 'var(--v2-copper)' : (isActive ? 'var(--v2-navy)' : 'rgba(245, 245, 240, 0.92)'),
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    textDecoration: 'none',
    fontFamily: 'var(--v2-font-body)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    border: '1px solid var(--v2-line)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  })

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'min(92vw, 520px)',
        height: 'min(54vw, 280px)',
        pointerEvents: 'none',
      }}
    >
      <Link
        to="/"
        aria-label="Ana Sayfa"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          pointerEvents: 'auto',
        }}
      >
        <img
          src="/logo-tekstil.png"
          alt="Güvençoğlu Tekstil"
          style={{
            height: 'clamp(168px, 36vw, 240px)',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Link>

      {links.map((l, i) => (
        <div
          key={`${l.to}-${i}`}
          style={{
            position: 'absolute',
            ...positions[i],
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            pointerEvents: 'auto',
          }}
        >
          <NavLink to={l.to} style={({ isActive }) => linkStyle(isActive, l.cta)}>
            {l.label}
          </NavLink>
        </div>
      ))}
    </div>
  )
}
