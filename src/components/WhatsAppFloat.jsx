export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    'Merhaba, Güvençoğlu Tekstil — bilgi almak istiyorum.'
  )
  return (
    <a
      className="wa-float"
      href={`https://wa.me/905321347602?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <span className="wa-float__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.9 9.9 0 0 1-1.5-5.2c0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.5 9.9-9.9 9.9zm5.4-7.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5a9 9 0 0 1-1.7-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.2 2.9.1.2 2 3.1 4.9 4.4l1.6.6c.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.3z" />
        </svg>
      </span>
      <span className="wa-float__text">WhatsApp ile sor</span>
    </a>
  )
}
