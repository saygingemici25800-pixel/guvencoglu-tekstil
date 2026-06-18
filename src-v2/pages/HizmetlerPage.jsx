import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { SERVICES } from '../data/services.js'
import { SEKTOR_LIST } from '../data/sektorler.js'

/* ──────────────────────────────────────────────────────────────
   HizmetlerPage — /ne-yapiyoruz ("Ne Yapıyoruz" ANA sayfa / landing).
   4 sektör özet bloğu (Sağlık·Otel·Okul·Restoran): her biri başlık + 1 cümle +
   2-3 ÖRNEK (foto SLOTU + İngilizce terim) + alt sayfa linki (/ne-yapiyoruz/<slug>).
   Altında "Hizmet Kalemlerimiz" (SERVICES, korundu). CTA krem (navy değil).
   Marquee yok → dikey sticky marquee alt sayfalarda (Adım B). Placeholder foto.
   ────────────────────────────────────────────────────────────── */

const ORIGIN = 'https://guvencoglutekstil.com'

/* Landing'de öne çıkarılacak örnek alt başlıklar (Adım B section term'leri) */
const HIGHLIGHTS = {
  saglik: ['Doctor Coat', 'Nurse Scrubs', 'Surgical Scrubs'],
  otel: ['Front Office', 'Housekeeping', 'F&B Service'],
  okul: ['Student Uniform', 'Academic Staff'],
  restoran: ['Chef / Kitchen', 'Service / Waiter', 'Barista / Bar'],
}

/* Editorial eyebrow — kırmızı kısa çizgi + uppercase etiket */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

/* Sektör özet bloğu — başlık + 1 cümle + 2-3 örnek (foto slot + terim) + link.
   Ritim: çift index düz, tek index ters (sol/sağ asimetri). */
function SectorSummary({ sector, index }) {
  const examples = (HIGHLIGHTS[sector.slug] || [])
    .map((term) => sector.sections.find((s) => s.term === term))
    .filter(Boolean)
  const reverse = index % 2 === 1

  return (
    <Reveal
      as="section"
      className={`ny-sec${reverse ? ' ny-sec-rev' : ''}`}
      style={nySec}
      aria-labelledby={`ny-${sector.slug}-title`}
    >
      <div className="ny-sec-head" style={nySecHead}>
        <Eyebrow>{sector.label.toLocaleUpperCase('tr-TR')}</Eyebrow>
        <h2 id={`ny-${sector.slug}-title`} style={sectorTitle}>{sector.title}</h2>
        <p style={body}>{sector.lede}</p>
        <Link to={`/ne-yapiyoruz/${sector.slug}`} className="hz-detail-link" style={secDetailLink}>
          {sector.label} çözümlerini incele <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ul className="ny-ex-row" style={nyExRow}>
        {examples.map((ex) => (
          <li key={ex.term} className="ny-ex-card" style={nyExCard}>
            <div className="ny-ex-photo" style={nyExPhoto} role="img" aria-label={`Görsel yakında: ${ex.term}`}>
              {/* Gerçek foto sonra: <img src={...} alt={ex.term} style={nyExImg} /> */}
              <span style={nyExTag}>foto: {ex.photo}</span>
            </div>
            <span style={nyExTerm}>{ex.term}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function HizmetlerPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Ne Yapıyoruz — Güvençoğlu Tekstil"
        description="Sağlık, otel, okul ve restoran kurumları için kurumsal üniforma ve tekstil üretimi. Fethiye'deki kendi tesisimizde nakış, baskı, özel tasarım, toplu üretim ve B2B çözümler."
        path="/ne-yapiyoruz"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Güvençoğlu Tekstil — Ne Yapıyoruz',
          itemListElement: SEKTOR_LIST.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            url: `${ORIGIN}/ne-yapiyoruz/${s.slug}`,
          })),
        }}
      />

      {/* ─── GİRİŞ ─────────────────────────────────────────────── */}
      <section style={heroWrap} aria-labelledby="ny-title">
        <Reveal style={heroInner}>
          <Eyebrow>NE YAPIYORUZ</Eyebrow>
          <h1 id="ny-title" style={h1}>Ne <em style={em}>Yapıyoruz</em></h1>
          <p style={lede}>
            Sağlık, otel, okul ve restoran kurumları için kurumsal üniforma ve
            tekstili uçtan uca üretiyoruz — tasarımdan dikişe, nakıştan baskıya,
            Fethiye’deki kendi tesisimizde. Aracısız, sözleşmeli, zamanında.
          </p>
        </Reveal>
      </section>

      {/* ─── 4 SEKTÖR ÖZETİ ────────────────────────────────────── */}
      <div style={sectorsWrap}>
        {SEKTOR_LIST.map((s, i) => (
          <SectorSummary key={s.slug} sector={s} index={i} />
        ))}
      </div>

      {/* ─── HİZMET KALEMLERİMİZ (SERVICES — korundu) ──────────── */}
      <section style={svcWrap} aria-labelledby="hz-svc-title">
        <div style={svcInner}>
          <Reveal as="header" style={svcHead}>
            <Eyebrow>HİZMET KALEMLERİ</Eyebrow>
            <h2 id="hz-svc-title" style={h2}>
              Hizmet <em style={em}>Kalemlerimiz</em>
            </h2>
          </Reveal>

          <Reveal style={svcGrid} className="hz-svc-grid" delay={120}>
            {SERVICES.map((s) => (
              <article key={s.id} className="hz-svc-card" style={svcCard}>
                <span style={svcNo}>{s.no}</span>
                <h3 style={svcTitle}>{s.title}</h3>
                <p style={svcTagline}>{s.tagline}</p>
                <ul style={svcFeatList}>
                  {s.features.map((f) => (
                    <li key={f} style={svcFeatItem}>
                      <span style={svcFeatDot} aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── CTA BANT (krem zemin) → /iletisim ─────────────────── */}
      <section style={ctaWrap} aria-labelledby="hz-cta-title">
        <Reveal style={ctaInner}>
          <span style={ctaRule} aria-hidden="true" />
          <h2 id="hz-cta-title" style={ctaTitle}>
            Projenizi konuşalım.
          </h2>
          <p style={ctaText}>
            Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde
            dönüyoruz.
          </p>
          <Link to="/iletisim" className="hz-outline-light cta-swap-btn" style={outlineBtnLight}>
            <span className="cta-swap">
              <span className="cta-swap-top">İletişime Geçin →</span>
              <span className="cta-swap-bot">0532 134 7602</span>
            </span>
          </Link>
        </Reveal>
      </section>

      <style>{`
        a:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 4px; border-radius: 2px; }

        /* sektör → alt sayfa linki */
        .hz-detail-link span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .hz-detail-link:hover span, .hz-detail-link:focus-visible span { transform: translateX(5px); }
        .hz-detail-link:hover, .hz-detail-link:focus-visible { text-decoration: underline; text-underline-offset: 4px; }

        /* örnek kart — sakin premium hover yükselme */
        .ny-ex-card {
          box-shadow: 0 1px 2px rgba(45, 49, 66, 0.04), 0 14px 32px -24px rgba(45, 49, 66, 0.3);
          transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 340ms ease;
        }
        .ny-ex-card:hover, .ny-ex-card:focus-within {
          transform: translateY(-4px);
          box-shadow: 0 4px 10px rgba(45, 49, 66, 0.06), 0 26px 52px -28px rgba(45, 49, 66, 0.4);
        }

        /* CTA outline (krem zemin) */
        .hz-outline-light { transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .hz-outline-light:hover, .hz-outline-light:focus-visible {
          background: var(--v2-navy, #2D3142);
          color: var(--v2-cream, #EFEAE0);
          border-color: var(--v2-navy, #2D3142);
        }

        /* hizmet kartları */
        .hz-svc-card {
          box-shadow: 0 1px 2px rgba(45, 49, 66, 0.04), 0 18px 40px -26px rgba(45, 49, 66, 0.3);
          transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 340ms ease;
        }
        .hz-svc-card:hover, .hz-svc-card:focus-within {
          transform: translateY(-5px);
          box-shadow: 0 4px 10px rgba(45, 49, 66, 0.06), 0 30px 60px -30px rgba(45, 49, 66, 0.42);
        }

        @media (max-width: 920px) {
          .ny-sec, .ny-sec-rev { flex-direction: column !important; align-items: stretch !important; }
        }
        @media (max-width: 560px) {
          .ny-ex-card { flex: 0 1 calc(50% - 8px) !important; }
        }
        @media (min-width: 861px) and (max-width: 1100px) {
          .hz-svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .hz-svc-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hz-outline-light, .hz-outline-light span, .hz-svc-card, .ny-ex-card, .hz-detail-link span { transition: none !important; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet: krem #EFEAE0, navy #2D3142, kırmızı #9A0002, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */
const CREAM_BG = 'var(--v2-cream, #EFEAE0)'

/* eyebrow */
const eyebrowRow = { display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 18px' }
const eyebrowDash = { width: 34, height: 1, background: 'var(--v2-copper, #9A0002)', flexShrink: 0 }
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
}
const em = { fontStyle: 'italic', color: 'var(--v2-copper, #9A0002)' }
const secDetailLink = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 22,
  alignSelf: 'flex-start',
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
  textDecoration: 'none',
}

/* başlıklar / metin */
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(48px, 7vw, 92px)',
  lineHeight: 1.02,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 24px',
}
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 3.6vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 22px',
  maxWidth: '20ch',
}
const sectorTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 3vw, 42px)',
  lineHeight: 1.08,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 16px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '52ch',
  textAlign: 'left',
}
const body = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
  maxWidth: '42ch',
  textAlign: 'left',
}

/* giriş */
const heroWrap = {
  background: CREAM_BG,
  padding: 'clamp(116px, 14vh, 176px) clamp(24px, 6vw, 96px) clamp(32px, 5vw, 56px)',
}
const heroInner = { maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }

/* 4 sektör özeti — bölümleri saran kapsayıcı */
const sectorsWrap = { background: CREAM_BG }
const nySec = {
  maxWidth: 1180,
  margin: '0 auto',
  padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(28px, 4vw, 64px)',
}
const nySecHead = { flex: '0 1 38%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }
const nyExRow = {
  flex: '1 1 auto',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'clamp(14px, 1.8vw, 24px)',
}
const nyExCard = {
  flex: '0 1 clamp(150px, 30%, 220px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  borderRadius: 14,
  padding: 12,
  boxSizing: 'border-box',
}
const nyExPhoto = {
  width: '100%',
  aspectRatio: '3 / 4',
  borderRadius: 8,
  background: 'rgba(45, 49, 66, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  boxSizing: 'border-box',
}
const nyExTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--v2-muted, #5A5A5A)',
  textAlign: 'center',
}
const nyExTerm = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  fontWeight: 600,
  lineHeight: 1.25,
  color: 'var(--v2-navy, #2D3142)',
  padding: '0 4px 4px',
}

/* HİZMET KALEMLERİ — grid (cream) */
const svcWrap = {
  background: CREAM_BG,
  padding: 'clamp(56px, 9vw, 120px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const svcInner = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 5vw, 56px)',
  alignItems: 'flex-start',
}
const svcHead = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const svcGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(18px, 2.2vw, 28px)',
  alignItems: 'stretch',
}
const svcCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  height: '100%',
  boxSizing: 'border-box',
  padding: 'clamp(30px, 3vw, 44px)',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  borderRadius: 16,
}
const svcNo = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper, #9A0002)',
  marginBottom: 2,
}
const svcTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(23px, 2.2vw, 30px)',
  lineHeight: 1.08,
  letterSpacing: '-0.01em',
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
}
const svcTagline = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
}
const svcFeatList = {
  listStyle: 'none',
  margin: 0,
  marginTop: 'auto',
  padding: '20px 0 0',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: 11,
}
const svcFeatItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 11,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.5,
  color: 'var(--v2-muted, #5A5A5A)',
}
const svcFeatDot = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: 'var(--v2-copper, #9A0002)',
  flexShrink: 0,
  marginTop: 8,
}

/* CTA (krem) */
const ctaWrap = {
  background: CREAM_BG,
  padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const ctaInner = {
  maxWidth: 720,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const ctaRule = {
  display: 'block',
  width: 48,
  height: 1,
  background: 'var(--v2-copper, #9A0002)',
  marginBottom: 28,
}
const ctaTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(32px, 4.4vw, 56px)',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 18px',
}
const ctaText = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.65,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 36px',
  maxWidth: '46ch',
}
const outlineBtnLight = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  border: '1px solid var(--v2-navy, #2D3142)',
  color: 'var(--v2-navy, #2D3142)',
  background: 'transparent',
  padding: '15px 30px',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  minHeight: 44,
  boxSizing: 'border-box',
}
