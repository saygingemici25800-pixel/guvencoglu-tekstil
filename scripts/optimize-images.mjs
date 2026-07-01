/* optimize-images.mjs — tek seferlik medya optimizasyonu (manuel çalıştır).
   `node scripts/optimize-images.mjs`

   Sitede KULLANILAN büyük JPG'leri gösterim boyutuna indirir + WebP'ye çevirir.
   Orijinal en-boy oranı korunur (sadece genişlik sınırı, withoutEnlargement).
   Çıktı public/<ad>.webp; referanslar ayrıca .webp'ye güncellenir, orijinal
   JPG'ler bu commit'te silinir (tek format yeter, WebP geniş destekli).

   Build bu script'i ÇAĞIRMAZ — üretilen .webp dosyaları repo'ya commit'lenir. */

import sharp from 'sharp'
import { statSync, existsSync, readFileSync, readdirSync, unlinkSync } from 'node:fs'
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

// ── Sektör yelpaze fotoğrafları (gerçek foto → WebP, kart gösterim boyutu) ──
// Kaynaklar public/ kökünde (saglik-doctor.jpg vb.; bazıları bozuk çift-uzantılı
// "ad.jpg .jpeg"). Her base ad ile kaynak bulunur, <base>.webp (~900px q78) yazılır,
// büyük kaynak silinir. Bulunamayan base atlanır (o kart placeholder kalır).
const SECTOR_BASES = [
  'saglik-doctor', 'saglik-nurse', 'saglik-surgical', 'saglik-patient', 'saglik-lab', 'saglik-support',
  'otel-frontoffice', 'otel-bellstaff', 'otel-guest', 'otel-housekeeping', 'otel-fb', 'otel-kitchen', 'otel-engineering', 'otel-spa',
  'okul-student', 'okul-academic', 'okul-admin', 'okul-sports', 'okul-corporate',
  'restoran-chef', 'restoran-service', 'restoran-host', 'restoran-barista', 'restoran-busser', 'restoran-prep',
]
const SECTOR_WIDTH = 900
const SECTOR_Q = 78

{
  const files = readdirSync(PUBLIC)
  let secBefore = 0
  let secAfter = 0
  let done = 0
  const missing = []
  for (const base of SECTOR_BASES) {
    const out = join(PUBLIC, `${base}.webp`)
    const srcName = files.find(
      (f) => f.startsWith(base) && !/\.webp$/i.test(f) && /\.(jpe?g|png)/i.test(f),
    )
    if (!srcName) {
      if (!existsSync(out)) missing.push(base)
      continue
    }
    const src = join(PUBLIC, srcName)
    const before = Number(kb(src))
    const meta = await sharp(src).metadata()
    await sharp(src).resize({ width: SECTOR_WIDTH, withoutEnlargement: true }).webp({ quality: SECTOR_Q }).toFile(out)
    unlinkSync(src) // büyük kaynağı sil (tek format yeter, WebP geniş destekli)
    secBefore += before
    secAfter += Number(kb(out))
    done++
    console.log(`  ${base.padEnd(22)} ${meta.width}px → ${Math.min(SECTOR_WIDTH, meta.width)}px  ${before} KB → ${kb(out)} KB`)
  }
  console.log(
    `\n[sektör] ${done} foto: ${secBefore} KB → ${secAfter} KB; ` +
      `eksik: ${missing.length ? missing.join(', ') : 'yok'}`,
  )
}

// ── Üretim Tesisi + İş Kıyafetleri + hero gerçek fotoları (geçici → gerçek WebP) ──
// Kaynak public/<base>.(jpg|jpeg|png); <base>.webp (kart/hero boyutu) yazılır, ham
// kaynak silinir (repoya tek format girsin). Bulunamayan base atlanır → o slot
// geçici fotoda kalır (kırık img değil). Üretim/İş kartları ~900px q78, hero ~1200px q80.
const REAL_JOBS = [
  { base: 'uretim-nakis', width: 900, quality: 78 },
  { base: 'uretim-baski', width: 900, quality: 78 },
  { base: 'uretim-toplu', width: 900, quality: 78 },
  { base: 'is-tulum', width: 900, quality: 78 },
  { base: 'is-reflektor', width: 900, quality: 78 },
  { base: 'is-yagmurluk', width: 900, quality: 78 },
  { base: 'is-guvenlik', width: 900, quality: 78 },
  { base: 'is-ayakkabi', width: 900, quality: 78 },
  { base: 'is-baret', width: 900, quality: 78 },
  { base: 'is-eldiven', width: 900, quality: 78 },
  { base: 'is-kislik', width: 900, quality: 78 },
  { base: 'hero-is', width: 1200, quality: 80 },
]
{
  const files = readdirSync(PUBLIC)
  let rBefore = 0
  let rAfter = 0
  let done = 0
  const missing = []
  for (const { base, width, quality } of REAL_JOBS) {
    const out = join(PUBLIC, `${base}.webp`)
    const srcName = files.find(
      (f) => f.startsWith(`${base}.`) && !/\.webp$/i.test(f) && /\.(jpe?g|png)$/i.test(f),
    )
    if (!srcName) {
      if (!existsSync(out)) missing.push(base)
      continue
    }
    const src = join(PUBLIC, srcName)
    const before = Number(kb(src))
    const meta = await sharp(src).metadata()
    await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(out)
    unlinkSync(src) // ham kaynağı sil (tek format yeter, WebP geniş destekli)
    rBefore += before
    rAfter += Number(kb(out))
    done++
    console.log(`  ${base.padEnd(22)} ${meta.width}px → ${Math.min(width, meta.width)}px  q${quality}  ${before} KB → ${kb(out)} KB`)
  }
  console.log(
    `\n[gerçek foto] ${done} foto: ${rBefore} KB → ${rAfter} KB; ` +
      `eksik (geçici kalır): ${missing.length ? missing.join(', ') : 'yok'}`,
  )
}
