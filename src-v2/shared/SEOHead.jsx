import { useEffect } from 'react'

const ORIGIN = 'https://guvencoglutekstil.com'

function upsertMeta(attr, value, content) {
  let el = document.head.querySelector(`meta[${attr}="${value}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

export default function SEOHead({ title, description, path, ogImage, schema }) {
  useEffect(() => {
    document.documentElement.lang = 'tr'
    if (title) document.title = title

    const url = `${ORIGIN}${path || ''}`
    if (description) upsertMeta('name', 'description', description)
    upsertLink('canonical', url)

    if (title) upsertMeta('property', 'og:title', title)
    if (description) upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', 'tr_TR')
    if (ogImage) upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    if (title) upsertMeta('name', 'twitter:title', title)
    if (description) upsertMeta('name', 'twitter:description', description)
    if (ogImage) upsertMeta('name', 'twitter:image', ogImage)

    let schemaEl = document.head.querySelector('script[data-v2-schema]')
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement('script')
        schemaEl.type = 'application/ld+json'
        schemaEl.setAttribute('data-v2-schema', 'true')
        document.head.appendChild(schemaEl)
      }
      schemaEl.textContent = JSON.stringify(schema)
    } else if (schemaEl) {
      schemaEl.remove()
    }
  }, [title, description, path, ogImage, schema])

  return null
}
