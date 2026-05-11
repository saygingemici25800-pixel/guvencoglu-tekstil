import { Link } from 'react-router-dom'

const SERVICES = [
  {
    no: '04',
    title: 'Konfeksiyon',
    body: 'Okul forması, kurumsal üniforma, iş elbisesi. Kesim → dikim → kalite kontrolü kendi tesisimizde.',
  },
  {
    no: '05',
    title: 'Nakış',
    body: 'Logo, amblem, isim. Bilgisayarlı makinelerde 12 renkten fazla, polyester ipliği ile.',
  },
  {
    no: '06',
    title: 'Baskı',
    body: 'Dijital, transfer, sublimasyon. Pamuklu, polyester ve karışım kumaşlarda renk garantili.',
  },
  {
    no: '07',
    title: 'B2B Üretim',
    body: 'Toplu sipariş, özel tasarım, markaya özel etiket. 200 adetten 200.000 adede.',
  },
]

export default function FeaturedWork() {
  return (
    <section className="v2-featured" style={wrap}>
      <div style={inner}>
        <header style={headerStyle}>
          <p style={tag}>04 / Vitrin</p>
          <h2 style={h2}>
            Ne <em style={emStyle}>üretiyoruz.</em>
          </h2>
          <p style={lede}>
            Dört ana hat: konfeksiyon, nakış, baskı, B2B özel üretim. Hepsi tek
            çatı altında — aracısız, tek elden.
          </p>
        </header>

        <ul className="v2-featured-grid" style={grid}>
          {SERVICES.map((s, i) => (
            <li
              key={s.no}
              className="v2-featured-card"
              style={{ ...card, animationDelay: `${i * 100}ms` }}
            >
              <Link to="/v2/hizmetler" style={cardLink} className="v2-featured-link">
                <span style={cardMono} className="v2-featured-no">{s.no}</span>
                <span style={cardArrow} className="v2-featured-arrow" aria-hidden="true">→</span>
                <h3 style={cardTitle} className="v2-featured-title">{s.title}</h3>
                <p style={cardBody}>{s.body}</p>
              </Link>
            </li>
          ))}
        </ul>

        <footer style={footerStyle}>
          <span style={hairline} aria-hidden="true" />
          <Link to="/v2/hizmetler" style={ctaLink} className="v2-featured-cta">
            Tüm hizmetleri incele <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>

      <style>{`
        @keyframes v2-featured-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-featured-card {
          animation: v2-featured-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .v2-featured-link {
          transition: background 240ms ease, border-color 240ms ease;
        }
        .v2-featured-link:hover,
        .v2-featured-link:focus-visible {
          background: rgba(212, 163, 115, 0.08);
          border-color: rgba(212, 163, 115, 0.5);
        }
        .v2-featured-link:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        .v2-featured-link:hover .v2-featured-arrow,
        .v2-featured-link:focus-visible .v2-featured-arrow {
          transform: translate(8px, -8px);
          color: #D4A373;
        }
        .v2-featured-link:hover .v2-featured-title,
        .v2-featured-link:focus-visible .v2-featured-title {
          color: #D4A373;
        }
        .v2-featured-cta {
          transition: color 200ms ease;
        }
        .v2-featured-cta:hover,
        .v2-featured-cta:focus-visible {
          color: #D4A373;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-featured-card { animation: none; opacity: 1; transform: none; }
          .v2-featured-link,
          .v2-featured-arrow,
          .v2-featured-cta { transition: none !important; }
        }
        @media (max-width: 960px) {
          .v2-featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .v2-featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  background: 'var(--v2-cream, #F5F5F0)',
  color: 'var(--v2-ink, #0B0F1A)',
  padding: '128px 32px',
  zIndex: 2,
}
const inner = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 80,
}
const headerStyle = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '60ch' }
const tag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  color: 'var(--v2-copper, #D4A373)',
  textTransform: 'uppercase',
  margin: 0,
}
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 88px)',
  lineHeight: 1.0,
  color: 'var(--v2-navy, #0A2463)',
  margin: 0,
  letterSpacing: '-0.02em',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const lede = {
  fontSize: 18,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.72,
  margin: 0,
  maxWidth: '54ch',
}
const grid = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 0,
}
const card = { opacity: 0, display: 'flex' }
const cardLink = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '40px 28px 44px',
  textDecoration: 'none',
  color: 'var(--v2-ink, #0B0F1A)',
  borderLeft: '1px solid rgba(10, 36, 99, 0.12)',
  borderRight: '1px solid transparent',
  background: 'transparent',
  width: '100%',
  minHeight: 280,
}
const cardMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.15em',
  color: 'var(--v2-mist, #8A8F9E)',
  margin: 0,
  transition: 'color 240ms ease',
}
const cardArrow = {
  position: 'absolute',
  top: 36,
  right: 28,
  fontSize: 22,
  color: 'var(--v2-mist, #8A8F9E)',
  transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), color 240ms ease',
  display: 'inline-block',
}
const cardTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 2.6vw, 36px)',
  lineHeight: 1.05,
  color: 'var(--v2-navy, #0A2463)',
  margin: '24px 0 0',
  transition: 'color 240ms ease',
}
const cardBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.7,
  margin: 0,
}
const footerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  paddingTop: 32,
  borderTop: '1px solid rgba(10, 36, 99, 0.12)',
}
const hairline = {
  flex: 1,
  height: 1,
  background: 'linear-gradient(90deg, var(--v2-copper, #D4A373) 0%, transparent 100%)',
}
const ctaLink = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'var(--v2-navy, #0A2463)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
}
