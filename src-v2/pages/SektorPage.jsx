import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import Reveal from '../shared/Reveal.jsx'
import { SEKTORLER, SEKTOR_LIST } from '../data/sektorler.js'
import { clientsBySector } from '../data/clients.js'

const ORIGIN = 'https://guvencoglutekstil.com'

// "Çalıştığımız Kurumlar" dikey marquee'si AÇIK — gerçek firma isimleriyle
// (clients.js). Logo henüz yok → isim kutusu placeholder (logo gelince <img>).
// İlgili sektörün listesi boşsa (ör. okul) marquee o sayfada gizlenir.
const SHOW_MARQUEE = true

/* ──────────────────────────────────────────────────────────────
   SektorPage — /ne-yapiyoruz/<slug> (4 statik alt sayfa).
   Placeholder iskelet: başlık + lede, alt başlıklar (İngilizce terim +
   TR açıklama + foto SLOTU), sticky sektör seçici, DİKEY sticky marquee.
   Gerçek fotolar yok → .sp-photo kutusu <img> almaya hazır (sabit oran).
   ────────────────────────────────────────────────────────────── */

/* Editorial eyebrow — kırmızı kısa çizgi + uppercase etiket */
function Eyebrow({ children }) {
  return (
    <span style={eyebrowRow}>
      <span style={eyebrowDash} aria-hidden="true" />
      <span style={eyebrowLabel}>{children}</span>
    </span>
  )
}

/* Sticky sektör seçici — 4 sektör arası gezinme; aktif kırmızı */
function SectorSwitcher({ active, onSelect }) {
  return (
    <nav className="sp-switch" style={switchWrap} aria-label="Sektör seçici">
      <ul style={switchInner} role="tablist" aria-label="Sektörler">
        {SEKTOR_LIST.map((s) => {
          const isActive = s.slug === active
          return (
            <li key={s.slug} style={{ listStyle: 'none' }}>
              {/* Sekme: tıklayınca yelpaze o sektöre döner (sayfa yenilenmez, React state) */}
              <button
                type="button"
                role="tab"
                id={`tab-${s.slug}`}
                aria-selected={isActive}
                aria-controls="sp-fan-panel"
                className="sp-switch-link"
                style={isActive ? switchLinkActive : switchLink}
                onClick={() => onSelect(s.slug)}
              >
                {s.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Dikey sticky marquee — "Çalıştığımız Kurumlar".
   Saf CSS @keyframes translateY + IntersectionObserver: görünürken çalışır
   (is-running), değilken durur (animation-play-state: paused) → off-screen'de
   CPU/GPU yakmaz. İçerik 2× kopyalanır (kesintisiz döngü); 2. kopya aria-hidden.
   Hover'da duraklar, prefers-reduced-motion: statik, mobilde gizli (CSS). */
function VerticalMarquee({ clients }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => node.classList.toggle('is-running', entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // Az isim varsa grup viewport'u doldursun diye tekrarla → kesintisiz dikey döngü.
  const list = clients.length >= 6
    ? clients
    : Array.from({ length: Math.ceil(6 / clients.length) }, () => clients).flat()

  const group = (hidden) => (
    <ul className="spm-group" aria-hidden={hidden || undefined}>
      {list.map((name, i) => (
        <li key={i} className="spm-box" style={spmBox}>
          {/* Logo gelince: <img src={...} alt={name} style={spmImg} /> */}
          <span style={spmText}>{name}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <aside className="sp-aside" style={asideWrap} aria-label="Çalıştığımız kurumlar">
      <p style={asideHead}>Çalıştığımız Kurumlar</p>
      <div ref={ref} className="spm-viewport">
        <div className="spm-track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </aside>
  )
}

/* ──────────────────────────────────────────────────────────────
   Kart yelpazesi (fan carousel) — referans fikir GSAP'tı; burada
   GSAP/framer YOK, saf CSS transform + React state ile TAKLİT.
   Kartlar alt-merkez pivot etrafında rotate+scale ile yelpaze açar;
   ok + nokta ile döner; viewport'a girince overshoot'lu easing ile
   elastic açılır; hover'da kart kalkar + komşular hafif itişir.
   SSG-safe: no-JS'te yelpaze açık/görünür (entered=true başlar).

   Beklenen GERÇEK foto dosyaları (henüz yok → placeholder kutu):
   /public/sektor/<slug>-<term-slug>.webp  (3/4 oran, object-fit: cover)
     saglik   → saglik-doctor-coat / -nurse-scrubs / -surgical-scrubs /
                -patient-gown / -lab-technician / -support-staff .webp
     otel     → otel-front-office / -bell-staff / -guest-relations /
                -housekeeping / -f-b-service / -kitchen-chef /
                -engineering / -spa-wellness .webp
     okul     → okul-student-uniform / -academic-staff / -administrative /
                -sports-pe / -corporate-office .webp
     restoran → restoran-chef-kitchen / -service-waiter / -host /
                -barista-bar / -busser / -prep-staff .webp
   Foto'lar eklenince HAS_PHOTOS = true → slot otomatik <img> render eder. */
const HAS_PHOTOS = false
const slugifyTerm = (t) =>
  t.toLowerCase().replace(/[/&]/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const FAN_ANGLE = 10 // derece / adım (merkezden uzaklaştıkça artan dönüş)
const FAN_SCALE = 0.07 // küçülme / adım
const FAN_MAX = 3 // merkezden ±3 kart görünür (referans MAX_VISIBLE=7); ötesi gizli

// SSR'da uyarı vermesin diye izomorfik layout effect (no-JS'te hiç çalışmaz).
const useIsoLayout = typeof document !== 'undefined' ? useLayoutEffect : useEffect

function FanCarousel({ sections, slug, label, enableInvite = true, onInvitePlayed }) {
  const n = sections.length
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(true) // SSG/no-JS: yelpaze açık görünür
  const [invite, setInvite] = useState(false) // tek seferlik "aç-topla" davet jesti
  const stageRef = useRef(null)
  const playedRef = useRef(false)

  // Görünmeden önce kapat; viewport'a girince SIRAYLA: (1) elastic giriş, (2) bir kez
  // "aç-topla" davet jesti (one-shot, loop YOK). reduced-motion → statik, jest hiç çalışmaz.
  useIsoLayout(() => {
    const node = stageRef.current
    if (!node || !('IntersectionObserver' in window)) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEntered(false)
    const timers = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || playedRef.current) return
        playedRef.current = true
        setEntered(true) // (1) elastic giriş — her sektör (yeniden) açılışında oynar
        // (2) "aç-topla" davet jesti yalnızca İLK kez (sekme değişiminde tekrarlamaz)
        if (enableInvite) {
          timers.push(setTimeout(() => setInvite(true), 1000))
          timers.push(setTimeout(() => setInvite(false), 1620))
          if (onInvitePlayed) onInvitePlayed()
        }
        io.disconnect()
      },
      { threshold: 0.2 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const go = (dir) => setActive((a) => (a + dir + n) % n)

  return (
    <div className="fan" role="group" aria-roledescription="kart yelpazesi" aria-label={`${label} alt başlıkları`}>
      <div ref={stageRef} className={`fan-stage${entered ? ' is-in' : ''}`}>
        {sections.map((sec, i) => {
          let pos = i - active // dairesel en-yakın uzaklık → simetrik yelpaze
          if (pos > n / 2) pos -= n
          if (pos < -n / 2) pos += n
          const a = Math.abs(pos)
          const hidden = a > FAN_MAX
          // davet jesti: açıyı bir kez geçici genişlet (aç) → sonra normale topla
          const rot = entered ? pos * FAN_ANGLE * (invite ? 1.5 : 1) : 0
          const sc = entered ? Math.max(0.62, 1 - a * FAN_SCALE) : 0.7
          const ty = entered ? 0 : 40
          const cap = i % 2 === 0 ? 'bl' : 'tc' // başlık konumu 2 varyant: sol-alt / üst-orta
          const file = `${slug}-${slugifyTerm(sec.term)}.webp`
          return (
            <button
              type="button"
              key={sec.term}
              className="fan-card"
              aria-label={`${sec.term}${pos === 0 ? ' (seçili)' : ''}`}
              aria-current={pos === 0 ? 'true' : undefined}
              tabIndex={hidden ? -1 : 0}
              onClick={() => setActive(i)}
              style={{
                '--rot': `${rot}deg`,
                '--sc': sc,
                '--ty': `${ty}px`,
                '--z': hidden ? 0 : 100 - a,
                '--op': hidden ? 0 : entered ? 1 : 0,
                '--delay': `${a * 70}ms`,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
            >
              <span className="fan-photo">
                {HAS_PHOTOS ? (
                  <img className="fan-img" src={`/sektor/${file}`} alt={sec.term} loading="lazy" decoding="async" />
                ) : (
                  <span className="fan-photo-tag" aria-hidden="true">foto: {file}</span>
                )}
                <span className="fan-grad" data-cap={pos === 0 ? 'bl' : cap} aria-hidden="true" />
              </span>
              {/* İsim kartın ÜZERİNDE: aktif (merkez) kart büyük Fraunces; yan kartlar küçük mono */}
              <span className="fan-cap" data-cap={pos === 0 ? 'bl' : cap} data-active={pos === 0 ? 'true' : undefined}>
                {pos !== 0 && <span className="fan-cap-dash" aria-hidden="true" />}
                <span className="fan-cap-text">{sec.term}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="fan-nav">
        <button type="button" className="fan-arrow" aria-label="Önceki kart" onClick={() => go(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <ul className="fan-dots">
          {sections.map((sec, i) => (
            <li key={sec.term} style={{ listStyle: 'none' }}>
              <button
                type="button"
                className={`fan-dot${i === active ? ' is-active' : ''}`}
                aria-label={`${i + 1}. ${sec.term}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => setActive(i)}
              />
            </li>
          ))}
        </ul>
        <button type="button" className="fan-arrow" aria-label="Sonraki kart" onClick={() => go(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* Görsel isim artık aktif kartın ÜZERİNDE; burada yalnızca ekran okuyucu için canlı bölge */}
      <p className="fan-sr-live" aria-live="polite">{sections[active].term}</p>
    </div>
  )
}

export default function SektorPage() {
  // Tek sayfa, sektör sekmeli. Aktif sektör URL ?s=<slug> ile gelebilir (hero
  // "Koleksiyon" butonları); parametre yoksa ilk sektör (Sağlık). Sayfa yenilenmez.
  const [active, setActive] = useState(SEKTOR_LIST[0].slug) // SSG/ilk render: 'saglik'
  const invitePlayed = useRef(false) // "aç-topla" daveti yalnızca ilk kez

  // İlk açılışta ?s= oku (SSG sonrası; flash olmasın diye layout effect → boyamadan önce).
  useIsoLayout(() => {
    const p = new URLSearchParams(window.location.search).get('s')
    if (p && SEKTORLER[p]) setActive(p)
  }, [])

  const data = SEKTORLER[active]
  const clients = clientsBySector(active)
  const showMarquee = SHOW_MARQUEE && clients.length > 0

  return (
    <PageTransition>
      <SEOHead
        title="Ne Yapıyoruz — Güvençoğlu Tekstil"
        description="Sağlık, otel, okul ve restoran kurumları için kurumsal üniforma ve tekstil üretimi. Fethiye'deki kendi tesisimizde nakış, baskı, özel tasarım, toplu üretim ve B2B çözümler."
        path="/ne-yapiyoruz"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Güvençoğlu Tekstil — Ne Yapıyoruz',
          itemListElement: SEKTOR_LIST.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            url: `${ORIGIN}/ne-yapiyoruz?s=${s.slug}`,
          })),
        }}
      />

      <SectorSwitcher active={active} onSelect={setActive} />

      {/* ── TEK YELPAZE — aktif sektörün kartları; sekme değişince yumuşak yeniden açılır ── */}
      <section style={bodyWrap} aria-label="Sektör koleksiyonları">
        <div className="sp-grid" style={{ ...bodyGrid, ...(showMarquee ? null : { gridTemplateColumns: '1fr' }) }}>
          <div style={mainCol} id="sp-fan-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
            {/* key={active} → sektör değişince yelpaze elastic yeniden açılır (yumuşak geçiş) */}
            <FanCarousel
              key={active}
              sections={data.sections}
              slug={active}
              label={data.label}
              enableInvite={!invitePlayed.current}
              onInvitePlayed={() => {
                invitePlayed.current = true
              }}
            />
          </div>

          {showMarquee && <VerticalMarquee clients={clients} />}
        </div>
      </section>

      {/* ── EN ALTTA AÇIKLAMA — "Ne Yapıyoruz" girişi (eski landing metni, en alta alındı) ── */}
      <section style={{ ...heroWrap, borderTop: '1px solid rgba(45, 49, 66, 0.1)' }} aria-labelledby="ny-intro-title">
        <Reveal style={heroInner}>
          <Eyebrow>NE YAPIYORUZ</Eyebrow>
          <h1 id="ny-intro-title" style={h1}>
            Ne <em style={{ fontStyle: 'italic', color: 'var(--v2-copper, #9A0002)' }}>Yapıyoruz</em>
          </h1>
          <p style={lede}>
            Sağlık, otel, okul ve restoran kurumları için kurumsal üniforma ve
            tekstili uçtan uca üretiyoruz — tasarımdan dikişe, nakıştan baskıya,
            Fethiye’deki kendi tesisimizde. Aracısız, sözleşmeli, zamanında.
          </p>
        </Reveal>
      </section>

      {/* ── SEO: 4 sektörün başlık + alt başlıkları statik HTML'de. Görsel olarak gizli
             (display:none DEĞİL → taranabilir); etkileşim üstteki sekme + yelpazede. ── */}
      <div className="sp-seo" aria-hidden="true">
        {SEKTOR_LIST.map((s) => (
          <section key={s.slug} aria-labelledby={`seo-${s.slug}`}>
            <h2 id={`seo-${s.slug}`}>{s.title}</h2>
            <p>{s.lede}</p>
            <ul>
              {s.sections.map((sec) => (
                <li key={sec.term}>
                  {sec.term} — {sec.desc}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <style>{`
        /* ── 2 kolon: içerik + sağda dikey sticky marquee ── */
        .sp-grid { display: grid; grid-template-columns: minmax(0, 1fr) clamp(220px, 22vw, 300px); gap: clamp(32px, 4vw, 64px); align-items: start; }

        /* ── SEO: 4 sektör içeriği DOM'da ama görsel gizli (display:none DEĞİL → taranabilir) ── */
        .sp-seo { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }

        /* ── sticky sektör seçici ── */
        .sp-switch-link { transition: color 200ms ease, background 200ms ease, border-color 200ms ease; }
        .sp-switch-link:hover, .sp-switch-link:focus-visible { color: var(--v2-copper, #9A0002); }
        a:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 4px; border-radius: 2px; }

        /* ── dikey marquee ── */
        .sp-aside { position: sticky; top: clamp(132px, 17vh, 168px); align-self: start; }
        .spm-viewport {
          position: relative;
          height: clamp(420px, 62vh, 660px);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent);
        }
        .spm-track {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation: spm-scroll 26s linear infinite;
          animation-play-state: paused; /* IO görünür yapınca 'is-running' ile başlar */
        }
        .spm-viewport.is-running .spm-track { animation-play-state: running; }
        .spm-viewport.is-running:hover .spm-track { animation-play-state: paused; }
        .spm-group { display: flex; flex-direction: column; gap: 14px; padding: 0 0 14px; margin: 0; list-style: none; }
        @keyframes spm-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }

        @media (max-width: 900px) {
          .sp-grid { grid-template-columns: 1fr; }
          /* dikey sticky kenar şerit mobilde çalışmaz → gizle (okunabilirlik öncelik) */
          .sp-aside { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .spm-viewport .spm-track { animation: none !important; transform: none !important; }
          .spm-viewport { overflow-y: auto; }
        }

        /* ── KART YELPAZESİ (fan carousel) — saf CSS + React state, GSAP/framer YOK ── */
        .fan { --m: 1.14; max-width: 900px; margin: 0 auto; }
        .fan-stage { position: relative; height: clamp(420px, 46vw, 560px); display: flex; align-items: flex-end; justify-content: center; }
        .fan-card {
          position: absolute; bottom: 0; left: 50%;
          width: clamp(186px, 18vw, 244px); margin-left: calc(clamp(186px, 18vw, 244px) / -2);
          aspect-ratio: 3 / 4; padding: 0; border: 0; background: transparent; cursor: pointer;
          border-radius: 14px; transform-origin: 50% 162%;
          transform: translateY(var(--ty, 0)) rotate(calc(var(--rot, 0deg) * var(--m))) scale(var(--sc, 1));
          opacity: var(--op, 1); z-index: var(--z, 1);
          transition: transform 620ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 460ms ease;
          transition-delay: var(--delay, 0ms);
          -webkit-tap-highlight-color: transparent;
        }
        .fan-photo {
          position: absolute; inset: 0; overflow: hidden; border-radius: 14px;
          background: linear-gradient(155deg, #2D3142 0%, #3a3f54 58%, rgba(154, 0, 2, 0.42) 100%);
          box-shadow: 0 16px 36px rgba(45, 49, 66, 0.26), 0 0 0 1px rgba(45, 49, 66, 0.06);
          display: flex; align-items: center; justify-content: center;
          transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 320ms ease;
        }
        .fan-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .fan-photo-tag { font-family: var(--v2-font-mono, monospace); font-size: 10.5px; letter-spacing: 0.04em; color: rgba(239, 234, 224, 0.6); text-align: center; padding: 0 12px; }
        .fan-grad { position: absolute; inset: 0; pointer-events: none; }
        .fan-grad[data-cap="bl"] { background: linear-gradient(to top, rgba(22, 24, 33, 0.8) 0%, rgba(22, 24, 33, 0.12) 46%, transparent 70%); }
        .fan-grad[data-cap="tc"] { background: linear-gradient(to bottom, rgba(22, 24, 33, 0.76) 0%, rgba(22, 24, 33, 0.1) 42%, transparent 66%); }
        .fan-cap { position: absolute; left: 14px; right: 14px; display: flex; align-items: center; gap: 8px; z-index: 2; }
        .fan-cap[data-cap="bl"] { bottom: 14px; justify-content: flex-start; }
        .fan-cap[data-cap="tc"] { top: 14px; justify-content: center; }
        .fan-cap-dash { width: 16px; height: 1px; background: var(--v2-copper, #9A0002); flex-shrink: 0; }
        .fan-cap[data-cap="tc"] .fan-cap-dash { display: none; }
        .fan-cap-text { font-family: var(--v2-font-mono, monospace); font-size: 10.5px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--v2-cream, #EFEAE0); }

        .fan-card:hover, .fan-card:focus-visible { z-index: 200; }
        .fan-stage:hover { --m: 1.08; } /* fan'a hover → hepsi biraz açılır (komşu itişmesi) */
        .fan-card:hover .fan-photo, .fan-card:focus-visible .fan-photo { transform: translateY(-14px) scale(1.05); box-shadow: 0 24px 50px rgba(45, 49, 66, 0.34), 0 0 0 1px rgba(154, 0, 2, 0.3); }
        .fan-card:focus-visible { outline: none; }
        .fan-card:focus-visible .fan-photo { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 3px; }

        /* nav: yelpazenin ALTINDA + kartların ÜSTÜNDE (z-index) → mobilde de net tıklanır */
        .fan-nav { position: relative; z-index: 300; display: flex; align-items: center; justify-content: center; gap: clamp(16px, 2.4vw, 26px); margin-top: clamp(20px, 3.2vw, 38px); }
        .fan-arrow { width: clamp(48px, 4vw, 58px); height: clamp(48px, 4vw, 58px); flex: none; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; border: 1px solid rgba(45, 49, 66, 0.22); background: var(--v2-surface-elevated, #fff); color: var(--v2-navy, #2D3142); cursor: pointer; box-shadow: 0 2px 8px rgba(45, 49, 66, 0.12); transition: color 200ms ease, border-color 200ms ease, background 200ms ease; }
        .fan-arrow svg { width: 58%; height: 58%; }
        .fan-arrow:hover, .fan-arrow:focus-visible { color: var(--v2-copper, #9A0002); border-color: var(--v2-copper, #9A0002); }
        .fan-arrow:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 3px; }
        .fan-dots { display: flex; align-items: center; gap: 6px; margin: 0; padding: 0; }
        .fan-dot { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; border: 0; background: transparent; cursor: pointer; }
        .fan-dot::before { content: ''; width: 10px; height: 10px; border-radius: 999px; border: 1px solid rgba(45, 49, 66, 0.42); background: transparent; transition: transform 220ms ease, background 220ms ease, border-color 220ms ease; }
        .fan-dot.is-active::before { background: var(--v2-copper, #9A0002); border-color: var(--v2-copper, #9A0002); transform: scale(1.4); }
        .fan-dot:focus-visible { outline: 2px solid var(--v2-copper, #9A0002); outline-offset: 2px; border-radius: 999px; }
        .fan-sr-live { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
        /* Aktif (merkez) kartın ismi kartın ÜZERİNDE büyük (Fraunces, sol-alt); yan kartlar küçük mono */
        .fan-cap[data-active="true"] { top: auto; bottom: 16px; left: 16px; right: 16px; align-items: flex-end; justify-content: flex-start; }
        .fan-cap[data-active="true"] .fan-cap-text {
          font-family: var(--v2-font-display, serif); font-weight: 400; text-transform: none;
          font-size: clamp(18px, 2.3vw, 25px); letter-spacing: -0.01em; line-height: 1.08;
          text-align: left; text-shadow: 0 1px 14px rgba(22, 24, 33, 0.55);
        }
        .fan-grad[data-cap="bl"] { background: linear-gradient(to top, rgba(22, 24, 33, 0.86) 0%, rgba(22, 24, 33, 0.18) 50%, transparent 74%); }

        @media (max-width: 1100px) {
          /* 2 kolon hâlâ açık (marquee var) → ana kolon dar; yelpaze ölçülü kalsın, taşmasın */
          .fan { --m: 0.94; }
          .fan-card { width: clamp(168px, 19vw, 208px); margin-left: calc(clamp(168px, 19vw, 208px) / -2); }
          .fan-stage { height: clamp(380px, 44vw, 480px); }
        }
        @media (max-width: 900px) {
          /* marquee gizli → tek kolon tam genişlik: yelpaze rahatça büyür */
          .fan { --m: 1; }
          .fan-card { width: clamp(184px, 30vw, 240px); margin-left: calc(clamp(184px, 30vw, 240px) / -2); }
          .fan-stage { height: clamp(380px, 58vw, 500px); }
        }
        @media (max-width: 640px) {
          /* mobil: yelpaze daralır + kart küçülür → üst üste binip okunmaz olmasın; oklar net altta */
          .fan { --m: 0.66; }
          .fan-card { width: clamp(150px, 52vw, 198px); margin-left: calc(clamp(150px, 52vw, 198px) / -2); }
          .fan-stage { height: clamp(346px, 90vw, 432px); }
          .fan-nav { gap: 22px; margin-top: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          /* statik yelpaze: animasyon yok, navigasyon yine çalışır */
          .fan-card, .fan-photo { transition: none !important; }
          .fan-stage:hover { --m: 1; }
          .fan-card:hover .fan-photo, .fan-card:focus-visible .fan-photo { transform: none; }
        }
      `}</style>
    </PageTransition>
  )
}

/* ──────────────────────────────────────────────────────────────
   STYLES — palet: krem #EFEAE0, navy #2D3142, kırmızı #9A0002, muted #5A5A5A
   ────────────────────────────────────────────────────────────── */
const CREAM = 'var(--v2-cream, #EFEAE0)'

const eyebrowRow = { display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 18px' }
const eyebrowDash = { width: 34, height: 1, background: 'var(--v2-copper, #9A0002)', flexShrink: 0 }
const eyebrowLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
}

/* sticky switcher */
const switchWrap = {
  position: 'sticky',
  top: 'clamp(72px, 9vh, 92px)',
  zIndex: 30,
  background: 'rgba(239, 234, 224, 0.92)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(45, 49, 66, 0.1)',
}
const switchInner = {
  maxWidth: 1180,
  margin: '0 auto',
  padding: '12px clamp(24px, 6vw, 96px)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'clamp(6px, 1.4vw, 16px)',
  justifyContent: 'center',
  listStyle: 'none',
}
const switchLink = {
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: 999,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--v2-navy, #2D3142)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const switchLinkActive = {
  ...switchLink,
  color: 'var(--v2-cream, #EFEAE0)',
  background: 'var(--v2-copper, #9A0002)',
  fontWeight: 600,
}

/* hero / header */
const heroWrap = {
  background: CREAM,
  padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 96px) clamp(24px, 4vw, 48px)',
}
const heroInner = { maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }
const h1 = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(40px, 6vw, 76px)',
  lineHeight: 1.04,
  letterSpacing: '-0.025em',
  color: 'var(--v2-navy, #2D3142)',
  margin: '0 0 18px',
}
const lede = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--v2-ink, #1A1A1A)',
  margin: 0,
  maxWidth: '54ch',
}

/* body grid */
const bodyWrap = { background: CREAM, padding: 'clamp(48px, 7vw, 88px) clamp(24px, 6vw, 96px) clamp(56px, 9vw, 112px)' }
const bodyGrid = { maxWidth: 1180, margin: '0 auto' }
const mainCol = { display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 52px)', minWidth: 0 }

/* dikey marquee aside */
const asideWrap = { display: 'flex', flexDirection: 'column', gap: 16 }
const asideHead = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #9A0002)',
  margin: 0,
}
const spmBox = {
  flex: '0 0 auto',
  width: '100%',
  aspectRatio: '16 / 7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 14px',
  background: 'var(--v2-surface-elevated, #FFFFFF)',
  border: '1px solid rgba(45, 49, 66, 0.1)',
  borderRadius: 12,
  boxShadow: '0 1px 2px rgba(45, 49, 66, 0.04)',
  boxSizing: 'border-box',
}
const spmText = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  lineHeight: 1.3,
  letterSpacing: '0.04em',
  color: 'var(--v2-muted, #5A5A5A)',
  textAlign: 'center',
  // Uzun kurum adları (ör. okul: "...Mesleki ve Teknik Anadolu Lisesi") tek satıra
  // sığmıyor, nowrap ile taşıp kayma yapıyordu → sar + en çok 3 satır. Kısa adlar
  // (otel/sağlık/restoran) yine tek satır görünür; kutu yüksekliği sabit kalır.
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  overflowWrap: 'break-word',
}
