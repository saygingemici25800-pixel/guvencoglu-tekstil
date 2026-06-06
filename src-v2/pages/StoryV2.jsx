import { useEffect, useRef, useState } from 'react'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import CTABand from '../shared/CTABand.jsx'

const STORY_METRICS = [
  { value: 25, suffix: '',  label: 'Yıllık Zanaat',   hint: '2001 → bugün, kesintisiz' },
  { value: 100, suffix: '%', label: 'Kendi Üretim',   hint: 'Aracısız · kendi tesisimizde' },
  { value: 480, suffix: '+', label: 'Kurumsal Partner', hint: 'Okul · otel · sağlık · kamu' },
]

const PRINCIPLES = [
  {
    no: '01',
    title: 'El işçiliği',
    body: 'Otomasyon arttı, el azalmadı. Kritik dikişler, son kontrol, etiket hâlâ insan elinden geçer.',
  },
  {
    no: '02',
    title: 'Kalite kontrolü',
    body: 'Üç farklı istasyon: kesim sonrası, dikim sonrası, paketleme öncesi. Hiçbir ürün tek bakışla geçmez.',
  },
  {
    no: '03',
    title: 'Süreklilik',
    body: 'Aynı kumaş tedarikçisi 22 yıldır. Aynı boya tonu 15 yıldır eşleşiyor. Tutarlılık tesadüf değil.',
  },
  {
    no: '04',
    title: 'Aile',
    body: 'Karar mutfakta verilir, tezgâhta uygulanır. Aynı aile, aynı ad, aynı söz — bu da bir taahhüt.',
  },
]

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
      className="v2-story-metric"
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

export default function StoryV2() {
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

  return (
    <PageTransition>
      <SEOHead
        title="Hikayemiz — 2001'den Bu Yana, Tek İplik | Güvencoğlu Tekstil"
        description="2001'de Fethiye'de küçük bir atölyede başlayan yolculuk. Çeyrek asırlık zanaat hikayesi."
        path="/v2/hikayemiz"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvencoğlu Tekstil',
          foundingDate: '2001',
          founder: { '@type': 'Person', name: 'Ömer Güvenç' },
          url: 'https://guvencoglutekstil.com/v2/hikayemiz',
        }}
      />

      <section style={heroSection}>
        <div style={heroInner}>
          <p style={mono}>02 / Hikayemiz</p>
          <h1 style={hero}>
            Tek atölye,
            <br />
            tek <em style={emStyle}>iplik.</em>
          </h1>
          <p style={lede}>
            2001'de Fethiye'de tek bir dikiş makinesiyle başladık. Bugün aynı
            atölyede, aynı titizlikle çalışıyoruz. Aşağı kaydır —
            kronolojik tünelin içinden geç.
          </p>
          <div style={scrollHint} aria-hidden="true">
            ↓ KAYDIR · KRONOLOJİK TÜNEL
          </div>
        </div>
      </section>

      <section ref={metricsRef} style={metricsSection} aria-label="Hikaye metrikleri">
        <div style={metricsGrid} className="v2-story-metrics-grid">
          {STORY_METRICS.map((m, i) => (
            <Metric key={m.label} index={i} isActive={metricsActive} {...m} />
          ))}
        </div>
      </section>

      <section
        aria-label="Zaman çizelgesi"
        style={{
          background: 'var(--v2-navy, #2D3142)',
          padding: 'clamp(64px, 10vh, 120px) clamp(24px, 5vw, 48px)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--v2-font-display, serif)',
            fontWeight: 400,
            fontSize: 'clamp(30px, 5vw, 56px)',
            letterSpacing: '-0.02em',
            color: 'var(--v2-cream, #EFEAE0)',
            margin: 0,
          }}
        >
          2001’den bugüne
        </h2>
        <p
          style={{
            fontFamily: 'var(--v2-font-mono, monospace)',
            fontSize: 12,
            letterSpacing: '0.22em',
            color: 'var(--v2-copper, #D4A373)',
            marginTop: 14,
          }}
        >
          ZAMAN ÇİZELGESİ
        </p>
      </section>

      <section style={principlesSection} aria-label="Sabit kalan ilkeler">
        <div style={principlesInner}>
          <header style={principlesHeader}>
            <p style={mono}>03 / Sabit kalanlar</p>
            <h2 style={h2}>
              Çeyrek asırdır <em style={emStyle}>değişmeyen</em>
              <br />
              dört şey.
            </h2>
            <p style={ledeNarrow}>
              Çeyrek asır boyunca makine değişti, kumaş değişti, müşteri değişti.
              Bu dördü değişmedi.
            </p>
          </header>

          <ul style={principlesGrid} className="v2-story-principles-grid">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.no}
                style={{ ...principleCard, animationDelay: `${i * 90}ms` }}
                className="v2-story-principle"
              >
                <span style={principleNo}>{p.no}</span>
                <h3 style={principleTitle}>{p.title}</h3>
                <p style={principleBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={quoteSection} aria-label="Kurucu sözü">
        <div style={quoteInner}>
          <p style={quoteTag}>04 / Söz</p>
          <blockquote style={quoteBlock}>
            <span aria-hidden="true" style={openMark}>“</span>
            <p style={quoteText}>
              Bir formanın iyiliği, ilk dikişten son düğmeye kadar
              <em style={emStyle}> bizim elimizden </em>
              geçtiği için belli olur.
            </p>
          </blockquote>
          <footer style={quoteFooter}>
            <span style={hairline} aria-hidden="true" />
            <div style={attrBlock}>
              <p style={attrName}>Ömer Güvenç</p>
              <p style={attrRole}>Kurucu · Fethiye, 2001'den beri</p>
            </div>
          </footer>
        </div>
      </section>

      <CTABand />

      <style>{`
        @keyframes v2-story-rise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-story-metric,
        .v2-story-principle {
          animation: v2-story-rise 660ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-story-metric,
          .v2-story-principle { animation: none; opacity: 1; transform: none; }
        }
        @media (max-width: 960px) {
          .v2-story-metrics-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .v2-story-principles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .v2-story-principles-grid { grid-template-columns: 1fr !important; }
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
  color: COPPER,
  margin: 0,
}
const hero = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(64px, 11vw, 180px)',
  lineHeight: 0.9,
  letterSpacing: '-0.03em',
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
  maxWidth: '52ch',
}
const scrollHint = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.22em',
  color: 'var(--v2-mist, #8A8F9E)',
  marginTop: 40,
  textTransform: 'uppercase',
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

const principlesSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  padding: 'clamp(64px, 10vw, 128px) clamp(20px, 5vw, 32px)',
}
const principlesInner = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 72,
}
const principlesHeader = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '60ch' }
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  color: NAVY,
  margin: 0,
  letterSpacing: '-0.02em',
}
const ledeNarrow = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.6,
  opacity: 0.7,
  margin: '8px 0 0',
  maxWidth: '50ch',
}
const principlesGrid = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 0,
  borderTop: '1px solid rgba(10, 36, 99, 0.15)',
}
const principleCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '40px 28px 40px 0',
  borderRight: '1px solid rgba(10, 36, 99, 0.1)',
  opacity: 0,
}
const principleNo = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  color: COPPER,
}
const principleTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 2.6vw, 34px)',
  lineHeight: 1.1,
  color: NAVY,
  margin: 0,
  letterSpacing: '-0.015em',
}
const principleBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.7,
  margin: 0,
}

const quoteSection = {
  background: NAVY,
  color: CREAM,
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px)',
  position: 'relative',
  overflow: 'hidden',
}
const quoteInner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
  position: 'relative',
}
const quoteTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: COPPER,
  margin: 0,
}
const quoteBlock = { position: 'relative', margin: 0, padding: 0 }
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
const quoteText = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 4.2vw, 56px)',
  lineHeight: 1.2,
  letterSpacing: '-0.015em',
  color: CREAM,
  margin: 0,
  maxWidth: '24ch',
  position: 'relative',
}
const quoteFooter = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  paddingTop: 32,
  borderTop: '1px solid rgba(212, 163, 115, 0.25)',
}
const hairline = { width: 64, height: 1, background: COPPER, flexShrink: 0 }
const attrBlock = { display: 'flex', flexDirection: 'column', gap: 4 }
const attrName = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 17,
  color: CREAM,
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
