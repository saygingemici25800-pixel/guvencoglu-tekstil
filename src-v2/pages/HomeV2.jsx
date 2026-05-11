import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import HeroOriginalBridge from '../scenes/HeroOriginalBridge.jsx'

export default function HomeV2() {
  return (
    <PageTransition>
      <SEOHead
        title="Güvencoğlu Tekstil — 1980'den beri ipliği hikayeye dönüştürüyoruz"
        description="Fethiye merkezli, kendi üretim tesisli tekstil firması. Konfeksiyon, nakış, baskı ve toplu üretim için 45 yıllık deneyim."
        path="/v2"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvencoğlu Tekstil',
          foundingDate: '1980',
          url: 'https://guvencoglutekstil.com/v2',
          address: { '@type': 'PostalAddress', addressLocality: 'Fethiye', addressRegion: 'Muğla', addressCountry: 'TR' },
        }}
      />

      <HeroOriginalBridge />

      <section className="v2-page" style={teaserStyle}>
        <p className="mono" style={tagStyle}>01 / Ana Sayfa — sonraki bölümler</p>
        <h1 style={titleStyle}>
          İpliği <em style={{ fontStyle: 'italic', color: 'var(--v2-copper)' }}>hikayeye</em> dönüştürüyoruz.
        </h1>
        <p style={bodyStyle}>
          ThreadSpool 3D sahnesi, JourneyTeaser hub'ı ve ImpactStats sayaçları
          sonraki adımlarda eklenecek. Şu an Hero üstünde sadece V2 nav + sayfa
          geçişleri kontrol edilebilir.
        </p>
      </section>
    </PageTransition>
  )
}

const teaserStyle = {
  background: 'var(--v2-cream)',
  color: 'var(--v2-ink)',
  padding: '160px 32px',
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 1440,
  margin: '0 auto',
}
const tagStyle = { fontFamily: 'var(--v2-font-mono)', fontSize: 12, letterSpacing: '0.15em', color: 'var(--v2-copper)', textTransform: 'uppercase', marginBottom: 16 }
const titleStyle = { fontFamily: 'var(--v2-font-display)', fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--v2-navy)', maxWidth: '14ch', lineHeight: 0.95 }
const bodyStyle = { marginTop: 24, fontSize: 18, color: 'var(--v2-ink)', opacity: 0.7, maxWidth: '60ch' }
