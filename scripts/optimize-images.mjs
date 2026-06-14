/* optimize-images.mjs — tek seferlik medya optimizasyonu (manuel çalıştır).
   `node scripts/optimize-images.mjs`

   Sitede KULLANILAN büyük JPG'leri gösterim boyutuna indirir + WebP'ye çevirir.
   Orijinal en-boy oranı korunur (sadece genişlik sınırı, withoutEnlargement).
   Çıktı public/<ad>.webp; referanslar ayrıca .webp'ye güncellenir, orijinal
   JPG'ler bu commit'te silinir (tek format yeter, WebP geniş destekli).

   Build bu script'i ÇAĞIRMAZ — üretilen .webp dosyaları repo'ya commit'lenir. */

import sharp from 'sharp'
import { statSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC = 'public'
const QUALITY = 80

// Tüm büyük paneller/kartlar background-image olarak kullanılıyor → tek makul
// genişlik (~1600px) hero/interlock için yeterli, kartlarda da downscale olur.
const JOBS = [
  { file: 'saglik-main.jpg', width: 1600 },
  { file: 'otel-main.jpg', width: 1600 },
  { file: 'okul-main.jpg', width: 1600 },
  { file: 'atolye-uretim.jpg', width: 1600 },
  { file: 'atolye-zanaat.jpg', width: 1600 },
  { file: 'atolye-renk.jpg', width: 1600 },
  { file: 'miras.jpg', width: 1600 },
]

const kb = (p) => (statSync(p).size / 1024).toFixed(0)

let beforeTotal = 0
let afterTotal = 0

for (const { file, width } of JOBS) {
  const src = join(PUBLIC, file)
  // Orijinal JPG'ler ilk turdan sonra silindi → kaynak yoksa atla (re-runnable).
  if (!existsSync(src)) {
    console.log(`  ${file.padEnd(20)} (kaynak yok, atlandı)`)
    continue
  }
  const out = join(PUBLIC, file.replace(/\.(jpe?g|png)$/i, '.webp'))
  const before = Number(kb(src))
  const meta = await sharp(src).metadata()
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)
  const after = Number(kb(out))
  beforeTotal += before
  afterTotal += after
  console.log(
    `  ${file.padEnd(20)} ${meta.width}px → ${Math.min(width, meta.width)}px  ` +
      `${before} KB → ${after} KB`,
  )
}

if (beforeTotal > 0) {
  console.log(
    `\n[optimize-images] ${JOBS.length} görsel: ${beforeTotal} KB → ${afterTotal} KB ` +
      `(%${Math.round((1 - afterTotal / beforeTotal) * 100)} azalma)`,
  )
}

// ── WebP yeniden sıkıştırma (kaynak .jpg silinmiş; mevcut .webp'den, in-place) ──
// okul-main portre + detaylı → 1600px/q80'de büyük kaldı; 1280px/q72 ile ~300KB.
const RECOMPRESS = [{ file: 'okul-main.webp', width: 1280, quality: 72 }]

for (const { file, width, quality } of RECOMPRESS) {
  const path = join(PUBLIC, file)
  if (!existsSync(path)) continue
  const before = Number(kb(path))
  const meta = await sharp(path).metadata()
  // Aynı dosyaya yazacağımız için önce belleğe oku (read/write çakışmasını önle).
  const buf = readFileSync(path)
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(path)
  console.log(
    `  ${file.padEnd(20)} ${meta.width}px → ${Math.min(width, meta.width)}px  ` +
      `q${quality}  ${before} KB → ${Number(kb(path))} KB`,
  )
}
