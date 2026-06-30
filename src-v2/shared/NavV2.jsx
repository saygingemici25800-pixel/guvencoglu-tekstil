import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/biz-ve-is-ortaklarimiz', label: 'Biz ve İş Ortaklarımız' },
  { to: '/ne-yapiyoruz', label: 'Ürünlerimiz' },
  { to: '/blog', label: 'Blog' },
  { to: '/iletisim', label: 'Temas' },
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

  // Logo nav pill + telefon ile AYNI yatay eksende (dikey ortalı, top:44px + translateY(-50%)).
  // 5 sekmeli nav ile hiza korunur; biraz büyütüldü. Portre logo (595×842) dar → pill'e girmez.
  const LOGO_H = isMobile ? 144 : 224

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
    {/* Logo — header pill DIŞINDA, sayfanın sol üst köşesi (tam görünür, kesilmez) */}
    <Link
      to="/"
      aria-label="Ana Sayfa"
      style={{
        // absolute → sayfa üstüne sabitlenir, scroll'da yukarı kayıp kaybolur
        // (yalnızca açılışta görünür; fixed gibi aşağı inmez). Nav/telefon fixed kalır.
        position: 'absolute',
        // Dikey eksen: nav pill + telefon (top:20px) ortak merkezi ≈ 44px.
        // translateY(-50%) → logo bu eksende dikey ortalı: üçü tek hizada, yamukluk yok.
        top: '44px',
        left: 'clamp(16px, 3vw, 28px)',
        transform: 'translateY(-50%)',
        zIndex: 51,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo-tekstil.png"
        alt="Güvençoğlu Tekstil"
        style={{
          height: `${LOGO_H}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Link>

    {/* Telefon — sağ üst köşe (header hizasında), tel: link */}
    <a
      href="tel:+905321347602"
      aria-label="Telefonla ara: 0532 134 7602"
      className="nav-phone"
      style={{
        position: 'fixed',
        top: '20px',
        right: 'clamp(16px, 3vw, 28px)',
        zIndex: 51,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 44,
        padding: '0 16px',
        borderRadius: 999,
        background: scrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--v2-line)',
        color: 'var(--v2-navy)',
        textDecoration: 'none',
        fontFamily: 'var(--v2-font-body)',
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'background 200ms ease, color 200ms ease',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      <span className="nav-phone-label">0532 134 7602</span>
    </a>

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
      {isMobile ? (
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
      ) : (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, flexWrap: 'nowrap' }}>
          {links.map((l, i) => (
            <NavLink key={`${l.to}-${i}`} to={l.to} end={l.end} style={({ isActive }) => linkStyle(isActive, l.cta)}>
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
              end={l.end}
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

    <style>{`
      .nav-phone:hover, .nav-phone:focus-visible { background: var(--v2-navy) !important; color: var(--v2-cream) !important; }
      .nav-phone:focus-visible { outline: 2px solid var(--v2-copper); outline-offset: 3px; }
      @media (max-width: 960px) { .nav-phone-label { display: none; } }
    `}</style>
  </>
  )
}
