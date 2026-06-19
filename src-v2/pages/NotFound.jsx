import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'

/* NotFound — catch-all (*) → dist/404.html (Vercel otomatik 404'te sunar).
   Paletli, anlamlı: 404 + "Sayfa bulunamadı" + ana sayfaya dön + hızlı nav. */
export default function NotFound() {
  return (
    <PageTransition>
      <SEOHead
        title="Sayfa Bulunamadı (404) — Güvençoğlu Tekstil"
        description="Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir ya da menüden devam edebilirsiniz."
        path="/404"
      />
      <section style={wrap} aria-labelledby="nf-title">
        <div style={inner}>
          <p style={code}>404</p>
          <h1 id="nf-title" style={h1}>
            Sayfa <em style={em}>bulunamadı</em>.
          </h1>
          <p style={lede}>
            Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Aşağıdan
            devam edebilirsiniz.
          </p>
          <div style={actions}>
            <Link to="/" className="nf-btn" style={btn}>
              Ana Sayfaya Dön <span aria-hidden="true">→</span>
            </Link>
            <nav style={links} aria-label="Hızlı bağlantılar">
              <Link to="/ne-yapiyoruz" className="nf-link" style={link}>Ne Yapıyoruz</Link>
              <Link to="/biz-ve-is-ortaklarimiz" className="nf-link" style={link}>Biz ve İş Ortaklarımız</Link>
              <Link to="/blog" className="nf-link" style={link}>Blog</Link>
              <Link to="/iletisim" className="nf-link" style={link}>İletişim</Link>
            </nav>
          </div>
        </div>
      </section>

      <style>{`
        .nf-btn { transition: background 0.3s ease, color 0.3s ease; }
        .nf-btn:hover, .nf-btn:focus-visible { background: var(--v2-navy, #2D3142); color: var(--v2-cream, #EFEAE0); }
        .nf-btn span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .nf-btn:hover span, .nf-btn:focus-visible span { transform: translateX(5px); }
        .nf-link { transition: color 0.2s ease; }
        .nf-link:hover, .nf-link:focus-visible { color: var(--v2-copper, #9A0002); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 4px; border-radius: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .nf-btn, .nf-btn span, .nf-link { transition: none !important; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ── styles — palet: krem #EFEAE0, navy #2D3142, kırmızı #9A0002, muted #5A5A5A ── */
const wrap = {
  background: 'var(--v2-cream, #EFEAE0)',
  minHeight: '72vh',
  display: 'flex',
  alignItems: 'center',
  padding: 'clamp(140px, 20vh, 220px) clamp(24px, 6vw, 96px) clamp(72px, 12vw, 140px)',
}
const inner = { maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const code = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 'clamp(56px, 12vw, 132px)',
  lineHeight: 1,
  letterSpacing: '0.04em',
  color: 'var(--v2-copper, #9A0002)',
  margin: '0 0 12px',
}
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(34px, 5vw, 64px)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 18px',
}
const em = { fontStyle: 'italic', color: 'var(--v2-copper, #9A0002)' }
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 36px',
  maxWidth: '46ch',
}
const actions = { display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }
const btn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  background: 'transparent',
  color: 'var(--v2-navy, #2D3142)',
  border: '1.5px solid var(--v2-navy, #2D3142)',
  padding: '14px 30px',
  borderRadius: 999,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  fontWeight: 600,
  textDecoration: 'none',
  minHeight: 44,
  boxSizing: 'border-box',
}
const links = { display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px, 2vw, 28px)' }
const link = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
}
