import { lazy, Suspense, useEffect, useState } from 'react'
import Marquee from './Marquee.jsx'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

export default function Hero() {
  const [showCanvas, setShowCanvas] = useState(false)

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 240))
    const id = idle(() => setShowCanvas(true), { timeout: 1500 })
    return () => {
      if (window.cancelIdleCallback) {
        try {
          window.cancelIdleCallback(id)
        } catch (_) {}
      } else {
        clearTimeout(id)
      }
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__canvas-fallback" aria-hidden="true" />
      {showCanvas && (
        <div className="hero__canvas" aria-hidden="true">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
      )}
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__noise" aria-hidden="true" />

      <div className="container hero__inner">
        <div>
          <span className="eyebrow hero__eyebrow">
            Fethiye · 1980'den Beri · Kendi Üretim Tesisi
          </span>
          <h1 id="hero-title">
            Üniformanın Gücü, <br />
            <span className="accent">Güvenin</span> İmzası.
          </h1>
          <p className="hero__lede">
            Fethiye'deki kendi üretim tesisimizde — aracısız, hızlı, kalite kontrolü
            elimizde. Okul forması, kurumsal üniforma, iş elbisesi ve nakış için
            40 yılı aşan tek adresiniz.
          </p>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="#teklif">
              Ücretsiz Teklif Al
              <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a className="btn btn--ghost-light" href="#hizmetler">
              Hizmetlerimiz
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>40+</dt>
              <dd>Yıllık deneyim</dd>
            </div>
            <div>
              <dt>1.500+</dt>
              <dd>Kurumsal müşteri</dd>
            </div>
            <div>
              <dt>%100</dt>
              <dd>Kendi üretim</dd>
            </div>
          </dl>
        </div>

        <aside className="hero__aside" aria-label="Sahibinden mesaj">
          <article className="hero__card">
            <div className="hero__card-label">Sahibinden</div>
            <p className="hero__card-quote">
              "Bir formanın iyiliği, ilk dikişten son düğmeye kadar bizim elimizden
              geçtiği için belli olur."
            </p>
            <div className="hero__card-author">
              <div className="hero__card-mono" aria-hidden="true">Ö</div>
              <div>
                <strong>Ömer Güvenç</strong>
                <span>Kurucu · Fethiye</span>
              </div>
            </div>
          </article>
        </aside>
      </div>

      <a href="#hakkimizda" className="hero__scroll-hint" aria-label="Aşağı kaydır">
        <span>Keşfet</span>
        <span className="line" aria-hidden="true" />
      </a>

      <Marquee />
    </section>
  )
}
