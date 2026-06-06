import { Head } from 'vite-react-ssg'

/* SEOHead — SSG-uyumlu. Meta/JSON-LD'yi vite-react-ssg <Head> (react-helmet
   sarmalayıcı) ile render eder; prerender sırasında statik HTML <head>'ine
   basılır. Prop arayüzü korunur: title, description, path, ogImage, schema. */

const ORIGIN = 'https://guvencoglutekstil.com'

export default function SEOHead({ title, description, path, ogImage, schema }) {
  const url = `${ORIGIN}${path || ''}`

  return (
    <Head>
      <html lang="tr" />
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Head>
  )
}
