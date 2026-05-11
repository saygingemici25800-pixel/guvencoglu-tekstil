import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import TimelineTunnel from '../scenes/TimelineTunnel.jsx'
import { MILESTONES } from '../data/milestones.js'

export default function StoryV2() {
  return (
    <PageTransition>
      <SEOHead
        title="Hikayemiz — Üç Kuşak, Tek İplik | Güvencoğlu Tekstil"
        description="1980'de Fethiye'de küçük bir atölyede başlayan yolculuk. Üç kuşağın elinden geçen 45 yıllık zanaat hikayesi."
        path="/v2/hikayemiz"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvencoğlu Tekstil',
          foundingDate: '1980',
          founder: { '@type': 'Person', name: 'Ömer Güvençoğlu' },
          url: 'https://guvencoglutekstil.com/v2/hikayemiz',
        }}
      />

      <section className="v2-page" style={introStyle}>
        <p className="mono" style={tagStyle}>02 / Hikayemiz</p>
        <h1 style={titleStyle}>
          Üç kuşak,
          <br />
          tek <em style={italicStyle}>iplik</em>.
        </h1>
        <p style={ledeStyle}>
          1980'de Fethiye'de tek bir dikiş makinesiyle başladık. Bugün üçüncü
          kuşak aynı atölyede, aynı titizlikle çalışıyor. Aşağı kaydırarak
          yolculuğa girin — kronolojik tünelin içinden geçeceksiniz.
        </p>
        <div className="mono" style={hintStyle}>
          ↓ KAYDIR
        </div>
      </section>

      <TimelineTunnel milestones={MILESTONES} />

      <section className="v2-page" style={quoteStyle}>
        <blockquote style={quoteBlock}>
          <p style={quoteText}>
            "Bir formanın iyiliği, ilk dikişten son düğmeye kadar bizim
            <em style={italicStyle}> elimizden geçtiği </em>için belli olur."
          </p>
          <footer style={quoteFooter}>
            <span className="mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--v2-copper)' }}>
              KURUCU
            </span>
            <strong style={{ fontSize: 18, fontWeight: 600 }}>Ömer Güvençoğlu</strong>
            <span style={{ fontSize: 14, opacity: 0.6 }}>Fethiye, 1980'den beri</span>
          </footer>
        </blockquote>
      </section>

      <section className="v2-page" style={ctaStyle}>
        <p className="mono" style={{ ...tagStyle, color: 'var(--v2-copper)' }}>SIRADAKİ</p>
        <h2 style={ctaTitleStyle}>
          Tezgahın içine bakmak ister misiniz?
        </h2>
        <Link to="/v2/uretim" style={ctaButton}>
          Üretim Sürecine Git
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
  padding: '160px 32px 96px',
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
  letterSpacing: '0.18em',
  color: 'var(--v2-copper)',
  textTransform: 'uppercase',
  marginBottom: 24,
}
const titleStyle = {
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(64px, 12vw, 180px)',
  color: 'var(--v2-navy)',
  lineHeight: 0.9,
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
  maxWidth: '52ch',
  marginBottom: 64,
}
const hintStyle = {
  fontFamily: 'var(--v2-font-mono)',
  fontSize: 12,
  letterSpacing: '0.3em',
  color: 'var(--v2-mist)',
  alignSelf: 'flex-start',
}
const quoteStyle = {
  background: 'var(--v2-cream)',
  padding: '160px 32px',
  maxWidth: 1440,
  margin: '0 auto',
}
const quoteBlock = { margin: 0, maxWidth: 920 }
const quoteText = {
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(32px, 5vw, 64px)',
  lineHeight: 1.15,
  color: 'var(--v2-navy)',
  marginBottom: 40,
  fontWeight: 400,
  letterSpacing: '-0.02em',
  fontVariationSettings: '"opsz" 144',
  maxWidth: 'none',
}
const quoteFooter = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  color: 'var(--v2-ink)',
}
const ctaStyle = {
  background: 'var(--v2-navy)',
  color: 'var(--v2-cream)',
  padding: '160px 32px',
  maxWidth: 'none',
  textAlign: 'left',
}
const ctaTitleStyle = {
  fontFamily: 'var(--v2-font-display)',
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1,
  letterSpacing: '-0.03em',
  marginBottom: 48,
  fontWeight: 500,
  fontVariationSettings: '"opsz" 144',
  maxWidth: '20ch',
  color: 'var(--v2-cream)',
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
  transition: 'transform 300ms var(--v2-ease-out)',
}
