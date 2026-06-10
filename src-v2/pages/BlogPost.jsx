import { Link, useParams } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { getPostBySlug, SECTOR_LABELS, formatTrDate } from '../blog/index.js'

const ORIGIN = 'https://guvencoglutekstil.com'

/* ──────────────────────────────────────────────────────────────
   BlogPost — /blog/:slug. MDX gövdesini okunabilir tipografiyle render
   eder. SEOHead: frontmatter title/description + Article JSON-LD.
   ────────────────────────────────────────────────────────────── */

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <PageTransition>
        <SEOHead
          title="Yazı bulunamadı — Güvençoğlu Tekstil"
          description="Aradığınız blog yazısı bulunamadı."
          path={`/blog/${slug || ''}`}
        />
        <section style={notFoundWrap}>
          <p style={eyebrowLabel}>404</p>
          <h1 style={h1}>Yazı bulunamadı.</h1>
          <Link to="/blog" className="bp-link" style={backLink}>
            <span aria-hidden="true">←</span> Tüm yazılar
          </Link>
        </section>
      </PageTransition>
    )
  }

  const { Component, frontmatter: fm } = post
  const url = `${ORIGIN}/blog/${post.slug}`
  const ogImage = fm.cover ? `${ORIGIN}${fm.cover}` : undefined

  return (
    <PageTransition>
      <SEOHead
        title={`${fm.title} — Güvençoğlu Tekstil`}
        description={fm.description}
        path={`/blog/${post.slug}`}
        ogImage={ogImage}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: fm.title,
          description: fm.description,
          datePublished: fm.date,
          dateModified: fm.date,
          ...(ogImage ? { image: ogImage } : {}),
          author: { '@type': 'Organization', name: 'Güvençoğlu Tekstil' },
          publisher: {
            '@type': 'Organization',
            name: 'Güvençoğlu Tekstil',
            logo: { '@type': 'ImageObject', url: `${ORIGIN}/logo-tekstil.png` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        }}
      />

      <article style={pageWrap}>
        <Reveal style={headWrap}>
          <Link to="/blog" className="bp-link" style={backLink}>
            <span aria-hidden="true">←</span> Tüm yazılar
          </Link>
          <div style={metaRow}>
            <span style={sectorTag}>
              {SECTOR_LABELS[fm.sector] || fm.sector}
            </span>
            <span style={metaDot} aria-hidden="true">·</span>
            <span style={metaText}>{formatTrDate(fm.date)}</span>
            {fm.readingTime ? (
              <>
                <span style={metaDot} aria-hidden="true">·</span>
                <span style={metaText}>{fm.readingTime} dk okuma</span>
              </>
            ) : null}
          </div>
          <h1 style={h1}>{fm.title}</h1>
          {fm.description ? <p style={lede}>{fm.description}</p> : null}
        </Reveal>

        {fm.cover ? (
          <div
            style={{ ...cover, backgroundImage: `url(${fm.cover})` }}
            role="img"
            aria-label={fm.title}
          />
        ) : null}

        <Reveal className="blog-prose" style={prose}>
          <Component />
        </Reveal>

        <footer style={footer}>
          <h2 style={ctaTitle}>Projenizi konuşalım.</h2>
          <p style={ctaText}>
            Kurumunuza özel üniforma için 48 saat içinde teklif çıkarıyoruz.
          </p>
          <div style={footerActions}>
            <Link to="/iletisim" className="bp-outline" style={outlineBtn}>
              İletişime Geçin <span aria-hidden="true">→</span>
            </Link>
            <Link to="/blog" className="bp-link bp-link-light" style={backLinkLight}>
              <span aria-hidden="true">←</span> Tüm yazılar
            </Link>
          </div>
        </footer>
      </article>

      <style>{`
        .bp-link span, .bp-outline span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .bp-link { transition: color 220ms ease; }
        .bp-link:hover, .bp-link:focus-visible { color: var(--v2-copper, #D4A373); }
        .bp-link:hover span, .bp-link:focus-visible span { transform: translateX(-4px); }
        .bp-outline { transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .bp-outline:hover, .bp-outline:focus-visible {
          background: var(--v2-cream, #EFEAE0); color: var(--v2-navy, #2D3142); border-color: var(--v2-cream, #EFEAE0);
        }
        .bp-outline:hover span, .bp-outline:focus-visible span { transform: translateX(5px); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

        .blog-prose { font-family: var(--v2-font-body, sans-serif); color: var(--v2-ink, #1A1A1A); }
        .blog-prose > * { margin: 0 0 1.25em; }
        .blog-prose > *:last-child { margin-bottom: 0; }
        .blog-prose p { font-size: 18px; line-height: 1.75; }
        .blog-prose h2 {
          font-family: var(--v2-font-display, serif); font-weight: 400;
          font-size: clamp(26px, 3vw, 36px); line-height: 1.2; letter-spacing: -0.015em;
          color: var(--v2-navy, #2D3142); margin: 1.8em 0 0.6em;
        }
        .blog-prose h3 {
          font-family: var(--v2-font-display, serif); font-weight: 400;
          font-size: clamp(20px, 2.2vw, 26px); line-height: 1.25;
          color: var(--v2-navy, #2D3142); margin: 1.5em 0 0.5em;
        }
        .blog-prose a { color: var(--v2-copper, #D4A373); text-decoration: underline; text-underline-offset: 3px; }
        .blog-prose a:hover { text-decoration-thickness: 2px; }
        .blog-prose strong { color: var(--v2-navy, #2D3142); font-weight: 600; }
        .blog-prose ul, .blog-prose ol { padding-left: 1.3em; }
        .blog-prose li { font-size: 18px; line-height: 1.7; margin-bottom: 0.5em; }
        .blog-prose blockquote {
          margin: 1.6em 0; padding: 4px 0 4px 24px;
          border-left: 2px solid var(--v2-copper, #D4A373);
          font-family: var(--v2-font-display, serif); font-style: italic;
          font-size: clamp(19px, 2.2vw, 24px); line-height: 1.45; color: var(--v2-navy, #2D3142);
        }
        .blog-prose blockquote p { font-size: inherit; line-height: inherit; }
      `}</style>
    </PageTransition>
  )
}

/* ─── styles ─── */
const PAGE_BG = 'var(--v2-cream, #EFEAE0)'

const pageWrap = {
  background: PAGE_BG,
  padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 48px) clamp(72px, 12vw, 140px)',
}
const headWrap = {
  maxWidth: '46rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const backLink = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--v2-muted, #5A5A5A)',
  textDecoration: 'none',
  marginBottom: 28,
}
const metaRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
  marginBottom: 18,
}
const sectorTag = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}
const metaText = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  color: 'var(--v2-muted, #5A5A5A)',
}
const metaDot = { color: 'var(--v2-muted, #5A5A5A)', opacity: 0.6 }
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(34px, 5vw, 60px)',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 20px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 19,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
}
const cover = {
  maxWidth: '60rem',
  margin: 'clamp(40px, 6vw, 64px) auto 0',
  aspectRatio: '16 / 8',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}
const prose = {
  maxWidth: '46rem',
  margin: 'clamp(40px, 6vw, 64px) auto 0',
}
const footer = {
  maxWidth: '46rem',
  margin: 'clamp(56px, 8vw, 88px) auto 0',
  paddingTop: 'clamp(36px, 5vw, 56px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const ctaTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 3vw, 38px)',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 12px',
}
const ctaText = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 28px',
  maxWidth: '44ch',
}
const footerActions = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  flexWrap: 'wrap',
}
const outlineBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  border: '1px solid var(--v2-navy, #2D3142)',
  color: 'var(--v2-navy, #2D3142)',
  background: 'transparent',
  padding: '15px 30px',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  minHeight: 44,
  boxSizing: 'border-box',
}
const backLinkLight = { ...backLink, marginBottom: 0 }
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  color: 'var(--v2-copper, #D4A373)',
  margin: '0 0 14px',
}
const notFoundWrap = {
  background: PAGE_BG,
  minHeight: '70vh',
  padding: 'clamp(140px, 20vh, 220px) clamp(24px, 6vw, 48px) clamp(72px, 12vw, 140px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: '46rem',
  marginLeft: 'auto',
  marginRight: 'auto',
}
