const ITEMS = [
  ['Okul Forması', 'Pamuk · Polyester'],
  ['Kurumsal Üniforma', 'Premium Kumaş'],
  ['İş Elbisesi', 'Dayanıklı'],
  ['Medikal Üniforma', 'Antimikrobiyal'],
  ['Baskı', 'Sublime · Serigrafi'],
  ['Nakış', 'Logo · Marka'],
  ['Aracısız', 'Kendi Tesis'],
  ['Fethiye Üretimi', 'Made in Fethiye'],
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map(([head, sub], i) => (
          <span className="marquee__item" key={`${head}-${i}`}>
            <span className="marquee__dot" />
            <span>{head}</span>
            <span>·</span>
            <span>{sub}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
