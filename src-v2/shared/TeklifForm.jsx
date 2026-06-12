import { useId, useState } from 'react'

/* TeklifForm — sade tek-adımlı teklif formu (sihirbaz YOK).
   4 alan: isim · telefon · e-posta · "Ne istiyorsunuz?" (textarea).
   Gönderim: mailto (mevcut form mantığıyla aynı yöntem).

   Props:
   - theme: 'navy' (İletişim) | 'cream' (ana sayfa #teklif)
   - consent: true → native required KVKK onay kutusu + aydınlatma cümlesi
   - title: opsiyonel form başlığı

   Dikiş focus efekti: input/textarea altında copper scaleX(0→1) çizgi.
   prefers-reduced-motion: motion.css'teki global .v2-root * guard ile anında. */

const RECIPIENT = 'guvencoglutekstil@gmail.com'

const FIELDS = [
  { name: 'isim', label: 'İsim Soyisim', type: 'text', autoComplete: 'name' },
  { name: 'telefon', label: 'Telefon', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'E-posta', type: 'email', autoComplete: 'email' },
]

export default function TeklifForm({ theme = 'navy', consent = false, title }) {
  const uid = useId()
  const [form, setForm] = useState({ isim: '', telefon: '', email: '', mesaj: '' })
  const [kvkk, setKvkk] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    const subject = `Teklif Talebi - ${form.isim || 'İsimsiz'}`
    const body =
      `İsim Soyisim: ${form.isim}\n` +
      `Telefon: ${form.telefon}\n` +
      `E-posta: ${form.email}\n` +
      `Talep: ${form.mesaj}`
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setForm({ isim: '', telefon: '', email: '', mesaj: '' })
    setKvkk(false)
  }

  const t = theme === 'cream' ? CREAM : NAVY

  return (
    <form
      className={`teklif-form teklif-${theme}`}
      style={{ ...formCard, ...t.card }}
      onSubmit={handleSubmit}
    >
      {title && <h3 style={{ ...formTitle, color: t.title }}>{title}</h3>}

      {FIELDS.map((f) => (
        <div key={f.name} style={field}>
          <label htmlFor={`${uid}-${f.name}`} style={{ ...label, color: t.label }}>
            {f.label}
          </label>
          <input
            id={`${uid}-${f.name}`}
            name={f.name}
            type={f.type}
            value={form[f.name]}
            onChange={set(f.name)}
            autoComplete={f.autoComplete}
            className="teklif-input"
            style={{ ...input, ...t.input }}
          />
          <span className="teklif-underline" aria-hidden="true" />
        </div>
      ))}

      <div style={field}>
        <label htmlFor={`${uid}-mesaj`} style={{ ...label, color: t.label }}>
          Ne istiyorsunuz?
        </label>
        <textarea
          id={`${uid}-mesaj`}
          name="mesaj"
          rows={4}
          value={form.mesaj}
          onChange={set('mesaj')}
          placeholder="Örn. 200 kişilik otel personeli üniforması"
          className="teklif-input"
          style={{ ...input, ...t.input, resize: 'vertical', minHeight: 96 }}
        />
        <span className="teklif-underline" aria-hidden="true" />
      </div>

      {consent && (
        <label htmlFor={`${uid}-kvkk`} style={kvkkLabel}>
          <input
            id={`${uid}-kvkk`}
            type="checkbox"
            checked={kvkk}
            onChange={(e) => setKvkk(e.target.checked)}
            required
            style={kvkkBox}
          />
          <span style={{ ...kvkkText, color: t.consent }}>
            Teklif talebimi değerlendirebilmeniz için paylaştığım ad, iletişim ve
            proje bilgilerinin Güvençoğlu Tekstil tarafından bu amaçla işlenmesini
            kabul ediyorum.
          </span>
        </label>
      )}

      <button type="submit" className="teklif-submit" style={{ ...submit, ...t.submit }}>
        Gönder <span aria-hidden="true">→</span>
      </button>

      <style>{`
        .teklif-input { transition: border-color 200ms ease, background 200ms ease; }
        .teklif-input:focus-visible {
          outline: none;
          border-color: var(--v2-copper, #D4A373) !important;
        }
        .teklif-underline {
          display: block;
          height: 2px;
          margin-top: 6px;
          background: var(--v2-copper, #D4A373);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .teklif-input:focus + .teklif-underline,
        .teklif-input:focus-visible + .teklif-underline { transform: scaleX(1); }
        .teklif-submit { cursor: pointer; transition: background 300ms ease, color 300ms ease; }
        .teklif-navy .teklif-submit:hover,
        .teklif-navy .teklif-submit:focus-visible {
          background: var(--v2-cream, #EFEAE0); color: var(--v2-navy, #2D3142);
        }
        .teklif-cream .teklif-submit:hover,
        .teklif-cream .teklif-submit:focus-visible {
          background: var(--v2-copper, #D4A373); color: var(--v2-navy, #2D3142);
        }
        .teklif-submit span { display: inline-block; transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        .teklif-submit:hover span, .teklif-submit:focus-visible span { transform: translateX(5px); }
        .teklif-input:focus-visible,
        .teklif-form button:focus-visible {
          outline-offset: 2px;
        }
      `}</style>
    </form>
  )
}

/* ── base styles ── */
const formCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  padding: 'clamp(24px, 3vw, 40px)',
  borderRadius: 8,
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
}
const formTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 22,
  margin: '0 0 4px',
}
const field = { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }
const label = { fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 13 }
const input = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  border: '1px solid',
  borderRadius: 6,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  display: 'block',
}
const submit = {
  width: '100%',
  marginTop: 8,
  padding: 15,
  border: 'none',
  borderRadius: 999,
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 15,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  minHeight: 44,
}
const kvkkLabel = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  cursor: 'pointer',
  marginTop: 4,
}
const kvkkBox = {
  width: 20,
  height: 20,
  marginTop: 2,
  flexShrink: 0,
  accentColor: 'var(--v2-copper, #D4A373)',
  cursor: 'pointer',
}
const kvkkText = { fontFamily: 'var(--v2-font-body, sans-serif)', fontSize: 13, lineHeight: 1.6 }

/* ── theme tokens — palet sabit ── */
const CREAM = {
  card: { background: 'var(--v2-cream, #EFEAE0)' },
  title: 'var(--v2-navy, #2D3142)',
  label: 'var(--v2-muted, #5A5A5A)',
  input: { background: '#FFFFFF', borderColor: 'rgba(45, 49, 66, 0.2)', color: 'var(--v2-ink, #1A1A1A)' },
  submit: { background: 'var(--v2-navy, #2D3142)', color: 'var(--v2-cream, #EFEAE0)' },
  consent: 'var(--v2-muted, #5A5A5A)',
}
const NAVY = {
  card: { background: 'var(--v2-navy, #2D3142)', border: '1px solid rgba(212, 163, 115, 0.25)' },
  title: 'var(--v2-cream, #EFEAE0)',
  label: 'rgba(239, 234, 224, 0.7)',
  input: { background: 'rgba(239, 234, 224, 0.04)', borderColor: 'rgba(239, 234, 224, 0.22)', color: 'var(--v2-cream, #EFEAE0)' },
  submit: { background: 'var(--v2-copper, #D4A373)', color: 'var(--v2-navy, #2D3142)' },
  consent: 'rgba(239, 234, 224, 0.7)',
}
