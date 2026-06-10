import LayoutV2 from './shared/LayoutV2.jsx'
import HomeV2 from './pages/HomeV2.jsx'
import BizPage from './pages/BizPage.jsx'
import HizmetlerPage from './pages/HizmetlerPage.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Iletisim from './pages/Iletisim.jsx'
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
      { path: 'hizmetler', element: <HizmetlerPage /> },
      { path: 'blog', element: <BlogIndex /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        entry: 'src-v2/pages/BlogPost.jsx',
        // Parent prefix ('/') ile birleşir → 'blog/<slug>' tam alt-yol döndür.
        getStaticPaths: () => ALL_SLUGS.map((s) => `blog/${s}`),
      },
      { path: 'iletisim', element: <Iletisim /> },
    ],
  },
]
