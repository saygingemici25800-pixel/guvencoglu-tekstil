import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const SERVICES = [
  {
    num: '01',
    badge: 'En çok tercih edilen',
    title: 'Okul Forması Üretimi',
    desc: 'İlkokul, ortaokul, lise ve özel okullar için tüm sezonluk forma kombinleri. Logo nakışı dahil.',
    features: ['Yelek', 'Hırka', 'Tişört', 'Etek-Pantolon', 'Logo Nakışı'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 4l-4 3-4-3-5 3v13h18V7z" />
        <path d="M8 4l4 3 4-3" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Kurumsal Personel Kıyafetleri',
    desc: 'Otel, restoran, hastane ve kurum personeli için dayanıklı, prestijli üniformalar.',
    features: ['Gömlek', 'Yelek', 'İş Ceketi', 'Önlük'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3l-4 5-4-5L3 6v15h18V6z" />
        <path d="M12 8v13" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Tişört & Sweat Baskı',
    desc: 'Tek adetten toplu siparişe kadar serigrafi, dijital baskı ve transfer baskı çözümleri.',
    features: ['Serigrafi', 'Dijital', 'Transfer', 'Nakış'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 7l4-3h8l4 3-3 4-3-2v13H10V9L7 11z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Logo Nakış',
    desc: 'Yüksek hassasiyetli bilgisayarlı nakış makinelerimizle kurumsal logo işleme.',
    features: ['Bilgisayarlı', '12 İğne', 'Hızlı Çıkış'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Özel Tasarım & Toplu Üretim',
    desc: 'Markanıza özel kalıp, kumaş seçimi ve çoklu beden üretim. Aracısız doğrudan üretici fiyatı.',
    features: ['Numune', 'Modelistlik', 'Kalıp', 'Seri Üretim', 'Kalite Kontrol'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
        <path d="M3 7l9 4 9-4M12 11v10" />
      </svg>
    ),
  },
]

function FlipCard({ rotate = 'y', className, children, back }) {
  const [hover, setHover] = useState(false)
  const axis = rotate === 'x' ? 'X' : 'Y'

  const wrapperStyle = {
    perspective: '1200px',
    WebkitPerspective: '1200px',
    width: '16rem',
    height: '24rem',
  }

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    transform: hover ? `rotate${axis}(180deg)` : `rotate${axis}(0deg)`,
    willChange: 'transform',
  }

  const faceStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '1rem',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  const backFaceStyle = {
    ...faceStyle,
    transform: `rotate${axis}(180deg)`,
  }

  return (
    <div
      className={className}
      style={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
    >
      <div style={innerStyle}>
        <div style={faceStyle}>{children}</div>
        <div style={backFaceStyle}>{back}</div>
      </div>
    </div>
  )
}

function ServiceFlipCard({ service, index }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal delay-${Math.min(index, 4)} ${visible ? 'visible' : ''}`}>
      <FlipCard
        back={
          <div className="service-card__back">
            {service.badge && <span className="service-card__badge">{service.badge}</span>}
            <span className="service-card__num">— {service.num}</span>
            <h3 className="service-card__title" style={{ color: 'var(--bone)' }}>{service.title}</h3>
            <p className="service-card__desc" style={{ color: 'rgba(245,245,240,0.78)' }}>{service.desc}</p>
            <ul className="service-card__features">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a className="btn btn--primary" href="#teklif">
              Teklif Al
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        }
      >
        <div className="service-card service-card--front">
          <span className="service-card__num">— {service.num}</span>
          <div className="service-card__icon">{service.icon}</div>
          <h3 className="service-card__title">{service.title}</h3>
        </div>
      </FlipCard>
    </div>
  )
}

export default function Services() {
  const [headRef, headVisible] = useReveal()

  return (
    <section className="services" id="hizmetler" aria-labelledby="hizmetler-title">
      <div className="container">
        <div className={`section-head reveal ${headVisible ? 'visible' : ''}`} ref={headRef}>
          <span className="eyebrow">Hizmetlerimiz</span>
          <h2 id="hizmetler-title">
            Kesimden Son Ütüye Kadar <span className="accent">Tek Çatı Altında.</span>
          </h2>
          <p>
            Kumaş tedarikinden modelistliğe, nakıştan paketlemeye kadar tüm süreçler
            Fethiye Kesikkapı'daki kendi tesisimizde gerçekleştirilir. Aracısız çalışmanın
            avantajı doğrudan size yansır.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceFlipCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
