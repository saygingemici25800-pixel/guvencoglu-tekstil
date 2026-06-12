import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './ReducedMotion.jsx'

/* PageTransition — "kumaş katlanması" giriş geçişi (saf CSS, clip-path).

   Route değişiminde yeni sayfa içeriği yukarıdan aşağı clip-path: inset() ile
   açılır (~400ms perde/katlanma hissi). SADECE giriş animasyonu — çıkış yok,
   route beklemez (SSG/SEO ve hız etkilenmez).

   SSG/no-JS güvenli: prerender ve İLK yüklemede animasyon OYNAMAZ; içerik
   clip-path'siz, tam görünür çıkar (statik HTML'e gizli içerik gömülmez).
   Modül seviyesi `appMounted` ilk PageTransition mount'undan sonra true olur;
   yalnızca sonraki site-içi route geçişlerinde clip-path animasyonu uygulanır.

   prefers-reduced-motion: reduce → animasyon hiç uygulanmaz (anında render);
   ayrıca motion.css'teki global guard da süreyi sıfırlar. */

// İlk uygulama yüklemesinde (SSG/hydrate) animasyon yok; sonraki mount'larda var.
let appMounted = false

export default function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion()
  // Mount anında karar: bu, ilk yükleme mi yoksa route geçişi mi?
  const [animate] = useState(() => appMounted && !reduced)

  useEffect(() => {
    appMounted = true
  }, [])

  return (
    <div className={animate ? 'pt-fold' : undefined} style={{ minHeight: '100vh' }}>
      {children}
      {animate && (
        <style>{`
          @keyframes pt-fold-in {
            from { clip-path: inset(0 0 100% 0); }
            to   { clip-path: inset(0 0 0 0); }
          }
          .pt-fold {
            animation: pt-fold-in 400ms cubic-bezier(0.65, 0, 0.35, 1) both;
            will-change: clip-path;
          }
          @media (prefers-reduced-motion: reduce) {
            .pt-fold { animation: none; }
          }
        `}</style>
      )}
    </div>
  )
}
