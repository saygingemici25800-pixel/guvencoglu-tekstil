// Placeholder client tiles — swap individual entries with real brand names
// and logo SVG paths when client permission lists are finalized.
export const CLIENT_SECTORS = [
  { id: 'okul',      label: 'Okul & Eğitim',     count: 28 },
  { id: 'otel',      label: 'Otel & Resort',     count: 18 },
  { id: 'saglik',    label: 'Sağlık',            count: 14 },
  { id: 'kamu',      label: 'Belediye & Kamu',   count: 11 },
  { id: 'restoran',  label: 'F&B / Restoran',    count: 16 },
  { id: 'lojistik',  label: 'Lojistik',          count: 9 },
]

export const CLIENTS = [
  { id: 1,  initials: 'LE', name: 'Likya Eğitim Kurumları',     sector: 'okul',     since: '2009', note: '15+ yıllık üniforma ortağı' },
  { id: 2,  initials: 'AR', name: 'Akdeniz Resort Hotels',      sector: 'otel',     since: '2014', note: '6 zincir · housekeeping & F&B' },
  { id: 3,  initials: 'FB', name: 'Fethiye Belediyesi',         sector: 'kamu',     since: '2011', note: 'Tüm saha personeli' },
  { id: 4,  initials: 'MS', name: 'Muğla Sağlık Grubu',         sector: 'saglik',   since: '2017', note: 'Medikal seri üniforma' },
  { id: 5,  initials: 'OK', name: 'Ölüdeniz Kıyı Otelleri',     sector: 'otel',     since: '2013', note: '4 lokasyon' },
  { id: 6,  initials: 'KL', name: 'Kıyı Lojistik',              sector: 'lojistik', since: '2019', note: 'Saha kıyafetleri & yansıma' },
  { id: 7,  initials: 'GE', name: 'Göcek Eğitim Vakfı',         sector: 'okul',     since: '2015', note: 'Tüm kademeler' },
  { id: 8,  initials: 'EM', name: 'Ege Meslek Liseleri',        sector: 'okul',     since: '2012', note: '11 lise · forma + atölye' },
  { id: 9,  initials: 'AF', name: 'Akdeniz F&B Group',          sector: 'restoran', since: '2018', note: 'Şef & servis kıyafeti' },
  { id: 10, initials: 'TÜ', name: 'Tatlık Üniversite Kampüsleri', sector: 'okul',   since: '2020', note: 'Akademik & idari' },
  { id: 11, initials: 'BD', name: 'Bodrum Marina Hospitality',  sector: 'otel',     since: '2016', note: '3 marina' },
  { id: 12, initials: 'KO', name: 'Kuzey Ova Kafe Zinciri',     sector: 'restoran', since: '2021', note: '14 şube' },
]

export const REF_METRICS = [
  { value: 480, suffix: '+', label: 'Aktif Müşteri',     hint: 'Kurumsal & B2B' },
  { value: 99,  suffix: '%', label: 'Yenileme Oranı',    hint: 'Geri dönüş & devam' },
  { value: 35,  suffix: '+', label: 'Yıllık Partnerler', hint: '20+ yıl süren ilişkiler' },
]

export const TESTIMONIAL = {
  quote:
    'Sezonluk patlama olur, biz arar; iki gün içinde örnek tezgâhta. Sekiz yıldır aynı disiplin, aynı söz: anlaşılmış miktarı, anlaşılmış sürede.',
  author: 'Satınalma Müdürü',
  attribution: 'Akdeniz Resort Hotels · Fethiye',
}
