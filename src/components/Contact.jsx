import { useReveal } from '../hooks/useReveal.js'

const CHANNELS = [
  {
    label: 'Telefon',
    value: '0532 134 7602',
    href: 'tel:+905321347602',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '0532 134 7602',
    href: 'https://wa.me/905321347602',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21l1.5-5A9 9 0 1 1 8 19.5z" />
        <path d="M9 9c.4 1 1 2 2 3s2 1.6 3 2c.6.2 1 0 1.3-.4l.7-.9 2.5 1.3c-.4 1.3-1.5 2-2.7 2-3 0-7-4-7-7 0-1.2.7-2.3 2-2.7l1.3 2.5-.9.7c-.4.3-.6.7-.4 1.3z" />
      </svg>
    ),
  },
  {
    label: 'E-posta',
    value: 'guvencoglutekstil@gmail.com',
    href: 'mailto:guvencoglutekstil@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'Adres',
    value: 'Kesikkapı Mah. Atatürk Cad. No:24 Fethiye / Muğla',
    href: 'https://www.google.com/maps/search/?api=1&query=Kesikkap%C4%B1+Mah.+Atat%C3%BCrk+Cad.+Fethiye',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [headRef, headVisible] = useReveal()
  const [mapRef, mapVisible] = useReveal()

  return (
    <section className="contact" id="iletisim" aria-labelledby="iletisim-title">
      <div className="container">
        <div className="contact__grid">
          <div className={`reveal ${headVisible ? 'visible' : ''}`} ref={headRef}>
            <span className="eyebrow">İletişim</span>
            <h2 id="iletisim-title">
              Tesisimize Bekliyoruz, <span className="accent">Üretim Yerinde Görülür.</span>
            </h2>
            <p className="contact__lede">
              Fethiye Kesikkapı'daki tesisimizde sizi ağırlamaktan, kumaş ve numuneleri
              yerinde göstermekten mutluluk duyarız. Hafta içi 09:00–18:30, Cumartesi
              09:00–17:00.
            </p>

            <ul className="contact__channels">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="contact__channels-icon">{c.icon}</span>
                    <span className="contact__channels-text">
                      <small>{c.label}</small>
                      <strong>{c.value}</strong>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`contact__map reveal delay-1 ${mapVisible ? 'visible' : ''}`} ref={mapRef}>
            <iframe
              title="Güvençoğlu Tekstil — Kesikkapı, Fethiye"
              src="https://www.google.com/maps?q=Kesikkap%C4%B1+Mahallesi+Fethiye&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
