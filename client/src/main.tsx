import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'

// COMPONENTS
import Layout from '@/components/Layout.tsx'

// PROVIDERS
import { UserProvider } from '@/providers/UserProvider.tsx'
import ThemeProvider from '@/providers/ThemeProvider.tsx'

// PAGES
import Home from '@/pages/Home.tsx'
import Counter from '@/pages/Counter.tsx'
import Todos from '@/pages/Todos.tsx'
import Profile from '@/pages/Profile.tsx'
import Gallery from '@/pages/Gallery.tsx'
import ImageDetail from '@/pages/ImageDetail.tsx'
import ThemeSettings from '@/pages/ThemeSettings.tsx'
import DesignSystem from '@/pages/DesignSystem.tsx'
import PWAInfo from '@/pages/PWAInfo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/*' element={<Layout />}>
              <Route path='' element={<Home />} />
              <Route path='counter' element={<Counter />} />
              <Route path='todos' element={<Todos />} />
              <Route path='profile' element={<Profile />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path='gallery/:id' element={<ImageDetail />} />
              <Route path='theme' element={<ThemeSettings />} />
              <Route path='design-system' element={<DesignSystem />} />
              <Route path='pwa' element={<PWAInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
)
