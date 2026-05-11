export default function GiantBrandMark() {
  return (
    <section
      className="v2-giant-brand"
      style={wrap}
      aria-hidden="true"
    >
      <span style={mark}>GÜVENÇOĞLU</span>
    </section>
  )
}

const wrap = {
  position: 'relative',
  height: '50vh',
  overflow: 'hidden',
  background: '#F5F5F0',
}

const mark = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 50%)',
  fontFamily: 'Fraunces, "Times New Roman", serif',
  fontSize: 'clamp(200px, 22vw, 380px)',
  fontWeight: 700,
  letterSpacing: '-0.04em',
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
