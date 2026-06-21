/* Gerçek referans listesi — Güvençoğlu Tekstil iş ortakları.
   Logo henüz yok → şimdilik isim kutusu (logo gelince <img> girer).
   UYDURMA YOK: yalnızca kurum adı + sektör. "since/yıl/sayı" gibi iddia yok.
   Okul referansları eklendi (gerçek okul adları, sektör: okul). */

export const CLIENT_SECTORS = [
  { id: 'otel', label: 'Otel' },
  { id: 'saglik', label: 'Sağlık' },
  { id: 'restoran', label: 'Restoran' },
  { id: 'belediye', label: 'Belediye' },
  { id: 'okul', label: 'Okul' },
]

export const CLIENTS = [
  // Otel
  { name: 'Xo', sector: 'otel' },
  { name: 'Rixos', sector: 'otel' },
  { name: 'Özyer', sector: 'otel' },
  { name: 'Liberty', sector: 'otel' },
  { name: 'Orka', sector: 'otel' },
  { name: 'Jiva', sector: 'otel' },
  { name: 'Zehra', sector: 'otel' },
  { name: 'Meri', sector: 'otel' },
  // Sağlık
  { name: 'Esnaf Hastanesi', sector: 'saglik' },
  { name: 'Letoon Hastanesi', sector: 'saglik' },
  { name: 'Doc Klinik', sector: 'saglik' },
  { name: 'Dct Klinik', sector: 'saglik' },
  // Restoran
  { name: 'Karacabey', sector: 'restoran' },
  { name: 'Cinbal', sector: 'restoran' },
  { name: 'Kaşlı Et', sector: 'restoran' },
  { name: 'İzmir Balıkçısı', sector: 'restoran' },
  { name: 'Yengeç Rest', sector: 'restoran' },
  { name: 'Zoka', sector: 'restoran' },
  { name: 'Girida Port', sector: 'restoran' },
  // Belediye
  { name: 'Fethiye Belediyesi', sector: 'belediye' },
  { name: 'Seydikemer Belediyesi', sector: 'belediye' },
  { name: 'Dalaman Belediyesi', sector: 'belediye' },
  { name: 'Ortaca Belediyesi', sector: 'belediye' },
  { name: 'Datça Belediyesi', sector: 'belediye' },
  { name: 'Gaziemir Belediyesi', sector: 'belediye' },
  { name: 'Tire Belediyesi', sector: 'belediye' },
  { name: 'Muğla Büyükşehir Belediyesi', sector: 'belediye' },
  // Okul
  { name: 'Fethiye Merkez Atatürk Ortaokulu', sector: 'okul' },
  { name: 'Fethiye Gazi Ortaokulu', sector: 'okul' },
  { name: 'Fethiye Gazi İlkokulu', sector: 'okul' },
  { name: 'Kaymakam Mustafa Karslıoğlu İlkokulu', sector: 'okul' },
  { name: 'Şehit Yüzbaşı Özgür Özekin Mesleki ve Teknik Anadolu Lisesi', sector: 'okul' },
  { name: 'Çıraklık Meslek Okulu', sector: 'okul' },
  { name: 'Fethiye Anadolu Lisesi', sector: 'okul' },
  { name: 'Vali Recai Güreli İlköğretim Okulu', sector: 'okul' },
]

// Bir sektörün gerçek kurum adları (marquee + filtreleme). Boşsa [] döner.
export const clientsBySector = (sector) =>
  CLIENTS.filter((c) => c.sector === sector).map((c) => c.name)
