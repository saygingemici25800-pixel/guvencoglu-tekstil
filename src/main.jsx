import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import V2Routes from '../src-v2/routes.jsx'
import './styles.css'

function V2Redirect() {
  const location = useLocation()
  const stripped = location.pathname.replace(/^\/v2/, '') || '/'
  return <Navigate to={stripped + location.search + location.hash} replace />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/v2/*" element={<V2Redirect />} />
        <Route path="/*" element={<V2Routes />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
