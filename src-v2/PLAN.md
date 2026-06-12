# Güvencoğlu Tekstil — Multi-Page V2 Planı

> **Konsept:** İPLİKTEN ÜRÜNE YOLCULUK. Kullanıcı siteyi gezdikçe ham iplikten bitmiş ürüne kadar olan fabrika yolculuğunu deneyimliyor. Her sayfa yolculuğun bir aşaması.
>
> **Statü:** Plan — ONAY BEKLİYOR. Kod yok. Onaylanınca ADIM 2'ye geçilecek.

---

## 0. Yönlendirici İlkeler (Skill Özetleri)

Okunan 6 skill'den damıtılmış kurallar:

- **3d-web-experience:** 3D ancak amaca hizmet ettiğinde kullanılır. Mobilde basitleştirilmiş / static fallback. Suspense + progress loader. GLB ideal < 5MB. Camera/transform/opacity animasyonu — width/height değil.
- **frontend-design:** Cesur ve net bir estetik yön seç. Generic AI-slop kaçın (Inter + mor gradient yok). Tipografide karakterli display + işlek body. Asimetri, generous whitespace VEYA controlled density. Atmosfer (grain, noise, depth).
- **ui-ux-pro-max:** Kontrast 4.5:1, focus ring, 44×44 touch hedef, transition 150–300ms, z-index skala (10/20/30/50), 16px+ mobil body, font karakterleri eşleşsin.
- **mobile-design:** ScrollView yerine FlatList (web'de virtual scroll mantığı), inline renderItem yok, native driver, prefers-reduced-motion respect, thumb-zone CTA. 3D'yi mobilde kısıtla.
- **react-best-practices:** Promise.all paralel veri, barrel import yasak, dynamic import for heavy (Three.js sahneleri lazy), Suspense streaming, memoize list items, transform/opacity animasyon, no console.log production.
- **seo-optimizer:** Her sayfaya unique <title> (<60 char) + meta description (150–160) + H1 + canonical + schema (Organization, BreadcrumbList, Product/Service). Türkçe lang. OpenGraph + Twitter card. Sitemap.xml.

---

## 1. Tasarım Sistemi (V2)

### Palet
- **Antrasit (Anchor):** `#2D3142` — güven, kurumsal, derinlik
- **Bakır (Accent):** `#D4A373` — sıcaklık, el işçiliği, premium
- **Krem (Surface):** `#EFEAE0` — kumaş hissi, sayfa zemini
- **Mürekkep (Text):** `#1A1A1A` — secondary/light mode
- **Sis (Muted):** `#8A8F9E` — secondary text

### Tipografi
- **Display:** "Fraunces" (variable serif, italic + axes) — başlık, hero, milestone yılları
- **Body:** "Inter Tight" (geometric sans, dar) — paragraf, UI
- **Mono:** "JetBrains Mono" — yıl, sayı, koordinat — endüstriyel detay

> Inter düz yerine **Inter Tight** seçildi: daha sıkı, daha karakterli. Fraunces zaten Inter ile kanlı uyumlu.

### Spacing & Grid
- 8pt grid (8/16/24/32/48/64/96/128)
- max-width: 1440px; içerik kolonu: max 75ch okunabilirlik
- z-index skala: nav=50, modal=40, scroll-overlay=30, 3D-canvas=10, content=20

### Motion İlkeleri
- Page transition: 600ms, krem perde yukarıdan iner + bakır ince çizgi kayar
- Section reveal: opacity + 24px translateY, 400ms ease-out, stagger 80ms
- 3D entry: camera dolly 1.2s easeInOutCubic
- `prefers-reduced-motion: reduce` → tüm transition 0.01ms, parallax kapalı, otomatik 3D loop kapalı

### Erişilebilirlik
- Tüm 3D sahnelere semantic fallback (`<figure>` + `<figcaption>` + alt resim)
- Tüm interaktif öğeler 44×44 minimum
- Focus ring: 2px solid bakır + 4px offset
- Skip-to-content link
- Renk kontrastı: bakır üstüne lacivert metin = 7.2:1 ✅

---

## 2. Rota Mimarisi

`App.jsx`'e bir kanca: `/v2/*` rotası V2 ağacına yönlendirilir. Mevcut `/` ve tüm V1 yolu **HİÇ DEĞİŞMEZ**.

```
/v2                       → HomeV2          (Ana Sayfa)
/v2/hikayemiz             → StoryV2         (Hikayemiz)
/v2/uretim                → ProcessV2       (Üretim Süreci — 7 adım)
/v2/hizmetler             → ServicesV2      (Hizmetler)
/v2/referanslar           → ReferencesV2    (Referanslar)
/v2/iletisim              → ContactV2       (Teklif Al / İletişim)
```

React Router v6, `<Outlet />` ile `LayoutV2` sarmalayıcı. Sayfa geçişleri `AnimatePresence` + `motion.div` ile.

---

## 3. Sayfa Sayfa Vizyon

### 3.1 Ana Sayfa — `/v2`
**Aşama:** Ham iplik → vizyon.
**Ana mesaj:** "1980'den beri ipliği hikayeye dönüştürüyoruz."

- **Hero (KORUNUYOR):** Mevcut Three.js hero sahnesi aynen import edilir. Hiçbir parametre, mesh, animasyon değişmez. Sadece üstüne yeni nav + alt CTA konur.
- **3D Konsept:** Hero sonrası, scroll ile küçük bir "iplik makarası" sahnesi açılır — fixed canvas, scroll ile makara döner ve 6 sayfanın isim labeller'ı makaradan iplik gibi salınarak çıkar (her label sonraki sayfaya link).
- **Component'ler:** `HeroOriginal` (eski importu), `NavV2`, `JourneyTeaser` (6 sayfa hub), `ImpactStats` (yıl/m²/çalışan/ülke sayaçları), `FooterV2`.
- **Motion:** Hero üzeri nav fade-down (200ms delay), JourneyTeaser scroll-pinned, ImpactStats sayı counter (IntersectionObserver, 1.6s), bakır ince horizontal çizgi her bölüm sınırında scrub.

### 3.2 Hikayemiz — `/v2/hikayemiz`
**Aşama:** Zaman akışı, 1980 → bugün.
**Ana mesaj:** "Üç kuşak, tek iplik."

- **3D Konsept:** Sol yarıda yatay scroll'a bağlanmış **kronolojik tünel**. Her milestone yılı (1980, 1995, 2008, 2015, 2024) krem zemine asılı yıl tabelası olarak duruyor; kamera tünelin içinde scroll ile ilerliyor. Sağda her milestone için fotoğraf + paragraf flip-card.
- **Component'ler:** `TimelineTunnel` (R3F sahne), `MilestoneCard` (memoized), `FoundersQuote` (sticky pull-quote).
- **Motion:** Yatay scroll-jacking (mobilde dikey'e düşer), milestone reveal 400ms, italik kelime vurgusu Fraunces italic axes ile.
- **SEO:** Schema: `Organization` + `foundingDate` + `founder`.

### 3.3 Üretim Süreci — `/v2/uretim`
**Aşama:** Fabrika turu — yolculuğun kalbi.
**Ana mesaj:** "Hammaddeden teslimata 7 adım."

- **3D Konsept:** **Sticky 3D atölye sahnesi.** 7 istasyonun her biri için kamera yeni bir tezgaha doğru hareket eder (dolly + slight tilt). Sahne ortak tek canvas; scroll = state. İstasyonlar:
  1. Hammadde (iplik makaraları)
  2. Kesim (kumaş katları + maket bıçak izi)
  3. Dikim (makine titreşim animasyonu)
  4. Nakış (parlak iplik döngüsü)
  5. Kalite Kontrol (büyüteç + ışık halkası)
  6. Paketleme (kutu yığını)
  7. Teslimat (kargo silüeti)
- **Component'ler:** `WorkshopScene` (R3F sticky canvas), `StationStep` (her adım için section), `ProgressRail` (sol kenarda 7 nokta), `ReducedMotionFallback` (statik 7 resim).
- **Motion:** Scroll-progress driven camera (`useScroll` + lerp), her station'a girince small text reveal 300ms.
- **Perf:** Sahne lazy load (`React.lazy` + `Suspense` + progress loader). Mobilde sticky 3D yerine 7 büyük resim galeri.

### 3.4 Hizmetler — `/v2/hizmetler`
**Aşama:** Ürün vitrini.
**Ana mesaj:** "Ne yapıyoruz."

- **3D Konsept:** **3D ürün carousel.** Her hizmet (Konfeksiyon, Nakış, Baskı, Özel Tasarım, Toplu Üretim, B2B Çözüm) için döner bir mannequin / kumaş örneği. Tıklayınca büyüyüp detay açılır.
- **Component'ler:** `ServiceShowcase3D`, `ServiceDrawer` (slide-up panel), `CTABand` (teklif al).
- **Motion:** Hover'da bakır halo, click'te FLIP transition, drawer bottom-sheet 350ms cubic-bezier(.2,.9,.2,1).
- **A11y:** Carousel'a klavye yön tuşları, aria-roledescription="carousel".

### 3.5 Referanslar — `/v2/referanslar`
**Aşama:** Sosyal kanıt.
**Ana mesaj:** "Birlikte çalıştıklarımız."

- **3D Konsept:** Hafif. **Logo bulutu** + her logo'ya hover'da küçük 3D kart (R3F yerine CSS 3D yeterli — perf). İsteğe bağlı arka planda yavaş hareket eden lacivert noise plane.
- **Component'ler:** `ClientGrid` (memoized grid), `TestimonialPullQuote`, `MetricBar` (yıl deneyim, müşteri sayısı).
- **Motion:** Grid stagger reveal (60ms × index), testimonial Fraunces italic vurgu.
- **SEO:** Logos `<img alt="<Müşteri Adı> — referansımız">`, schema `Organization` + `award`.

### 3.6 İletişim — `/v2/iletisim`
**Aşama:** Teslimat — yolculuğun sonu.
**Ana mesaj:** "Hadi başlayalım."

- **3D Konsept:** Fabrika konumunu gösteren **3D harita pini** (Bursa). Tıklayınca harita zoom in. Yanında form.
- **Component'ler:** `LocationPin3D`, `QuoteForm` (multi-step: ürün → adet → zaman → iletişim), `ContactInfoCard` (telefon, mail, adres), `MapEmbed` (Google Maps iframe fallback).
- **Motion:** Form steps cross-fade + slide 250ms, success state confetti yok — bakır ince tik animasyonu (lottie-free CSS).
- **A11y:** Form `<label for>`, error messages aria-live, required işaretlemeleri.
- **SEO:** Schema: `LocalBusiness` + `address` + `telephone` + `openingHours`.

---

## 4. Klasör Yapısı

```
src-v2/
├── PLAN.md                          (bu dosya)
├── routes.jsx                       (router config)
├── shared/
│   ├── LayoutV2.jsx                 (Outlet + nav + footer)
│   ├── NavV2.jsx
│   ├── FooterV2.jsx
│   ├── PageTransition.jsx           (AnimatePresence wrapper)
│   ├── SEOHead.jsx                  (per-page meta)
│   └── ReducedMotion.jsx            (context + hook)
├── pages/
│   ├── HomeV2.jsx
│   ├── StoryV2.jsx
│   ├── ProcessV2.jsx
│   ├── ServicesV2.jsx
│   ├── ReferencesV2.jsx
│   └── ContactV2.jsx
├── scenes/
│   ├── HeroOriginalBridge.jsx       (mevcut hero'yu sarar — değiştirmez)
│   ├── ThreadSpool.jsx              (Ana sayfa hub)
│   ├── TimelineTunnel.jsx
│   ├── WorkshopScene.jsx            (7 station tek canvas)
│   ├── ServiceShowcase3D.jsx
│   ├── LocationPin3D.jsx
│   └── shared/
│       ├── Loader.jsx               (Suspense fallback)
│       └── lights.jsx               (ortak ışıklandırma)
├── styles/
│   ├── tokens.css                   (CSS variables — palette/font/space)
│   ├── reset.css
│   └── motion.css                   (reduced-motion overrides)
└── data/
    ├── milestones.js                (Hikayemiz yıllar)
    ├── stations.js                  (7 üretim adımı içerik)
    ├── services.js
    └── clients.js
```

Mevcut `src/` klasörüne **TEK BİR EDİT** yapılır: `src/App.jsx` veya kök router içine `/v2/*` rotası eklenir ve `src-v2/routes.jsx`'a delege edilir. Bunun dışında hiçbir V1 dosyası değişmez.

---

## 5. Bağımlılıklar

Zaten kurulu (varsayım — onay aşamasında doğrulanacak):
- `three`, `@react-three/fiber`, `@react-three/drei`, `react`, `react-dom`, `vite`

Eklenecek:
- `react-router-dom` (multi-page için, eğer yoksa)
- `framer-motion` (transition + reveal)
- `@studio-freight/lenis` VEYA `locomotive-scroll` (smooth scroll — Lenis öneri: lighter, R3F dostu)

Eklenmeyecek (gereksiz):
- GSAP (Framer Motion + Lenis yeterli)
- Spline (kontrol kaybı)
- Tailwind (mevcut CSS yapısıyla uyum için vanilla CSS + tokens.css)

---

## 6. Performans Bütçesi

| Metrik | Hedef |
|--------|-------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTI | < 3.5s |
| Bundle (initial) | < 200KB gzip |
| Her 3D sahne (lazy chunk) | < 150KB gzip |
| GLB modeller | < 1MB her biri, draco compressed |
| FPS hedefi | 60fps desktop, 30fps mobile minimum |

Stratejiler:
- Sahneler `React.lazy` ile route-level lazy
- `useGLTF.preload()` sadece bir sonraki rotada
- `removeClippedSubviews` mantığı: viewport dışı sahneler `<Canvas frameloop="demand">`
- Image `srcSet` + AVIF/WebP, `<img loading="lazy" decoding="async">`

---

## 7. SEO Çerçevesi

Her sayfa için `SEOHead` propları:
- `title` — under 60 char, Türkçe
- `description` — 150–160 char
- `canonical` — `https://guvencoglu.com/v2/...`
- `og:image` — 1200×630, sayfaya özel
- `schema` — JSON-LD, sayfa tipine göre

Site geneli:
- `<html lang="tr">`
- `/sitemap.xml` — 6 sayfa
- `/robots.txt` — V2 izinli, sandbox path'ler dışlanmış
- Breadcrumb schema her sayfada

---

## 8. Mobil Strateji

- < 768px: tüm sticky 3D sahneler statik resim galerisine düşer (`<picture>` source breakpoint)
- WorkshopScene 7 station → 7 swipe-able card (`overflow-x: auto; scroll-snap-type: x mandatory`)
- TimelineTunnel yatay → dikey
- Nav: hamburger + full-screen drawer
- Touch hedef ≥ 44px, primary CTA thumb-zone (alt 25%)
- prefers-reduced-data → 3D tamamen kapalı, sadece fotoğraf

---

## 9. İnşa Sırası (Onay Sonrası)

1. **Foundation:** klasör + tokens.css + routes + LayoutV2 (3D yok)
2. **HomeV2 iskelet:** mevcut hero bridge + nav + footer (3D yok)
3. **PageTransition + Lenis** kur ve doğrula
4. **HomeV2 3D:** ThreadSpool sahnesi
5. **StoryV2 + TimelineTunnel**
6. **ProcessV2 + WorkshopScene** (en ağır — son'a kalır)
7. **ServicesV2, ReferencesV2, ContactV2** paralel
8. **SEOHead + sitemap + schema**
9. **Mobil fallback geçişi**
10. **Lighthouse + Core Web Vitals doğrulama**

Her adım sonunda küçük commit. Sen onaylamadan birleşik bir patlama yok.

---

## 10. Risk & Bilinmezler

- **Mevcut hero sahnesi bağımlılıkları:** V2 router içine sokulurken state/context çakışması olabilir. → `HeroOriginalBridge` izole eder.
- **Smooth scroll + R3F senkron:** Lenis ScrollTrigger yerine R3F `useScroll` ile çakışmasın. → Lenis `lerp:0.1` ve R3F için custom raf bağlantısı.
- **GLB asset yok:** 7 station için model lazım. Plan B: primitif geometriler + procedural shader. (V1'de import edilmiş model varsa onay sonrası kontrol edilecek.)
- **package.json güncel mi:** Kurulu paketler onay aşamasında doğrulanacak; eksikse `npm install` adımı planın ilk maddesine eklenir.

---

## DURMA NOKTASI

Bu plan onayını bekliyor. Geri bildirim alanları:
- [ ] Palet ve tipografi onayı
- [ ] 6 sayfa vizyonu / mesajlar onayı
- [ ] Her sayfanın 3D konsept onayı (özellikle WorkshopScene 7 station)
- [ ] Klasör yapısı onayı
- [ ] Bağımlılık eklenmesi onayı (framer-motion, lenis, react-router-dom)
- [ ] İnşa sırası onayı

Onaylanmamış maddeleri belirt, revize edip tekrar sunayım. "Devam et" dersen, ADIM 2 (foundation kurulumu) başlar.
