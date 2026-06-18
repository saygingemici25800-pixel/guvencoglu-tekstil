/* ──────────────────────────────────────────────────────────────
   Ne Yapıyoruz — sektör alt sayfaları verisi (PLACEHOLDER).
   Her bölüm: İngilizce terim + kısa TR açıklama + foto anahtar kelimesi.
   Gerçek fotolar sonra .sp-photo slotuna <img> olarak girecek.
   clients: placeholder logo kutuları (gerçek logolar gelince <img>).
   ────────────────────────────────────────────────────────────── */

export const makeClients = (label) =>
  Array.from({ length: 12 }, (_, i) => `${label} ${String(i + 1).padStart(2, '0')}`)

// Switcher + prev/next sırası
export const SEKTOR_ORDER = ['saglik', 'otel', 'okul', 'restoran']

export const SEKTORLER = {
  saglik: {
    slug: 'saglik',
    label: 'Sağlık',
    title: 'Sağlık Üniforması',
    lede: 'Hastane, klinik, eczane ve laboratuvar ekipleri için hijyenik, dayanıklı ve kuruma özel medikal kıyafetler.',
    seoTitle: 'Sağlık Üniforması — Güvençoğlu Tekstil',
    seoDesc: 'Doktor önlüğü, hemşire ve cerrahi scrub, hasta önlüğü, laboratuvar ve destek personeli için kurumsal sağlık üniformaları. Fethiye’deki kendi tesisimizde üretim.',
    sections: [
      { term: 'Doctor Coat', desc: 'Hekimler için klasik beyaz önlük; antibakteriyel, kolay ütülenen kumaş.', photo: 'doctor white coat' },
      { term: 'Nurse Scrubs', desc: 'Hemşire ekipleri için rahat kesim, yoğun yıkamaya dayanıklı scrub takımları.', photo: 'nurse scrubs' },
      { term: 'Surgical Scrubs', desc: 'Ameliyathane için sıvı iticili, steril sürece uygun cerrahi takımlar.', photo: 'surgical scrubs operating room' },
      { term: 'Patient Gown', desc: 'Hastalar için pratik kapamalı, yumuşak dokulu hasta önlükleri.', photo: 'patient gown hospital' },
      { term: 'Lab / Technician', desc: 'Laboratuvar ve teknik personel için korumalı önlük ve tulumlar.', photo: 'lab technician coat' },
      { term: 'Support Staff', desc: 'Resepsiyon, temizlik ve destek ekipleri için kurum kimliğine uygun kıyafet.', photo: 'hospital support staff uniform' },
    ],
  },
  otel: {
    slug: 'otel',
    label: 'Otel',
    title: 'Otel Üniforması',
    lede: 'Önbürodan mutfağa, kat hizmetlerinden spa’ya kadar tüm departmanlar için tutarlı, şık ve dayanıklı otel kıyafetleri.',
    seoTitle: 'Otel Üniforması — Güvençoğlu Tekstil',
    seoDesc: 'Resepsiyon, bell staff, guest relations, housekeeping, F&B, mutfak, teknik servis ve spa ekipleri için kurumsal otel üniformaları.',
    sections: [
      { term: 'Front Office', desc: 'Resepsiyon ve önbüro için kurum kimliğini yansıtan şık takımlar.', photo: 'hotel front office reception uniform' },
      { term: 'Bell Staff', desc: 'Bellboy ve kapı ekibi için klasik, dikkat çekici üniformalar.', photo: 'hotel bellboy uniform' },
      { term: 'Guest Relations', desc: 'Misafir ilişkileri ekibi için zarif, kurumsal kıyafetler.', photo: 'hotel guest relations uniform' },
      { term: 'Housekeeping', desc: 'Kat hizmetleri için rahat, yoğun kullanıma dayanıklı üniformalar.', photo: 'hotel housekeeping uniform' },
      { term: 'F&B Service', desc: 'Restoran ve servis ekibi için hareketi kolaylaştıran şık takımlar.', photo: 'hotel food beverage service uniform' },
      { term: 'Kitchen / Chef', desc: 'Mutfak ve şef kadrosu için ısıya dayanıklı, profesyonel kıyafetler.', photo: 'hotel chef kitchen uniform' },
      { term: 'Engineering', desc: 'Teknik servis için güvenli, dayanıklı iş kıyafetleri.', photo: 'hotel engineering technical staff' },
      { term: 'Spa & Wellness', desc: 'Spa ve wellness ekibi için yumuşak dokulu, sakin tonlu kıyafetler.', photo: 'hotel spa wellness uniform' },
    ],
  },
  okul: {
    slug: 'okul',
    label: 'Okul',
    title: 'Okul Üniforması',
    lede: 'Anaokulundan liseye öğrenciler ve akademik/idari kadro için dayanıklı, rahat ve kurum kimliğine uygun üniformalar.',
    seoTitle: 'Okul Üniforması — Güvençoğlu Tekstil',
    seoDesc: 'Öğrenci üniforması, akademik ve idari kadro, spor/beden eğitimi ve kurumsal ofis kıyafetleri. Nakışlı okul logosu ve isim baskısı.',
    sections: [
      { term: 'Student Uniform', desc: 'Gömlek, pantolon, etek, hırka ve kazak; yoğun kullanıma dayanıklı.', photo: 'school student uniform' },
      { term: 'Academic Staff', desc: 'Öğretmenler için kurum kimliğine uygun şık kıyafetler.', photo: 'school teacher academic staff' },
      { term: 'Administrative', desc: 'İdari kadro için kurumsal, sade ofis kıyafetleri.', photo: 'school administrative office uniform' },
      { term: 'Sports / PE', desc: 'Beden eğitimi için eşofman ve spor takımları.', photo: 'school sports physical education uniform' },
      { term: 'Corporate Office', desc: 'Kurum ofisi için tutarlı, profesyonel kıyafet seti.', photo: 'corporate office uniform' },
    ],
  },
  restoran: {
    slug: 'restoran',
    label: 'Restoran',
    title: 'Restoran Üniforması',
    lede: 'Mutfaktan salona restoran ekibinin her rolü için fonksiyonel, hijyenik ve markaya özel kıyafetler.',
    seoTitle: 'Restoran Üniforması — Güvençoğlu Tekstil',
    seoDesc: 'Şef ve mutfak, servis/garson, host, barista/bar, busser ve hazırlık ekibi için kurumsal restoran üniformaları.',
    sections: [
      { term: 'Chef / Kitchen', desc: 'Şef ve mutfak ekibi için ısıya ve lekeye dayanıklı ceket ve önlükler.', photo: 'restaurant chef kitchen jacket' },
      { term: 'Service / Waiter', desc: 'Garson ekibi için hareketi kolaylaştıran şık servis takımları.', photo: 'restaurant waiter service uniform' },
      { term: 'Host', desc: 'Karşılama ekibi için markayı yansıtan zarif kıyafetler.', photo: 'restaurant host hostess uniform' },
      { term: 'Barista / Bar', desc: 'Bar ve barista için pratik, lekeye dayanıklı önlük ve takımlar.', photo: 'barista bar apron uniform' },
      { term: 'Busser', desc: 'Komi ekibi için rahat, dayanıklı çalışma kıyafetleri.', photo: 'restaurant busser uniform' },
      { term: 'Prep Staff', desc: 'Hazırlık ekibi için hijyenik, fonksiyonel mutfak kıyafetleri.', photo: 'kitchen prep staff uniform' },
    ],
  },
}

export const SEKTOR_LIST = SEKTOR_ORDER.map((slug) => SEKTORLER[slug])
