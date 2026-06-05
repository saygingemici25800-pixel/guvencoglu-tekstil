import './styles.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from '../src-v2/routes.jsx'

// vite-react-ssg giriş noktası — statik site üretimi (SSG) + client hydration.
// /v2/* yönlendirmeleri ve eski path 301'leri vercel.json üzerinden yönetilir.
export const createRoot = ViteReactSSG({ routes })
