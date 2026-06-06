import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#neden-biz', label: 'Neden Biz' },
  { href: '#teklif', label: 'Teklif Al' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        setOverHero(y < window.innerHeight * 0.7)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <header
        className={`nav ${scrolled ? 'scrolled' : ''} ${overHero && !scrolled ? 'over-hero' : ''}`}
      >
        <div className="container nav__inner">
          <a href="#top" className="nav__brand" aria-label="Güvençoğlu Tekstil — Anasayfa">
            <span className="nav__brand-mark" aria-hidden="true">G</span>
            <span className="nav__brand-text">
              <span>Güvençoğlu Tekstil</span>
              <small>Fethiye · 2001'den beri</small>
            </span>
          </a>

          <nav aria-label="Ana menü">
            <ul className="nav__links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a className="nav__link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--primary nav__cta" href="tel:+905321347602" aria-label="Bizi arayın">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
            </svg>
            0532 134 7602
          </a>

          <button
            className="nav__menu-toggle"
            type="button"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menüyü aç"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      <aside
        id="mobile-drawer"
        className={`nav__drawer ${drawerOpen ? 'open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <div className="nav__drawer-head">
          <span className="nav__brand">
            <span className="nav__brand-mark" aria-hidden="true">G</span>
            <span className="nav__brand-text">
              <span>Güvençoğlu Tekstil</span>
              <small>Fethiye · 2001'den beri</small>
            </span>
          </span>
          <button
            type="button"
            className="nav__drawer-close"
            onClick={closeDrawer}
            aria-label="Menüyü kapat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>

        <ul className="nav__drawer-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeDrawer}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__drawer-foot">
          <strong>Hızlı İletişim</strong>
          <a href="tel:+905321347602">0532 134 7602</a>
          <a href="https://wa.me/905321347602" target="_blank" rel="noopener">
            WhatsApp · 0532 134 7602
          </a>
          <a href="mailto:guvencoglutekstil@gmail.com">guvencoglutekstil@gmail.com</a>
        </div>
      </aside>
    </>
  )
}
