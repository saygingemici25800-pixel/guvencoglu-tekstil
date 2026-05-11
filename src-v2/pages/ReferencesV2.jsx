import { memo, useEffect, useMemo, useRef, useState } from 'react'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import CTABand from '../shared/CTABand.jsx'
import { CLIENTS, CLIENT_SECTORS, REF_METRICS, TESTIMONIAL } from '../data/clients.js'

const SECTOR_LABEL = Object.fromEntries(CLIENT_SECTORS.map((s) => [s.id, s.label]))
const SECTORS_WITH_ALL = [{ id: 'all', label: 'Tümü', count: CLIENTS.length }, ...CLIENT_SECTORS]

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function useCountUp(target, isActive, duration = 1500) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!isActive) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(target * easeOutCubic(p)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, isActive, duration])
  return val
}

function Metric({ value, suffix, label, hint, isActive, index }) {
  const current = useCountUp(value, isActive)
  return (
    <article
      className="v2-ref-metric"
      style={{ ...metric, animationDelay: `${index * 110}ms` }}
    >
      <p style={metricValue}>
        <span style={metricNumber}>{current.toLocaleString('tr-TR')}</span>
        <span style={metricSuffix}>{suffix}</span>
      </p>
      <h3 style={metricLabel}>{label}</h3>
      <p style={metricHint}>{hint}</p>
    </article>
  )
}

const ClientCard = memo(function ClientCard({ client, index }) {
  return (
    <article
      className="v2-client-card"
      style={{ ...card, animationDelay: `${index * 50}ms` }}
      aria-label={`${client.name} — ${SECTOR_LABEL[client.sector] || ''} sektöründen referansımız`}
      tabIndex={0}
    >
      <div className="v2-client-inner" style={cardInner}>
        <div style={cardFront}>
          <div style={cardLogo} aria-hidden="true">{client.initials}</div>
          <p style={cardName}>{client.name}</p>
          <p style={cardSector}>{SECTOR_LABEL[client.sector] || client.sector}</p>
        </div>
        <div style={cardBack}>
          <p style={cardBackMono}>{client.since} →</p>
          <p style={cardBackNote}>{client.note}</p>
          <p style={cardBackSector}>{SECTOR_LABEL[client.sector] || client.sector}</p>
        </div>
      </div>
    </article>
  )
})

export default function ReferencesV2() {
  const [filter, setFilter] = useState('all')
  const metricsRef = useRef(null)
  const [metricsActive, setMetricsActive] = useState(false)

  useEffect(() => {
    const node = metricsRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const filteredClients = useMemo(
    () => (filter === 'all' ? CLIENTS : CLIENTS.filter((c) => c.sector === filter)),
    [filter],
  )

  return (
    <PageTransition>
      <SEOHead
        title="Referanslar — Birlikte Çalıştıklarımız | Güvencoğlu Tekstil"
        description="480+ kurumsal müşteri, %99 yenileme oranı. Okul, otel, sağlık, belediye ve B2B müşterilerimizden seçmeler."
        path="/v2/referanslar"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvencoğlu Tekstil',
          award: '480+ kurumsal müşteri · %99 yenileme oranı',
          knowsAbout: CLIENT_SECTORS.map((s) => s.label),
        }}
      />

      <section style={heroSection}>
        <div style={heroInner}>
          <p style={mono}>05 / Referanslar</p>
          <h1 style={hero}>
            Birlikte <em style={emStyle}>çalıştıklarımız.</em>
          </h1>
          <p style={lede}>
            Bir kez başlayan ilişki, ortalama altı yıl sürüyor. 480'den fazla
            kurumsal müşteri — okuldan otele, hastaneden belediyeye.
          </p>
        </div>
      </section>

      <section ref={metricsRef} style={metricsSection}>
        <div style={metricsGrid} className="v2-ref-metrics-grid">
          {REF_METRICS.map((m, i) => (
            <Metric key={m.label} index={i} isActive={metricsActive} {...m} />
          ))}
        </div>
      </section>

      <section style={gridSection} aria-label="Müşteri logosu duvarı">
        <div style={gridInner}>
          <header style={gridHeader}>
            <p style={mono}>SEKTÖR FİLTRESİ</p>
            <h2 style={h2}>
              Hangi <em style={emStyle}>sektörden</em>?
            </h2>
          </header>

          <nav style={filterRow} role="tablist" aria-label="Sektör filtresi">
            {SECTORS_WITH_ALL.map((s) => {
              const isActive = filter === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(s.id)}
                  className="v2-ref-filter"
                  style={{
                    ...filterPill,
                    background: isActive ? NAVY : 'transparent',
                    color: isActive ? CREAM : NAVY,
                    borderColor: isActive ? NAVY : 'rgba(10, 36, 99, 0.2)',
                  }}
                >
                  {s.label}
                  <span style={{ ...filterCount, color: isActive ? COPPER : 'var(--v2-mist, #8A8F9E)' }}>
                    {s.count}
                  </span>
                </button>
              )
            })}
          </nav>

          <ul style={clientGrid} className="v2-client-grid">
            {filteredClients.map((c, i) => (
              <li key={c.id} style={cardWrap}>
                <ClientCard client={c} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={testimonialSection} aria-label="Müşteri sözü">
        <div style={testimonialInner}>
          <p style={testimonialTag}>06 / Söz</p>
          <blockquote style={testimonialQuote}>
            <span aria-hidden="true" style={openMark}>“</span>
            <p style={quoteBody}>{TESTIMONIAL.quote}</p>
          </blockquote>
          <footer style={testimonialFooter}>
            <span style={hairline} aria-hidden="true" />
            <div>
              <p style={attrName}>{TESTIMONIAL.author}</p>
              <p style={attrRole}>{TESTIMONIAL.attribution}</p>
            </div>
          </footer>
        </div>
      </section>

      <CTABand />

      <style>{`
        @keyframes v2-ref-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-ref-metric,
        .v2-client-card {
          animation: v2-ref-rise 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .v2-client-card {
          perspective: 800px;
          outline: none;
        }
        .v2-client-card:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
          border-radius: 6px;
        }
        .v2-client-inner {
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .v2-client-card:hover .v2-client-inner,
        .v2-client-card:focus-visible .v2-client-inner {
          transform: rotateY(180deg);
        }
        .v2-ref-filter {
          transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
        }
        .v2-ref-filter:hover {
          background: rgba(10, 36, 99, 0.06) !important;
          border-color: rgba(10, 36, 99, 0.45) !important;
        }
        .v2-ref-filter:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-ref-metric,
          .v2-client-card { animation: none; opacity: 1; transform: none; }
          .v2-client-inner { transition: none; }
          .v2-client-card:hover .v2-client-inner,
          .v2-client-card:focus-visible .v2-client-inner { transform: none; }
          .v2-ref-filter { transition: none !important; }
        }
        @media (max-width: 960px) {
          .v2-ref-metrics-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .v2-client-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .v2-client-grid { grid-template-columns: 1fr !important; }
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
  padding: '160px 32px 96px',
}
const heroInner = { maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }
const mono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: COPPER,
  margin: 0,
}
const hero = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(56px, 9vw, 140px)',
  lineHeight: 0.92,
  letterSpacing: '-0.025em',
  color: NAVY,
  margin: 0,
  maxWidth: '12ch',
}
const emStyle = { fontStyle: 'italic', color: COPPER }
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.55,
  opacity: 0.72,
  margin: 0,
  maxWidth: '54ch',
}

const metricsSection = {
  background: NAVY,
  color: CREAM,
  padding: '64px 32px',
  borderTop: '1px solid rgba(212, 163, 115, 0.25)',
  borderBottom: '1px solid rgba(212, 163, 115, 0.25)',
}
const metricsGrid = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 0,
}
const metric = {
  padding: '24px 32px 24px 0',
  borderRight: '1px solid rgba(212, 163, 115, 0.18)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  opacity: 0,
}
const metricValue = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  margin: 0,
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  color: CREAM,
  letterSpacing: '-0.03em',
  lineHeight: 1,
}
const metricNumber = { fontSize: 'clamp(48px, 5vw, 76px)', fontVariantNumeric: 'tabular-nums' }
const metricSuffix = {
  fontSize: 'clamp(18px, 2vw, 26px)',
  color: COPPER,
  fontFamily: 'var(--v2-font-mono, monospace)',
}
const metricLabel = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  fontWeight: 500,
  color: CREAM,
  margin: 0,
}
const metricHint = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  color: 'rgba(245, 245, 240, 0.6)',
  margin: 0,
}

const gridSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  padding: '128px 32px',
}
const gridInner = { maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }
const gridHeader = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '60ch' }
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  color: NAVY,
  margin: 0,
  letterSpacing: '-0.02em',
}
const filterRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
}
const filterPill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 18px',
  border: '1px solid',
  borderRadius: 999,
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
}
const filterCount = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.1em',
}
const clientGrid = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
}
const cardWrap = { aspectRatio: '4 / 3' }
const card = {
  width: '100%',
  height: '100%',
  position: 'relative',
  opacity: 0,
  cursor: 'pointer',
}
const cardInner = {
  position: 'relative',
  width: '100%',
  height: '100%',
}
const cardFace = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: '24px 20px',
  borderRadius: 6,
  textAlign: 'center',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
}
const cardFront = {
  ...cardFace,
  background: '#FFFFFF',
  border: '1px solid rgba(10, 36, 99, 0.1)',
}
const cardBack = {
  ...cardFace,
  background: NAVY,
  color: CREAM,
  transform: 'rotateY(180deg)',
  border: '1px solid rgba(212, 163, 115, 0.3)',
}
const cardLogo = {
  width: 56,
  height: 56,
  borderRadius: 8,
  background: 'linear-gradient(135deg, #0A2463 0%, #1a3578 100%)',
  color: COPPER,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: '-0.02em',
}
const cardName = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 17,
  fontWeight: 500,
  color: NAVY,
  margin: 0,
  lineHeight: 1.2,
}
const cardSector = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--v2-mist, #8A8F9E)',
  margin: 0,
}
const cardBackMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  color: COPPER,
  margin: 0,
  textTransform: 'uppercase',
}
const cardBackNote = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  color: CREAM,
  lineHeight: 1.45,
  margin: 0,
  maxWidth: '24ch',
}
const cardBackSector = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(245, 245, 240, 0.5)',
  margin: 0,
}

const testimonialSection = {
  background: NAVY,
  color: CREAM,
  padding: '160px 32px',
  position: 'relative',
  overflow: 'hidden',
}
const testimonialInner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
  position: 'relative',
}
const testimonialTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: COPPER,
  margin: 0,
}
const testimonialQuote = { position: 'relative', margin: 0, padding: 0 }
const openMark = {
  position: 'absolute',
  top: -50,
  left: -20,
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(140px, 18vw, 220px)',
  lineHeight: 1,
  color: COPPER,
  opacity: 0.22,
  fontStyle: 'italic',
  pointerEvents: 'none',
  userSelect: 'none',
}
const quoteBody = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 'clamp(28px, 4.2vw, 56px)',
  lineHeight: 1.2,
  letterSpacing: '-0.015em',
  color: CREAM,
  margin: 0,
  maxWidth: '24ch',
  position: 'relative',
}
const testimonialFooter = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  paddingTop: 32,
  borderTop: '1px solid rgba(212, 163, 115, 0.25)',
}
const hairline = { width: 64, height: 1, background: COPPER, flexShrink: 0 }
const attrName = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 16,
  margin: 0,
}
const attrRole = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: COPPER,
  margin: 0,
}
