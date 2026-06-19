/* SocialLinks — Instagram + Facebook (inline SVG, lucide YOK).
   Renkler bağlamdan miras (footer: krem · İletişim: navy); hover → var(--v2-copper)
   (açık zeminde kırmızı, footer'da krem). target=_blank + rel=noopener noreferrer +
   aria-label. SOCIAL_SAMEAS schema sameAs için dışa verilir. */

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/guvencogluteks/' },
  { label: 'Facebook', href: 'https://www.facebook.com/p/Güvençoğlu-Tekstil-100069832747723/?locale=tr_TR' },
]

export const SOCIAL_SAMEAS = SOCIAL.map((s) => s.href)

function Icon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="2" width="20" height="20" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  // Facebook
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22A10 10 0 0 0 22 12.06z" />
    </svg>
  )
}

export default function SocialLinks({ style, label = 'Sosyal medya' }) {
  return (
    <div className="social-row" style={{ display: 'inline-flex', gap: 10, ...style }} role="list" aria-label={label}>
      {SOCIAL.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.label} (yeni sekmede açılır)`}
          className="social-link"
          style={socialLink}
          role="listitem"
        >
          <Icon name={s.label} />
        </a>
      ))}
      <style>{`
        .social-link { color: inherit; opacity: 0.82; transition: color 200ms ease, opacity 200ms ease, border-color 200ms ease; }
        .social-link:hover, .social-link:focus-visible { color: var(--v2-copper, #9A0002); opacity: 1; border-color: currentColor; }
        .social-link:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .social-link { transition: none !important; } }
      `}</style>
    </div>
  )
}

const socialLink = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  borderRadius: 999,
  border: '1px solid rgba(128, 128, 128, 0.34)',
  textDecoration: 'none',
  boxSizing: 'border-box',
}
