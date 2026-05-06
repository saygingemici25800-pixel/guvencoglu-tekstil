const SERVICE_LINKS = [
  { href: '#hizmetler', label: 'Okul Forması' },
  { href: '#hizmetler', label: 'Kurumsal Üniforma' },
  { href: '#hizmetler', label: 'Tişört Baskı' },
  { href: '#hizmetler', label: 'Logo Nakış' },
  { href: '#hizmetler', label: 'Toplu Üretim' },
]

const COMPANY_LINKS = [
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#neden-biz', label: 'Neden Biz' },
  { href: '#teklif', label: 'Teklif Al' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <span className="nav__brand-mark" aria-hidden="true">G</span>
              <div>
                <strong>Güvençoğlu Tekstil</strong>
                <small>Fethiye · 1980'den beri</small>
              </div>
            </div>
            <p>
              Fethiye Kesikkapı'daki kendi tesisimizde 1980'den bu yana okul ve
              kurumların güvendiği üretici. Aracısız, kendi ekibimizle dikiyoruz.
            </p>
          </div>

          <div>
            <h4>Hizmetler</h4>
            <ul>
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Kurumsal</h4>
            <ul>
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>İletişim</h4>
            <ul>
              <li>
                <a href="tel:+902526125092">0252 612 50 92</a>
              </li>
              <li>
                <a href="https://wa.me/905321347602" target="_blank" rel="noopener noreferrer">
                  WhatsApp · 0532 134 76 02
                </a>
              </li>
              <li>
                <a href="mailto:guvencoglutekstil@gmail.com">guvencoglutekstil@gmail.com</a>
              </li>
              <li>Kesikkapı Mah. Atatürk Cad. No:24<br />Fethiye / Muğla</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Güvençoğlu Tekstil. Tüm hakları saklıdır.</span>
          <span>Fethiye'de tasarlandı · Kendi tesisimizde üretildi.</span>
        </div>
      </div>
    </footer>
  )
}
