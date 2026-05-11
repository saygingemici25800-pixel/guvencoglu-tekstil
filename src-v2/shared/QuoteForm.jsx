import { useId, useRef, useState } from 'react'

const STEPS = [
  {
    id: 'service',
    label: 'Hizmet',
    question: 'Hangi hizmet için teklif istiyorsun?',
    options: [
      { value: 'konfeksiyon', label: 'Konfeksiyon', hint: 'Üniforma, forma, iş elbisesi' },
      { value: 'nakis',       label: 'Nakış',       hint: 'Logo, amblem, isim' },
      { value: 'baski',       label: 'Baskı',       hint: 'Dijital, transfer, sublimasyon' },
      { value: 'b2b',         label: 'B2B Üretim',  hint: 'Toplu, özel tasarım, markaya özel' },
    ],
  },
  {
    id: 'quantity',
    label: 'Adet',
    question: 'Yaklaşık kaç adet düşünüyorsun?',
    options: [
      { value: '1-100',    label: '1 – 100',     hint: 'Numune / küçük seri' },
      { value: '100-500',  label: '100 – 500',   hint: 'Orta seri' },
      { value: '500-2000', label: '500 – 2.000', hint: 'Büyük seri' },
      { value: '2000+',    label: '2.000+',      hint: 'Toplu üretim' },
    ],
  },
  {
    id: 'timeline',
    label: 'Zaman',
    question: 'Teslim için ne kadar süren var?',
    options: [
      { value: 'urgent', label: '2 hafta',     hint: 'Acil — premium hat' },
      { value: 'short',  label: '2 – 4 hafta', hint: 'Standart üretim' },
      { value: 'medium', label: '1 – 3 ay',    hint: 'Esnek planlama' },
      { value: 'flex',   label: 'Esnek',       hint: 'Sezon bazlı' },
    ],
  },
  {
    id: 'contact',
    label: 'İletişim',
    question: 'Sana nasıl dönelim?',
    fields: [
      { name: 'name',    label: 'Ad Soyad',    type: 'text',     required: true, autocomplete: 'name' },
      { name: 'phone',   label: 'Telefon',     type: 'tel',      required: true, autocomplete: 'tel', placeholder: '0532 000 00 00' },
      { name: 'email',   label: 'E-posta',     type: 'email',    required: true, autocomplete: 'email' },
      { name: 'company', label: 'Şirket / Kurum (opsiyonel)', type: 'text', autocomplete: 'organization' },
      { name: 'notes',   label: 'Detay (model, renk, beden dağılımı...)', type: 'textarea' },
    ],
  },
]

const SERVICE_LABEL = Object.fromEntries(STEPS[0].options.map((o) => [o.value, o.label]))
const QTY_LABEL = Object.fromEntries(STEPS[1].options.map((o) => [o.value, o.label]))
const TIME_LABEL = Object.fromEntries(STEPS[2].options.map((o) => [o.value, o.label]))

function buildMailto(answers) {
  const subject = `Teklif Talebi — ${SERVICE_LABEL[answers.service] || ''}`
  const lines = [
    `Hizmet: ${SERVICE_LABEL[answers.service] || '-'}`,
    `Adet: ${QTY_LABEL[answers.quantity] || '-'}`,
    `Zaman: ${TIME_LABEL[answers.timeline] || '-'}`,
    '',
    `Ad Soyad: ${answers.name || '-'}`,
    `Telefon: ${answers.phone || '-'}`,
    `E-posta: ${answers.email || '-'}`,
    `Şirket: ${answers.company || '-'}`,
    '',
    'Detay:',
    answers.notes || '-',
  ]
  return `mailto:guvencoglutekstil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export default function QuoteForm() {
  const [stepIdx, setStepIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const liveRef = useRef(null)
  const uid = useId()

  const step = STEPS[stepIdx]
  const isLast = stepIdx === STEPS.length - 1
  const isFirst = stepIdx === 0

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validateStep() {
    if (step.options) {
      if (!answers[step.id]) {
        const msg = 'Lütfen bir seçenek seç.'
        setErrors({ [step.id]: msg })
        if (liveRef.current) liveRef.current.textContent = msg
        return false
      }
    } else if (step.fields) {
      const next = {}
      for (const f of step.fields) {
        if (f.required && !answers[f.name]?.trim()) {
          next[f.name] = `${f.label} zorunlu.`
        }
      }
      if (answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
        next.email = 'Geçerli bir e-posta adresi gir.'
      }
      if (Object.keys(next).length) {
        setErrors(next)
        const first = Object.values(next)[0]
        if (liveRef.current) liveRef.current.textContent = first
        return false
      }
    }
    return true
  }

  function handleNext() {
    if (!validateStep()) return
    setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))
  }

  function handleBack() {
    setStepIdx((i) => Math.max(0, i - 1))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validateStep()) return
    setSubmitted(true)
    window.location.href = buildMailto(answers)
  }

  if (submitted) {
    return (
      <div style={successWrap} role="status" aria-live="polite">
        <span style={successCheck} className="v2-form-check" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M10 24 L20 34 L38 14"
              stroke="#D4A373"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="v2-form-check-path"
            />
          </svg>
        </span>
        <h3 style={successTitle}>Teklif talebin alındı.</h3>
        <p style={successBody}>
          E-posta uygulaman açıldı — gönderdiğinde 48 saat içinde sana döneceğiz.
          Acil durumlar için <a href="tel:+902526125092" style={successLink}>0252 612 50 92</a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setStepIdx(0)
            setAnswers({})
            setErrors({})
          }}
          style={resetBtn}
          className="v2-form-reset"
        >
          Yeni talep oluştur
        </button>
        <style>{`
          @keyframes v2-check-draw {
            from { stroke-dasharray: 60; stroke-dashoffset: 60; }
            to   { stroke-dasharray: 60; stroke-dashoffset: 0; }
          }
          .v2-form-check-path {
            animation: v2-check-draw 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .v2-form-check-path { animation: none; stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <form
      className="v2-quote-form"
      onSubmit={isLast ? handleSubmit : (e) => { e.preventDefault(); handleNext() }}
      style={formWrap}
      noValidate
    >
      <header style={formHeader}>
        <p style={mono}>Teklif Formu · {String(stepIdx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</p>
        <div style={progressTrack} aria-hidden="true">
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              style={{
                ...progressDot,
                background: i <= stepIdx ? 'var(--v2-copper, #D4A373)' : 'rgba(245, 245, 240, 0.2)',
                width: i === stepIdx ? 32 : 12,
              }}
            />
          ))}
        </div>
      </header>

      <fieldset style={fieldset}>
        <legend style={legend}>{step.question}</legend>

        {step.options ? (
          <div style={optionsGrid} role="radiogroup" aria-required="true">
            {step.options.map((opt) => {
              const isChecked = answers[step.id] === opt.value
              const inputId = `${uid}-${step.id}-${opt.value}`
              return (
                <label
                  key={opt.value}
                  htmlFor={inputId}
                  style={{
                    ...optionLabel,
                    borderColor: isChecked ? 'var(--v2-copper, #D4A373)' : 'rgba(245, 245, 240, 0.18)',
                    background: isChecked ? 'rgba(212, 163, 115, 0.12)' : 'transparent',
                  }}
                  className="v2-form-option"
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={step.id}
                    value={opt.value}
                    checked={isChecked}
                    onChange={(e) => setAnswer(step.id, e.target.value)}
                    style={visuallyHidden}
                  />
                  <span style={optionTitle}>{opt.label}</span>
                  <span style={optionHint}>{opt.hint}</span>
                  <span
                    style={{
                      ...optionTick,
                      borderColor: isChecked ? 'var(--v2-copper, #D4A373)' : 'rgba(245, 245, 240, 0.3)',
                    }}
                    aria-hidden="true"
                  >
                    {isChecked ? '✓' : ''}
                  </span>
                </label>
              )
            })}
          </div>
        ) : (
          <div style={fieldsCol}>
            {step.fields.map((f) => {
              const inputId = `${uid}-${f.name}`
              const error = errors[f.name]
              const common = {
                id: inputId,
                name: f.name,
                value: answers[f.name] || '',
                onChange: (e) => setAnswer(f.name, e.target.value),
                autoComplete: f.autocomplete,
                placeholder: f.placeholder,
                required: f.required,
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': error ? `${inputId}-err` : undefined,
                style: { ...input, borderColor: error ? '#FF8B7A' : 'rgba(245, 245, 240, 0.22)' },
                className: 'v2-form-input',
              }
              return (
                <div key={f.name} style={fieldGroup}>
                  <label htmlFor={inputId} style={fieldLabel}>
                    {f.label}
                    {f.required && <span aria-hidden="true" style={requiredMark}>*</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea rows={4} {...common} />
                  ) : (
                    <input type={f.type} {...common} />
                  )}
                  {error && (
                    <p id={`${inputId}-err`} style={errorText} role="alert">{error}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {errors[step.id] && (
          <p style={errorText} role="alert">{errors[step.id]}</p>
        )}
      </fieldset>

      <p ref={liveRef} aria-live="polite" style={visuallyHidden}></p>

      <footer style={formFooter}>
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          style={{ ...backBtn, opacity: isFirst ? 0.3 : 1, cursor: isFirst ? 'not-allowed' : 'pointer' }}
          className="v2-form-back"
        >
          <span aria-hidden="true">←</span> Geri
        </button>

        <button type="submit" style={nextBtn} className="v2-form-next">
          {isLast ? 'Talebi Gönder' : 'Devam'}
          <span aria-hidden="true" style={nextBtnArrow} className="v2-form-next-arrow">→</span>
        </button>
      </footer>

      <style>{`
        .v2-form-option {
          transition: background 240ms ease, border-color 240ms ease, transform 240ms ease;
        }
        .v2-form-option:hover {
          border-color: rgba(212, 163, 115, 0.5) !important;
          background: rgba(212, 163, 115, 0.06) !important;
        }
        .v2-form-option:focus-within {
          outline: 2px solid #D4A373;
          outline-offset: 2px;
        }
        .v2-form-input {
          transition: border-color 200ms ease, background 200ms ease;
        }
        .v2-form-input:focus-visible {
          outline: none;
          border-color: #D4A373 !important;
          background: rgba(212, 163, 115, 0.08);
        }
        .v2-form-next {
          transition: background 240ms ease;
        }
        .v2-form-next:hover,
        .v2-form-next:focus-visible {
          background: #F5F5F0;
          color: #0A2463;
        }
        .v2-form-next:hover .v2-form-next-arrow,
        .v2-form-next:focus-visible .v2-form-next-arrow {
          transform: translateX(8px);
        }
        .v2-form-next:focus-visible,
        .v2-form-back:focus-visible,
        .v2-form-reset:focus-visible {
          outline: 2px solid #D4A373;
          outline-offset: 4px;
        }
        .v2-form-back {
          transition: color 240ms ease;
        }
        .v2-form-back:hover:not(:disabled),
        .v2-form-back:focus-visible:not(:disabled) {
          color: #D4A373;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-form-option,
          .v2-form-input,
          .v2-form-next,
          .v2-form-next-arrow,
          .v2-form-back { transition: none !important; }
        }
        @media (max-width: 560px) {
          .v2-quote-form { padding: 32px !important; }
        }
      `}</style>
    </form>
  )
}

const formWrap = {
  position: 'relative',
  background: 'var(--v2-navy, #0A2463)',
  color: '#F5F5F0',
  padding: '48px',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  border: '1px solid rgba(212, 163, 115, 0.25)',
}
const formHeader = { display: 'flex', flexDirection: 'column', gap: 12 }
const mono = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--v2-copper, #D4A373)',
  margin: 0,
}
const progressTrack = { display: 'flex', gap: 6, alignItems: 'center' }
const progressDot = {
  height: 4,
  borderRadius: 999,
  transition: 'all 320ms cubic-bezier(0.16, 1, 0.3, 1)',
}
const fieldset = { border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }
const legend = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 3.4vw, 38px)',
  lineHeight: 1.15,
  color: '#F5F5F0',
  margin: 0,
  padding: 0,
  letterSpacing: '-0.015em',
}
const optionsGrid = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }
const optionLabel = {
  position: 'relative',
  padding: '20px 56px 20px 20px',
  border: '1px solid rgba(245, 245, 240, 0.18)',
  borderRadius: 6,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minHeight: 88,
}
const optionTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 19,
  fontWeight: 500,
  color: '#F5F5F0',
}
const optionHint = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  color: 'rgba(245, 245, 240, 0.6)',
  lineHeight: 1.4,
}
const optionTick = {
  position: 'absolute',
  top: 20,
  right: 20,
  width: 22,
  height: 22,
  border: '1.5px solid rgba(245, 245, 240, 0.3)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  color: 'var(--v2-copper, #D4A373)',
}
const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
}
const fieldsCol = { display: 'flex', flexDirection: 'column', gap: 20 }
const fieldGroup = { display: 'flex', flexDirection: 'column', gap: 8 }
const fieldLabel = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(245, 245, 240, 0.7)',
}
const requiredMark = { color: 'var(--v2-copper, #D4A373)', marginLeft: 4 }
const input = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  padding: '14px 16px',
  background: 'rgba(245, 245, 240, 0.04)',
  border: '1px solid rgba(245, 245, 240, 0.22)',
  borderRadius: 4,
  color: '#F5F5F0',
  width: '100%',
  boxSizing: 'border-box',
  resize: 'vertical',
  minHeight: 44,
}
const errorText = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 13,
  color: '#FF8B7A',
  margin: 0,
}
const formFooter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  paddingTop: 8,
}
const backBtn = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  background: 'transparent',
  border: 'none',
  color: 'rgba(245, 245, 240, 0.7)',
  padding: '12px 0',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}
const nextBtn = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 17,
  fontWeight: 500,
  background: 'var(--v2-copper, #D4A373)',
  color: 'var(--v2-navy, #0A2463)',
  border: 'none',
  padding: '16px 28px',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 14,
  minHeight: 44,
}
const nextBtnArrow = {
  fontSize: 20,
  transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
  display: 'inline-block',
}
const successWrap = {
  background: 'var(--v2-navy, #0A2463)',
  color: '#F5F5F0',
  padding: '64px 48px',
  borderRadius: 8,
  border: '1px solid rgba(212, 163, 115, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  textAlign: 'center',
}
const successCheck = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  border: '2px solid var(--v2-copper, #D4A373)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const successTitle = {
  fontFamily: 'var(--v2-font-display, serif)',
  fontSize: 'clamp(28px, 3.4vw, 40px)',
  fontWeight: 500,
  margin: 0,
  letterSpacing: '-0.015em',
}
const successBody = {
  fontFamily: 'var(--v2-font-body, sans-serif)',
  fontSize: 16,
  lineHeight: 1.55,
  color: 'rgba(245, 245, 240, 0.75)',
  margin: 0,
  maxWidth: '50ch',
}
const successLink = { color: 'var(--v2-copper, #D4A373)' }
const resetBtn = {
  fontFamily: 'var(--v2-font-mono, monospace)',
  fontSize: 12,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  background: 'transparent',
  border: '1px solid rgba(212, 163, 115, 0.4)',
  color: 'var(--v2-copper, #D4A373)',
  padding: '14px 22px',
  borderRadius: 4,
  cursor: 'pointer',
  marginTop: 12,
}
