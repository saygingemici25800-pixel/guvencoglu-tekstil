import { useState, useEffect } from 'react'

/* ──────────────────────────────────────────────────────────────
   Açılış preloader'ı — siteye İLK girişte (hangi route olursa) oturum başına 1 kez.
   logo-tekstil.png soldan maskeyle (clip-path) "yazılıyor" gibi açılır → üzerinden
   soldan sağa ince bir parıltı (shine sweep, logo şekline maskeli) geçer → fade-out →
   site görünür. Toplam ~2 sn. (Zoom yok.)

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
    const t1 = setTimeout(() => setLeaving(true), 1700) // açılma + parıltı bitince fade-out
    const t2 = setTimeout(() => setShow(false), 2180) // DOM'dan kaldır (toplam ~2.2 sn)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!show) return null

  return (
    <div className={`gt-pre${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="gt-pre-logo-wrap">
        <img
          className="gt-pre-logo"
          src="/logo-tekstil.png"
          alt=""
          width="595"
          height="842"
          decoding="async"
        />
        {/* Parıltı: logo şekline maskeli, soldan sağa kayan ince ışık huzmesi */}
        <span className="gt-pre-shine" aria-hidden="true" />
      </div>
      <style>{`
        .gt-pre {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: var(--v2-cream, #EFEAE0);
          opacity: 1; transition: opacity 460ms ease;
          will-change: opacity;
        }
        .gt-pre.is-leaving { opacity: 0; pointer-events: none; }
        /* (1) soldan açılma: clip-path sağdan %100 → 0 ("yazılıyor" gibi yumuşak akış) */
        .gt-pre-logo-wrap {
          position: relative;
          width: clamp(260px, 44vw, 440px);
          clip-path: inset(0 100% 0 0);
          animation: gt-pre-draw 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          will-change: clip-path;
        }
        .gt-pre-logo { width: 100%; height: auto; display: block; }
        @keyframes gt-pre-draw {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
        /* (2) parıltı: logo şekline maskeli kutu; içindeki eğik ışık bandı soldan sağa geçer */
        .gt-pre-shine {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
          -webkit-mask-image: url(/logo-tekstil.png); mask-image: url(/logo-tekstil.png);
          -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
        }
        .gt-pre-shine::before {
          content: ''; position: absolute; top: -10%; bottom: -10%; left: 0; width: 42%;
          background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%);
          transform: skewX(-16deg) translateX(-260%);
          animation: gt-pre-shine 0.82s ease-in-out 0.9s forwards;
        }
        @keyframes gt-pre-shine {
          from { transform: skewX(-16deg) translateX(-260%); }
          to   { transform: skewX(-16deg) translateX(360%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gt-pre { display: none; }
        }
      `}</style>
    </div>
  )
}
