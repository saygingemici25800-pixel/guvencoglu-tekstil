import { Routes, Route } from 'react-router-dom'
import LayoutV2 from './shared/LayoutV2.jsx'
import HomeV2 from './pages/HomeV2.jsx'
import StoryV2 from './pages/StoryV2.jsx'
import ProcessV2 from './pages/ProcessV2.jsx'
import ServicesV2 from './pages/ServicesV2.jsx'
import ReferencesV2 from './pages/ReferencesV2.jsx'
import ContactV2 from './pages/ContactV2.jsx'

export default function V2Routes() {
  return (
    <Routes>
      <Route element={<LayoutV2 />}>
        <Route index element={<HomeV2 />} />
        <Route path="hikayemiz" element={<StoryV2 />} />
        <Route path="uretim" element={<ProcessV2 />} />
        <Route path="hizmetler" element={<ServicesV2 />} />
        <Route path="referanslar" element={<ReferencesV2 />} />
        <Route path="iletisim" element={<ContactV2 />} />
        <Route path="*" element={<HomeV2 />} />
      </Route>
    </Routes>
  )
}
