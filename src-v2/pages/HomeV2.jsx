import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import GlobalCanvas from '../../src/components/GlobalCanvas.jsx'

/* ──────────────────────────────────────────────────────────────
   HomeV2 — B2B kurumsal üniforma odaklı ana sayfa (DressBest ilhamlı)
   9 bölüm. Renk ritmi: cream → navy → cream → cream → navy → cream
   → navy → copper → footer (global). 3D sahnesi (GlobalCanvas) hero'da.
   ────────────────────────────────────────────────────────────── */

const SECTORS = [
  {
    title: 'Sağlık personeli kıyafetleri',
    sub: 'Hastane, klinik, eczane, laboratuvar, diş',
    to: '/v2/hizmetler',
  },
  {
    title: 'Otel personeli kıyafetleri',
    sub: 'Resepsiyon, restoran, housekeeping, spa, mutfak',
    to: '/v2/hizmetler',
  },
  {
    title: 'Okul üniformaları',
    sub: 'Anaokulu, ilkokul, ortaokul, lise, kolej',
    to: '/v2/hizmetler',
  },
]

const SERVICES = [
  { icon: 'design', title: 'Tasarım', sub: 'özel marka kimliği için' },
  { icon: 'sew', title: 'Konfeksiyon', sub: 'kendi tesis üretimi' },
  { icon: 'embroidery', title: 'Nakış', sub: 'logo, isim, sınıf no' },
  { icon: 'print', title: 'Baskı', sub: 'dijital, sublimasyon' },
  { icon: 'batch', title: 'Toplu Üretim', sub: 'B2B sözleşmeli siparişler' },
  { icon: 'logistics', title: 'Lojistik', sub: 'Türkiye geneli teslimat' },
]

const STATS = [
  { num: '46 Yıl', label: 'TECRÜBE' },
  { num: '1.500+', label: 'KURUMSAL MÜŞTERİ' },
  { num: '%100', label: 'KENDİ ÜRETİM' },
  { num: '48 Saat', label: 'TEKLİF SÜRESİ' },
]

const TESTIMONIALS = [
  {
    quote:
      'Sezon başında 350 personelin üniformasını 3 hafta içinde teslim aldık. Hiçbir aksaklık olmadı, ölçüler tek tek tuttu.',
    author: 'Otel Genel Müdürü',
    place: 'Fethiye',
  },
  {
    quote:
      '4 yıldır okul forması Güvençoğlu’ndan. Çocuklar 1 sezon giyiyor, kumaş hâlâ ilk günkü gibi.',
    author: 'Özel Kolej Müdürü',
    place: 'Muğla',
  },
]

function ServiceIcon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  }
  switch (name) {
    case 'design':
      return (
        <svg {...common}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      )
    case 'sew':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4L8.12 15.88" />
          <path d="M14.47 14.48L20 20" />
          <path d="M8.12 8.12L12 12" />
        </svg>
      )
    case 'embroidery':
      return (
        <svg {...common}>
          <path d="M3 21l4-1 11-11a2.83 2.83 0 0 0-4-4L3 16l-1 4z" />
          <path d="M13.5 6.5l4 4" />
          <circle cx="19" cy="5" r="1.4" />
        </svg>
      )
    case 'print':
      return (
        <svg {...common}>
          <path d="M6 9V3h12v6" />
          <rect x="4" y="9" width="16" height="8" rx="1.5" />
          <path d="M6 15h12v6H6z" />
          <circle cx="17" cy="12" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'batch':
      return (
        <svg {...common}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.27 6.96L12 12l8.73-5.04" />
          <path d="M12 22V12" />
        </svg>
      )
    case 'logistics':
      return (
        <svg {...common}>
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2" />
          <circle cx="18.5" cy="18.5" r="2" />
        </svg>
      )
    default:
      return null
  }
}

export default function HomeV2() {
  const year = new Date().getFullYear()

  return (
    <PageTransition>
      <SEOHead
        title="Güvençoğlu Tekstil — Türkiye'nin kurumsal üniforma uzmanı"
        description="Sağlık personeli, otel ekipleri ve okul üniformaları. 1980'den beri Fethiye'deki kendi üretim tesisimizde, aracısız, sözleşmeli üretim ve teslimat. 48 saatte teklif."
        path="/v2"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvençoğlu Tekstil',
          foundingDate: '1980',
          url: 'https://guvencoglutekstil.com/v2',
          description:
            "Türkiye'nin kurumsal üniforma uzmanı. Sağlık, otel ve okul üniformaları için kendi üretim tesisinde sözleşmeli üretim.",
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Fethiye',
            addressRegion: 'Muğla',
            addressCountry: 'TR',
          },
        }}
      />

      {/* 3D sahnesi — ambient fabric backdrop (KORUNDU) */}
      <GlobalCanvas />

      {/* ─── BÖLÜM 1 — HERO ─────────────────────────────────── */}
      <section className="hv2-hero" style={heroWrap} aria-labelledby="hv2-hero-title">
        <div style={heroInner}>
          <div className="hv2-hero-text" style={heroText}>
            <p className="hv2-rise" style={{ ...eyebrow, animationDelay: '40ms' }}>
              1980’DEN BERİ · FETHİYE · KENDİ ÜRETİM TESİSİ
            </p>

            <h1 id="hv2-hero-title" className="hv2-rise" style={{ ...h1, animationDelay: '120ms' }}>
              Türkiye’nin <em style={h1Accent}>kurumsal üniforma</em> uzmanı.
            </h1>

            <p className="hv2-rise" style={{ ...heroLede, animationDelay: '220ms' }}>
              Sağlık personeli, otel ekipleri, okul üniformaları. Kendi tesisimizde,
              aracısız, sözleşmenizdeki sayıda, taahhüt ettiğimiz tarihte.
            </p>

            <div className="hv2-rise hv2-hero-ctas" style={{ ...heroCtas, animationDelay: '320ms' }}>
              <Link to="/v2/iletisim" className="hv2-btn-primary" style={btnPrimary}>
                <span>Teklif Al</span>
                <span className="hv2-btn-arrow" style={btnArrow} aria-hidden="true">→</span>
              </Link>
              <Link to="/v2/hizmetler" className="hv2-btn-outline" style={btnOutline}>
                Çalıştığımız Sektörler
              </Link>
            </div>
          </div>

          <div className="hv2-hero-visual" style={heroVisual} aria-hidden="true">
            <div style={heroVisualFrame}>
              <div style={heroVisualWeave} />
              <div style={heroVisualGlow} />
              <span style={heroVisualTop}>FETHİYE · KENDİ ÜRETİM</span>
              <span style={heroVisualBottom}>1980 → {year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BÖLÜM 2 — GÜVEN ŞERİDİ ─────────────────────────── */}
      <section className="hv2-trust" style={trustWrap} aria-label="Rakamlarla Güvençoğlu">
        <div style={trustGrid} className="hv2-trust-grid">
          {STATS.map((s) => (
            <div key={s.label} style={trustCell}>
              <span style={trustNum}>{s.num}</span>
              <span style={trustLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BÖLÜM 3 — VAAT / SÖZ ───────────────────────────── */}
      <section className="hv2-promise" style={promiseWrap} aria-labelledby="hv2-promise-title">
        <div style={promiseInner}>
          <h2 id="hv2-promise-title" style={promiseH2}>
            Söz verdiğimiz iş, söz verdiğimiz tarihte teslim.
          </h2>
          <p style={prose}>
            Kurumsal üniforma seçimi sadece kumaş ve dikiş değildir. Personelinizin her
            günkü konforu, markanızın görünümü ve sürdürülebilir bir tedarik zinciri demektir.
          </p>
          <p style={prose}>
            Güvençoğlu Tekstil, 1980’den beri kendi üretim tesisinde, aracısız çalışıyor.
            Sağlık kurumlarından otellere, okullardan üretim tesislerine kadar 1.500’den fazla
            kurumun üniforma programını yönetiyoruz.
          </p>
          <p style={prose}>
            Sözleşmeli üretim, sözleşmeli teslimat, sözleşmeli kalite. 46 yıllık güvencemizle.
          </p>
          <Link to="/v2/hikayemiz" className="hv2-textlink" style={textLink}>
            Bizi Daha Yakından Tanıyın <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── BÖLÜM 4 — SEKTÖRLER ÖNİZLEME ───────────────────── */}
      <section className="hv2-sectors" style={sectorsWrap} aria-labelledby="hv2-sectors-title">
        <div style={sectorsInner}>
          <header style={sectionHead}>
            <p style={eyebrowDark}>ÇALIŞTIĞIMIZ SEKTÖRLER</p>
            <h2 id="hv2-sectors-title" style={h2Dark}>
              Her sektörün <em style={emDark}>kendi dili</em> vardır.
            </h2>
          </header>

          <div style={sectorsGrid} className="hv2-sectors-grid">
            {SECTORS.map((c) => (
              <Link key={c.title} to={c.to} className="hv2-sector-card" style={sectorCard}>
                <div
                  style={sectorMedia}
                  role="img"
                  aria-label={`${c.title} görseli`}
                />
                <div style={sectorBody}>
                  <h3 style={sectorTitle}>{c.title}</h3>
                  <p style={sectorSub}>{c.sub}</p>
                  <span className="hv2-card-cta" style={cardCta}>
                    Detayları gör <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/v2/hizmetler" className="hv2-textlink" style={textLink}>
            Diğer sektörler <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── BÖLÜM 5 — HİZMETLER ÖNİZLEME ───────────────────── */}
      <section className="hv2-services" style={servicesWrap} aria-labelledby="hv2-services-title">
        <div style={servicesInner}>
          <header style={sectionHead}>
            <p style={eyebrow}>HİZMETLERİMİZ</p>
            <h2 id="hv2-services-title" style={h2Light}>
              Sadece üretmiyoruz. <em style={h1Accent}>Üniforma programınızı</em> yönetiyoruz.
            </h2>
          </header>

          <div style={servicesGrid} className="hv2-services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} style={serviceCell}>
                <span style={serviceIconWrap}>
                  <ServiceIcon name={s.icon} />
                </span>
                <h3 style={serviceTitle}>{s.title}</h3>
                <p style={serviceSub}>{s.sub}</p>
              </div>
            ))}
          </div>

          <Link to="/v2/hizmetler" className="hv2-textlink hv2-textlink-copper" style={textLinkCopper}>
            Tüm Hizmetlerimiz <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── BÖLÜM 6 — SOSYAL KANIT / REFERANSLAR ───────────── */}
      <section className="hv2-refs" style={refsWrap} aria-labelledby="hv2-refs-title">
        <div style={refsInner}>
          <header style={sectionHead}>
            <p style={eyebrowDark}>REFERANSLARIMIZ</p>
            <h2 id="hv2-refs-title" style={h2Dark}>
              1.500’den fazla kurumun tercih ettiği partner.
            </h2>
          </header>

          <div style={refsGrid} className="hv2-refs-grid">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} style={refCard}>
                <span style={refQuoteMark} aria-hidden="true">“</span>
                <blockquote style={refQuote}>{t.quote}</blockquote>
                <figcaption style={refAuthor}>
                  — {t.author}, {t.place}
                </figcaption>
              </figure>
            ))}
          </div>

          <Link to="/v2/referanslar" className="hv2-textlink" style={textLink}>
            Tüm Referanslarımız <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── BÖLÜM 7 — HİKAYEMİZ KISA ───────────────────────── */}
      <section className="hv2-story" style={storyWrap} aria-labelledby="hv2-story-title">
        <div style={storyInner} className="hv2-story-inner">
          <div
            style={storyMedia}
            role="img"
            aria-label="1980’lerde Fethiye’deki ilk atölyeden bir kare"
          />
          <div style={storyText}>
            <p style={eyebrow}>HİKAYEMİZ</p>
            <h2 id="hv2-story-title" style={storyH2}>
              1980, Fethiye. Bir makina, bir söz.
            </h2>
            <p style={storyBody}>
              Ömer Güvenç, 1980’de Fethiye’de küçük bir atölyede ilk dikiş makinasını
              çalıştırdı. Söz tekti: kalite. 46 yıl sonra, üçüncü kuşak aynı atölyede aynı
              sözle çalışıyor. Bugün Türkiye genelinde 1.500’den fazla kuruma hizmet
              veriyoruz — ama hâlâ aynı Fethiye’de, aynı atölyede.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BÖLÜM 8 — SON CTA BANDI ────────────────────────── */}
      <section className="hv2-cta" style={ctaWrap} aria-labelledby="hv2-cta-title">
        <div style={ctaInner}>
          <h2 id="hv2-cta-title" style={ctaH2}>
            Üniforma programınız için bir konuşma başlatalım.
          </h2>
          <p style={ctaLede}>
            Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde size dönüyoruz.
          </p>
          <Link to="/v2/iletisim" className="hv2-btn-dark" style={btnDark}>
            <span>Teklif Al</span>
            <span className="hv2-btn-arrow" style={btnArrowDark} aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <style>{`
        .hv2-rise { opacity: 0; animation: hv2-rise 760ms cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes hv2-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hv2-btn-primary, .hv2-btn-dark {
          transition: transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease, background 280ms ease;
        }
        .hv2-btn-primary:hover, .hv2-btn-primary:focus-visible,
        .hv2-btn-dark:hover, .hv2-btn-dark:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(26,26,26,0.18);
        }
        .hv2-btn-arrow { transition: transform 280ms cubic-bezier(0.16,1,0.3,1); }
        .hv2-btn-primary:hover .hv2-btn-arrow, .hv2-btn-primary:focus-visible .hv2-btn-arrow,
        .hv2-btn-dark:hover .hv2-btn-arrow, .hv2-btn-dark:focus-visible .hv2-btn-arrow {
          transform: translateX(8px);
        }

        .hv2-btn-outline {
          transition: background 240ms ease, color 240ms ease, border-color 240ms ease;
        }
        .hv2-btn-outline:hover, .hv2-btn-outline:focus-visible {
          background: var(--v2-navy, #2D3142);
          color: var(--v2-cream, #EFEAE0);
        }

        .hv2-textlink { transition: color 220ms ease; }
        .hv2-textlink span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .hv2-textlink:hover span, .hv2-textlink:focus-visible span { transform: translateX(6px); }
        .hv2-textlink:hover, .hv2-textlink:focus-visible { color: var(--v2-copper, #D4A373); }
        .hv2-textlink-copper:hover, .hv2-textlink-copper:focus-visible { color: var(--v2-navy, #2D3142); }

        .hv2-sector-card { transition: transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease; }
        .hv2-sector-card:hover, .hv2-sector-card:focus-visible {
          transform: translateY(-6px);
          box-shadow: 0 22px 48px rgba(45,49,66,0.16);
        }
        .hv2-card-cta { background-image: linear-gradient(var(--v2-copper,#D4A373), var(--v2-copper,#D4A373));
          background-size: 0% 1.5px; background-repeat: no-repeat; background-position: 0 100%;
          transition: background-size 300ms cubic-bezier(0.16,1,0.3,1); padding-bottom: 2px; }
        .hv2-sector-card:hover .hv2-card-cta, .hv2-sector-card:focus-visible .hv2-card-cta {
          background-size: 100% 1.5px;
        }

        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

        @media (max-width: 980px) {
          .hv2-hero-text { max-width: 100% !important; }
          .hv2-story-inner { grid-template-columns: 1fr !important; }
          .hv2-refs-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .hv2-hero { min-height: auto !important; }
          .hv2-hero-visual { display: none !important; }
        }
        @media (max-width: 760px) {
          .hv2-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hv2-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hv2-sectors-grid { grid-template-columns: 1fr !important; }
          .hv2-hero-ctas { flex-direction: column !important; align-items: stretch !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv2-rise { animation: none !important; opacity: 1 !important; transform: none !important; }
          .hv2-btn-primary, .hv2-btn-dark, .hv2-btn-outline, .hv2-btn-arrow,
          .hv2-textlink, .hv2-textlink span, .hv2-sector-card, .hv2-card-cta {
            transition: none !important;
          }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES
   ────────────────────────────────────────────────────────────── */

const eyebrow = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 'clamp(11px, 1.1vw, 13px)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const eyebrowDark = { ...eyebrow }

/* BÖLÜM 1 — HERO */
const heroWrap = {
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  padding: 'clamp(112px, 16vh, 168px) clamp(20px, 5vw, 48px) clamp(64px, 9vw, 96px)',
}
const heroInner = {
  width: '100%',
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
  alignItems: 'center',
  gap: 'clamp(32px, 6vw, 80px)',
}
const heroText = { maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 24 }
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6.4vw, 84px)',
  lineHeight: 1.02,
  letterSpacing: '-0.025em',
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '18ch',
}
const h1Accent = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }
const heroLede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 'clamp(18px, 1.8vw, 19px)',
  lineHeight: 1.6,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '46ch',
}
const heroCtas = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 8 }
const btnPrimary = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 14,
  padding: '17px 30px',
  background: 'var(--v2-copper, #D4A373)',
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
  borderRadius: 'var(--v2-r-sm, 4px)',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 17,
  letterSpacing: '-0.005em',
  minHeight: 44,
}
const btnArrow = { fontSize: 19, display: 'inline-block' }
const btnOutline = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px 28px',
  background: 'transparent',
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
  border: '1.5px solid var(--v2-navy, #2D3142)',
  borderRadius: 'var(--v2-r-sm, 4px)',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 17,
  minHeight: 44,
}
const heroVisual = { position: 'relative', minHeight: 'min(70vh, 540px)' }
const heroVisualFrame = {
  position: 'relative',
  height: '100%',
  minHeight: 'min(70vh, 540px)',
  borderRadius: 'var(--v2-r-md, 8px)',
  border: '1px solid rgba(45, 49, 66, 0.22)',
  overflow: 'hidden',
  background:
    'linear-gradient(155deg, rgba(45,49,66,0.92) 0%, rgba(45,49,66,0.78) 45%, rgba(212,163,115,0.85) 100%)',
  boxShadow: '0 30px 70px rgba(45,49,66,0.22)',
}
const heroVisualWeave = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'repeating-linear-gradient(90deg, rgba(239,234,224,0.07) 0 1px, transparent 1px 9px), repeating-linear-gradient(0deg, rgba(239,234,224,0.07) 0 1px, transparent 1px 9px)',
  mixBlendMode: 'screen',
}
const heroVisualGlow = {
  position: 'absolute',
  width: 360,
  height: 360,
  right: -80,
  top: -60,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(241,214,179,0.55) 0%, transparent 65%)',
  filter: 'blur(8px)',
}
const heroVisualTop = {
  position: 'absolute',
  top: 22,
  left: 24,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.2em',
  color: 'rgba(239,234,224,0.78)',
}
const heroVisualBottom = {
  position: 'absolute',
  bottom: 22,
  right: 24,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.16em',
  color: 'rgba(239,234,224,0.9)',
}

/* BÖLÜM 2 — GÜVEN ŞERİDİ */
const trustWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-navy, #2D3142)',
  color: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(72px, 11vw, 96px) clamp(20px, 5vw, 48px)',
}
const trustGrid = {
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 'clamp(28px, 4vw, 48px)',
}
const trustCell = { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }
const trustNum = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(44px, 5.5vw, 64px)',
  lineHeight: 1,
  letterSpacing: '-0.025em',
  color: 'var(--v2-cream, #EFEAE0)',
}
const trustLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
}

/* shared section heading */
const sectionHead = { display: 'flex', flexDirection: 'column', gap: 16 }
const h2Light = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 4.4vw, 56px)',
  lineHeight: 1.06,
  letterSpacing: '-0.02em',
  color: 'var(--v2-cream, #EFEAE0)',
  margin: 0,
  maxWidth: '18ch',
}
const h2Dark = { ...h2Light, color: 'var(--v2-ink, #1A1A1A)' }
const emDark = { fontStyle: 'italic', color: 'var(--v2-copper, #D4A373)' }

/* BÖLÜM 3 — VAAT */
const promiseWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)',
}
const promiseInner = {
  maxWidth: 720,
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
}
const promiseH2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 4.4vw, 52px)',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--v2-ink, #1A1A1A)',
  margin: '0 0 8px',
  maxWidth: '18ch',
}
const prose = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.7,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: 680,
}
const textLink = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 16,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontWeight: 600,
  fontSize: 17,
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
}
const textLinkCopper = { ...textLink, color: 'var(--v2-copper, #D4A373)' }

/* BÖLÜM 4 — SEKTÖRLER */
const sectorsWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)',
}
const sectorsInner = {
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 6vw, 64px)',
  alignItems: 'flex-start',
}
const sectorsGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(20px, 2.5vw, 32px)',
}
const sectorCard = {
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.1)',
  borderRadius: 'var(--v2-r-md, 8px)',
  overflow: 'hidden',
  textDecoration: 'none',
  color: 'inherit',
}
const sectorMedia = {
  aspectRatio: '3 / 2',
  background:
    'linear-gradient(150deg, #2D3142 0%, #3a3f54 55%, rgba(212,163,115,0.55) 100%)',
}
const sectorBody = { display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 24px 28px' }
const sectorTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(20px, 2.2vw, 25px)',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
}
const sectorSub = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  lineHeight: 1.55,
  color: '#5A5A5A',
  margin: 0,
}
const cardCta = {
  marginTop: 8,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--v2-navy, #2D3142)',
  alignSelf: 'flex-start',
}

/* BÖLÜM 5 — HİZMETLER */
const servicesWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-navy, #2D3142)',
  color: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)',
}
const servicesInner = {
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 6vw, 64px)',
  alignItems: 'flex-start',
}
const servicesGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: 'clamp(24px, 3vw, 40px)',
}
const serviceCell = { display: 'flex', flexDirection: 'column', gap: 12 }
const serviceIconWrap = { color: 'var(--v2-copper, #D4A373)', display: 'inline-flex' }
const serviceTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 22,
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: 'var(--v2-cream, #EFEAE0)',
  margin: 0,
}
const serviceSub = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  lineHeight: 1.5,
  color: 'rgba(239, 234, 224, 0.62)',
  margin: 0,
}

/* BÖLÜM 6 — REFERANSLAR */
const refsWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)',
}
const refsInner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(40px, 6vw, 56px)',
  alignItems: 'flex-start',
}
const refsGrid = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'clamp(20px, 3vw, 32px)',
}
const refCard = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 'clamp(28px, 4vw, 40px)',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.12)',
  borderRadius: 'var(--v2-r-md, 8px)',
  margin: 0,
}
const refQuoteMark = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 56,
  lineHeight: 0.6,
  color: 'var(--v2-copper, #D4A373)',
  height: 28,
}
const refQuote = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 'clamp(17px, 1.7vw, 19px)',
  lineHeight: 1.6,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
}
const refAuthor = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 13,
  letterSpacing: '0.04em',
  color: '#5A5A5A',
}

/* BÖLÜM 7 — HİKAYEMİZ */
const storyWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-navy, #2D3142)',
  color: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)',
}
const storyInner = {
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'clamp(36px, 6vw, 80px)',
  alignItems: 'center',
}
const storyMedia = {
  aspectRatio: '4 / 3',
  borderRadius: 'var(--v2-r-md, 8px)',
  border: '1px solid rgba(212, 163, 115, 0.25)',
  background:
    'linear-gradient(145deg, #23262f 0%, #2D3142 45%, rgba(212,163,115,0.5) 100%)',
}
const storyText = { display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }
const storyH2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 4.4vw, 52px)',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  color: 'var(--v2-cream, #EFEAE0)',
  margin: 0,
  maxWidth: '16ch',
}
const storyBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.7,
  color: 'rgba(239, 234, 224, 0.78)',
  margin: 0,
  maxWidth: 560,
}

/* BÖLÜM 8 — SON CTA */
const ctaWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-copper, #D4A373)',
  padding: 'clamp(80px, 14vw, 140px) clamp(20px, 5vw, 48px)',
}
const ctaInner = {
  maxWidth: 760,
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
}
const ctaH2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(32px, 5vw, 60px)',
  lineHeight: 1.06,
  letterSpacing: '-0.02em',
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '18ch',
}
const ctaLede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 'clamp(17px, 1.8vw, 19px)',
  lineHeight: 1.6,
  color: 'rgba(26, 26, 26, 0.82)',
  margin: 0,
  maxWidth: '52ch',
}
const btnDark = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 14,
  marginTop: 12,
  padding: '20px 40px',
  background: 'var(--v2-navy, #2D3142)',
  color: 'var(--v2-cream, #EFEAE0)',
  textDecoration: 'none',
  borderRadius: 'var(--v2-r-sm, 4px)',
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 500,
  fontSize: 'clamp(20px, 2.4vw, 26px)',
  letterSpacing: '-0.01em',
  minHeight: 44,
}
const btnArrowDark = { fontSize: 24, color: 'var(--v2-copper, #D4A373)', display: 'inline-block' }
