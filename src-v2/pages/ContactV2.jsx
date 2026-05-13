import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import QuoteForm from '../shared/QuoteForm.jsx'
import LocationPin3D from '../scenes/LocationPin3D.jsx'

const CONTACT = {
  phone: '0532 134 7602',
  phoneE164: '+905321347602',
  whatsapp: '0532 134 7602',
  whatsappE164: '+905321347602',
  email: 'guvencoglutekstil@gmail.com',
  address: 'Kesikkapı Mah. Atatürk Cad. No:144/146, Fethiye, Muğla 48300',
  hours: 'Pzt – Cmt · 08:30 – 19:00',
}

const MAP_EMBED = 'https://www.google.com/maps?q=Kesikkap%C4%B1+Mah.+Atat%C3%BCrk+Cad.+Fethiye&output=embed'

export default function ContactV2() {
  return (
    <PageTransition>
      <SEOHead
        title="İletişim — Teklif Al | Güvencoğlu Tekstil"
        description="Fethiye merkezli tekstil üreticisi Güvencoğlu Tekstil ile iletişime geçin. 4 adımlık teklif formu, telefon, e-posta ve fabrika konumu."
        path="/v2/iletisim"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Güvencoğlu Tekstil',
          telephone: '+90 252 612 50 92',
          email: CONTACT.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kesikkapı Mah. Atatürk Cad. No:144/146',
            addressLocality: 'Fethiye',
            addressRegion: 'Muğla',
            postalCode: '48300',
            addressCountry: 'TR',
          },
          geo: { '@type': 'GeoCoordinates', latitude: 36.6512, longitude: 29.1264 },
          openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            opens: '08:30',
            closes: '19:00',
          }],
        }}
      />

      <section style={heroSection}>
        <div style={heroInner}>
          <p style={mono}>06 / İletişim</p>
          <h1 style={hero}>
            Hadi <em style={emStyle}>başlayalım</em>.
          </h1>
          <p style={lede}>
            Konfeksiyon, nakış, baskı veya B2B özel üretim. 4 adımda ne aradığını
            anlat — 48 saat içinde teklif elinde olsun.
          </p>
        </div>
      </section>

      <section style={mainSection}>
        <div style={mainGrid} className="v2-contact-grid">
          <aside style={leftCol}>
            <LocationPin3D height={360} caption="GÜVENCOĞLU · FETHİYE" />

            <article style={infoCard}>
              <p style={infoTag}>FABRİKA</p>
              <p style={infoAddress}>{CONTACT.address}</p>
              <p style={infoHours}>{CONTACT.hours}</p>
            </article>

            <ul style={contactList}>
              <li style={contactItem}>
                <span style={contactMono}>TELEFON</span>
                <a href={`tel:${CONTACT.phoneE164}`} style={contactLink} className="v2-contact-link">
                  {CONTACT.phone}
                </a>
              </li>
              <li style={contactItem}>
                <span style={contactMono}>WHATSAPP</span>
                <a href={`https://wa.me/${CONTACT.whatsappE164.replace('+', '')}`} target="_blank" rel="noreferrer" style={contactLink} className="v2-contact-link">
                  {CONTACT.whatsapp} <span aria-hidden="true" style={extLink}>↗</span>
                </a>
              </li>
              <li style={contactItem}>
                <span style={contactMono}>E-POSTA</span>
                <a href={`mailto:${CONTACT.email}`} style={contactLink} className="v2-contact-link">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </aside>

          <div style={rightCol}>
            <QuoteForm />
          </div>
        </div>
      </section>

      <section style={mapSection} aria-label="Fabrika konumu — Google Maps">
        <iframe
          src={MAP_EMBED}
          title="Güvencoğlu Tekstil — Fethiye fabrikası harita"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={mapFrame}
          allowFullScreen
        />
      </section>

      <style>{`
        .v2-contact-link {
          transition: color 200ms ease;
        }
        .v2-contact-link:hover,
        .v2-contact-link:focus-visible {
          color: #D4A373;
        }
        .v2-contact-link:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        @media (max-width: 960px) {
          .v2-contact-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </PageTransition>
  )
}

const heroSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  color: 'var(--v2-ink, #0B0F1A)',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px) clamp(48px, 8vw, 96px)',
  position: 'relative',
}
const heroInner = { maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }
const mono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const hero = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(56px, 9vw, 140px)',
  lineHeight: 0.92,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #0A2463)',
  margin: 0,
  maxWidth: '12ch',
}
const emStyle = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #0B0F1A)',
  opacity: 0.72,
  margin: 0,
  maxWidth: '54ch',
}
const mainSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  padding: '0 32px 128px',
}
const mainGrid = {
  maxWidth: 1440,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1.15fr',
  gap: 64,
  alignItems: 'flex-start',
}
const leftCol = { display: 'flex', flexDirection: 'column', gap: 24 }
const rightCol = { display: 'flex', flexDirection: 'column' }
const infoCard = {
  background: 'transparent',
  padding: '24px 0',
  borderTop: '1px solid rgba(10, 36, 99, 0.15)',
  borderBottom: '1px solid rgba(10, 36, 99, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}
const infoTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const infoAddress = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(20px, 2vw, 24px)',
  lineHeight: 1.3,
  color: 'var(--v2-navy, #0A2463)',
  margin: 0,
  letterSpacing: '-0.01em',
}
const infoHours = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.1em',
  color: 'var(--v2-mist, #8A8F9E)',
  margin: 0,
  textTransform: 'uppercase',
}
const contactList = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }
const contactItem = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  alignItems: 'baseline',
  gap: 20,
  padding: '14px 0',
  borderBottom: '1px solid rgba(10, 36, 99, 0.08)',
}
const contactMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-mist, #8A8F9E)',
}
const contactLink = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(17px, 1.8vw, 20px)',
  color: 'var(--v2-navy, #0A2463)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}
const extLink = { fontSize: 12, opacity: 0.6 }
const mapSection = {
  background: 'var(--v2-cream, #F5F5F0)',
  padding: '0 0 96px',
}
const mapFrame = {
  width: '100%',
  height: 'clamp(320px, 50vh, 520px)',
  border: 0,
  display: 'block',
}
