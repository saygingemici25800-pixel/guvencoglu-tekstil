import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { entranceSyncDelay } from '../shared/entrance.js'
import TeklifForm from '../shared/TeklifForm.jsx'
import { SOCIAL_SAMEAS } from '../shared/SocialLinks.jsx'

/* ──────────────────────────────────────────────────────────────
   HomeV2 — B2B kurumsal üniforma odaklı ana sayfa (DressBest ilhamlı)
   Hero: premium asimetrik — krem zemin, yüzen sektör görselleri +
   altta dev GUVENCOGLU wordmark. Tek ekran 100vh. Altında atölye şeridi.
   Devamı: güven şeridi → vaat → sektörler → hizmetler → referanslar
   → teklif formu (#teklif) → footer (global). 3D yok, statik.
   ────────────────────────────────────────────────────────────── */

/* (SECTORS özet listesi kaldırıldı — "Çalıştığımız Sektörler" bölümü silindi) */

const HERO_SECTORS = [
  {
    id: 'saglik',
    num: '01',
    name: 'Sağlık',
    img: '/saglik-doctor.webp', // yelpazedeki gerçek sektör fotosu (en temsili: doktor önlüğü)
    alt: 'Sağlık sektörü doktor önlüğü üniforması',
    desc: 'Hastane, klinik, eczane ve laboratuvar personeli için hijyenik, dayanıklı üniformalar.',
  },
  {
    id: 'otel',
    num: '02',
    name: 'Otel',
    img: '/otel-frontoffice.webp',
    alt: 'Otel önbüro ve resepsiyon üniforması',
    desc: "Resepsiyondan mutfağa, housekeeping'den spa'ya otel ekipleri için kurumsal kıyafet.",
  },
  {
    id: 'okul',
    num: '03',
    name: 'Okul',
    img: '/okul-student.webp',
    alt: 'Okul öğrenci üniforması',
    desc: 'Anaokulundan liseye, okul üniforması ve kurumsal eğitim kıyafetleri.',
  },
  {
    id: 'restoran',
    num: '04',
    name: 'Restoran',
    img: '/restoran-chef.webp', // önceki atolye-uretim placeholder'ı yerine gerçek restoran fotosu
    alt: 'Restoran şef ve mutfak ceketi üniforması',
    desc: 'Mutfaktan salona restoran ekibi için fonksiyonel, hijyenik ve markaya özel kıyafetler.',
  },
]

const ATELIER_PHOTOS = [
  { img: '/atolye-uretim.webp', label: 'ÜRETİM' },
  { img: '/atolye-zanaat.webp', label: 'ZANAAT' },
  { img: '/atolye-renk.webp', label: 'RENK & KUMAŞ' },
]

const SERVICES = [
  { icon: 'design', title: 'Tasarım', sub: 'özel marka kimliği için' },
  { icon: 'sew', title: 'Konfeksiyon', sub: 'kendi tesis üretimi' },
  { icon: 'embroidery', title: 'Nakış', sub: 'logo, isim, sınıf no' },
  { icon: 'print', title: 'Baskı', sub: 'dijital, sublimasyon' },
  { icon: 'batch', title: 'Toplu Üretim', sub: 'B2B sözleşmeli siparişler' },
  { icon: 'logistics', title: 'Lojistik', sub: 'Türkiye geneli teslimat' },
]

// Gerçek metrikler (kullanıcı onayladı): aktif çalışılan kurum 100+,
// toplam kurumsal müşteri 500+, kuruluş 2001 (~çeyrek asır). Uydurma sayı yok.
const STATS = [
  { num: '100+', label: 'AKTİF KURUM' },
  { num: '500+', label: 'KURUMSAL MÜŞTERİ' },
  { num: '2001', label: '’DEN BERİ' },
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
// Yorumlar placeholder/uydurma (atıflı gerçek müşteri yorumu yok) → "Sosyal Kanıt /
// Referanslar" bölümü GEÇİCİ GİZLİ; sahte yorum/isim yayında kalmasın. Gerçek,
// atıflı yorumlar gelince → true (TESTIMONIALS'ı gerçeklerle doldurup) geri açılır.
const SHOW_TESTIMONIALS = false

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

/* BlurReveal — Reveal'in SSG-safe one-shot + IntersectionObserver mantığı,
   ek olarak filter blur(10px→0) ile "stagger blur-in". idle = SSR/no-JS GÖRÜNÜR
   (opacity 1, blur 0 — statik HTML'e gizli içerik gömülmez); JS layout-effect ile
   paint'ten önce gizler, viewport'a girince bir kez açar. delay = index*200ms
   ile kademeli. prefers-reduced-motion → hiç gizlemez (anında görünür). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const SPRING = 'cubic-bezier(0.22, 1, 0.36, 1)'

function BlurReveal({ delay = 0, duration = 760, y = 16, blur = 10, className, style, children }) {
  const ref = useRef(null)
  const [state, setState] = useState('idle')

  useIsoLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return // animasyon yok → görünür kal
    }
    setState('hidden')
    const vh = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    if (rect.top < vh * 0.95 && rect.bottom > 0) {
      const raf = requestAnimationFrame(() => setState('shown'))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const animated = state !== 'idle'
  const hidden = state === 'hidden'
  const revealStyle = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? `translateY(${y}px)` : 'none',
    filter: hidden ? `blur(${blur}px)` : 'blur(0px)',
    transition: animated
      ? `opacity ${duration}ms ${SPRING} ${delay}ms, transform ${duration}ms ${SPRING} ${delay}ms, filter ${duration}ms ${SPRING} ${delay}ms`
      : undefined,
    willChange: animated ? 'opacity, transform, filter' : undefined,
  }

  return (
    <div ref={ref} className={className} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  )
}

/* FadeIn — BlurReveal ile aynı SSG-safe one-shot IO mantığı; opacity + translate(x,y),
   ayarlanabilir delay/duration (koreografi için: foto hızlı/kısa delay, yazı yavaş/uzun).
   idle = SSR/no-JS GÖRÜNÜR (statik HTML'e opacity:0 kilitlenmez). reduced-motion → idle kalır. */
function FadeIn({ as: Tag = 'div', delay = 0, duration = 600, x = 0, y = 0, className, style, children, ...rest }) {
  const ref = useRef(null)
  const [state, setState] = useState('idle')

  useIsoLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return // animasyon yok → görünür kal
    }
    setState('hidden')
    const vh = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    if (rect.top < vh * 0.95 && rect.bottom > 0) {
      const raf = requestAnimationFrame(() => setState('shown'))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const animated = state !== 'idle'
  const hidden = state === 'hidden'
  const revealStyle = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? `translate(${x}px, ${y}px)` : 'none',
    transition: animated
      ? `opacity ${duration}ms ${SPRING} ${delay}ms, transform ${duration}ms ${SPRING} ${delay}ms`
      : undefined,
    willChange: animated ? 'opacity, transform' : undefined,
  }

  return (
    <Tag ref={ref} className={className} style={{ ...revealStyle, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

export default function HomeV2() {
  // Preloader varsa hero girişi fade-out ile senkron başlar; yoksa anında (mount). One-shot.
  const [heroBase] = useState(() => entranceSyncDelay())
  const scrollToTeklif = () =>
    document.getElementById('teklif')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <PageTransition>
      <SEOHead
        title="Güvençoğlu Tekstil — Türkiye'nin kurumsal üniforma uzmanı"
        description="Sağlık personeli, otel ekipleri ve okul üniformaları. 2001'den beri Fethiye'deki kendi üretim tesisimizde, aracısız, sözleşmeli üretim ve teslimat. 48 saatte teklif."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvençoğlu Tekstil',
          foundingDate: '2001',
          url: 'https://guvencoglutekstil.com/v2',
          description:
            "Türkiye'nin kurumsal üniforma uzmanı. Sağlık, otel ve okul üniformaları için kendi üretim tesisinde sözleşmeli üretim.",
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kesikkapı Mah. Atatürk Cad. No:144/146',
            addressLocality: 'Fethiye',
            addressRegion: 'Muğla',
            postalCode: '48300',
            addressCountry: 'TR',
          },
          sameAs: SOCIAL_SAMEAS,
        }}
      />

      {/* Vurgu artık global token (--v2-copper: #9A0002) ile tüm sitede kırmızı;
          home-scope override'a gerek yok. Wrapper sadece yapısal. */}
      <div className="v2-home">
      {/* ─── BÖLÜM 1 — PREMIUM ASİMETRİK HERO ──────────────── */}
      <section className="hv2-hero" style={heroWrap} aria-label="Kurumsal üniforma — sektörler">
        {/* ÜST BÖLGE — metin + yüzen sektör görselleri */}
        <div className="hv2-hero-upper" style={heroUpper}>
          {/* SOL %34 — metin */}
          {/* Sol metin: SOLDAN yönlü, sakin (yavaş) + stagger — eyebrow→başlık→lede→buton */}
          <div className="hv2-hero-left" style={heroLeft}>
            <FadeIn as="p" style={heroEyebrow} x={-24} delay={heroBase} duration={680}>
              2001’DEN BERİ · FETHİYE
            </FadeIn>
            <FadeIn as="h1" style={heroH1} x={-24} delay={heroBase + 95} duration={780}>
              Türkiye’nin <em style={heroH1Accent}>kurumsal üniforma</em> uzmanı
            </FadeIn>
            <FadeIn as="p" style={heroLede} x={-24} delay={heroBase + 190} duration={780}>
              Sağlık, otel ve okul kurumları için kendi tesisimizde üretim. Aracısız,
              sözleşmeli, zamanında.
            </FadeIn>
            <FadeIn style={heroCtaGroup} x={-24} delay={heroBase + 290} duration={720}>
              <button
                type="button"
                className="hv2-hero-btn cta-swap-btn"
                style={heroBtn}
                onClick={scrollToTeklif}
              >
                <span className="cta-swap">
                  <span className="cta-swap-top">Teklif Al →</span>
                  <span className="cta-swap-bot">0532 134 7602</span>
                </span>
              </button>
            </FadeIn>
          </div>

          {/* SAĞ %66 — 3 kartlı asimetrik grid galeri (stagger blur-in) */}
          <div className="hv2-hero-gallery" style={heroGallery} aria-label="Sektör görselleri">
            {HERO_SECTORS.map((s, i) => (
              <BlurReveal
                key={s.id}
                delay={heroBase + i * 200}
                className={`hv2-hg-card hv2-hg-${i + 1}`}
                style={galleryCard}
              >
                <Link
                  to={`/ne-yapiyoruz?s=${s.id}`}
                  className="hv2-hg-link"
                  style={galleryLink}
                  aria-label={`${s.name} koleksiyonu`}
                >
                  <img
                    className="hv2-hg-photo"
                    src={s.img}
                    alt={s.alt}
                    style={heroCardImg}
                    decoding="async"
                  />
                  <span style={heroCardOverlay} aria-hidden="true" />
                  <span style={heroCardContent}>
                    <span style={heroCardNum}>{s.num}</span>
                    <span style={i === 0 ? heroCardNameBig : heroCardName}>{s.name}</span>
                  </span>
                  {/* Kart içi ortalanmış parlayan "Koleksiyon" butonu (saf CSS shine sweep) */}
                  <span className="hv2-shiny" style={shinyBtn}>
                    <span className="hv2-shiny-label" style={shinyLabel}>Koleksiyon</span>
                  </span>
                </Link>
              </BlurReveal>
            ))}
          </div>
        </div>

        {/* ALT BÖLGE — dev wordmark; yumuşak opacity-fade (kendi translateY'i korunur) */}
        <FadeIn className="hv2-wordmark" style={heroWordmark} aria-hidden="true" x={0} y={0} delay={heroBase + 340} duration={920}>
          <span className="hv2-wordmark-text" style={heroWordmarkText}>
            GUVENCOGLU
          </span>
        </FadeIn>
      </section>

      {/* ─── BÖLÜM 1.5 — BİZ TEASER (hero hemen altına alındı): SOL yazı / SAĞ 2 overlap foto ─ */}
      <section className="hv2-bizteaser" style={bizTeaserWrap} aria-labelledby="hv2-bizteaser-title">
        <div className="hv2-bt-row" style={btRow}>
          {/* SOL — yazı (soldan, YAVAŞ; fotolardan sonra) */}
          <FadeIn className="hv2-bt-text" style={btText} delay={650} duration={780} x={-28}>
            <span style={bizTeaserEyebrow}>
              <span style={bizTeaserDash} aria-hidden="true" />
              <span style={eyebrowDark}>BİZ KİMİZ</span>
            </span>
            <h2 id="hv2-bizteaser-title" style={bizTeaserTitle}>
              Biz ve <em style={emDark}>İş Ortaklarımız</em>
            </h2>
            <p style={bizTeaserBody}>
              2001’den beri Fethiye’deki kendi üretim tesisimizde, aynı titizlikle
              çalışıyoruz. Aracı yok, sözleşmeli üretim ve teslimat var.
            </p>
            <p style={bizTeaserBody}>
              Sağlık, otel ve okul kurumlarının kurumsal üniforma programını uzun
              yıllar birlikte yürütüyoruz.
            </p>
            <Link to="/biz-ve-is-ortaklarimiz" className="hv2-bizteaser-btn" style={bizTeaserBtn}>
              Daha Fazla <span aria-hidden="true">→</span>
            </Link>
          </FadeIn>

          {/* SAĞ — 2 overlap foto (HIZLI, sırayla) — placeholder */}
          <div className="hv2-bt-stack" style={btStack}>
            <FadeIn className="hv2-bt-ph hv2-bt-ph1" style={{ ...photoMain, left: 0 }} delay={0} duration={420} y={22}>
              <img src="/miras.webp" alt="Güvençoğlu Tekstil'in köklü üretim mirasından bir kare" loading="lazy" style={btImg} />
            </FadeIn>
            <FadeIn className="hv2-bt-ph hv2-bt-ph2" style={{ ...photoOver, right: 0 }} delay={260} duration={420} y={22}>
              <img src="/atolye-uretim.webp" alt="Fethiye'deki üretim atölyesinde dikiş hattı" loading="lazy" style={btImg} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── BÖLÜM 2 — ATÖLYE ŞERİDİ ─────────────────────────── */}
      <section className="hv2-atelier" style={atelierWrap} aria-labelledby="hv2-atelier-title">
        <Reveal style={atelierInner}>
          <div className="hv2-atelier-head" style={atelierHead}>
            <div style={atelierHeadLeft}>
              <span style={atelierEyebrow}>KENDİ ÜRETİM TESİSİMİZ</span>
              <h2 id="hv2-atelier-title" style={atelierH2}>
                2001’den beri kendi atölyemizde, aracısız üretim.
              </h2>
            </div>
            <p style={atelierLede}>
              Tasarımdan dikişe, nakıştan son kontrole kadar her aşama Fethiye’deki kendi
              tesisimizde. Aracı yok, sürpriz yok — sadece söz verdiğimiz kalite.
            </p>
          </div>

          <div className="hv2-atelier-grid" style={atelierGrid}>
            {ATELIER_PHOTOS.map((p) => (
              <div key={p.label} className="hv2-atelier-card" style={atelierCard}>
                <div
                  className="hv2-atelier-photo"
                  style={{ ...atelierPhoto, backgroundImage: `url(${p.img})` }}
                  role="img"
                  aria-label={`Atölyeden ${p.label.toLocaleLowerCase('tr-TR')} görseli`}
                />
                <div style={atelierPhotoOverlay} aria-hidden="true" />
                <span style={atelierLabel}>{p.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── BÖLÜM 2 — GÜVEN ŞERİDİ ─────────────────────────── */}
      <section className="hv2-trust" style={trustWrap} aria-label="Rakamlarla Güvençoğlu">
        <Reveal style={trustGrid} className="hv2-trust-grid">
          {STATS.map((s) => (
            <div key={s.label} style={trustCell}>
              <span style={trustNum}>{s.num}</span>
              <span style={trustLabel}>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ─── BÖLÜM 3 — VAAT / SÖZ ───────────────────────────── */}
      <section className="hv2-promise" style={promiseWrap} aria-labelledby="hv2-promise-title">
        <Reveal style={promiseInner}>
          <h2 id="hv2-promise-title" style={promiseH2}>
            Söz verdiğimiz iş, söz verdiğimiz tarihte teslim.
          </h2>
          <p style={prose}>
            Kurumsal üniforma seçimi sadece kumaş ve dikiş değildir. Personelinizin her
            günkü konforu, markanızın görünümü ve sürdürülebilir bir tedarik zinciri demektir.
          </p>
          <p style={prose}>
            Güvençoğlu Tekstil, 2001’den beri kendi üretim tesisinde, aracısız çalışıyor.
            Sağlık kurumlarından otellere, okullardan üretim tesislerine kadar 500’den fazla
            kurumun üniforma programını yönetiyoruz.
          </p>
          <p style={prose}>
            Sözleşmeli üretim, sözleşmeli teslimat, sözleşmeli kalite. Çeyrek asırlık güvencemizle.
          </p>
          <Link to="/biz-ve-is-ortaklarimiz" className="hv2-textlink" style={promiseCta}>
            Bizi Daha Yakından Tanıyın <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* ─── BÖLÜM 5 — HİZMETLER ÖNİZLEME ───────────────────── */}
      <section className="hv2-services" style={servicesWrap} aria-labelledby="hv2-services-title">
        {/* STATİK — bu bölümde giriş animasyonu yok (Reveal kaldırıldı). */}
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
        </div>
      </section>

      {/* ─── BÖLÜM 6 — SOSYAL KANIT / REFERANSLAR (gerçek yorum gelene kadar gizli) ─ */}
      {SHOW_TESTIMONIALS && (
      <section className="hv2-refs" style={refsWrap} aria-labelledby="hv2-refs-title">
        <Reveal style={refsInner}>
          <header style={sectionHead}>
            <p style={eyebrowDark}>REFERANSLARIMIZ</p>
            <h2 id="hv2-refs-title" style={h2Dark}>
              500’den fazla kurumun tercih ettiği partner.
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

          <Link to="/biz-ve-is-ortaklarimiz" className="hv2-textlink" style={textLink}>
            Tüm Referanslarımız <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
      )}

      {/* ─── BÖLÜM 7 — TEKLİF FORMU ─────────────────────────── */}
      <section id="teklif" className="hv2-quote" style={quoteWrap} aria-labelledby="hv2-quote-title">
        <div className="hv2-quote-inner" style={quoteInner}>
          {/* SOL — içerik + direkt iletişim (koyu zemin → açık vurgu scope'u) */}
          <div className="hv2-quote-left" style={quoteLeft}>
            <p style={quoteEyebrow}>TEKLİF AL</p>
            <h2 id="hv2-quote-title" style={quoteH2}>
              Üniforma programınız için bir konuşma başlatalım.
            </h2>
            <p style={quoteLede}>
              Markanıza, sektörünüze ve ekibinize özel teklif için 48 saat içinde size
              dönüyoruz. Acil işler için doğrudan telefon edebilir veya WhatsApp’tan
              yazabilirsiniz.
            </p>
            <div style={quoteContacts}>
              <div style={quoteContactRow}>
                <span style={quoteContactLabel}>TELEFON</span>
                <a href="tel:+905321347602" style={quoteContactLink}>0532 134 7602</a>
              </div>
              <div style={quoteContactRow}>
                <span style={quoteContactLabel}>WHATSAPP</span>
                <a
                  href="https://wa.me/905321347602"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={quoteContactLink}
                >
                  0532 134 7602
                </a>
              </div>
              <div style={quoteContactRow}>
                <span style={quoteContactLabel}>E-POSTA</span>
                <a href="mailto:guvencoglutekstil@gmail.com" style={quoteContactLink}>
                  guvencoglutekstil@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ — sade teklif formu (paylaşılan TeklifForm, cream tema) */}
          <TeklifForm theme="cream" title="Hızlı teklif formu" />
        </div>
      </section>

      <style>{`
        .hv2-hero-btn { transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease; }
        .hv2-hero-btn:hover, .hv2-hero-btn:focus-visible { background: var(--v2-copper, #D4A373); color: var(--v2-cream, #EFEAE0); box-shadow: 0 6px 22px rgba(45, 49, 66, 0.32); transform: translateY(-1px); }
        .hv2-hg-photo { will-change: transform; }
        .hv2-hg-card:hover .hv2-hg-photo, .hv2-hg-link:focus-visible .hv2-hg-photo { transform: scale(1.05); }
        .hv2-hg-link:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: -3px; border-radius: 16px; }
        /* Asimetrik 4-kart yerleşim (pinwheel): col1 uzun+kısa, col2 kısa+uzun.
           Rijit 2x2 değil; iki uzun (1,3) + iki kısa (2,4) çaprazlama. */
        .hv2-hg-1 { grid-column: 1; grid-row: 1 / 3; margin-top: clamp(10px, 2.4vh, 30px); }
        .hv2-hg-2 { grid-column: 2; grid-row: 1 / 2; }
        .hv2-hg-3 { grid-column: 2; grid-row: 2 / 4; }
        .hv2-hg-4 { grid-column: 1; grid-row: 3 / 4; }
        /* Kart içi "Koleksiyon" butonu — saf CSS shine sweep (ShinyButton taklidi) */
        .hv2-shiny::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 55%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(100deg, transparent 0%, rgba(239, 234, 224, 0.55) 50%, transparent 100%);
          transform: skewX(-18deg) translateX(-220%);
          animation: hv2-shine 3s ease-in-out infinite;
        }
        @keyframes hv2-shine {
          0% { transform: skewX(-18deg) translateX(-220%); }
          55%, 100% { transform: skewX(-18deg) translateX(340%); }
        }
        .hv2-shiny { transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1); }
        .hv2-hg-card:hover .hv2-shiny, .hv2-hg-link:focus-visible .hv2-shiny { transform: scale(1.06); }
        .hv2-atelier-card:hover .hv2-atelier-photo { transform: scale(1.05); }

        .hv2-textlink { transition: color 220ms ease; }
        .hv2-textlink span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .hv2-textlink:hover span, .hv2-textlink:focus-visible span { transform: translateX(6px); }
        .hv2-textlink:hover, .hv2-textlink:focus-visible { color: var(--v2-copper, #D4A373); }
        /* Tüm bölümler artık açık (krem) zemin → vurgu kırmızı; copper-link hover'da
           ince alt çizgi (renk kırmızı kalır). */
        .hv2-textlink-copper:hover, .hv2-textlink-copper:focus-visible { text-decoration: underline; text-underline-offset: 4px; }

        a:focus-visible { outline: 2px solid var(--v2-copper, #D4A373); outline-offset: 4px; border-radius: 2px; }

        .hv2-bizteaser-btn { transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .hv2-bizteaser-btn:hover, .hv2-bizteaser-btn:focus-visible {
          background: var(--v2-navy, #2D3142); color: var(--v2-cream, #EFEAE0);
        }
        .hv2-bizteaser-btn span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .hv2-bizteaser-btn:hover span, .hv2-bizteaser-btn:focus-visible span { transform: translateX(5px); }

        @media (max-width: 980px) {
          .hv2-refs-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) {
          /* Overlap kalkar, dikey stack; iki bölümde de FOTO önce, yazı sonra */
          .hv2-bt-row { flex-direction: column-reverse !important; gap: clamp(24px, 6vw, 36px) !important; }
          .hv2-bt-text { flex: 1 1 auto !important; width: 100% !important; }
          .hv2-bt-stack {
            flex: 1 1 auto !important; width: 100% !important; min-height: 0 !important;
            display: flex !important; flex-direction: column !important; gap: 14px !important;
          }
          .hv2-bt-ph {
            position: static !important; width: 100% !important; height: auto !important;
            aspect-ratio: 16 / 10 !important;
          }
          .hv2-bt-ph2 { border: none !important; }
        }
        @media (max-width: 760px) {
          .hv2-trust-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .hv2-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 820px) {
          .hv2-hero { height: auto !important; overflow: visible !important; }
          .hv2-hero-upper { flex-direction: column !important; height: auto !important; }
          .hv2-hero-left { width: 100% !important; height: auto !important; z-index: auto !important; padding: clamp(100px, 14vh, 140px) clamp(24px, 6vw, 40px) clamp(24px, 5vw, 40px) !important; }
          .hv2-hero-gallery { width: 100% !important; height: auto !important; padding: 0 clamp(24px, 6vw, 40px) clamp(24px, 5vw, 40px) !important; display: flex !important; flex-direction: column !important; gap: 14px !important; }
          .hv2-hg-card { grid-column: auto !important; grid-row: auto !important; margin-top: 0 !important; width: 100% !important; aspect-ratio: 16 / 10 !important; border-radius: 10px !important; }
          .hv2-wordmark { position: static !important; height: auto !important; overflow: hidden !important; }
          .hv2-wordmark-text { font-size: clamp(48px, 16vw, 90px) !important; line-height: 0.85 !important; transform: none !important; }
          .hv2-quote-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .hv2-atelier-head { flex-direction: column !important; }
          .hv2-atelier-grid { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv2-hero-btn, .hv2-hero-link, .hv2-hg-photo,
          .hv2-atelier-photo, .hv2-textlink, .hv2-textlink span,
          .hv2-bizteaser-btn, .hv2-bizteaser-btn span {
            transition: none !important;
          }
          .hv2-shiny { transition: none !important; }
          .hv2-shiny::before { animation: none !important; }
        }
      `}</style>
      </div>
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

/* BÖLÜM 1 — PREMIUM ASİMETRİK HERO (tek ekran 100vh) */
const heroWrap = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  background: 'var(--v2-cream, #EFEAE0)',
}
const heroUpper = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '64vh',
}
const heroLeft = {
  position: 'relative',
  zIndex: 5,
  width: '34%',
  height: '100%',
  boxSizing: 'border-box',
  background: 'var(--v2-cream, #EFEAE0)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingLeft: 'clamp(40px, 5vw, 96px)',
  paddingRight: 'clamp(24px, 2vw, 40px)',
  // Metin sol/normal, biraz daha yukarıda (nav pill'in hemen altı).
  paddingTop: 'clamp(84px, 11vh, 124px)',
  paddingBottom: 'clamp(24px, 3vw, 48px)',
}
const heroEyebrow = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.25em',
  color: 'var(--v2-copper, #D4A373)',
  margin: '0 0 28px',
}
const heroH1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(36px, 3.4vw, 58px)',
  lineHeight: 1.12,
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 28px',
}
const heroH1Accent = { fontStyle: 'italic', color: 'var(--v2-navy, #2D3142)' }
const heroLede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 'clamp(15px, 1.05vw, 17px)',
  lineHeight: 1.65,
  color: 'var(--v2-muted, #5A5A5A)',
  maxWidth: 320,
  margin: '0 0 36px',
}
const heroCtaGroup = { display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }
const heroBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  background: 'var(--v2-navy, #2D3142)',
  color: 'var(--v2-cream, #EFEAE0)',
  padding: '16px 36px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 999,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  fontWeight: 600,
  textDecoration: 'none',
  minHeight: 44,
  boxSizing: 'border-box',
  boxShadow: '0 4px 16px rgba(45, 49, 66, 0.25)',
}
const heroGallery = {
  position: 'relative',
  zIndex: 1,
  width: '66%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 'clamp(12px, 1.1vw, 18px)',
  padding: 'clamp(96px, 12vh, 140px) clamp(28px, 3.2vw, 60px) clamp(28px, 4vh, 56px) clamp(8px, 1vw, 16px)',
}
const galleryCard = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 16,
  boxShadow: '0 26px 55px -30px rgba(45, 49, 66, 0.5)',
  minWidth: 0,
  minHeight: 0,
}
const galleryLink = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
}
const shinyBtn = {
  position: 'relative',
  zIndex: 3,
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '9px 20px',
  borderRadius: 999,
  background: 'rgba(45, 49, 66, 0.42)',
  WebkitBackdropFilter: 'blur(6px)',
  backdropFilter: 'blur(6px)',
  border: '1px solid rgba(239, 234, 224, 0.45)',
  boxShadow: '0 6px 20px rgba(45, 49, 66, 0.3)',
}
const shinyLabel = {
  position: 'relative',
  zIndex: 1,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--v2-cream, #EFEAE0)',
  whiteSpace: 'nowrap',
}
const heroCardImg = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}
const heroCardOverlay = {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  background:
    'linear-gradient(to top, rgba(45,49,66,0.85) 0%, rgba(45,49,66,0.2) 55%, transparent 100%)',
  transition: 'background 0.5s ease',
}
const heroCardContent = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  padding: 'clamp(16px, 1.5vw, 26px)',
  display: 'flex',
  flexDirection: 'column',
}
const heroCardNum = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper, #D4A373)',
  marginBottom: 6,
}
const heroCardNameBig = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 2.6vw, 42px)',
  lineHeight: 1.1,
  color: 'var(--v2-cream, #EFEAE0)',
}
const heroCardName = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(20px, 1.7vw, 28px)',
  lineHeight: 1.1,
  color: 'var(--v2-cream, #EFEAE0)',
}
const heroWordmark = {
  position: 'absolute',
  zIndex: 1,
  bottom: 0,
  left: 0,
  right: 0,
  height: '36vh',
  overflow: 'hidden',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
}
const heroWordmarkText = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 600,
  fontSize: 'clamp(88px, 15vw, 220px)',
  lineHeight: 0.8,
  letterSpacing: '-0.03em',
  color: 'var(--v2-navy, #2D3142)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  margin: 0,
  transform: 'translateY(8%)',
}

/* BÖLÜM 2 — ATÖLYE ŞERİDİ */
const atelierWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 8vh, 100px) clamp(24px, 5vw, 80px)',
}
const atelierInner = { maxWidth: 1280, margin: '0 auto' }
const atelierHead = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: 16,
  marginBottom: 48,
}
const atelierHeadLeft = { display: 'flex', flexDirection: 'column' }
const atelierEyebrow = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper, #D4A373)',
}
const atelierH2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 4vw, 48px)',
  lineHeight: 1.15,
  color: 'var(--v2-navy, #2D3142)',
  marginTop: 12,
  marginBottom: 0,
  maxWidth: 600,
}
const atelierLede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  maxWidth: 360,
  margin: 0,
}
const atelierGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
}
const atelierCard = {
  position: 'relative',
  // Üretim tesisi fotoları ~yarı yükseklik (footprint yarıya); tam genişlik korunur → yan dev boşluk yok.
  aspectRatio: '16 / 10',
  overflow: 'hidden',
}
const atelierPhoto = {
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}
const atelierPhotoOverlay = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(45,49,66,0.6), transparent 60%)',
}
const atelierLabel = {
  position: 'absolute',
  bottom: 16,
  left: 16,
  zIndex: 2,
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.15em',
  color: 'var(--v2-cream, #EFEAE0)',
}
// Hizmetler bölümü artık açık zemin → başlık italik vurgusu navy (emDark ile aynı rejim).
const h1Accent = { fontStyle: 'italic', color: 'var(--v2-navy, #2D3142)' }

/* BÖLÜM 2 — GÜVEN ŞERİDİ */
const trustWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  color: 'var(--v2-navy, #2D3142)',
  padding: 'clamp(72px, 11vw, 96px) clamp(20px, 5vw, 48px)',
}
const trustGrid = {
  maxWidth: 'var(--v2-content-max, 1440px)',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(28px, 4vw, 48px)',
}
const trustCell = { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }
const trustNum = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(44px, 5.5vw, 64px)',
  lineHeight: 1,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
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
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
  maxWidth: '18ch',
}
const h2Dark = { ...h2Light, color: 'var(--v2-ink, #1A1A1A)' }
const emDark = { fontStyle: 'italic', color: 'var(--v2-navy, #2D3142)' }

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
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 8px',
  maxWidth: '18ch',
}
const prose = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.7,
  color: 'var(--v2-navy, #2D3142)',
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
/* Vaat/Söz bölümü CTA — 60-30-10'da TEK copper vurgu (rest'te copper + alt çizgi) */
const promiseCta = {
  ...textLink,
  color: 'var(--v2-copper, #D4A373)',
  borderBottom: '1.5px solid var(--v2-copper, #D4A373)',
  paddingBottom: 4,
}

/* BÖLÜM 5 — HİZMETLER */
const servicesWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  color: 'var(--v2-navy, #2D3142)',
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
  color: 'var(--v2-navy, #2D3142)',
  margin: 0,
}
const serviceSub = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  lineHeight: 1.5,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: 0,
}

/* BÖLÜM 5.5 — BİZ VE İŞ ORTAKLARIMIZ TEASER (interlocking) */
const bizTeaserWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  borderTop: '1px solid rgba(45, 49, 66, 0.1)',
  padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px)',
}
const btRow = {
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(28px, 4vw, 64px)',
}
const btText = {
  flex: '0 1 42%',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}
/* 2 overlap foto yığını — biri büyük (üst köşe), biri kayık (alt köşe, kremle çerçeveli) */
const btStack = {
  flex: '0 1 54%',
  minWidth: 0,
  position: 'relative',
  minHeight: 'clamp(360px, 48vh, 520px)',
}
const photoMain = {
  position: 'absolute',
  top: 0,
  width: '72%',
  height: '84%',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 22px 48px -26px rgba(45, 49, 66, 0.42)',
}
const photoOver = {
  position: 'absolute',
  bottom: 0,
  width: '52%',
  height: '58%',
  borderRadius: 14,
  overflow: 'hidden',
  border: '5px solid var(--v2-cream, #EFEAE0)',
  boxShadow: '0 28px 56px -28px rgba(45, 49, 66, 0.5)',
  zIndex: 2,
  boxSizing: 'border-box',
}
const btImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
const bizTeaserEyebrow = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginBottom: 18,
}
const bizTeaserDash = {
  width: 34,
  height: 1,
  background: 'var(--v2-copper, #D4A373)',
  flexShrink: 0,
}
const bizTeaserTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 2.4vw, 32px)',
  lineHeight: 1.12,
  letterSpacing: '-0.015em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '12px 0 18px',
}
const bizTeaserBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.65,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '0 0 14px',
  maxWidth: '44ch',
  textAlign: 'left',
}
const bizTeaserBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 14,
  border: '1px solid var(--v2-navy, #2D3142)',
  color: 'var(--v2-navy, #2D3142)',
  background: 'transparent',
  padding: '14px 28px',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  minHeight: 44,
  boxSizing: 'border-box',
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

/* BÖLÜM 7 — TEKLİF FORMU */
const quoteWrap = {
  position: 'relative',
  zIndex: 1,
  background: 'var(--v2-cream, #EFEAE0)',
  padding: 'clamp(64px, 9vh, 110px) clamp(24px, 5vw, 80px)',
}
const quoteInner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'clamp(40px, 5vw, 80px)',
  alignItems: 'start',
}
const quoteLeft = { display: 'flex', flexDirection: 'column' }
const quoteEyebrow = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.2em',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const quoteH2 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(28px, 3.5vw, 46px)',
  lineHeight: 1.15,
  color: 'var(--v2-navy, #2D3142)',
  margin: '14px 0 0',
}
const quoteLede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.6,
  color: 'var(--v2-muted, #5A5A5A)',
  margin: '20px 0 0',
  maxWidth: 380,
}
const quoteContacts = { display: 'flex', flexDirection: 'column', gap: 14, marginTop: 32 }
const quoteContactRow = { display: 'flex', flexDirection: 'column', gap: 4 }
const quoteContactLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.18em',
  color: 'var(--v2-copper, #D4A373)',
}
const quoteContactLink = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
}
