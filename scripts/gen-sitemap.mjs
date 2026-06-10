/* Post-build: dist/sitemap.xml + dist/robots.txt üretir.
   Statik route'lar + tüm blog slug'ları (frontmatter slug/date'ten). */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://guvencoglutekstil.com'
const DIST = join(ROOT, 'dist')
const POSTS_DIR = join(ROOT, 'src-v2', 'blog', 'posts')

const TODAY = new Date().toISOString().slice(0, 10)

// Statik route'lar (routes.jsx ile aynı yollar)
const STATIC_ROUTES = ['/', '/biz-ve-is-ortaklarimiz', '/hizmetler', '/blog', '/iletisim']

// Basit frontmatter parser — sadece düz "key: value" satırları.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!m) return {}
  const fm = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (key) fm[key] = val
  }
  return fm
}

function collectPosts() {
  if (!existsSync(POSTS_DIR)) return []
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const fm = parseFrontmatter(readFileSync(join(POSTS_DIR, f), 'utf8'))
      return {
        slug: fm.slug || f.replace(/\.mdx$/, ''),
        lastmod: fm.date || TODAY,
      }
    })
}

function urlEntry(loc, lastmod) {
  return `  <url>\n    <loc>${ORIGIN}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
}

const posts = collectPosts()
const entries = [
  ...STATIC_ROUTES.map((r) => urlEntry(r, TODAY)),
  ...posts.map((p) => urlEntry(`/blog/${p.slug}`, p.lastmod)),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`

writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
writeFileSync(join(DIST, 'robots.txt'), robots)

console.log(
  `[gen-sitemap] sitemap.xml (${entries.length} url, ${posts.length} blog) + robots.txt yazildi.`,
)
