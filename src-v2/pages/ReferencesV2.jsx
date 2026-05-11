import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'

export default function ReferencesV2() {
  return (
    <PageTransition>
      <SEOHead
        title="Referanslar — Birlikte Çalıştıklarımız | Güvencoğlu Tekstil"
        description="Güvencoğlu Tekstil'in birlikte çalıştığı kurumsal markalar ve uzun soluklu iş ortakları."
        path="/v2/referanslar"
      />
      <section style={placeholderStyle}>
        <p className="mono" style={tagStyle}>05 / Referanslar</p>
        <h1 style={titleStyle}>Birlikte <em style={{ fontStyle: 'italic' }}>çalıştıklarımız</em>.</h1>
        <p style={bodyStyle}>ClientGrid ve testimonial bölümü sonraki adımda eklenecek.</p>
      </section>
    </PageTransition>
  )
}

const placeholderStyle = { minHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 32px 64px', maxWidth: 1440, margin: '0 auto' }
const tagStyle = { fontFamily: 'var(--v2-font-mono)', fontSize: 12, letterSpacing: '0.15em', color: 'var(--v2-copper)', textTransform: 'uppercase', marginBottom: 16 }
const titleStyle = { fontFamily: 'var(--v2-font-display)', fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--v2-navy)', maxWidth: '14ch', lineHeight: 0.95 }
const bodyStyle = { marginTop: 24, fontSize: 18, color: 'var(--v2-ink)', opacity: 0.7 }
