import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/hikayemiz', label: 'Hikayemiz' },
  { to: '/uretim', label: 'Üretim' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/iletisim', label: 'İletişim' },
]

// Beşgen köşe pozisyonları (5 nokta, tepesi yukarı)
const positions = [
  { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },        // top
  { top: '38%', left: '0%', transform: 'translate(-50%, -50%)' },        // upper-left
  { top: '38%', left: '100%', transform: 'translate(-50%, -50%)' },      // upper-right
  { top: '100%', left: '20%', transform: 'translate(-50%, -50%)' },      // lower-left
  { top: '100%', left: '80%', transform: 'translate(-50%, -50%)' },      // lower-right
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
    padding: '6px 12px',
    borderRadius: 999,
    fontSize: 'clamp(10px, 2.4vw, 13px)',
    color: isActive ? 'var(--v2-cream)' : 'var(--v2-navy)',
    background: isActive ? 'var(--v2-navy)' : 'rgba(245, 245, 240, 0.85)',
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
    <>
      <div
        style={{
          position: 'fixed',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: 'min(92vw, 480px)',
          height: 'min(40vw, 200px)',
          pointerEvents: 'none',
        }}
      >
        {/* Logo - merkez */}
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
              height: 'clamp(64px, 14vw, 88px)',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* Beşgen köşeleri */}
        {links.map((l, i) => (
          <div
            key={l.to}
            style={{
              position: 'absolute',
              ...positions[i],
              zIndex: 1,
              pointerEvents: 'auto',
            }}
          >
            <NavLink to={l.to} style={linkStyle}>{l.label}</NavLink>
          </div>
        ))}
      </div>

      {/* Teklif Al - sağ üst köşede ayrı */}
      <Link
        to="/iletisim"
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 51,
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
          boxShadow: '0 4px 16px rgba(212, 163, 115, 0.4)',
        }}
      >
        Teklif Al
      </Link>
    </>
  )
}
