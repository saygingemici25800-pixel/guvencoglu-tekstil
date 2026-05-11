import { useCallback, useEffect, useState } from 'react'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import CTABand from '../shared/CTABand.jsx'
import ServiceShowcase3D from '../scenes/ServiceShowcase3D.jsx'
import { SERVICES } from '../data/services.js'

export default function ServicesV2() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = SERVICES[activeIdx]

  const goPrev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + SERVICES.length) % SERVICES.length)
  }, [])

  const goNext = useCallback(() => {
    setActiveIdx((i) => (i + 1) % SERVICES.length)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <PageTransition>
      <SEOHead
        title="Hizmetler — Konfeksiyon, Nakış, Baskı | Güvencoğlu Tekstil"
        description="Konfeksiyon, nakış, baskı, özel tasarım, toplu üretim ve B2B çözümler. Her ölçek için profesyonel tekstil hizmetleri — 3D vitrin."
        path="/v2/hizmetler"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: { '@type': 'Service', name: s.title, description: s.tagline },
          })),
        }}
      />

      <section style={heroSection}>
        <div style={heroInner}>
          <p style={mono}>04 / Hizmetler</p>
          <h1 style={hero}>
            Ne <em style={emStyle}>yapıyoruz.</em>
          </h1>
          <p style={lede}>
            Altı hat. Hepsi tek çatı altında — kesimden teslimata, hammaddeden
            etikete. Hangisi senin için, alttaki vitrini gez.
          </p>
        </div>
      </section>

      <section
        style={showcaseSection}
        aria-roledescription="carousel"
        aria-label="Hizmetler vitrini — yön tuşları ile gezin"
      >
        <div style={showcaseInner}>
          <nav style={tabRow} role="tablist" aria-label="Hizmet seçici">
            {SERVICES.map((s, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(i)}
                  className="v2-service-tab"
                  style={{
                    ...tab,
                    color: isActive ? CREAM : 'rgba(245,245,240,0.55)',
                    borderColor: isActive ? COPPER : 'transparent',
                  }}
                >
                  <span style={tabNo}>{s.no}</span>
                  <span style={tabTitle}>{s.title}</span>
                </button>
              )
            })}
          </nav>

          <div style={canvasRow}>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Önceki hizmet"
              className="v2-service-nav"
              style={{ ...navBtn, left: 16 }}
            >
              ←
            </button>

            <ServiceShowcase3D
              services={SERVICES}
              activeIdx={activeIdx}
              onPick={setActiveIdx}
              height="64vh"
            />

            <button
              type="button"
              onClick={goNext}
              aria-label="Sonraki hizmet"
              className="v2-service-nav"
              style={{ ...navBtn, right: 16 }}
            >
              →
            </button>
          </div>

          <article
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            style={detailPanel}
            key={active.id}
            className="v2-service-detail"
          >
            <header style={detailHeader}>
              <p style={mono}>
                {active.no} / 06 · {active.title}
              </p>
              <h2 style={detailTitle}>{active.tagline}</h2>
            </header>
            <div style={detailRight}>
              <p style={detailBody}>{active.body}</p>
              <ul style={featList}>
                {active.features.map((f) => (
                  <li key={f} style={featItem}>
                    <span aria-hidden="true" style={featDot} />
                    <span style={featText}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <CTABand />

      <style>{`
        @keyframes v2-service-detail-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-service-detail {
          animation: v2-service-detail-fade 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .v2-service-tab {
          transition: color 220ms ease, border-color 220ms ease;
        }
        .v2-service-tab:hover {
          color: #F5F5F0 !important;
          border-color: rgba(212, 163, 115, 0.4) !important;
        }
        .v2-service-tab:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        .v2-service-nav {
          transition: background 220ms ease, color 220ms ease;
        }
        .v2-service-nav:hover,
        .v2-service-nav:focus-visible {
          background: rgba(212, 163, 115, 0.18);
          color: #F5F5F0;
        }
        .v2-service-nav:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-service-detail { animation: none; opacity: 1; transform: none; }
          .v2-service-tab,
          .v2-service-nav { transition: none !important; }
        }
        @media (max-width: 720px) {
          .v2-service-tab span:last-child { display: none; }
          .v2-service-nav { width: 40px !important; height: 40px !important; font-size: 17px !important; }
          .v2-service-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </PageTransition>
  )
}

const NAVY = '#0A2463'
const COPPER = '#D4A373'
const CREAM = '#F5F5F0'

const heroSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  color: 'var(--v2-ink, #0B0F1A)',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px) clamp(48px, 8vw, 96px)',
}
const heroInner = { maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }
const mono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const hero = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(56px, 9vw, 140px)',
  lineHeight: 0.92,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #0A2463)',
  margin: 0,
  maxWidth: '12ch',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.55,
  opacity: 0.72,
  margin: 0,
  maxWidth: '54ch',
}
const showcaseSection = {
  background: NAVY,
  color: CREAM,
  padding: '96px 32px 128px',
}
const showcaseInner = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
}
const tabRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  borderBottom: '1px solid rgba(212, 163, 115, 0.18)',
}
const tab = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 10,
  padding: '14px 18px',
  background: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  cursor: 'pointer',
  marginBottom: -1,
}
const tabNo = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.14em',
  color: 'var(--v2-copper, #D4A373)',
}
const tabTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 17,
  fontWeight: 500,
}
const canvasRow = { position: 'relative' }
const navBtn = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 3,
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'rgba(245, 245, 240, 0.06)',
  border: '1px solid rgba(212, 163, 115, 0.3)',
  color: 'var(--v2-copper, #D4A373)',
  fontSize: 20,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--v2-font-mono, monospace)',
}
const detailPanel = {
  display: 'grid',
  gridTemplateColumns: '1.1fr 1fr',
  gap: 64,
  alignItems: 'start',
  paddingTop: 32,
  borderTop: '1px solid rgba(212, 163, 115, 0.18)',
}
const detailHeader = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}
const detailTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 4vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: CREAM,
  margin: 0,
  maxWidth: '20ch',
}
const detailRight = { display: 'flex', flexDirection: 'column', gap: 28 }
const detailBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.6,
  color: 'rgba(245, 245, 240, 0.75)',
  margin: 0,
}
const featList = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}
const featItem = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 14,
  paddingBottom: 14,
  borderBottom: '1px solid rgba(245, 245, 240, 0.1)',
}
const featDot = {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: COPPER,
  flexShrink: 0,
  transform: 'translateY(-2px)',
}
const featText = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  color: CREAM,
  lineHeight: 1.5,
}
