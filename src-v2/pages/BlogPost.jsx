import { useParams } from 'react-router-dom'
import StubPage from '../shared/StubPage.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  return (
    <StubPage
      title="Blog Yazısı"
      eyebrow="GÜVENÇOĞLU TEKSTİL · BLOG"
      note={slug ? `“${slug}” — içerik yakında.` : 'İçerik yakında.'}
      path="/blog"
    />
  )
}
