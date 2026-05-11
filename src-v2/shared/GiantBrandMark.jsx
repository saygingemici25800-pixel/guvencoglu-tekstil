export default function GiantBrandMark() {
  return (
    <section
      className="v2-giant-brand"
      style={wrap}
      aria-hidden="true"
    >
      <span style={mark}>GUVENCOGLU</span>
      <style>{`
        /* Kill FooterV2 marginTop only when GiantBrandMark exists on the page */
        .v2-root:has(.v2-giant-brand) > footer {
          margin-top: 0 !important;
        }
      `}</style>
    </section>
  )
}

const wrap = {
  position: 'relative',
  /* Section height = ~57% of text font-size → bottom 40-45% of glyphs is clipped */
  height: 'clamp(80px, 9vw, 160px)',
  overflow: 'hidden',
  background: '#F5F5F0',
  margin: 0,
  padding: 0,
  display: 'block',
}

const mark = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  fontFamily: 'Fraunces, "Times New Roman", serif',
  fontSize: 'clamp(140px, 16vw, 280px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  backgroundImage: 'linear-gradient(90deg, #0A2463 0%, #D4A373 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  userSelect: 'none',
  pointerEvents: 'none',
}
