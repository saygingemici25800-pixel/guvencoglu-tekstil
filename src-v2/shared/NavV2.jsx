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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) setMobileMenuOpen(false)
  }, [isMobile, mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const linkStyle = (isActive, isCta) => ({
    display: 'inline-block',
    padding: isMobile ? '5px 8px' : '8px 14px',
    marginLeft: isCta ? '8px' : 0,
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
    <>
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: isMobile ? '12px' : '32px',
        padding: isMobile ? '8px 14px' : '10px 24px',
        width: 'auto',
        maxWidth: 'calc(100vw - 32px)',
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
            height: isMobile ? '40px' : '48px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
          }}
        />
      </Link>

      {isMobile ? (
        <>
          <NavLink
            to="/iletisim"
            style={({ isActive }) => linkStyle(isActive, true)}
          >
            Teklif Al
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={mobileMenuOpen}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
            }}
          >
            <span style={{ width: 22, height: 2, background: 'var(--v2-navy)', borderRadius: 1 }} />
            <span style={{ width: 22, height: 2, background: 'var(--v2-navy)', borderRadius: 1 }} />
            <span style={{ width: 22, height: 2, background: 'var(--v2-navy)', borderRadius: 1 }} />
          </button>
        </>
      ) : (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, flexWrap: 'nowrap' }}>
          {links.map((l, i) => (
            <NavLink key={`${l.to}-${i}`} to={l.to} style={({ isActive }) => linkStyle(isActive, l.cta)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>

    {isMobile && mobileMenuOpen && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 100,
          background: 'rgba(245, 245, 240, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          animation: 'navv2-fade-in 200ms ease',
        }}
      >
        <button
          type="button"
          onClick={closeMobileMenu}
          aria-label="Menüyü kapat"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 40,
            height: 40,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <span style={{ position: 'absolute', width: 26, height: 2, background: 'var(--v2-navy)', borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ position: 'absolute', width: 26, height: 2, background: 'var(--v2-navy)', borderRadius: 1, transform: 'rotate(-45deg)' }} />
        </button>
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {links.filter((l) => !l.cta).map((l, i) => (
            <NavLink
              key={`mob-${l.to}-${i}`}
              to={l.to}
              onClick={closeMobileMenu}
              style={({ isActive }) => ({
                fontSize: '28px',
                fontFamily: 'var(--v2-font-display, Fraunces, serif)',
                fontWeight: 500,
                color: isActive ? 'var(--v2-copper)' : 'var(--v2-navy)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <style>{`@keyframes navv2-fade-in { from { opacity: 0 } to { opacity: 1 } }`}</style>
      </div>
    )}
  </>
  )
}
