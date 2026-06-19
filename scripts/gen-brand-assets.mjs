/* gen-brand-assets.mjs — tek seferlik marka asset üretimi (manuel çalıştır).
   `node scripts/gen-brand-assets.mjs`

   Üretilenler (public/):
   - apple-touch-icon.png (180) · favicon-32x32.png · favicon-16x16.png · favicon.ico
     → mevcut favicon.svg mark'ıyla (navy + copper kemer + G) aynı, kare full-bleed.
   - og-image.jpg (1200×630) → PLACEHOLDER kurumsal kapak (krem/navy/kırmızı palet).
     Gerçek OG görseli sonra değişir; şimdilik sosyal paylaşım kırık olmasın.

   favicon.svg ve theme-color KORUNUR; bu script yalnızca eksik formatları ekler.
   Build bu script'i ÇAĞIRMAZ — üretilen dosyalar repo'ya commit'lenir. */

import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PUB = 'public'

// Kare marka ikonu (favicon.svg ile aynı mark, köşe yuvarlama tarayıcı/iOS'a bırakılır)
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" fill="#0A2463"/>
  <path d="M14 42 Q32 14 50 42" stroke="#D4A373" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="32" y="54" font-family="Georgia, serif" font-size="14" font-weight="700" fill="#F5F5F0" text-anchor="middle">G</text>
</svg>`

// PNG → tek görselli ICO (PNG payload; Vista+ / modern tarayıcılar destekler)
function pngToIco(png, size) {
  const head = Buffer.alloc(6)
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4)
  const dir = Buffer.alloc(16)
  dir.writeUInt8(size, 0); dir.writeUInt8(size, 1); dir.writeUInt8(0, 2); dir.writeUInt8(0, 3)
  dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6)
  dir.writeUInt32LE(png.length, 8); dir.writeUInt32LE(22, 12)
  return Buffer.concat([head, dir, png])
}

await sharp(Buffer.from(iconSvg(180))).png().toFile(join(PUB, 'apple-touch-icon.png'))
await sharp(Buffer.from(iconSvg(32))).png().toFile(join(PUB, 'favicon-32x32.png'))
await sharp(Buffer.from(iconSvg(16))).png().toFile(join(PUB, 'favicon-16x16.png'))
const png32 = await sharp(Buffer.from(iconSvg(32))).png().toBuffer()
writeFileSync(join(PUB, 'favicon.ico'), pngToIco(png32, 32))

// OG kapak — 1200×630, sade kurumsal placeholder
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#EFEAE0"/>
  <rect width="1200" height="10" fill="#9A0002"/>
  <rect x="0" y="620" width="1200" height="10" fill="#2D3142"/>
  <text x="600" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="110" font-weight="700" fill="#2D3142" text-anchor="middle">GÜVENÇOĞLU</text>
  <text x="600" y="372" font-family="Georgia, serif" font-size="42" font-weight="400" fill="#9A0002" text-anchor="middle" letter-spacing="18">TEKSTİL</text>
  <line x1="520" y1="430" x2="680" y2="430" stroke="#9A0002" stroke-width="3"/>
  <text x="600" y="482" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#5A5A5A" text-anchor="middle">Kurumsal Üniforma · 2001'den beri · Fethiye</text>
</svg>`
await sharp(Buffer.from(og)).jpeg({ quality: 86 }).toFile(join(PUB, 'og-image.jpg'))

console.log('Marka assetleri üretildi: apple-touch-icon.png, favicon-32x32.png, favicon-16x16.png, favicon.ico, og-image.jpg')
