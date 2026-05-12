import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Yolculuk',
    items: [
      { label: 'Hikayemiz', to: '/hikayemiz' },
      { label: 'Üretim Süreci', to: '/uretim' },
      { label: 'Hizmetler', to: '/hizmetler' },
    ],
  },
  {
    title: 'Kurum',
    items: [
      { label: 'Referanslar', to: '/referanslar' },
      { label: 'İletişim', to: '/iletisim' },
    ],
  },
]

export default function FooterV2() {
  return (
    <footer
      style={{
        background: 'var(--v2-navy)',
        color: 'var(--v2-cream)',
        padding: '96px 32px 48px',
        marginTop: 128,
      }}
    >
      <div style={{ maxWidth: 'var(--v2-content-max)', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--v2-font-display)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, maxWidth: '24ch' }}>
              İpliği <em style={{ color: 'var(--v2-copper)' }}>hikayeye</em> dönüştürüyoruz.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="mono" style={{ fontFamily: 'var(--v2-font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-copper)', marginBottom: 16 }}>
                {c.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.items.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} style={{ fontSize: 15, opacity: 0.85 }}>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mono" style={{ fontFamily: 'var(--v2-font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-copper)', marginBottom: 16 }}>
              İletişim
            </h3>
            <address style={{ fontStyle: 'normal', fontSize: 15, opacity: 0.85, lineHeight: 1.7 }}>
              Fethiye, Muğla<br />
              Türkiye
            </address>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(245, 245, 240, 0.12)',
            fontSize: 13,
            opacity: 0.6,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="mono">© 1980 — {new Date().getFullYear()} Güvencoğlu Tekstil</span>
          <span className="mono">v2.0</span>
        </div>
      </div>
    </footer>
  )
}
