import { Link } from 'react-router-dom'

export default function CTABand() {
  return (
    <section className="v2-cta" style={wrap}>
      <div style={inner}>
        <p style={tag}>06 / Yolculuğun sonu — ya da başlangıcı</p>

        <h2 style={h2}>
          Bir sonraki ürünün
          <br />
          <em style={emStyle}>hikayesini</em> birlikte yazalım.
        </h2>

        <p style={lede}>
          Konfeksiyon, nakış, baskı veya özel B2B üretim. Adet, malzeme ve süreyi
          birlikte konuşalım; size 48 saat içinde teklif gelsin.
        </p>

        <div className="v2-cta-row" style={ctaRow}>
          <Link to="/v2/iletisim" style={primaryCta} className="v2-cta-primary">
            <span style={primaryLabel}>Teklif Al</span>
            <span style={primaryArrow} className="v2-cta-primary-arrow" aria-hidden="true">→</span>
          </Link>

          <a href="tel:+905321347602" style={secondaryCta} className="v2-cta-secondary">
            <span style={callMono}>VEYA HEMEN ARA</span>
            <span style={callNum}>0532 134 7602</span>
          </a>
        </div>
      </div>

      <div aria-hidden="true" style={cornerMark} className="v2-cta-corner">
        <span style={cornerNum}>2001</span>
        <span style={cornerArrow}>↗</span>
        <span style={cornerNum}>{new Date().getFullYear()}</span>
      </div>

      <style>{`
        .v2-cta-primary {
          transition: background 280ms ease, transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .v2-cta-primary:hover,
        .v2-cta-primary:focus-visible {
          background: #F5F5F0;
          color: #0A2463;
        }
        .v2-cta-primary:hover .v2-cta-primary-arrow,
        .v2-cta-primary:focus-visible .v2-cta-primary-arrow {
          transform: translateX(10px);
        }
        .v2-cta-primary:focus-visible {
          outline: 2px solid #F5F5F0;
          outline-offset: 6px;
        }
        .v2-cta-secondary {
          transition: color 240ms ease;
        }
        .v2-cta-secondary:hover,
        .v2-cta-secondary:focus-visible {
          color: #F5F5F0;
        }
        .v2-cta-secondary:focus-visible {
          outline: 2px solid #F5F5F0;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-cta-primary,
          .v2-cta-primary-arrow,
          .v2-cta-secondary { transition: none !important; }
        }
        @media (max-width: 720px) {
          .v2-cta-row { flex-direction: column !important; align-items: stretch !important; gap: 24px !important; }
          .v2-cta-primary { justify-content: space-between !important; }
          .v2-cta-corner { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  background: 'var(--v2-copper, #D4A373)',
  color: 'var(--v2-navy, #0A2463)',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px)',
  zIndex: 2,
  overflow: 'hidden',
}
const inner = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  position: 'relative',
  zIndex: 1,
}
const tag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  color: 'rgba(10, 36, 99, 0.75)',
  textTransform: 'uppercase',
  margin: 0,
}
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(48px, 8vw, 120px)',
  lineHeight: 0.95,
  color: 'var(--v2-navy, #0A2463)',
  margin: 0,
  letterSpacing: '-0.025em',
  maxWidth: '16ch',
}
const emStyle = { fontStyle: 'italic' }
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.55,
  color: 'rgba(10, 36, 99, 0.85)',
  margin: 0,
  maxWidth: '52ch',
}
const ctaRow = {
  marginTop: 32,
  display: 'flex',
  alignItems: 'center',
  gap: 48,
}
const primaryCta = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 28,
  padding: '28px 40px',
  background: 'var(--v2-navy, #0A2463)',
  color: '#F5F5F0',
  textDecoration: 'none',
  borderRadius: 4,
  minWidth: 280,
}
const primaryLabel = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(24px, 2.6vw, 32px)',
  fontWeight: 500,
  letterSpacing: '-0.01em',
}
const primaryArrow = {
  fontSize: 28,
  color: 'var(--v2-copper, #D4A373)',
  marginLeft: 'auto',
  transition: 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1)',
  display: 'inline-block',
}
const secondaryCta = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  textDecoration: 'none',
  color: 'rgba(10, 36, 99, 0.85)',
  paddingLeft: 28,
  borderLeft: '1px solid rgba(10, 36, 99, 0.25)',
}
const callMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(10, 36, 99, 0.6)',
}
const callNum = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(20px, 2vw, 26px)',
  fontWeight: 500,
  letterSpacing: '-0.005em',
}
const cornerMark = {
  position: 'absolute',
  right: 56,
  bottom: 48,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.14em',
  color: 'rgba(10, 36, 99, 0.45)',
  zIndex: 0,
}
const cornerNum = { fontSize: 14, letterSpacing: '0.18em' }
const cornerArrow = { fontSize: 18, opacity: 0.7 }
