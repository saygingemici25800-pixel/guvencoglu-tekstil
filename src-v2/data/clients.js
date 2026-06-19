/* Gerçek referans listesi — Güvençoğlu Tekstil iş ortakları.
   Logo henüz yok → şimdilik isim kutusu (logo gelince <img> girer).
   UYDURMA YOK: yalnızca kurum adı + sektör. "since/yıl/sayı" gibi iddia yok.
   Okul listesi sonra gelecek (şimdilik boş — kırılma olmaması için sektör durur). */

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
  { name: 'Dalaman', sector: 'belediye' },
  { name: 'Ortaca', sector: 'belediye' },
  { name: 'Datça', sector: 'belediye' },
  { name: 'Gaziemir', sector: 'belediye' },
  { name: 'Tire', sector: 'belediye' },
  { name: 'Muğla Büyükşehir Belediyesi', sector: 'belediye' },
  // Okul: liste sonra gelecek (şimdilik boş)
]

// Bir sektörün gerçek kurum adları (marquee + filtreleme). Boşsa [] döner.
export const clientsBySector = (sector) =>
  CLIENTS.filter((c) => c.sector === sector).map((c) => c.name)
