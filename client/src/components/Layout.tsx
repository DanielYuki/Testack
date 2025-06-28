import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import PWAInstallPrompt from './PWAInstallPrompt'
import PWAUpdatePrompt from './PWAUpdatePrompt'
import OfflineIndicator from './OfflineIndicator'
import { useUser } from '@/providers/UserProvider'

const Layout = () => {
  const { session, loading } = useUser()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500'></div>
      </div>
    )
  }

  if (!session) {
    return <LoginForm />
  }

  return (
    <div>
      <Navigation />
      <OfflineIndicator />
      <main className='p-4'>
        <Outlet />
      </main>
      
      {/* PWA Prompts */}
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </div>
  )
}

export default Layout
