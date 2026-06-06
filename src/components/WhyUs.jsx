import { useReveal } from '../hooks/useReveal.js'

const REASONS = [
  {
    num: '01',
    title: 'Aracısız Üretici Fiyatı',
    desc: 'Toptancı ya da bayi katmanı yok. Doğrudan üreticiden tedarik avantajı.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Hızlı Numune & Sezon Teslimi',
    desc: 'Sezona yetişen üretim takvimi. Numune onayından teslime kadar net iş planı.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Kendi Tesisi, Kendi Ekibi',
    desc: 'Kesim, dikim, baskı, nakış — hepsi Fethiye Kesikkapı\'daki tesisimizde yapılır.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Kalite Garantisi',
    desc: 'Her parti üretim öncesi ve sonrası iki aşamalı iç kalite kontrolünden geçer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

function ReasonCell({ reason, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`why__cell reveal delay-${Math.min(index + 1, 4)} ${visible ? 'visible' : ''}`}
    >
      <div className="why__cell-icon">{reason.icon}</div>
      <span className="why__cell-num">— {reason.num}</span>
      <h3>{reason.title}</h3>
      <p>{reason.desc}</p>
    </div>
  )
}

export default function WhyUs() {
  const [headRef, headVisible] = useReveal()
  const [featRef, featVisible] = useReveal()

  return (
    <section className="why" id="neden-biz" aria-labelledby="neden-biz-title">
      <div className="container">
        <div className={`section-head reveal ${headVisible ? 'visible' : ''}`} ref={headRef}>
          <span className="eyebrow">Neden Biz</span>
          <h2 id="neden-biz-title">
            Çeyrek Asırlık Tecrübenin <span className="accent">Aracısız Avantajı.</span>
          </h2>
          <p>
            Güvençoğlu Tekstil; geleneksel ustalığı modern üretim disipliniyle birleştirir.
            Bu yüzden Fethiye'deki okul ve kurumlar yıllardır bizimle çalışmayı tercih ediyor.
          </p>
        </div>

        <div className="why__grid">
          <div
            className={`why__cell why__cell--feature reveal ${featVisible ? 'visible' : ''}`}
            ref={featRef}
          >
            <span className="feature-tag">Öne Çıkan</span>
            <div className="why__cell-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
              </svg>
            </div>
            <h3>2001'den Bu Yana Fethiye'nin Forma Adresi.</h3>
            <p>
              Çeyrek asırdır Kesikkapı'daki tesisimizde üretim yapıyoruz. Yıllar içinde
              biriken ustalık, bugünün üretim teknolojisiyle birleşince ortaya hem dayanıklı
              hem kalıbı oturan formalar çıkıyor.
            </p>
            <div className="feature-meta">
              <div>
                <strong>45+</strong>
                <span>Yıllık Deneyim</span>
              </div>
              <div>
                <strong>120+</strong>
                <span>Okul & Kurum</span>
              </div>
              <div>
                <strong>%100</strong>
                <span>Kendi Tesisimiz</span>
              </div>
            </div>
          </div>

          {REASONS.map((r, i) => (
            <ReasonCell key={r.num} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
