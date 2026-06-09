import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import { CLIENT_SECTORS, CLIENTS } from '../data/clients.js'

/* ──────────────────────────────────────────────────────────────
   BizPage — "Biz ve İş Ortaklarımız" (Faz 2)
   Tasarım dili: INTERLOCKING. Tek düz krem zemin. Her bölümde bir
   tarafta beyaz metin paneli, diğer tarafta tek foto paneli; metin
   paneli fotoğrafın içine ~7% taşar. Bölümler arası sol/sağ ritmi
   döner. Mobilde dikey stack (metin üstte, foto altta), overlap yok.
   5 bölüm: Giriş · Hikâye/Miras · Güven bloğu · İş Ortakları · CTA.
   3D/Canvas/scroll-anim YOK.
   ────────────────────────────────────────────────────────────── */

// Sektör grupları — ReferencesV2 / clients.js içeriğinden türetilir.
const SECTOR_GROUPS = CLIENT_SECTORS.map((s) => ({
  id: s.id,
  label: s.label,
  count: s.count,
  examples: CLIENTS.filter((c) => c.sector === s.id)
    .slice(0, 3)
    .map((c) => c.name),
}))

const TRUST_METRICS = [
  {
    num: '25.000+',
    label: 'AYLIK ÜRETİM KAPASİTESİ',
    hint: 'Kendi tesisimizde, parça / ay',
  },
  {
    num: '%98',
    label: 'ZAMANINDA TESLİMAT',
    hint: 'Söz verilen tarihte, sözleşmeli',
  },
  {
    num: '3 Aşama',
    label: 'KALİTE KONTROL',
    hint: 'Kesim · dikim · paketleme öncesi',
  },
]

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
      <div className="biz-il-row" style={ilRow}>
        <div className="biz-il-text" style={{ ...ilText, ...textStyle }}>
          {children}
        </div>
        <div
          className="biz-il-photo"
          style={{ ...ilPhoto, ...photoStyle, backgroundImage: `url(${photo})` }}
          role="img"
          aria-label={alt}
        />
      </div>
    </section>
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
        photo="/miras.jpg"
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
        photo="/atolye-uretim.jpg"
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

      {/* ─── c) GÜVEN BLOĞU — düz krem, 3 metrik, foto yok ───── */}
      <section style={trustWrap} aria-labelledby="biz-trust-title">
        <div style={trustInner}>
          <header style={trustHead}>
            <span style={rule} aria-hidden="true" />
            <p style={eyebrow}>NEDEN GÜVENÇOĞLU</p>
            <h2 id="biz-trust-title" style={h2}>
              Sözümüzü <em style={em}>rakamlar</em> tutar.
            </h2>
          </header>

          <div className="biz-trust-grid" style={trustGrid}>
            {TRUST_METRICS.map((m) => (
              <div key={m.label} style={trustCell}>
                <span style={trustNum}>{m.num}</span>
                <span style={trustLabel}>{m.label}</span>
                <span style={trustHint}>{m.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── d) İŞ ORTAKLARI / REFERANSLAR — sektörel grid ───── */}
      <section style={refsWrap} aria-labelledby="biz-refs-title">
        <div style={refsInner}>
          <header style={refsHead}>
            <span style={rule} aria-hidden="true" />
            <p style={eyebrow}>İŞ ORTAKLARIMIZ</p>
            <h2 id="biz-refs-title" style={h2}>
              Sağlık, otel ve okul kurumlarının <em style={em}>partneri</em>.
            </h2>
            <p style={body}>
              Bir kez başlayan ilişki ortalama altı yıl sürüyor. Sektörlere göre,
              birlikte çalıştığımız kurumlardan bir seçki:
            </p>
          </header>

          <div className="biz-refs-grid" style={refsGrid}>
            {SECTOR_GROUPS.map((g) => (
              <article key={g.id} style={refCard}>
                <div style={refCardTop}>
                  <h3 style={refCardTitle}>{g.label}</h3>
                  <span style={refCardCount}>{g.count} kurum</span>
                </div>
                <ul style={refList}>
                  {g.examples.map((name) => (
                    <li key={name} style={refListItem}>
                      {name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── e) CTA BANT — "Projenizi konuşalım" → /iletisim ─── */}
      <section style={ctaWrap} aria-labelledby="biz-cta-title">
        <div style={ctaInner}>
          <span style={ruleLight} aria-hidden="true" />
          <h2 id="biz-cta-title" style={ctaTitle}>
            Projenizi konuşalım.
          </h2>
          <p style={ctaText}>
            Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde
            dönüyoruz.
          </p>
          <Link to="/iletisim" className="biz-outline-light" style={outlineBtnLight}>
            İletişime Geçin <span aria-hidden="true">→</span>
          </Link>
        </div>
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
        .biz-outline span, .biz-outline-light span {
          display: inline-block;
          transition: transform 260ms cubic-bezier(0.16,1,0.3,1);
        }
        .biz-outline:hover span, .biz-outline:focus-visible span,
        .biz-outline-light:hover span, .biz-outline-light:focus-visible span {
          transform: translateX(5px);
        }
        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

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
          .biz-trust-grid { grid-template-columns: 1fr !important; }
          .biz-refs-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1080px) {
          .biz-refs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .biz-outline, .biz-outline-light, .biz-outline span, .biz-outline-light span {
            transition: none !important;
          }
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

/* c) GÜVEN BLOĞU */
const trustWrap = {
  background: PAGE_BG,
  padding: 'clamp(56px, 9vw, 112px) clamp(24px, 6vw, 96px)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
}
const trustInner = {
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 5vw, 64px)',
  alignItems: 'flex-start',
}
const trustHead = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const trustGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(28px, 4vw, 56px)',
}
const trustCell = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignItems: 'flex-start',
  paddingTop: 28,
  borderTop: '2px solid var(--v2-copper, #D4A373)',
}
const trustNum = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 5vw, 60px)',
  lineHeight: 1,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
}
const trustLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-ink, #1A1A1A)',
}
const trustHint = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
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
const refCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  padding: 'clamp(24px, 2.6vw, 34px)',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.12)',
}
const refCardTop = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'flex-start',
}
const refCardTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(20px, 2vw, 25px)',
  lineHeight: 1.15,
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
}
const refCardCount = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}
const refList = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  paddingTop: 18,
}
const refListItem = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.5,
  color: 'var(--v2-ink, #1A1A1A)',
}

/* e) CTA BANT */
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
