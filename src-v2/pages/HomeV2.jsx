import PageTransition from '../shared/PageTransition.jsx'
import SEOHead from '../shared/SEOHead.jsx'
import ImpactStats from '../shared/ImpactStats.jsx'
import FeaturedWork from '../shared/FeaturedWork.jsx'
import FoundersQuote from '../shared/FoundersQuote.jsx'
import CTABand from '../shared/CTABand.jsx'
import GiantBrandMark from '../shared/GiantBrandMark.jsx'
import HeroOriginalBridge from '../scenes/HeroOriginalBridge.jsx'
import ThreadSpool from '../scenes/ThreadSpool.jsx'

export default function HomeV2() {
  return (
    <PageTransition>
      <SEOHead
        title="Güvencoğlu Tekstil — 1980'den beri ipliği hikayeye dönüştürüyoruz"
        description="Fethiye merkezli, kendi üretim tesisli tekstil firması. Konfeksiyon, nakış, baskı ve toplu üretim için 45 yıllık deneyim."
        path="/v2"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Güvencoğlu Tekstil',
          foundingDate: '1980',
          url: 'https://guvencoglutekstil.com/v2',
          address: { '@type': 'PostalAddress', addressLocality: 'Fethiye', addressRegion: 'Muğla', addressCountry: 'TR' },
        }}
      />

      <HeroOriginalBridge />
      <ThreadSpool />
      <ImpactStats />
      <FeaturedWork />
      <FoundersQuote />
      <CTABand />
      <GiantBrandMark />
    </PageTransition>
  )
}
