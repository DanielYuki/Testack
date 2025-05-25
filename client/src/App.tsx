import { Routes, Route } from 'react-router-dom'
import ThemeProvider from './providers/ThemeProvider'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Todos from './pages/Todos'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import ImageDetail from './pages/ImageDetail'
import ThemeSettings from './pages/ThemeSettings'
import DesignSystem from './pages/DesignSystem'

function App() {
  return (
    <ThemeProvider>
      <div className='min-h-screen'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/counter' element={<Counter />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/gallery/:id' element={<ImageDetail />} />
          <Route path='/theme' element={<ThemeSettings />} />
          <Route path='/design-system' element={<DesignSystem />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
