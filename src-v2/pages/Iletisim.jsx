import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import TeklifForm from '../shared/TeklifForm.jsx'
import Reveal from '../shared/Reveal.jsx'

/* ──────────────────────────────────────────────────────────────
   Iletisim — /iletisim tam sayfası (Faz 4)
   Kaynak: ContactV2.jsx içeriği taşındı; palet/path/schema güncellendi.
   Layout: sol NAP kartı · sağ TeklifForm · altta tam genişlik harita.
   ≤860px tek sütun. İnterlocking YOK — okunabilirlik öncelik.
   3D/Canvas YOK. Palet sabit: navy #2D3142, copper #D4A373,
   cream #EFEAE0, ink #1A1A1A, muted #5A5A5A.
   ────────────────────────────────────────────────────────────── */

const CONTACT = {
  phone: '0532 134 7602',
  phoneE164: '+905321347602',
  whatsapp: '0532 134 7602',
  whatsappE164: '+905321347602',
  email: 'guvencoglutekstil@gmail.com',
  address: 'Kesikkapı Mah. Atatürk Cad. No:144/146, Fethiye, Muğla 48300',
  hours: 'Pzt – Cmt · 08:30 – 19:00',
}

const MAP_EMBED =
  'https://www.google.com/maps?q=Kesikkap%C4%B1+Mah.+Atat%C3%BCrk+Cad.+Fethiye&output=embed'

/* Editorial eyebrow — copper kısa çizgi + uppercase etiket (yan yana) */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

export default function Iletisim() {
  return (
    <PageTransition>
      <SEOHead
        title="İletişim — Güvençoğlu Tekstil"
        description="Fethiye merkezli Güvençoğlu Tekstil ile iletişime geçin: adres, telefon, WhatsApp, e-posta ve hızlı teklif formu. Pzt–Cmt 08:30–19:00."
        path="/iletisim"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Güvençoğlu Tekstil',
          url: 'https://guvencoglutekstil.com/iletisim',
          telephone: '+90 532 134 7602',
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
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:30',
              closes: '19:00',
            },
          ],
        }}
      />

      {/* ─── HERO — eyebrow + Fraunces h1 + lede ─────────────────── */}
      <section style={heroSection}>
        <Reveal style={heroInner}>
          <Eyebrow>İLETİŞİM · FETHİYE</Eyebrow>
          <h1 style={h1}>İletişim</h1>
          <p style={lede}>
            Konfeksiyon, nakış, baskı veya markaya özel B2B üretim — aşağıdan ne
            aradığını anlat, 48 saat içinde teklifle dönelim. Doğrudan ulaşmak
            istersen telefon, WhatsApp ve e-posta da hazır.
          </p>
        </Reveal>
      </section>

      {/* ─── ANA İÇERİK — sol NAP · sağ TeklifForm ───────────────── */}
      <section style={mainSection}>
        <div style={mainGrid} className="ilt-grid">
          {/* SOL — NAP kartı */}
          <Reveal as="aside" style={leftCol}>
            <article style={infoCard}>
              <p style={infoTag}>FABRİKA</p>
              <p style={infoAddress}>{CONTACT.address}</p>
              <p style={infoHours}>{CONTACT.hours}</p>
            </article>

            <ul style={contactList}>
              <li style={contactItem} className="ilt-contact-item">
                <span style={contactMono}>TELEFON</span>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  style={contactLink}
                  className="ilt-contact-link"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li style={contactItem} className="ilt-contact-item">
                <span style={contactMono}>WHATSAPP</span>
                <a
                  href={`https://wa.me/${CONTACT.whatsappE164.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={contactLink}
                  className="ilt-contact-link"
                >
                  {CONTACT.whatsapp} <span aria-hidden="true" style={extLink}>↗</span>
                </a>
              </li>
              <li style={contactItem} className="ilt-contact-item">
                <span style={contactMono}>E-POSTA</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={contactLink}
                  className="ilt-contact-link"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </Reveal>

          {/* SAĞ — sade teklif formu (native required KVKK onayı) */}
          <Reveal style={rightCol} delay={120}>
            <TeklifForm theme="navy" consent title="Hızlı teklif formu" />
          </Reveal>
        </div>
      </section>

      {/* ─── HARİTA — tam genişlik ───────────────────────────────── */}
      <section style={mapSection} aria-label="Fabrika konumu — Google Maps">
        <Reveal>
          <iframe
            src={MAP_EMBED}
            title="Güvençoğlu Tekstil — Fethiye fabrikası harita"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={mapFrame}
            allowFullScreen
          />
        </Reveal>
      </section>

      <style>{`
        .ilt-contact-link { transition: color 200ms ease; }
        .ilt-contact-link:hover,
        .ilt-contact-link:focus-visible { color: var(--v2-copper, #D4A373); }
        .ilt-contact-link:focus-visible {
          outline: 2px solid var(--v2-copper, #D4A373);
          outline-offset: 4px;
          border-radius: 2px;
        }
        @media (max-width: 860px) {
          .ilt-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 560px) {
          .ilt-contact-item {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet sabit: navy #2D3142, copper #D4A373,
   cream #EFEAE0, ink #1A1A1A, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */

const PAGE_BG = 'var(--v2-cream, #EFEAE0)'

const eyebrowRow = { display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 20px' }
const eyebrowDash = {
  width: 34,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
}
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}

/* HERO */
const heroSection = {
  background: PAGE_BG,
  padding: 'clamp(72px, 11vw, 152px) clamp(24px, 6vw, 96px) clamp(40px, 6vw, 72px)',
  boxSizing: 'border-box',
  maxWidth: '100%',
}
const heroInner = {
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(44px, 7vw, 88px)',
  lineHeight: 1.02,
  letterSpacing: '-0.02em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 24px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '54ch',
}

/* ANA İÇERİK */
const mainSection = {
  background: PAGE_BG,
  padding: '0 clamp(24px, 6vw, 96px) clamp(64px, 9vw, 120px)',
  boxSizing: 'border-box',
  maxWidth: '100%',
}
const mainGrid = {
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
  gap: 'clamp(40px, 5vw, 72px)',
  alignItems: 'flex-start',
}
const leftCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  minWidth: 0,
  maxWidth: '100%',
}
const rightCol = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  maxWidth: '100%',
}
const infoCard = {
  background: 'transparent',
  padding: '24px 0',
  borderTop: '1px solid rgba(45, 49, 66, 0.16)',
  borderBottom: '1px solid rgba(45, 49, 66, 0.16)',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  maxWidth: '100%',
  boxSizing: 'border-box',
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
  fontSize: 'clamp(18px, 4vw, 24px)',
  lineHeight: 1.3,
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
  letterSpacing: '-0.01em',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  maxWidth: '100%',
}
const infoHours = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.1em',
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
  textTransform: 'uppercase',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  maxWidth: '100%',
}
const contactList = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  maxWidth: '100%',
  boxSizing: 'border-box',
}
const contactItem = {
  display: 'grid',
  gridTemplateColumns: '110px minmax(0, 1fr)',
  alignItems: 'baseline',
  gap: 20,
  padding: '16px 0',
  borderBottom: '1px solid rgba(45, 49, 66, 0.1)',
  maxWidth: '100%',
  boxSizing: 'border-box',
}
const contactMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-muted, #5A5A5A)',
}
const contactLink = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(16px, 1.8vw, 20px)',
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  minWidth: 0,
  maxWidth: '100%',
}
const extLink = { fontSize: 12, opacity: 0.6, flexShrink: 0 }

/* HARİTA */
const mapSection = {
  background: PAGE_BG,
  padding: '0 0 clamp(64px, 9vw, 96px)',
  maxWidth: '100%',
  boxSizing: 'border-box',
}
const mapFrame = {
  width: '100%',
  maxWidth: '100%',
  height: 'clamp(320px, 50vh, 520px)',
  border: 0,
  display: 'block',
  boxSizing: 'border-box',
}
