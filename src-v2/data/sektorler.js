/* ──────────────────────────────────────────────────────────────
   Ürünlerimiz — sektör verisi (tek sayfa, sekmeli yelpaze).
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
      { term: 'Doctor Coat', desc: 'Hastane ve kliniklerde hekimin günü boyunca üstünde kalan bir parça, hem hijyen hem duruş demek. Antibakteriyel ve kolay ütülenen kumaş kullanıyoruz; kuruma özel logo nakışı ve renk seçenekleriyle üretiyoruz. Doktor önlüğünde dikiş ve yaka detayı uzun ömür için fark yaratır — biz orada elden geçiriyoruz.', photo: 'doctor white coat', img: '/saglik-doctor.webp', alt: 'Sağlık sektörü doktor önlüğü üniforması' },
      { term: 'Nurse Scrubs', desc: 'Hemşire ve sağlık personeli vardiya boyunca hareket halinde; forma da o tempoya ayak uydurmalı. Nefes alan, esneyen kumaştan hemşire forması (scrubs) dikiyoruz, yoğun yıkamaya dayanıklı. Toplu kurumsal siparişte beden ve renk standardını kuruma göre oturtuyoruz.', photo: 'nurse scrubs', img: '/saglik-nurse.webp', alt: 'Hemşire scrub takımı sağlık üniforması' },
      { term: 'Surgical Scrubs', desc: 'Ameliyathane steril bir alan; buradaki kıyafet hem rahat hem yüksek sıcaklıkta yıkanabilir olmalı. Cerrahi ekip için dayanıklı, renk haslığı yüksek ameliyathane takımları üretiyoruz. Hastane standartlarına uygun kumaş ve dikişle, uzun mesai için tasarlıyoruz.', photo: 'surgical scrubs operating room', img: '/saglik-surgical.webp', alt: 'Ameliyathane cerrahi scrub takımı' },
      { term: 'Patient Gown', desc: 'Hasta önlüğü çoğu zaman göz ardı edilir ama hijyen ve konfor açısından kritiktir. Sık yıkamaya dayanıklı, ciltte rahat duran kumaştan hasta önlükleri dikiyoruz. Hastane ve klinikler için toplu üretimde beden çeşitliliğini ve renk kodlamasını birlikte planlıyoruz.', photo: 'patient gown hospital', img: '/saglik-patient.webp', alt: 'Hastane hasta önlüğü' },
      { term: 'Lab / Technician', desc: 'Laboratuvar ve teknik personel için dayanıklılık ön planda. Kimyasala ve sık yıkamaya dirençli laboratuvar önlükleri üretiyoruz; kurumsal logo ve isim nakışı ekliyoruz. Teknisyen üniformasında cep ve yaka detaylarını işin pratiğine göre düzenliyoruz.', photo: 'lab technician coat', img: '/saglik-lab.webp', alt: 'Laboratuvar ve teknik personel önlüğü' },
      { term: 'Support Staff', desc: 'Hastanede temizlik ve destek ekibi de kurumun yüzü. Yoğun kullanımda yıpranmayan, rahat hareket ettiren destek personeli üniformaları dikiyoruz. Renk kodlamasıyla birimler ayrışsın, kurum içi düzen korunsun diye birlikte çalışıyoruz.', photo: 'hospital support staff uniform', img: '/saglik-support.webp', alt: 'Hastane destek personeli kıyafeti' },
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
      { term: 'Front Office', desc: 'Resepsiyon, misafirin otelle ilk göz teması. Buradaki üniforma şık ama gün boyu rahat olmalı. Otel resepsiyon üniformalarını kurumun konseptine ve renk paletine göre dikiyoruz; duruşu bozulmayan, kolay bakımlı kumaş kullanıyoruz.', photo: 'hotel front office reception uniform', img: '/otel-frontoffice.webp', alt: 'Otel önbüro ve resepsiyon üniforması' },
      { term: 'Bell Staff', desc: 'Belboy üniforması otelin klasik zarafetini taşır; detay ve dikiş kalitesi hemen göze çarpar. Düğme, şerit ve yaka işçiliğine özen göstererek belboy ve bell staff üniformaları üretiyoruz. Kurumsal kimliğe uygun, sezon boyu formunu koruyan kumaş seçiyoruz.', photo: 'hotel bellboy uniform', img: '/otel-bellstaff.webp', alt: 'Otel bellboy ve kapı görevlisi üniforması' },
      { term: 'Guest Relations', desc: 'Misafir ilişkileri ekibi otelin sıcak yüzüdür; kıyafet de o samimiyeti ve düzeni yansıtmalı. Guest relations ekibi için zarif, kurumsal misafir ilişkileri üniformaları dikiyoruz. Renk ve kesimi otelin konseptiyle uyumlu planlıyoruz.', photo: 'hotel guest relations uniform', img: '/otel-guest.webp', alt: 'Otel misafir ilişkileri üniforması' },
      { term: 'Housekeeping', desc: 'Kat hizmetleri ekibi gün boyu hareket halinde; üniforma dayanıklı ve pratik olmalı. Sık yıkamaya, eğilip kalkmaya uygun housekeeping üniformaları üretiyoruz. Kumaşı yıpranmaya dirençli seçiyor, birim renk kodlamasını kuruma göre ayarlıyoruz.', photo: 'hotel housekeeping uniform', img: '/otel-housekeeping.webp', alt: 'Otel kat hizmetleri üniforması' },
      { term: 'F&B Service', desc: 'Yiyecek-içecek servisi, otel deneyiminin tam ortasında. Servis personeli için hem şık hem leke/yıkama dostu F&B üniformaları dikiyoruz. Önlük, yelek ve gömlek kombinasyonlarını mekânın konseptine göre kurguluyoruz.', photo: 'hotel food beverage service uniform', img: '/otel-fb.webp', alt: 'Otel yiyecek-içecek servis üniforması' },
      { term: 'Kitchen / Chef', desc: 'Mutfak sıcak ve yoğun; aşçı üniforması hem dayanıklı hem güvenli olmalı. Yüksek sıcaklığa ve sık yıkamaya dayanıklı şef ceketi ve mutfak üniformaları üretiyoruz. Kurumsal logo nakışı ve rütbe ayrımını birlikte planlıyoruz.', photo: 'hotel chef kitchen uniform', img: '/otel-kitchen.webp', alt: 'Otel mutfak ve şef üniforması' },
      { term: 'Engineering', desc: 'Otelin teknik ekibi sahnenin arkasında ama işin belkemiği. Teknik servis ve bakım personeli için dayanıklı, fonksiyonel iş kıyafetleri dikiyoruz. Cep düzeni, dayanıklı dikiş ve birim rengini işin gereğine göre ayarlıyoruz.', photo: 'hotel engineering technical staff', img: '/otel-engineering.webp', alt: 'Otel teknik servis iş kıyafeti' },
      { term: 'Spa & Wellness', desc: 'Spa, otelin dinginlik alanı; üniforma da o huzuru yansıtmalı. Spa ve wellness ekibi için yumuşak, rahat ve şık üniformalar üretiyoruz. Kumaşı ciltte konforlu, otelin wellness konseptine uygun tonlarda seçiyoruz.', photo: 'hotel spa wellness uniform', img: '/otel-spa.webp', alt: 'Otel spa ve wellness üniforması' },
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
      { term: 'Student Uniform', desc: 'Okul forması her gün giyilen, sık yıkanan bir parça; dayanıklılık ve konfor şart. Öğrenciler için rahat, yıpranmaya dayanıklı okul üniformaları üretiyoruz. Okul logosu, renk ve kesimi kurumun kimliğine göre standartlaştırıyoruz.', photo: 'school student uniform', img: '/okul-student.webp', alt: 'Okul öğrenci üniforması' },
      { term: 'Academic Staff', desc: 'Öğretmen ve akademik kadro okulun ciddiyetini ve sıcaklığını birlikte taşır. Akademik personel için kurumsal, rahat ve şık kıyafetler dikiyoruz. Okulun kurumsal kimliğine uygun renk ve kesimle, gün boyu konfor için tasarlıyoruz.', photo: 'school teacher academic staff', img: '/okul-academic.webp', alt: 'Okul öğretmen ve akademik kadro kıyafeti' },
      { term: 'Administrative', desc: 'Okul idari kadrosu velinin ve öğrencinin sık temas ettiği yüz. İdari personel için düzenli, kurumsal üniformalar üretiyoruz. Kurumun rengiyle uyumlu, profesyonel duruş veren kesim ve kumaş kullanıyoruz.', photo: 'school administrative office uniform', img: '/okul-admin.webp', alt: 'Okul idari kadro ofis kıyafeti' },
      { term: 'Sports / PE', desc: 'Beden eğitimi ve spor takımları için esneklik ve nefes alma öncelik. Okullara dayanıklı, nefes alan spor ve beden eğitimi kıyafetleri üretiyoruz. Okul logosu, renk ve numaralandırmayı birlikte planlıyor, yoğun kullanıma göre kumaş seçiyoruz.', photo: 'school sports physical education uniform', img: '/okul-sports.webp', alt: 'Okul beden eğitimi spor kıyafeti' },
      { term: 'Corporate Office', desc: 'Eğitim kurumlarının kurumsal ofis ekipleri için düzen ve profesyonellik önemli. Kurumsal ofis üniformaları dikiyoruz; markaya uygun renk paleti ve kesimle, gün boyu rahat ve şık duran kıyafetler üretiyoruz.', photo: 'corporate office uniform', img: '/okul-corporate.webp', alt: 'Kurumsal ofis üniforması' },
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
      { term: 'Chef / Kitchen', desc: 'Mutfak yoğun ve sıcak; şef üniforması hem dayanıklı hem profesyonel görünmeli. Yüksek sıcaklığa ve sık yıkamaya dayanıklı şef ceketi ve mutfak kıyafetleri üretiyoruz. Restoranın konseptine göre renk, logo nakışı ve rütbe ayrımını planlıyoruz.', photo: 'restaurant chef kitchen jacket', img: '/restoran-chef.webp', alt: 'Restoran şef ve mutfak ceketi üniforması' },
      { term: 'Service / Waiter', desc: 'Garson, restoran deneyiminin yüzü; üniforma hem şık hem servise pratik olmalı. Garson ve servis ekibi için leke/yıkama dostu, hareketi kısıtlamayan üniformalar dikiyoruz. Önlük, gömlek ve yelek kombinasyonunu mekânın havasına göre kurguluyoruz.', photo: 'restaurant waiter service uniform', img: '/restoran-service.webp', alt: 'Restoran garson servis üniforması' },
      { term: 'Host', desc: 'Host, misafiri kapıda karşılayan ilk izlenim. Karşılama ekibi için zarif, restoranın konseptini yansıtan host üniformaları üretiyoruz. Kesim ve rengi mekânın kimliğiyle uyumlu, gün boyu şık duracak şekilde planlıyoruz.', photo: 'restaurant host hostess uniform', img: '/restoran-host.webp', alt: 'Restoran karşılama ve host üniforması' },
      { term: 'Barista / Bar', desc: 'Bar ve barista ekibi hızlı tempoda, sürekli göz önünde çalışır. Barista ve bar personeli için şık, dayanıklı ve pratik üniformalar dikiyoruz. Önlük ve gömlek detaylarını mekânın tarzına göre, leke ve yıkamaya dayanıklı kumaşla üretiyoruz.', photo: 'barista bar apron uniform', img: '/restoran-barista.webp', alt: 'Restoran barista ve bar önlüğü' },
      { term: 'Busser', desc: 'Komi ekibi servisin akışını sağlayan görünmez kahramanlar; kıyafet rahat ve dayanıklı olmalı. Komi ve servis destek ekibi için hareket ettiren, yıpranmaya dayanıklı üniformalar üretiyoruz. Renk kodlamasıyla ekip içi düzeni kuruma göre ayarlıyoruz.', photo: 'restaurant busser uniform', img: '/restoran-busser.webp', alt: 'Restoran komi çalışma kıyafeti' },
      { term: 'Prep Staff', desc: 'Mutfak hazırlık ekibi yoğun ve ıslak bir ortamda çalışır; kıyafet dayanıklı ve hijyenik olmalı. Hazırlık personeli için sık yıkamaya dayanıklı, pratik mutfak üniformaları dikiyoruz. Önlük ve cep düzenini işin pratiğine göre planlıyoruz.', photo: 'kitchen prep staff uniform', img: '/restoran-prep.webp', alt: 'Restoran mutfak hazırlık personeli kıyafeti' },
    ],
  },
}

export const SEKTOR_LIST = SEKTOR_ORDER.map((slug) => SEKTORLER[slug])
