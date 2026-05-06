import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import QuoteForm from './components/QuoteForm.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import MobileStickyCTA from './components/MobileStickyCTA.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <TrustBadges />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileStickyCTA />
    </>
  )
}
