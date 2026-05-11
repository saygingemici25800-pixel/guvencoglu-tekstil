import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import WorkshopScene from '../scenes/WorkshopScene.jsx'
import { STATIONS } from '../data/stations.js'

export default function ProcessV2() {
  return (
    <PageTransition>
      <SEOHead
        title="Üretim Süreci — Hammaddeden Teslimata 7 Adım | Güvencoğlu"
        description="Hammadde kontrolünden teslimata kadar Güvencoğlu Tekstil fabrikasının 7 adımlık üretim hattını adım adım gezin."
        path="/v2/uretim"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Güvencoğlu Tekstil Üretim Süreci',
          description: 'Hammaddeden teslimata 7 adımlık üretim hattı.',
          step: STATIONS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.description,
          })),
        }}
      />

      <section className="v2-page" style={introStyle}>
        <p className="mono" style={tagStyle}>03 / Üretim Süreci</p>
        <h1 style={titleStyle}>
          Hammaddeden teslimata
          <br />
          <em style={italicStyle}>7</em> adım.
        </h1>
        <p style={ledeStyle}>
          Bir kumaş parçası, fabrika kapısından çıkana kadar yedi farklı elden,
          yedi farklı kontrolden geçer. Aşağıda kameranın peşine takılın —
          tezgahların arasında dolaşacaksınız.
        </p>
        <ul style={statListStyle} aria-label="Üretim hattı özet rakamları">
          <li><strong style={statNumStyle}>7</strong><span style={statLabelStyle}>İstasyon</span></li>
          <li><strong style={statNumStyle}>64</strong><span style={statLabelStyle}>Dikiş / gömlek</span></li>
          <li><strong style={statNumStyle}>%100</strong><span style={statLabelStyle}>Kalite kontrolü</span></li>
        </ul>
        <div className="mono" style={hintStyle}>↓ AŞAĞI</div>
      </section>

      <WorkshopScene stations={STATIONS} />

      <section className="v2-page" style={ctaStyle}>
        <p className="mono" style={{ ...tagStyle, color: 'var(--v2-copper)' }}>SIRADAKİ</p>
        <h2 style={ctaTitleStyle}>
          Bu süreçten <em style={italicStyle}>ne</em> çıkıyor?
        </h2>
        <p style={ctaLedeStyle}>
          7 adımlık üretim hattının sonunda farklı hizmet hatları çıkıyor.
          Konfeksiyon, nakış, baskı, özel tasarım. Hangisi sana lazımsa.
        </p>
        <Link to="/v2/hizmetler" style={ctaButton}>
          Hizmetlere Git
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </PageTransition>
  )
}

const introStyle = {
  background: 'var(--v2-cream)',
  color: 'var(--v2-ink)',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px) clamp(48px, 8vw, 96px)',
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 1440,
  margin: '0 auto',
}
const tagStyle = {
  fontFamily: 'var(--v2-font-mono)',
  fontSize: 12,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper)',
  textTransform: 'uppercase',
  marginBottom: 24,
}
const titleStyle = {
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(56px, 11vw, 160px)',
  color: 'var(--v2-navy)',
  lineHeight: 0.92,
  letterSpacing: '-0.04em',
  marginBottom: 48,
  fontWeight: 500,
  fontVariationSettings: '"opsz" 144',
}
const italicStyle = {
  fontStyle: 'italic',
  color: 'var(--v2-copper)',
  fontVariationSettings: '"opsz" 144',
}
const ledeStyle = {
  fontFamily: 'var(--v2-font-body)',
  fontSize: 'clamp(18px, 1.6vw, 22px)',
  lineHeight: 1.55,
  color: 'var(--v2-ink)',
  opacity: 0.8,
  maxWidth: '54ch',
  marginBottom: 64,
}
const statListStyle = {
  listStyle: 'none',
  margin: '0 0 64px',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 48,
}
const statNumStyle = {
  display: 'block',
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(36px, 5vw, 56px)',
  color: 'var(--v2-copper)',
  fontWeight: 500,
  lineHeight: 1,
  marginBottom: 8,
  fontVariationSettings: '"opsz" 144',
}
const statLabelStyle = {
  fontFamily: 'var(--v2-font-mono)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-mist)',
}
const hintStyle = {
  fontFamily: 'var(--v2-font-mono)',
  fontSize: 12,
  letterSpacing: '0.3em',
  color: 'var(--v2-mist)',
  alignSelf: 'flex-start',
}
const ctaStyle = {
  background: 'var(--v2-navy)',
  color: 'var(--v2-cream)',
  padding: 'clamp(72px, 12vw, 160px) clamp(20px, 5vw, 32px)',
}
const ctaTitleStyle = {
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.02,
  letterSpacing: '-0.03em',
  marginBottom: 32,
  fontWeight: 500,
  fontVariationSettings: '"opsz" 144',
  maxWidth: '20ch',
  color: 'var(--v2-cream)',
}
const ctaLedeStyle = {
  fontSize: 'clamp(17px, 1.4vw, 20px)',
  lineHeight: 1.55,
  opacity: 0.8,
  marginBottom: 48,
  maxWidth: '52ch',
}
const ctaButton = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: '18px 32px',
  borderRadius: 999,
  background: 'var(--v2-copper)',
  color: 'var(--v2-navy)',
  fontWeight: 600,
  fontSize: 16,
  minHeight: 48,
}
