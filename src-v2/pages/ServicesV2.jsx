import { useCallback, useEffect, useRef, useState } from 'react'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import CTABand from '../shared/CTABand.jsx'
import ServiceShowcase3D from '../scenes/ServiceShowcase3D.jsx'
import { SERVICES } from '../data/services.js'

export default function ServicesV2() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const active = SERVICES[activeIdx]
  const N = SERVICES.length

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(0.999, scrolled / total))
      const idx = Math.min(N - 1, Math.floor(p * N))
      setActiveIdx(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [N])

  const scrollToIdx = useCallback((i) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    const targetP = (i + 0.5) / N
    const targetY = window.scrollY + rect.top + targetP * total
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }, [N])

  const goPrev = useCallback(() => scrollToIdx(Math.max(0, activeIdx - 1)), [activeIdx, scrollToIdx])
  const goNext = useCallback(() => scrollToIdx(Math.min(N - 1, activeIdx + 1)), [activeIdx, scrollToIdx, N])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <PageTransition>
      <SEOHead
        title="Hizmetler — Konfeksiyon, Nakış, Baskı | Güvencoğlu Tekstil"
        description="Konfeksiyon, nakış, baskı, özel tasarım, toplu üretim ve B2B çözümler."
        path="/hizmetler"
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
          <h1 style={hero}>Ne <em style={emStyle}>yapıyoruz.</em></h1>
          <p style={lede}>Altı hat. Hepsi tek çatı altında — kesimden teslimata, hammaddeden etikete.</p>
        </div>
      </section>

      <section
        ref={sectionRef}
        style={{ position: 'relative', height: `calc(100vh * ${N})`, background: NAVY }}
        aria-roledescription="carousel"
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <nav style={tabRow} role="tablist">
            {SERVICES.map((s, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => scrollToIdx(i)}
                  style={{ ...tab, color: isActive ? CREAM : 'rgba(245,245,240,0.55)', borderColor: isActive ? COPPER : 'transparent' }}
                >
                  <span style={tabNo}>{s.no}</span>
                  <span style={tabTitle}>{s.title}</span>
                </button>
              )
            })}
          </nav>

          <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
            <button type="button" onClick={goPrev} aria-label="Önceki" style={{ ...navBtn, left: 16 }}>←</button>
            <ServiceShowcase3D services={SERVICES} activeIdx={activeIdx} onPick={scrollToIdx} height="100%" />
            <button type="button" onClick={goNext} aria-label="Sonraki" style={{ ...navBtn, right: 16 }}>→</button>
          </div>

          <article key={active.id} style={detailPanel}>
            <header style={detailHeader}>
              <p style={mono}>{active.no} / 0{N} · {active.title}</p>
              <h2 style={detailTitle}>{active.tagline}</h2>
            </header>
            <div style={detailRight}>
              <p style={detailBody}>{active.body}</p>
              <ul style={featList}>
                {active.features.slice(0, 3).map((f) => (
                  <li key={f} style={featItem}>
                    <span style={featDot} />
                    <span style={featText}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <CTABand />
    </PageTransition>
  )
}

const NAVY = '#2D3142'
const COPPER = '#D4A373'
const CREAM = '#EFEAE0'

const heroSection = { background: 'var(--v2-cream, #EFEAE0)', color: 'var(--v2-ink, #1A1A1A)', padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px) clamp(48px, 8vw, 96px)' }
const heroInner = { maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }
const mono = { fontFamily: 'var(--v2-font-mono, monospace)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--v2-copper, #D4A373)', margin: 0 }
const hero = { fontFamily: 'var(--v2-font-display, serif)', fontWeight: 400, fontSize: 'clamp(56px, 9vw, 140px)', lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--v2-navy, #2D3142)', margin: 0, maxWidth: '12ch' }
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const lede = { fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 18, lineHeight: 1.55, opacity: 0.72, margin: 0, maxWidth: '54ch' }
const tabRow = { display: 'flex', flexWrap: 'wrap', gap: 4, padding: '20px 32px 0', borderBottom: '1px solid rgba(212, 163, 115, 0.18)' }
const tab = { display: 'flex', alignItems: 'baseline', gap: 10, padding: '14px 18px', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 15, cursor: 'pointer', marginBottom: -1 }
const tabNo = { fontFamily: 'var(--v2-font-mono, monospace)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--v2-copper, #D4A373)' }
const tabTitle = { fontFamily: 'var(--v2-font-display, serif)', fontSize: 17, fontWeight: 500 }
const navBtn = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 48, height: 48, borderRadius: '50%', background: 'rgba(245, 245, 240, 0.06)', border: '1px solid rgba(212, 163, 115, 0.3)', color: 'var(--v2-copper, #D4A373)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--v2-font-mono, monospace)' }
const detailPanel = { display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start', padding: '20px 32px 32px', borderTop: '1px solid rgba(212, 163, 115, 0.18)' }
const detailHeader = { display: 'flex', flexDirection: 'column', gap: 12 }
const detailTitle = { fontFamily: 'var(--v2-font-display, serif)', fontWeight: 400, fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: CREAM, margin: 0, maxWidth: '20ch' }
const detailRight = { display: 'flex', flexDirection: 'column', gap: 16 }
const detailBody = { fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 15, lineHeight: 1.55, color: 'rgba(245, 245, 240, 0.75)', margin: 0 }
const featList = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }
const featItem = { display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 8, borderBottom: '1px solid rgba(245, 245, 240, 0.1)' }
const featDot = { width: 6, height: 6, borderRadius: 999, background: COPPER, flexShrink: 0, transform: 'translateY(-2px)' }
const featText = { fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 14, color: CREAM, lineHeight: 1.5 }
