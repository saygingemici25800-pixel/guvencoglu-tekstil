/* İçerik giriş animasyonu ↔ preloader senkronu (saf JS, modül yükünde hesaplanır).

   Preloader bu yüklemede gösterilecekse (ilk ziyaret + motion ok), viewport'ta zaten
   görünür olan giriş animasyonları (hero, ilk-ekran Reveal'leri) preloader fade-out'a
   kadar bekler → preloader biterken birlikte/yumuşak girerler (boşluk/çakışma olmadan).
   Preloader yoksa (oturum içi gezinme / reduced-motion / no-JS) → 0 döner → anında giriş.

   Not: 'gt_preloaded' flag'i Preloader mount'unda set edilir; bu modül IMPORT anında
   (her React render/effect'ten ÖNCE) okuduğu için ilk ziyarette doğru (henüz set değil). */

const BOOT_AT = typeof performance !== 'undefined' ? performance.now() : 0

let preloaderThisLoad = false
if (typeof window !== 'undefined') {
  try {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const already = sessionStorage.getItem('gt_preloaded') === '1'
    preloaderThisLoad = !reduce && !already
  } catch {}
}

// Preloader fade-out anına (~boot + SYNC_TARGET) kadar kalan süre (ms). Yalnızca
// on-mount (ilk yüklemede ekranda olan) girişler bunu transition-delay'e ekler.
const SYNC_TARGET = 1600

export function entranceSyncDelay() {
  if (!preloaderThisLoad) return 0
  const now = typeof performance !== 'undefined' ? performance.now() : 0
  const elapsed = now - BOOT_AT
  if (elapsed >= SYNC_TARGET) return 0 // preloader penceresi geçti (SPA gezinme) → gecikme yok
  return Math.round(SYNC_TARGET - elapsed)
}
