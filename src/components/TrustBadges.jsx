import { useReveal } from '../hooks/useReveal.js'

const BADGES = [
  {
    title: 'Vergi Levhalı Firma',
    desc: 'Resmi kayıtlı, faturalı kurumsal üretici.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: 'TSE Uyumlu Üretim',
    desc: 'Standartlara uygun kumaş ve dikim.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
      </svg>
    ),
  },
  {
    title: 'Kayıtlı Tedarikçi',
    desc: 'Onlarca okul ve kurumun onaylı üreticisi.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 11a4 4 0 1 0-8 0M3 21v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2" />
      </svg>
    ),
  },
  {
    title: 'Yıllık Bakım Garantisi',
    desc: 'Sezon içi tamir ve revizyon desteği.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4l-6 6L4 21l6-6a4.5 4.5 0 0 0 6.4-6.4l-2.7 2.7-2.4-2.4z" />
      </svg>
    ),
  },
]

function Badge({ badge, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`trust__badge reveal delay-${Math.min(index + 1, 4)} ${visible ? 'visible' : ''}`}
    >
      <div className="trust__badge-icon">{badge.icon}</div>
      <h3>{badge.title}</h3>
      <p>{badge.desc}</p>
    </div>
  )
}

export default function TrustBadges() {
  const [headRef, headVisible] = useReveal()

  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust__inner">
          <div
            className={`trust__head reveal ${headVisible ? 'visible' : ''}`}
            ref={headRef}
          >
            <span className="eyebrow">Güvenli Üretim</span>
            <h2 id="trust-title">
              Resmi, Kayıtlı ve <span className="accent">Denetlenebilir.</span>
            </h2>
            <p>
              Vergi levhalı kurumsal yapımız, standartlara uygun üretim disiplinimiz ve
              yıllık bakım taahhüdümüzle uzun vadeli bir iş ortağı arıyorsanız doğru
              adrestesiniz.
            </p>
          </div>

          <div className="trust__grid">
            {BADGES.map((b, i) => (
              <Badge key={b.title} badge={b} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
