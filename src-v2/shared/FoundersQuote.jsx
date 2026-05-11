import { Link } from 'react-router-dom'

export default function FoundersQuote() {
  return (
    <section className="v2-quote" style={wrap}>
      <div style={inner}>
        <p style={tag}>05 / Söz</p>

        <blockquote style={blockquote}>
          <span aria-hidden="true" style={openMark}>“</span>
          <p style={quoteText}>
            Bir iplik, <em style={emStyle}>üç kuşak.</em>
            <br />
            Aynı tezgâhta, aynı söz:
            <br />
            <em style={emStyle}>kaliteden ödün yok.</em>
          </p>
        </blockquote>

        <footer style={attribution} className="v2-quote-attribution">
          <span style={hairline} aria-hidden="true" />
          <div style={attrText}>
            <p style={attrName}>Ömer Güvençoğlu</p>
            <p style={attrRole}>Kurucu · 1980'den beri</p>
          </div>
          <Link to="/v2/hikayemiz" style={attrLink} className="v2-quote-link">
            Hikayenin tamamı <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>

      <style>{`
        .v2-quote-link {
          transition: color 240ms ease, transform 240ms ease;
        }
        .v2-quote-link:hover,
        .v2-quote-link:focus-visible {
          color: #F5F5F0;
        }
        .v2-quote-link:hover span,
        .v2-quote-link:focus-visible span {
          transform: translateX(6px);
          display: inline-block;
        }
        .v2-quote-link:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-quote-link { transition: none !important; }
        }
        @media (max-width: 720px) {
          .v2-quote-attribution { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .v2-quote-attribution > span:first-child { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  background: 'var(--v2-navy, #0A2463)',
  color: '#F5F5F0',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px)',
  zIndex: 2,
  overflow: 'hidden',
}
const inner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 56,
  position: 'relative',
}
const tag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  color: 'var(--v2-copper, #D4A373)',
  textTransform: 'uppercase',
  margin: 0,
}
const blockquote = {
  position: 'relative',
  margin: 0,
  padding: 0,
}
const openMark = {
  position: 'absolute',
  top: -40,
  left: -20,
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(120px, 18vw, 220px)',
  lineHeight: 1,
  color: 'var(--v2-copper, #D4A373)',
  opacity: 0.25,
  fontStyle: 'italic',
  pointerEvents: 'none',
  userSelect: 'none',
}
const quoteText = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(36px, 5.2vw, 76px)',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: '#F5F5F0',
  margin: 0,
  maxWidth: '22ch',
  position: 'relative',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const attribution = {
  display: 'flex',
  alignItems: 'center',
  gap: 32,
  paddingTop: 40,
  borderTop: '1px solid rgba(212, 163, 115, 0.25)',
}
const hairline = {
  width: 64,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
}
const attrText = { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }
const attrName = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 17,
  color: '#F5F5F0',
  margin: 0,
}
const attrRole = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const attrLink = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'rgba(245, 245, 240, 0.8)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
}
