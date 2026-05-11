/* 7-step factory tour stations — descriptions can be tightened by domain expert. */
export const STATIONS = [
  {
    id: 'hammadde',
    mono: 'HAMMADDE',
    title: 'İpliğin başlangıcı',
    description:
      'Anadolu pamuğu ve teknik kumaş tedarikçilerinden gelen makaralar burada tek tek kontrol edilir. Renk tonu, gramaj ve aşınma testleri geçilmeden depoya geçmez.',
    visualHint: 'spools',
  },
  {
    id: 'kesim',
    mono: 'KESİM',
    title: 'İlk biçim',
    description:
      'Otomatik plotter ile kumaş katları milimetrik hassasiyetle kesilir. Aynı kalıbın binlerce tekrarı bile saniye aralıklarına sığar.',
    visualHint: 'cutting',
  },
  {
    id: 'dikim',
    mono: 'DİKİM',
    title: 'Yan yana iki kumaş',
    description:
      'Endüstriyel dikiş hattı boyunca her parça ustasının elinden geçer. Tek bir gömlek için ortalama 64 dikiş — fazla değil, eksik değil.',
    visualHint: 'sewing',
  },
  {
    id: 'nakis',
    mono: 'NAKIŞ',
    title: 'Logo ve imza',
    description:
      'Bilgisayarlı nakış makineleri kurum logosunu kumaşa yedirir. 12 iğne, 9 renk, %0 kayma — okul forması da olsa, kurumsal üniforma da olsa.',
    visualHint: 'embroidery',
  },
  {
    id: 'kalite',
    mono: 'KALİTE',
    title: 'Büyüteç altında',
    description:
      'Her parti rastgele örneklemeyle muayene edilir. Dikiş aralığı, düğme sağlamlığı, etiket konumu, kumaş gerginliği — beşi de geçmeden paketlemeye gitmez.',
    visualHint: 'magnifier',
  },
  {
    id: 'paketleme',
    mono: 'PAKETLEME',
    title: 'Beden beden, kutu kutu',
    description:
      'Etiketlenir, katlanır, polietilen torba ve tek tek karton kutularla paketlenir. Her kutuda QR kod var — fabrikadan giderken biz de takip ediyoruz.',
    visualHint: 'boxes',
  },
  {
    id: 'teslimat',
    mono: 'TESLİMAT',
    title: 'Kapıya kadar',
    description:
      'Türkiye geneli özel anlaşmalı kargo. İstendiğinde, Fethiye merkezinde kurum kapısına kadar kendi aracımızla teslim. Yol takip linki müşteriye gider.',
    visualHint: 'truck',
  },
]
