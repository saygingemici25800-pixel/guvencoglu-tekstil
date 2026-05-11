import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'

export default function ContactV2() {
  return (
    <PageTransition>
      <SEOHead
        title="İletişim — Teklif Al | Güvencoğlu Tekstil"
        description="Fethiye merkezli tekstil üreticisi Güvencoğlu Tekstil ile iletişime geçin. Hızlı teklif formu ve fabrika ziyaret bilgileri."
        path="/v2/iletisim"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Güvencoğlu Tekstil',
          address: { '@type': 'PostalAddress', addressLocality: 'Fethiye', addressRegion: 'Muğla', addressCountry: 'TR' },
        }}
      />
      <section style={placeholderStyle}>
        <p className="mono" style={tagStyle}>06 / İletişim</p>
        <h1 style={titleStyle}>Hadi <em style={{ fontStyle: 'italic' }}>başlayalım</em>.</h1>
        <p style={bodyStyle}>QuoteForm ve LocationPin3D sonraki adımlarda gelecek.</p>
      </section>
    </PageTransition>
  )
}

const placeholderStyle = { minHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 32px 64px', maxWidth: 1440, margin: '0 auto' }
const tagStyle = { fontFamily: 'var(--v2-font-mono)', fontSize: 12, letterSpacing: '0.15em', color: 'var(--v2-copper)', textTransform: 'uppercase', marginBottom: 16 }
const titleStyle = { fontFamily: 'var(--v2-font-display)', fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--v2-navy)', maxWidth: '14ch', lineHeight: 0.95 }
const bodyStyle = { marginTop: 24, fontSize: 18, color: 'var(--v2-ink)', opacity: 0.7 }
