/* optimize-images.mjs — tek seferlik medya optimizasyonu (manuel çalıştır).
   `node scripts/optimize-images.mjs`

   Sitede KULLANILAN büyük JPG'leri gösterim boyutuna indirir + WebP'ye çevirir.
   Orijinal en-boy oranı korunur (sadece genişlik sınırı, withoutEnlargement).
   Çıktı public/<ad>.webp; referanslar ayrıca .webp'ye güncellenir, orijinal
   JPG'ler bu commit'te silinir (tek format yeter, WebP geniş destekli).

   Build bu script'i ÇAĞIRMAZ — üretilen .webp dosyaları repo'ya commit'lenir. */

import sharp from 'sharp'
import { statSync } from 'node:fs'
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

console.log(
  `\n[optimize-images] ${JOBS.length} görsel: ${beforeTotal} KB → ${afterTotal} KB ` +
    `(%${Math.round((1 - afterTotal / beforeTotal) * 100)} azalma)`,
)
