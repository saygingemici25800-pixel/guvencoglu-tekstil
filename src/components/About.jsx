import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const [headRef, headVisible] = useReveal()
  const [visualRef, visualVisible] = useReveal()
  const [bodyRef, bodyVisible] = useReveal()

  return (
    <section className="about" id="hakkimizda" aria-labelledby="hakkimizda-title">
      <div className="container">
        <div className="about__grid">
          <div
            className={`about__visual reveal ${visualVisible ? 'visible' : ''}`}
            ref={visualRef}
          >
            <div className="about__visual-stamp">
              <div>
                <strong>1980</strong>
                <span>Kuruluş yılı</span>
              </div>
              <div className="v-line" aria-hidden="true" />
              <div>
                <strong>Fethiye</strong>
                <span>Kendi tesisimiz</span>
              </div>
            </div>
          </div>

          <div>
            <div className={`reveal ${headVisible ? 'visible' : ''}`} ref={headRef}>
              <span className="eyebrow">Hakkımızda</span>
              <h2 id="hakkimizda-title">
                Fethiye'nin Kendi Üretim Tesisli <span className="accent">Tekstil Firması.</span>
              </h2>
            </div>

            <div
              className={`reveal delay-1 ${bodyVisible ? 'visible' : ''}`}
              ref={bodyRef}
            >
              <p>
                1980 yılında Fethiye'de <strong>Ömer Güvenç</strong> tarafından küçük bir
                terzihane olarak kurulan Güvençoğlu Tekstil, bugün bölgenin en köklü
                tekstil üreticilerinden biridir. Kesikkapı'daki tesisimizde
                kesim, dikim, baskı ve nakış süreçlerinin tamamı kendi ekibimiz
                tarafından yürütülür.
              </p>
              <p>
                Aracı kullanmıyoruz. Kumaş seçiminden son ütüye kadar her aşama
                <strong> kendi kontrolümüzde</strong>. Bu sayede okul yönetimleri,
                kurumlar ve esnaf, fiyatta aracısız avantajla; kalite kontrolünde de
                doğrudan üreticiyle çalışmanın güvenini birlikte alır.
              </p>

              <blockquote className="about__quote">
                <p>
                  "Bir formanın iyiliği, ilk dikişten son düğmeye kadar bizim elimizden
                  geçtiği için belli olur. Aracıya gönderdiğimizde bu kalite ne yazık
                  ki kayboluyor — biz tam da bu yüzden kendi tesisimizde üretiyoruz."
                </p>
                <footer>
                  <strong>Ömer Güvenç</strong>
                  Kurucu — Güvençoğlu Tekstil
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
