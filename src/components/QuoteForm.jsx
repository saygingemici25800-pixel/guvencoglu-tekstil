import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const TYPES = [
  'Okul Forması',
  'Kurumsal Personel Kıyafeti',
  'Tişört / Sweat Baskı',
  'Logo Nakış',
  'Özel Tasarım & Toplu Üretim',
  'Diğer',
]

const BENEFITS = [
  '24 saat içinde net fiyat teklifi',
  'Numune ve kumaş örneği seçimi',
  'Aracısız doğrudan üretici fiyatı',
  'Sezona yetişen üretim takvimi',
]

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5 9-11" />
  </svg>
)

const initialState = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  type: TYPES[0],
  quantity: '',
  deadline: '',
  message: '',
  kvkk: false,
}

export default function QuoteForm() {
  const [headRef, headVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.kvkk) return
    const lines = [
      `Merhaba, teklif almak istiyorum.`,
      ``,
      `Ad Soyad: ${form.name}`,
      form.organization && `Kurum / Okul: ${form.organization}`,
      `Telefon: ${form.phone}`,
      form.email && `E-posta: ${form.email}`,
      `Hizmet: ${form.type}`,
      form.quantity && `Tahmini Adet: ${form.quantity}`,
      form.deadline && `Termin: ${form.deadline}`,
      form.message && ``,
      form.message && `Notlar: ${form.message}`,
    ].filter(Boolean)
    const url = `https://wa.me/905321347602?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <section className="quote" id="teklif" aria-labelledby="quote-title">
      <div className="container">
        <div className="quote__inner">
          <div className={`quote__head reveal ${headVisible ? 'visible' : ''}`} ref={headRef}>
            <span className="eyebrow">Teklif Al</span>
            <h2 id="quote-title">
              24 Saat İçinde <span className="accent">Net Fiyat.</span>
            </h2>
            <p>
              Aşağıdaki formu doldurun, ekibimiz ihtiyacınıza özel teklifi WhatsApp veya
              telefonla en kısa sürede iletsin. Acil siparişler için doğrudan
              <a href="tel:+905321347602" style={{ color: 'var(--copper-deep)', fontWeight: 600 }}> 0532 134 7602</a>.
            </p>
            <ul className="quote__benefits">
              {BENEFITS.map((b) => (
                <li key={b}>
                  {CHECK_ICON}
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            className={`quote__form reveal ${formVisible ? 'visible' : ''}`}
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="field">
              <label htmlFor="q-name">
                Ad Soyad<span className="req">*</span>
              </label>
              <input
                id="q-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={update}
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div className="field">
              <label htmlFor="q-org">Kurum / Okul</label>
              <input
                id="q-org"
                name="organization"
                type="text"
                autoComplete="organization"
                value={form.organization}
                onChange={update}
                placeholder="Örn. Fethiye Anadolu Lisesi"
              />
            </div>

            <div className="field">
              <label htmlFor="q-phone">
                Telefon<span className="req">*</span>
              </label>
              <input
                id="q-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={update}
                placeholder="0532 134 7602"
              />
            </div>

            <div className="field">
              <label htmlFor="q-email">E-posta</label>
              <input
                id="q-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update}
                placeholder="ornek@firma.com"
              />
            </div>

            <div className="field">
              <label htmlFor="q-type">
                Hizmet Türü<span className="req">*</span>
              </label>
              <select id="q-type" name="type" required value={form.type} onChange={update}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="q-qty">Tahmini Adet</label>
              <input
                id="q-qty"
                name="quantity"
                type="number"
                min="1"
                inputMode="numeric"
                value={form.quantity}
                onChange={update}
                placeholder="Örn. 250"
              />
            </div>

            <div className="field field--full">
              <label htmlFor="q-deadline">Termin / İhtiyaç Tarihi</label>
              <input
                id="q-deadline"
                name="deadline"
                type="text"
                value={form.deadline}
                onChange={update}
                placeholder="Örn. Eylül başı, sezon açılışı"
              />
            </div>

            <div className="field field--full">
              <label htmlFor="q-message">Notlarınız</label>
              <textarea
                id="q-message"
                name="message"
                rows="4"
                value={form.message}
                onChange={update}
                placeholder="Renk, kumaş, logo ve özel istekleriniz..."
              />
            </div>

            <div className="field field--full field--check">
              <input
                id="q-kvkk"
                name="kvkk"
                type="checkbox"
                checked={form.kvkk}
                onChange={update}
                required
              />
              <label htmlFor="q-kvkk">
                KVKK kapsamında bilgilerimin sadece teklif iletişimi için kullanılmasına onay veriyorum.
              </label>
            </div>

            <div className="quote__form-foot">
              <small>* alanlar zorunludur. Bilgileriniz üçüncü kişilerle paylaşılmaz.</small>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!form.kvkk}
                style={!form.kvkk ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
              >
                Teklif Gönder
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {submitted && (
              <div className="quote__success" role="status">
                {CHECK_ICON}
                <div>
                  <strong>Teşekkürler!</strong> Talebiniz WhatsApp üzerinden iletildi.
                  En kısa sürede dönüş yapacağız.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
