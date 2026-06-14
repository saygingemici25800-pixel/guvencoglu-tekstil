/* inline-loader-data.mjs — post-build adımı (gen-sitemap'ten önce çalışır).

   SORUN (prod): vite-react-ssg data-router, her SSG route'una otomatik bir loader
   ekler. Site-içi gezinmede (ör. ana sayfadan /biz-ve-is-ortaklarimiz'e tıklama)
   bu loader şunları fetch'ler:
     /static-loader-data-manifest-<hash>.json  ve  /static-loader-data/<route>.<hash>.json
   ardından .json() çağırır. <hash> her deploy'da değişir ve HTML'e gömülüdür.
   Tarayıcı/CDN ESKİ bir deploy'un HTML'ini çalıştırırsa (eski hash), o hash'li
   loader dosyaları yeni deploy'da artık YOK → Vercel 404 HTML döner → .json()
   "Unexpected token 'T', \"The page c\"... is not valid JSON" fırlatır ve route
   render'ı çöker.

   ÇÖZÜM: Loader manifest + (null) verilerini her HTML'e GÖM. Client kodu
     if(!window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__){...fetch...}
     if(!window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[h]){...fetch...}
   şeklinde guard'lı; bu global'leri önceden set edince client HİÇ fetch yapmaz →
   404/hash uyuşmazlığından tamamen bağımsız olur. (Veri minik: tüm route'lar null.)
   Gömülen değerler, başarılı bir fetch'in set edeceği değerlerle birebir aynıdır;
   davranış değişmez, yalnızca ağ isteği elenir.

   Not: Kütüphane global adları bir gün değişirse bu adım sessizce eski (fetch'li)
   davranışa döner — regresyon riski yok. */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const MANIFEST_GLOBAL = '__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__'
const DATA_GLOBAL = '__VITE_REACT_SSG_STATIC_LOADER_DATA__'
const ANCHOR = '<script>window.__VITE_REACT_SSG_HASH__'

// JSON'u <script> içine güvenli gömmek için '<' kaçışı
const safe = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkHtml(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

// 1) manifest dosyasını bul
const manifestFile = readdirSync(DIST).find((f) =>
  /^static-loader-data-manifest-.*\.json$/.test(f),
)
if (!manifestFile) {
  console.log('[inline-loader-data] manifest yok — atlanıyor (loader-data üretilmemiş).')
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(join(DIST, manifestFile), 'utf8'))

// 2) route → loader verisi haritası (her route'un veri dosyasını oku)
const dataByPath = {}
for (const [route, rel] of Object.entries(manifest)) {
  try {
    dataByPath[route] = JSON.parse(readFileSync(join(DIST, rel), 'utf8'))
  } catch {
    dataByPath[route] = null
  }
}

// 3) gömülecek klasik (senkron) script — deferred app.js'ten ÖNCE çalışır
const payload =
  `<script>window.${MANIFEST_GLOBAL}=${safe(manifest)};` +
  `window.${DATA_GLOBAL}=${safe(dataByPath)};</script>`

// 4) her HTML'e enjekte et (idempotent)
let injected = 0
for (const file of walkHtml(DIST)) {
  let html = readFileSync(file, 'utf8')
  if (html.includes(DATA_GLOBAL)) continue // zaten gömülü
  if (html.includes(ANCHOR)) {
    html = html.replace(ANCHOR, payload + ANCHOR)
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', payload + '</head>')
  } else {
    continue
  }
  writeFileSync(file, html)
  injected++
}

console.log(
  `[inline-loader-data] ${injected} HTML'e loader verisi gömüldü ` +
    `(${Object.keys(manifest).length} route) — client artık loader JSON fetch'lemez.`,
)
