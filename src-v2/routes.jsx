import LayoutV2 from './shared/LayoutV2.jsx'
import HomeV2 from './pages/HomeV2.jsx'
import BizPage from './pages/BizPage.jsx'
import HizmetlerPage from './pages/HizmetlerPage.jsx'
import SektorPage from './pages/SektorPage.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Iletisim from './pages/Iletisim.jsx'
import NotFound from './pages/NotFound.jsx'
import { ALL_SLUGS } from './blog/index.js'

/* vite-react-ssg data-router route ağacı.
   Layout (NavV2 + Outlet + FooterV2) altında 6 route. */
export const routes = [
  {
    path: '/',
    element: <LayoutV2 />,
    children: [
      { index: true, element: <HomeV2 /> },
      { path: 'biz-ve-is-ortaklarimiz', element: <BizPage /> },
      { path: 'ne-yapiyoruz', element: <HizmetlerPage /> },
      { path: 'ne-yapiyoruz/saglik', element: <SektorPage slug="saglik" /> },
      { path: 'ne-yapiyoruz/otel', element: <SektorPage slug="otel" /> },
      { path: 'ne-yapiyoruz/okul', element: <SektorPage slug="okul" /> },
      { path: 'ne-yapiyoruz/restoran', element: <SektorPage slug="restoran" /> },
      { path: 'blog', element: <BlogIndex /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        entry: 'src-v2/pages/BlogPost.jsx',
        // Parent prefix ('/') ile birleşir → 'blog/<slug>' tam alt-yol döndür.
        getStaticPaths: () => ALL_SLUGS.map((s) => `blog/${s}`),
      },
      { path: 'iletisim', element: <Iletisim /> },
      // Statik /404 route → vite-react-ssg prerender eder → dist/404.html (Vercel 404'te sunar).
      { path: '404', element: <NotFound /> },
      // Catch-all → client-side bilinmeyen route'larda NotFound gösterir (SPA gezinme).
      { path: '*', element: <NotFound /> },
    ],
  },
]
