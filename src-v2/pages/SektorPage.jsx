import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { SEKTORLER, SEKTOR_LIST } from '../data/sektorler.js'
import { clientsBySector } from '../data/clients.js'

const ORIGIN = 'https://guvencoglutekstil.com'

// "Çalıştığımız Kurumlar" dikey marquee'si AÇIK — gerçek firma isimleriyle
// (clients.js). Logo henüz yok → isim kutusu placeholder (logo gelince <img>).
// İlgili sektörün listesi boşsa (ör. okul) marquee o sayfada gizlenir.
const SHOW_MARQUEE = true

/* ──────────────────────────────────────────────────────────────
   SektorPage — /ne-yapiyoruz/<slug> (4 statik alt sayfa).
   Placeholder iskelet: başlık + lede, alt başlıklar (İngilizce terim +
   TR açıklama + foto SLOTU), sticky sektör seçici, DİKEY sticky marquee.
   Gerçek fotolar yok → .sp-photo kutusu <img> almaya hazır (sabit oran).
   ────────────────────────────────────────────────────────────── */

/* Editorial eyebrow — kırmızı kısa çizgi + uppercase etiket */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

/* Sticky sektör seçici — 4 sektör arası gezinme; aktif kırmızı */
function SectorSwitcher({ active }) {
  return (
    <nav className="sp-switch" style={switchWrap} aria-label="Sektör seçici">
      <ul style={switchInner}>
        {SEKTOR_LIST.map((s) => {
          const isActive = s.slug === active
          return (
            <li key={s.slug} style={{ listStyle: 'none' }}>
              <Link
                to={`/ne-yapiyoruz/${s.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className="sp-switch-link"
                style={isActive ? switchLinkActive : switchLink}
              >
                {s.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Dikey sticky marquee — "Çalıştığımız Kurumlar".
   Saf CSS @keyframes translateY + IntersectionObserver: görünürken çalışır
   (is-running), değilken durur (animation-play-state: paused) → off-screen'de
   CPU/GPU yakmaz. İçerik 2× kopyalanır (kesintisiz döngü); 2. kopya aria-hidden.
   Hover'da duraklar, prefers-reduced-motion: statik, mobilde gizli (CSS). */
function VerticalMarquee({ clients }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => node.classList.toggle('is-running', entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // Az isim varsa grup viewport'u doldursun diye tekrarla → kesintisiz dikey döngü.
  const list = clients.length >= 6
    ? clients
    : Array.from({ length: Math.ceil(6 / clients.length) }, () => clients).flat()

  const group = (hidden) => (
    <ul className="spm-group" aria-hidden={hidden || undefined}>
      {list.map((name, i) => (
        <li key={i} className="spm-box" style={spmBox}>
          {/* Logo gelince: <img src={...} alt={name} style={spmImg} /> */}
          <span style={spmText}>{name}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <aside className="sp-aside" style={asideWrap} aria-label="Çalıştığımız kurumlar">
      <p style={asideHead}>Çalıştığımız Kurumlar</p>
      <div ref={ref} className="spm-viewport">
        <div className="spm-track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </aside>
  )
}

export default function SektorPage({ slug }) {
  const data = SEKTORLER[slug]
  const clients = clientsBySector(slug) // o sektörün GERÇEK kurum adları
  const showMarquee = SHOW_MARQUEE && clients.length > 0 // liste boşsa (okul) gizle

  return (
    <PageTransition>
      <SEOHead
        title={data.seoTitle}
        description={data.seoDesc}
        path={`/ne-yapiyoruz/${slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.title,
          description: data.seoDesc,
          areaServed: 'TR',
          provider: { '@type': 'Organization', name: 'Güvençoğlu Tekstil' },
          url: `${ORIGIN}/ne-yapiyoruz/${slug}`,
        }}
      />

      <SectorSwitcher active={slug} />

      <section style={heroWrap} aria-labelledby="sp-title">
        <Reveal style={heroInner}>
          <Eyebrow>NE YAPIYORUZ</Eyebrow>
          <h1 id="sp-title" style={h1}>{data.title}</h1>
          <p style={lede}>{data.lede}</p>
        </Reveal>
      </section>

      <section style={bodyWrap} aria-label={`${data.label} alt başlıkları`}>
        <div className="sp-grid" style={{ ...bodyGrid, ...(showMarquee ? null : { gridTemplateColumns: '1fr' }) }}>
          <div style={mainCol}>
            {data.sections.map((sec, i) => (
              <Reveal
                as="article"
                key={sec.term}
                className="sp-sec"
                style={secCard}
                delay={Math.min(i * 60, 240)}
              >
                <div className="sp-photo" style={spPhoto} role="img" aria-label={`Görsel yakında: ${sec.term}`}>
                  {/* Gerçek foto sonra: <img src={...} alt={sec.term} style={spPhotoImg} /> */}
                  <span style={spPhotoTag}>foto: {sec.photo}</span>
                </div>
                <div style={secText}>
                  <h2 style={secTerm}>{sec.term}</h2>
                  <p style={secDesc}>{sec.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {showMarquee && <VerticalMarquee clients={clients} />}
        </div>
      </section>

      <style>{`
        /* ── 2 kolon: içerik + sağda dikey sticky marquee ── */
        .sp-grid { display: grid; grid-template-columns: minmax(0, 1fr) clamp(220px, 22vw, 300px); gap: clamp(32px, 4vw, 64px); align-items: start; }

        /* ── alt başlık satırı: foto slotu + metin ── */
        .sp-photo { position: relative; overflow: hidden; }
        .sp-photo::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 0 1px rgba(45,49,66,0.08); border-radius: inherit; pointer-events: none; }

        /* ── sticky sektör seçici ── */
        .sp-switch-link { transition: color 200ms ease, background 200ms ease, border-color 200ms ease; }
        .sp-switch-link:hover, .sp-switch-link:focus-visible { color: var(--v2-copper, #9A0002); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 4px; border-radius: 2px; }

        /* ── dikey marquee ── */
        .sp-aside { position: sticky; top: clamp(132px, 17vh, 168px); align-self: start; }
        .spm-viewport {
          position: relative;
          height: clamp(420px, 62vh, 660px);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent);
        }
        .spm-track {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation: spm-scroll 26s linear infinite;
          animation-play-state: paused; /* IO görünür yapınca 'is-running' ile başlar */
        }
        .spm-viewport.is-running .spm-track { animation-play-state: running; }
        .spm-viewport.is-running:hover .spm-track { animation-play-state: paused; }
        .spm-group { display: flex; flex-direction: column; gap: 14px; padding: 0 0 14px; margin: 0; list-style: none; }
        @keyframes spm-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }

        @media (max-width: 900px) {
          .sp-grid { grid-template-columns: 1fr; }
          /* dikey sticky kenar şerit mobilde çalışmaz → gizle (okunabilirlik öncelik) */
          .sp-aside { display: none; }
          .sp-sec { flex-direction: column !important; align-items: stretch !important; }
          .sp-photo { flex: none !important; width: 100% !important; aspect-ratio: 16 / 10 !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .spm-viewport .spm-track { animation: none !important; transform: none !important; }
          .spm-viewport { overflow-y: auto; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet: krem #EFEAE0, navy #2D3142, kırmızı #9A0002, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */
const CREAM = 'var(--v2-cream, #EFEAE0)'

const eyebrowRow = { display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 18px' }
const eyebrowDash = { width: 34, height: 1, background: 'var(--v2-copper, #9A0002)', flexShrink: 0 }
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
}

/* sticky switcher */
const switchWrap = {
  position: 'sticky',
  top: 'clamp(72px, 9vh, 92px)',
  zIndex: 30,
  background: 'rgba(239, 234, 224, 0.92)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(45, 49, 66, 0.1)',
}
const switchInner = {
  maxWidth: 1180,
  margin: '0 auto',
  padding: '12px clamp(24px, 6vw, 96px)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'clamp(6px, 1.4vw, 16px)',
  justifyContent: 'center',
  listStyle: 'none',
}
const switchLink = {
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: 999,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const switchLinkActive = {
  ...switchLink,
  color: 'var(--v2-cream, #EFEAE0)',
  background: 'var(--v2-copper, #9A0002)',
  fontWeight: 600,
}

/* hero / header */
const heroWrap = {
  background: CREAM,
  padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 96px) clamp(24px, 4vw, 48px)',
}
const heroInner = { maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 76px)',
  lineHeight: 1.04,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 18px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '54ch',
}

/* body grid */
const bodyWrap = { background: CREAM, padding: '0 clamp(24px, 6vw, 96px) clamp(64px, 10vw, 128px)' }
const bodyGrid = { maxWidth: 1180, margin: '0 auto' }
const mainCol = { display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 52px)', minWidth: 0 }

/* alt başlık satırı (foto slotu + metin) */
const secCard = { display: 'flex', gap: 'clamp(20px, 2.6vw, 40px)', alignItems: 'center' }
const spPhoto = {
  flex: '0 0 clamp(180px, 34%, 340px)',
  aspectRatio: '4 / 3',
  borderRadius: 12,
  background: 'rgba(45, 49, 66, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  boxSizing: 'border-box',
}
const spPhotoTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.04em',
  color: 'var(--v2-muted, #5A5A5A)',
  textAlign: 'center',
}
const secText = { minWidth: 0 }
const secTerm = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(22px, 2.4vw, 30px)',
  lineHeight: 1.12,
  letterSpacing: '-0.01em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 8px',
}
const secDesc = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
  maxWidth: '46ch',
}

/* dikey marquee aside */
const asideWrap = { display: 'flex', flexDirection: 'column', gap: 16 }
const asideHead = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
  margin: 0,
}
const spmBox = {
  flex: '0 0 auto',
  width: '100%',
  aspectRatio: '16 / 7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 14px',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.1)',
  borderRadius: 12,
  boxShadow: '0 1px 2px rgba(45, 49, 66, 0.04)',
  boxSizing: 'border-box',
}
const spmText = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.08em',
  color: 'var(--v2-muted, #5A5A5A)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
}
