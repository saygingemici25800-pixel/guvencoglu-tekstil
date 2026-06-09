import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { STATIONS } from '../data/stations.js'
import { SERVICES } from '../data/services.js'

/* ──────────────────────────────────────────────────────────────
   HizmetlerPage — /hizmetler (Faz 3)
   Mevcut desen: BizPage interlocking (geniş foto arka katman + üstüne
   binen beyaz kart, ~%10 binme, gölge 0 24px 50px -28px, dikey offset
   asimetri, ritim sol/sağ dönüşümlü) + <Reveal> (one-shot).
   İçerik kaynağı: STATIONS (üretim adımları) · SERVICES (hizmet kalemleri).
   Sektörler EŞİT AĞIRLIK (sağlık/otel/okul aynı genişlik). 3D yok.
   ────────────────────────────────────────────────────────────── */

const SECTORS = [
  {
    id: 'saglik',
    label: 'Sağlık',
    photo: '/saglik-main.jpg',
    alt: 'Sağlık personeli üniforması',
    desc: 'Hastane, klinik, eczane, laboratuvar ve diş kliniklerinin personeli için hijyenik, dayanıklı ve kurumsal medikal kıyafetler.',
    items: [
      'Doktor & hemşire formaları (scrub takımları)',
      'Hekim önlüğü ve laboratuvar önlükleri',
      'Eczane ve resepsiyon kıyafetleri',
      'Kolay yıkanır, yüksek dayanımlı kumaşlar',
    ],
  },
  {
    id: 'otel',
    label: 'Otel',
    photo: '/otel-main.jpg',
    alt: 'Otel personeli üniforması',
    desc: 'Resepsiyondan mutfağa, housekeeping’den spa’ya kadar otel ekiplerinin tüm departmanları için kurumsal kıyafet.',
    items: [
      'Resepsiyon & önbüro takımları',
      'Restoran, servis ve mutfak (şef) kıyafetleri',
      'Housekeeping ve teknik personel üniformaları',
      'Spa & wellness kıyafetleri',
    ],
  },
  {
    id: 'okul',
    label: 'Okul',
    photo: '/okul-main.jpg',
    alt: 'Okul üniforması',
    desc: 'Anaokulundan liseye, kolej ve özel okullar için dayanıklı, rahat ve kurum kimliğine uygun üniformalar.',
    items: [
      'Anaokulu, ilkokul, ortaokul ve lise formaları',
      'Gömlek, pantolon, etek, hırka ve kazak',
      'Eşofman ve beden eğitimi takımları',
      'Nakışlı okul logosu, sınıf/isim baskısı',
    ],
  },
]

/* Editorial eyebrow — copper kısa çizgi + uppercase etiket */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

/* Interlocking bölüm — geniş foto + üstüne binen beyaz kart, Reveal'lı.
   reverse → desktop'ta foto sola (row-reverse), kart sağa biner. */
function InterlockSection({ photo, alt, reverse, textStyle, photoStyle, children }) {
  return (
    <section className={`hz-il${reverse ? ' hz-il-rev' : ''}`} style={ilSection}>
      <Reveal className="hz-il-row" style={ilRow}>
        <div className="hz-il-text" style={{ ...ilText, ...textStyle }}>
          {children}
        </div>
        <div
          className="hz-il-photo"
          style={{ ...ilPhoto, ...photoStyle, backgroundImage: `url(${photo})` }}
          role="img"
          aria-label={alt}
        />
      </Reveal>
    </section>
  )
}

export default function HizmetlerPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Hizmetler — Güvençoğlu Tekstil"
        description="Konfeksiyon, nakış, baskı, özel tasarım, toplu üretim ve B2B çözümler. Sağlık, otel ve okul kurumları için Fethiye'deki kendi tesisimizde, aracısız, uçtan uca üretim."
        path="/hizmetler"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Güvençoğlu Tekstil Hizmetleri',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: s.title,
              description: s.tagline,
              provider: { '@type': 'Organization', name: 'Güvençoğlu Tekstil' },
            },
          })),
        }}
      />

      {/* ─── 1) GİRİŞ — interlocking (h1) ─────────────────────── */}
      <InterlockSection
        photo="/atolye-uretim.jpg"
        alt="Fethiye'deki kendi üretim tesisimizden üretim hattı"
        textStyle={ilTextIntro}
        photoStyle={ilPhotoIntro}
      >
        <Eyebrow>NE YAPIYORUZ</Eyebrow>
        <h1 style={h1}>
          Hizmet<em style={em}>ler</em>
        </h1>
        <p style={lede}>
          Tasarımdan dikişe, nakıştan baskıya — kurumsal tekstilin her aşaması
          Fethiye’deki kendi tesisimizde. Sağlık, otel ve okul kurumları için
          aracısız, uçtan uca üretim ve hizmet.
        </p>
      </InterlockSection>

      {/* ─── 2) ÜRETİM SÜRECİ — numaralı adım şeridi (STATIONS) ── */}
      <section style={stepWrap} aria-labelledby="hz-step-title">
        <div style={stepInner}>
          <Reveal as="header" style={stepHead}>
            <Eyebrow>ÜRETİM SÜRECİ</Eyebrow>
            <h2 id="hz-step-title" style={h2Light}>
              Hammaddeden teslimata, <em style={em}>yedi</em> adım.
            </h2>
            <p style={ledeLight}>
              Bir kumaş parçası fabrika kapısından çıkana kadar yedi ayrı elden,
              yedi ayrı kontrolden geçer. Her adım kendi tesisimizde.
            </p>
          </Reveal>

          <ol style={stepGrid} className="hz-step-grid">
            {STATIONS.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                style={stepCard}
                delay={Math.min(i * 70, 360)}
              >
                <span style={stepNum}>{String(i + 1).padStart(2, '0')}</span>
                <span style={stepMono}>{s.mono}</span>
                <h3 style={stepTitle}>{s.title}</h3>
                <p style={stepDesc}>{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 3) SEKTÖREL ÇÖZÜMLER — 3 interlock, EŞİT ağırlık ─── */}
      <section style={sectorsWrap} aria-labelledby="hz-sectors-title">
        <Reveal style={sectorsHead}>
          <Eyebrow>SEKTÖREL ÇÖZÜMLER</Eyebrow>
          <h2 id="hz-sectors-title" style={h2}>
            Her sektörün <em style={em}>kendi ihtiyacı</em> var.
          </h2>
          <p style={body}>
            Sağlık, otel ve okul kurumlarının her biri için ayrı ürün hattı,
            ayrı kumaş ve ayrı standart — hepsi eşit özenle.
          </p>
        </Reveal>
      </section>

      {SECTORS.map((s, i) => {
        const reverse = i % 2 === 1
        return (
          <InterlockSection
            key={s.id}
            photo={s.photo}
            alt={s.alt}
            reverse={reverse}
            textStyle={reverse ? ilTextRight : ilTextLeft}
            photoStyle={ilPhotoSector}
          >
            <Eyebrow>{s.label.toLocaleUpperCase('tr-TR')}</Eyebrow>
            <h3 style={sectorTitle}>{s.label} kurumları</h3>
            <p style={body}>{s.desc}</p>
            <ul style={sectorList}>
              {s.items.map((it) => (
                <li key={it} style={sectorItem}>
                  <span style={sectorDot} aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </InterlockSection>
        )
      })}

      {/* ─── 4) HİZMET KALEMLERİ — SERVICES grid (sade) ───────── */}
      <section style={svcWrap} aria-labelledby="hz-svc-title">
        <div style={svcInner}>
          <Reveal as="header" style={svcHead}>
            <Eyebrow>HİZMET KALEMLERİ</Eyebrow>
            <h2 id="hz-svc-title" style={h2}>
              Altı hat, <em style={em}>tek çatı</em> altında.
            </h2>
          </Reveal>

          <Reveal style={svcGrid} className="hz-svc-grid" delay={120}>
            {SERVICES.map((s) => (
              <article key={s.id} style={svcCard}>
                <span style={svcNo}>{s.no}</span>
                <h3 style={svcTitle}>{s.title}</h3>
                <p style={svcTagline}>{s.tagline}</p>
                <ul style={svcFeatList}>
                  {s.features.map((f) => (
                    <li key={f} style={svcFeatItem}>
                      <span style={svcFeatDot} aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── 5) CTA BANT — navy → /iletisim ──────────────────── */}
      <section style={ctaWrap} aria-labelledby="hz-cta-title">
        <Reveal style={ctaInner}>
          <span style={ctaRule} aria-hidden="true" />
          <h2 id="hz-cta-title" style={ctaTitle}>
            Projenizi konuşalım.
          </h2>
          <p style={ctaText}>
            Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde
            dönüyoruz.
          </p>
          <Link to="/iletisim" className="hz-outline-light" style={outlineBtnLight}>
            İletişime Geçin <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <style>{`
        .hz-il-rev .hz-il-row { flex-direction: row-reverse; }
        .hz-il-text, .hz-il-photo { box-sizing: border-box; }

        .hz-outline-light {
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .hz-outline-light:hover, .hz-outline-light:focus-visible {
          background: var(--v2-cream, #EFEAE0);
          color: var(--v2-navy, #2D3142);
          border-color: var(--v2-cream, #EFEAE0);
        }
        .hz-outline-light span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .hz-outline-light:hover span, .hz-outline-light:focus-visible span { transform: translateX(5px); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

        @media (max-width: 860px) {
          .hz-il-row, .hz-il-rev .hz-il-row { flex-direction: column !important; }
          .hz-il-text {
            flex: 1 1 auto !important;
            margin: 0 !important;
            width: 100% !important;
            transform: none !important;
            box-shadow: none !important;
            padding: clamp(28px, 7vw, 40px) clamp(22px, 6vw, 36px) clamp(8px, 3vw, 16px) !important;
          }
          .hz-il-photo {
            flex: 1 1 auto !important;
            width: 100% !important;
            min-height: clamp(260px, 56vw, 380px) !important;
          }
          .hz-step-grid { grid-template-columns: 1fr !important; }
          .hz-svc-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1100px) {
          .hz-step-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hz-svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hz-outline-light, .hz-outline-light span { transition: none !important; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet: navy #2D3142, copper #D4A373, cream #EFEAE0,
   ink #1A1A1A, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */

const CREAM_BG = 'var(--v2-cream, #EFEAE0)'
const NAVY_BG = 'var(--v2-navy, #2D3142)'

/* eyebrow */
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

/* başlıklar / metin */
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(48px, 7vw, 92px)',
  lineHeight: 1.02,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 24px',
}
const h2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 3.6vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 22px',
  maxWidth: '20ch',
}
const h2Light = { ...h2, color: 'var(--v2-cream, #EFEAE0)' }
const sectorTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 3vw, 40px)',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 18px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '46ch',
  textAlign: 'left',
}
const ledeLight = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.65,
  color: 'rgba(239, 234, 224, 0.78)',
  margin: 0,
  maxWidth: '52ch',
  textAlign: 'left',
}
const body = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 20px',
  maxWidth: '50ch',
  textAlign: 'left',
}

/* INTERLOCKING */
const ilSection = {
  background: CREAM_BG,
  padding: 'clamp(56px, 9vw, 128px) clamp(24px, 6vw, 96px)',
  overflow: 'visible',
}
const ilRow = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}
const ilText = {
  position: 'relative',
  zIndex: 2,
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  padding: 'clamp(36px, 3.6vw, 60px)',
  boxShadow: '0 24px 50px -28px rgba(45, 49, 66, 0.45)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const ilPhoto = {
  zIndex: 1,
  alignSelf: 'stretch',
  minHeight: 'clamp(380px, 50vh, 560px)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}
/* Giriş — kart dar, foto geniş, aşağı kayık */
const ilTextIntro = { flex: '0 1 44%', marginRight: '-10%', transform: 'translateY(52px)' }
const ilPhotoIntro = { flex: '0 1 62%', minHeight: 'clamp(400px, 52vh, 580px)' }
/* Sektörler — EŞİT genişlik (üçü de 46/60), ritim sol/sağ + offset dönüşümlü */
const ilTextLeft = { flex: '0 1 46%', marginRight: '-10%', transform: 'translateY(44px)' }
const ilTextRight = { flex: '0 1 46%', marginLeft: '-10%', transform: 'translateY(-40px)' }
const ilPhotoSector = { flex: '0 1 60%', minHeight: 'clamp(400px, 52vh, 580px)' }

const sectorList = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}
const sectorItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #1A1A1A)',
}
const sectorDot = {
  width: 7,
  height: 7,
  borderRadius: 999,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
  marginTop: 9,
}

/* 2) ÜRETİM SÜRECİ — adım şeridi (navy) */
const stepWrap = {
  background: NAVY_BG,
  padding: 'clamp(64px, 9vw, 120px) clamp(24px, 6vw, 96px)',
}
const stepInner = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 5vw, 64px)',
}
const stepHead = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const stepGrid = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 'clamp(20px, 2.4vw, 32px)',
}
const stepCard = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 10,
  paddingTop: 22,
  borderTop: '1px solid rgba(212, 163, 115, 0.4)',
}
const stepNum = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 500,
  fontSize: 'clamp(44px, 5vw, 68px)',
  lineHeight: 1,
  letterSpacing: '-0.03em',
  color: 'var(--v2-copper, #D4A373)',
  marginBottom: 4,
}
const stepMono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(239, 234, 224, 0.55)',
}
const stepTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(20px, 2vw, 25px)',
  lineHeight: 1.15,
  color: 'var(--v2-cream, #EFEAE0)',
  margin: '2px 0 0',
}
const stepDesc = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.6,
  color: 'rgba(239, 234, 224, 0.7)',
  margin: 0,
}

/* 3) SEKTÖREL — bölüm başlığı */
const sectorsWrap = {
  background: CREAM_BG,
  padding: 'clamp(56px, 9vw, 112px) clamp(24px, 6vw, 96px) clamp(8px, 2vw, 24px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const sectorsHead = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

/* 4) HİZMET KALEMLERİ — grid (cream) */
const svcWrap = {
  background: CREAM_BG,
  padding: 'clamp(56px, 9vw, 120px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const svcInner = {
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 5vw, 56px)',
  alignItems: 'flex-start',
}
const svcHead = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const svcGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'clamp(18px, 2.2vw, 28px)',
}
const svcCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 'clamp(26px, 2.6vw, 36px)',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.12)',
}
const svcNo = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  color: 'var(--v2-copper, #D4A373)',
}
const svcTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(22px, 2.2vw, 28px)',
  lineHeight: 1.1,
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
}
const svcTagline = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.55,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: '0 0 6px',
}
const svcFeatList = {
  listStyle: 'none',
  margin: 0,
  padding: '14px 0 0',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}
const svcFeatItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.5,
  color: 'var(--v2-muted, #5A5A5A)',
}
const svcFeatDot = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
  marginTop: 8,
}

/* 5) CTA */
const ctaWrap = {
  background: NAVY_BG,
  padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 96px)',
}
const ctaInner = {
  maxWidth: 720,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
const ctaRule = {
  display: 'block',
  width: 48,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  marginBottom: 28,
}
const ctaTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(32px, 4.4vw, 56px)',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  color: 'var(--v2-cream, #EFEAE0)',
  margin: '0 0 18px',
}
const ctaText = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 17,
  lineHeight: 1.65,
  color: 'rgba(239, 234, 224, 0.78)',
  margin: '0 0 36px',
  maxWidth: '46ch',
}
const outlineBtnLight = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  border: '1px solid var(--v2-cream, #EFEAE0)',
  color: 'var(--v2-cream, #EFEAE0)',
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
