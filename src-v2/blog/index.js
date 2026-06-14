/* Build-time blog index — tüm posts/*.mdx dosyalarını toplar.
   Her .mdx: default export = MDX bileşeni, named export `frontmatter`.
   readingTime frontmatter'da yoksa ham içerikten otomatik hesaplanır. */

const modules = import.meta.glob('./posts/*.mdx', { eager: true })

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.mdx$/, '')
}

export const POSTS = Object.entries(modules)
  .map(([path, mod]) => {
    const fm = mod.frontmatter || {}
    // readingTime opsiyonel — frontmatter'da varsa kullan (SSR/client deterministik).
    const rt = Number(fm.readingTime)
    return {
      slug: fm.slug || slugFromPath(path),
      Component: mod.default,
      frontmatter: {
        title: fm.title || 'Başlıksız yazı',
        description: fm.description || '',
        date: fm.date || '1970-01-01',
        sector: fm.sector || 'genel',
        cover: fm.cover || null,
        readingTime: Number.isFinite(rt) && rt > 0 ? rt : null,
      },
    }
  })
  // En yeni üstte — ISO tarih string'leri sözlüksel olarak da doğru sıralanır.
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))

export const ALL_SLUGS = POSTS.map((p) => p.slug)

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug) || null
}

export const SECTOR_LABELS = {
  saglik: 'Sağlık',
  otel: 'Otel',
  okul: 'Okul/Kurumsal',
  genel: 'Genel',
}

const TR_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
]

// ISO 'YYYY-MM-DD' → '9 Haziran 2026' (tz-bağımsız, deterministik).
export function formatTrDate(iso) {
  const [y, m, d] = String(iso || '').split('-').map(Number)
  if (!y || !m || !d) return String(iso || '')
  return `${d} ${TR_MONTHS[m - 1]} ${y}`
}
