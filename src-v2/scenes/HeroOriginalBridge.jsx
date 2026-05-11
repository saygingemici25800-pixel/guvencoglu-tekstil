import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalCanvas from '../../src/components/GlobalCanvas.jsx'
import Hero from '../../src/components/Hero.jsx'

const ANCHOR_MAP = {
  '#teklif': '/v2/iletisim',
  '#hizmetler': '/v2/hizmetler',
  '#hakkimizda': '/v2/hikayemiz',
}

export default function HeroOriginalBridge() {
  const navigate = useNavigate()

  const onClick = useCallback(
    (e) => {
      const anchor = e.target.closest && e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href in ANCHOR_MAP) {
        e.preventDefault()
        navigate(ANCHOR_MAP[href])
      }
    },
    [navigate],
  )

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#EFEAE0'
    return () => {
      document.body.style.background = prev
    }
  }, [])

  return (
    <div className="v1-bridge" onClickCapture={onClick}>
      <GlobalCanvas />
      <Hero />
    </div>
  )
}
