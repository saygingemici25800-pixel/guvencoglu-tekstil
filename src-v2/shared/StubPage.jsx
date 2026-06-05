import SEOHead from './SEOHead.jsx'

/* Faz 1 yer tutucu sayfa — gerçek içerik sonraki fazlarda gelecek.
   Paletli, minimal: eyebrow + başlık + "içerik yakında". */
export default function StubPage({
  title,
  eyebrow = 'GÜVENÇOĞLU TEKSTİL',
  note = 'İçerik yakında.',
  path,
}) {
  return (
    <main style={wrap}>
      <SEOHead title={`${title} — Güvençoğlu Tekstil`} path={path} />
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h1 style={h1Style}>{title}</h1>
      <p style={noteStyle}>{note}</p>
    </main>
  )
}

const wrap = {
  minHeight: '100vh',
  background: 'var(--v2-cream, #EFEAE0)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: 16,
  padding: 'clamp(140px, 18vh, 200px) clamp(24px, 6vw, 48px) clamp(64px, 10vh, 120px)',
}
const eyebrowStyle = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const h1Style = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(36px, 6vw, 72px)',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
  maxWidth: '18ch',
}
const noteStyle = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 'clamp(15px, 1.4vw, 18px)',
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
}
