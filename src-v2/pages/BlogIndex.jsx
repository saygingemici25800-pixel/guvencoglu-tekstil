import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { POSTS, SECTOR_LABELS, formatTrDate } from '../blog/index.js'

const ORIGIN = 'https://guvencoglutekstil.com'

/* ──────────────────────────────────────────────────────────────
   BlogIndex — /blog. MDX yazılarının kart gridi (en yeni üstte).
   3D yok; palet sabit. Reveal stagger.
   ────────────────────────────────────────────────────────────── */

export default function BlogIndex() {
  return (
    <PageTransition>
      <SEOHead
        title="Blog — Güvençoğlu Tekstil"
        description="Kurumsal üniforma, kumaş seçimi, üretim ve sektörel çözümler üzerine Güvençoğlu Tekstil'den notlar ve rehberler."
        path="/blog"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Güvençoğlu Tekstil Blog',
          url: `${ORIGIN}/blog`,
          description:
            'Kurumsal üniforma, kumaş seçimi, üretim ve sektörel çözümler üzerine yazılar.',
          hasPart: POSTS.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.frontmatter.title,
            datePublished: p.frontmatter.date,
            url: `${ORIGIN}/blog/${p.slug}`,
          })),
        }}
      />

      <section style={heroWrap} aria-labelledby="blog-title">
        <Reveal style={heroInner}>
          <span style={eyebrowRow}>
            <span style={eyebrowDash} aria-hidden="true" />
            <span style={eyebrowLabel}>BLOG</span>
          </span>
          <h1 id="blog-title" style={h1}>
            Notlar &amp; <em style={em}>rehberler</em>
          </h1>
          <p style={lede}>
            Kurumsal üniforma, kumaş seçimi, üretim süreci ve sektörel çözümler
            üzerine yazıyoruz.
          </p>
        </Reveal>
      </section>

      <section style={listWrap} aria-label="Blog yazıları">
        {POSTS.length === 0 ? (
          <p style={emptyNote}>Yakında ilk yazılarımız burada olacak.</p>
        ) : (
          <ul style={grid} className="blog-grid">
            {POSTS.map((p, i) => (
              <Reveal
                as="li"
                key={p.slug}
                style={cardWrap}
                delay={Math.min(i * 80, 320)}
              >
                <Link to={`/blog/${p.slug}`} className="blog-card" style={card}>
                  {p.frontmatter.cover ? (
                    <span className="blog-cover" style={coverWrap}>
                      <img
                        src={p.frontmatter.cover}
                        alt=""
                        loading="lazy"
                        style={coverImg}
                      />
                    </span>
                  ) : null}
                  <div style={cardBody}>
                    <div style={cardMeta}>
                      <span style={sectorTag}>
                        {SECTOR_LABELS[p.frontmatter.sector] || p.frontmatter.sector}
                      </span>
                      <span style={cardDate}>{formatTrDate(p.frontmatter.date)}</span>
                    </div>
                    <h2 style={cardTitle}>{p.frontmatter.title}</h2>
                    <p style={cardDesc}>{p.frontmatter.description}</p>
                    <span style={cardCta} className="blog-card-cta">
                      Oku <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <style>{`
        .blog-card {
          box-shadow: 0 1px 2px rgba(45, 49, 66, 0.04), 0 18px 40px -26px rgba(45, 49, 66, 0.3);
          transition: transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms ease;
        }
        .blog-card:hover, .blog-card:focus-visible {
          transform: translateY(-5px);
          box-shadow: 0 4px 10px rgba(45, 49, 66, 0.06), 0 30px 60px -30px rgba(45, 49, 66, 0.42);
        }
        .blog-cover img { transition: transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .blog-card:hover .blog-cover img, .blog-card:focus-visible .blog-cover img { transform: scale(1.045); }
        .blog-card-cta span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .blog-card:hover .blog-card-cta span, .blog-card:focus-visible .blog-card-cta span { transform: translateX(5px); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }
        @media (max-width: 860px) { .blog-grid { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) {
          .blog-card, .blog-card-cta span, .blog-cover img { transition: none !important; }
        }
      `}</style>
    </PageTransition>
  )
}

const eyebrowRow = { display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 20px' }
const eyebrowDash = { width: 34, height: 1, background: 'var(--v2-copper, #D4A373)', flexShrink: 0 }
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}
const em = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }

const heroWrap = {
  background: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 96px) clamp(40px, 6vw, 64px)',
}
const heroInner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(44px, 6.5vw, 84px)',
  lineHeight: 1.02,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 22px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '52ch',
}

const listWrap = {
  background: 'var(--v2-cream, #EFEAE0)',
  padding: '0 clamp(24px, 6vw, 96px) clamp(72px, 12vw, 140px)',
}
const grid = {
  maxWidth: 1100,
  margin: '0 auto',
  listStyle: 'none',
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'clamp(20px, 2.6vw, 32px)',
}
const cardWrap = { display: 'flex' }
const card = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  borderRadius: 16,
  overflow: 'hidden',
  textDecoration: 'none',
  color: 'inherit',
}
const coverWrap = {
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  background: 'rgba(45, 49, 66, 0.06)',
}
const coverImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
const cardBody = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  flex: 1,
  padding: 'clamp(24px, 2.6vw, 34px)',
}
const cardMeta = { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }
const sectorTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}
const cardDate = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.04em',
  color: 'var(--v2-muted, #5A5A5A)',
}
const cardTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(22px, 2.4vw, 30px)',
  lineHeight: 1.15,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
}
const cardDesc = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
}
const cardCta = {
  marginTop: 'auto',
  paddingTop: 8,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--v2-navy, #2D3142)',
  display: 'inline-flex',
  gap: 8,
}
const emptyNote = {
  maxWidth: 1100,
  margin: '0 auto',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  color: 'var(--v2-muted, #5A5A5A)',
}
