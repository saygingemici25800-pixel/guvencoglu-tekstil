import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

/* SSR'da useEffect (no-op), client'ta useLayoutEffect (paint öncesi gizler). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const cols = [
  {
    title: 'Yolculuk',
    items: [
      { label: 'Hikayemiz', to: '/biz-ve-is-ortaklarimiz' },
      { label: 'Üretim Süreci', to: '/ne-yapiyoruz' },
      { label: 'Ne Yapıyoruz', to: '/ne-yapiyoruz' },
    ],
  },
  {
    title: 'Kurum',
    items: [
      { label: 'Referanslar', to: '/biz-ve-is-ortaklarimiz' },
      { label: 'İletişim', to: '/iletisim' },
    ],
  },
]

/* Marka wordmark — harf harf stagger reveal (viewport'a girince).
   SSG/no-JS güvenli: idle durumda harfler GÖRÜNÜR (opacity 1). JS yüklenince
   layout-effect ile gizler, footer viewport'a girince sırayla açar (bir kez).
   prefers-reduced-motion → hiç gizlemez, statik kalır. aria-label tam kelimeyi
   okutur; harfler aria-hidden. */
function LetterReveal({ text, style }) {
  const ref = useRef(null)
  const [state, setState] = useState('idle') // idle=görünür · hidden=gizli · shown=açıldı

  useIsoLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return // hareket yok → görünür kal
    }
    setState('hidden')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const letters = [...text]
  return (
    <span ref={ref} aria-label={text} style={{ display: 'inline-flex', flexWrap: 'nowrap', ...style }}>
      {letters.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            willChange: 'transform, opacity',
            opacity: state === 'hidden' ? 0 : 1,
            transform: state === 'hidden' ? 'translateY(0.5em)' : 'none',
            transition: state === 'idle' ? undefined : `opacity 620ms ${EASE} ${i * 40}ms, transform 620ms ${EASE} ${i * 40}ms`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function FooterV2() {
  return (
    <footer
      style={{
        background: 'var(--v2-navy)',
        color: 'var(--v2-cream)',
        // Footer koyu kalır → kırmızı vurgu (global --v2-copper) navy üstünde okunmaz;
        // bu yüzden footer içinde vurgu = krem (em + başlıklar kreme döner).
        '--v2-copper': '#EFEAE0',
        padding: '96px 32px 48px',
        marginTop: 128,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--v2-content-max)', margin: '0 auto' }}>
        {/* Marka vurgusu — büyük wordmark, harf harf reveal */}
        <LetterReveal text="GÜVENÇOĞLU" style={brandMark} />
        <div style={brandRule} aria-hidden="true" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          <Reveal style={{ minWidth: 0 }} delay={0}>
            <p style={{ fontFamily: 'var(--v2-font-display)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, maxWidth: '24ch', margin: 0 }}>
              İpliği <em style={{ color: 'var(--v2-copper)' }}>hikayeye</em> dönüştürüyoruz.
            </p>
          </Reveal>

          {cols.map((c, i) => (
            <Reveal key={c.title} style={{ minWidth: 0 }} delay={90 + i * 90}>
              <h3 className="mono" style={colHead}>{c.title}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.items.map((it) => (
                  <li key={`${it.label}-${it.to}`}>
                    <Link to={it.to} className="ft-link">{it.label}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal style={{ minWidth: 0 }} delay={270}>
            <h3 className="mono" style={colHead}>İletişim</h3>
            <address style={{ fontStyle: 'normal', fontSize: 15, opacity: 0.85, lineHeight: 1.7 }}>
              Fethiye, Muğla<br />
              Türkiye
            </address>
          </Reveal>
        </div>

        <Reveal
          delay={340}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(245, 245, 240, 0.12)',
            fontSize: 13,
            opacity: 0.6,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="mono">© 2001–{new Date().getFullYear()} Güvençoğlu Tekstil</span>
          <span className="mono">v2.0</span>
        </Reveal>
      </div>

      <style>{`
        /* Footer link — hover'da krem + ince "dikiş" alt çizgisi (soldan çizilir,
           form focus efektiyle tutarlı). */
        .ft-link {
          position: relative;
          display: inline-block;
          color: var(--v2-cream, #EFEAE0);
          text-decoration: none;
          font-size: 15px;
          opacity: 0.82;
          transition: opacity 220ms ease;
        }
        .ft-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          border-bottom: 1px dashed currentColor; /* dikiş */
          transform: scaleX(0);
          transform-origin: left;
          opacity: 0.75;
          transition: transform 320ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .ft-link:hover, .ft-link:focus-visible { opacity: 1; }
        .ft-link:hover::after, .ft-link:focus-visible::after { transform: scaleX(1); }

        @media (prefers-reduced-motion: reduce) {
          .ft-link, .ft-link::after { transition: none !important; }
          .ft-link::after { transform: scaleX(0); } /* statik: dikiş gizli kalır */
        }
      `}</style>
    </footer>
  )
}

/* ── styles ── */
const brandMark = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 600,
  fontSize: 'clamp(34px, 9vw, 96px)',
  lineHeight: 1,
  letterSpacing: '-0.02em',
  color: 'var(--v2-cream, #EFEAE0)',
  maxWidth: '100%',
}
const brandRule = {
  height: 1,
  background: 'rgba(245, 245, 240, 0.16)',
  margin: '28px 0 56px',
}
const colHead = {
  fontFamily: 'var(--v2-font-mono)',
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper)',
  margin: '0 0 16px',
}
