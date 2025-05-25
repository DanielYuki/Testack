import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser } from '../providers/UserProvider'
import { getDB } from '../lib/supabase/supabaseClient'

// Create the Supabase client once, outside the component
const supabase = getDB()

const Layout = () => {
  const { session } = useUser()

  if (!session) {
    return (
      <div className='mx-auto mt-[50vh] w-full max-w-2xl -translate-y-1/2'>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    )
  }

  return (
    <div>
      <Navigation />
      <main className='p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
