import { useState, useEffect } from 'react'

/* ──────────────────────────────────────────────────────────────
   Açılış preloader'ı — siteye İLK girişte (hangi route olursa) oturum başına 1 kez.
   logo-tekstil.png soldan maskeyle (clip-path) açılır → çift (iki kademeli) zoom →
   fade-out → site görünür. Toplam < 2 sn.

   SSG/SEO-safe: server'da HİÇ render edilmez (useState false) → içerik statik HTML'de
   hazır, LCP gecikmez, overlay içeriği DOM'dan gizlemez. JS kapalıysa hiç çıkmaz.
   prefers-reduced-motion: reduce → atlanır (site direkt). Saf CSS + mevcut PNG; ekstra
   script/görsel yok (logo zaten nav'da kullanılıyor → paylaşımlı/cache).
   ────────────────────────────────────────────────────────────── */
const FLAG = 'gt_preloaded'

export default function Preloader() {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let reduce = false
    let already = false
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {}
    try {
      already = sessionStorage.getItem(FLAG) === '1'
    } catch {}
    // reduced-motion VEYA bu oturumda zaten oynadı → atla (site-içi gezinme + tekrar ziyaret)
    if (reduce || already) return
    try {
      sessionStorage.setItem(FLAG, '1')
    } catch {}
    setShow(true)
    const t1 = setTimeout(() => setLeaving(true), 1450) // fade-out başlat
    const t2 = setTimeout(() => setShow(false), 1950) // DOM'dan kaldır (toplam < 2 sn)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!show) return null

  return (
    <div className={`gt-pre${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <img
        className="gt-pre-logo"
        src="/logo-tekstil.png"
        alt=""
        width="595"
        height="842"
        decoding="async"
      />
      <style>{`
        .gt-pre {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: var(--v2-cream, #EFEAE0);
          opacity: 1; transition: opacity 460ms ease;
          will-change: opacity;
        }
        .gt-pre.is-leaving { opacity: 0; pointer-events: none; }
        .gt-pre-logo {
          width: clamp(260px, 44vw, 440px); height: auto; display: block;
          /* (1) soldan açılma: clip-path sağdan %100 → 0 (kalemle yazılır gibi reveal) */
          clip-path: inset(0 100% 0 0);
          animation:
            gt-pre-draw 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards,
            gt-pre-zoom 0.56s cubic-bezier(0.34, 1.56, 0.64, 1) 0.92s forwards;
          will-change: clip-path, transform;
        }
        @keyframes gt-pre-draw {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
        /* (2) çift zoom — iki kademeli: 1 → 1.05 → 1.0 → 1.025 → 1.0 */
        @keyframes gt-pre-zoom {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.05); }
          64%  { transform: scale(1); }
          82%  { transform: scale(1.025); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gt-pre { display: none; }
        }
      `}</style>
    </div>
  )
}
