import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { CLIENT_SECTORS, CLIENTS } from '../data/clients.js'

/* ──────────────────────────────────────────────────────────────
   BizPage — "Biz ve İş Ortaklarımız" (Faz 2)
   Tasarım dili: INTERLOCKING. Tek düz krem zemin. Her bölümde bir
   tarafta beyaz metin paneli, diğer tarafta tek foto paneli; metin
   paneli fotoğrafın içine ~7% taşar. Bölümler arası sol/sağ ritmi
   döner. Mobilde dikey stack (metin üstte, foto altta), overlap yok.
   4 bölüm: Giriş · Hikâye/Miras · İş Ortakları (flip-card) · CTA.
   Scroll-anim YOK; referans flip-card'ı saf-CSS 3D (framer-motion yok).
   ────────────────────────────────────────────────────────────── */

// Sektör id → okunabilir etiket (flip-card ön yüz copper etiketi için).
const SECTOR_LABEL = Object.fromEntries(CLIENT_SECTORS.map((s) => [s.id, s.label]))

/* Editorial eyebrow — copper kısa çizgi + uppercase etiket (yan yana) */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

/* Interlocking bölüm — geniş foto arka katman + üstüne binen beyaz metin kartı.
   Asimetri: textStyle/photoStyle ile bölüm başına genişlik + dikey offset. */
function InterlockSection({ photo, alt, reverse, textStyle, photoStyle, children }) {
  return (
    <section
      className={`biz-il${reverse ? ' biz-il-rev' : ''}`}
      style={ilSection}
    >
      <Reveal className="biz-il-row" style={ilRow}>
        <div className="biz-il-text" style={{ ...ilText, ...textStyle }}>
          {children}
        </div>
        <div
          className="biz-il-photo"
          style={{ ...ilPhoto, ...photoStyle, backgroundImage: `url(${photo})` }}
          role="img"
          aria-label={alt}
        />
      </Reveal>
    </section>
  )
}

/* Flip-card referans — saf CSS 3D çevirme (rotateY 180, preserve-3d, backface
   hidden, ~500ms). Masaüstü hover; mobil/klavye için tap/Enter ile state (button).
   reduced-motion → CSS ile flip kapalı, iki yüz alt alta statik görünür. */
function FlipCard({ name, sector, note, since }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      className={`biz-flip${flipped ? ' is-flipped' : ''}`}
      style={flipCard}
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
    >
      <span className="biz-flip-inner" style={flipInner}>
        <span className="biz-flip-front" style={flipFront}>
          <span style={flipSector}>{sector}</span>
          <span style={flipName}>{name}</span>
        </span>
        <span className="biz-flip-back" style={flipBack}>
          <span style={flipNote}>{note}</span>
          <span style={flipSince}>{since} yılından beri</span>
        </span>
      </span>
    </button>
  )
}

export default function BizPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Biz ve İş Ortaklarımız — Güvençoğlu Tekstil"
        description="2001'den beri Fethiye'deki kendi üretim tesisimizde aynı standartla çalışıyoruz. Sağlık, otel ve okul kurumlarının kurumsal üniforma partneri."
        path="/biz-ve-is-ortaklarimiz"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Biz ve İş Ortaklarımız',
          url: 'https://guvencoglutekstil.com/biz-ve-is-ortaklarimiz',
          about: {
            '@type': 'Organization',
            name: 'Güvençoğlu Tekstil',
            foundingDate: '2001',
            description:
              "Türkiye'nin kurumsal üniforma uzmanı. Sağlık, otel ve okul kurumları için Fethiye'deki kendi üretim tesisinde, aracısız, sözleşmeli üretim.",
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Fethiye',
              addressRegion: 'Muğla',
              addressCountry: 'TR',
            },
          },
        }}
      />

      {/* ─── a) GİRİŞ — metin SOL / foto SAĞ — kart aşağı kayık ── */}
      <InterlockSection
        photo="/miras.webp"
        alt="Güvençoğlu Tekstil atölyesinden bir kare"
        textStyle={ilTextA}
        photoStyle={ilPhotoA}
      >
        <Eyebrow>2001’DEN BERİ · FETHİYE</Eyebrow>
        <h1 style={h1}>
          Biz ve <em style={em}>İş Ortaklarımız</em>
        </h1>
        <p style={lede}>
          Güvençoğlu Tekstil, kurumsal üniformayı bir tedarik kalemi değil, bir
          ortaklık olarak görür. Kendi üretim tesisimizde, aracısız ve sözleşmeli
          çalışır; sağlık, otel ve okul kurumlarının yanında uzun yıllar dururuz.
        </p>
      </InterlockSection>

      {/* ─── b) HİKÂYE / MİRAS — foto SOL / metin SAĞ (ritim döner) ─ */}
      <InterlockSection
        photo="/atolye-uretim.webp"
        alt="Fethiye'deki kendi üretim tesisimizden üretim hattı"
        reverse
        textStyle={ilTextB}
        photoStyle={ilPhotoB}
      >
        <Eyebrow>HİKÂYEMİZ</Eyebrow>
        <h2 style={h2}>
          Çeyrek asır, <em style={em}>değişmeyen</em> standart.
        </h2>
        <p style={body}>
          2001’de Fethiye’de tek bir dikiş makinesiyle başladık. Bugün aynı atölyede
          aynı aile çalışıyor — makine değişti, kumaş değişti, müşteri değişti;
          işin standardı değişmedi.
        </p>
        <p style={body}>
          Aynı kumaş tedarikçisiyle yirmi yılı aşkın çalışıyor, aynı boya tonunu yıllar
          boyunca eşliyoruz. Kritik dikişler, son kontrol ve etiket hâlâ insan elinden
          geçer. Tutarlılık bizde tesadüf değil, bir taahhüttür.
        </p>
      </InterlockSection>

      {/* ─── c) İŞ ORTAKLARI / REFERANSLAR — flip-card grid ───── */}
      <section style={refsWrap} aria-labelledby="biz-refs-title">
        <div style={refsInner}>
          <Reveal as="header" style={refsHead}>
            <span style={rule} aria-hidden="true" />
            <p style={eyebrow}>İŞ ORTAKLARIMIZ</p>
            <h2 id="biz-refs-title" style={h2}>
              Sağlık, otel ve okul kurumlarının <em style={em}>partneri</em>.
            </h2>
            <p style={body}>
              Bir kez başlayan ilişki ortalama altı yıl sürüyor. Birlikte
              çalıştığımız kurumlardan bir seçki — kartın üzerine gelin (ya da
              dokunun), kısa hikâyesi açılsın.
            </p>
          </Reveal>

          <Reveal className="biz-refs-grid" style={refsGrid} delay={120}>
            {CLIENTS.map((c) => (
              <FlipCard
                key={c.id}
                name={c.name}
                sector={SECTOR_LABEL[c.sector] || c.sector}
                note={c.note}
                since={c.since}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── e) CTA BANT — "Projenizi konuşalım" → /iletisim ─── */}
      <section style={ctaWrap} aria-labelledby="biz-cta-title">
        <Reveal style={ctaInner}>
          <span style={ruleLight} aria-hidden="true" />
          <h2 id="biz-cta-title" style={ctaTitle}>
            Projenizi konuşalım.
          </h2>
          <p style={ctaText}>
            Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde
            dönüyoruz.
          </p>
          <Link to="/iletisim" className="biz-outline-light cta-swap-btn" style={outlineBtnLight}>
            <span className="cta-swap">
              <span className="cta-swap-top">İletişime Geçin →</span>
              <span className="cta-swap-bot">0532 134 7602</span>
            </span>
          </Link>
        </Reveal>
      </section>

      <style>{`
        .biz-il-text, .biz-il-photo { box-sizing: border-box; }

        .biz-outline, .biz-outline-light {
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .biz-outline:hover, .biz-outline:focus-visible {
          background: var(--v2-navy, #2D3142);
          color: var(--v2-cream, #EFEAE0);
        }
        .biz-outline-light:hover, .biz-outline-light:focus-visible {
          background: var(--v2-cream, #EFEAE0);
          color: var(--v2-navy, #2D3142);
          border-color: var(--v2-cream, #EFEAE0);
        }
        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

        /* Flip-card referans — saf CSS 3D çevirme (hover masaüstü / .is-flipped tap) */
        .biz-flip { -webkit-tap-highlight-color: transparent; }
        .biz-flip:hover .biz-flip-inner,
        .biz-flip.is-flipped .biz-flip-inner { transform: rotateY(180deg); }
        .biz-flip:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 3px; border-radius: 14px; }

        @media (max-width: 860px) {
          .biz-il-row { flex-direction: column !important; }
          .biz-il-rev .biz-il-row { flex-direction: column !important; }
          .biz-il-text {
            flex: 1 1 auto !important;
            margin: 0 !important;
            width: 100% !important;
            transform: none !important;
            box-shadow: none !important;
            padding: clamp(28px, 7vw, 40px) clamp(22px, 6vw, 36px) clamp(8px, 3vw, 16px) !important;
          }
          .biz-il-photo {
            flex: 1 1 auto !important;
            width: 100% !important;
            min-height: clamp(260px, 56vw, 380px) !important;
          }
          .biz-refs-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1080px) {
          .biz-refs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .biz-outline, .biz-outline-light, .biz-outline span, .biz-outline-light span {
            transition: none !important;
          }
          /* Flip kapalı — iki yüz alt alta statik görünür (erişilebilir) */
          .biz-flip { min-height: 0 !important; }
          .biz-flip-inner { position: static !important; transform: none !important; transition: none !important; }
          .biz-flip-front, .biz-flip-back {
            position: static !important;
            transform: none !important;
            -webkit-backface-visibility: visible !important;
            backface-visibility: visible !important;
          }
          .biz-flip-back { margin-top: 10px; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet sabit: navy #2D3142, copper #D4A373,
   cream #EFEAE0, ink #1A1A1A, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */

const PAGE_BG = 'var(--v2-cream, #EFEAE0)'

/* inline eyebrow — copper kısa çizgi + uppercase etiket */
const eyebrowRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  margin: '0 0 20px',
}
const eyebrowDash = {
  width: 34,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
}
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}

const rule = {
  display: 'block',
  width: 48,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  marginBottom: 24,
}
const ruleLight = {
  display: 'block',
  width: 48,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  marginBottom: 28,
}
const eyebrow = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: '0 0 18px',
}
const em = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }

const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 76px)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
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
  margin: '0 0 24px',
  maxWidth: '20ch',
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
const body = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 18px',
  maxWidth: '52ch',
  textAlign: 'left',
}

/* INTERLOCKING bölüm */
const ilSection = {
  background: PAGE_BG,
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
/* taban metin kartı — genişlik + yatay overlap + dikey offset variant'tan gelir */
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

/* a) Giriş — foto geniş sağda (~62%), kart dar solda, AŞAĞI kayık, %10 binme */
const ilTextA = {
  flex: '0 1 46%',
  marginRight: '-10%',
  transform: 'translateY(52px)',
}
const ilPhotoA = {
  flex: '0 1 62%',
  minHeight: 'clamp(400px, 52vh, 580px)',
}
/* b) Hikâye — foto solda (~56%), kart genişçe sağda, YUKARI kayık, %12 binme
   (a'dan farklı genişlik + ters offset → rijit mirror değil) */
const ilTextB = {
  flex: '0 1 51%',
  marginLeft: '-12%',
  transform: 'translateY(-44px)',
}
const ilPhotoB = {
  flex: '0 1 56%',
  minHeight: 'clamp(440px, 56vh, 620px)',
}

/* c) FLIP-CARD REFERANS — saf CSS 3D çevirme */
const flipCard = {
  position: 'relative',
  appearance: 'none',
  WebkitAppearance: 'none',
  border: 'none',
  margin: 0,
  padding: 0,
  background: 'transparent',
  cursor: 'pointer',
  width: '100%',
  minHeight: 'clamp(172px, 22vh, 200px)',
  perspective: '1100px',
  fontFamily: 'inherit',
  textAlign: 'left',
}
const flipInner = {
  position: 'absolute',
  inset: 0,
  transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
  transformStyle: 'preserve-3d',
}
const flipFace = {
  position: 'absolute',
  inset: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  padding: 'clamp(22px, 2.3vw, 30px)',
  borderRadius: 14,
  overflow: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
}
const flipFront = {
  ...flipFace,
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  boxShadow: '0 1px 2px rgba(45, 49, 66, 0.04), 0 16px 36px -26px rgba(45, 49, 66, 0.3)',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}
const flipBack = {
  ...flipFace,
  background: 'var(--v2-navy, #2D3142)',
  transform: 'rotateY(180deg)',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: 12,
}
const flipSector = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}
const flipName = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(20px, 2vw, 26px)',
  lineHeight: 1.12,
  letterSpacing: '-0.01em',
  color: 'var(--v2-navy, #2D3142)',
}
const flipNote = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.55,
  color: 'var(--v2-cream, #EFEAE0)',
}
const flipSince = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(212, 163, 115, 0.95)',
}

/* d) İŞ ORTAKLARI / REFERANSLAR */
const refsWrap = {
  background: PAGE_BG,
  padding: 'clamp(56px, 9vw, 112px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const refsInner = {
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 5vw, 56px)',
  alignItems: 'flex-start',
}
const refsHead = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const refsGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(18px, 2.4vw, 28px)',
}
/* d) CTA BANT */
const ctaWrap = {
  background: 'var(--v2-navy, #2D3142)',
  padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 96px)',
}
const ctaInner = {
  maxWidth: 720,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
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
